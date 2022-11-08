using System.Collections.Generic;

namespace Gherkin
{
    /// <summary>
    /// Represents a line of a Gherkin file
    /// </summary>
    public interface IGherkinLine
    {
        /// <summary>
        /// One-based line number
        /// </summary>
        int LineNumber { get; }

        /// <summary>
        /// Called by the parser to indicate non-streamed reading (e.g. during look-ahead).
        /// </summary>
        /// <remarks>
        /// If the implementation depends on streamed reading behavior, with this method, it can clone itself, so that it will be detached.
        /// </remarks>
        void Detach();

        /// <summary>
        /// The number of whitespace characters in the beginning of the line.
        /// </summary>
        int Indent { get; }

        /// <summary>
        /// Gets if the line is empty or contains whitespaces only.
        /// </summary>
        /// <returns>true, if empty or contains whitespaces only; otherwise, false.</returns>
        bool IsEmpty();

        /// <summary>
        /// Determines whether the beginning of the line (wihtout whitespaces) matches a specified string.
        /// </summary>
        /// <param name="text">The string to compare. </param>
        /// <returns>true if text matches the beginning of this line; otherwise, false.</returns>
        bool StartsWith(string text);

        /// <summary>
        /// Determines whether the beginning of the line (wihtout whitespaces) matches a specified title keyword (ie. a keyword followed by a ':' character).
        /// </summary>
        /// <param name="keyword">The keyword to compare. </param>
        /// <returns>true if keyword matches the beginning of this line and followed by a ':' character; otherwise, false.</returns>
        bool StartsWithTitleKeyword(string keyword);
        /// <summary>
        /// Returns the line text
        /// </summary>
        /// <param name="indentToRemove">The maximum number of whitespace characters to remove. -1 removes all leading whitespaces.</param>
        /// <returns>The line text.</returns>
        string GetLineText(int indentToRemove = 0);
        /// <summary>
        /// Returns the remaining part of the line.
        /// </summary>
        /// <param name="length"></param>
        /// <returns></returns>
        string GetRestTrimmed(int length);

        /// <summary>
        /// Tries parsing the line as a tag list, and returns the tags wihtout the leading '@' characters.
        /// </summary>
        /// <returns>(position,text) pairs, position is 0-based index</returns>
        IEnumerable<GherkinLineSpan> GetTags();

        /// <summary>
        /// Tries parsing the line as table row and returns the trimmed cell values.
        /// </summary>
        /// <returns>(position,text) pairs, position is 0-based index</returns>
        IEnumerable<GherkinLineSpan> GetTableCells();
    }
}
