namespace Gherkin.Ast
{
    public class Step : IHasLocation
    {
        public Location Location { get; private set; }
        public string Keyword { get; private set; }
        public StepKeywordType KeywordType { get; }

        public string Text { get; private set; }
        public StepArgument Argument { get; private set; }

        public Step(Location location, string keyword, StepKeywordType keywordType, string text, StepArgument argument)
        {
            Location = location;
            Keyword = keyword;
            KeywordType = keywordType;
            Text = text;
            Argument = argument;
        }
    }
}