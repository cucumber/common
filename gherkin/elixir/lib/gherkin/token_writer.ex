defmodule CucumberGherkin.TokenWriter do
  @moduledoc false
  alias CucumberGherkin.{ParserContext, Token}

  def write_tokens(%ParserContext{tokens: t}) do
    Enum.map(t, &write_token/1) |> Enum.join("\n")
  end

  defp write_token(%Token{matched_type: EOF}), do: "EOF\n"

  defp write_token(%Token{line: l, indent: i, matched_type: type, items: is})
       when type in [TagLine, TableRow] do
    mt = type |> Atom.to_string() |> String.trim("Elixir.")
    item_text = Enum.map(is, &write_single_item_line/1) |> Enum.join(",")
    "(#{l.index}:#{i})#{mt}://#{item_text}"
  end

  defp write_token(%Token{line: l, indent: i, matched_keyword: nil} = t) do
    mt = t.matched_type |> Atom.to_string() |> String.trim("Elixir.")
    "(#{l.index}:#{i})#{mt}:/#{t.matched_text}/"
  end

  defp write_token(%Token{line: l, indent: i, matched_keyword: mk} = t) do
    mt = t.matched_type |> Atom.to_string() |> String.trim("Elixir.")
    "(#{l.index}:#{i})#{mt}:#{mk}/#{t.matched_text}/"
  end

  defp write_single_item_line(%{column: col, content: ct}), do: "#{col}:#{ct}"
end
