defmodule CucumberMessages.Writer do
  def envelope_to_ndjson!(message) do
    Jason.encode!(message)
  end
end
