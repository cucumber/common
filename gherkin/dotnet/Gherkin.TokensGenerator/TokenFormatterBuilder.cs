using System;
using System.Linq;
using System.Text;

namespace Gherkin.TokensGenerator
{
    class TokenFormatterBuilder : IAstBuilder<object>
    {
        private readonly TestTokenFormatter formatter = new TestTokenFormatter();
        private readonly StringBuilder tokensTextBuilder = new StringBuilder();

        public string GetTokensText()
        {
            return tokensTextBuilder.ToString();
        }

        public void Build(Token token)
        {
            tokensTextBuilder.AppendLine(formatter.FormatToken(token));
        }

        public void StartRule(RuleType ruleType)
        {
            //nop
        }

        public void EndRule(RuleType ruleType)
        {
            //nop
        }

        public object GetResult()
        {
            return new object();
        }

        public void Reset()
        {
            //nop
        }

    }
}