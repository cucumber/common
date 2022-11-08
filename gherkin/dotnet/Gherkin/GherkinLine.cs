﻿using System;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Linq;
using Gherkin.Ast;

namespace Gherkin
{
    public class GherkinLine : IGherkinLine
    {
        private static char[] inlineWhitespaceChars = new char[] { ' ', '\t', '\u00A0'};

        private readonly string lineText;
        private readonly string trimmedLineText;
        public int LineNumber { get; private set; }

        public GherkinLine(string line, int lineNumber)
        {
            this.LineNumber = lineNumber;

            this.lineText = line;
            this.trimmedLineText = this.lineText.TrimStart();
        }

        public void Detach()
        {
            //nop
        }

        public int Indent
        {
            get { return lineText.Length - trimmedLineText.Length; }
        }

        public bool IsEmpty()
        {
            return trimmedLineText.Length == 0;
        }

        public bool StartsWith(string text)
        {
            return trimmedLineText.StartsWith(text);
        }

        public bool StartsWithTitleKeyword(string text)
        {
            return StringUtils.StartsWith(trimmedLineText, text) &&
                StartsWithFrom(trimmedLineText, text.Length, GherkinLanguageConstants.TITLE_KEYWORD_SEPARATOR);
        }

        private static bool StartsWithFrom(string text, int textIndex, string value)
        {
            return string.CompareOrdinal(text, textIndex, value, 0, value.Length) == 0;
        }

        public string GetLineText(int indentToRemove)
        {
            if (indentToRemove < 0 || indentToRemove > Indent)
                return trimmedLineText;

            return lineText.Substring(indentToRemove);
        }

        public string GetRestTrimmed(int length)
        {
            return trimmedLineText.Substring(length).Trim();
        }

        public IEnumerable<GherkinLineSpan> GetTags()
        {
            var uncommentedLine = Regex.Split(trimmedLineText, @"\s" + GherkinLanguageConstants.COMMENT_PREFIX)[0];
            int position = Indent;
            foreach (string item in uncommentedLine.Split(GherkinLanguageConstants.TAG_PREFIX[0]))
            {
                if (item.Length > 0)
                {
                    var tagName = GherkinLanguageConstants.TAG_PREFIX + item.TrimEnd(inlineWhitespaceChars);
                    if (tagName.Length == 1)
                        continue;

                    if (tagName.IndexOfAny(inlineWhitespaceChars) >= 0)
                        throw new InvalidTagException("A tag may not contain whitespace", new Location(LineNumber, position));

                    yield return new GherkinLineSpan(position, tagName);
                    position += item.Length;
                }
                position++; // separator
            }
        }
        
        public IEnumerable<GherkinLineSpan> GetTableCells()
        {
            var items = SplitCells(trimmedLineText).ToList();
            bool isBeforeFirst = true;
            foreach (var item in items.Take(items.Count - 1)) // skipping the one after last
            {
                if (!isBeforeFirst)
                {
                    int trimmedStart;
                    var cellText = Trim(item.Item1, out trimmedStart);
                    var cellPosition = item.Item2 + trimmedStart;

                    if (cellText.Length == 0)
                        cellPosition = item.Item2;

                    yield return new GherkinLineSpan(Indent + cellPosition + 1, cellText);
                }

                isBeforeFirst = false;
            }
        }

        private IEnumerable<Tuple<string, int>> SplitCells(string row)
        {
            var rowEnum = row.GetEnumerator();            

            string cell = "";
            int pos = 0;
            int startPos = 0;
            while (rowEnum.MoveNext()) {
                pos++;
                char c = rowEnum.Current;
                if (c.ToString() == GherkinLanguageConstants.TABLE_CELL_SEPARATOR) {
                    yield return Tuple.Create(cell, startPos);
                    cell = "";
                    startPos = pos;
                } else if (c == GherkinLanguageConstants.TABLE_CELL_ESCAPE_CHAR) {
                    rowEnum.MoveNext();
                    pos++;
                    c = rowEnum.Current;
                    if (c == GherkinLanguageConstants.TABLE_CELL_NEWLINE_ESCAPE) {
                        cell += "\n";
                    } else {
                        if (c.ToString() != GherkinLanguageConstants.TABLE_CELL_SEPARATOR && c != GherkinLanguageConstants.TABLE_CELL_ESCAPE_CHAR) {
                            cell += GherkinLanguageConstants.TABLE_CELL_ESCAPE_CHAR;
                        }
                        cell += c;
                    }
                } else {
                    cell += c;
                }
            }
            yield return Tuple.Create(cell, startPos);
        }

        private string Trim(string s, out int trimmedStart)
        {
            trimmedStart = 0;
            while (trimmedStart < s.Length && inlineWhitespaceChars.Contains(s[trimmedStart]))
                trimmedStart++;

            return s.Trim(inlineWhitespaceChars);
        }
    }
}
