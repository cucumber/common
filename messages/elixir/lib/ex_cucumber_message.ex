defmodule ExCucumberMessages do
  @moduledoc """
  This small library its sole purpose is to convert the protobuf schema to Elixir code. In order to use this library, you do not need protoc installed at all!

  If you want to contribute to this library (or just update the protobuf schema and code), make sure you have `protoc` installed and run:

  `MIX_ENV=prod mix protox.generate --output-path=lib/cucumber_messages/messages.ex messages.proto`

  If you want to contribute, please be so kind to run `mix format` as well (this can take a while with an unformatted `messages.ex` file).
  """

  @doc """
  Convert a list of envelopes to the passed format. At the moment only ndjson is supported until there is binary test data.

  Because the underlying Protox library doesn't support JSON conversion, we had to write a manual implementation. ndjson formatting is, at the moment, only supported for the `ex_gherkin` library. Other messages will not properly be formatted according to protobuf protocols.
  """
  def convert_envelopes_to(envelopes, :ndjson) do
    Enum.map(envelopes, &ExCucumberMessages.Writer.envelope_to_ndjson!/1)
    |> Enum.map(&Jason.encode!(&1))
    |> Enum.join("\n")
    |> case do
      "" -> ""
      result -> result <> "\n"
    end
  end

  # def convert_envelopes_to(envelopes, :binary) do
  # end
end
