defmodule ExGherkin.UnexpectedTokenError do
  @moduledoc false
  defstruct [:line, :expected_tokens, :comment]

  defimpl ExGherkin.ParserException do
    def get_message(%{} = me) do
      location = struct!(ExGherkin.Token, line: me.line) |> ExGherkin.Token.get_location()
      expected_string = Enum.join(me.expected_tokens, ", ")
      base = "(#{location.line}:#{location.column}): "
      base <> "expected: #{expected_string}, got '#{me.line.content}'"
    end

    def generate_message(%{} = error), do: %{error | message: get_message(error)}

    def get_location(%{} = me),
      do: struct!(ExGherkin.Token, line: me.line) |> ExGherkin.Token.get_location()
  end
end
