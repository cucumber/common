defmodule CucumberMessages.Writer do
  def envelope_to_ndjson!(message) do
    message
    |> destructify()
    |> Jason.encode!()
  end

  defp destructify(%{} = struct) when is_struct(struct) do
    struct
    |> Map.from_struct()
    |> Enum.reduce(%{}, fn {k, v}, acc -> update_value(acc, k, v) end)
  end

  defp update_value(acc, _, v) when is_nil(v), do: acc
  defp update_value(acc, k, v) when is_struct(v), do: update_value(acc, k, destructify(v))

  defp update_value(acc, k, v) when is_list(v) do
    new_values =
      Enum.map(v, fn possible_struct ->
        case is_struct(possible_struct) do
          true -> destructify(possible_struct)
          false -> possible_struct
        end
      end)

    Map.put(acc, lower_camelize(k), new_values)
  end

  defp update_value(acc, k, v) when is_map(v) do
    new_values =
      Enum.map(v, fn {subkey, possible_struct} ->
        case is_struct(possible_struct) do
          true -> {lower_camelize(subkey), destructify(possible_struct)}
          false -> {lower_camelize(subkey), possible_struct}
        end
      end)
      |> Enum.into(%{})

    Map.put(acc, lower_camelize(k), new_values)
  end

  defp update_value(acc, k, v), do: Map.put(acc, lower_camelize(k), v)

  defp lower_camelize(atom) when is_atom(atom), do: atom |> Atom.to_string() |> lower_camelize()

  defp lower_camelize(string) when is_binary(string) do
    {first_letter, rest} = string |> Macro.camelize() |> String.split_at(1)
    "#{String.downcase(first_letter)}#{rest}"
  end
end
