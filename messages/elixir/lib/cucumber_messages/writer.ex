defmodule CucumberMessages.Writer do
  def envelope_to_ndjson!(message) do
    message
    |> destructify()
    |> Jason.encode!()
  end

  def destructify(%{} = struct) do
    struct
    |> Map.from_struct()
    |> Enum.map(fn {k, v} ->
      possible_new_value =
        case is_struct(v) do
          true -> destructify(v)
          false -> v
        end

      {k, possible_new_value}
    end)
    |> Enum.into(%{})
  end
end
