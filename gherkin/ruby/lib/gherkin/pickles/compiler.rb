module Gherkin
  module Pickles
    class Compiler
      def initialize(id_generator)
        @id_generator = id_generator
      end

      def compile(gherkin_document, source)
        pickles = []

        return pickles unless gherkin_document[:feature]
        feature = gherkin_document[:feature]
        language = feature[:language]
        tags = feature[:tags]

        compile_feature(pickles, language, tags, feature, source)
        pickles
      end

      private

      def compile_feature(pickles, language, tags, feature, source)
        feature_background_steps = []
        feature[:children].each do |child|
          if child[:background]
            feature_background_steps.concat(child[:background][:steps])
          elsif child[:rule]
            compile_rule(pickles, language, tags, feature_background_steps, child[:rule], source)
          else
            scenario = child[:scenario]
            if scenario[:examples].empty?
              compile_scenario(tags, feature_background_steps, scenario, language, pickles, source)
            else
              compile_scenario_outline(tags, feature_background_steps, scenario, language, pickles, source)
            end
          end
        end
      end

      def compile_rule(pickles, language, feature_tags, feature_background_steps, rule, source)
        tags = [].concat(feature_tags).concat(rule[:tags])

        rule_background_steps = feature_background_steps.dup
        rule[:children].each do |child|
          if child[:background]
            rule_background_steps.concat(child[:background][:steps])
          else
            scenario = child[:scenario]
            if scenario[:examples].empty?
              compile_scenario(tags, rule_background_steps, scenario, language, pickles, source)
            else
              compile_scenario_outline(tags, rule_background_steps, scenario, language, pickles, source)
            end
          end
        end
      end

      def compile_scenario(inherited_tags, background_steps, scenario, language, pickles, source)
        steps = scenario[:steps].empty? ? [] : [].concat(pickle_steps(background_steps))

        tags = [].concat(inherited_tags).concat(scenario[:tags])

        scenario[:steps].each do |step|
          steps.push(pickle_step(step))
        end

        pickle = {
          uri: source[:uri],
          id: @id_generator.new_id,
          tags: pickle_tags(tags),
          name: scenario[:name],
          language: language,
          astNodeIds: [scenario[:id]],
          steps: steps
        }
        pickles.push(pickle)
      end

      def compile_scenario_outline(inherited_tags, background_steps, scenario, language, pickles, source)
        scenario[:examples].reject { |examples| examples[:tableHeader].nil? }.each do |examples|
          variable_cells = examples[:tableHeader][:cells]
          examples[:tableBody].each do |values_row|
            value_cells = values_row[:cells]
            steps = scenario[:steps].empty? ? [] : [].concat(pickle_steps(background_steps))
            tags = [].concat(inherited_tags).concat(scenario[:tags]).concat(examples[:tags])

            scenario[:steps].each do |scenario_step|
              step = pickle_step_props(scenario_step, variable_cells, values_row)
              steps.push(step)
            end

            pickle = {
              uri: source[:uri],
              id: @id_generator.new_id,
              name: interpolate(scenario[:name], variable_cells, value_cells),
              language: language,
              steps: steps,
              tags: pickle_tags(tags),
              astNodeIds: [
                scenario[:id],
                values_row[:id]
              ],
            }
            pickles.push(pickle)

          end
        end
      end

      def interpolate(name, variable_cells, value_cells)
        variable_cells.each_with_index do |variable_cell, n|
          value_cell = value_cells[n]
          name = name.gsub('<' + variable_cell[:value] + '>', value_cell[:value])
        end
        name
      end

      def pickle_steps(steps)
        steps.map do |step|
          pickle_step(step)
        end
      end

      def pickle_step(step)
        pickle_step_props(step, [], nil)
      end

      def pickle_step_props(step, variable_cells, values_row)
        value_cells = values_row ? values_row[:cells] : []
        props = {
          id: @id_generator.new_id,
          astNodeIds: [step[:id]],
          text: interpolate(step[:text], variable_cells, value_cells),
        }
        if values_row
          props[:astNodeIds].push(values_row[:id])
        end

        if step[:dataTable]
          data_table = {
            dataTable: pickle_data_table(step[:dataTable], variable_cells, value_cells)
          }
          props[:argument] = data_table
        end
        if step[:docString]
          doc_string = {
            docString: pickle_doc_string(step[:docString], variable_cells, value_cells)
          }
          props[:argument] = doc_string
        end
        props
      end

      def pickle_data_table(data_table, variable_cells, value_cells)
        {
          rows: data_table[:rows].map do |row|
            {
              cells: row[:cells].map do |cell|
                {
                  value: interpolate(cell[:value], variable_cells, value_cells)
                }
              end
            }
          end
        }
      end

      def pickle_doc_string(doc_string, variable_cells, value_cells)
        props = {
          content: interpolate(doc_string[:content], variable_cells, value_cells)
        }
        if doc_string[:mediaType]
          props[:mediaType] = interpolate(doc_string[:mediaType], variable_cells, value_cells)
        end
        props
      end

      def pickle_tags(tags)
        tags.map {|tag| pickle_tag(tag)}
      end

      def pickle_tag(tag)
        {
          name: tag[:name],
          astNodeId: tag[:id]
        }
      end
    end
  end
end
