# credo:disable-for-this-file
defmodule(Io.Cucumber.Messages.GherkinDocument.Feature.Step) do
  @moduledoc false
  (
    defstruct(location: nil, keyword: "", text: "", argument: nil, id: "", __uf__: [])

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
          |> encode_argument(msg)
          |> encode_location(msg)
          |> encode_keyword(msg)
          |> encode_text(msg)
          |> encode_id(msg)
          |> encode_unknown_fields(msg)
        end
      )

      [
        defp(encode_argument(acc, msg)) do
          case(msg.argument) do
            nil ->
              acc

            {:doc_string, _field_value} ->
              encode_doc_string(acc, msg)

            {:data_table, _field_value} ->
              encode_data_table(acc, msg)
          end
        end
      ]

      [
        defp(encode_location(acc, msg)) do
          field_value = msg.location

          if(field_value == nil) do
            acc
          else
            [acc, "\n", Protox.Encode.encode_message(field_value)]
          end
        end,
        defp(encode_keyword(acc, msg)) do
          field_value = msg.keyword

          if(field_value == "") do
            acc
          else
            [acc, <<18>>, Protox.Encode.encode_string(field_value)]
          end
        end,
        defp(encode_text(acc, msg)) do
          field_value = msg.text

          if(field_value == "") do
            acc
          else
            [acc, <<26>>, Protox.Encode.encode_string(field_value)]
          end
        end,
        defp(encode_doc_string(acc, msg)) do
          {_, field_value} = msg.argument
          [acc, "\"", Protox.Encode.encode_message(field_value)]
        end,
        defp(encode_data_table(acc, msg)) do
          {_, field_value} = msg.argument
          [acc, "*", Protox.Encode.encode_message(field_value)]
        end,
        defp(encode_id(acc, msg)) do
          field_value = msg.id

          if(field_value == "") do
            acc
          else
            [acc, "2", Protox.Encode.encode_string(field_value)]
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
          parse_key_value(bytes, struct(Io.Cucumber.Messages.GherkinDocument.Feature.Step))
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
                value = Io.Cucumber.Messages.Location.decode!(delimited)
                field = {:location, Protox.Message.merge(msg.location, value)}
                {[field], rest}

              {2, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = delimited
                field = {:keyword, value}
                {[field], rest}

              {3, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = delimited
                field = {:text, value}
                {[field], rest}

              {4, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes

                value =
                  Io.Cucumber.Messages.GherkinDocument.Feature.Step.DocString.decode!(delimited)

                field =
                  case(msg.argument) do
                    {:doc_string, previous_value} ->
                      {:argument, {:doc_string, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:argument, {:doc_string, value}}
                  end

                {[field], rest}

              {5, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes

                value =
                  Io.Cucumber.Messages.GherkinDocument.Feature.Step.DataTable.decode!(delimited)

                field =
                  case(msg.argument) do
                    {:data_table, previous_value} ->
                      {:argument, {:data_table, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:argument, {:data_table, value}}
                  end

                {[field], rest}

              {6, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = delimited
                field = {:id, value}
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
        1 => {:location, {:default, nil}, {:message, Io.Cucumber.Messages.Location}},
        2 => {:keyword, {:default, ""}, :string},
        3 => {:text, {:default, ""}, :string},
        4 =>
          {:doc_string, {:oneof, :argument},
           {:message, Io.Cucumber.Messages.GherkinDocument.Feature.Step.DocString}},
        5 =>
          {:data_table, {:oneof, :argument},
           {:message, Io.Cucumber.Messages.GherkinDocument.Feature.Step.DataTable}},
        6 => {:id, {:default, ""}, :string}
      }
    end

    @spec defs_by_name() :: %{
            required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
          }
    def(defs_by_name()) do
      %{
        data_table:
          {5, {:oneof, :argument},
           {:message, Io.Cucumber.Messages.GherkinDocument.Feature.Step.DataTable}},
        doc_string:
          {4, {:oneof, :argument},
           {:message, Io.Cucumber.Messages.GherkinDocument.Feature.Step.DocString}},
        id: {6, {:default, ""}, :string},
        keyword: {2, {:default, ""}, :string},
        location: {1, {:default, nil}, {:message, Io.Cucumber.Messages.Location}},
        text: {3, {:default, ""}, :string}
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
      def(default(:location)) do
        {:ok, nil}
      end,
      def(default(:keyword)) do
        {:ok, ""}
      end,
      def(default(:text)) do
        {:ok, ""}
      end,
      def(default(:doc_string)) do
        {:error, :no_default_value}
      end,
      def(default(:data_table)) do
        {:error, :no_default_value}
      end,
      def(default(:id)) do
        {:ok, ""}
      end,
      def(default(_)) do
        {:error, :no_such_field}
      end
    ]
  )
end