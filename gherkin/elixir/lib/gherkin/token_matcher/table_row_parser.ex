defmodule CucumberGherkin.TokenMatcher.TableRowParser do
  @moduledoc false
  alias CucumberGherkin.{Line, Token}

  def parse(TableRow, %Line{content: line_content} = l, context) do
    default_meta_info = %{
      before_first: true,
      escape: false,
      col: 1,
      txt: [],
      token_col: -1,
      item_offset: 0
    }

    {meta, unsorted_acc} = parse_line(default_meta_info, line_content, [])
    acc = Enum.sort_by(unsorted_acc, & &1.column)

    new_token =
      struct!(Token, matched_type: TableRow, line: l, items: acc, indent: meta.token_col)

    CucumberGherkin.TokenMatcher.finalize_parse(context, new_token)
  end

  # line has ended
  defp parse_line(meta, "", acc), do: {meta, acc}

  # ################### #
  # cell escape section #
  # ################### #

  # matches below is for the if (escape) part in the java code
  #   characters ['n', '\\', '|'] are escapable
  defp parse_line(%{escape: true} = m, <<"n", r::binary>>, a) do
    m
    |> meta_disable_escape
    |> meta_col_plus1()
    |> meta_offset_plus1()
    |> meta_add_char('\n')
    |> parse_line(r, a)
  end

  defp parse_line(%{escape: true} = m, <<"\\", r::binary>>, a) do
    m
    |> meta_disable_escape
    |> meta_col_plus1()
    |> meta_offset_plus1()
    |> meta_add_char('\\')
    |> parse_line(r, a)
  end

  defp parse_line(%{escape: true} = m, <<"|", r::binary>>, a) do
    m
    |> meta_disable_escape
    |> meta_col_plus1()
    |> meta_offset_plus1()
    |> meta_add_char('|')
    |> parse_line(r, a)
  end

  # Invalid escape, just add the backslack and character.
  defp parse_line(%{escape: true} = meta, <<char::utf8, rem::binary>>, acc) do
    meta
    |> meta_disable_escape
    |> meta_col_plus1()
    |> meta_add_char('\\')
    |> meta_add_char(char)
    |> parse_line(rem, acc)
  end

  # #################### #
  # cell content section #
  # #################### #

  # matches below is for when characters are not escaped.
  #   e.g. this one parses the backslash char and enables escaping.
  defp parse_line(%{escape: false} = meta, <<"\\", rem::binary>>, acc) do
    meta
    |> meta_enable_escape()
    |> meta_col_plus1()
    |> parse_line(rem, acc)
  end

  # First table cell sep is detected.
  #   Throw away previous text and enable cell content recording.
  defp parse_line(%{escape: false, before_first: true} = meta, <<"|", rem::binary>>, acc) do
    meta
    |> meta_reset_txt()
    |> meta_disable_be4_first()
    |> meta_record_indent_4_token()
    |> meta_col_plus1()
    |> parse_line(rem, acc)
  end

  # Next table cell sep is detected. Make an item and put it in the accumulator.
  defp parse_line(%{escape: false, item_offset: offset} = meta, <<"|", rem::binary>>, acc) do
    raw = meta.txt |> replace_invalid_chars |> Enum.reverse() |> List.to_string()
    ltrimmed_content = String.trim_leading(raw, " ")
    col_loc = meta.col - String.length(ltrimmed_content) - offset

    item = %{column: col_loc, content: raw |> String.trim(" ")}

    meta
    |> meta_reset_txt()
    |> meta_col_plus1()
    |> meta_reset_offset()
    |> parse_line(rem, [item | acc])
  end

  # Cell content recording
  defp parse_line(%{escape: false} = meta, <<char::utf8, rem::binary>>, acc) do
    meta
    |> meta_add_char(char)
    |> meta_col_plus1()
    |> parse_line(rem, acc)
  end

  # ################ #
  # helper functions #
  # ################ #

  defp meta_add_char(m, char), do: %{m | txt: [char | m.txt]}
  defp meta_enable_escape(%{escape: false} = m), do: %{m | escape: true}
  defp meta_disable_escape(%{escape: true} = m), do: %{m | escape: false}
  defp meta_disable_be4_first(%{before_first: true} = m), do: %{m | before_first: false}
  defp meta_col_plus1(m), do: %{m | col: m.col + 1}
  defp meta_reset_txt(m), do: %{m | txt: []}
  defp meta_reset_offset(m), do: %{m | item_offset: 0}
  defp meta_offset_plus1(m), do: %{m | item_offset: m.item_offset + 1}
  defp meta_record_indent_4_token(m), do: %{m | token_col: m.col}

  defp replace_invalid_chars(list_of_chars) when is_list(list_of_chars) do
    Enum.map(list_of_chars, fn
      i when i in [9, 160] -> 32
      i -> i
    end)
  end
end
