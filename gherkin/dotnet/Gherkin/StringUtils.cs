using System.Globalization;

namespace Gherkin
{
    public class StringUtils
    {
        // string.StartsWith(string) is broken on Mono for strings outside
        // the Basic Multilingual Plane (BMP). We have to roll our own so
        // it works with Emoji characters.
        public static bool StartsWith(string a, string b) 
        {
            return StartsWith (a.ToCharArray(), b.ToCharArray());
        }

        private static bool StartsWith(char[] a, char[] b) 
        {
            if (a.Length < b.Length)
                return false;
            for (int i = 0; i < b.Length; i++)
            {
                if (a [i] != b [i])
                    return false;
            }
            return true;
        }

        public static int CountSymbols(string s)
        {
            return new StringInfo (s).LengthInTextElements;
        }
    }
}

