module Cucumber
  module CreateMeta
    module VariableExpression
      def evaluate(expression, env)
        return nil if expression.nil?
        begin
          expression.gsub(/\${(.*?)(?:(?<!\\)\/(.*)\/(.*))?}/) do
            variable = $1
            pattern = $2
            replacement = $3

            value = get_value(variable, env)
            raise "Undefined variable #{variable}" if value.nil?
            if pattern.nil?
              value
            else
              regexp = Regexp.new(pattern.gsub('\/', '/'))
              match = value.match(regexp)
              raise "No match for variable #{variable}" if match.nil?
              match[1..-1].each_with_index do |group, i|
                replacement = replacement.gsub("\\#{i+1}", group)
              end
              replacement
            end
          end
        rescue
          nil
        end
      end

      def get_value(variable, env)
        if variable.index('*')
          env.each do |name, value|
            return value if Regexp.new(variable.gsub('*', '.*')) =~ name
          end
        end
        env[variable]
      end
    end
  end
end
