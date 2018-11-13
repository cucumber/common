using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Gherkin.Ast;
using System.Reflection;

namespace Gherkin
{
    public interface IGherkinDialectProvider
    {
        GherkinDialect DefaultDialect { get; }
        GherkinDialect GetDialect(string language, Ast.Location location);
    }

    public class GherkinDialectProvider : IGherkinDialectProvider
    {
        private readonly Lazy<GherkinDialect> defaultDialect;

        public GherkinDialect DefaultDialect
        {
            get { return defaultDialect.Value; }
        }

        public GherkinDialectProvider(string defaultLanguage = "en")
        {
            defaultDialect = new Lazy<GherkinDialect>(() => GetDialect(defaultLanguage, null));
        }

        protected virtual bool TryGetDialect(string language, Ast.Location location, out GherkinDialect dialect)
        {
            var gherkinLanguageSettings = LoadLanguageSettings();
            return TryGetDialect(language, gherkinLanguageSettings, location, out dialect);
        }

        public virtual GherkinDialect GetDialect(string language, Ast.Location location)
        {
            if (!TryGetDialect(language, location, out var dialect))
                throw new NoSuchLanguageException(language, location);
            return dialect;
        }

        protected virtual Dictionary<string, GherkinLanguageSetting> LoadLanguageSettings()
        {
            const string languageFileName = "gherkin-languages.json";
            
            var assembly = typeof(GherkinDialectProvider).Assembly;            
            var resourceStream = assembly.GetManifestResourceStream("Gherkin." + languageFileName);            
                                    
            if (resourceStream == null)
                throw new InvalidOperationException("Gherkin language resource not found: " + languageFileName);
            var languagesFileContent = new StreamReader(resourceStream).ReadToEnd();

            return ParseJsonContent(languagesFileContent);
        }

        protected Dictionary<string, GherkinLanguageSetting> ParseJsonContent(string languagesFileContent)
        {
            return Utf8Json.JsonSerializer.Deserialize<Dictionary<string, GherkinLanguageSetting>>(languagesFileContent);
        }

        protected virtual bool TryGetDialect(string language, Dictionary<string, GherkinLanguageSetting> gherkinLanguageSettings, Ast.Location location, out GherkinDialect dialect)
        {
            if (!gherkinLanguageSettings.TryGetValue(language, out var languageSettings))
            {
                dialect = null;
                return false;
            }

            dialect = CreateGherkinDialect(language, languageSettings);
            return true;
        }

        protected GherkinDialect CreateGherkinDialect(string language, GherkinLanguageSetting languageSettings)
        {
            return new GherkinDialect(
                language,
                ParseTitleKeywords(languageSettings.feature),
                ParseTitleKeywords(languageSettings.rule),
                ParseTitleKeywords(languageSettings.background),
                ParseTitleKeywords(languageSettings.scenario),
                ParseTitleKeywords(languageSettings.scenarioOutline),
                ParseTitleKeywords(languageSettings.examples),
                ParseStepKeywords(languageSettings.given),
                ParseStepKeywords(languageSettings.when),
                ParseStepKeywords(languageSettings.then),
                ParseStepKeywords(languageSettings.and),
                ParseStepKeywords(languageSettings.but)
            );
        }

        private string[] ParseStepKeywords(string[] stepKeywords)
        {
            return stepKeywords;
        }

        private string[] ParseTitleKeywords(string[] keywords)
        {
            return keywords;
        }

        protected static GherkinDialect GetFactoryDefault()
        {
            return new GherkinDialect(
                "en",
                new[] {"Feature"},
                new[] {"Rule"},
                new[] {"Background"},
                new[] {"Scenario"},
                new[] {"Scenario Outline", "Scenario Template"},
                new[] {"Examples", "Scenarios"},
                new[] {"* ", "Given "},
                new[] {"* ", "When " },
                new[] {"* ", "Then " },
                new[] {"* ", "And " },
                new[] {"* ", "But " });
        }
    }

    public class GherkinLanguageSetting
    {
        // ReSharper disable InconsistentNaming
        public string name;
        public string native;
        public string[] feature;
        public string[] rule;
        public string[] background;
        public string[] scenario;
        public string[] scenarioOutline;
        public string[] examples;
        public string[] given;
        public string[] when;
        public string[] then;
        public string[] and;
        public string[] but;
        // ReSharper restore InconsistentNaming
    }
}
