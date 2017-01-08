using System.IO;
using Gherkin.Ast;

namespace Gherkin
{
    /// <summary>
    /// The scanner reads a gherkin doc (typically read from a .feature file) and creates a token 
    /// for each line. 
    /// 
    /// The tokens are passed to the parser, which outputs an AST (Abstract Syntax Tree).
    /// 
    /// If the scanner sees a `#` language header, it will reconfigure itself dynamically to look 
    /// for  Gherkin keywords for the associated language. The keywords are defined in 
    /// gherkin-languages.json.
    /// </summary>
    public class TokenScanner : ITokenScanner
    {
        protected int lineNumber = 0;
        protected readonly TextReader reader;

        public TokenScanner(TextReader reader)
        {
            this.reader = reader;
        }

        public virtual Token Read()
        {
            var line = reader.ReadLine();
            var location = new Location(++lineNumber);
            return line == null ? new Token(null, location) : new Token(new GherkinLine(line, lineNumber), location);
        }
    }
}