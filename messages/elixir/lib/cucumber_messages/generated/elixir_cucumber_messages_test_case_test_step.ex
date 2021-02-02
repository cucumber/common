# credo:disable-for-this-file
defmodule(CucumberMessages.TestCase.TestStep) do
  @moduledoc(false)
  (
    defstruct(id: "", pickle_step_id: "", step_definition_ids: [], step_match_arguments_lists: [], hook_id: "", __uf__: [])
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
        [] |> encode_id(msg) |> encode_pickle_step_id(msg) |> encode_step_definition_ids(msg) |> encode_step_match_arguments_lists(msg) |> encode_hook_id(msg) |> encode_unknown_fields(msg)
      end
      []
      [defp(encode_id(acc, msg)) do
        field_value = msg.id()
        if(field_value == "") do
          acc
        else
          [acc, "\n", Protox.Encode.encode_string(field_value)]
        end
      end, defp(encode_pickle_step_id(acc, msg)) do
        field_value = msg.pickle_step_id()
        if(field_value == "") do
          acc
        else
          [acc, <<18>>, Protox.Encode.encode_string(field_value)]
        end
      end, defp(encode_step_definition_ids(acc, msg)) do
        case(msg.step_definition_ids()) do
          [] ->
            acc
          values ->
            [acc, Enum.reduce(values, [], fn value, acc -> [acc, <<26>>, Protox.Encode.encode_string(value)] end)]
        end
      end, defp(encode_step_match_arguments_lists(acc, msg)) do
        case(msg.step_match_arguments_lists()) do
          [] ->
            acc
          values ->
            [acc, Enum.reduce(values, [], fn value, acc -> [acc, "\"", Protox.Encode.encode_message(value)] end)]
        end
      end, defp(encode_hook_id(acc, msg)) do
        field_value = msg.hook_id()
        if(field_value == "") do
          acc
        else
          [acc, "*", Protox.Encode.encode_string(field_value)]
        end
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
          parse_key_value(bytes, struct(CucumberMessages.TestCase.TestStep))
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
              value = delimited
              field = {:id, value}
              {field, rest}
            {2, _, bytes} ->
              {len, bytes} = Protox.Varint.decode(bytes)
              <<delimited::binary-size(len), rest::binary>> = bytes
              value = delimited
              field = {:pickle_step_id, value}
              {field, rest}
            {3, _, bytes} ->
              {len, bytes} = Protox.Varint.decode(bytes)
              <<delimited::binary-size(len), rest::binary>> = bytes
              value = delimited
              field = {:step_definition_ids, msg.step_definition_ids() ++ List.wrap(value)}
              {field, rest}
            {4, _, bytes} ->
              {len, bytes} = Protox.Varint.decode(bytes)
              <<delimited::binary-size(len), rest::binary>> = bytes
              value = CucumberMessages.TestCase.TestStep.StepMatchArgumentsList.decode!(delimited)
              field = {:step_match_arguments_lists, msg.step_match_arguments_lists() ++ List.wrap(value)}
              {field, rest}
            {5, _, bytes} ->
              {len, bytes} = Protox.Varint.decode(bytes)
              <<delimited::binary-size(len), rest::binary>> = bytes
              value = delimited
              field = {:hook_id, value}
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
      %{1 => {:id, {:default, ""}, :string}, 2 => {:pickle_step_id, {:default, ""}, :string}, 3 => {:step_definition_ids, :unpacked, :string}, 4 => {:step_match_arguments_lists, :unpacked, {:message, CucumberMessages.TestCase.TestStep.StepMatchArgumentsList}}, 5 => {:hook_id, {:default, ""}, :string}}
    end
    @spec(defs_by_name() :: %{required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}})
    def(defs_by_name()) do
      %{hook_id: {5, {:default, ""}, :string}, id: {1, {:default, ""}, :string}, pickle_step_id: {2, {:default, ""}, :string}, step_definition_ids: {3, :unpacked, :string}, step_match_arguments_lists: {4, :unpacked, {:message, CucumberMessages.TestCase.TestStep.StepMatchArgumentsList}}}
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
    [@spec(default(atom) :: {:ok, boolean | integer | String.t() | float} | {:error, atom}), [def(default(:id)) do
      {:ok, ""}
    end, def(default(:pickle_step_id)) do
      {:ok, ""}
    end, def(default(:step_definition_ids)) do
      {:error, :no_default_value}
    end, def(default(:step_match_arguments_lists)) do
      {:error, :no_default_value}
    end, def(default(:hook_id)) do
      {:ok, ""}
    end], def(default(_)) do
      {:error, :no_such_field}
    end]
  )
  []
end