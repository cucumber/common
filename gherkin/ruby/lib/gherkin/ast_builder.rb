require 'cucumber/messages'
require_relative 'ast_node'

module Gherkin
  class AstBuilder
    def initialize(id_generator)
      @id_generator = id_generator
      reset
    end

    def reset
      @stack = [AstNode.new(:None)]
      @comments = []
    end

    def start_rule(rule_type)
      @stack.push AstNode.new(rule_type)
    end

    def end_rule(rule_type)
      node = @stack.pop
      current_node.add(node.rule_type, transform_node(node))
    end

    def build(token)
      if token.matched_type == :Comment
        @comments.push(Cucumber::Messages::Comment.new(
          location: get_location(token, 0),
          text: token.matched_text
        ))
      else
        current_node.add(token.matched_type, token)
      end
    end

    def get_result
      current_node.get_single(:GherkinDocument)
    end

    def current_node
      @stack.last
    end

    def get_location(token, column)
      column = column == 0 ? token.location[:column] : column
      Cucumber::Messages::Location.new(
        line: token.location[:line],
        column: column
      )
    end

    def get_tags(node)
      tags = []
      tags_node = node.get_single(:Tags)
      return tags unless tags_node

      tags_node.get_tokens(:TagLine).each do |token|
        token.matched_items.each do |tag_item|
          tags.push(Cucumber::Messages::Tag.new(
            location: get_location(token, tag_item.column),
            name: tag_item.text,
            id: @id_generator.new_id
          ))
        end
      end

      tags
    end

    def get_table_rows(node)
      rows = node.get_tokens(:TableRow).map do |token|
        Cucumber::Messages::TableRow.new(
          id: @id_generator.new_id,
          location: get_location(token, 0),
          cells: get_cells(token)
        )
      end
      ensure_cell_count(rows)
      rows
    end

    def ensure_cell_count(rows)
      return if rows.empty?
      cell_count = rows[0].cells.length
      rows.each do |row|
        if row.cells.length != cell_count
          raise AstBuilderException.new("inconsistent cell count within the table", row.location.to_h)
        end
      end
    end

    def get_cells(table_row_token)
      table_row_token.matched_items.map do |cell_item|
        Cucumber::Messages::TableCell.new(
          location: get_location(table_row_token, cell_item.column),
          value: cell_item.text
        )
      end
    end

    def get_description(node)
      node.get_single(:Description) || ''
    end

    def get_steps(node)
      node.get_items(:Step)
    end

    def transform_node(node)
      case node.rule_type
      when :Step
        step_line = node.get_token(:StepLine)
        data_table = node.get_single(:DataTable)
        doc_string = node.get_single(:DocString)

        step = Cucumber::Messages::Step.new(
          location: get_location(step_line, 0),
          keyword: step_line.matched_keyword,
          text: step_line.matched_text,
          data_table: data_table,
          doc_string: doc_string,
          id: @id_generator.new_id
        )
      when :DocString
        separator_token = node.get_tokens(:DocStringSeparator)[0]
        media_type = separator_token.matched_text == '' ? nil : separator_token.matched_text
        line_tokens = node.get_tokens(:Other)
        content = line_tokens.map { |t| t.matched_text }.join("\n")

        Cucumber::Messages::DocString.new(
          location: get_location(separator_token, 0),
          content: content,
          delimiter: separator_token.matched_keyword,
          media_type: media_type
        )
      when :DataTable
        rows = get_table_rows(node)
        Cucumber::Messages::DataTable.new(
          location: rows[0].location,
          rows: rows
        )
      when :Background
        background_line = node.get_token(:BackgroundLine)
        description = get_description(node)
        steps = get_steps(node)

        Cucumber::Messages::Background.new(
          id: @id_generator.new_id,
          location: get_location(background_line, 0),
          keyword: background_line.matched_keyword,
          name: background_line.matched_text,
          description: description,
          steps: steps
        )
      when :ScenarioDefinition
        tags = get_tags(node)
        scenario_node = node.get_single(:Scenario)
        scenario_line = scenario_node.get_token(:ScenarioLine)
        description = get_description(scenario_node)
        steps = get_steps(scenario_node)
        examples = scenario_node.get_items(:ExamplesDefinition)
        Cucumber::Messages::Scenario.new(
          id: @id_generator.new_id,
          tags: tags,
          location: get_location(scenario_line, 0),
          keyword: scenario_line.matched_keyword,
          name: scenario_line.matched_text,
          description: description,
          steps: steps,
          examples: examples
        )
      when :ExamplesDefinition
        tags = get_tags(node)
        examples_node = node.get_single(:Examples)
        examples_line = examples_node.get_token(:ExamplesLine)
        description = get_description(examples_node)
        rows = examples_node.get_single(:ExamplesTable)

        table_header = rows.nil? ? nil : rows.first
        table_body = rows.nil? ? [] : rows[1..-1]

        Cucumber::Messages::Examples.new(
          id: @id_generator.new_id,
          tags: tags,
          location: get_location(examples_line, 0),
          keyword: examples_line.matched_keyword,
          name: examples_line.matched_text,
          description: description,
          table_header: table_header,
          table_body: table_body
        )
      when :ExamplesTable
        get_table_rows(node)
      when :Description
        line_tokens = node.get_tokens(:Other)
        # Trim trailing empty lines
        last_non_empty = line_tokens.rindex { |token| !token.line.trimmed_line_text.empty? }
        description = line_tokens[0..last_non_empty].map { |token| token.matched_text }.join("\n")
        return description
      when :Feature
        header = node.get_single(:FeatureHeader)
        return unless header
        tags = get_tags(header)
        feature_line = header.get_token(:FeatureLine)
        return unless feature_line
        children = []
        background = node.get_single(:Background)
        children.push(Cucumber::Messages::FeatureChild.new(background: background)) if background
        node.get_items(:ScenarioDefinition).each do |scenario|
          children.push(Cucumber::Messages::FeatureChild.new(scenario: scenario))
        end
        node.get_items(:Rule).each do |rule|
          children.push(Cucumber::Messages::FeatureChild.new(rule: rule))
        end
        description = get_description(header)
        language = feature_line.matched_gherkin_dialect

        Cucumber::Messages::Feature.new(
          tags: tags,
          location: get_location(feature_line, 0),
          language: language,
          keyword: feature_line.matched_keyword,
          name: feature_line.matched_text,
          description: description,
          children: children,
        )
      when :Rule
        header = node.get_single(:RuleHeader)
        return unless header
        rule_line = header.get_token(:RuleLine)
        return unless rule_line
        tags = get_tags(header)
        children = []
        background = node.get_single(:Background)
        children.push(Cucumber::Messages::RuleChild.new(background: background)) if background
        node.get_items(:ScenarioDefinition).each do |scenario|
          children.push(Cucumber::Messages::RuleChild.new(scenario: scenario))
        end
        description = get_description(header)

        Cucumber::Messages::Rule.new(
          id: @id_generator.new_id,
          tags: tags,
          location: get_location(rule_line, 0),
          keyword: rule_line.matched_keyword,
          name: rule_line.matched_text,
          description: description,
          children: children,
        )
      when :GherkinDocument
        feature = node.get_single(:Feature)
        Cucumber::Messages::GherkinDocument.new(
          comments: @comments,
          feature: feature
        )
      else
        return node
      end
    end
  end
end
