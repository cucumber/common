using System;
using System.Linq;

namespace Gherkin.TokensGenerator
{
    class TestTokenFormatter
    {
        public string FormatToken(Token token)
        {
            if (token.IsEOF)
                return "EOF";

            return string.Format("({0}:{1}){2}:{3}/{4}/{5}", 
                token.Location.Line,
                token.Location.Column,
                token.MatchedType,
                token.MatchedKeyword,
                token.MatchedText,
                token.MatchedItems == null ? "" : string.Join(",", token.MatchedItems.Select(i => i.Column + ":" + i.Text))
                );
        }
    }
}
