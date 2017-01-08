namespace Gherkin
{
    public struct GherkinLineSpan
    {
        /// <summary>
        /// One-based line position
        /// </summary>
        public int Column { get; private set; }

        /// <summary>
        /// Text part of the line
        /// </summary>
        public string Text { get; private set; }

        public GherkinLineSpan(int column, string text) : this()
        {
            Column = column;
            Text = text;
        }
    }
}
