defmodule CucumberGherkin.Lexicon do
  @moduledoc false
  @default_lexicon_path [:code.priv_dir(:cucumber_gherkin), "gherkin_languages.json"]
                        |> Path.join()
  @feature_keywords ["feature"]
  @scens_both ["scenario", "scenarioOutline"]
  @step_keywords ["given", "when", "then", "and", "but"]
  @background_keywords ["background"]
  @rule_keywords ["rule"]
  @examples_keywords ["examples"]

  # Credit goes to Alvivi for loading the resource at compile time.
  @external_resource @default_lexicon_path

  @lexicon @default_lexicon_path |> File.read!() |> Jason.decode!()

  def load_lang(lang) when is_binary(lang), do: Map.fetch(@lexicon, lang)

  def load_keywords(FeatureLine, lex), do: fetch_and_flatten(@feature_keywords, lex)
  def load_keywords(ScenarioLine, lex), do: fetch_and_flatten(@scens_both, lex)
  def load_keywords(StepLine, lex), do: fetch_and_flatten(@step_keywords, lex)
  def load_keywords(BackgroundLine, lex), do: fetch_and_flatten(@background_keywords, lex)
  def load_keywords(RuleLine, lex), do: fetch_and_flatten(@rule_keywords, lex)
  def load_keywords(ExamplesLine, lex), do: fetch_and_flatten(@examples_keywords, lex)

  defp fetch_and_flatten(keywords, lexicon) do
    keywords |> Enum.map(&Map.fetch!(lexicon, &1)) |> List.flatten()
  end
end
