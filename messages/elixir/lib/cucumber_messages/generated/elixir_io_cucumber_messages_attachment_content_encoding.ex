# credo:disable-for-this-file
defmodule(Io.Cucumber.Messages.Attachment.ContentEncoding) do
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
end