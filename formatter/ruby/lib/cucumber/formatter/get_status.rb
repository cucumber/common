module Cucumber
  module Formatter

    # TODO TDD me
    class GetStatus
      def self.for_result(result)
        visitor = self.new
        result.describe_to(visitor)
        return visitor.status
      end

      def initialize
        @status = nil
      end

      def passed
        @status = Messages::Status::PASSED
      end

      def failed
      end

      def undefined
      end

      def skipped
      end

      def pending(exception, *)
      end

      def exception(exception, *)
      end

      def duration(*)
      end

      def status
        raise "not ready" unless @status
        @status
      end
    end

  end
end
