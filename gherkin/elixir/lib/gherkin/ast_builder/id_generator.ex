defmodule Gherkin.IdGenerator.PredictableGen do
  @moduledoc false
  defstruct count: 0
end

defmodule Gherkin.IdGenerator.UUIDGen do
  @moduledoc false
  defstruct []
end

defprotocol Gherkin.IdGenerator do
  @moduledoc false
  def get_id(possible_state)
end

alias Gherkin.IdGenerator
alias Gherkin.IdGenerator.{PredictableGen, UUIDGen}

defimpl IdGenerator, for: PredictableGen do
  def get_id(%PredictableGen{count: c} = me), do: {"#{c}", %{me | count: c + 1}}
end

defimpl IdGenerator, for: UUIDGen do
  def get_id(me), do: {UUID.uuid4(), me}
end
