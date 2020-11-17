defmodule ExGherkinGoodTestdataTest do
  use ExUnit.Case
  require Logger

  @moduletag timeout: :infinity

  # @files ["testdata", "good", "*.feature"]
  @files ["testdata", "good", "background.feature"]
         |> Path.join()
         |> Path.wildcard()

  @tag :good
  @tag :tokens
  test "TOKENS: compare all testdata" do
    Enum.each(@files, fn path ->
      correct_output = File.read!(path <> ".tokens")
      tokenized_output = ExGherkin.tokenize(path)
      result = correct_output == tokenized_output

      if result == false, do: complain("TOKENS", path)

      assert result
    end)
  end

  @tag :good
  @tag :source
  test "SOURCE: compare all testdata" do
    opts = [:no_pickles, :predictable_ids, :no_ast]

    Enum.each(@files, fn path ->
      correct_output = File.read!(path <> ".source.ndjson")
      result = ExGherkin.parse_path(path, opts) |> ExGherkin.print_messages(:ndjson)
      result = correct_output == result

      if result == false, do: complain("SOURCE", path)
      assert result
    end)
  end

  @tag :good
  @tag :ast
  test "AST: compare all testdata" do
    opts = [:no_pickles, :predictable_ids, :no_source]

    Enum.each(@files, fn path ->
      correct_output = File.read!(path <> ".ast.ndjson")
      result = ExGherkin.parse_path(path, opts) |> ExGherkin.print_messages(:ndjson)
      result = correct_output == result

      if result == false, do: complain("AST", path)
      assert result
    end)
  end

  @tag :good
  @tag :pickles
  test "PICKLES: compare all testdata" do
    opts = [:no_ast, :predictable_ids, :no_source]

    Enum.each(@files, fn path ->
      correct_output = File.read!(path <> ".pickles.ndjson")
      result = ExGherkin.parse_path(path, opts) |> ExGherkin.print_messages(:ndjson)
      result = correct_output == result

      if result == false, do: complain("PICKLES", path)
      assert result
    end)
  end

  def complain(type_of_test, path) do
    Logger.warn("#{type_of_test}: File #{path} is not being parsed correctly.")
  end
end
