defmodule ExGherkin.MixProject do
  use Mix.Project

  @vsn "0.2.0"
  @github "https://github.com/WannesFransen1994/ex_gherkin"
  @name "ExGherkinn"

  def project do
    [
      app: :ex_gherkin,
      version: @vsn,
      name: @name,
      description: description(),
      package: package(),
      elixir: "~> 1.10",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:elixir_uuid, "~> 1.2"},
      {:ex_cucumber_messages, "~> 0.1.0"},
      {:ex_doc, "~> 0.14", only: :dev, runtime: false}
    ]
  end

  defp description() do
    "Elixir Gherkin parser."
  end

  defp package() do
    [
      licenses: ["MIT"],
      source_url: @github,
      links: %{"GitHub" => @github}
    ]
  end
end
