defmodule CucumberMessages.MixProject do
  @moduledoc false
  use Mix.Project

  @vsn "15.0.0"
  @github "https://github.com/cucumber/common/tree/main/messages/elixir"
  @name "CucumberMessages"

  def project do
    [
      app: :cucumber_messages,
      version: @vsn,
      name: @name,
      description: description(),
      package: package(),
      elixir: "~> 1.10",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def application do
    [
      extra_applications: [:logger]
    ]
  end

  defp deps do
    [
      {:jason, "~> 1.2"},
      {:ex_doc, "~> 0.28", only: :dev, runtime: false}
    ]
  end

  defp description() do
    "Elixir implementation of the cucumber messages json schemas"
  end

  defp package() do
    [
      licenses: ["MIT"],
      source_url: @github,
      links: %{"GitHub" => @github}
    ]
  end
end
