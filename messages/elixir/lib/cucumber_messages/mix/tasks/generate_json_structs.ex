defmodule Mix.Tasks.GenerateJsonStructs do
  use Mix.Task
  require IEx
  require Logger

  @application_name :cucumber_messages
  @priv_dir :code.priv_dir(@application_name)
  @app_dir File.cwd!()
  @lib_dir Path.join([@app_dir, "lib", Atom.to_string(@application_name)])

  defmodule ModuleData do
    defstruct [:module_name, :fields]
  end

  def run([]) do
    clean_generated_folder()
    json_files = [@priv_dir, "json_schemas", "*.json"] |> Path.join() |> Path.wildcard()

    json_files
    |> Enum.map(fn filename ->
      clean_filename = Path.basename(filename)
      content = filename |> File.read!() |> Jason.decode!()
      {clean_filename, content}
    end)
    |> Enum.each(fn {filename, decoded} ->
      Logger.debug("Starting parsing file: \"#{filename}\"")
      forced_decoded = Map.put(decoded, "$id", filename)
      metadata = %{definitions: nil, full_decoded: forced_decoded, modules: [], parent: nil}
      list_of_modules = create_moduledata_structs(metadata, forced_decoded)
      textual_modules = output_module(list_of_modules, [])

      write_files(textual_modules)
      Logger.debug("File \"#{filename}\" finished! ✔")
    end)

    # path_json = [@priv_dir, "json_schemas", "Pickle.json"] |> Path.join()
    # decoded = path_json |> File.read!() |> Jason.decode!()
    # metadata = %{definitions: nil, full_decoded: decoded, modules: [], parent: nil}
    # list_of_modules = create_moduledata_structs(metadata, decoded)
    # textual_modules = output_module(list_of_modules, [])
    # write_files(textual_modules)
  end

  # Clean generated folder
  defp clean_generated_folder() do
    generated_files = [@lib_dir, "generated", "*.ex"] |> Path.join() |> Path.wildcard()
    Enum.each(generated_files, &File.rm!/1)
  end

  # ############################################################# #
  # Converts [ModuleData, ...] to [{filename, filecontents}, ...] #
  # ############################################################# #

  defp output_module([], acc) when is_list(acc), do: acc
  defp output_module([], acc), do: [acc]

  defp output_module(%ModuleData{} = moduledata, acc) do
    atom_fields =
      moduledata.fields
      |> Enum.map(fn {fieldname, %{} = details} ->
        case details["type"] do
          "array" -> Macro.underscore(fieldname) <> ": []"
          _ -> Macro.underscore(fieldname) <> ": nil"
        end
      end)
      |> Enum.intersperse(", ")

    entry = """
    defmodule CucumberMessages.#{moduledata.module_name} do
     defstruct [#{atom_fields}]
    end
    """

    filename = Macro.underscore(moduledata.module_name) <> ".ex"
    [{filename, entry} | acc]
  end

  defp output_module([module | rest], acc) do
    new_acc = output_module(module, acc)
    output_module(rest, new_acc)
  end

  # ############################################################# #
  #       Converts json schema to list of [ModuleData, ...]       #
  # ############################################################# #

  defp create_moduledata_structs(
         %{definitions: nil, parent: nil} = metadata,
         %{"definitions" => dfs} = data
       )
       when dfs != nil do
    {definitions, remaining_data} = Map.pop!(data, "definitions")

    metadata
    |> Map.put(:definitions, definitions)
    |> create_moduledata_structs(remaining_data)
  end

  defp create_moduledata_structs(
         %{parent: nil, definitions: dfs} = metadata,
         %{"$id" => id, "properties" => properties} = data
       )
       when dfs != nil do
    module_name = String.trim_trailing(id, ".json")
    properties = properties
    parent = %ModuleData{module_name: module_name, fields: properties}

    metadata
    |> Map.put(:parent, parent)
    |> Map.put(:modules, [parent | metadata.modules])
    |> create_moduledata_structs(data)
  end

  # If PARENT and DEFINITIONS, create children.
  defp create_moduledata_structs(%{parent: p, definitions: dfs} = metadata, _data)
       when p != nil and dfs != nil do
    childs =
      Enum.map(dfs, fn {name, child_member} ->
        empty_metadata = %{definitions: nil, full_decoded: child_member, modules: [], parent: nil}

        # case create_moduledata_structs(empty_metadata, {name, child_member}) do
        #   %ModuleData{} = submodule -> submodule
        #   other -> raise "unexpected"
        # end
        updated_child_member_data = Map.put(child_member, "$id", name)

        case create_moduledata_structs(empty_metadata, updated_child_member_data) do
          %ModuleData{} = submodule -> submodule
          _other -> raise "unexpected"
        end
      end)

    Enum.reduce(childs, metadata.modules, fn %ModuleData{} = child, acc ->
      updated_child = %{child | module_name: "#{p.module_name}.#{child.module_name}"}
      [updated_child | acc]
    end)
  end

  defp create_moduledata_structs(
         %{parent: nil, definitions: nil} = _metadata,
         %{"properties" => properties, "$id" => id}
       )
       when id != nil do
    module_name = String.trim_trailing(id, ".json")
    %ModuleData{module_name: module_name, fields: properties}
  end

  # ############################################################# #
  # Creates files based on  [{filename, filecontents}, ...]       #
  # ############################################################# #

  defp write_files([]), do: :ok

  defp write_files([{filename, filecontent} | rest]) do
    cleaned_filename = String.replace(filename, "/", "_")
    path = Path.join([@lib_dir, "generated", cleaned_filename])
    File.write!(path, filecontent)
    write_files(rest)
  end
end
