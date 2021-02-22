# credo:disable-for-this-file
defmodule(Io.Cucumber.Messages.TestStepFinished.TestStepResult.Status) do
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
end