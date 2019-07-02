using Xunit;
﻿using System.IO;
using static Io.Cucumber.Messages.PickleStepArgument.Types;

namespace Io.Cucumber.Messages.Specs
{
    public class MessagesSpec
    {
        [Fact]
        public void SerializesPickeDocString()
        {
            var pickleDocSring = new PickleDocString
            {
                Location = new Location
                {
                    Line = 10,
                    Column = 20
                },
                ContentType = "text/plain",
                Content = "some\ncontent\n"
            };

            byte[] serializedBytes;
            using (MemoryStream stream = new MemoryStream())
            {
                var codedOutputStream = new Google.Protobuf.CodedOutputStream(stream);
                codedOutputStream.WriteMessage(pickleDocSring);
                codedOutputStream.Flush();
                serializedBytes = stream.ToArray();
            }

            PickleDocString parsedCopy = PickleDocString.Parser.ParseDelimitedFrom(new MemoryStream(serializedBytes));
            Assert.Equal(pickleDocSring, parsedCopy);
        }
    }
}
