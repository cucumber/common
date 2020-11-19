defmodule Stack do
  @moduledoc false
  defstruct list: []

  def new, do: %Stack{}

  def size(%Stack{list: list}), do: length(list)

  def push(%Stack{list: list}, item), do: %Stack{list: [item | list]}

  def pop(stack = %Stack{list: []}), do: {nil, stack}
  def pop(%Stack{list: [item | rest]}), do: {item, %Stack{list: rest}}
end
