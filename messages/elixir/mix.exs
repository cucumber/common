defmodule CucumberMessages.MixProject do
  @moduledoc false
  use Mix.Project

  @vsn "0.1.0"
  @github "https://github.com/cucumber/cucumber/tree/master/messages/elixir"
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
      {:protox, "~> 1.1.0"},
      {:jason, "~> 1.2"},
      {:ex_doc, "~> 0.23", only: :dev, runtime: false}
    ]
  end

  defp description() do
    "Elixir implementation of the cucumber messages protobuf schema"
  end

  defp package() do
    [
      licenses: ["MIT"],
      source_url: @github,
      links: %{"GitHub" => @github}
    ]
  end
end
