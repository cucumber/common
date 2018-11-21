using System;
using System.Text.RegularExpressions;
using System.Linq;
using Gherkin.Ast;

namespace Gherkin
{
    public class TokenMatcher : ITokenMatcher
    {
		private readonly Regex LANGUAGE_PATTERN = new Regex ("^\\s*#\\s*language\\s*:\\s*([a-zA-Z\\-_]+)\\s*$");
        private readonly IGherkinDialectProvider dialectProvider;
        private GherkinDialect currentDialect;
        private string activeDocStringSeparator = null;
        private int indentToRemove = 0;

        public GherkinDialect CurrentDialect
        {
            get
            {
                if (currentDialect == null)
                    currentDialect = dialectProvider.DefaultDialect;
                return currentDialect;
            }
        }

        public TokenMatcher(IGherkinDialectProvider dialectProvider = null)
        {
            this.dialectProvider = dialectProvider ?? new GherkinDialectProvider();
        }

        public TokenMatcher(string defaultLanguage) : this(new GherkinDialectProvider(defaultLanguage)) {
        }

        public void Reset()
        {
            activeDocStringSeparator = null;
            indentToRemove = 0;
            if (currentDialect != dialectProvider.DefaultDialect)
                currentDialect = dialectProvider.DefaultDialect;
        }

        protected virtual void SetTokenMatched(Token token, TokenType matchedType, string text = null, string keyword = null, int? indent = null, GherkinLineSpan[] items = null)
        {
            token.MatchedType = matchedType;
            token.MatchedKeyword = keyword;
            token.MatchedText = text;
            token.MatchedItems = items;
            token.MatchedGherkinDialect = CurrentDialect;
            token.MatchedIndent = indent ?? (token.Line == null ? 0 : token.Line.Indent);
            token.Location = new Ast.Location(token.Location.Line, token.MatchedIndent + 1);
        }

        public bool Match_EOF(Token token)
        {
            if (token.IsEOF)
            {
                SetTokenMatched(token, TokenType.EOF);
                return true;
            }
            return false;
        }

        public bool Match_Other(Token token)
        {
            var text = token.Line.GetLineText(indentToRemove); //take the entire line, except removing DocString indents
            SetTokenMatched(token, TokenType.Other, UnescapeDocString(text), indent: 0);
            return true;
        }

        public bool Match_Empty(Token token)
        {
            if (token.Line.IsEmpty())
            {
                SetTokenMatched(token, TokenType.Empty);
                return true;
            }
            return false;
        }

        public bool Match_Comment(Token token)
        {
            if (token.Line.StartsWith(GherkinLanguageConstants.COMMENT_PREFIX))
            {
                var text = token.Line.GetLineText(); //take the entire line
                SetTokenMatched(token, TokenType.Comment, text, indent: 0);
                return true;
            }
            return false;
        }

        private ParserException CreateTokenMatcherException(Token token, string message)
        {
            return new AstBuilderException(message, new Ast.Location(token.Location.Line, token.Line.Indent + 1));
        }

        public bool Match_Language(Token token)
        {
            var match = LANGUAGE_PATTERN.Match(token.Line.GetLineText());

            if (match.Success)
            {
                var language = match.Groups[1].Value;
                SetTokenMatched(token, TokenType.Language, language);

                try
                {
                    currentDialect = dialectProvider.GetDialect(language, token.Location);
                }
                catch (NotSupportedException ex)
                {
                    throw CreateTokenMatcherException(token, ex.Message);
                }

                return true;
            }
            return false;
        }

        public bool Match_TagLine(Token token)
        {
            if (token.Line.StartsWith(GherkinLanguageConstants.TAG_PREFIX))
            {
                SetTokenMatched(token, TokenType.TagLine, items: token.Line.GetTags().ToArray());
                return true;
            }
            return false;
        }

        public bool Match_FeatureLine(Token token)
        {
            return MatchTitleLine(token, TokenType.FeatureLine, CurrentDialect.FeatureKeywords);
        }

        public bool Match_RuleLine(Token token)
        {
            return MatchTitleLine(token, TokenType.RuleLine, CurrentDialect.RuleKeywords);
        }

        public bool Match_BackgroundLine(Token token)
        {
            return MatchTitleLine(token, TokenType.BackgroundLine, CurrentDialect.BackgroundKeywords);
        }

        public bool Match_ScenarioLine(Token token)
        {
            return MatchTitleLine(token, TokenType.ScenarioLine, CurrentDialect.ScenarioKeywords)
                || MatchTitleLine(token, TokenType.ScenarioLine, CurrentDialect.ScenarioOutlineKeywords);
        }

        public bool Match_ExamplesLine(Token token)
        {
            return MatchTitleLine(token, TokenType.ExamplesLine, CurrentDialect.ExamplesKeywords);
        }

        private bool MatchTitleLine(Token token, TokenType tokenType, string[] keywords)
        {
            foreach (var keyword in keywords)
            {
                if (token.Line.StartsWithTitleKeyword(keyword))
                {
                    var title = token.Line.GetRestTrimmed(keyword.Length + GherkinLanguageConstants.TITLE_KEYWORD_SEPARATOR.Length);
                    SetTokenMatched(token, tokenType, keyword: keyword, text: title);
                    return true;
                }
            }
            return false;
        }

        public bool Match_DocStringSeparator(Token token)
        {
            return activeDocStringSeparator == null
                // open
                ? Match_DocStringSeparator(token, GherkinLanguageConstants.DOCSTRING_SEPARATOR, true) ||
                  Match_DocStringSeparator(token, GherkinLanguageConstants.DOCSTRING_ALTERNATIVE_SEPARATOR, true)
                // close
                : Match_DocStringSeparator(token, activeDocStringSeparator, false);
        }

        private bool Match_DocStringSeparator(Token token, string separator, bool isOpen)
        {
            if (token.Line.StartsWith(separator))
            {
                string contentType = null;
                if (isOpen)
                {
                    contentType = token.Line.GetRestTrimmed(separator.Length);
                    activeDocStringSeparator = separator;
                    indentToRemove = token.Line.Indent;
                }
                else
                {
                    activeDocStringSeparator = null;
                    indentToRemove = 0;
                }

                SetTokenMatched(token, TokenType.DocStringSeparator, contentType, separator);
                return true;
            }
            return false;
        }


        public bool Match_StepLine(Token token)
        {
            var keywords = CurrentDialect.StepKeywords;
            foreach (var keyword in keywords)
            {
                if (token.Line.StartsWith(keyword))
                {
                    var stepText = token.Line.GetRestTrimmed(keyword.Length);
                    SetTokenMatched(token, TokenType.StepLine, keyword: keyword, text: stepText);
                    return true;
                }
            }
            return false;
        }

        public bool Match_TableRow(Token token)
        {
            if (token.Line.StartsWith(GherkinLanguageConstants.TABLE_CELL_SEPARATOR))
            {
                SetTokenMatched(token, TokenType.TableRow, items: token.Line.GetTableCells().ToArray());
                return true;
            }
            return false;
        }

        private string UnescapeDocString(string text)
        {
            return activeDocStringSeparator != null ? text.Replace("\\\"\\\"\\\"", "\"\"\"") : text;
        }
    }
}
