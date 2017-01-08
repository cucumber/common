using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using Gherkin.Ast;

namespace Gherkin
{
    public abstract class ParserException : Exception
    {
        public Location Location { get; private set; }

        protected ParserException(string message, Location location = null) : base(GetMessage(message, location))
        {
            Location = location;
        }

        private static string GetMessage(string message, Location location)
        {
            if (location == null)
                return message;

            return string.Format("({0}:{1}): {2}", location.Line, location.Column, message);
        }

        protected ParserException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
            Location = (Location)info.GetValue("Location", typeof(Location));
        }

        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            base.GetObjectData(info, context);
            info.AddValue("Location", Location);
        }
    }

    [Serializable]
    public class AstBuilderException : ParserException
    {
        public AstBuilderException(string message, Location location) : base(message, location)
        {
        }

        protected AstBuilderException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }

    [Serializable]
    public class NoSuchLanguageException : ParserException
    {
        public NoSuchLanguageException(string language, Location location = null) :
            base("Language not supported: " + language, location)
        {
            if (language == null) throw new ArgumentNullException("language");
        }

        protected NoSuchLanguageException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }

    public abstract class TokenParserException : ParserException
    {
        protected TokenParserException(string message, Token receivedToken)
            : base(message, GetLocation(receivedToken))
        {
            if (receivedToken == null) throw new ArgumentNullException("receivedToken");
        }

        private static Location GetLocation(Token receivedToken)
        {
            return receivedToken.IsEOF || receivedToken.Location.Column > 1
                ? receivedToken.Location
                : new Location(receivedToken.Location.Line, receivedToken.Line.Indent + 1);
        }

        protected TokenParserException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }

    [Serializable]
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

        protected UnexpectedTokenException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }

    [Serializable]
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

        protected UnexpectedEOFException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }

    [Serializable]
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

        protected CompositeParserException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
            Errors = (ParserException[])info.GetValue("Errors", typeof (ParserException[]));
        }

        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            base.GetObjectData(info, context);
            info.AddValue("Errors", Errors.ToArray());
        }
    }
}