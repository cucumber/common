using System;
using NUnit.Framework;

namespace Gherkin.Specs
{
    [TestFixture]
    public class StringUtilseTests
    {
        [Test]
        public void StartsWithWorks()
        {
            var bookEmoji = "\ud83d\udcd5";
            var zzzzEmoji = "\ud83d\udca4";

            Assert.IsTrue(StringUtils.StartsWith(bookEmoji+"abc", bookEmoji));
            Assert.IsFalse(StringUtils.StartsWith(bookEmoji+"abc", zzzzEmoji));
        }

        [Test]
        public void StartsWithTitleLineWorks()
        {
            var bookEmoji = "\ud83d\udcd5";
            Assert.AreEqual (1, StringUtils.CountSymbols(bookEmoji));
        }
    }
}
