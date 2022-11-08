defmodule CucumberGherkin do
  alias CucumberMessages.{Envelope, Source}
  alias CucumberGherkin.{Parser, ParserContext, TokenWriter}

  @moduledoc """
  `CucumberGherkin` allows you to parse Gherkin files to pickles (or tokens). These pickles can be used in a cucumber implementation.

  The CucumberMessages library is used in almost every step of building the pickles and envelopes.

  Testdata is used from the Cucumber repository.
  """

  ###################
  # API             #
  ###################
  @doc """
  Tokenizes a feature file. Normally you should not need this.
  """
  def tokenize(feature_file) do
    feature_file
    |> File.read!()
    |> Parser.parse([])
    |> TokenWriter.write_tokens()
  end

  @doc """
  Returns a list of envelopes. See `parse_path/2` for more information.
  """
  def parse_paths(paths, opts) when is_list(paths), do: Enum.map(paths, &parse_path(&1, opts))

  @doc """
  Parse a single feature file and return a list of envelopes. You can provide the following opts in a list:

  * :no_source
  * :no_ast
  * :no_pickles


  ## Examples

      iex> CucumberGherkin.parse_path("testdata/good/background.feature", [:no_ast, :no_pickles])
      [
        %CucumberMessages.Envelope{
          __uf__: [],
          message: {:source,
            %CucumberMessages.Source{
              # ...
          }}
        }
      ]
  """

  def parse_path(path, opts) when is_binary(path) do
    {:ok, envelope_w_source} = create_source_envelope(path, opts)

    envelope_w_source
    |> parse_messages(opts)
  end

  @doc """
  Rely on CucumberMessages printer to print the envelopes to the specified format. Currently only `:ndjson` is supported.

  It is likely that Elixir projects won't directly use this as they can use the unformatted protobuf message version in Cucumber as well.

  ## Examples

      iex> CucumberGherkin.parse_path("testdata/good/background.feature", []) |> CucumberGherkin.print_messages(:ndjson) |> IO.puts
      {"source":{"data": .......... }}
      {"gherkinDocument":{"feature": ........... }}
      {"pickle":{ .......... }}
      {"pickle":{ .......... }}
  """
  defdelegate print_messages(envelopes, type), to: CucumberMessages, as: :convert_envelopes_to

  ####################
  # HELPER FUNCTIONS #
  ####################

  defp create_source_envelope(path, _opts) do
    case File.read(path) do
      {:ok, binary} ->
        hardcoded_mtype = "text/x.cucumber.gherkin+plain"
        source_message = %Source{data: binary, uri: path, media_type: hardcoded_mtype}
        source_envelope = %Envelope{message: {:source, source_message}}
        {:ok, source_envelope}

      {:error, message} ->
        {:error, "Could not read file. Got: #{message}"}
    end
  end

  defp parse_messages(%Envelope{message: {:source, %Source{} = s}} = envelope, opts) do
    %{messages: [], parsable?: true, source: s, ast_builder: nil}
    |> add_source_envelope(envelope, opts)
    |> add_gherkin_doc_envelope(opts)
    |> add_pickles_envelopes(opts)
    |> Map.fetch!(:messages)
    |> Enum.reverse()
  end

  defp add_source_envelope(%{messages: m} = meta, envelope, opts) when is_list(opts) do
    case :no_source in opts do
      true -> meta
      false -> %{meta | messages: [envelope | m]}
    end
  end

  defp add_gherkin_doc_envelope(%{source: source} = meta, opts) do
    parse_and_update_func = fn ->
      Parser.parse(source.data, opts)
      |> get_ast_builder(source.uri)
      |> update_meta(meta, :ast_builder)
    end

    no_ast? = :no_ast in opts
    skip? = no_ast? and :no_pickles in opts

    with {:skip?, false} <- {:skip?, skip?},
         parsed_meta <- parse_and_update_func.(),
         {:only_ast, false, _} <- {:only_ast, no_ast?, parsed_meta},
         %{parsable?: true} <- parsed_meta do
      new_msg = put_msg_envelope(:gherkin_document, parsed_meta.ast_builder.gherkin_doc)
      prepend_msg_to_meta(parsed_meta, new_msg)
    else
      {:skip?, true} -> meta
      {:only_ast, true, parsed_meta} -> parsed_meta
      %{parsable?: false} = p -> p
    end
  end

  defp get_ast_builder(%ParserContext{errors: []} = pc, _uri), do: {:ok, pc.ast_builder}

  defp get_ast_builder(%ParserContext{errors: errors}, uri) do
    result =
      Enum.map(errors, fn error ->
        message = CucumberGherkin.ParserException.get_message(error)
        location = CucumberGherkin.ParserException.get_location(error)
        source_ref = %CucumberMessages.SourceReference{location: location, reference: {:uri, uri}}
        to_be_wrapped = %CucumberMessages.ParseError{message: message, source: source_ref}
        put_msg_envelope(:parse_error, to_be_wrapped)
      end)

    {:error, result}
  end

  defp update_meta({:ok, ast_builder}, %{source: s} = meta, :ast_builder) do
    new_ast_builder = %{ast_builder | gherkin_doc: %{ast_builder.gherkin_doc | uri: s.uri}}
    %{meta | ast_builder: new_ast_builder}
  end

  defp update_meta({:error, messages}, %{messages: m} = meta, :ast_builder),
    do: %{meta | parsable?: false, messages: Enum.reduce(messages, m, &[&1 | &2])}

  defp put_msg_envelope(type, m), do: %Envelope{message: {type, m}}

  defp prepend_msg_to_meta(%{messages: m} = meta, new), do: %{meta | messages: [new | m]}

  defp add_pickles_envelopes(%{ast_builder: builder, parsable?: true} = meta, opts) do
    case :no_pickles in opts do
      true ->
        meta

      false ->
        messages =
          CucumberGherkin.PickleCompiler.compile(builder, meta.source.uri)
          |> Enum.map(&put_msg_envelope(:pickle, &1))

        %{meta | messages: List.flatten([messages | meta.messages])}
    end
  end

  defp add_pickles_envelopes(%{parsable?: false} = meta, _opts), do: meta
end
