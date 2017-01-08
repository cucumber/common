using System.IO;
using Gherkin.Ast;

namespace Gherkin
{
    public class Parser : Parser<GherkinDocument>
    {
        public Parser()
        {
        }

        public Parser(IAstBuilder<GherkinDocument> astBuilder)
            : base (astBuilder)
        {
        }

        public GherkinDocument Parse(TextReader reader)
        {
            return Parse(new TokenScanner(reader));
        }

        public GherkinDocument Parse(string sourceFile)
        {
            using (var reader = new StreamReader(sourceFile))
            {
                return Parse(new TokenScanner(reader));
            }
        }
    }
}
