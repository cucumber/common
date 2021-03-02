# credo:disable-for-this-file
defmodule(CucumberMessages.Io.Cucumber.Messages.SourceReference) do
  @moduledoc false
  (
    defstruct(reference: nil, location: nil, __uf__: [])

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
          [] |> encode_reference(msg) |> encode_location(msg) |> encode_unknown_fields(msg)
        end
      )

      [
        defp(encode_reference(acc, msg)) do
          case(msg.reference) do
            nil ->
              acc

            {:uri, _field_value} ->
              encode_uri(acc, msg)

            {:java_method, _field_value} ->
              encode_java_method(acc, msg)

            {:java_stack_trace_element, _field_value} ->
              encode_java_stack_trace_element(acc, msg)
          end
        end
      ]

      [
        defp(encode_uri(acc, msg)) do
          {_, field_value} = msg.reference
          [acc, "\n", Protox.Encode.encode_string(field_value)]
        end,
        defp(encode_location(acc, msg)) do
          field_value = msg.location

          if(field_value == nil) do
            acc
          else
            [acc, <<18>>, Protox.Encode.encode_message(field_value)]
          end
        end,
        defp(encode_java_method(acc, msg)) do
          {_, field_value} = msg.reference
          [acc, <<26>>, Protox.Encode.encode_message(field_value)]
        end,
        defp(encode_java_stack_trace_element(acc, msg)) do
          {_, field_value} = msg.reference
          [acc, "\"", Protox.Encode.encode_message(field_value)]
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
          parse_key_value(bytes, struct(CucumberMessages.Io.Cucumber.Messages.SourceReference))
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
                field = {:reference, {:uri, value}}
                {[field], rest}

              {2, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.Location.decode!(delimited)
                field = {:location, Protox.Message.merge(msg.location, value)}
                {[field], rest}

              {3, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes

                value =
                  CucumberMessages.Io.Cucumber.Messages.SourceReference.JavaMethod.decode!(
                    delimited
                  )

                field =
                  case(msg.reference) do
                    {:java_method, previous_value} ->
                      {:reference, {:java_method, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:reference, {:java_method, value}}
                  end

                {[field], rest}

              {4, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes

                value =
                  CucumberMessages.Io.Cucumber.Messages.SourceReference.JavaStackTraceElement.decode!(
                    delimited
                  )

                field =
                  case(msg.reference) do
                    {:java_stack_trace_element, previous_value} ->
                      {:reference,
                       {:java_stack_trace_element, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:reference, {:java_stack_trace_element, value}}
                  end

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
        1 => {:uri, {:oneof, :reference}, :string},
        2 =>
          {:location, {:default, nil}, {:message, CucumberMessages.Io.Cucumber.Messages.Location}},
        3 =>
          {:java_method, {:oneof, :reference},
           {:message, CucumberMessages.Io.Cucumber.Messages.SourceReference.JavaMethod}},
        4 =>
          {:java_stack_trace_element, {:oneof, :reference},
           {:message, CucumberMessages.Io.Cucumber.Messages.SourceReference.JavaStackTraceElement}}
      }
    end

    @spec defs_by_name() :: %{
            required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
          }
    def(defs_by_name()) do
      %{
        java_method:
          {3, {:oneof, :reference},
           {:message, CucumberMessages.Io.Cucumber.Messages.SourceReference.JavaMethod}},
        java_stack_trace_element:
          {4, {:oneof, :reference},
           {:message, CucumberMessages.Io.Cucumber.Messages.SourceReference.JavaStackTraceElement}},
        location:
          {2, {:default, nil}, {:message, CucumberMessages.Io.Cucumber.Messages.Location}},
        uri: {1, {:oneof, :reference}, :string}
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
        {:error, :no_default_value}
      end,
      def(default(:location)) do
        {:ok, nil}
      end,
      def(default(:java_method)) do
        {:error, :no_default_value}
      end,
      def(default(:java_stack_trace_element)) do
        {:error, :no_default_value}
      end,
      def(default(_)) do
        {:error, :no_such_field}
      end
    ]
  )
end