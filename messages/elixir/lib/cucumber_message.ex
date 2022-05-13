defmodule CucumberMessages do
  @moduledoc """
  This small library its sole purpose is to convert the protobuf schema to Elixir code. In order to use this library, you do not need protoc installed at all!
  """

  @doc """
  Convert a list of envelopes to the passed format. At the moment only ndjson is supported until there is binary test data.

  Because the underlying Protox library doesn't support JSON conversion, we had to write a manual implementation. ndjson formatting is, at the moment, only supported for the `cucumber_gherkin` library. Other messages will not properly be formatted according to protobuf protocols.
  """
  def convert_envelopes_to(envelopes, :ndjson) do
    Enum.map(envelopes, &CucumberMessages.Writer.envelope_to_ndjson!/1)
    |> Enum.join("\n")
    |> case do
      "" -> ""
      result -> result <> "\n"
    end
  end

  # def convert_envelopes_to(envelopes, :binary) do
  # end
end
