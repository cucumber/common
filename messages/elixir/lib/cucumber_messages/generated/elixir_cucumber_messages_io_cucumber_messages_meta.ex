# credo:disable-for-this-file
defmodule(CucumberMessages.Io.Cucumber.Messages.Meta) do
  @moduledoc false
  (
    defstruct(
      protocol_version: "",
      implementation: nil,
      runtime: nil,
      os: nil,
      cpu: nil,
      ci: nil,
      __uf__: []
    )

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
          |> encode_protocol_version(msg)
          |> encode_implementation(msg)
          |> encode_runtime(msg)
          |> encode_os(msg)
          |> encode_cpu(msg)
          |> encode_ci(msg)
          |> encode_unknown_fields(msg)
        end
      )

      []

      [
        defp(encode_protocol_version(acc, msg)) do
          field_value = msg.protocol_version

          if(field_value == "") do
            acc
          else
            [acc, "\n", Protox.Encode.encode_string(field_value)]
          end
        end,
        defp(encode_implementation(acc, msg)) do
          field_value = msg.implementation

          if(field_value == nil) do
            acc
          else
            [acc, <<18>>, Protox.Encode.encode_message(field_value)]
          end
        end,
        defp(encode_runtime(acc, msg)) do
          field_value = msg.runtime

          if(field_value == nil) do
            acc
          else
            [acc, <<26>>, Protox.Encode.encode_message(field_value)]
          end
        end,
        defp(encode_os(acc, msg)) do
          field_value = msg.os

          if(field_value == nil) do
            acc
          else
            [acc, "\"", Protox.Encode.encode_message(field_value)]
          end
        end,
        defp(encode_cpu(acc, msg)) do
          field_value = msg.cpu

          if(field_value == nil) do
            acc
          else
            [acc, "*", Protox.Encode.encode_message(field_value)]
          end
        end,
        defp(encode_ci(acc, msg)) do
          field_value = msg.ci

          if(field_value == nil) do
            acc
          else
            [acc, "2", Protox.Encode.encode_message(field_value)]
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
          parse_key_value(bytes, struct(CucumberMessages.Io.Cucumber.Messages.Meta))
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
                field = {:protocol_version, value}
                {[field], rest}

              {2, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.Meta.Product.decode!(delimited)
                field = {:implementation, Protox.Message.merge(msg.implementation, value)}
                {[field], rest}

              {3, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.Meta.Product.decode!(delimited)
                field = {:runtime, Protox.Message.merge(msg.runtime, value)}
                {[field], rest}

              {4, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.Meta.Product.decode!(delimited)
                field = {:os, Protox.Message.merge(msg.os, value)}
                {[field], rest}

              {5, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.Meta.Product.decode!(delimited)
                field = {:cpu, Protox.Message.merge(msg.cpu, value)}
                {[field], rest}

              {6, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.Meta.CI.decode!(delimited)
                field = {:ci, Protox.Message.merge(msg.ci, value)}
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
        1 => {:protocol_version, {:default, ""}, :string},
        2 =>
          {:implementation, {:default, nil},
           {:message, CucumberMessages.Io.Cucumber.Messages.Meta.Product}},
        3 =>
          {:runtime, {:default, nil},
           {:message, CucumberMessages.Io.Cucumber.Messages.Meta.Product}},
        4 =>
          {:os, {:default, nil}, {:message, CucumberMessages.Io.Cucumber.Messages.Meta.Product}},
        5 =>
          {:cpu, {:default, nil}, {:message, CucumberMessages.Io.Cucumber.Messages.Meta.Product}},
        6 => {:ci, {:default, nil}, {:message, CucumberMessages.Io.Cucumber.Messages.Meta.CI}}
      }
    end

    @spec defs_by_name() :: %{
            required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
          }
    def(defs_by_name()) do
      %{
        ci: {6, {:default, nil}, {:message, CucumberMessages.Io.Cucumber.Messages.Meta.CI}},
        cpu: {5, {:default, nil}, {:message, CucumberMessages.Io.Cucumber.Messages.Meta.Product}},
        implementation:
          {2, {:default, nil}, {:message, CucumberMessages.Io.Cucumber.Messages.Meta.Product}},
        os: {4, {:default, nil}, {:message, CucumberMessages.Io.Cucumber.Messages.Meta.Product}},
        protocol_version: {1, {:default, ""}, :string},
        runtime:
          {3, {:default, nil}, {:message, CucumberMessages.Io.Cucumber.Messages.Meta.Product}}
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
      def(default(:protocol_version)) do
        {:ok, ""}
      end,
      def(default(:implementation)) do
        {:ok, nil}
      end,
      def(default(:runtime)) do
        {:ok, nil}
      end,
      def(default(:os)) do
        {:ok, nil}
      end,
      def(default(:cpu)) do
        {:ok, nil}
      end,
      def(default(:ci)) do
        {:ok, nil}
      end,
      def(default(_)) do
        {:error, :no_such_field}
      end
    ]
  )
end