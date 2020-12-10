defmodule CucumberGherkinBadTestdataTest do
  use ExUnit.Case
  require Logger

  @moduletag timeout: :infinity

  @files ["testdata", "bad", "*.feature"]
         |> Path.join()
         |> Path.wildcard()

  @tag :bad
  test "BAD: compare all bad testdata" do
    opts = [:no_source, :no_pickles, :predictable_ids]

    results =
      Enum.map(@files, fn path ->
        correct_output = File.read!(path <> ".errors.ndjson")
        result = CucumberGherkin.parse_path(path, opts) |> CucumberGherkin.print_messages(:ndjson)

        {path, correct_output == result}
      end)

    total_result_boolean = Enum.all?(results, fn {_path, result} -> result end)

    results |> construct_info_message("BAD TESTDATA") |> report_to_logger(total_result_boolean)

    assert total_result_boolean
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
