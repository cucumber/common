defmodule CucumberGherkin.AstNode do
  @moduledoc false
  @me __MODULE__
  defstruct rule_type: nil, subitems: %{}

  alias CucumberGherkin.{AstNode, RuleTypes}

  def add_subitem(%@me{subitems: subitems} = node, ruletype, token_or_node) do
    new_subitems =
      case Map.fetch(subitems, ruletype) do
        {:ok, list_of_items} -> Map.put(subitems, ruletype, list_of_items ++ [token_or_node])
        :error -> Map.put_new(subitems, ruletype, [token_or_node])
      end

    %{node | subitems: new_subitems}
  end

  def get_single(%AstNode{} = node, rule_type, defaultresult) do
    case get_items(node, rule_type) do
      [] -> defaultresult
      [head | _rest] -> head
    end
  end

  def get_items(%AstNode{subitems: subitems}, rule_type) do
    case Map.fetch(subitems, rule_type) do
      {:ok, list} ->
        list

      :error ->
        []
    end
  end

  def get_token(%AstNode{} = node, token_type) do
    # Is this necessary? Rule types obtained by following func will always be the same as token type?
    rule_type = RuleTypes.get_ruletype_for_tokentype(token_type)
    get_single(node, rule_type, %CucumberGherkin.Token{})
  end

  def get_tokens(%AstNode{} = node, token_type) do
    rule_type = RuleTypes.get_ruletype_for_tokentype(token_type)
    get_items(node, rule_type)
  end
end
