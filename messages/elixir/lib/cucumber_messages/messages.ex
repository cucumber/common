# credo:disable-for-this-file
[
  defmodule(CucumberMessages.Attachment.ContentEncoding) do
    @moduledoc false
    (
      (
        @spec default() :: :IDENTITY
        def(default()) do
          :IDENTITY
        end
      )

      @spec encode(atom) :: integer | atom
      [
        def(encode(:IDENTITY)) do
          0
        end,
        def(encode(:BASE64)) do
          1
        end
      ]

      def(encode(x)) do
        x
      end

      @spec decode(integer) :: atom | integer
      [
        def(decode(0)) do
          :IDENTITY
        end,
        def(decode(1)) do
          :BASE64
        end
      ]

      def(decode(x)) do
        x
      end

      @spec constants() :: [{integer, atom}]
      def(constants()) do
        [{0, :IDENTITY}, {1, :BASE64}]
      end
    )

    []
  end,
  defmodule(CucumberMessages.StepDefinition.StepDefinitionPattern.StepDefinitionPatternType) do
    @moduledoc false
    (
      (
        @spec default() :: :CUCUMBER_EXPRESSION
        def(default()) do
          :CUCUMBER_EXPRESSION
        end
      )

      @spec encode(atom) :: integer | atom
      [
        def(encode(:CUCUMBER_EXPRESSION)) do
          0
        end,
        def(encode(:REGULAR_EXPRESSION)) do
          1
        end
      ]

      def(encode(x)) do
        x
      end

      @spec decode(integer) :: atom | integer
      [
        def(decode(0)) do
          :CUCUMBER_EXPRESSION
        end,
        def(decode(1)) do
          :REGULAR_EXPRESSION
        end
      ]

      def(decode(x)) do
        x
      end

      @spec constants() :: [{integer, atom}]
      def(constants()) do
        [{0, :CUCUMBER_EXPRESSION}, {1, :REGULAR_EXPRESSION}]
      end
    )

    []
  end,
  defmodule(CucumberMessages.TestStepFinished.TestStepResult.Status) do
    @moduledoc false
    (
      (
        @spec default() :: :UNKNOWN
        def(default()) do
          :UNKNOWN
        end
      )

      @spec encode(atom) :: integer | atom
      [
        def(encode(:UNKNOWN)) do
          0
        end,
        def(encode(:PASSED)) do
          1
        end,
        def(encode(:SKIPPED)) do
          2
        end,
        def(encode(:PENDING)) do
          3
        end,
        def(encode(:UNDEFINED)) do
          4
        end,
        def(encode(:AMBIGUOUS)) do
          5
        end,
        def(encode(:FAILED)) do
          6
        end
      ]

      def(encode(x)) do
        x
      end

      @spec decode(integer) :: atom | integer
      [
        def(decode(0)) do
          :UNKNOWN
        end,
        def(decode(1)) do
          :PASSED
        end,
        def(decode(2)) do
          :SKIPPED
        end,
        def(decode(3)) do
          :PENDING
        end,
        def(decode(4)) do
          :UNDEFINED
        end,
        def(decode(5)) do
          :AMBIGUOUS
        end,
        def(decode(6)) do
          :FAILED
        end
      ]

      def(decode(x)) do
        x
      end

      @spec constants() :: [{integer, atom}]
      def(constants()) do
        [
          {0, :UNKNOWN},
          {1, :PASSED},
          {2, :SKIPPED},
          {3, :PENDING},
          {4, :UNDEFINED},
          {5, :AMBIGUOUS},
          {6, :FAILED}
        ]
      end
    )

    []
  end,
  defmodule(CucumberMessages.Pickle.PickleTag) do
    @moduledoc false
    (
      defstruct(name: "", ast_node_id: "", __uf__: [])

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
          [] |> encode_name(msg) |> encode_ast_node_id(msg) |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_name(acc, msg)) do
            field_value = msg.name()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_ast_node_id(acc, msg)) do
            field_value = msg.ast_node_id()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.Pickle.PickleTag))
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
                  field = {:name, value}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:ast_node_id, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
            parse_key_value(rest, msg_updated)
          end
        )

        []
      )

      @spec defs() :: %{
              required(non_neg_integer) => {atom, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs()) do
        %{1 => {:name, {:default, ""}, :string}, 2 => {:ast_node_id, {:default, ""}, :string}}
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{ast_node_id: {2, {:default, ""}, :string}, name: {1, {:default, ""}, :string}}
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:name)) do
            {:ok, ""}
          end,
          def(default(:ast_node_id)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.Meta.CI) do
    @moduledoc false
    (
      defstruct(name: "", url: "", git: nil, __uf__: [])

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
          |> encode_name(msg)
          |> encode_url(msg)
          |> encode_git(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_name(acc, msg)) do
            field_value = msg.name()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_url(acc, msg)) do
            field_value = msg.url()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_git(acc, msg)) do
            field_value = msg.git()

            if(field_value == nil) do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_message(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.Meta.CI))
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

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:name, {:default, ""}, :string},
          2 => {:url, {:default, ""}, :string},
          3 => {:git, {:default, nil}, {:message, CucumberMessages.Meta.CI.Git}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          git: {3, {:default, nil}, {:message, CucumberMessages.Meta.CI.Git}},
          name: {1, {:default, ""}, :string},
          url: {2, {:default, ""}, :string}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:name)) do
            {:ok, ""}
          end,
          def(default(:url)) do
            {:ok, ""}
          end,
          def(default(:git)) do
            {:ok, nil}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell) do
    @moduledoc false
    (
      defstruct(value: "", __uf__: [])

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
          [] |> encode_value(msg) |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_value(acc, msg)) do
            field_value = msg.value()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

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
                CucumberMessages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell
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
                  value = delimited
                  field = {:value, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
            parse_key_value(rest, msg_updated)
          end
        )

        []
      )

      @spec defs() :: %{
              required(non_neg_integer) => {atom, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs()) do
        %{1 => {:value, {:default, ""}, :string}}
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{value: {1, {:default, ""}, :string}}
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:value)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.Meta) do
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

        []

        [
          defp(encode_protocol_version(acc, msg)) do
            field_value = msg.protocol_version()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_implementation(acc, msg)) do
            field_value = msg.implementation()

            if(field_value == nil) do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_runtime(acc, msg)) do
            field_value = msg.runtime()

            if(field_value == nil) do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_os(acc, msg)) do
            field_value = msg.os()

            if(field_value == nil) do
              acc
            else
              [acc, "\"", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_cpu(acc, msg)) do
            field_value = msg.cpu()

            if(field_value == nil) do
              acc
            else
              [acc, "*", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_ci(acc, msg)) do
            field_value = msg.ci()

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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.Meta))
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
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.Meta.Product.decode!(delimited)
                  field = {:implementation, Protox.Message.merge(msg.implementation(), value)}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.Meta.Product.decode!(delimited)
                  field = {:runtime, Protox.Message.merge(msg.runtime(), value)}
                  {field, rest}

                {4, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.Meta.Product.decode!(delimited)
                  field = {:os, Protox.Message.merge(msg.os(), value)}
                  {field, rest}

                {5, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.Meta.Product.decode!(delimited)
                  field = {:cpu, Protox.Message.merge(msg.cpu(), value)}
                  {field, rest}

                {6, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.Meta.CI.decode!(delimited)
                  field = {:ci, Protox.Message.merge(msg.ci(), value)}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          2 => {:implementation, {:default, nil}, {:message, CucumberMessages.Meta.Product}},
          3 => {:runtime, {:default, nil}, {:message, CucumberMessages.Meta.Product}},
          4 => {:os, {:default, nil}, {:message, CucumberMessages.Meta.Product}},
          5 => {:cpu, {:default, nil}, {:message, CucumberMessages.Meta.Product}},
          6 => {:ci, {:default, nil}, {:message, CucumberMessages.Meta.CI}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          ci: {6, {:default, nil}, {:message, CucumberMessages.Meta.CI}},
          cpu: {5, {:default, nil}, {:message, CucumberMessages.Meta.Product}},
          implementation: {2, {:default, nil}, {:message, CucumberMessages.Meta.Product}},
          os: {4, {:default, nil}, {:message, CucumberMessages.Meta.Product}},
          protocol_version: {1, {:default, ""}, :string},
          runtime: {3, {:default, nil}, {:message, CucumberMessages.Meta.Product}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
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
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.GherkinDocument.Feature.FeatureChild.RuleChild) do
    @moduledoc false
    (
      defstruct(value: nil, __uf__: [])

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
          [] |> encode_value(msg) |> encode_unknown_fields(msg)
        end

        [
          defp(encode_value(acc, msg)) do
            case(msg.value()) do
              nil ->
                acc

              {:background, _field_value} ->
                encode_background(acc, msg)

              {:scenario, _field_value} ->
                encode_scenario(acc, msg)
            end
          end
        ]

        [
          defp(encode_background(acc, msg)) do
            {_, field_value} = msg.value()
            [acc, "\n", Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_scenario(acc, msg)) do
            {_, field_value} = msg.value()
            [acc, <<18>>, Protox.Encode.encode_message(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(
              bytes,
              struct(CucumberMessages.GherkinDocument.Feature.FeatureChild.RuleChild)
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
                  value = CucumberMessages.GherkinDocument.Feature.Background.decode!(delimited)

                  field =
                    case(msg.value()) do
                      {:background, previous_value} ->
                        {:value, {:background, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:value, {:background, value}}
                    end

                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.GherkinDocument.Feature.Scenario.decode!(delimited)

                  field =
                    case(msg.value()) do
                      {:scenario, previous_value} ->
                        {:value, {:scenario, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:value, {:scenario, value}}
                    end

                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
            {:background, {:oneof, :value},
             {:message, CucumberMessages.GherkinDocument.Feature.Background}},
          2 =>
            {:scenario, {:oneof, :value},
             {:message, CucumberMessages.GherkinDocument.Feature.Scenario}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          background:
            {1, {:oneof, :value}, {:message, CucumberMessages.GherkinDocument.Feature.Background}},
          scenario:
            {2, {:oneof, :value}, {:message, CucumberMessages.GherkinDocument.Feature.Scenario}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:background)) do
            {:error, :no_default_value}
          end,
          def(default(:scenario)) do
            {:error, :no_default_value}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.GherkinDocument.Feature.FeatureChild.Rule) do
    @moduledoc false
    (
      defstruct(
        location: nil,
        keyword: "",
        name: "",
        description: "",
        children: [],
        id: "",
        __uf__: []
      )

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
          |> encode_keyword(msg)
          |> encode_name(msg)
          |> encode_description(msg)
          |> encode_children(msg)
          |> encode_id(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_location(acc, msg)) do
            field_value = msg.location()

            if(field_value == nil) do
              acc
            else
              [acc, "\n", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_keyword(acc, msg)) do
            field_value = msg.keyword()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_name(acc, msg)) do
            field_value = msg.name()

            if(field_value == "") do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_description(acc, msg)) do
            field_value = msg.description()

            if(field_value == "") do
              acc
            else
              [acc, "\"", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_children(acc, msg)) do
            case(msg.children()) do
              [] ->
                acc

              values ->
                [
                  acc,
                  Enum.reduce(values, [], fn value, acc ->
                    [acc, "*", Protox.Encode.encode_message(value)]
                  end)
                ]
            end
          end,
          defp(encode_id(acc, msg)) do
            field_value = msg.id()

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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(
              bytes,
              struct(CucumberMessages.GherkinDocument.Feature.FeatureChild.Rule)
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
                  value = CucumberMessages.Location.decode!(delimited)
                  field = {:location, Protox.Message.merge(msg.location(), value)}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:keyword, value}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:name, value}
                  {field, rest}

                {4, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:description, value}
                  {field, rest}

                {5, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes

                  value =
                    CucumberMessages.GherkinDocument.Feature.FeatureChild.RuleChild.decode!(
                      delimited
                    )

                  field = {:children, msg.children() ++ List.wrap(value)}
                  {field, rest}

                {6, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:id, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:location, {:default, nil}, {:message, CucumberMessages.Location}},
          2 => {:keyword, {:default, ""}, :string},
          3 => {:name, {:default, ""}, :string},
          4 => {:description, {:default, ""}, :string},
          5 =>
            {:children, :unpacked,
             {:message, CucumberMessages.GherkinDocument.Feature.FeatureChild.RuleChild}},
          6 => {:id, {:default, ""}, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          children:
            {5, :unpacked,
             {:message, CucumberMessages.GherkinDocument.Feature.FeatureChild.RuleChild}},
          description: {4, {:default, ""}, :string},
          id: {6, {:default, ""}, :string},
          keyword: {2, {:default, ""}, :string},
          location: {1, {:default, nil}, {:message, CucumberMessages.Location}},
          name: {3, {:default, ""}, :string}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:location)) do
            {:ok, nil}
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
          def(default(:children)) do
            {:error, :no_default_value}
          end,
          def(default(:id)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.UndefinedParameterType) do
    @moduledoc false
    (
      defstruct(name: "", expression: "", __uf__: [])

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
          [] |> encode_name(msg) |> encode_expression(msg) |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_name(acc, msg)) do
            field_value = msg.name()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_expression(acc, msg)) do
            field_value = msg.expression()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.UndefinedParameterType))
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
                  field = {:name, value}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:expression, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
            parse_key_value(rest, msg_updated)
          end
        )

        []
      )

      @spec defs() :: %{
              required(non_neg_integer) => {atom, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs()) do
        %{1 => {:name, {:default, ""}, :string}, 2 => {:expression, {:default, ""}, :string}}
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{expression: {2, {:default, ""}, :string}, name: {1, {:default, ""}, :string}}
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:name)) do
            {:ok, ""}
          end,
          def(default(:expression)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.TestCase.TestStep.StepMatchArgumentsList) do
    @moduledoc false
    (
      defstruct(step_match_arguments: [], __uf__: [])

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
          [] |> encode_step_match_arguments(msg) |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_step_match_arguments(acc, msg)) do
            case(msg.step_match_arguments()) do
              [] ->
                acc

              values ->
                [
                  acc,
                  Enum.reduce(values, [], fn value, acc ->
                    [acc, "\n", Protox.Encode.encode_message(value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(
              bytes,
              struct(CucumberMessages.TestCase.TestStep.StepMatchArgumentsList)
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

                  value =
                    CucumberMessages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument.decode!(
                      delimited
                    )

                  field = {:step_match_arguments, msg.step_match_arguments() ++ List.wrap(value)}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
            {:step_match_arguments, :unpacked,
             {:message,
              CucumberMessages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          step_match_arguments:
            {1, :unpacked,
             {:message,
              CucumberMessages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:step_match_arguments)) do
            {:error, :no_default_value}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.GherkinDocument.Feature) do
    @moduledoc false
    (
      defstruct(
        location: nil,
        tags: [],
        language: "",
        keyword: "",
        name: "",
        description: "",
        children: [],
        __uf__: []
      )

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
          |> encode_language(msg)
          |> encode_keyword(msg)
          |> encode_name(msg)
          |> encode_description(msg)
          |> encode_children(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_location(acc, msg)) do
            field_value = msg.location()

            if(field_value == nil) do
              acc
            else
              [acc, "\n", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_tags(acc, msg)) do
            case(msg.tags()) do
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
          defp(encode_language(acc, msg)) do
            field_value = msg.language()

            if(field_value == "") do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_keyword(acc, msg)) do
            field_value = msg.keyword()

            if(field_value == "") do
              acc
            else
              [acc, "\"", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_name(acc, msg)) do
            field_value = msg.name()

            if(field_value == "") do
              acc
            else
              [acc, "*", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_description(acc, msg)) do
            field_value = msg.description()

            if(field_value == "") do
              acc
            else
              [acc, "2", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_children(acc, msg)) do
            case(msg.children()) do
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.GherkinDocument.Feature))
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
                  value = CucumberMessages.Location.decode!(delimited)
                  field = {:location, Protox.Message.merge(msg.location(), value)}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.GherkinDocument.Feature.Tag.decode!(delimited)
                  field = {:tags, msg.tags() ++ List.wrap(value)}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:language, value}
                  {field, rest}

                {4, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:keyword, value}
                  {field, rest}

                {5, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:name, value}
                  {field, rest}

                {6, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:description, value}
                  {field, rest}

                {7, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.GherkinDocument.Feature.FeatureChild.decode!(delimited)
                  field = {:children, msg.children() ++ List.wrap(value)}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:location, {:default, nil}, {:message, CucumberMessages.Location}},
          2 => {:tags, :unpacked, {:message, CucumberMessages.GherkinDocument.Feature.Tag}},
          3 => {:language, {:default, ""}, :string},
          4 => {:keyword, {:default, ""}, :string},
          5 => {:name, {:default, ""}, :string},
          6 => {:description, {:default, ""}, :string},
          7 =>
            {:children, :unpacked,
             {:message, CucumberMessages.GherkinDocument.Feature.FeatureChild}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          children:
            {7, :unpacked, {:message, CucumberMessages.GherkinDocument.Feature.FeatureChild}},
          description: {6, {:default, ""}, :string},
          keyword: {4, {:default, ""}, :string},
          language: {3, {:default, ""}, :string},
          location: {1, {:default, nil}, {:message, CucumberMessages.Location}},
          name: {5, {:default, ""}, :string},
          tags: {2, :unpacked, {:message, CucumberMessages.GherkinDocument.Feature.Tag}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:location)) do
            {:ok, nil}
          end,
          def(default(:tags)) do
            {:error, :no_default_value}
          end,
          def(default(:language)) do
            {:ok, ""}
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
          def(default(:children)) do
            {:error, :no_default_value}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.GherkinDocument.Comment) do
    @moduledoc false
    (
      defstruct(location: nil, text: "", __uf__: [])

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
          [] |> encode_location(msg) |> encode_text(msg) |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_location(acc, msg)) do
            field_value = msg.location()

            if(field_value == nil) do
              acc
            else
              [acc, "\n", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_text(acc, msg)) do
            field_value = msg.text()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.GherkinDocument.Comment))
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
                  value = CucumberMessages.Location.decode!(delimited)
                  field = {:location, Protox.Message.merge(msg.location(), value)}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:text, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:location, {:default, nil}, {:message, CucumberMessages.Location}},
          2 => {:text, {:default, ""}, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          location: {1, {:default, nil}, {:message, CucumberMessages.Location}},
          text: {2, {:default, ""}, :string}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:location)) do
            {:ok, nil}
          end,
          def(default(:text)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.StepDefinition.StepDefinitionPattern) do
    @moduledoc false
    (
      defstruct(source: "", type: :CUCUMBER_EXPRESSION, __uf__: [])

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
          [] |> encode_source(msg) |> encode_type(msg) |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_source(acc, msg)) do
            field_value = msg.source()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_type(acc, msg)) do
            field_value = msg.type()

            if(field_value == :CUCUMBER_EXPRESSION) do
              acc
            else
              [
                acc,
                <<16>>,
                field_value
                |> CucumberMessages.StepDefinition.StepDefinitionPattern.StepDefinitionPatternType.encode()
                |> Protox.Encode.encode_enum()
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.StepDefinition.StepDefinitionPattern))
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
                  field = {:source, value}
                  {field, rest}

                {2, _, bytes} ->
                  {value, rest} =
                    Protox.Decode.parse_enum(
                      bytes,
                      CucumberMessages.StepDefinition.StepDefinitionPattern.StepDefinitionPatternType
                    )

                  field = {:type, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:source, {:default, ""}, :string},
          2 =>
            {:type, {:default, :CUCUMBER_EXPRESSION},
             {:enum,
              CucumberMessages.StepDefinition.StepDefinitionPattern.StepDefinitionPatternType}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          source: {1, {:default, ""}, :string},
          type:
            {2, {:default, :CUCUMBER_EXPRESSION},
             {:enum,
              CucumberMessages.StepDefinition.StepDefinitionPattern.StepDefinitionPatternType}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:source)) do
            {:ok, ""}
          end,
          def(default(:type)) do
            {:ok, :CUCUMBER_EXPRESSION}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.GherkinDocument.Feature.Tag) do
    @moduledoc false
    (
      defstruct(location: nil, name: "", id: "", __uf__: [])

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
          |> encode_name(msg)
          |> encode_id(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_location(acc, msg)) do
            field_value = msg.location()

            if(field_value == nil) do
              acc
            else
              [acc, "\n", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_name(acc, msg)) do
            field_value = msg.name()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_id(acc, msg)) do
            field_value = msg.id()

            if(field_value == "") do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.GherkinDocument.Feature.Tag))
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
                  value = CucumberMessages.Location.decode!(delimited)
                  field = {:location, Protox.Message.merge(msg.location(), value)}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:name, value}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:id, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:location, {:default, nil}, {:message, CucumberMessages.Location}},
          2 => {:name, {:default, ""}, :string},
          3 => {:id, {:default, ""}, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          id: {3, {:default, ""}, :string},
          location: {1, {:default, nil}, {:message, CucumberMessages.Location}},
          name: {2, {:default, ""}, :string}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:location)) do
            {:ok, nil}
          end,
          def(default(:name)) do
            {:ok, ""}
          end,
          def(default(:id)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.PickleStepArgument.PickleDocString) do
    @moduledoc false
    (
      defstruct(media_type: "", content: "", __uf__: [])

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
          [] |> encode_media_type(msg) |> encode_content(msg) |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_media_type(acc, msg)) do
            field_value = msg.media_type()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_content(acc, msg)) do
            field_value = msg.content()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.PickleStepArgument.PickleDocString))
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
                  field = {:media_type, value}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:content, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
            parse_key_value(rest, msg_updated)
          end
        )

        []
      )

      @spec defs() :: %{
              required(non_neg_integer) => {atom, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs()) do
        %{1 => {:media_type, {:default, ""}, :string}, 2 => {:content, {:default, ""}, :string}}
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{content: {2, {:default, ""}, :string}, media_type: {1, {:default, ""}, :string}}
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:media_type)) do
            {:ok, ""}
          end,
          def(default(:content)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.PickleStepArgument) do
    @moduledoc false
    (
      defstruct(message: nil, __uf__: [])

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
          [] |> encode_message(msg) |> encode_unknown_fields(msg)
        end

        [
          defp(encode_message(acc, msg)) do
            case(msg.message()) do
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
          defp(encode_doc_string(acc, msg)) do
            {_, field_value} = msg.message()
            [acc, "\n", Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_data_table(acc, msg)) do
            {_, field_value} = msg.message()
            [acc, <<18>>, Protox.Encode.encode_message(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.PickleStepArgument))
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
                  value = CucumberMessages.PickleStepArgument.PickleDocString.decode!(delimited)

                  field =
                    case(msg.message()) do
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

                  field =
                    case(msg.message()) do
                      {:data_table, previous_value} ->
                        {:message, {:data_table, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:message, {:data_table, value}}
                    end

                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
            {:doc_string, {:oneof, :message},
             {:message, CucumberMessages.PickleStepArgument.PickleDocString}},
          2 =>
            {:data_table, {:oneof, :message},
             {:message, CucumberMessages.PickleStepArgument.PickleTable}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          data_table:
            {2, {:oneof, :message}, {:message, CucumberMessages.PickleStepArgument.PickleTable}},
          doc_string:
            {1, {:oneof, :message},
             {:message, CucumberMessages.PickleStepArgument.PickleDocString}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:doc_string)) do
            {:error, :no_default_value}
          end,
          def(default(:data_table)) do
            {:error, :no_default_value}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.ParseError) do
    @moduledoc false
    (
      defstruct(source: nil, message: "", __uf__: [])

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
          [] |> encode_source(msg) |> encode_message(msg) |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_source(acc, msg)) do
            field_value = msg.source()

            if(field_value == nil) do
              acc
            else
              [acc, "\n", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_message(acc, msg)) do
            field_value = msg.message()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.ParseError))
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
                  value = CucumberMessages.SourceReference.decode!(delimited)
                  field = {:source, Protox.Message.merge(msg.source(), value)}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:message, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:source, {:default, nil}, {:message, CucumberMessages.SourceReference}},
          2 => {:message, {:default, ""}, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          message: {2, {:default, ""}, :string},
          source: {1, {:default, nil}, {:message, CucumberMessages.SourceReference}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:source)) do
            {:ok, nil}
          end,
          def(default(:message)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.PickleStepArgument.PickleTable) do
    @moduledoc false
    (
      defstruct(rows: [], __uf__: [])

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
          [] |> encode_rows(msg) |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_rows(acc, msg)) do
            case(msg.rows()) do
              [] ->
                acc

              values ->
                [
                  acc,
                  Enum.reduce(values, [], fn value, acc ->
                    [acc, "\n", Protox.Encode.encode_message(value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.PickleStepArgument.PickleTable))
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

                  value =
                    CucumberMessages.PickleStepArgument.PickleTable.PickleTableRow.decode!(
                      delimited
                    )

                  field = {:rows, msg.rows() ++ List.wrap(value)}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
            {:rows, :unpacked,
             {:message, CucumberMessages.PickleStepArgument.PickleTable.PickleTableRow}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          rows:
            {1, :unpacked,
             {:message, CucumberMessages.PickleStepArgument.PickleTable.PickleTableRow}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:rows)) do
            {:error, :no_default_value}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.GherkinDocument.Feature.Background) do
    @moduledoc false
    (
      defstruct(
        location: nil,
        keyword: "",
        name: "",
        description: "",
        steps: [],
        id: "",
        __uf__: []
      )

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
          |> encode_keyword(msg)
          |> encode_name(msg)
          |> encode_description(msg)
          |> encode_steps(msg)
          |> encode_id(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_location(acc, msg)) do
            field_value = msg.location()

            if(field_value == nil) do
              acc
            else
              [acc, "\n", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_keyword(acc, msg)) do
            field_value = msg.keyword()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_name(acc, msg)) do
            field_value = msg.name()

            if(field_value == "") do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_description(acc, msg)) do
            field_value = msg.description()

            if(field_value == "") do
              acc
            else
              [acc, "\"", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_steps(acc, msg)) do
            case(msg.steps()) do
              [] ->
                acc

              values ->
                [
                  acc,
                  Enum.reduce(values, [], fn value, acc ->
                    [acc, "*", Protox.Encode.encode_message(value)]
                  end)
                ]
            end
          end,
          defp(encode_id(acc, msg)) do
            field_value = msg.id()

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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.GherkinDocument.Feature.Background))
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
                  value = CucumberMessages.Location.decode!(delimited)
                  field = {:location, Protox.Message.merge(msg.location(), value)}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:keyword, value}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:name, value}
                  {field, rest}

                {4, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:description, value}
                  {field, rest}

                {5, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.GherkinDocument.Feature.Step.decode!(delimited)
                  field = {:steps, msg.steps() ++ List.wrap(value)}
                  {field, rest}

                {6, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:id, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:location, {:default, nil}, {:message, CucumberMessages.Location}},
          2 => {:keyword, {:default, ""}, :string},
          3 => {:name, {:default, ""}, :string},
          4 => {:description, {:default, ""}, :string},
          5 => {:steps, :unpacked, {:message, CucumberMessages.GherkinDocument.Feature.Step}},
          6 => {:id, {:default, ""}, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          description: {4, {:default, ""}, :string},
          id: {6, {:default, ""}, :string},
          keyword: {2, {:default, ""}, :string},
          location: {1, {:default, nil}, {:message, CucumberMessages.Location}},
          name: {3, {:default, ""}, :string},
          steps: {5, :unpacked, {:message, CucumberMessages.GherkinDocument.Feature.Step}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:location)) do
            {:ok, nil}
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
          def(default(:steps)) do
            {:error, :no_default_value}
          end,
          def(default(:id)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.TestStepStarted) do
    @moduledoc false
    (
      defstruct(timestamp: nil, test_step_id: "", test_case_started_id: "", __uf__: [])

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
          |> encode_timestamp(msg)
          |> encode_test_step_id(msg)
          |> encode_test_case_started_id(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_timestamp(acc, msg)) do
            field_value = msg.timestamp()

            if(field_value == nil) do
              acc
            else
              [acc, "\n", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_test_step_id(acc, msg)) do
            field_value = msg.test_step_id()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_test_case_started_id(acc, msg)) do
            field_value = msg.test_case_started_id()

            if(field_value == "") do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.TestStepStarted))
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
                  value = CucumberMessages.Timestamp.decode!(delimited)
                  field = {:timestamp, Protox.Message.merge(msg.timestamp(), value)}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:test_step_id, value}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:test_case_started_id, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:timestamp, {:default, nil}, {:message, CucumberMessages.Timestamp}},
          2 => {:test_step_id, {:default, ""}, :string},
          3 => {:test_case_started_id, {:default, ""}, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          test_case_started_id: {3, {:default, ""}, :string},
          test_step_id: {2, {:default, ""}, :string},
          timestamp: {1, {:default, nil}, {:message, CucumberMessages.Timestamp}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:timestamp)) do
            {:ok, nil}
          end,
          def(default(:test_step_id)) do
            {:ok, ""}
          end,
          def(default(:test_case_started_id)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.Attachment) do
    @moduledoc false
    (
      defstruct(
        source: nil,
        test_step_id: "",
        test_case_started_id: "",
        body: "",
        media_type: "",
        content_encoding: :IDENTITY,
        __uf__: []
      )

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
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_source(acc, msg)) do
            field_value = msg.source()

            if(field_value == nil) do
              acc
            else
              [acc, "\n", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_test_step_id(acc, msg)) do
            field_value = msg.test_step_id()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_test_case_started_id(acc, msg)) do
            field_value = msg.test_case_started_id()

            if(field_value == "") do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_body(acc, msg)) do
            field_value = msg.body()

            if(field_value == "") do
              acc
            else
              [acc, "\"", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_media_type(acc, msg)) do
            field_value = msg.media_type()

            if(field_value == "") do
              acc
            else
              [acc, "*", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_content_encoding(acc, msg)) do
            field_value = msg.content_encoding()

            if(field_value == :IDENTITY) do
              acc
            else
              [
                acc,
                "0",
                field_value
                |> CucumberMessages.Attachment.ContentEncoding.encode()
                |> Protox.Encode.encode_enum()
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.Attachment))
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
                  value = CucumberMessages.SourceReference.decode!(delimited)
                  field = {:source, Protox.Message.merge(msg.source(), value)}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:test_step_id, value}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:test_case_started_id, value}
                  {field, rest}

                {4, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:body, value}
                  {field, rest}

                {5, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:media_type, value}
                  {field, rest}

                {6, _, bytes} ->
                  {value, rest} =
                    Protox.Decode.parse_enum(bytes, CucumberMessages.Attachment.ContentEncoding)

                  field = {:content_encoding, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:source, {:default, nil}, {:message, CucumberMessages.SourceReference}},
          2 => {:test_step_id, {:default, ""}, :string},
          3 => {:test_case_started_id, {:default, ""}, :string},
          4 => {:body, {:default, ""}, :string},
          5 => {:media_type, {:default, ""}, :string},
          6 =>
            {:content_encoding, {:default, :IDENTITY},
             {:enum, CucumberMessages.Attachment.ContentEncoding}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          body: {4, {:default, ""}, :string},
          content_encoding:
            {6, {:default, :IDENTITY}, {:enum, CucumberMessages.Attachment.ContentEncoding}},
          media_type: {5, {:default, ""}, :string},
          source: {1, {:default, nil}, {:message, CucumberMessages.SourceReference}},
          test_case_started_id: {3, {:default, ""}, :string},
          test_step_id: {2, {:default, ""}, :string}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
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
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.ParameterType) do
    @moduledoc false
    (
      defstruct(
        name: "",
        regular_expressions: [],
        prefer_for_regular_expression_match: false,
        use_for_snippets: false,
        id: "",
        __uf__: []
      )

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
          |> encode_name(msg)
          |> encode_regular_expressions(msg)
          |> encode_prefer_for_regular_expression_match(msg)
          |> encode_use_for_snippets(msg)
          |> encode_id(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_name(acc, msg)) do
            field_value = msg.name()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_regular_expressions(acc, msg)) do
            case(msg.regular_expressions()) do
              [] ->
                acc

              values ->
                [
                  acc,
                  Enum.reduce(values, [], fn value, acc ->
                    [acc, <<18>>, Protox.Encode.encode_string(value)]
                  end)
                ]
            end
          end,
          defp(encode_prefer_for_regular_expression_match(acc, msg)) do
            field_value = msg.prefer_for_regular_expression_match()

            if(field_value == false) do
              acc
            else
              [acc, <<24>>, Protox.Encode.encode_bool(field_value)]
            end
          end,
          defp(encode_use_for_snippets(acc, msg)) do
            field_value = msg.use_for_snippets()

            if(field_value == false) do
              acc
            else
              [acc, " ", Protox.Encode.encode_bool(field_value)]
            end
          end,
          defp(encode_id(acc, msg)) do
            field_value = msg.id()

            if(field_value == "") do
              acc
            else
              [acc, "*", Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.ParameterType))
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
                  field = {:name, value}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:regular_expressions, msg.regular_expressions() ++ List.wrap(value)}
                  {field, rest}

                {3, _, bytes} ->
                  {value, rest} = Protox.Decode.parse_bool(bytes)
                  field = {:prefer_for_regular_expression_match, value}
                  {field, rest}

                {4, _, bytes} ->
                  {value, rest} = Protox.Decode.parse_bool(bytes)
                  field = {:use_for_snippets, value}
                  {field, rest}

                {5, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:id, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:name, {:default, ""}, :string},
          2 => {:regular_expressions, :unpacked, :string},
          3 => {:prefer_for_regular_expression_match, {:default, false}, :bool},
          4 => {:use_for_snippets, {:default, false}, :bool},
          5 => {:id, {:default, ""}, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          id: {5, {:default, ""}, :string},
          name: {1, {:default, ""}, :string},
          prefer_for_regular_expression_match: {3, {:default, false}, :bool},
          regular_expressions: {2, :unpacked, :string},
          use_for_snippets: {4, {:default, false}, :bool}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:name)) do
            {:ok, ""}
          end,
          def(default(:regular_expressions)) do
            {:error, :no_default_value}
          end,
          def(default(:prefer_for_regular_expression_match)) do
            {:ok, false}
          end,
          def(default(:use_for_snippets)) do
            {:ok, false}
          end,
          def(default(:id)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.Pickle.PickleStep) do
    @moduledoc false
    (
      defstruct(text: "", argument: nil, id: "", ast_node_ids: [], __uf__: [])

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
          |> encode_text(msg)
          |> encode_argument(msg)
          |> encode_id(msg)
          |> encode_ast_node_ids(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_text(acc, msg)) do
            field_value = msg.text()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_argument(acc, msg)) do
            field_value = msg.argument()

            if(field_value == nil) do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_id(acc, msg)) do
            field_value = msg.id()

            if(field_value == "") do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_ast_node_ids(acc, msg)) do
            case(msg.ast_node_ids()) do
              [] ->
                acc

              values ->
                [
                  acc,
                  Enum.reduce(values, [], fn value, acc ->
                    [acc, "\"", Protox.Encode.encode_string(value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.Pickle.PickleStep))
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
                  field = {:text, value}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.PickleStepArgument.decode!(delimited)
                  field = {:argument, Protox.Message.merge(msg.argument(), value)}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:id, value}
                  {field, rest}

                {4, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:ast_node_ids, msg.ast_node_ids() ++ List.wrap(value)}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:text, {:default, ""}, :string},
          2 => {:argument, {:default, nil}, {:message, CucumberMessages.PickleStepArgument}},
          3 => {:id, {:default, ""}, :string},
          4 => {:ast_node_ids, :unpacked, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          argument: {2, {:default, nil}, {:message, CucumberMessages.PickleStepArgument}},
          ast_node_ids: {4, :unpacked, :string},
          id: {3, {:default, ""}, :string},
          text: {1, {:default, ""}, :string}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:text)) do
            {:ok, ""}
          end,
          def(default(:argument)) do
            {:ok, nil}
          end,
          def(default(:id)) do
            {:ok, ""}
          end,
          def(default(:ast_node_ids)) do
            {:error, :no_default_value}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.TestCaseFinished) do
    @moduledoc false
    (
      defstruct(timestamp: nil, test_case_started_id: "", __uf__: [])

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
          |> encode_timestamp(msg)
          |> encode_test_case_started_id(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_timestamp(acc, msg)) do
            field_value = msg.timestamp()

            if(field_value == nil) do
              acc
            else
              [acc, "\n", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_test_case_started_id(acc, msg)) do
            field_value = msg.test_case_started_id()

            if(field_value == "") do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.TestCaseFinished))
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
                  value = CucumberMessages.Timestamp.decode!(delimited)
                  field = {:timestamp, Protox.Message.merge(msg.timestamp(), value)}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:test_case_started_id, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:timestamp, {:default, nil}, {:message, CucumberMessages.Timestamp}},
          3 => {:test_case_started_id, {:default, ""}, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          test_case_started_id: {3, {:default, ""}, :string},
          timestamp: {1, {:default, nil}, {:message, CucumberMessages.Timestamp}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:timestamp)) do
            {:ok, nil}
          end,
          def(default(:test_case_started_id)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.GherkinDocument) do
    @moduledoc false
    (
      defstruct(uri: "", feature: nil, comments: [], __uf__: [])

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

        []

        [
          defp(encode_uri(acc, msg)) do
            field_value = msg.uri()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_feature(acc, msg)) do
            field_value = msg.feature()

            if(field_value == nil) do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_comments(acc, msg)) do
            case(msg.comments()) do
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.GherkinDocument))
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
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.GherkinDocument.Feature.decode!(delimited)
                  field = {:feature, Protox.Message.merge(msg.feature(), value)}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.GherkinDocument.Comment.decode!(delimited)
                  field = {:comments, msg.comments() ++ List.wrap(value)}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          2 => {:feature, {:default, nil}, {:message, CucumberMessages.GherkinDocument.Feature}},
          3 => {:comments, :unpacked, {:message, CucumberMessages.GherkinDocument.Comment}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          comments: {3, :unpacked, {:message, CucumberMessages.GherkinDocument.Comment}},
          feature: {2, {:default, nil}, {:message, CucumberMessages.GherkinDocument.Feature}},
          uri: {1, {:default, ""}, :string}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:uri)) do
            {:ok, ""}
          end,
          def(default(:feature)) do
            {:ok, nil}
          end,
          def(default(:comments)) do
            {:error, :no_default_value}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.Hook) do
    @moduledoc false
    (
      defstruct(id: "", tag_expression: "", source_reference: nil, __uf__: [])

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
          |> encode_id(msg)
          |> encode_tag_expression(msg)
          |> encode_source_reference(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_id(acc, msg)) do
            field_value = msg.id()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_tag_expression(acc, msg)) do
            field_value = msg.tag_expression()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_source_reference(acc, msg)) do
            field_value = msg.source_reference()

            if(field_value == nil) do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_message(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.Hook))
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
                  field = {:id, value}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:tag_expression, value}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.SourceReference.decode!(delimited)
                  field = {:source_reference, Protox.Message.merge(msg.source_reference(), value)}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:id, {:default, ""}, :string},
          2 => {:tag_expression, {:default, ""}, :string},
          3 => {:source_reference, {:default, nil}, {:message, CucumberMessages.SourceReference}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          id: {1, {:default, ""}, :string},
          source_reference: {3, {:default, nil}, {:message, CucumberMessages.SourceReference}},
          tag_expression: {2, {:default, ""}, :string}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:id)) do
            {:ok, ""}
          end,
          def(default(:tag_expression)) do
            {:ok, ""}
          end,
          def(default(:source_reference)) do
            {:ok, nil}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.Pickle) do
    @moduledoc false
    (
      defstruct(
        id: "",
        uri: "",
        name: "",
        language: "",
        steps: [],
        tags: [],
        ast_node_ids: [],
        __uf__: []
      )

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
          |> encode_id(msg)
          |> encode_uri(msg)
          |> encode_name(msg)
          |> encode_language(msg)
          |> encode_steps(msg)
          |> encode_tags(msg)
          |> encode_ast_node_ids(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_id(acc, msg)) do
            field_value = msg.id()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_uri(acc, msg)) do
            field_value = msg.uri()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_name(acc, msg)) do
            field_value = msg.name()

            if(field_value == "") do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_language(acc, msg)) do
            field_value = msg.language()

            if(field_value == "") do
              acc
            else
              [acc, "\"", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_steps(acc, msg)) do
            case(msg.steps()) do
              [] ->
                acc

              values ->
                [
                  acc,
                  Enum.reduce(values, [], fn value, acc ->
                    [acc, "*", Protox.Encode.encode_message(value)]
                  end)
                ]
            end
          end,
          defp(encode_tags(acc, msg)) do
            case(msg.tags()) do
              [] ->
                acc

              values ->
                [
                  acc,
                  Enum.reduce(values, [], fn value, acc ->
                    [acc, "2", Protox.Encode.encode_message(value)]
                  end)
                ]
            end
          end,
          defp(encode_ast_node_ids(acc, msg)) do
            case(msg.ast_node_ids()) do
              [] ->
                acc

              values ->
                [
                  acc,
                  Enum.reduce(values, [], fn value, acc ->
                    [acc, ":", Protox.Encode.encode_string(value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.Pickle))
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
                  field = {:id, value}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:uri, value}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:name, value}
                  {field, rest}

                {4, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:language, value}
                  {field, rest}

                {5, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.Pickle.PickleStep.decode!(delimited)
                  field = {:steps, msg.steps() ++ List.wrap(value)}
                  {field, rest}

                {6, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.Pickle.PickleTag.decode!(delimited)
                  field = {:tags, msg.tags() ++ List.wrap(value)}
                  {field, rest}

                {7, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:ast_node_ids, msg.ast_node_ids() ++ List.wrap(value)}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:id, {:default, ""}, :string},
          2 => {:uri, {:default, ""}, :string},
          3 => {:name, {:default, ""}, :string},
          4 => {:language, {:default, ""}, :string},
          5 => {:steps, :unpacked, {:message, CucumberMessages.Pickle.PickleStep}},
          6 => {:tags, :unpacked, {:message, CucumberMessages.Pickle.PickleTag}},
          7 => {:ast_node_ids, :unpacked, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          ast_node_ids: {7, :unpacked, :string},
          id: {1, {:default, ""}, :string},
          language: {4, {:default, ""}, :string},
          name: {3, {:default, ""}, :string},
          steps: {5, :unpacked, {:message, CucumberMessages.Pickle.PickleStep}},
          tags: {6, :unpacked, {:message, CucumberMessages.Pickle.PickleTag}},
          uri: {2, {:default, ""}, :string}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:id)) do
            {:ok, ""}
          end,
          def(default(:uri)) do
            {:ok, ""}
          end,
          def(default(:name)) do
            {:ok, ""}
          end,
          def(default(:language)) do
            {:ok, ""}
          end,
          def(default(:steps)) do
            {:error, :no_default_value}
          end,
          def(default(:tags)) do
            {:error, :no_default_value}
          end,
          def(default(:ast_node_ids)) do
            {:error, :no_default_value}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.Location) do
    @moduledoc false
    (
      defstruct(line: 0, column: 0, __uf__: [])

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

        []

        [
          defp(encode_line(acc, msg)) do
            field_value = msg.line()

            if(field_value == 0) do
              acc
            else
              [acc, "\b", Protox.Encode.encode_uint32(field_value)]
            end
          end,
          defp(encode_column(acc, msg)) do
            field_value = msg.column()

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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.Location))
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
                  {field, rest}

                {2, _, bytes} ->
                  {value, rest} = Protox.Decode.parse_uint32(bytes)
                  field = {:column, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:line)) do
            {:ok, 0}
          end,
          def(default(:column)) do
            {:ok, 0}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.Meta.Product) do
    @moduledoc false
    (
      defstruct(name: "", version: "", __uf__: [])

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
          [] |> encode_name(msg) |> encode_version(msg) |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_name(acc, msg)) do
            field_value = msg.name()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_version(acc, msg)) do
            field_value = msg.version()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.Meta.Product))
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
                  field = {:name, value}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:version, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
            parse_key_value(rest, msg_updated)
          end
        )

        []
      )

      @spec defs() :: %{
              required(non_neg_integer) => {atom, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs()) do
        %{1 => {:name, {:default, ""}, :string}, 2 => {:version, {:default, ""}, :string}}
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{name: {1, {:default, ""}, :string}, version: {2, {:default, ""}, :string}}
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:name)) do
            {:ok, ""}
          end,
          def(default(:version)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.StepDefinition) do
    @moduledoc false
    (
      defstruct(id: "", pattern: nil, source_reference: nil, __uf__: [])

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
          |> encode_id(msg)
          |> encode_pattern(msg)
          |> encode_source_reference(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_id(acc, msg)) do
            field_value = msg.id()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_pattern(acc, msg)) do
            field_value = msg.pattern()

            if(field_value == nil) do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_source_reference(acc, msg)) do
            field_value = msg.source_reference()

            if(field_value == nil) do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_message(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.StepDefinition))
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
                  field = {:id, value}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.StepDefinition.StepDefinitionPattern.decode!(delimited)
                  field = {:pattern, Protox.Message.merge(msg.pattern(), value)}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.SourceReference.decode!(delimited)
                  field = {:source_reference, Protox.Message.merge(msg.source_reference(), value)}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:id, {:default, ""}, :string},
          2 =>
            {:pattern, {:default, nil},
             {:message, CucumberMessages.StepDefinition.StepDefinitionPattern}},
          3 => {:source_reference, {:default, nil}, {:message, CucumberMessages.SourceReference}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          id: {1, {:default, ""}, :string},
          pattern:
            {2, {:default, nil},
             {:message, CucumberMessages.StepDefinition.StepDefinitionPattern}},
          source_reference: {3, {:default, nil}, {:message, CucumberMessages.SourceReference}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:id)) do
            {:ok, ""}
          end,
          def(default(:pattern)) do
            {:ok, nil}
          end,
          def(default(:source_reference)) do
            {:ok, nil}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument) do
    @moduledoc false
    (
      defstruct(parameter_type_name: "", group: nil, __uf__: [])

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
          [] |> encode_parameter_type_name(msg) |> encode_group(msg) |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_parameter_type_name(acc, msg)) do
            field_value = msg.parameter_type_name()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_group(acc, msg)) do
            field_value = msg.group()

            if(field_value == nil) do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_message(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(
              bytes,
              struct(CucumberMessages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument)
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
                  value = delimited
                  field = {:parameter_type_name, value}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes

                  value =
                    CucumberMessages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument.Group.decode!(
                      delimited
                    )

                  field = {:group, Protox.Message.merge(msg.group(), value)}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:parameter_type_name, {:default, ""}, :string},
          2 =>
            {:group, {:default, nil},
             {:message,
              CucumberMessages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument.Group}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          group:
            {2, {:default, nil},
             {:message,
              CucumberMessages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument.Group}},
          parameter_type_name: {1, {:default, ""}, :string}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:parameter_type_name)) do
            {:ok, ""}
          end,
          def(default(:group)) do
            {:ok, nil}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.TestCase) do
    @moduledoc false
    (
      defstruct(id: "", pickle_id: "", test_steps: [], __uf__: [])

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
          |> encode_id(msg)
          |> encode_pickle_id(msg)
          |> encode_test_steps(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_id(acc, msg)) do
            field_value = msg.id()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_pickle_id(acc, msg)) do
            field_value = msg.pickle_id()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_test_steps(acc, msg)) do
            case(msg.test_steps()) do
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.TestCase))
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
                  field = {:id, value}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:pickle_id, value}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.TestCase.TestStep.decode!(delimited)
                  field = {:test_steps, msg.test_steps() ++ List.wrap(value)}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:id, {:default, ""}, :string},
          2 => {:pickle_id, {:default, ""}, :string},
          3 => {:test_steps, :unpacked, {:message, CucumberMessages.TestCase.TestStep}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          id: {1, {:default, ""}, :string},
          pickle_id: {2, {:default, ""}, :string},
          test_steps: {3, :unpacked, {:message, CucumberMessages.TestCase.TestStep}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:id)) do
            {:ok, ""}
          end,
          def(default(:pickle_id)) do
            {:ok, ""}
          end,
          def(default(:test_steps)) do
            {:error, :no_default_value}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.GherkinDocument.Feature.Step.DataTable) do
    @moduledoc false
    (
      defstruct(location: nil, rows: [], __uf__: [])

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
          [] |> encode_location(msg) |> encode_rows(msg) |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_location(acc, msg)) do
            field_value = msg.location()

            if(field_value == nil) do
              acc
            else
              [acc, "\n", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_rows(acc, msg)) do
            case(msg.rows()) do
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(
              bytes,
              struct(CucumberMessages.GherkinDocument.Feature.Step.DataTable)
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
                  value = CucumberMessages.Location.decode!(delimited)
                  field = {:location, Protox.Message.merge(msg.location(), value)}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.GherkinDocument.Feature.TableRow.decode!(delimited)
                  field = {:rows, msg.rows() ++ List.wrap(value)}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:location, {:default, nil}, {:message, CucumberMessages.Location}},
          2 => {:rows, :unpacked, {:message, CucumberMessages.GherkinDocument.Feature.TableRow}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          location: {1, {:default, nil}, {:message, CucumberMessages.Location}},
          rows: {2, :unpacked, {:message, CucumberMessages.GherkinDocument.Feature.TableRow}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:location)) do
            {:ok, nil}
          end,
          def(default(:rows)) do
            {:error, :no_default_value}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.SourceReference) do
    @moduledoc false
    (
      defstruct(uri: "", location: nil, __uf__: [])

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
          [] |> encode_uri(msg) |> encode_location(msg) |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_uri(acc, msg)) do
            field_value = msg.uri()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_location(acc, msg)) do
            field_value = msg.location()

            if(field_value == nil) do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_message(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.SourceReference))
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
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.Location.decode!(delimited)
                  field = {:location, Protox.Message.merge(msg.location(), value)}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          2 => {:location, {:default, nil}, {:message, CucumberMessages.Location}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          location: {2, {:default, nil}, {:message, CucumberMessages.Location}},
          uri: {1, {:default, ""}, :string}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:uri)) do
            {:ok, ""}
          end,
          def(default(:location)) do
            {:ok, nil}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.GherkinDocument.Feature.Step) do
    @moduledoc false
    (
      defstruct(location: nil, keyword: "", text: "", argument: nil, id: "", __uf__: [])

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

        [
          defp(encode_argument(acc, msg)) do
            case(msg.argument()) do
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
            field_value = msg.location()

            if(field_value == nil) do
              acc
            else
              [acc, "\n", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_keyword(acc, msg)) do
            field_value = msg.keyword()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_text(acc, msg)) do
            field_value = msg.text()

            if(field_value == "") do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_doc_string(acc, msg)) do
            {_, field_value} = msg.argument()
            [acc, "\"", Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_data_table(acc, msg)) do
            {_, field_value} = msg.argument()
            [acc, "*", Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_id(acc, msg)) do
            field_value = msg.id()

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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.GherkinDocument.Feature.Step))
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
                  value = CucumberMessages.Location.decode!(delimited)
                  field = {:location, Protox.Message.merge(msg.location(), value)}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:keyword, value}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:text, value}
                  {field, rest}

                {4, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes

                  value =
                    CucumberMessages.GherkinDocument.Feature.Step.DocString.decode!(delimited)

                  field =
                    case(msg.argument()) do
                      {:doc_string, previous_value} ->
                        {:argument, {:doc_string, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:argument, {:doc_string, value}}
                    end

                  {field, rest}

                {5, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes

                  value =
                    CucumberMessages.GherkinDocument.Feature.Step.DataTable.decode!(delimited)

                  field =
                    case(msg.argument()) do
                      {:data_table, previous_value} ->
                        {:argument, {:data_table, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:argument, {:data_table, value}}
                    end

                  {field, rest}

                {6, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:id, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:location, {:default, nil}, {:message, CucumberMessages.Location}},
          2 => {:keyword, {:default, ""}, :string},
          3 => {:text, {:default, ""}, :string},
          4 =>
            {:doc_string, {:oneof, :argument},
             {:message, CucumberMessages.GherkinDocument.Feature.Step.DocString}},
          5 =>
            {:data_table, {:oneof, :argument},
             {:message, CucumberMessages.GherkinDocument.Feature.Step.DataTable}},
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
             {:message, CucumberMessages.GherkinDocument.Feature.Step.DataTable}},
          doc_string:
            {4, {:oneof, :argument},
             {:message, CucumberMessages.GherkinDocument.Feature.Step.DocString}},
          id: {6, {:default, ""}, :string},
          keyword: {2, {:default, ""}, :string},
          location: {1, {:default, nil}, {:message, CucumberMessages.Location}},
          text: {3, {:default, ""}, :string}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
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
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.TestCaseStarted) do
    @moduledoc false
    (
      defstruct(timestamp: nil, attempt: 0, test_case_id: "", id: "", __uf__: [])

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
          |> encode_timestamp(msg)
          |> encode_attempt(msg)
          |> encode_test_case_id(msg)
          |> encode_id(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_timestamp(acc, msg)) do
            field_value = msg.timestamp()

            if(field_value == nil) do
              acc
            else
              [acc, "\n", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_attempt(acc, msg)) do
            field_value = msg.attempt()

            if(field_value == 0) do
              acc
            else
              [acc, <<24>>, Protox.Encode.encode_uint32(field_value)]
            end
          end,
          defp(encode_test_case_id(acc, msg)) do
            field_value = msg.test_case_id()

            if(field_value == "") do
              acc
            else
              [acc, "\"", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_id(acc, msg)) do
            field_value = msg.id()

            if(field_value == "") do
              acc
            else
              [acc, "*", Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.TestCaseStarted))
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
                  value = CucumberMessages.Timestamp.decode!(delimited)
                  field = {:timestamp, Protox.Message.merge(msg.timestamp(), value)}
                  {field, rest}

                {3, _, bytes} ->
                  {value, rest} = Protox.Decode.parse_uint32(bytes)
                  field = {:attempt, value}
                  {field, rest}

                {4, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:test_case_id, value}
                  {field, rest}

                {5, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:id, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:timestamp, {:default, nil}, {:message, CucumberMessages.Timestamp}},
          3 => {:attempt, {:default, 0}, :uint32},
          4 => {:test_case_id, {:default, ""}, :string},
          5 => {:id, {:default, ""}, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          attempt: {3, {:default, 0}, :uint32},
          id: {5, {:default, ""}, :string},
          test_case_id: {4, {:default, ""}, :string},
          timestamp: {1, {:default, nil}, {:message, CucumberMessages.Timestamp}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:timestamp)) do
            {:ok, nil}
          end,
          def(default(:attempt)) do
            {:ok, 0}
          end,
          def(default(:test_case_id)) do
            {:ok, ""}
          end,
          def(default(:id)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.TestStepFinished.TestStepResult) do
    @moduledoc false
    (
      defstruct(status: :UNKNOWN, message: "", duration: nil, will_be_retried: false, __uf__: [])

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
          |> encode_status(msg)
          |> encode_message(msg)
          |> encode_duration(msg)
          |> encode_will_be_retried(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_status(acc, msg)) do
            field_value = msg.status()

            if(field_value == :UNKNOWN) do
              acc
            else
              [
                acc,
                "\b",
                field_value
                |> CucumberMessages.TestStepFinished.TestStepResult.Status.encode()
                |> Protox.Encode.encode_enum()
              ]
            end
          end,
          defp(encode_message(acc, msg)) do
            field_value = msg.message()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_duration(acc, msg)) do
            field_value = msg.duration()

            if(field_value == nil) do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_will_be_retried(acc, msg)) do
            field_value = msg.will_be_retried()

            if(field_value == false) do
              acc
            else
              [acc, " ", Protox.Encode.encode_bool(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.TestStepFinished.TestStepResult))
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
                  {value, rest} =
                    Protox.Decode.parse_enum(
                      bytes,
                      CucumberMessages.TestStepFinished.TestStepResult.Status
                    )

                  field = {:status, value}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:message, value}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.Duration.decode!(delimited)
                  field = {:duration, Protox.Message.merge(msg.duration(), value)}
                  {field, rest}

                {4, _, bytes} ->
                  {value, rest} = Protox.Decode.parse_bool(bytes)
                  field = {:will_be_retried, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
            {:status, {:default, :UNKNOWN},
             {:enum, CucumberMessages.TestStepFinished.TestStepResult.Status}},
          2 => {:message, {:default, ""}, :string},
          3 => {:duration, {:default, nil}, {:message, CucumberMessages.Duration}},
          4 => {:will_be_retried, {:default, false}, :bool}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          duration: {3, {:default, nil}, {:message, CucumberMessages.Duration}},
          message: {2, {:default, ""}, :string},
          status:
            {1, {:default, :UNKNOWN},
             {:enum, CucumberMessages.TestStepFinished.TestStepResult.Status}},
          will_be_retried: {4, {:default, false}, :bool}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:status)) do
            {:ok, :UNKNOWN}
          end,
          def(default(:message)) do
            {:ok, ""}
          end,
          def(default(:duration)) do
            {:ok, nil}
          end,
          def(default(:will_be_retried)) do
            {:ok, false}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.Envelope) do
    @moduledoc false
    (
      defstruct(message: nil, __uf__: [])

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
          [] |> encode_message(msg) |> encode_unknown_fields(msg)
        end

        [
          defp(encode_message(acc, msg)) do
            case(msg.message()) do
              nil ->
                acc

              {:source, _field_value} ->
                encode_source(acc, msg)

              {:gherkin_document, _field_value} ->
                encode_gherkin_document(acc, msg)

              {:pickle, _field_value} ->
                encode_pickle(acc, msg)

              {:step_definition, _field_value} ->
                encode_step_definition(acc, msg)

              {:hook, _field_value} ->
                encode_hook(acc, msg)

              {:parameter_type, _field_value} ->
                encode_parameter_type(acc, msg)

              {:test_case, _field_value} ->
                encode_test_case(acc, msg)

              {:undefined_parameter_type, _field_value} ->
                encode_undefined_parameter_type(acc, msg)

              {:test_run_started, _field_value} ->
                encode_test_run_started(acc, msg)

              {:test_case_started, _field_value} ->
                encode_test_case_started(acc, msg)

              {:test_step_started, _field_value} ->
                encode_test_step_started(acc, msg)

              {:attachment, _field_value} ->
                encode_attachment(acc, msg)

              {:test_step_finished, _field_value} ->
                encode_test_step_finished(acc, msg)

              {:test_case_finished, _field_value} ->
                encode_test_case_finished(acc, msg)

              {:test_run_finished, _field_value} ->
                encode_test_run_finished(acc, msg)

              {:parse_error, _field_value} ->
                encode_parse_error(acc, msg)

              {:meta, _field_value} ->
                encode_meta(acc, msg)
            end
          end
        ]

        [
          defp(encode_source(acc, msg)) do
            {_, field_value} = msg.message()
            [acc, "\n", Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_gherkin_document(acc, msg)) do
            {_, field_value} = msg.message()
            [acc, <<18>>, Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_pickle(acc, msg)) do
            {_, field_value} = msg.message()
            [acc, <<26>>, Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_step_definition(acc, msg)) do
            {_, field_value} = msg.message()
            [acc, "\"", Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_hook(acc, msg)) do
            {_, field_value} = msg.message()
            [acc, "*", Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_parameter_type(acc, msg)) do
            {_, field_value} = msg.message()
            [acc, "2", Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_test_case(acc, msg)) do
            {_, field_value} = msg.message()
            [acc, ":", Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_undefined_parameter_type(acc, msg)) do
            {_, field_value} = msg.message()
            [acc, "B", Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_test_run_started(acc, msg)) do
            {_, field_value} = msg.message()
            [acc, "J", Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_test_case_started(acc, msg)) do
            {_, field_value} = msg.message()
            [acc, "R", Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_test_step_started(acc, msg)) do
            {_, field_value} = msg.message()
            [acc, "Z", Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_attachment(acc, msg)) do
            {_, field_value} = msg.message()
            [acc, "b", Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_test_step_finished(acc, msg)) do
            {_, field_value} = msg.message()
            [acc, "j", Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_test_case_finished(acc, msg)) do
            {_, field_value} = msg.message()
            [acc, "r", Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_test_run_finished(acc, msg)) do
            {_, field_value} = msg.message()
            [acc, "z", Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_parse_error(acc, msg)) do
            {_, field_value} = msg.message()
            [acc, [<<130>>, <<1>>], Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_meta(acc, msg)) do
            {_, field_value} = msg.message()
            [acc, [<<138>>, <<1>>], Protox.Encode.encode_message(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.Envelope))
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
                  value = CucumberMessages.Source.decode!(delimited)

                  field =
                    case(msg.message()) do
                      {:source, previous_value} ->
                        {:message, {:source, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:message, {:source, value}}
                    end

                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.GherkinDocument.decode!(delimited)

                  field =
                    case(msg.message()) do
                      {:gherkin_document, previous_value} ->
                        {:message,
                         {:gherkin_document, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:message, {:gherkin_document, value}}
                    end

                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.Pickle.decode!(delimited)

                  field =
                    case(msg.message()) do
                      {:pickle, previous_value} ->
                        {:message, {:pickle, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:message, {:pickle, value}}
                    end

                  {field, rest}

                {4, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.StepDefinition.decode!(delimited)

                  field =
                    case(msg.message()) do
                      {:step_definition, previous_value} ->
                        {:message,
                         {:step_definition, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:message, {:step_definition, value}}
                    end

                  {field, rest}

                {5, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.Hook.decode!(delimited)

                  field =
                    case(msg.message()) do
                      {:hook, previous_value} ->
                        {:message, {:hook, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:message, {:hook, value}}
                    end

                  {field, rest}

                {6, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.ParameterType.decode!(delimited)

                  field =
                    case(msg.message()) do
                      {:parameter_type, previous_value} ->
                        {:message, {:parameter_type, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:message, {:parameter_type, value}}
                    end

                  {field, rest}

                {7, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.TestCase.decode!(delimited)

                  field =
                    case(msg.message()) do
                      {:test_case, previous_value} ->
                        {:message, {:test_case, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:message, {:test_case, value}}
                    end

                  {field, rest}

                {8, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.UndefinedParameterType.decode!(delimited)

                  field =
                    case(msg.message()) do
                      {:undefined_parameter_type, previous_value} ->
                        {:message,
                         {:undefined_parameter_type, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:message, {:undefined_parameter_type, value}}
                    end

                  {field, rest}

                {9, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.TestRunStarted.decode!(delimited)

                  field =
                    case(msg.message()) do
                      {:test_run_started, previous_value} ->
                        {:message,
                         {:test_run_started, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:message, {:test_run_started, value}}
                    end

                  {field, rest}

                {10, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.TestCaseStarted.decode!(delimited)

                  field =
                    case(msg.message()) do
                      {:test_case_started, previous_value} ->
                        {:message,
                         {:test_case_started, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:message, {:test_case_started, value}}
                    end

                  {field, rest}

                {11, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.TestStepStarted.decode!(delimited)

                  field =
                    case(msg.message()) do
                      {:test_step_started, previous_value} ->
                        {:message,
                         {:test_step_started, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:message, {:test_step_started, value}}
                    end

                  {field, rest}

                {12, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.Attachment.decode!(delimited)

                  field =
                    case(msg.message()) do
                      {:attachment, previous_value} ->
                        {:message, {:attachment, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:message, {:attachment, value}}
                    end

                  {field, rest}

                {13, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.TestStepFinished.decode!(delimited)

                  field =
                    case(msg.message()) do
                      {:test_step_finished, previous_value} ->
                        {:message,
                         {:test_step_finished, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:message, {:test_step_finished, value}}
                    end

                  {field, rest}

                {14, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.TestCaseFinished.decode!(delimited)

                  field =
                    case(msg.message()) do
                      {:test_case_finished, previous_value} ->
                        {:message,
                         {:test_case_finished, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:message, {:test_case_finished, value}}
                    end

                  {field, rest}

                {15, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.TestRunFinished.decode!(delimited)

                  field =
                    case(msg.message()) do
                      {:test_run_finished, previous_value} ->
                        {:message,
                         {:test_run_finished, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:message, {:test_run_finished, value}}
                    end

                  {field, rest}

                {16, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.ParseError.decode!(delimited)

                  field =
                    case(msg.message()) do
                      {:parse_error, previous_value} ->
                        {:message, {:parse_error, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:message, {:parse_error, value}}
                    end

                  {field, rest}

                {17, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.Meta.decode!(delimited)

                  field =
                    case(msg.message()) do
                      {:meta, previous_value} ->
                        {:message, {:meta, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:message, {:meta, value}}
                    end

                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:source, {:oneof, :message}, {:message, CucumberMessages.Source}},
          2 =>
            {:gherkin_document, {:oneof, :message}, {:message, CucumberMessages.GherkinDocument}},
          3 => {:pickle, {:oneof, :message}, {:message, CucumberMessages.Pickle}},
          4 =>
            {:step_definition, {:oneof, :message}, {:message, CucumberMessages.StepDefinition}},
          5 => {:hook, {:oneof, :message}, {:message, CucumberMessages.Hook}},
          6 => {:parameter_type, {:oneof, :message}, {:message, CucumberMessages.ParameterType}},
          7 => {:test_case, {:oneof, :message}, {:message, CucumberMessages.TestCase}},
          8 =>
            {:undefined_parameter_type, {:oneof, :message},
             {:message, CucumberMessages.UndefinedParameterType}},
          9 =>
            {:test_run_started, {:oneof, :message}, {:message, CucumberMessages.TestRunStarted}},
          10 =>
            {:test_case_started, {:oneof, :message}, {:message, CucumberMessages.TestCaseStarted}},
          11 =>
            {:test_step_started, {:oneof, :message}, {:message, CucumberMessages.TestStepStarted}},
          12 => {:attachment, {:oneof, :message}, {:message, CucumberMessages.Attachment}},
          13 =>
            {:test_step_finished, {:oneof, :message},
             {:message, CucumberMessages.TestStepFinished}},
          14 =>
            {:test_case_finished, {:oneof, :message},
             {:message, CucumberMessages.TestCaseFinished}},
          15 =>
            {:test_run_finished, {:oneof, :message}, {:message, CucumberMessages.TestRunFinished}},
          16 => {:parse_error, {:oneof, :message}, {:message, CucumberMessages.ParseError}},
          17 => {:meta, {:oneof, :message}, {:message, CucumberMessages.Meta}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          attachment: {12, {:oneof, :message}, {:message, CucumberMessages.Attachment}},
          gherkin_document: {2, {:oneof, :message}, {:message, CucumberMessages.GherkinDocument}},
          hook: {5, {:oneof, :message}, {:message, CucumberMessages.Hook}},
          meta: {17, {:oneof, :message}, {:message, CucumberMessages.Meta}},
          parameter_type: {6, {:oneof, :message}, {:message, CucumberMessages.ParameterType}},
          parse_error: {16, {:oneof, :message}, {:message, CucumberMessages.ParseError}},
          pickle: {3, {:oneof, :message}, {:message, CucumberMessages.Pickle}},
          source: {1, {:oneof, :message}, {:message, CucumberMessages.Source}},
          step_definition: {4, {:oneof, :message}, {:message, CucumberMessages.StepDefinition}},
          test_case: {7, {:oneof, :message}, {:message, CucumberMessages.TestCase}},
          test_case_finished:
            {14, {:oneof, :message}, {:message, CucumberMessages.TestCaseFinished}},
          test_case_started:
            {10, {:oneof, :message}, {:message, CucumberMessages.TestCaseStarted}},
          test_run_finished:
            {15, {:oneof, :message}, {:message, CucumberMessages.TestRunFinished}},
          test_run_started: {9, {:oneof, :message}, {:message, CucumberMessages.TestRunStarted}},
          test_step_finished:
            {13, {:oneof, :message}, {:message, CucumberMessages.TestStepFinished}},
          test_step_started:
            {11, {:oneof, :message}, {:message, CucumberMessages.TestStepStarted}},
          undefined_parameter_type:
            {8, {:oneof, :message}, {:message, CucumberMessages.UndefinedParameterType}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:source)) do
            {:error, :no_default_value}
          end,
          def(default(:gherkin_document)) do
            {:error, :no_default_value}
          end,
          def(default(:pickle)) do
            {:error, :no_default_value}
          end,
          def(default(:step_definition)) do
            {:error, :no_default_value}
          end,
          def(default(:hook)) do
            {:error, :no_default_value}
          end,
          def(default(:parameter_type)) do
            {:error, :no_default_value}
          end,
          def(default(:test_case)) do
            {:error, :no_default_value}
          end,
          def(default(:undefined_parameter_type)) do
            {:error, :no_default_value}
          end,
          def(default(:test_run_started)) do
            {:error, :no_default_value}
          end,
          def(default(:test_case_started)) do
            {:error, :no_default_value}
          end,
          def(default(:test_step_started)) do
            {:error, :no_default_value}
          end,
          def(default(:attachment)) do
            {:error, :no_default_value}
          end,
          def(default(:test_step_finished)) do
            {:error, :no_default_value}
          end,
          def(default(:test_case_finished)) do
            {:error, :no_default_value}
          end,
          def(default(:test_run_finished)) do
            {:error, :no_default_value}
          end,
          def(default(:parse_error)) do
            {:error, :no_default_value}
          end,
          def(default(:meta)) do
            {:error, :no_default_value}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.GherkinDocument.Feature.Step.DocString) do
    @moduledoc false
    (
      defstruct(location: nil, media_type: "", content: "", delimiter: "", __uf__: [])

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
          |> encode_media_type(msg)
          |> encode_content(msg)
          |> encode_delimiter(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_location(acc, msg)) do
            field_value = msg.location()

            if(field_value == nil) do
              acc
            else
              [acc, "\n", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_media_type(acc, msg)) do
            field_value = msg.media_type()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_content(acc, msg)) do
            field_value = msg.content()

            if(field_value == "") do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_delimiter(acc, msg)) do
            field_value = msg.delimiter()

            if(field_value == "") do
              acc
            else
              [acc, "\"", Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(
              bytes,
              struct(CucumberMessages.GherkinDocument.Feature.Step.DocString)
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
                  value = CucumberMessages.Location.decode!(delimited)
                  field = {:location, Protox.Message.merge(msg.location(), value)}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:media_type, value}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:content, value}
                  {field, rest}

                {4, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:delimiter, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:location, {:default, nil}, {:message, CucumberMessages.Location}},
          2 => {:media_type, {:default, ""}, :string},
          3 => {:content, {:default, ""}, :string},
          4 => {:delimiter, {:default, ""}, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          content: {3, {:default, ""}, :string},
          delimiter: {4, {:default, ""}, :string},
          location: {1, {:default, nil}, {:message, CucumberMessages.Location}},
          media_type: {2, {:default, ""}, :string}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:location)) do
            {:ok, nil}
          end,
          def(default(:media_type)) do
            {:ok, ""}
          end,
          def(default(:content)) do
            {:ok, ""}
          end,
          def(default(:delimiter)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.Timestamp) do
    @moduledoc false
    (
      defstruct(seconds: 0, nanos: 0, __uf__: [])

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
          [] |> encode_seconds(msg) |> encode_nanos(msg) |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_seconds(acc, msg)) do
            field_value = msg.seconds()

            if(field_value == 0) do
              acc
            else
              [acc, "\b", Protox.Encode.encode_int64(field_value)]
            end
          end,
          defp(encode_nanos(acc, msg)) do
            field_value = msg.nanos()

            if(field_value == 0) do
              acc
            else
              [acc, <<16>>, Protox.Encode.encode_int32(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.Timestamp))
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
                  {value, rest} = Protox.Decode.parse_int64(bytes)
                  field = {:seconds, value}
                  {field, rest}

                {2, _, bytes} ->
                  {value, rest} = Protox.Decode.parse_int32(bytes)
                  field = {:nanos, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
            parse_key_value(rest, msg_updated)
          end
        )

        []
      )

      @spec defs() :: %{
              required(non_neg_integer) => {atom, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs()) do
        %{1 => {:seconds, {:default, 0}, :int64}, 2 => {:nanos, {:default, 0}, :int32}}
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{nanos: {2, {:default, 0}, :int32}, seconds: {1, {:default, 0}, :int64}}
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:seconds)) do
            {:ok, 0}
          end,
          def(default(:nanos)) do
            {:ok, 0}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.TestCase.TestStep) do
    @moduledoc false
    (
      defstruct(
        id: "",
        pickle_step_id: "",
        step_definition_ids: [],
        step_match_arguments_lists: [],
        hook_id: "",
        __uf__: []
      )

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
          |> encode_id(msg)
          |> encode_pickle_step_id(msg)
          |> encode_step_definition_ids(msg)
          |> encode_step_match_arguments_lists(msg)
          |> encode_hook_id(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_id(acc, msg)) do
            field_value = msg.id()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_pickle_step_id(acc, msg)) do
            field_value = msg.pickle_step_id()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_step_definition_ids(acc, msg)) do
            case(msg.step_definition_ids()) do
              [] ->
                acc

              values ->
                [
                  acc,
                  Enum.reduce(values, [], fn value, acc ->
                    [acc, <<26>>, Protox.Encode.encode_string(value)]
                  end)
                ]
            end
          end,
          defp(encode_step_match_arguments_lists(acc, msg)) do
            case(msg.step_match_arguments_lists()) do
              [] ->
                acc

              values ->
                [
                  acc,
                  Enum.reduce(values, [], fn value, acc ->
                    [acc, "\"", Protox.Encode.encode_message(value)]
                  end)
                ]
            end
          end,
          defp(encode_hook_id(acc, msg)) do
            field_value = msg.hook_id()

            if(field_value == "") do
              acc
            else
              [acc, "*", Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.TestCase.TestStep))
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

                  value =
                    CucumberMessages.TestCase.TestStep.StepMatchArgumentsList.decode!(delimited)

                  field =
                    {:step_match_arguments_lists,
                     msg.step_match_arguments_lists() ++ List.wrap(value)}

                  {field, rest}

                {5, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:hook_id, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:id, {:default, ""}, :string},
          2 => {:pickle_step_id, {:default, ""}, :string},
          3 => {:step_definition_ids, :unpacked, :string},
          4 =>
            {:step_match_arguments_lists, :unpacked,
             {:message, CucumberMessages.TestCase.TestStep.StepMatchArgumentsList}},
          5 => {:hook_id, {:default, ""}, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          hook_id: {5, {:default, ""}, :string},
          id: {1, {:default, ""}, :string},
          pickle_step_id: {2, {:default, ""}, :string},
          step_definition_ids: {3, :unpacked, :string},
          step_match_arguments_lists:
            {4, :unpacked, {:message, CucumberMessages.TestCase.TestStep.StepMatchArgumentsList}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:id)) do
            {:ok, ""}
          end,
          def(default(:pickle_step_id)) do
            {:ok, ""}
          end,
          def(default(:step_definition_ids)) do
            {:error, :no_default_value}
          end,
          def(default(:step_match_arguments_lists)) do
            {:error, :no_default_value}
          end,
          def(default(:hook_id)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.Duration) do
    @moduledoc false
    (
      defstruct(seconds: 0, nanos: 0, __uf__: [])

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
          [] |> encode_seconds(msg) |> encode_nanos(msg) |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_seconds(acc, msg)) do
            field_value = msg.seconds()

            if(field_value == 0) do
              acc
            else
              [acc, "\b", Protox.Encode.encode_int64(field_value)]
            end
          end,
          defp(encode_nanos(acc, msg)) do
            field_value = msg.nanos()

            if(field_value == 0) do
              acc
            else
              [acc, <<16>>, Protox.Encode.encode_int32(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.Duration))
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
                  {value, rest} = Protox.Decode.parse_int64(bytes)
                  field = {:seconds, value}
                  {field, rest}

                {2, _, bytes} ->
                  {value, rest} = Protox.Decode.parse_int32(bytes)
                  field = {:nanos, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
            parse_key_value(rest, msg_updated)
          end
        )

        []
      )

      @spec defs() :: %{
              required(non_neg_integer) => {atom, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs()) do
        %{1 => {:seconds, {:default, 0}, :int64}, 2 => {:nanos, {:default, 0}, :int32}}
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{nanos: {2, {:default, 0}, :int32}, seconds: {1, {:default, 0}, :int64}}
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:seconds)) do
            {:ok, 0}
          end,
          def(default(:nanos)) do
            {:ok, 0}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.GherkinDocument.Feature.FeatureChild) do
    @moduledoc false
    (
      defstruct(value: nil, __uf__: [])

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
          [] |> encode_value(msg) |> encode_unknown_fields(msg)
        end

        [
          defp(encode_value(acc, msg)) do
            case(msg.value()) do
              nil ->
                acc

              {:rule, _field_value} ->
                encode_rule(acc, msg)

              {:background, _field_value} ->
                encode_background(acc, msg)

              {:scenario, _field_value} ->
                encode_scenario(acc, msg)
            end
          end
        ]

        [
          defp(encode_rule(acc, msg)) do
            {_, field_value} = msg.value()
            [acc, "\n", Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_background(acc, msg)) do
            {_, field_value} = msg.value()
            [acc, <<18>>, Protox.Encode.encode_message(field_value)]
          end,
          defp(encode_scenario(acc, msg)) do
            {_, field_value} = msg.value()
            [acc, <<26>>, Protox.Encode.encode_message(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.GherkinDocument.Feature.FeatureChild))
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

                  value =
                    CucumberMessages.GherkinDocument.Feature.FeatureChild.Rule.decode!(delimited)

                  field =
                    case(msg.value()) do
                      {:rule, previous_value} ->
                        {:value, {:rule, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:value, {:rule, value}}
                    end

                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.GherkinDocument.Feature.Background.decode!(delimited)

                  field =
                    case(msg.value()) do
                      {:background, previous_value} ->
                        {:value, {:background, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:value, {:background, value}}
                    end

                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.GherkinDocument.Feature.Scenario.decode!(delimited)

                  field =
                    case(msg.value()) do
                      {:scenario, previous_value} ->
                        {:value, {:scenario, Protox.Message.merge(previous_value, value)}}

                      _ ->
                        {:value, {:scenario, value}}
                    end

                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
            {:rule, {:oneof, :value},
             {:message, CucumberMessages.GherkinDocument.Feature.FeatureChild.Rule}},
          2 =>
            {:background, {:oneof, :value},
             {:message, CucumberMessages.GherkinDocument.Feature.Background}},
          3 =>
            {:scenario, {:oneof, :value},
             {:message, CucumberMessages.GherkinDocument.Feature.Scenario}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          background:
            {2, {:oneof, :value}, {:message, CucumberMessages.GherkinDocument.Feature.Background}},
          rule:
            {1, {:oneof, :value},
             {:message, CucumberMessages.GherkinDocument.Feature.FeatureChild.Rule}},
          scenario:
            {3, {:oneof, :value}, {:message, CucumberMessages.GherkinDocument.Feature.Scenario}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:rule)) do
            {:error, :no_default_value}
          end,
          def(default(:background)) do
            {:error, :no_default_value}
          end,
          def(default(:scenario)) do
            {:error, :no_default_value}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.GherkinDocument.Feature.Scenario) do
    @moduledoc false
    (
      defstruct(
        location: nil,
        tags: [],
        keyword: "",
        name: "",
        description: "",
        steps: [],
        examples: [],
        id: "",
        __uf__: []
      )

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
          |> encode_steps(msg)
          |> encode_examples(msg)
          |> encode_id(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_location(acc, msg)) do
            field_value = msg.location()

            if(field_value == nil) do
              acc
            else
              [acc, "\n", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_tags(acc, msg)) do
            case(msg.tags()) do
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
            field_value = msg.keyword()

            if(field_value == "") do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_name(acc, msg)) do
            field_value = msg.name()

            if(field_value == "") do
              acc
            else
              [acc, "\"", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_description(acc, msg)) do
            field_value = msg.description()

            if(field_value == "") do
              acc
            else
              [acc, "*", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_steps(acc, msg)) do
            case(msg.steps()) do
              [] ->
                acc

              values ->
                [
                  acc,
                  Enum.reduce(values, [], fn value, acc ->
                    [acc, "2", Protox.Encode.encode_message(value)]
                  end)
                ]
            end
          end,
          defp(encode_examples(acc, msg)) do
            case(msg.examples()) do
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
            field_value = msg.id()

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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.GherkinDocument.Feature.Scenario))
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
                  value = CucumberMessages.Location.decode!(delimited)
                  field = {:location, Protox.Message.merge(msg.location(), value)}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.GherkinDocument.Feature.Tag.decode!(delimited)
                  field = {:tags, msg.tags() ++ List.wrap(value)}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:keyword, value}
                  {field, rest}

                {4, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:name, value}
                  {field, rest}

                {5, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:description, value}
                  {field, rest}

                {6, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.GherkinDocument.Feature.Step.decode!(delimited)
                  field = {:steps, msg.steps() ++ List.wrap(value)}
                  {field, rest}

                {7, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes

                  value =
                    CucumberMessages.GherkinDocument.Feature.Scenario.Examples.decode!(delimited)

                  field = {:examples, msg.examples() ++ List.wrap(value)}
                  {field, rest}

                {8, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:id, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:location, {:default, nil}, {:message, CucumberMessages.Location}},
          2 => {:tags, :unpacked, {:message, CucumberMessages.GherkinDocument.Feature.Tag}},
          3 => {:keyword, {:default, ""}, :string},
          4 => {:name, {:default, ""}, :string},
          5 => {:description, {:default, ""}, :string},
          6 => {:steps, :unpacked, {:message, CucumberMessages.GherkinDocument.Feature.Step}},
          7 =>
            {:examples, :unpacked,
             {:message, CucumberMessages.GherkinDocument.Feature.Scenario.Examples}},
          8 => {:id, {:default, ""}, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          description: {5, {:default, ""}, :string},
          examples:
            {7, :unpacked, {:message, CucumberMessages.GherkinDocument.Feature.Scenario.Examples}},
          id: {8, {:default, ""}, :string},
          keyword: {3, {:default, ""}, :string},
          location: {1, {:default, nil}, {:message, CucumberMessages.Location}},
          name: {4, {:default, ""}, :string},
          steps: {6, :unpacked, {:message, CucumberMessages.GherkinDocument.Feature.Step}},
          tags: {2, :unpacked, {:message, CucumberMessages.GherkinDocument.Feature.Tag}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
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
          def(default(:steps)) do
            {:error, :no_default_value}
          end,
          def(default(:examples)) do
            {:error, :no_default_value}
          end,
          def(default(:id)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.Meta.CI.Git) do
    @moduledoc false
    (
      defstruct(remote: "", revision: "", branch: "", tag: "", __uf__: [])

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
          |> encode_remote(msg)
          |> encode_revision(msg)
          |> encode_branch(msg)
          |> encode_tag(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_remote(acc, msg)) do
            field_value = msg.remote()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_revision(acc, msg)) do
            field_value = msg.revision()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_branch(acc, msg)) do
            field_value = msg.branch()

            if(field_value == "") do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_tag(acc, msg)) do
            field_value = msg.tag()

            if(field_value == "") do
              acc
            else
              [acc, "\"", Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.Meta.CI.Git))
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
                  field = {:remote, value}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:revision, value}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:branch, value}
                  {field, rest}

                {4, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:tag, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:remote, {:default, ""}, :string},
          2 => {:revision, {:default, ""}, :string},
          3 => {:branch, {:default, ""}, :string},
          4 => {:tag, {:default, ""}, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          branch: {3, {:default, ""}, :string},
          remote: {1, {:default, ""}, :string},
          revision: {2, {:default, ""}, :string},
          tag: {4, {:default, ""}, :string}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:remote)) do
            {:ok, ""}
          end,
          def(default(:revision)) do
            {:ok, ""}
          end,
          def(default(:branch)) do
            {:ok, ""}
          end,
          def(default(:tag)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.Source) do
    @moduledoc false
    (
      defstruct(uri: "", data: "", media_type: "", __uf__: [])

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
          |> encode_data(msg)
          |> encode_media_type(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_uri(acc, msg)) do
            field_value = msg.uri()

            if(field_value == "") do
              acc
            else
              [acc, "\n", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_data(acc, msg)) do
            field_value = msg.data()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_media_type(acc, msg)) do
            field_value = msg.media_type()

            if(field_value == "") do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.Source))
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
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:data, value}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:media_type, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          2 => {:data, {:default, ""}, :string},
          3 => {:media_type, {:default, ""}, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          data: {2, {:default, ""}, :string},
          media_type: {3, {:default, ""}, :string},
          uri: {1, {:default, ""}, :string}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:uri)) do
            {:ok, ""}
          end,
          def(default(:data)) do
            {:ok, ""}
          end,
          def(default(:media_type)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.GherkinDocument.Feature.Scenario.Examples) do
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

        []

        [
          defp(encode_location(acc, msg)) do
            field_value = msg.location()

            if(field_value == nil) do
              acc
            else
              [acc, "\n", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_tags(acc, msg)) do
            case(msg.tags()) do
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
            field_value = msg.keyword()

            if(field_value == "") do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_name(acc, msg)) do
            field_value = msg.name()

            if(field_value == "") do
              acc
            else
              [acc, "\"", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_description(acc, msg)) do
            field_value = msg.description()

            if(field_value == "") do
              acc
            else
              [acc, "*", Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_table_header(acc, msg)) do
            field_value = msg.table_header()

            if(field_value == nil) do
              acc
            else
              [acc, "2", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_table_body(acc, msg)) do
            case(msg.table_body()) do
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
            field_value = msg.id()

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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(
              bytes,
              struct(CucumberMessages.GherkinDocument.Feature.Scenario.Examples)
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
                  value = CucumberMessages.Location.decode!(delimited)
                  field = {:location, Protox.Message.merge(msg.location(), value)}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.GherkinDocument.Feature.Tag.decode!(delimited)
                  field = {:tags, msg.tags() ++ List.wrap(value)}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:keyword, value}
                  {field, rest}

                {4, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:name, value}
                  {field, rest}

                {5, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:description, value}
                  {field, rest}

                {6, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.GherkinDocument.Feature.TableRow.decode!(delimited)
                  field = {:table_header, Protox.Message.merge(msg.table_header(), value)}
                  {field, rest}

                {7, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.GherkinDocument.Feature.TableRow.decode!(delimited)
                  field = {:table_body, msg.table_body() ++ List.wrap(value)}
                  {field, rest}

                {8, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:id, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:location, {:default, nil}, {:message, CucumberMessages.Location}},
          2 => {:tags, :unpacked, {:message, CucumberMessages.GherkinDocument.Feature.Tag}},
          3 => {:keyword, {:default, ""}, :string},
          4 => {:name, {:default, ""}, :string},
          5 => {:description, {:default, ""}, :string},
          6 =>
            {:table_header, {:default, nil},
             {:message, CucumberMessages.GherkinDocument.Feature.TableRow}},
          7 =>
            {:table_body, :unpacked,
             {:message, CucumberMessages.GherkinDocument.Feature.TableRow}},
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
          location: {1, {:default, nil}, {:message, CucumberMessages.Location}},
          name: {4, {:default, ""}, :string},
          table_body:
            {7, :unpacked, {:message, CucumberMessages.GherkinDocument.Feature.TableRow}},
          table_header:
            {6, {:default, nil}, {:message, CucumberMessages.GherkinDocument.Feature.TableRow}},
          tags: {2, :unpacked, {:message, CucumberMessages.GherkinDocument.Feature.Tag}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
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
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument.Group) do
    @moduledoc false
    (
      defstruct(start: 0, value: "", children: [], __uf__: [])

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
          |> encode_start(msg)
          |> encode_value(msg)
          |> encode_children(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_start(acc, msg)) do
            field_value = msg.start()

            if(field_value == 0) do
              acc
            else
              [acc, "\b", Protox.Encode.encode_uint32(field_value)]
            end
          end,
          defp(encode_value(acc, msg)) do
            field_value = msg.value()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_children(acc, msg)) do
            case(msg.children()) do
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

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
                CucumberMessages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument.Group
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
                  {value, rest} = Protox.Decode.parse_uint32(bytes)
                  field = {:start, value}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:value, value}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes

                  value =
                    CucumberMessages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument.Group.decode!(
                      delimited
                    )

                  field = {:children, msg.children() ++ List.wrap(value)}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:start, {:default, 0}, :uint32},
          2 => {:value, {:default, ""}, :string},
          3 =>
            {:children, :unpacked,
             {:message,
              CucumberMessages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument.Group}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          children:
            {3, :unpacked,
             {:message,
              CucumberMessages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument.Group}},
          start: {1, {:default, 0}, :uint32},
          value: {2, {:default, ""}, :string}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:start)) do
            {:ok, 0}
          end,
          def(default(:value)) do
            {:ok, ""}
          end,
          def(default(:children)) do
            {:error, :no_default_value}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.PickleStepArgument.PickleTable.PickleTableRow) do
    @moduledoc false
    (
      defstruct(cells: [], __uf__: [])

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
          [] |> encode_cells(msg) |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_cells(acc, msg)) do
            case(msg.cells()) do
              [] ->
                acc

              values ->
                [
                  acc,
                  Enum.reduce(values, [], fn value, acc ->
                    [acc, "\n", Protox.Encode.encode_message(value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(
              bytes,
              struct(CucumberMessages.PickleStepArgument.PickleTable.PickleTableRow)
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

                  value =
                    CucumberMessages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell.decode!(
                      delimited
                    )

                  field = {:cells, msg.cells() ++ List.wrap(value)}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
            {:cells, :unpacked,
             {:message,
              CucumberMessages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell}}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          cells:
            {1, :unpacked,
             {:message,
              CucumberMessages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:cells)) do
            {:error, :no_default_value}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.TestRunFinished) do
    @moduledoc false
    (
      defstruct(success: false, timestamp: nil, message: "", __uf__: [])

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
          |> encode_success(msg)
          |> encode_timestamp(msg)
          |> encode_message(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_success(acc, msg)) do
            field_value = msg.success()

            if(field_value == false) do
              acc
            else
              [acc, "\b", Protox.Encode.encode_bool(field_value)]
            end
          end,
          defp(encode_timestamp(acc, msg)) do
            field_value = msg.timestamp()

            if(field_value == nil) do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_message(acc, msg)) do
            field_value = msg.message()

            if(field_value == "") do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.TestRunFinished))
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
                  {value, rest} = Protox.Decode.parse_bool(bytes)
                  field = {:success, value}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.Timestamp.decode!(delimited)
                  field = {:timestamp, Protox.Message.merge(msg.timestamp(), value)}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:message, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:success, {:default, false}, :bool},
          2 => {:timestamp, {:default, nil}, {:message, CucumberMessages.Timestamp}},
          3 => {:message, {:default, ""}, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          message: {3, {:default, ""}, :string},
          success: {1, {:default, false}, :bool},
          timestamp: {2, {:default, nil}, {:message, CucumberMessages.Timestamp}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:success)) do
            {:ok, false}
          end,
          def(default(:timestamp)) do
            {:ok, nil}
          end,
          def(default(:message)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.TestRunStarted) do
    @moduledoc false
    (
      defstruct(timestamp: nil, __uf__: [])

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
          [] |> encode_timestamp(msg) |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_timestamp(acc, msg)) do
            field_value = msg.timestamp()

            if(field_value == nil) do
              acc
            else
              [acc, "\n", Protox.Encode.encode_message(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.TestRunStarted))
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
                  value = CucumberMessages.Timestamp.decode!(delimited)
                  field = {:timestamp, Protox.Message.merge(msg.timestamp(), value)}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
            parse_key_value(rest, msg_updated)
          end
        )

        []
      )

      @spec defs() :: %{
              required(non_neg_integer) => {atom, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs()) do
        %{1 => {:timestamp, {:default, nil}, {:message, CucumberMessages.Timestamp}}}
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{timestamp: {1, {:default, nil}, {:message, CucumberMessages.Timestamp}}}
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:timestamp)) do
            {:ok, nil}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.GherkinDocument.Feature.TableRow.TableCell) do
    @moduledoc false
    (
      defstruct(location: nil, value: "", __uf__: [])

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
          [] |> encode_location(msg) |> encode_value(msg) |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_location(acc, msg)) do
            field_value = msg.location()

            if(field_value == nil) do
              acc
            else
              [acc, "\n", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_value(acc, msg)) do
            field_value = msg.value()

            if(field_value == "") do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(
              bytes,
              struct(CucumberMessages.GherkinDocument.Feature.TableRow.TableCell)
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
                  value = CucumberMessages.Location.decode!(delimited)
                  field = {:location, Protox.Message.merge(msg.location(), value)}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:value, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:location, {:default, nil}, {:message, CucumberMessages.Location}},
          2 => {:value, {:default, ""}, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          location: {1, {:default, nil}, {:message, CucumberMessages.Location}},
          value: {2, {:default, ""}, :string}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:location)) do
            {:ok, nil}
          end,
          def(default(:value)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.GherkinDocument.Feature.TableRow) do
    @moduledoc false
    (
      defstruct(location: nil, cells: [], id: "", __uf__: [])

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
          |> encode_cells(msg)
          |> encode_id(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_location(acc, msg)) do
            field_value = msg.location()

            if(field_value == nil) do
              acc
            else
              [acc, "\n", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_cells(acc, msg)) do
            case(msg.cells()) do
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
          defp(encode_id(acc, msg)) do
            field_value = msg.id()

            if(field_value == "") do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.GherkinDocument.Feature.TableRow))
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
                  value = CucumberMessages.Location.decode!(delimited)
                  field = {:location, Protox.Message.merge(msg.location(), value)}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes

                  value =
                    CucumberMessages.GherkinDocument.Feature.TableRow.TableCell.decode!(delimited)

                  field = {:cells, msg.cells() ++ List.wrap(value)}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:id, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
          1 => {:location, {:default, nil}, {:message, CucumberMessages.Location}},
          2 =>
            {:cells, :unpacked,
             {:message, CucumberMessages.GherkinDocument.Feature.TableRow.TableCell}},
          3 => {:id, {:default, ""}, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          cells:
            {2, :unpacked,
             {:message, CucumberMessages.GherkinDocument.Feature.TableRow.TableCell}},
          id: {3, {:default, ""}, :string},
          location: {1, {:default, nil}, {:message, CucumberMessages.Location}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:location)) do
            {:ok, nil}
          end,
          def(default(:cells)) do
            {:error, :no_default_value}
          end,
          def(default(:id)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end,
  defmodule(CucumberMessages.TestStepFinished) do
    @moduledoc false
    (
      defstruct(
        test_step_result: nil,
        timestamp: nil,
        test_step_id: "",
        test_case_started_id: "",
        __uf__: []
      )

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
          |> encode_test_step_result(msg)
          |> encode_timestamp(msg)
          |> encode_test_step_id(msg)
          |> encode_test_case_started_id(msg)
          |> encode_unknown_fields(msg)
        end

        []

        [
          defp(encode_test_step_result(acc, msg)) do
            field_value = msg.test_step_result()

            if(field_value == nil) do
              acc
            else
              [acc, "\n", Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_timestamp(acc, msg)) do
            field_value = msg.timestamp()

            if(field_value == nil) do
              acc
            else
              [acc, <<18>>, Protox.Encode.encode_message(field_value)]
            end
          end,
          defp(encode_test_step_id(acc, msg)) do
            field_value = msg.test_step_id()

            if(field_value == "") do
              acc
            else
              [acc, <<26>>, Protox.Encode.encode_string(field_value)]
            end
          end,
          defp(encode_test_case_started_id(acc, msg)) do
            field_value = msg.test_case_started_id()

            if(field_value == "") do
              acc
            else
              [acc, "\"", Protox.Encode.encode_string(field_value)]
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
            Protox.IllegalTagError ->
              {:error, :illegal_tag}

            e in Protox.RequiredFieldsError ->
              {:error, {:missing_fields, e.missing_fields}}

            e in Protox.DecodingError ->
              {:error, {e.reason, e.binary}}

            e ->
              {:error, e}
          end
        end

        (
          @spec decode!(binary) :: struct | no_return
          def(decode!(bytes)) do
            parse_key_value(bytes, struct(CucumberMessages.TestStepFinished))
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
                  value = CucumberMessages.TestStepFinished.TestStepResult.decode!(delimited)
                  field = {:test_step_result, Protox.Message.merge(msg.test_step_result(), value)}
                  {field, rest}

                {2, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = CucumberMessages.Timestamp.decode!(delimited)
                  field = {:timestamp, Protox.Message.merge(msg.timestamp(), value)}
                  {field, rest}

                {3, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:test_step_id, value}
                  {field, rest}

                {4, _, bytes} ->
                  {len, bytes} = Protox.Varint.decode(bytes)
                  <<delimited::binary-size(len), rest::binary>> = bytes
                  value = delimited
                  field = {:test_case_started_id, value}
                  {field, rest}

                {tag, wire_type, rest} ->
                  {value, new_rest} = Protox.Decode.parse_unknown(tag, wire_type, rest)

                  field =
                    {msg.__struct__.unknown_fields_name,
                     [value | msg.__struct__.unknown_fields(msg)]}

                  {field, new_rest}
              end

            msg_updated = struct(msg, [field])
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
            {:test_step_result, {:default, nil},
             {:message, CucumberMessages.TestStepFinished.TestStepResult}},
          2 => {:timestamp, {:default, nil}, {:message, CucumberMessages.Timestamp}},
          3 => {:test_step_id, {:default, ""}, :string},
          4 => {:test_case_started_id, {:default, ""}, :string}
        }
      end

      @spec defs_by_name() :: %{
              required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
            }
      def(defs_by_name()) do
        %{
          test_case_started_id: {4, {:default, ""}, :string},
          test_step_id: {3, {:default, ""}, :string},
          test_step_result:
            {1, {:default, nil}, {:message, CucumberMessages.TestStepFinished.TestStepResult}},
          timestamp: {2, {:default, nil}, {:message, CucumberMessages.Timestamp}}
        }
      end

      @spec required_fields() :: []
      def(required_fields()) do
        []
      end

      @spec unknown_fields(struct) :: [{non_neg_integer, Protox.Types.tag(), binary}]
      def(unknown_fields(msg)) do
        msg.__uf__()
      end

      @spec unknown_fields_name() :: :__uf__
      def(unknown_fields_name()) do
        :__uf__
      end

      @spec clear_unknown_fields(struct) :: struct
      def(clear_unknown_fields(msg)) do
        struct!(msg, [{unknown_fields_name(), []}])
      end

      @spec syntax() :: atom
      def(syntax()) do
        :proto3
      end

      [
        @spec(
          default(atom) :: {:ok, boolean | integer | String.t() | binary | float} | {:error, atom}
        ),
        [
          def(default(:test_step_result)) do
            {:ok, nil}
          end,
          def(default(:timestamp)) do
            {:ok, nil}
          end,
          def(default(:test_step_id)) do
            {:ok, ""}
          end,
          def(default(:test_case_started_id)) do
            {:ok, ""}
          end
        ],
        def(default(_)) do
          {:error, :no_such_field}
        end
      ]
    )

    []
  end
]
