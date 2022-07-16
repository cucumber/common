using System.Collections.Generic;
using System.Linq;

namespace Gherkin
{
    public class GherkinDialect
    {
        public const string AsteriskKeyword = "* ";
        public string Language { get; }

        public string[] FeatureKeywords { get; }
        public string[] RuleKeywords { get; }
        public string[] BackgroundKeywords { get; }
        public string[] ScenarioKeywords { get; }
        public string[] ScenarioOutlineKeywords { get; }
        public string[] ExamplesKeywords { get; }
        public string[] GivenStepKeywords { get; }
        public string[] WhenStepKeywords { get; }
        public string[] ThenStepKeywords { get; }
        public string[] AndStepKeywords { get; }
        public string[] ButStepKeywords { get; }


        public string[] StepKeywords { get; }
        public IDictionary<string, StepKeywordType> StepKeywordTypes { get; }

        public GherkinDialect(
            string language,
            string[] featureKeywords, 
            string[] ruleKeywords, 
            string[] backgroundKeywords, 
            string[] scenarioKeywords,
            string[] scenarioOutlineKeywords,
            string[] examplesKeywords,
            string[] givenStepKeywords,
            string[] whenStepKeywords,
            string[] thenStepKeywords,
            string[] andStepKeywords,
            string[] butStepKeywords)
        {
            Language = language;
            FeatureKeywords = featureKeywords;
            RuleKeywords = ruleKeywords;
            BackgroundKeywords = backgroundKeywords;
            ScenarioKeywords = scenarioKeywords;
            ScenarioOutlineKeywords = scenarioOutlineKeywords;
            ExamplesKeywords = examplesKeywords;
            GivenStepKeywords = givenStepKeywords;
            WhenStepKeywords = whenStepKeywords;
            ThenStepKeywords = thenStepKeywords;
            AndStepKeywords = andStepKeywords;
            ButStepKeywords = butStepKeywords;

            StepKeywords = givenStepKeywords
                .Concat(whenStepKeywords)
                .Concat(thenStepKeywords)
                .Concat(andStepKeywords)
                .Concat(butStepKeywords)
                .Distinct()
                .ToArray();

            StepKeywordTypes =
                new[] { new { Keyword = AsteriskKeyword, Type = StepKeywordType.Unknown } }
                .Concat(GivenStepKeywords.Select(kw => new { Keyword = kw, Type = StepKeywordType.Context }))
                .Concat(WhenStepKeywords.Select(kw => new { Keyword = kw, Type = StepKeywordType.Action }))
                .Concat(ThenStepKeywords.Select(kw => new { Keyword = kw, Type = StepKeywordType.Outcome }))
                .Concat(AndStepKeywords.Select(kw => new { Keyword = kw, Type = StepKeywordType.Conjunction }))
                .Concat(ButStepKeywords.Select(kw => new { Keyword = kw, Type = StepKeywordType.Conjunction }))
                .GroupBy(item => item.Keyword, item => item.Type)
                .ToDictionary(item => item.Key, item => item.First());
        }

        public StepKeywordType? GetStepKeywordType(string keyword) 
            => StepKeywordTypes.TryGetValue(keyword, out var tokenType) ? tokenType : null;
    }
}
