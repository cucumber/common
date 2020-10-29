# credo:disable-for-this-file
defmodule(CucumberMessages.Meta.CI) do
  @moduledoc(false)
  (
    defstruct(name: "", url: "", git: nil, __uf__: [])
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
        [] |> encode_name(msg) |> encode_url(msg) |> encode_git(msg) |> encode_unknown_fields(msg)
      end
      []
      [defp(encode_name(acc, msg)) do
        field_value = msg.name()
        if(field_value == "") do
          acc
        else
          [acc, "\n", Protox.Encode.encode_string(field_value)]
        end
      end, defp(encode_url(acc, msg)) do
        field_value = msg.url()
        if(field_value == "") do
          acc
        else
          [acc, <<18>>, Protox.Encode.encode_string(field_value)]
        end
      end, defp(encode_git(acc, msg)) do
        field_value = msg.git()
        if(field_value == nil) do
          acc
        else
          [acc, <<26>>, Protox.Encode.encode_message(field_value)]
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
          parse_key_value(bytes, struct(CucumberMessages.Meta.CI))
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
              field = {:name, value}
              {field, rest}
            {2, _, bytes} ->
              {len, bytes} = Protox.Varint.decode(bytes)
              <<delimited::binary-size(len), rest::binary>> = bytes
              value = delimited
              field = {:url, value}
              {field, rest}
            {3, _, bytes} ->
              {len, bytes} = Protox.Varint.decode(bytes)
              <<delimited::binary-size(len), rest::binary>> = bytes
              value = CucumberMessages.Meta.CI.Git.decode!(delimited)
              field = {:git, Protox.Message.merge(msg.git(), value)}
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
      %{1 => {:name, {:default, ""}, :string}, 2 => {:url, {:default, ""}, :string}, 3 => {:git, {:default, nil}, {:message, CucumberMessages.Meta.CI.Git}}}
    end
    @spec(defs_by_name() :: %{required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}})
    def(defs_by_name()) do
      %{git: {3, {:default, nil}, {:message, CucumberMessages.Meta.CI.Git}}, name: {1, {:default, ""}, :string}, url: {2, {:default, ""}, :string}}
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
    [@spec(default(atom) :: {:ok, boolean | integer | String.t() | float} | {:error, atom}), [def(default(:name)) do
      {:ok, ""}
    end, def(default(:url)) do
      {:ok, ""}
    end, def(default(:git)) do
      {:ok, nil}
    end], def(default(_)) do
      {:error, :no_such_field}
    end]
  )
  []
end