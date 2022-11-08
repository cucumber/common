defmodule CucumberGherkinGoodTestdataTest do
  use ExUnit.Case
  require Logger

  @moduletag timeout: :infinity

  @files ["testdata", "good", "*.feature"]
         |> Path.join()
         |> Path.wildcard()

  @tag :good
  @tag :tokens
  test "TOKENS: compare all testdata" do
    results =
      Enum.map(@files, fn path ->
        correct_output = File.read!(path <> ".tokens")
        tokenized_output = CucumberGherkin.tokenize(path)
        {path, correct_output == tokenized_output}
      end)

    total_result_boolean = Enum.all?(results, fn {_path, result} -> result end)

    results
    |> construct_info_message("TOKENS TESTDATA (GOOD)")
    |> report_to_logger(total_result_boolean)

    assert total_result_boolean
  end

  @tag :good
  @tag :source
  test "SOURCE: compare all testdata" do
    opts = [:no_pickles, :predictable_ids, :no_ast]

    results = test_files_that_end_with(".source.ndjson", opts)
    total_result_boolean = Enum.all?(results, fn {_path, result} -> result end)

    results
    |> construct_info_message("SOURCE TESTDATA (GOOD)")
    |> report_to_logger(total_result_boolean)

    assert total_result_boolean
  end

  @tag :good
  @tag :ast
  test "AST: compare all testdata" do
    opts = [:no_pickles, :predictable_ids, :no_source]

    results = test_files_that_end_with(".ast.ndjson", opts)
    total_result_boolean = Enum.all?(results, fn {_path, result} -> result end)

    results
    |> construct_info_message("AST TESTDATA (GOOD)")
    |> report_to_logger(total_result_boolean)

    assert total_result_boolean
  end

  @tag :good
  @tag :pickles
  test "PICKLES: compare all testdata" do
    opts = [:no_ast, :predictable_ids, :no_source]
    results = test_files_that_end_with(".pickles.ndjson", opts)
    total_result_boolean = Enum.all?(results, fn {_path, result} -> result end)

    results
    |> construct_info_message("PICKLES TESTDATA (GOOD)")
    |> report_to_logger(total_result_boolean)

    assert total_result_boolean
  end

  defp test_files_that_end_with(extension, opts) do
    Enum.map(@files, fn path ->
      correct_output = File.read!(path <> extension)
      result = CucumberGherkin.parse_path(path, opts) |> CucumberGherkin.print_messages(:ndjson)
      {path, correct_output == result}
    end)
  end

  defp construct_info_message(results, report_label) do
    start_line = "#### #{report_label} ####"
    content = Enum.map(results, &construct_info_line/1) |> List.flatten() |> Enum.join("\n")
    end_line = String.duplicate("#", 20)
    Enum.join([start_line, content, end_line], "\n")
  end

  defp construct_info_line({path, false}), do: "# ERROR => #{path}"
  defp construct_info_line({path, true}), do: "# OK    => #{path}"

  defp report_to_logger(message, true), do: Logger.debug("\n" <> message)
  defp report_to_logger(message, false), do: Logger.error("\n" <> message)
end
