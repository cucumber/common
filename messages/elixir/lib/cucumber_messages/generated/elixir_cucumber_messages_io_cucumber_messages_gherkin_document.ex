# credo:disable-for-this-file
defmodule(CucumberMessages.Io.Cucumber.Messages.GherkinDocument) do
  @moduledoc false
  (
    defstruct(uri: "", feature: nil, comments: [], __uf__: [])

    (
      (
        @spec encode(struct) :: {:ok, iodata} | {:error, any}
        def(encode(msg)) do
          try do
            {:ok, encode!(msg)}
          rescue
            e ->
              {:error, e}
          end
        end

        @spec encode!(struct) :: iodata | no_return
        def(encode!(msg)) do
          []
          |> encode_uri(msg)
          |> encode_feature(msg)
          |> encode_comments(msg)
          |> encode_unknown_fields(msg)
        end
      )

      []

      [
        defp(encode_uri(acc, msg)) do
          field_value = msg.uri

          if(field_value == "") do
            acc
          else
            [acc, "\n", Protox.Encode.encode_string(field_value)]
          end
        end,
        defp(encode_feature(acc, msg)) do
          field_value = msg.feature

          if(field_value == nil) do
            acc
          else
            [acc, <<18>>, Protox.Encode.encode_message(field_value)]
          end
        end,
        defp(encode_comments(acc, msg)) do
          case(msg.comments) do
            [] ->
              acc

            values ->
              [
                acc,
                Enum.reduce(values, [], fn value, acc ->
                  [acc, <<26>>, Protox.Encode.encode_message(value)]
                end)
              ]
          end
        end
      ]

      defp(encode_unknown_fields(acc, msg)) do
        Enum.reduce(msg.__struct__.unknown_fields(msg), acc, fn {tag, wire_type, bytes}, acc ->
          case(wire_type) do
            0 ->
              [acc, Protox.Encode.make_key_bytes(tag, :int32), bytes]

            1 ->
              [acc, Protox.Encode.make_key_bytes(tag, :double), bytes]

            2 ->
              len_bytes = bytes |> byte_size() |> Protox.Varint.encode()
              [acc, Protox.Encode.make_key_bytes(tag, :packed), len_bytes, bytes]

            5 ->
              [acc, Protox.Encode.make_key_bytes(tag, :float), bytes]
          end
        end)
      end
    )

    (
      @spec decode(binary) :: {:ok, struct} | {:error, any}
      def(decode(bytes)) do
        try do
          {:ok, decode!(bytes)}
        rescue
          e ->
            {:error, e}
        end
      end

      (
        @spec decode!(binary) :: struct | no_return
        def(decode!(bytes)) do
          parse_key_value(bytes, struct(CucumberMessages.Io.Cucumber.Messages.GherkinDocument))
        end
      )

      (
        @spec parse_key_value(binary, struct) :: struct
        defp(parse_key_value(<<>>, msg)) do
          msg
        end

        defp(parse_key_value(bytes, msg)) do
          {field, rest} =
            case(Protox.Decode.parse_key(bytes)) do
              {0, _, _} ->
                raise(%Protox.IllegalTagError{})

              {1, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = delimited
                field = {:uri, value}
                {[field], rest}

              {2, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes

                value =
                  CucumberMessages.Io.Cucumber.Messages.GherkinDocument.Feature.decode!(delimited)

                field = {:feature, Protox.Message.merge(msg.feature, value)}
                {[field], rest}

              {3, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes

                value =
                  CucumberMessages.Io.Cucumber.Messages.GherkinDocument.Comment.decode!(delimited)

                field = {:comments, msg.comments ++ List.wrap(value)}
                {[field], rest}

              {tag, wire_type, rest} ->
                {value, rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                field =
                  {msg.__struct__.unknown_fields_name,
                   [value | msg.__struct__.unknown_fields(msg)]}

                {[field], rest}
            end

          msg_updated = struct(msg, field)
          parse_key_value(rest, msg_updated)
        end
      )

      []
    )

    @spec defs() :: %{
            required(non_neg_integer) => {atom, Protox.Types.kind(), Protox.Types.type()}
          }
    def(defs()) do
      %{
        1 => {:uri, {:default, ""}, :string},
        2 =>
          {:feature, {:default, nil},
           {:message, CucumberMessages.Io.Cucumber.Messages.GherkinDocument.Feature}},
        3 =>
          {:comments, :unpacked,
           {:message, CucumberMessages.Io.Cucumber.Messages.GherkinDocument.Comment}}
      }
    end

    @spec defs_by_name() :: %{
            required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
          }
    def(defs_by_name()) do
      %{
        comments:
          {3, :unpacked,
           {:message, CucumberMessages.Io.Cucumber.Messages.GherkinDocument.Comment}},
        feature:
          {2, {:default, nil},
           {:message, CucumberMessages.Io.Cucumber.Messages.GherkinDocument.Feature}},
        uri: {1, {:default, ""}, :string}
      }
    end

    (
      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end
    )

    @spec required_fields() :: []
    def(required_fields()) do
      []
    end

    @spec syntax() :: atom
    def(syntax()) do
      :proto3
    end

    [
      @spec(default(atom) :: {:ok, boolean | integer | String.t() | float} | {:error, atom}),
      def(default(:uri)) do
        {:ok, ""}
      end,
      def(default(:feature)) do
        {:ok, nil}
      end,
      def(default(:comments)) do
        {:error, :no_default_value}
      end,
      def(default(_)) do
        {:error, :no_such_field}
      end
    ]
  )
end