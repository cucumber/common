defmodule CucumberGherkin.TokenMatcher.TagLineParser do
  @moduledoc false
  @constants %{
    tag: "@",
    comment: "#",
    title_keyword_sep: ":",
    table_cell: "|",
    docstring_sep: "\"\"\"",
    docstring_alt_sep: "```"
  }

  alias CucumberGherkin.{Line, Token, InvalidTagError, ParserException}
  alias CucumberMessages.Location

  def parse(TagLine, %Line{content: c} = l, context) do
    raw_tags_line =
      case String.split(c, "\s#{@constants.comment}", parts: 2) do
        [tags, _possible_comments] -> tags
        [raw_tags_line] -> raw_tags_line
      end

    %{tags: unfiltered_tags} =
      raw_tags_line
      |> String.split("@")
      |> Enum.reduce(%{tags: [], column: 0}, fn string, acc ->
        case String.trim(string) do
          "" ->
            %{acc | column: acc.column + String.length(string)}

          trimmed_str ->
            clean_string = "@" <> trimmed_str
            new_token = %{content: clean_string, column: acc.column + 1}
            %{acc | tags: [new_token | acc.tags], column: acc.column + String.length(string) + 1}
        end
      end)

    unfiltered_tags = Enum.sort_by(unfiltered_tags, & &1.column)

    %{column: new_indent} = unfiltered_tags |> Enum.min_by(& &1.column)

    updated_context = tags_contain_whitespaces?(unfiltered_tags, l, context)

    new_token =
      struct!(Token, line: l, indent: new_indent, matched_type: TagLine, items: unfiltered_tags)

    CucumberGherkin.TokenMatcher.finalize_parse(updated_context, new_token)
  end

  defp tags_contain_whitespaces?(tags, line, context) do
    Enum.reduce(tags, context, fn %{column: col, content: cont}, context_acc ->
      case cont |> String.trim() |> String.contains?(" ") do
        true ->
          location = %Location{line: line.index, column: col}
          error = %InvalidTagError{location: location} |> ParserException.generate_message()
          %{context | errors: context.errors ++ [error]}

        false ->
          context_acc
      end
    end)
  end
end
