defmodule ExGherkin.InvalidTagError do
  @moduledoc false
  defstruct [:message, :location]

  defimpl ExGherkin.ParserException do
    def get_message(%{location: l}),
      do: "(#{l.line}:#{l.column}): A tag may not contain whitespace"

    def generate_message(%{} = error), do: %{error | message: get_message(error)}
    def get_location(%{location: l}), do: l
  end
end
