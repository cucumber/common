using System;
using System.Collections.Generic;
using System.Linq;
using Gherkin.Ast;

namespace Gherkin
{
    public abstract class ParserException : Exception
    {
        public Ast.Location Location { get; private set; }

        protected ParserException(string message, Ast.Location location = null) : base(GetMessage(message, location))
        {
            Location = location;
        }

        private static string GetMessage(string message, Ast.Location location)
        {
            if (location == null)
                return message;

            return string.Format("({0}:{1}): {2}", location.Line, location.Column, message);
        }

    }

    public class AstBuilderException : ParserException
    {
        public AstBuilderException(string message, Ast.Location location) : base(message, location)
        {
        }

    }

    public class NoSuchLanguageException : ParserException
    {
        public NoSuchLanguageException(string language, Ast.Location location = null) :
            base("Language not supported: " + language, location)
        {
            if (language == null) throw new ArgumentNullException("language");
        }

    }

    public abstract class TokenParserException : ParserException
    {
        protected TokenParserException(string message, Token receivedToken)
            : base(message, GetLocation(receivedToken))
        {
            if (receivedToken == null) throw new ArgumentNullException("receivedToken");
        }

        private static Ast.Location GetLocation(Token receivedToken)
        {
            return receivedToken.IsEOF || receivedToken.Location.Column > 1
                ? receivedToken.Location
                : new Ast.Location(receivedToken.Location.Line, receivedToken.Line.Indent + 1);
        }

    }

    public class UnexpectedTokenException : TokenParserException
    {
        public string StateComment { get; private set; }

        public Token ReceivedToken { get; private set; }
        public string[] ExpectedTokenTypes { get; private set; }

        public UnexpectedTokenException(Token receivedToken, string[] expectedTokenTypes, string stateComment)
            : base(GetMessage(receivedToken, expectedTokenTypes), receivedToken)
        {
            if (receivedToken == null) throw new ArgumentNullException("receivedToken");
            if (expectedTokenTypes == null) throw new ArgumentNullException("expectedTokenTypes");

            ReceivedToken = receivedToken;
            ExpectedTokenTypes = expectedTokenTypes;
            StateComment = stateComment;
        }

        private static string GetMessage(Token receivedToken, string[] expectedTokenTypes)
        {
            return string.Format("expected: {0}, got '{1}'",
                string.Join(", ", expectedTokenTypes),
                receivedToken.GetTokenValue().Trim());
        }

    }

    public class UnexpectedEOFException : TokenParserException
    {
        public string StateComment { get; private set; }
        public string[] ExpectedTokenTypes { get; private set; }
        public UnexpectedEOFException(Token receivedToken, string[] expectedTokenTypes, string stateComment)
            : base(GetMessage(expectedTokenTypes), receivedToken)
        {
            if (receivedToken == null) throw new ArgumentNullException("receivedToken");
            if (expectedTokenTypes == null) throw new ArgumentNullException("expectedTokenTypes");

            ExpectedTokenTypes = expectedTokenTypes;
            StateComment = stateComment;
        }

        private static string GetMessage(string[] expectedTokenTypes)
        {
            return string.Format("unexpected end of file, expected: {0}",
                string.Join(", ", expectedTokenTypes));
        }
    }

    public class CompositeParserException : ParserException
    {
        public IEnumerable<ParserException> Errors { get; private set; }

        public CompositeParserException(ParserException[] errors)
            : base(GetMessage(errors))
        {
            if (errors == null) throw new ArgumentNullException("errors");

            Errors = errors;
        }

        private static string GetMessage(ParserException[] errors)
        {
            return "Parser errors:" + Environment.NewLine + string.Join(Environment.NewLine, errors.Select(e => e.Message));
        }
    }
}