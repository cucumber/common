defmodule ExGherkin.Gherkin.Lexicon do
  @moduledoc false
  @default_lexicon_path [File.cwd!(), "resources", "gherkin_languages.json"] |> Path.join()
  @feature_keywords ["feature"]
  # @scen_keywords ["scenario"]
  # @scen_outline_keywords ["scenarioOutline"]
  @scens_both ["scenario", "scenarioOutline"]
  @step_keywords ["given", "when", "then", "and", "but"]
  @background_keywords ["background"]
  @rule_keywords ["rule"]
  @examples_keywords ["examples"]

  def load!(), do: @default_lexicon_path |> File.read!() |> Jason.decode!()
  def load_lang(lang) when is_binary(lang), do: load!() |> Map.fetch(lang)

  def load_keywords(FeatureLine, lex), do: fetch_and_flatten(@feature_keywords, lex)
  def load_keywords(ScenarioLine, lex), do: fetch_and_flatten(@scens_both, lex)
  def load_keywords(StepLine, lex), do: fetch_and_flatten(@step_keywords, lex)
  def load_keywords(BackgroundLine, lex), do: fetch_and_flatten(@background_keywords, lex)
  def load_keywords(RuleLine, lex), do: fetch_and_flatten(@rule_keywords, lex)
  def load_keywords(ExamplesLine, lex), do: fetch_and_flatten(@examples_keywords, lex)
  # def load_keywords(ScenarioLine, lex), do: fetch_and_flatten(@scen_keywords, lex)
  # def load_keywords(ScenarioOutLine, lex), do: fetch_and_flatten(@scen_outline_keywords, lex)

  defp fetch_and_flatten(keywords, lexicon) do
    keywords |> Enum.map(&Map.fetch!(lexicon, &1)) |> List.flatten()
  end
end
