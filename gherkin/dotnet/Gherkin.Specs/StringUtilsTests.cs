using System;
using Xunit;

namespace Gherkin.Specs
{
    public class StringUtilseTests
    {
        [Fact]
        public void StartsWithWorks()
        {
            var bookEmoji = "\ud83d\udcd5";
            var zzzzEmoji = "\ud83d\udca4";

            Assert.True(StringUtils.StartsWith(bookEmoji+"abc", bookEmoji));
            Assert.False(StringUtils.StartsWith(bookEmoji+"abc", zzzzEmoji));
        }

        [Fact]
        public void StartsWithTitleLineWorks()
        {
            var bookEmoji = "\ud83d\udcd5";
            Assert.Equal(1, StringUtils.CountSymbols(bookEmoji));
        }
    }
}
