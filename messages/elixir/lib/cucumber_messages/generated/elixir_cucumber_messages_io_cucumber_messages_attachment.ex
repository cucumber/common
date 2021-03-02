# credo:disable-for-this-file
defmodule(CucumberMessages.Io.Cucumber.Messages.Attachment) do
  @moduledoc false
  (
    defstruct(
      source: nil,
      test_step_id: "",
      test_case_started_id: "",
      body: "",
      media_type: "",
      content_encoding: :IDENTITY,
      file_name: "",
      url: "",
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
          |> encode_source(msg)
          |> encode_test_step_id(msg)
          |> encode_test_case_started_id(msg)
          |> encode_body(msg)
          |> encode_media_type(msg)
          |> encode_content_encoding(msg)
          |> encode_file_name(msg)
          |> encode_url(msg)
          |> encode_unknown_fields(msg)
        end
      )

      []

      [
        defp(encode_source(acc, msg)) do
          field_value = msg.source

          if(field_value == nil) do
            acc
          else
            [acc, "\n", Protox.Encode.encode_message(field_value)]
          end
        end,
        defp(encode_test_step_id(acc, msg)) do
          field_value = msg.test_step_id

          if(field_value == "") do
            acc
          else
            [acc, <<18>>, Protox.Encode.encode_string(field_value)]
          end
        end,
        defp(encode_test_case_started_id(acc, msg)) do
          field_value = msg.test_case_started_id

          if(field_value == "") do
            acc
          else
            [acc, <<26>>, Protox.Encode.encode_string(field_value)]
          end
        end,
        defp(encode_body(acc, msg)) do
          field_value = msg.body

          if(field_value == "") do
            acc
          else
            [acc, "\"", Protox.Encode.encode_string(field_value)]
          end
        end,
        defp(encode_media_type(acc, msg)) do
          field_value = msg.media_type

          if(field_value == "") do
            acc
          else
            [acc, "*", Protox.Encode.encode_string(field_value)]
          end
        end,
        defp(encode_content_encoding(acc, msg)) do
          field_value = msg.content_encoding

          if(field_value == :IDENTITY) do
            acc
          else
            [
              acc,
              "0",
              field_value
              |> CucumberMessages.Io.Cucumber.Messages.Attachment.ContentEncoding.encode()
              |> Protox.Encode.encode_enum()
            ]
          end
        end,
        defp(encode_file_name(acc, msg)) do
          field_value = msg.file_name

          if(field_value == "") do
            acc
          else
            [acc, ":", Protox.Encode.encode_string(field_value)]
          end
        end,
        defp(encode_url(acc, msg)) do
          field_value = msg.url

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
          parse_key_value(bytes, struct(CucumberMessages.Io.Cucumber.Messages.Attachment))
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
                value = CucumberMessages.Io.Cucumber.Messages.SourceReference.decode!(delimited)
                field = {:source, Protox.Message.merge(msg.source, value)}
                {[field], rest}

              {2, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = delimited
                field = {:test_step_id, value}
                {[field], rest}

              {3, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = delimited
                field = {:test_case_started_id, value}
                {[field], rest}

              {4, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = delimited
                field = {:body, value}
                {[field], rest}

              {5, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = delimited
                field = {:media_type, value}
                {[field], rest}

              {6, _, bytes} ->
                {value, rest} =
                  Protox.Decode.parse_enum(
                    bytes,
                    CucumberMessages.Io.Cucumber.Messages.Attachment.ContentEncoding
                  )

                field = {:content_encoding, value}
                {[field], rest}

              {7, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = delimited
                field = {:file_name, value}
                {[field], rest}

              {8, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = delimited
                field = {:url, value}
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
          {:source, {:default, nil},
           {:message, CucumberMessages.Io.Cucumber.Messages.SourceReference}},
        2 => {:test_step_id, {:default, ""}, :string},
        3 => {:test_case_started_id, {:default, ""}, :string},
        4 => {:body, {:default, ""}, :string},
        5 => {:media_type, {:default, ""}, :string},
        6 =>
          {:content_encoding, {:default, :IDENTITY},
           {:enum, CucumberMessages.Io.Cucumber.Messages.Attachment.ContentEncoding}},
        7 => {:file_name, {:default, ""}, :string},
        8 => {:url, {:default, ""}, :string}
      }
    end

    @spec defs_by_name() :: %{
            required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
          }
    def(defs_by_name()) do
      %{
        body: {4, {:default, ""}, :string},
        content_encoding:
          {6, {:default, :IDENTITY},
           {:enum, CucumberMessages.Io.Cucumber.Messages.Attachment.ContentEncoding}},
        file_name: {7, {:default, ""}, :string},
        media_type: {5, {:default, ""}, :string},
        source:
          {1, {:default, nil}, {:message, CucumberMessages.Io.Cucumber.Messages.SourceReference}},
        test_case_started_id: {3, {:default, ""}, :string},
        test_step_id: {2, {:default, ""}, :string},
        url: {8, {:default, ""}, :string}
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
      def(default(:source)) do
        {:ok, nil}
      end,
      def(default(:test_step_id)) do
        {:ok, ""}
      end,
      def(default(:test_case_started_id)) do
        {:ok, ""}
      end,
      def(default(:body)) do
        {:ok, ""}
      end,
      def(default(:media_type)) do
        {:ok, ""}
      end,
      def(default(:content_encoding)) do
        {:ok, :IDENTITY}
      end,
      def(default(:file_name)) do
        {:ok, ""}
      end,
      def(default(:url)) do
        {:ok, ""}
      end,
      def(default(_)) do
        {:error, :no_such_field}
      end
    ]
  )
end