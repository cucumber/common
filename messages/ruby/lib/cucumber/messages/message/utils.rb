module Cucumber
  module Messages
    class Message
      module Utils
        module ClassMethods

          ##
          # Makes an underscored, lowercase form from the expression in the string.
          #
          #   underscore('GherkinDocument')         # => "gherkin_document"
          #
          # This is a simplified version of the Ruby on Rails implementation
          # https://github.com/rails/rails/blob/v6.1.3.2/activesupport/lib/active_support/inflector/methods.rb#L92

          def underscore(term)
            return term unless /[A-Z-]/.match?(term)

            word = term.gsub(/([A-Z\d]+)([A-Z][a-z])/, '\1_\2')
            word.gsub!(/([a-z\d])([A-Z])/, '\1_\2')
            word.tr!("-", "_")
            word.downcase!
            word
          end

          ##
          # Converts strings to UpperCamelCase.
          #
          #   camelize('gherkin_document')                # => "GherkinDocument"
          #
          # This is a simplified version of the Ruby on Rails implementation
          # https://github.com/rails/rails/blob/v6.1.3.2/activesupport/lib/active_support/inflector/methods.rb#L69

          def camelize(term)
            camelized = term.to_s
            camelized.gsub!(/(?:_|(\/))([a-z\d]*)/i) { "#{$1}#{$2.capitalize}" }
            camelized
          end
        end

        def self.included(other)
          other.extend(ClassMethods)
        end
      end
    end
  end
end