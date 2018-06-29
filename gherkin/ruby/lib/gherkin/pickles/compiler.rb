require 'cucumber/messages'

module Gherkin
  module Pickles
    class Compiler
      def compile(gherkin_document, uri)
        pickles = []

        return pickles unless gherkin_document.feature
        feature = gherkin_document.feature
        language = feature.language
        tags = feature.tags

        compile_feature(pickles, language, tags, feature, uri)
        pickles
      end

      private

      def compile_feature(pickles, language, tags, feature, uri)
        background_steps = []
        feature.children.each do |child|
          if child.background
            background_steps.concat(pickle_steps(child.background.steps))
          elsif child.rule
            compile_rule(pickles, language, tags, background_steps, child.rule, uri)
          else
            scenario = child.scenario
            if scenario.examples.empty?
              compile_scenario(tags, background_steps, scenario, language, pickles, uri)
            else
              compile_scenario_outline(tags, background_steps, scenario, language, pickles, uri)
            end
          end
        end
      end

      def compile_rule(pickles, language, tags, feature_background_steps, rule, uri)
        background_steps = feature_background_steps.dup
        rule.children.each do |child|
          if child.background
            background_steps.concat(pickle_steps(child.background.steps))
          else
            scenario = child.scenario
            if scenario.examples.empty?
              compile_scenario(tags, background_steps, scenario, language, pickles, uri)
            else
              compile_scenario_outline(tags, background_steps, scenario, language, pickles, uri)
            end
          end
        end
      end

      def compile_scenario(feature_tags, background_steps, scenario, language, pickles, uri)
        steps = scenario.steps.empty? ? [] : [].concat(background_steps)

        tags = [].concat(feature_tags).concat(scenario.tags)

        scenario.steps.each do |step|
          steps.push(pickle_step(step))
        end

        pickle = Cucumber::Messages::Pickle.new(
          uri: uri,
          tags: pickle_tags(tags),
          name: scenario.name,
          language: language,
          locations: [scenario.location],
          steps: steps
        )
        pickles.push(pickle)
      end

      def compile_scenario_outline(feature_tags, background_steps, scenario, language, pickles, uri)
        scenario.examples.reject { |examples| examples.table_header.nil? }.each do |examples|
          variable_cells = examples.table_header.cells
          examples.table_body.each do |values|
            value_cells = values.cells
            steps = scenario.steps.empty? ? [] : [].concat(background_steps)
            tags = [].concat(feature_tags).concat(scenario.tags).concat(examples.tags)

            scenario.steps.each do |scenario_outline_step|
              step_props = pickle_step_props(scenario_outline_step, variable_cells, value_cells)
              step_props[:locations].push(values.location)
              steps.push(Cucumber::Messages::PickleStep.new(step_props))
            end

            pickle = Cucumber::Messages::Pickle.new(
              uri: uri,
              name: interpolate(scenario.name, variable_cells, value_cells),
              language: language,
              steps: steps,
              tags: pickle_tags(tags),
              locations: [
                scenario.location,
                values.location
              ]
            )
            pickles.push(pickle);

          end
        end
      end

      def create_pickle_arguments(argument, variable_cells, value_cells)
        result = []
        return result if argument.nil?
        if (argument[:type] == :DataTable)
          table = {
            rows: argument[:rows].map do |row|
              {
                cells: row[:cells].map do |cell|
                  {
                    location: cell.location,
                    value: interpolate(cell.value, variable_cells, value_cells)
                  }
                end
              }
            end
          }
          result.push(table)
        elsif (argument[:type] == :DocString)
          doc_string = {
            location: pickle_location(argument.location),
            content: interpolate(argument[:content], variable_cells, value_cells)
          }
          if argument.key?(:contentType)
            doc_string[:contentType] = interpolate(argument[:contentType], variable_cells, value_cells)
          end
          result.push(doc_string)
        else
          raise 'Internal error'
        end
        result
      end

      def interpolate(name, variable_cells, value_cells)
        variable_cells.each_with_index do |variable_cell, n|
          value_cell = value_cells[n]
          name = name.gsub('<' + variable_cell.value + '>', value_cell.value)
        end
        name
      end

      def pickle_steps(steps)
        steps.map do |step|
          pickle_step(step)
        end
      end

      def pickle_step(step)
        Cucumber::Messages::PickleStep.new(pickle_step_props(step, [], []))
      end

      def pickle_step_props(step, variable_cells, value_cells)
        props = {
          text: interpolate(step.text, variable_cells, value_cells),
          locations: [pickle_step_location(step)]
        }

        if step.data_table
          props[:data_table] = pickle_data_table(step.data_table, variable_cells, value_cells)
        end
        if step.doc_string
          props[:doc_string] = pickle_doc_string(step.doc_string, variable_cells, value_cells)
        end
        props
      end

      def pickle_data_table(data_table, variable_cells, value_cells)
        Cucumber::Messages::PickleTable.new(
          rows: data_table.rows.map do |row|
            Cucumber::Messages::PickleTableRow.new(
              cells: row.cells.map do |cell|
                Cucumber::Messages::PickleTableCell.new(
                  location: cell.location,
                  value: interpolate(cell.value, variable_cells, value_cells)
                )
              end
            )
          end
        )
      end

      def pickle_doc_string(doc_string, variable_cells, value_cells)
        props = {
          location: doc_string.location,
          content: interpolate(doc_string.content, variable_cells, value_cells)
        }
        if doc_string.content_type
          props[:contentType] = interpolate(doc_string.content_type, variable_cells, value_cells)
        end
        Cucumber::Messages::PickleDocString.new(props)
      end

      def pickle_step_location(step)
        Cucumber::Messages::Location.new(
          line: step.location.line,
          column: step.location.column + (step.keyword ? step.keyword.length : 0)
        )
      end

      def pickle_tags(tags)
        tags.map {|tag| pickle_tag(tag)}
      end

      def pickle_tag(tag)
        Cucumber::Messages::PickleTag.new(
          name: tag.name,
          location: tag.location
        )
      end
    end
  end
end
