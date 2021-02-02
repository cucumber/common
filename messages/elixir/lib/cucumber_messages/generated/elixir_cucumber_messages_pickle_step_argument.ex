# credo:disable-for-this-file
defmodule(CucumberMessages.PickleStepArgument) do
  @moduledoc(false)
  (
    defstruct(message: nil, __uf__: [])
    (
      @spec(encode(struct) :: {:ok, iodata} | {:error, any})
      def(encode(msg)) do
        try do
          {:ok, encode!(msg)}
        rescue
          e ->
            {:error, e}
        end
      end
      @spec(encode!(struct) :: iodata | no_return)
      def(encode!(msg)) do
        [] |> encode_message(msg) |> encode_unknown_fields(msg)
      end
      [defp(encode_message(acc, msg)) do
        case(msg.message()) do
          nil ->
            acc
          {:doc_string, _field_value} ->
            encode_doc_string(acc, msg)
          {:data_table, _field_value} ->
            encode_data_table(acc, msg)
        end
      end]
      [defp(encode_doc_string(acc, msg)) do
        {_, field_value} = msg.message()
        [acc, "\n", Protox.Encode.encode_message(field_value)]
      end, defp(encode_data_table(acc, msg)) do
        {_, field_value} = msg.message()
        [acc, <<18>>, Protox.Encode.encode_message(field_value)]
      end]
      defp(encode_unknown_fields(acc, msg)) do
        Enum.reduce(msg.__struct__.unknown_fields(msg), acc, fn {tag, wire_type, bytes}, acc -> case(wire_type) do
          0 ->
            [acc, Protox.Encode.make_key_bytes(tag, :int32), bytes]
          1 ->
            [acc, Protox.Encode.make_key_bytes(tag, :double), bytes]
          2 ->
            len_bytes = bytes |> byte_size() |> Protox.Varint.encode()
            [acc, Protox.Encode.make_key_bytes(tag, :packed), len_bytes, bytes]
          5 ->
            [acc, Protox.Encode.make_key_bytes(tag, :float), bytes]
        end end)
      end
    )
    (
      @spec(decode(binary) :: {:ok, struct} | {:error, any})
      def(decode(bytes)) do
        try do
          {:ok, decode!(bytes)}
        rescue
          e ->
            {:error, e}
        end
      end
      (
        @spec(decode!(binary) :: struct | no_return)
        def(decode!(bytes)) do
          parse_key_value(bytes, struct(CucumberMessages.PickleStepArgument))
        end
      )
      (
        @spec(parse_key_value(binary, struct) :: struct)
        defp(parse_key_value(<<>>, msg)) do
          msg
        end
        defp(parse_key_value(bytes, msg)) do
          {field, rest} = case(Protox.Decode.parse_key(bytes)) do
            {0, _, _} ->
              raise(%Protox.IllegalTagError{})
            {1, _, bytes} ->
              {len, bytes} = Protox.Varint.decode(bytes)
              <<delimited::binary-size(len), rest::binary>> = bytes
              value = CucumberMessages.PickleStepArgument.PickleDocString.decode!(delimited)
              field = case(msg.message()) do
                {:doc_string, previous_value} ->
                  {:message, {:doc_string, Protox.Message.merge(previous_value, value)}}
                _ ->
                  {:message, {:doc_string, value}}
              end
              {field, rest}
            {2, _, bytes} ->
              {len, bytes} = Protox.Varint.decode(bytes)
              <<delimited::binary-size(len), rest::binary>> = bytes
              value = CucumberMessages.PickleStepArgument.PickleTable.decode!(delimited)
              field = case(msg.message()) do
                {:data_table, previous_value} ->
                  {:message, {:data_table, Protox.Message.merge(previous_value, value)}}
                _ ->
                  {:message, {:data_table, value}}
              end
              {field, rest}
            {tag, wire_type, rest} ->
              {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)
              field = {msg.__struct__.unknown_fields_name, [value | msg.__struct__.unknown_fields(msg)]}
              {field, new_rest}
          end
          msg_updated = struct(msg, [field])
          parse_key_value(rest, msg_updated)
        end
      )
      []
    )
    @spec(defs() :: %{required(non_neg_integer) => {atom, Protox.Types.kind(), Protox.Types.type()}})
    def(defs()) do
      %{1 => {:doc_string, {:oneof, :message}, {:message, CucumberMessages.PickleStepArgument.PickleDocString}}, 2 => {:data_table, {:oneof, :message}, {:message, CucumberMessages.PickleStepArgument.PickleTable}}}
    end
    @spec(defs_by_name() :: %{required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}})
    def(defs_by_name()) do
      %{data_table: {2, {:oneof, :message}, {:message, CucumberMessages.PickleStepArgument.PickleTable}}, doc_string: {1, {:oneof, :message}, {:message, CucumberMessages.PickleStepArgument.PickleDocString}}}
    end
    @spec(required_fields() :: [])
    def(required_fields()) do
      []
    end
    @spec(unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}])
    def(unknown_fields(msg)) do
      msg.__uf__()
    end
    @spec(unknown_fields_name() :: :__uf__)
    def(unknown_fields_name()) do
      :__uf__
    end
    @spec(clear_unknown_fields(struct) :: struct)
    def(clear_unknown_fields(msg)) do
      struct!(msg, [{unknown_fields_name(), []}])
    end
    @spec(syntax() :: atom)
    def(syntax()) do
      :proto3
    end
    [@spec(default(atom) :: {:ok, boolean | integer | String.t() | float} | {:error, atom}), [def(default(:doc_string)) do
      {:error, :no_default_value}
    end, def(default(:data_table)) do
      {:error, :no_default_value}
    end], def(default(_)) do
      {:error, :no_such_field}
    end]
  )
  []
end