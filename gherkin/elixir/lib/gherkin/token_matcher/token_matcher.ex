defmodule CucumberGherkin.TokenMatcher do
  @moduledoc false
  @constants %{
    tag: "@",
    comment: "#",
    title_keyword_sep: ":",
    table_cell: "|"
  }
  @doc_sep "\"\"\""
  @doc_sep_alt "```"

  @language_regex ~r/^\s*#\s*language\s*:\s*(?<lang>[a-zA-Z\-_]+)\s*$/

  alias CucumberGherkin.{Token, Line, NoSuchLanguageError}
  alias CucumberGherkin.ParserContext, as: PC
  alias CucumberGherkin.Lexicon

  # ############# #
  # Match section #
  # ############# #

  def match?(EOF, %Line{content: ""}, %PC{lines: []}), do: true
  def match?(EOF, %Line{}, _context), do: false

  def match?(Empty, %Line{content: c}, %PC{forced_eof?: false}),
    do: c |> String.trim() |> match_empty()

  def match?(Empty, %Line{}, %PC{forced_eof?: true}), do: false

  def match?(Comment, %Line{content: c}, _), do: my_starts_with?(c, @constants.comment)
  def match?(TagLine, %Line{content: c}, _), do: my_starts_with?(c, @constants.tag)
  def match?(TableRow, %Line{content: c}, _), do: my_starts_with?(c, @constants.table_cell)
  def match?(Language, %Line{content: c}, _context), do: Regex.match?(@language_regex, c)
  def match?(Other, %Line{}, _context), do: true

  def match?(DocStringSeparator, %Line{content: c}, %PC{docstring_sep: nil}) do
    my_starts_with?(c, @doc_sep) || my_starts_with?(c, @doc_sep_alt) || false
  end

  def match?(DocStringSeparator, %Line{content: c}, %PC{docstring_sep: sep})
      when sep in [@doc_sep, @doc_sep_alt] do
    my_starts_with?(c, sep) || false
  end

  def match?(type, %Line{content: c}, %PC{lexicon: lex})
      when type in [FeatureLine, RuleLine, BackgroundLine, StepLine, ExamplesLine, ScenarioLine] do
    Lexicon.load_keywords(type, lex) |> match_line(type, c) || false
  end

  # ############## #
  # Helper section #
  # ############## #

  defp match_line(keywords, type, string)
       when type in [FeatureLine, RuleLine, BackgroundLine, ExamplesLine, ScenarioLine] do
    keywords
    |> Enum.map(&"#{&1}#{@constants.title_keyword_sep}")
    |> Enum.find(&(string |> String.trim() |> String.starts_with?(&1)))
  end

  defp match_line(keywords, StepLine, string),
    do: Enum.find(keywords, &(string |> String.trim() |> String.starts_with?(&1)))

  defp base_title_regex(key), do: ~r/(?<indent>\s*)#{key}\s*(?<matched_text>.*)/
  defp base_key_regex(key), do: ~r/(?<indent>\s*)#{Regex.escape(key)}(?<matched_text>.*)/
  defp base_docstring_regex(sep), do: ~r/(?<indent>\s*)#{sep}(?<matched_text>.*)/

  defp match_empty(""), do: true
  defp match_empty(_str), do: false

  defp my_starts_with?(text, prefix) do
    text |> String.trim() |> String.starts_with?(prefix)
  end

  def trim_x(binary, _char, 0), do: binary
  def trim_x(<<char::binary-size(1), rest::binary>>, char, n), do: trim_x(rest, char, n - 1)
  def trim_x(binary, _char, _n), do: binary

  # ############# #
  # Parse section #
  # ############# #

  def parse(type, %Line{} = l, context) when type in [EOF, Empty] do
    token = struct!(Token, line: l, matched_type: type)
    finalize_parse(context, token)
  end

  def parse(Comment = type, %Line{} = l, context) do
    token = struct!(Token, line: l, matched_type: type, matched_text: l.content)
    finalize_parse(context, token)
  end

  def parse(TagLine, l, context), do: __MODULE__.TagLineParser.parse(TagLine, l, context)

  def parse(TableRow, l, context), do: __MODULE__.TableRowParser.parse(TableRow, l, context)

  def parse(type, %Line{content: c} = l, %PC{lexicon: lex} = context)
      when type in [FeatureLine, BackgroundLine, RuleLine, ExamplesLine, ScenarioLine] do
    keyword_w_sep = Lexicon.load_keywords(type, lex) |> match_line(type, c)
    keyword = String.trim_trailing(keyword_w_sep, @constants.title_keyword_sep)

    %{"indent" => indent, "matched_text" => matched_text} =
      base_title_regex(keyword_w_sep) |> Regex.named_captures(c)

    opts = [
      matched_type: type,
      line: l,
      indent: String.length(indent) + 1,
      matched_text: matched_text,
      matched_keyword: keyword
    ]

    token = struct!(Token, opts)
    finalize_parse(context, token)
  end

  def parse(StepLine, %Line{content: c} = l, context) do
    keyword = Lexicon.load_keywords(StepLine, context.lexicon) |> match_line(StepLine, c)

    %{"indent" => indent, "matched_text" => matched_text} =
      keyword |> base_key_regex() |> Regex.named_captures(c)

    opts = [
      matched_type: StepLine,
      line: l,
      indent: String.length(indent) + 1,
      matched_text: String.trim(matched_text),
      matched_keyword: keyword
    ]

    token = struct!(Token, opts)
    finalize_parse(context, token)
  end

  def parse(DocStringSeparator, %Line{} = l, %PC{docstring_sep: nil} = ctext) do
    sep =
      cond do
        my_starts_with?(l.content, @doc_sep) -> @doc_sep
        my_starts_with?(l.content, @doc_sep_alt) -> @doc_sep_alt
        true -> raise "Did you match first? If it matches, this should definitely not raise."
      end

    %{"indent" => indent, "matched_text" => matched_text} =
      sep |> base_docstring_regex() |> Regex.named_captures(l.content)

    opts = [
      matched_type: DocStringSeparator,
      line: l,
      indent: String.length(indent) + 1,
      matched_text: matched_text,
      matched_keyword: sep
    ]

    token = struct!(Token, opts)

    context_w_sep_i = %{ctext | docstring_sep: sep, docstring_indent: String.length(indent)}
    finalize_parse(context_w_sep_i, token)
  end

  def parse(DocStringSeparator, %Line{} = l, %PC{docstring_sep: sep} = ctext)
      when sep in [@doc_sep, @doc_sep_alt] do
    %{"indent" => indent, "matched_text" => matched_text} =
      sep |> base_docstring_regex() |> Regex.named_captures(l.content)

    opts = [
      matched_type: DocStringSeparator,
      line: l,
      indent: String.length(indent) + 1,
      matched_text: matched_text,
      matched_keyword: sep
    ]

    token = struct!(Token, opts)

    context_w_sep_i = %{ctext | docstring_sep: nil, docstring_indent: nil}
    finalize_parse(context_w_sep_i, token)
  end

  def parse(Language, %Line{content: c} = l, context) do
    %{"lang" => lang} = Regex.named_captures(@language_regex, c)
    i = String.length(c) - String.length(String.trim_leading(c)) + 1
    token = struct!(Token, line: l, matched_type: Language, matched_text: lang, indent: i)

    case CucumberGherkin.Lexicon.load_lang(lang) do
      {:ok, new_lexicon} ->
        %{context | language: lang} |> update_lexicon(new_lexicon)

      :error ->
        language_error = %NoSuchLanguageError{language: lang, location: Token.get_location(token)}

        %{context | errors: context.errors ++ [language_error]}
    end
    |> finalize_parse(token)
  end

  def parse(Other = type, %Line{content: c} = l, %PC{docstring_indent: i, docstring_sep: s} = pc) do
    indent_to_remove = i || 0
    cleaned_txt = c |> trim_x(" ", indent_to_remove) |> unescape_docstring(s)
    token = struct!(Token, line: l, matched_type: type, matched_text: cleaned_txt)
    pc |> add_token(token) |> mark_token_as_active(token)
  end

  defp unescape_docstring(t, @doc_sep), do: String.replace(t, "\\\"\\\"\\\"", @doc_sep)
  defp unescape_docstring(t, @doc_sep_alt), do: String.replace(t, "\\`\\`\\`", @doc_sep_alt)
  defp unescape_docstring(t, nil), do: t

  defp add_token(pc, token), do: %{pc | reverse_queue: [token | pc.reverse_queue]}
  defp mark_token_as_active(pc, token), do: %{pc | current_token: token}
  defp update_lexicon(pc, new_lexicon), do: %{pc | lexicon: new_lexicon}

  def finalize_parse(%PC{} = context, %Token{} = token) do
    token_w_language = %{token | matched_gherkin_dialect: context.language}
    context |> add_token(token_w_language) |> mark_token_as_active(token_w_language)
  end
end
