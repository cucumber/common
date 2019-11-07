require 'securerandom'

module Gherkin
  module IdGenerator

    class IdGenerator
      # To be implemented by sub-classes
      # def new_id
      # end
    end

    class Incrementing < IdGenerator
      def initialize
        @index = -1
      end

      def new_id
        @index += 1
        @index.to_s
      end
    end

    class UUID < IdGenerator
      def new_id
        SecureRandom.uuid
      end
    end
  end
end