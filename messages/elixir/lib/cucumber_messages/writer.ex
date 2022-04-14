defmodule CucumberMessages.Writer do
  alias CucumberMessages.Envelope

  def envelope_to_ndjson!(%Envelope{} = message) do
    Jason.encode!(message)
  end
end
