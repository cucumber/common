defmodule CucumberGherkin.PickleCompiler do
  @moduledoc false
  defstruct id_gen: nil, pickles: [], language: nil, uri: nil

  alias CucumberMessages.GherkinDocument.Feature, as: FeatureMessage
  alias CucumberMessages.GherkinDocument.Feature.Scenario, as: ScenarioMessage
  alias CucumberMessages.GherkinDocument.Feature.Step, as: StepMessage
  alias CucumberMessages.GherkinDocument.Feature.TableRow, as: TableRowMessage
  alias CucumberMessages.Pickle, as: PickleMessage
  alias CucumberMessages.Pickle.PickleStep, as: PickleStepMessage
  alias CucumberMessages.Pickle.PickleTag, as: PickleTagMessage
  alias CucumberMessages.GherkinDocument.Feature.Tag, as: TagMessage
  alias CucumberMessages.GherkinDocument.Feature.FeatureChild, as: FeatureChildMessage
  alias CucumberMessages.GherkinDocument.Feature.FeatureChild.Rule, as: RuleMessage
  alias CucumberMessages.GherkinDocument.Feature.Scenario.Examples, as: ExampleMessage
  alias CucumberMessages.PickleStepArgument.PickleTable, as: PickleTableMessage

  alias CucumberMessages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell,
    as: PickleTableCellMessage

  alias CucumberMessages.PickleStepArgument.PickleTable.PickleTableRow, as: PickleTableRowMessage
  alias CucumberMessages.GherkinDocument.Feature.Step.DataTable, as: DataTableMessage

  @me __MODULE__

  def compile(%CucumberGherkin.AstBuilder{gherkin_doc: gherkin_doc, id_gen: id_generator}, uri) do
    me = %@me{id_gen: id_generator, uri: uri}

    case compile_feature(gherkin_doc.feature, me) do
      %{pickles: pickles} -> pickles
      [] -> []
    end
  end

  defp compile_feature(nil, %@me{pickles: p} = _compiler_acc), do: p

  defp compile_feature(%FeatureMessage{} = f, %@me{} = compiler_acc) do
    meta_info = %{
      feature_backgr_steps: [],
      rule_backgr_steps: [],
      pickles: [],
      feature_tags: f.tags,
      compiler_acc: %{compiler_acc | language: f.language}
    }

    Enum.reduce(f.children, meta_info, fn child, m_acc ->
      case child.value do
        {:background, bg} ->
          %{m_acc | feature_backgr_steps: bg.steps}

        {:rule, rule} ->
          compile_rule(m_acc, rule)

        {:scenario, s} ->
          compile_scenario(m_acc, s, :feature_backgr_steps)
      end
    end)
  end

  defp compile_rule(meta_info, %RuleMessage{} = r) do
    resetted_meta_info = %{meta_info | rule_backgr_steps: meta_info.feature_backgr_steps}
    rule_tags = meta_info.feature_tags ++ r.tags

    Enum.reduce(r.children, resetted_meta_info, fn
      %FeatureChildMessage{value: {:background, bg}}, m_acc ->
        %{m_acc | rule_backgr_steps: m_acc.rule_backgr_steps ++ bg.steps}

      %FeatureChildMessage{value: {:scenario, s}}, m_acc ->
        %{m_acc | feature_tags: rule_tags} |> compile_scenario(s, :rule_backgr_steps)
    end)
  end

  # Match for a normal scenario. NOT a scenario outline. NO examples.
  defp compile_scenario(m, %ScenarioMessage{examples: []} = s, feature_or_rule_bg_steps?) do
    {steps, semi_updated_acc} =
      case s.steps do
        [] ->
          {[], m.compiler_acc}

        list_of_steps ->
          (Map.fetch!(m, feature_or_rule_bg_steps?) ++ list_of_steps)
          |> pickle_steps(m.compiler_acc)
      end

    pickle_tags = [m.feature_tags | s.tags] |> List.flatten() |> pickle_tags()
    {id, updated_compiler_acc} = get_id_and_update_compiler_acc(semi_updated_acc)

    new_msg = %PickleMessage{
      id: id,
      uri: m.compiler_acc.uri,
      name: s.name,
      language: m.compiler_acc.language,
      steps: steps,
      tags: pickle_tags,
      ast_node_ids: [s.id]
    }

    %{m | pickles: [new_msg | m.pickles], compiler_acc: updated_compiler_acc}
  end

  # When there are examples, it is a scenario outline
  defp compile_scenario(m, %ScenarioMessage{examples: examples} = s, feature_or_rule_bg_steps?) do
    Enum.reduce(examples, m, fn %ExampleMessage{} = example, m_acc ->
      scenario_outline_create_pickles(
        m_acc,
        example,
        s,
        feature_or_rule_bg_steps?,
        example.table_header
      )
    end)
  end

  defp scenario_outline_create_pickles(m, _e, _s, _f_or_bg?, nil), do: m

  defp scenario_outline_create_pickles(m, example, s, f_or_bg?, table_header) do
    Enum.reduce(example.table_body, m, fn value_row, m_acc ->
      {steps, updated_acc} =
        case s.steps do
          [] -> {[], m_acc.compiler_acc}
          _steplist -> Map.fetch!(m_acc, f_or_bg?) |> pickle_steps(m_acc.compiler_acc)
        end

      {updated_steps, updated_acc} =
        Enum.reduce(s.steps, {steps, updated_acc}, fn scen_outline_step, {step_acc, c_acc} ->
          {newly_created_step, new_c_acc} =
            pickle_step_creator(scen_outline_step, table_header.cells, value_row, c_acc)

          {step_acc ++ [newly_created_step], new_c_acc}
        end)

      tags = m_acc.feature_tags ++ s.tags ++ example.tags
      pickle_tags = tags |> List.flatten() |> pickle_tags()

      {id, updated_acc} = get_id_and_update_compiler_acc(updated_acc)

      new_msg = %PickleMessage{
        id: id,
        uri: m_acc.compiler_acc.uri,
        name: interpolate(s.name, table_header.cells, value_row.cells),
        language: m_acc.compiler_acc.language,
        steps: updated_steps,
        tags: pickle_tags,
        ast_node_ids: [s.id, value_row.id]
      }

      %{m_acc | pickles: [new_msg | m_acc.pickles], compiler_acc: updated_acc}
    end)
  end

  ####################
  # Helper functions #
  ####################
  defp pickle_tags(list_of_tag_messages), do: Enum.map(list_of_tag_messages, &pickle_tag/1)
  defp pickle_tag(%TagMessage{} = t), do: %PickleTagMessage{ast_node_id: t.id, name: t.name}

  defp pickle_steps(step_messages, %@me{} = acc) do
    {reversed_msges, new_acc} =
      Enum.reduce(step_messages, {[], acc}, fn message, {pickle_steps_acc, compiler_acc} ->
        {pickle_step, updated_acc} = pickle_step(message, compiler_acc)
        {[pickle_step | pickle_steps_acc], updated_acc}
      end)

    {Enum.reverse(reversed_msges), new_acc}
  end

  defp pickle_step(%StepMessage{} = m, %@me{} = acc), do: pickle_step_creator(m, [], nil, acc)

  defp pickle_step_creator(%StepMessage{} = m, variable_cells, values_row, %@me{} = acc) do
    value_cells =
      case values_row do
        nil -> []
        data -> data.cells
      end

    step_text = interpolate(m.text, variable_cells, value_cells)
    {id, updated_compiler_acc} = get_id_and_update_compiler_acc(acc)

    message =
      %PickleStepMessage{id: id, ast_node_ids: [m.id], text: step_text}
      |> add_ast_node_id(values_row)
      |> add_datatable(m, variable_cells, value_cells)
      |> add_doc_string(m, variable_cells, value_cells)

    {message, updated_compiler_acc}
  end

  defp interpolate(text, variable_cells, value_cells) do
    variable_cells
    |> Enum.zip(value_cells)
    |> Enum.reduce(text, fn {variable_cell, value_cell}, text ->
      String.replace(text, "<#{variable_cell.value}>", value_cell.value)
    end)
  end

  defp pickle_data_table_creator(%DataTableMessage{} = data_table, variable_cells, value_cells) do
    table_row_messages =
      Enum.reduce(data_table.rows, [], fn %TableRowMessage{} = row, pickle_table_rows_acc ->
        new_cells =
          Enum.reduce(row.cells, [], fn cell, pickle_table_cell_acc ->
            new_table_cell_message = %PickleTableCellMessage{
              value: interpolate(cell.value, variable_cells, value_cells)
            }

            [new_table_cell_message | pickle_table_cell_acc]
          end)
          |> Enum.reverse()

        [%PickleTableRowMessage{cells: new_cells} | pickle_table_rows_acc]
      end)
      |> Enum.reverse()

    %PickleTableMessage{rows: table_row_messages}
  end

  alias CucumberMessages.PickleStepArgument.PickleDocString, as: PickleDocStringMessage
  alias CucumberMessages.GherkinDocument.Feature.Step.DocString, as: DocStringMessage

  defp pickle_doc_string_creator(%DocStringMessage{} = d, variable_cells, value_cells) do
    content = interpolate(d.content, variable_cells, value_cells)

    media_type =
      case d.media_type do
        "" -> ""
        media_type -> interpolate(media_type, variable_cells, value_cells)
      end

    %PickleDocStringMessage{content: content, media_type: media_type}
  end

  ####################################################
  # Extra Helper functions to reduce "If nil" horror #
  ####################################################

  defp add_ast_node_id(%PickleStepMessage{} = m, nil), do: m

  defp add_ast_node_id(%PickleStepMessage{ast_node_ids: ids} = m, %TableRowMessage{} = row),
    do: %{m | ast_node_ids: ids ++ [row.id]}

  defp add_datatable(%PickleStepMessage{} = m, %StepMessage{argument: nil}, _, _), do: m

  defp add_datatable(%PickleStepMessage{} = m, %StepMessage{argument: {:doc_string, _}}, _, _),
    do: m

  defp add_datatable(
         %PickleStepMessage{} = m,
         %StepMessage{argument: {:data_table, d}},
         variable_cells,
         value_cells
       ) do
    result = pickle_data_table_creator(d, variable_cells, value_cells)
    %{m | argument: result}
  end

  defp add_doc_string(%PickleStepMessage{} = m, %StepMessage{argument: nil}, _, _), do: m

  defp add_doc_string(%PickleStepMessage{} = m, %StepMessage{argument: {:data_table, _}}, _, _),
    do: m

  defp add_doc_string(
         %PickleStepMessage{} = m,
         %StepMessage{argument: {:doc_string, d}},
         variable_cells,
         value_cells
       ) do
    result = pickle_doc_string_creator(d, variable_cells, value_cells)
    %{m | argument: result}
  end

  defp get_id_and_update_compiler_acc(%@me{id_gen: gen} = compiler_acc) do
    {id, updated_generator} = CucumberGherkin.IdGenerator.get_id(gen)
    updated_acc = %{compiler_acc | id_gen: updated_generator}
    {id, updated_acc}
  end
end
