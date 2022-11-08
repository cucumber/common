defmodule CucumberGherkin.AstBuilder do
  @moduledoc false
  alias CucumberGherkin.{ParserContext, AstNode, Token, AstBuilderError, ParserException}
  alias CucumberMessages.GherkinDocument.Comment, as: CommentMessage
  alias CucumberMessages.GherkinDocument.Feature.Tag, as: MessageTag
  alias CucumberMessages.GherkinDocument.Feature.Scenario, as: MessageScenario
  alias CucumberMessages.GherkinDocument.Feature.Step, as: StepMessage
  alias CucumberMessages.GherkinDocument.Feature.Step.DataTable, as: DataTableMessage
  alias CucumberMessages.GherkinDocument.Feature.TableRow, as: TableRowMessage
  alias CucumberMessages.GherkinDocument.Feature.TableRow.TableCell, as: TableCellMessage
  alias CucumberMessages.GherkinDocument.Feature, as: FeatureMessage
  alias CucumberMessages.GherkinDocument.Feature.FeatureChild, as: FeatureChildMessage
  alias CucumberMessages.GherkinDocument, as: GherkinDocumentMessage
  alias CucumberMessages.GherkinDocument.Feature.Step.DocString, as: DocStringMessage
  alias CucumberMessages.GherkinDocument.Feature.Background, as: BackgroundMessage
  alias CucumberMessages.GherkinDocument.Feature.Scenario.Examples, as: ExamplesMessage
  alias CucumberMessages.GherkinDocument.Feature.FeatureChild.Rule, as: RuleMessage

  @me __MODULE__

  defstruct stack: %Stack{}, gherkin_doc: %GherkinDocumentMessage{}, id_gen: nil

  def new(opts) do
    root_node = %AstNode{rule_type: None}
    default_stack = %Stack{} |> Stack.push(root_node)

    gen =
      case :predictable_ids in opts do
        true -> %CucumberGherkin.IdGenerator.PredictableGen{}
        false -> %CucumberGherkin.IdGenerator.UUIDGen{}
      end

    %@me{stack: default_stack, id_gen: gen}
  end

  def start_rule(%ParserContext{ast_builder: %@me{stack: s} = builder} = context, type) do
    node_to_be_pushed = %AstNode{rule_type: type}
    updated_builder = %{builder | stack: Stack.push(s, node_to_be_pushed)}
    %{context | ast_builder: updated_builder}
  end

  def end_rule(%ParserContext{ast_builder: %@me{stack: s}} = context, _type) do
    # TODO: Type isn't used? I think we should?
    {%AstNode{} = to_be_transformed, %Stack{} = stack} = Stack.pop(s)
    {transformed_node, transformed_context} = transform_node(to_be_transformed, context)
    {%AstNode{} = current_node, %Stack{} = new_stack} = Stack.pop(stack)

    new_node = AstNode.add_subitem(current_node, to_be_transformed.rule_type, transformed_node)
    new_builder = %{transformed_context.ast_builder | stack: Stack.push(new_stack, new_node)}

    %{transformed_context | ast_builder: new_builder}
  end

  def build(%ParserContext{ast_builder: %@me{} = builder} = context) do
    token = context.current_token

    case token.matched_type do
      Comment ->
        loc = Token.get_location(token)
        comment_message = %CommentMessage{location: loc, text: token.line.content}
        updated_comments = builder.gherkin_doc.comments ++ [comment_message]
        updated_gherkin_doc = %{builder.gherkin_doc | comments: updated_comments}
        updated_builder = %{builder | gherkin_doc: updated_gherkin_doc}
        %{context | ast_builder: updated_builder}

      other_type ->
        {%AstNode{} = current, %Stack{} = temp_stack} = Stack.pop(builder.stack)
        updated_node = AstNode.add_subitem(current, other_type, token)
        updated_builder = %{builder | stack: Stack.push(temp_stack, updated_node)}
        %{context | ast_builder: updated_builder}
    end
  end

  defp transform_node(%AstNode{rule_type: Step} = node, context) do
    token = AstNode.get_token(node, StepLine)
    {id, updated_context} = get_id_and_update_context(context)

    %StepMessage{
      id: id,
      keyword: token.matched_keyword,
      location: Token.get_location(token),
      text: token.matched_text
    }
    |> add_datatable_to(AstNode.get_single(node, DataTable, nil))
    |> add_docstring_to(AstNode.get_single(node, DocString, nil))
    |> tuplize(updated_context)
  end

  defp transform_node(%AstNode{rule_type: DocString} = node, context) do
    [separator_token | _] = AstNode.get_tokens(node, DocStringSeparator)

    media_type =
      case separator_token.matched_text |> String.trim() |> match_empty() do
        true -> nil
        false -> separator_token.matched_text
      end

    content =
      node
      |> AstNode.get_tokens(Other)
      |> Enum.reduce([], fn line_token, token_acc ->
        [line_token.matched_text, "\n" | token_acc]
      end)
      |> Enum.reverse()
      |> tl()
      |> Enum.join("")

    loc = Token.get_location(separator_token)

    %DocStringMessage{
      location: loc,
      content: content,
      delimiter: separator_token.matched_keyword
    }
    |> add_mediatype_to(media_type)
    |> tuplize(context)
  end

  defp transform_node(%AstNode{rule_type: DataTable} = node, context) do
    {rows, updated_context} = get_table_rows(node, context)
    location = rows |> List.first() |> Map.fetch!(:location)

    %DataTableMessage{location: location, rows: rows}
    |> tuplize(updated_context)
  end

  defp transform_node(%AstNode{rule_type: Background} = node, context) do
    back_ground_line = AstNode.get_token(node, BackgroundLine)
    description = get_description(node)
    steps = get_steps(node)
    loc = Token.get_location(back_ground_line)
    {id, updated_context} = get_id_and_update_context(context)

    m =
      %BackgroundMessage{
        id: id,
        location: loc,
        keyword: back_ground_line.matched_keyword,
        name: back_ground_line.matched_text,
        steps: steps
      }
      |> add_description_to(description)

    tuplize(m, updated_context)
  end

  defp transform_node(%AstNode{rule_type: ScenarioDefinition} = node, context) do
    {tags, semi_updated_context} = get_tags(node, context)
    scenario_node = AstNode.get_single(node, Scenario, nil)
    scenario_line = AstNode.get_token(scenario_node, ScenarioLine)
    description = get_description(scenario_node)
    steps = get_steps(scenario_node)
    example_list = AstNode.get_items(scenario_node, ExamplesDefinition)
    loc = Token.get_location(scenario_line)
    {id, updated_context} = get_id_and_update_context(semi_updated_context)

    m = %MessageScenario{
      description: description,
      id: id,
      location: loc,
      keyword: scenario_line.matched_keyword,
      name: scenario_line.matched_text,
      tags: tags,
      steps: steps,
      examples: example_list
    }

    tuplize(m, updated_context)
  end

  defp transform_node(%AstNode{rule_type: ExamplesDefinition} = node, context) do
    {tags, semi_updated_context} = get_tags(node, context)
    examples_node = AstNode.get_single(node, Examples, nil)
    examples_line = AstNode.get_token(examples_node, ExamplesLine)
    description = get_description(examples_node)
    rows = AstNode.get_single(examples_node, ExamplesTable, nil)
    loc = Token.get_location(examples_line)

    {id, updated_context} = get_id_and_update_context(semi_updated_context)

    example_message =
      %ExamplesMessage{
        id: id,
        location: loc,
        keyword: examples_line.matched_keyword,
        name: examples_line.matched_text,
        tags: tags
      }
      |> add_description_to(description)

    case rows != nil && !Enum.empty?(rows) do
      true ->
        table_header = hd(rows)
        table_body = tl(rows)

        example_message
        |> add_tableheader_to(table_header)
        |> add_tablebody_to(table_body)

      false ->
        example_message
    end
    |> tuplize(updated_context)
  end

  defp transform_node(%AstNode{rule_type: ExamplesTable} = node, context) do
    {rows, updated_context} = get_table_rows(node, context)
    tuplize(rows, updated_context)
  end

  defp transform_node(%AstNode{rule_type: Description} = node, context) do
    AstNode.get_tokens(node, Other)
    |> Enum.reverse()
    |> Enum.split_while(fn token ->
      token.matched_text
      |> String.trim()
      |> match_empty()
    end)
    |> elem(1)
    |> Enum.map(fn token -> token.matched_text end)
    |> Enum.reverse()
    |> Enum.join("\n")
    |> tuplize(context)
  end

  defp transform_node(%AstNode{rule_type: Feature} = n, context) do
    header_func = &AstNode.get_single(&1, FeatureHeader, %AstNode{rule_type: FeatureHeader})
    featureline_func = &AstNode.get_token(&1, FeatureLine)

    with {:header?, %AstNode{} = header} <- {:header?, header_func.(n)},
         {:feature_l?, %Token{} = fl} <- {:feature_l?, featureline_func.(header)},
         {:dialect?, dialect} when dialect != nil <- {:dialect?, fl.matched_gherkin_dialect} do
      background = AstNode.get_single(n, Background, nil)
      scen_def_items = AstNode.get_items(n, ScenarioDefinition)
      rule_items = AstNode.get_items(n, Rule)
      {tags, semi_updated_context} = get_tags(header, context)

      %FeatureMessage{
        tags: tags,
        language: dialect,
        location: Token.get_location(fl),
        keyword: fl.matched_keyword,
        name: fl.matched_text,
        description: get_description(header)
      }
      |> add_background_to(background)
      |> add_scen_def_children_to(scen_def_items)
      |> add_rule_children_to(rule_items)
      |> tuplize(semi_updated_context)

      # This (almost) never occurrs. IF this is possible, a test to illustrate what the expected output should be would be nice.
      # else
      #   {:header?, _} -> IEx.pry()
      #   {:feature_l?, _} -> IEx.pry()
      #   {:dialect?, _} -> IEx.pry()
    end
  end

  defp transform_node(%AstNode{rule_type: Rule} = node, context) do
    header_func = &AstNode.get_single(&1, RuleHeader, %AstNode{rule_type: RuleHeader})
    rule_line_func = &AstNode.get_token(&1, RuleLine)

    with {:header?, %AstNode{} = header} <- {:header?, header_func.(node)},
         {:rule_line?, %Token{} = rule_line} <- {:rule_line?, rule_line_func.(header)} do
      {tags, semi_updated_context} = get_tags(header, context)
      {id, updated_context} = get_id_and_update_context(semi_updated_context)
      description = get_description(header)
      background = AstNode.get_single(node, Background, nil)
      scenarios = AstNode.get_items(node, ScenarioDefinition)
      loc = Token.get_location(rule_line)

      %RuleMessage{
        id: id,
        location: loc,
        keyword: rule_line.matched_keyword,
        name: rule_line.matched_text,
        tags: tags
      }
      |> add_description_to(description)
      |> add_background_to(background)
      |> add_scen_def_children_to(scenarios)
      |> tuplize(updated_context)
    else
      {:header?, _} -> nil
      {:rule_line?, _} -> nil
      |> tuplize(context)
    end
  end

  defp transform_node(%AstNode{rule_type: GherkinDocument} = n, %ParserContext{} = context) do
    feature_message = AstNode.get_single(n, Feature, nil)

    new_gherkin_doc = %{context.ast_builder.gherkin_doc | feature: feature_message}
    new_builder = %{context.ast_builder | gherkin_doc: new_gherkin_doc}
    new_context = %{context | ast_builder: new_builder}

    tuplize(new_gherkin_doc, new_context)
  end

  defp transform_node(node, context), do: tuplize(node, context)

  ############################
  # HELPER FUNCTIONS         #
  ############################

  defp get_steps(node) do
    AstNode.get_items(node, Step)
  end

  defp get_description(node) do
    AstNode.get_single(node, Description, "")
  end

  defp get_table_rows(%AstNode{} = node, context) do
    tokens = CucumberGherkin.AstNode.get_tokens(node, TableRow)

    {reverse_result, updated_context} =
      Enum.reduce(tokens, {[], context}, fn %Token{} = t, {message_acc, context_acc} ->
        {id, semi_updated_context} = get_id_and_update_context(context_acc)
        m = %TableRowMessage{id: id, location: Token.get_location(t), cells: get_cells(t)}
        {[m | message_acc], semi_updated_context}
      end)

    reverse_result |> Enum.reverse() |> ensure_cell_count(updated_context)
  end

  # Even possible?
  defp ensure_cell_count([], %ParserContext{} = context), do: {[], context}

  defp ensure_cell_count([first | rest] = rs, %ParserContext{} = context) when is_list(rs) do
    case Enum.find(rest, &(length(first.cells) != length(&1.cells))) do
      nil ->
        {rs, context}

      %TableRowMessage{} = r ->
        error = %AstBuilderError{location: r.location} |> ParserException.generate_message()
        updated_context = %{context | errors: context.errors ++ [error]}
        {rs, updated_context}
    end
  end

  defp get_cells(%Token{items: items} = token) do
    base_location = %CucumberMessages.Location{} = Token.get_location(token)

    Enum.map(items, fn item ->
      updated_location = %{base_location | column: item.column}
      %TableCellMessage{location: updated_location, value: item.content}
    end)
  end

  defp get_tags(node, context),
    do: node |> AstNode.get_single(Tags, %AstNode{rule_type: None}) |> process_tags(context)

  # Even possible?
  defp process_tags(nil, context), do: {[], context}

  defp process_tags(%AstNode{} = tag_node, context) do
    {reversed_result, updated_context} =
      tag_node
      |> AstNode.get_tokens(TagLine)
      |> Enum.reduce({[], context}, fn token, {token_acc, context_acc} ->
        {reverse_subresult, semi_updated_context} = get_tags_from_token(token, context_acc)
        sub_result = Enum.reverse(reverse_subresult)
        {sub_result ++ [token_acc], semi_updated_context}
      end)

    result = reversed_result |> List.flatten() |> Enum.reverse()
    {result, updated_context}
  end

  defp get_tags_from_token(%Token{items: items} = token, context) do
    {tag_acc, context_acc} =
      Enum.reduce(items, {[], context}, fn tag_item, {tag_acc, context_acc} ->
        loc = %{Token.get_location(token) | column: tag_item.column}
        {id, semi_updated_context} = get_id_and_update_context(context_acc)
        message = %MessageTag{location: loc, name: tag_item.content, id: id}
        {[message | tag_acc], semi_updated_context}
      end)

    {Enum.reverse(tag_acc), context_acc}
  end

  defp add_tableheader_to(%ExamplesMessage{} = m, nil), do: m
  defp add_tableheader_to(%ExamplesMessage{} = m, d), do: %{m | table_header: d}

  defp add_tablebody_to(%ExamplesMessage{} = m, nil), do: m
  defp add_tablebody_to(%ExamplesMessage{} = m, d), do: %{m | table_body: d}

  defp add_description_to(m, nil), do: m
  defp add_description_to(%{description: _} = m, d), do: %{m | description: d}

  defp add_mediatype_to(%DocStringMessage{} = m, nil), do: m
  defp add_mediatype_to(%DocStringMessage{} = m, d), do: %{m | media_type: d}

  defp add_datatable_to(%StepMessage{} = m, nil), do: m
  defp add_datatable_to(%StepMessage{} = m, d), do: %{m | argument: {:data_table, d}}

  defp add_docstring_to(%StepMessage{} = m, nil), do: m
  defp add_docstring_to(%StepMessage{} = m, d), do: %{m | argument: {:doc_string, d}}

  defp add_background_to(m, nil), do: m

  defp add_background_to(%{__struct__: t} = m, d) when t in [FeatureMessage, RuleMessage] do
    child = %FeatureChildMessage{value: {:background, d}}
    %{m | children: m.children ++ [child]}
  end

  defp add_scen_def_children_to(%{__struct__: t} = m, scenario_definition_items)
       when t in [FeatureMessage, RuleMessage] do
    scenario_definition_items
    |> Enum.reduce(m, fn scenario_def, feature_message_acc ->
      child = %FeatureChildMessage{value: {:scenario, scenario_def}}
      %{feature_message_acc | children: feature_message_acc.children ++ [child]}
    end)
  end

  defp add_rule_children_to(%FeatureMessage{} = m, rule_items) do
    rule_items
    |> Enum.reduce(m, fn rule, feature_message_acc ->
      child = %FeatureChildMessage{value: {:rule, rule}}
      %{feature_message_acc | children: feature_message_acc.children ++ [child]}
    end)
  end

  defp tuplize(new_node, new_context), do: {new_node, new_context}

  defp match_empty(""), do: true
  defp match_empty(_str), do: false

  defp get_id_and_update_context(context) do
    {id, updated_generator} = CucumberGherkin.IdGenerator.get_id(context.ast_builder.id_gen)
    updated_context = %{context | ast_builder: %{context.ast_builder | id_gen: updated_generator}}
    {id, updated_context}
  end
end
