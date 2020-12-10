defmodule CucumberGherkin.UnexpectedEOFError do
  @moduledoc false
  defstruct [:line, :expected_tokens, :comment]

  defimpl CucumberGherkin.ParserException do
    def get_message(%{} = me) do
      location =
        struct!(CucumberGherkin.Token, line: me.line) |> CucumberGherkin.Token.get_location()

      expected_string = Enum.join(me.expected_tokens, ", ")
      base = "(#{location.line}:0): "
      base <> "unexpected end of file, expected: #{expected_string}"
    end

    def generate_message(%{} = error), do: %{error | message: get_message(error)}

    def get_location(%{} = me),
      do:
        struct!(CucumberGherkin.Token, line: me.line)
        |> CucumberGherkin.Token.get_location()
        |> Map.put(:column, 0)
  end
end
