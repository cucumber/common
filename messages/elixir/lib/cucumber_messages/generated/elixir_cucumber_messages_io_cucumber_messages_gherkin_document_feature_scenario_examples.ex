# credo:disable-for-this-file
defmodule(CucumberMessages.Io.Cucumber.Messages.GherkinDocument.Feature.Scenario.Examples) do
  @moduledoc false
  (
    defstruct(
      location: nil,
      tags: [],
      keyword: "",
      name: "",
      description: "",
      table_header: nil,
      table_body: [],
      id: "",
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
          |> encode_location(msg)
          |> encode_tags(msg)
          |> encode_keyword(msg)
          |> encode_name(msg)
          |> encode_description(msg)
          |> encode_table_header(msg)
          |> encode_table_body(msg)
          |> encode_id(msg)
          |> encode_unknown_fields(msg)
        end
      )

      []

      [
        defp(encode_location(acc, msg)) do
          field_value = msg.location

          if(field_value == nil) do
            acc
          else
            [acc, "\n", Protox.Encode.encode_message(field_value)]
          end
        end,
        defp(encode_tags(acc, msg)) do
          case(msg.tags) do
            [] ->
              acc

            values ->
              [
                acc,
                Enum.reduce(values, [], fn value, acc ->
                  [acc, <<18>>, Protox.Encode.encode_message(value)]
                end)
              ]
          end
        end,
        defp(encode_keyword(acc, msg)) do
          field_value = msg.keyword

          if(field_value == "") do
            acc
          else
            [acc, <<26>>, Protox.Encode.encode_string(field_value)]
          end
        end,
        defp(encode_name(acc, msg)) do
          field_value = msg.name

          if(field_value == "") do
            acc
          else
            [acc, "\"", Protox.Encode.encode_string(field_value)]
          end
        end,
        defp(encode_description(acc, msg)) do
          field_value = msg.description

          if(field_value == "") do
            acc
          else
            [acc, "*", Protox.Encode.encode_string(field_value)]
          end
        end,
        defp(encode_table_header(acc, msg)) do
          field_value = msg.table_header

          if(field_value == nil) do
            acc
          else
            [acc, "2", Protox.Encode.encode_message(field_value)]
          end
        end,
        defp(encode_table_body(acc, msg)) do
          case(msg.table_body) do
            [] ->
              acc

            values ->
              [
                acc,
                Enum.reduce(values, [], fn value, acc ->
                  [acc, ":", Protox.Encode.encode_message(value)]
                end)
              ]
          end
        end,
        defp(encode_id(acc, msg)) do
          field_value = msg.id

          if(field_value == "") do
            acc
          else
            [acc, "B", Protox.Encode.encode_string(field_value)]
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
          parse_key_value(
            bytes,
            struct(
              CucumberMessages.Io.Cucumber.Messages.GherkinDocument.Feature.Scenario.Examples
            )
          )
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
                value = CucumberMessages.Io.Cucumber.Messages.Location.decode!(delimited)
                field = {:location, Protox.Message.merge(msg.location, value)}
                {[field], rest}

              {2, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes

                value =
                  CucumberMessages.Io.Cucumber.Messages.GherkinDocument.Feature.Tag.decode!(
                    delimited
                  )

                field = {:tags, msg.tags ++ List.wrap(value)}
                {[field], rest}

              {3, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = delimited
                field = {:keyword, value}
                {[field], rest}

              {4, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = delimited
                field = {:name, value}
                {[field], rest}

              {5, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = delimited
                field = {:description, value}
                {[field], rest}

              {6, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes

                value =
                  CucumberMessages.Io.Cucumber.Messages.GherkinDocument.Feature.TableRow.decode!(
                    delimited
                  )

                field = {:table_header, Protox.Message.merge(msg.table_header, value)}
                {[field], rest}

              {7, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes

                value =
                  CucumberMessages.Io.Cucumber.Messages.GherkinDocument.Feature.TableRow.decode!(
                    delimited
                  )

                field = {:table_body, msg.table_body ++ List.wrap(value)}
                {[field], rest}

              {8, _, bytes} ->
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
        1 =>
          {:location, {:default, nil}, {:message, CucumberMessages.Io.Cucumber.Messages.Location}},
        2 =>
          {:tags, :unpacked,
           {:message, CucumberMessages.Io.Cucumber.Messages.GherkinDocument.Feature.Tag}},
        3 => {:keyword, {:default, ""}, :string},
        4 => {:name, {:default, ""}, :string},
        5 => {:description, {:default, ""}, :string},
        6 =>
          {:table_header, {:default, nil},
           {:message, CucumberMessages.Io.Cucumber.Messages.GherkinDocument.Feature.TableRow}},
        7 =>
          {:table_body, :unpacked,
           {:message, CucumberMessages.Io.Cucumber.Messages.GherkinDocument.Feature.TableRow}},
        8 => {:id, {:default, ""}, :string}
      }
    end

    @spec defs_by_name() :: %{
            required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
          }
    def(defs_by_name()) do
      %{
        description: {5, {:default, ""}, :string},
        id: {8, {:default, ""}, :string},
        keyword: {3, {:default, ""}, :string},
        location:
          {1, {:default, nil}, {:message, CucumberMessages.Io.Cucumber.Messages.Location}},
        name: {4, {:default, ""}, :string},
        table_body:
          {7, :unpacked,
           {:message, CucumberMessages.Io.Cucumber.Messages.GherkinDocument.Feature.TableRow}},
        table_header:
          {6, {:default, nil},
           {:message, CucumberMessages.Io.Cucumber.Messages.GherkinDocument.Feature.TableRow}},
        tags:
          {2, :unpacked,
           {:message, CucumberMessages.Io.Cucumber.Messages.GherkinDocument.Feature.Tag}}
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
      def(default(:tags)) do
        {:error, :no_default_value}
      end,
      def(default(:keyword)) do
        {:ok, ""}
      end,
      def(default(:name)) do
        {:ok, ""}
      end,
      def(default(:description)) do
        {:ok, ""}
      end,
      def(default(:table_header)) do
        {:ok, nil}
      end,
      def(default(:table_body)) do
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