using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;
using Gherkin.Ast;
using NUnit.Framework;

namespace Gherkin.Specs
{
    [TestFixture]
    public class ParserErrorSerializationTests
    {
        private T SerializeDeserialize<T>(T obj)
        {
            var formatter = new BinaryFormatter();
            var stream = new MemoryStream();
            formatter.Serialize(stream, obj);
            stream.Position = 0;

            return (T)formatter.Deserialize(stream);
        }

        private static void AssertMessageAndLocation(ParserException exception, ParserException deserializedException)
        {
            Assert.AreEqual(exception.Message, deserializedException.Message);
            Assert.IsNotNull(deserializedException.Location);
            Assert.AreEqual(exception.Location.Line, deserializedException.Location.Line);
            Assert.AreEqual(exception.Location.Column, deserializedException.Location.Column);
        }

        [Test]
        public void AstBuilderExceptionShouldBeSerializable()
        {
            var exception = new AstBuilderException("sample message", new Location(1, 2));

            var deserializedException = SerializeDeserialize(exception);

            AssertMessageAndLocation(exception, deserializedException);
        }

        [Test]
        public void NoSuchLanguageExceptionShouldBeSerializable()
        {
            var exception = new NoSuchLanguageException("sample message", new Location(1, 2));

            var deserializedException = SerializeDeserialize(exception);

            AssertMessageAndLocation(exception, deserializedException);
        }

        [Test]
        public void NoSuchLanguageExceptionWithNoLocationShouldBeSerializable()
        {
            var exception = new NoSuchLanguageException("sample message");

            var deserializedException = SerializeDeserialize(exception);

            Assert.AreEqual(exception.Message, deserializedException.Message);
            Assert.IsNull(deserializedException.Location);
        }

        [Test]
        public void UnexpectedTokenExceptionShouldBeSerializableButOnlyMessageAndLocation()
        {
            var token = new Token(null, new Location(1, 2));
            var exception = new UnexpectedTokenException(token, new []{ "#T1", "#T2 "}, "state-comment");

            var deserializedException = SerializeDeserialize(exception);

            AssertMessageAndLocation(exception, deserializedException);

            // the custom details are not serialized (yet?)
            Assert.IsNull(deserializedException.ReceivedToken);
            Assert.IsNull(deserializedException.ExpectedTokenTypes);
            Assert.IsNull(deserializedException.StateComment);
        }

        [Test]
        public void UnexpectedEOFExceptionShouldBeSerializableButOnlyMessageAndLocation()
        {
            var token = new Token(null, new Location(1, 2));
            var exception = new UnexpectedEOFException(token, new []{ "#T1", "#T2 "}, "state-comment");

            var deserializedException = SerializeDeserialize(exception);

            AssertMessageAndLocation(exception, deserializedException);

            // the custom details are not serialized (yet?)
            Assert.IsNull(deserializedException.ExpectedTokenTypes);
            Assert.IsNull(deserializedException.StateComment);
        }

        [Test]
        public void CompositeParserExceptionShouldBeSerializable()
        {
            var exception = new CompositeParserException(new ParserException[]
            {
                new AstBuilderException("sample message", new Location(1, 2)), new NoSuchLanguageException("sample message")
            });

            var deserializedException = SerializeDeserialize(exception);

            Assert.AreEqual(exception.Message, deserializedException.Message);

            // the custom details are not serialized (yet?)
            Assert.IsNotNull(deserializedException.Errors);
            Assert.AreEqual(exception.Errors.Count(), deserializedException.Errors.Count());
            Assert.IsInstanceOf<AstBuilderException>(exception.Errors.First());
            Assert.IsInstanceOf<NoSuchLanguageException>(exception.Errors.Last());
        }
    }
}
