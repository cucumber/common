defmodule CucumberGherkin.AstBuilderError do
  @moduledoc false
  defstruct [:message, :location]

  defimpl CucumberGherkin.ParserException do
    def get_message(%{location: l}),
      do: "(#{l.line}:#{l.column}): inconsistent cell count within the table"

    def generate_message(%{} = error), do: %{error | message: get_message(error)}
    def get_location(%{location: l}), do: l
  end
end
