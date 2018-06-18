module Gherkin
  module Pickles
    class Compiler
      def compile(gherkin_document)
        pickles = []

        return pickles unless gherkin_document[:feature]
        feature = gherkin_document[:feature]
        language = feature[:language]
        tags = feature[:tags]
        background_steps = []

        build(pickles, language, tags, background_steps, feature)
        pickles
      end

      private

      def build(pickles, language, tags, parent_background_steps, parent)
        background_steps = parent_background_steps.dup
        parent[:children].each do |child|
          if child[:type] == :Background
            background_steps.concat(pickle_steps(child))
          elsif child[:type] == :Rule
            build(pickles, language, tags, background_steps, child)
          else
            scenario = child
            if scenario[:examples].empty?
              compile_scenario(tags, background_steps, scenario, language, pickles)
            else
              compile_scenario_outline(tags, background_steps, scenario, language, pickles)
            end
          end
        end
      end

      def compile_scenario(feature_tags, background_steps, scenario, language, pickles)
        steps = scenario[:steps].empty? ? [] : [].concat(background_steps)

        tags = [].concat(feature_tags).concat(scenario[:tags])

        scenario[:steps].each do |step|
          steps.push(pickle_step(step))
        end

        pickle = {
          tags: pickle_tags(tags),
          name: scenario[:name],
          language: language,
          locations: [pickle_location(scenario[:location])],
          steps: steps
        }
        pickles.push(pickle)
      end

      def compile_scenario_outline(feature_tags, background_steps, scenario, language, pickles)
        scenario[:examples].reject { |examples| examples[:tableHeader].nil? }.each do |examples|
          variable_cells = examples[:tableHeader][:cells]
          examples[:tableBody].each do |values|
            value_cells = values[:cells]
            steps = scenario[:steps].empty? ? [] : [].concat(background_steps)
            tags = [].concat(feature_tags).concat(scenario[:tags]).concat(examples[:tags])

            scenario[:steps].each do |scenario_outline_step|
              step_text = interpolate(scenario_outline_step[:text], variable_cells, value_cells);
              arguments = create_pickle_arguments(scenario_outline_step[:argument], variable_cells, value_cells)
              pickle_step = {
                text: step_text,
                arguments: arguments,
                locations: [
                  pickle_location(values[:location]),
                  pickle_step_location(scenario_outline_step)
                ]
              }
              steps.push(pickle_step)
            end

            pickle = {
              name: interpolate(scenario[:name], variable_cells, value_cells),
              language: language,
              steps: steps,
              tags: pickle_tags(tags),
              locations: [
                pickle_location(values[:location]),
                pickle_location(scenario[:location])
              ]
            }
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
                    location: pickle_location(cell[:location]),
                    value: interpolate(cell[:value], variable_cells, value_cells)
                  }
                end
              }
            end
          }
          result.push(table)
        elsif (argument[:type] == :DocString)
          doc_string = {
            location: pickle_location(argument[:location]),
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
          name = name.gsub('<' + variable_cell[:value] + '>', value_cell[:value])
        end
        name
      end

      def pickle_steps(scenario_definition)
        scenario_definition[:steps].map do |step|
          pickle_step(step)
        end
      end

      def pickle_step(step)
        {
          text: step[:text],
          arguments: create_pickle_arguments(step[:argument], [], []),
          locations: [pickle_step_location(step)]
        }
      end

      def pickle_step_location(step)
        {
          line: step[:location][:line],
          column: step[:location][:column] + (step[:keyword] ? step[:keyword].length : 0)
        }
      end

      def pickle_location(location)
        {
          line: location[:line],
          column: location[:column]
        }
      end

      def pickle_tags(tags)
        tags.map {|tag| pickle_tag(tag)}
      end

      def pickle_tag(tag)
        {
          name: tag[:name],
          location: pickle_location(tag[:location])
        }
      end
    end
  end
end
