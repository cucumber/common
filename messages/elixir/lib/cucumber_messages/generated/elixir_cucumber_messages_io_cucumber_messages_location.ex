# credo:disable-for-this-file
defmodule(CucumberMessages.Io.Cucumber.Messages.Location) do
  @moduledoc false
  (
    defstruct(line: 0, column: 0, __uf__: [])

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
          [] |> encode_line(msg) |> encode_column(msg) |> encode_unknown_fields(msg)
        end
      )

      []

      [
        defp(encode_line(acc, msg)) do
          field_value = msg.line

          if(field_value == 0) do
            acc
          else
            [acc, "\b", Protox.Encode.encode_uint32(field_value)]
          end
        end,
        defp(encode_column(acc, msg)) do
          field_value = msg.column

          if(field_value == 0) do
            acc
          else
            [acc, <<16>>, Protox.Encode.encode_uint32(field_value)]
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
          parse_key_value(bytes, struct(CucumberMessages.Io.Cucumber.Messages.Location))
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
                {value, rest} = Protox.Decode.parse_uint32(bytes)
                field = {:line, value}
                {[field], rest}

              {2, _, bytes} ->
                {value, rest} = Protox.Decode.parse_uint32(bytes)
                field = {:column, value}
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
      %{1 => {:line, {:default, 0}, :uint32}, 2 => {:column, {:default, 0}, :uint32}}
    end

    @spec defs_by_name() :: %{
            required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
          }
    def(defs_by_name()) do
      %{column: {2, {:default, 0}, :uint32}, line: {1, {:default, 0}, :uint32}}
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
      def(default(:line)) do
        {:ok, 0}
      end,
      def(default(:column)) do
        {:ok, 0}
      end,
      def(default(_)) do
        {:error, :no_such_field}
      end
    ]
  )
end