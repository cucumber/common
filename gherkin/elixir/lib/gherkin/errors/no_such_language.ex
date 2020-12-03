defmodule CucumberGherkin.NoSuchLanguageError do
  @moduledoc false
  defstruct [:language, :location]

  defimpl CucumberGherkin.ParserException do
    def get_message(%{language: lang, location: l}),
      do: "(#{l.line}:#{l.column}): Language not supported: #{lang}"

    def generate_message(%{} = error), do: %{error | message: get_message(error)}
    def get_location(%{location: l}), do: l
  end
end
