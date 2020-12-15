# credo:disable-for-this-file
defmodule(CucumberMessages.StepDefinition.StepDefinitionPattern.StepDefinitionPatternType) do
  @moduledoc(false)
  (
    (
      @spec(default() :: :CUCUMBER_EXPRESSION)
      def(default()) do
        :CUCUMBER_EXPRESSION
      end
    )
    @spec(encode(atom) :: integer | atom)
    [def(encode(:CUCUMBER_EXPRESSION)) do
      0
    end, def(encode(:REGULAR_EXPRESSION)) do
      1
    end]
    def(encode(x)) do
      x
    end
    @spec(decode(integer) :: atom | integer)
    [def(decode(0)) do
      :CUCUMBER_EXPRESSION
    end, def(decode(1)) do
      :REGULAR_EXPRESSION
    end]
    def(decode(x)) do
      x
    end
    @spec(constants() :: [{integer, atom}])
    def(constants()) do
      [{0, :CUCUMBER_EXPRESSION}, {1, :REGULAR_EXPRESSION}]
    end
  )
  []
end