defmodule ExGherkinBadTestdataTest do
  use ExUnit.Case
  require Logger

  @moduletag timeout: :infinity

  @files ["testdata", "bad", "*.feature"]
         |> Path.join()
         |> Path.wildcard()

  @tag :bad
  test "BAD: compare all bad testdata" do
    opts = [:no_source, :no_pickles, :predictable_ids]

    Enum.each(@files, fn path ->
      correct_output = File.read!(path <> ".errors.ndjson")
      result = ExGherkin.parse_path(path, opts) |> ExGherkin.print_messages(:ndjson)
      result = correct_output == result

      if result == false, do: complain("ERRORS:", path)
      assert result
    end)
  end

  def complain(type_of_test, path) do
    Logger.warn("#{type_of_test}: File #{path} is not being parsed correctly.")
  end
end
