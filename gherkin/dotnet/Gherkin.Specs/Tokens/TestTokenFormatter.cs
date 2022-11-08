using System;
using System.Linq;

namespace Gherkin.Specs.Tokens
{
    class TestTokenFormatter
    {
        public string FormatToken(Token token)
        {
            if (token.IsEOF)
                return "EOF";

            string stepTypeText;
            switch (token.MatchedType)
            {
                case TokenType.FeatureLine:
                case TokenType.ScenarioLine:
                case TokenType.ExamplesLine:
                case TokenType.DocStringSeparator:
                case TokenType.BackgroundLine:
                case TokenType.RuleLine:
                    stepTypeText = "()";
                    break;
                case TokenType.StepLine:
                    var tokenType = token.MatchedGherkinDialect.GetStepKeywordType(token.MatchedKeyword);
                    stepTypeText = $"({tokenType})";
                    break;
                default:
                    stepTypeText = "";
                    break;
            }

            var matchedItemsText = token.MatchedItems == null ? "" : string.Join(",", token.MatchedItems.Select(i => i.Column + ":" + i.Text));

            return $"({token.Location.Line}:{token.Location.Column}){token.MatchedType}:{stepTypeText}{token.MatchedKeyword}/{token.MatchedText}/{matchedItemsText}";
        }
    }
}
