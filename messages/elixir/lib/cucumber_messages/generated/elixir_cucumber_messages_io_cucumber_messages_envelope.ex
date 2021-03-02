# credo:disable-for-this-file
defmodule(CucumberMessages.Io.Cucumber.Messages.Envelope) do
  @moduledoc false
  (
    defstruct(message: nil, __uf__: [])

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
          [] |> encode_message(msg) |> encode_unknown_fields(msg)
        end
      )

      [
        defp(encode_message(acc, msg)) do
          case(msg.message) do
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
          {_, field_value} = msg.message
          [acc, "\n", Protox.Encode.encode_message(field_value)]
        end,
        defp(encode_gherkin_document(acc, msg)) do
          {_, field_value} = msg.message
          [acc, <<18>>, Protox.Encode.encode_message(field_value)]
        end,
        defp(encode_pickle(acc, msg)) do
          {_, field_value} = msg.message
          [acc, <<26>>, Protox.Encode.encode_message(field_value)]
        end,
        defp(encode_step_definition(acc, msg)) do
          {_, field_value} = msg.message
          [acc, "\"", Protox.Encode.encode_message(field_value)]
        end,
        defp(encode_hook(acc, msg)) do
          {_, field_value} = msg.message
          [acc, "*", Protox.Encode.encode_message(field_value)]
        end,
        defp(encode_parameter_type(acc, msg)) do
          {_, field_value} = msg.message
          [acc, "2", Protox.Encode.encode_message(field_value)]
        end,
        defp(encode_test_case(acc, msg)) do
          {_, field_value} = msg.message
          [acc, ":", Protox.Encode.encode_message(field_value)]
        end,
        defp(encode_undefined_parameter_type(acc, msg)) do
          {_, field_value} = msg.message
          [acc, "B", Protox.Encode.encode_message(field_value)]
        end,
        defp(encode_test_run_started(acc, msg)) do
          {_, field_value} = msg.message
          [acc, "J", Protox.Encode.encode_message(field_value)]
        end,
        defp(encode_test_case_started(acc, msg)) do
          {_, field_value} = msg.message
          [acc, "R", Protox.Encode.encode_message(field_value)]
        end,
        defp(encode_test_step_started(acc, msg)) do
          {_, field_value} = msg.message
          [acc, "Z", Protox.Encode.encode_message(field_value)]
        end,
        defp(encode_attachment(acc, msg)) do
          {_, field_value} = msg.message
          [acc, "b", Protox.Encode.encode_message(field_value)]
        end,
        defp(encode_test_step_finished(acc, msg)) do
          {_, field_value} = msg.message
          [acc, "j", Protox.Encode.encode_message(field_value)]
        end,
        defp(encode_test_case_finished(acc, msg)) do
          {_, field_value} = msg.message
          [acc, "r", Protox.Encode.encode_message(field_value)]
        end,
        defp(encode_test_run_finished(acc, msg)) do
          {_, field_value} = msg.message
          [acc, "z", Protox.Encode.encode_message(field_value)]
        end,
        defp(encode_parse_error(acc, msg)) do
          {_, field_value} = msg.message
          [acc, [<<130>>, <<1>>], Protox.Encode.encode_message(field_value)]
        end,
        defp(encode_meta(acc, msg)) do
          {_, field_value} = msg.message
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
          e ->
            {:error, e}
        end
      end

      (
        @spec decode!(binary) :: struct | no_return
        def(decode!(bytes)) do
          parse_key_value(bytes, struct(CucumberMessages.Io.Cucumber.Messages.Envelope))
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
                value = CucumberMessages.Io.Cucumber.Messages.Source.decode!(delimited)

                field =
                  case(msg.message) do
                    {:source, previous_value} ->
                      {:message, {:source, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:message, {:source, value}}
                  end

                {[field], rest}

              {2, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.GherkinDocument.decode!(delimited)

                field =
                  case(msg.message) do
                    {:gherkin_document, previous_value} ->
                      {:message, {:gherkin_document, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:message, {:gherkin_document, value}}
                  end

                {[field], rest}

              {3, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.Pickle.decode!(delimited)

                field =
                  case(msg.message) do
                    {:pickle, previous_value} ->
                      {:message, {:pickle, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:message, {:pickle, value}}
                  end

                {[field], rest}

              {4, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.StepDefinition.decode!(delimited)

                field =
                  case(msg.message) do
                    {:step_definition, previous_value} ->
                      {:message, {:step_definition, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:message, {:step_definition, value}}
                  end

                {[field], rest}

              {5, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.Hook.decode!(delimited)

                field =
                  case(msg.message) do
                    {:hook, previous_value} ->
                      {:message, {:hook, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:message, {:hook, value}}
                  end

                {[field], rest}

              {6, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.ParameterType.decode!(delimited)

                field =
                  case(msg.message) do
                    {:parameter_type, previous_value} ->
                      {:message, {:parameter_type, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:message, {:parameter_type, value}}
                  end

                {[field], rest}

              {7, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.TestCase.decode!(delimited)

                field =
                  case(msg.message) do
                    {:test_case, previous_value} ->
                      {:message, {:test_case, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:message, {:test_case, value}}
                  end

                {[field], rest}

              {8, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes

                value =
                  CucumberMessages.Io.Cucumber.Messages.UndefinedParameterType.decode!(delimited)

                field =
                  case(msg.message) do
                    {:undefined_parameter_type, previous_value} ->
                      {:message,
                       {:undefined_parameter_type, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:message, {:undefined_parameter_type, value}}
                  end

                {[field], rest}

              {9, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.TestRunStarted.decode!(delimited)

                field =
                  case(msg.message) do
                    {:test_run_started, previous_value} ->
                      {:message, {:test_run_started, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:message, {:test_run_started, value}}
                  end

                {[field], rest}

              {10, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.TestCaseStarted.decode!(delimited)

                field =
                  case(msg.message) do
                    {:test_case_started, previous_value} ->
                      {:message,
                       {:test_case_started, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:message, {:test_case_started, value}}
                  end

                {[field], rest}

              {11, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.TestStepStarted.decode!(delimited)

                field =
                  case(msg.message) do
                    {:test_step_started, previous_value} ->
                      {:message,
                       {:test_step_started, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:message, {:test_step_started, value}}
                  end

                {[field], rest}

              {12, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.Attachment.decode!(delimited)

                field =
                  case(msg.message) do
                    {:attachment, previous_value} ->
                      {:message, {:attachment, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:message, {:attachment, value}}
                  end

                {[field], rest}

              {13, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.TestStepFinished.decode!(delimited)

                field =
                  case(msg.message) do
                    {:test_step_finished, previous_value} ->
                      {:message,
                       {:test_step_finished, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:message, {:test_step_finished, value}}
                  end

                {[field], rest}

              {14, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.TestCaseFinished.decode!(delimited)

                field =
                  case(msg.message) do
                    {:test_case_finished, previous_value} ->
                      {:message,
                       {:test_case_finished, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:message, {:test_case_finished, value}}
                  end

                {[field], rest}

              {15, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.TestRunFinished.decode!(delimited)

                field =
                  case(msg.message) do
                    {:test_run_finished, previous_value} ->
                      {:message,
                       {:test_run_finished, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:message, {:test_run_finished, value}}
                  end

                {[field], rest}

              {16, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.ParseError.decode!(delimited)

                field =
                  case(msg.message) do
                    {:parse_error, previous_value} ->
                      {:message, {:parse_error, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:message, {:parse_error, value}}
                  end

                {[field], rest}

              {17, _, bytes} ->
                {len, bytes} = Protox.Varint.decode(bytes)
                <<delimited::binary-size(len), rest::binary>> = bytes
                value = CucumberMessages.Io.Cucumber.Messages.Meta.decode!(delimited)

                field =
                  case(msg.message) do
                    {:meta, previous_value} ->
                      {:message, {:meta, Protox.Message.merge(previous_value, value)}}

                    _ ->
                      {:message, {:meta, value}}
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
        1 =>
          {:source, {:oneof, :message}, {:message, CucumberMessages.Io.Cucumber.Messages.Source}},
        2 =>
          {:gherkin_document, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.GherkinDocument}},
        3 =>
          {:pickle, {:oneof, :message}, {:message, CucumberMessages.Io.Cucumber.Messages.Pickle}},
        4 =>
          {:step_definition, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.StepDefinition}},
        5 => {:hook, {:oneof, :message}, {:message, CucumberMessages.Io.Cucumber.Messages.Hook}},
        6 =>
          {:parameter_type, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.ParameterType}},
        7 =>
          {:test_case, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.TestCase}},
        8 =>
          {:undefined_parameter_type, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.UndefinedParameterType}},
        9 =>
          {:test_run_started, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.TestRunStarted}},
        10 =>
          {:test_case_started, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.TestCaseStarted}},
        11 =>
          {:test_step_started, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.TestStepStarted}},
        12 =>
          {:attachment, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.Attachment}},
        13 =>
          {:test_step_finished, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.TestStepFinished}},
        14 =>
          {:test_case_finished, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.TestCaseFinished}},
        15 =>
          {:test_run_finished, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.TestRunFinished}},
        16 =>
          {:parse_error, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.ParseError}},
        17 => {:meta, {:oneof, :message}, {:message, CucumberMessages.Io.Cucumber.Messages.Meta}}
      }
    end

    @spec defs_by_name() :: %{
            required(atom) => {non_neg_integer, Protox.Types.kind(), Protox.Types.type()}
          }
    def(defs_by_name()) do
      %{
        attachment:
          {12, {:oneof, :message}, {:message, CucumberMessages.Io.Cucumber.Messages.Attachment}},
        gherkin_document:
          {2, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.GherkinDocument}},
        hook: {5, {:oneof, :message}, {:message, CucumberMessages.Io.Cucumber.Messages.Hook}},
        meta: {17, {:oneof, :message}, {:message, CucumberMessages.Io.Cucumber.Messages.Meta}},
        parameter_type:
          {6, {:oneof, :message}, {:message, CucumberMessages.Io.Cucumber.Messages.ParameterType}},
        parse_error:
          {16, {:oneof, :message}, {:message, CucumberMessages.Io.Cucumber.Messages.ParseError}},
        pickle: {3, {:oneof, :message}, {:message, CucumberMessages.Io.Cucumber.Messages.Pickle}},
        source: {1, {:oneof, :message}, {:message, CucumberMessages.Io.Cucumber.Messages.Source}},
        step_definition:
          {4, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.StepDefinition}},
        test_case:
          {7, {:oneof, :message}, {:message, CucumberMessages.Io.Cucumber.Messages.TestCase}},
        test_case_finished:
          {14, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.TestCaseFinished}},
        test_case_started:
          {10, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.TestCaseStarted}},
        test_run_finished:
          {15, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.TestRunFinished}},
        test_run_started:
          {9, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.TestRunStarted}},
        test_step_finished:
          {13, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.TestStepFinished}},
        test_step_started:
          {11, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.TestStepStarted}},
        undefined_parameter_type:
          {8, {:oneof, :message},
           {:message, CucumberMessages.Io.Cucumber.Messages.UndefinedParameterType}}
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
      end,
      def(default(_)) do
        {:error, :no_such_field}
      end
    ]
  )
end