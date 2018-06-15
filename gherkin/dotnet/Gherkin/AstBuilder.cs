using System;
using System.Collections.Generic;
using System.Linq;
using Gherkin.Ast;

namespace Gherkin
{
    public class AstBuilder<T> : IAstBuilder<T>
    {
        private readonly Stack<AstNode> stack = new Stack<AstNode>();
        private AstNode CurrentNode { get { return stack.Peek(); } }
        private List<Comment> comments = new List<Comment>();

        public AstBuilder()
        {
            Reset();
        }

        public void Reset()
        {
            stack.Clear();
            stack.Push(new AstNode(RuleType.None));
            comments.Clear();
        }

        public void Build(Token token)
        {
            if (token.MatchedType == TokenType.Comment)
            {
                comments.Add(CreateComment(GetLocation(token), token.MatchedText));
            }
            else
            {
                CurrentNode.Add((RuleType) token.MatchedType, token);
            }
        }

        public void StartRule(RuleType ruleType)
        {
            stack.Push(new AstNode(ruleType));
        }

        public void EndRule(RuleType ruleType)
        {
            var node = stack.Pop();
            object transformedNode = GetTransformedNode(node);
            CurrentNode.Add(node.RuleType, transformedNode);
        }

        public T GetResult()
        {
            return CurrentNode.GetSingle<T>(RuleType.GherkinDocument);
        }

        private object GetTransformedNode(AstNode node)
        {
            switch (node.RuleType)
            {
                case RuleType.Step:
                {
                    var stepLine = node.GetToken(TokenType.StepLine);
                    var stepArg = node.GetSingle<StepArgument>(RuleType.DataTable) ??
                                  node.GetSingle<StepArgument>(RuleType.DocString) ??
                                  null; // empty arg
                    return CreateStep(GetLocation(stepLine), stepLine.MatchedKeyword, stepLine.MatchedText, stepArg, node);
                }
                case RuleType.DocString:
                {
                    var separatorToken = node.GetTokens(TokenType.DocStringSeparator).First();
                    var contentType = separatorToken.MatchedText.Length == 0 ? null : separatorToken.MatchedText;
                    var lineTokens = node.GetTokens(TokenType.Other);
                    var content = string.Join(Environment.NewLine, lineTokens.Select(lt => lt.MatchedText));

                    return CreateDocString(GetLocation(separatorToken), contentType, content, node);
                }
                case RuleType.DataTable:
                {
                    var rows = GetTableRows(node);
                    return CreateDataTable(rows, node);
                }
                case RuleType.Background:
                {
                    var backgroundLine = node.GetToken(TokenType.BackgroundLine);
                    var description = GetDescription(node);
                    var steps = GetSteps(node);
                    return CreateBackground(GetLocation(backgroundLine), backgroundLine.MatchedKeyword, backgroundLine.MatchedText, description, steps, node);
                }
                case RuleType.ScenarioDefinition:
                {
                    var tags = GetTags(node);

                    var scenarioNode = node.GetSingle<AstNode>(RuleType.Scenario);
                    var scenarioLine = scenarioNode.GetToken(TokenType.ScenarioLine);

                    var description = GetDescription(scenarioNode);
                    var steps = GetSteps(scenarioNode);
                    var examples = scenarioNode.GetItems<Examples>(RuleType.ExamplesDefinition).ToArray();
                    return CreateScenario(tags, GetLocation(scenarioLine), scenarioLine.MatchedKeyword, scenarioLine.MatchedText, description, steps, examples, node);
                }
                case RuleType.ExamplesDefinition:
                {
                    var tags = GetTags(node);
                    var examplesNode = node.GetSingle<AstNode>(RuleType.Examples);
                    var examplesLine = examplesNode.GetToken(TokenType.ExamplesLine);
                    var description = GetDescription(examplesNode);

                    var allRows = examplesNode.GetSingle<TableRow[]>(RuleType.ExamplesTable);
                    var header = allRows != null ? allRows.First() : null;
                    var rows = allRows != null ? allRows.Skip(1).ToArray() : null;
                    return CreateExamples(tags, GetLocation(examplesLine), examplesLine.MatchedKeyword, examplesLine.MatchedText, description, header, rows, node);
                }
                case RuleType.ExamplesTable:
                {
                    return GetTableRows(node);
                }
                case RuleType.Description:
                {
                    var lineTokens = node.GetTokens(TokenType.Other);

                    // Trim trailing empty lines
                    lineTokens = lineTokens.Reverse().SkipWhile(t => string.IsNullOrWhiteSpace(t.MatchedText)).Reverse();

                    return string.Join(Environment.NewLine, lineTokens.Select(lt => lt.MatchedText));
                }
                case RuleType.Feature:
                {
                    var header = node.GetSingle<AstNode>(RuleType.FeatureHeader);
                    if(header == null) return null;
                    var tags = GetTags(header);
                    var featureLine = header.GetToken(TokenType.FeatureLine);
                    if(featureLine == null) return null;
                    var children = new List<StepsContainer> ();
                    var background = node.GetSingle<Background>(RuleType.Background);
                    if (background != null) 
                    {
                        children.Add (background);
                    }
                    var childrenEnumerable = children.Concat(node.GetItems<StepsContainer>(RuleType.ScenarioDefinition));
                    var description = GetDescription(header);
                    if(featureLine.MatchedGherkinDialect == null) return null;
                    var language = featureLine.MatchedGherkinDialect.Language;

                    return CreateFeature(tags, GetLocation(featureLine), language, featureLine.MatchedKeyword, featureLine.MatchedText, description, childrenEnumerable.ToArray(), node);
                }
                case RuleType.GherkinDocument:
                {
                    var feature = node.GetSingle<Feature>(RuleType.Feature);

                    return CreateGherkinDocument(feature, comments.ToArray(), node);
                }
            }

            return node;
        }

        protected virtual Background CreateBackground(Location location, string keyword, string name, string description, Step[] steps, AstNode node)
        {
            return new Background(location, keyword, name, description, steps);
        }

        protected virtual DataTable CreateDataTable(TableRow[] rows, AstNode node)
        {
            return new DataTable(rows);
        }

        protected virtual Comment CreateComment(Location location, string text)
        {
            return new Comment(location, text);
        }

        protected virtual Examples CreateExamples(Tag[] tags, Location location, string keyword, string name, string description, TableRow header, TableRow[] body, AstNode node)
        {
            return new Examples(tags, location, keyword, name, description, header, body);
        }

        protected virtual Scenario CreateScenario(Tag[] tags, Location location, string keyword, string name, string description, Step[] steps, Examples[] examples, AstNode node)
        {
            return new Scenario(tags, location, keyword, name, description, steps, examples);
        }

        protected virtual DocString CreateDocString(Location location, string contentType, string content, AstNode node)
        {
            return new DocString(location, contentType, content);
        }

        protected virtual Step CreateStep(Location location, string keyword, string text, StepArgument argument, AstNode node)
        {
            return new Step(location, keyword, text, argument);
        }

        protected virtual GherkinDocument CreateGherkinDocument(Feature feature, Comment[] gherkinDocumentComments, AstNode node) {
            return new GherkinDocument(feature, gherkinDocumentComments);
        }

        protected virtual Feature CreateFeature(Tag[] tags, Location location, string language, string keyword, string name, string description, StepsContainer[] children, AstNode node)
        {
            return new Feature(tags, location, language, keyword, name, description, children);
        }
        protected virtual Tag CreateTag(Location location, string name, AstNode node)
        {
            return new Tag(location, name);
        }

        protected virtual Location CreateLocation(int line, int column)
        {
            return new Location(line, column);
        }

        protected virtual TableRow CreateTableRow(Location location, TableCell[] cells, AstNode node)
        {
            return new TableRow(location, cells);
        }

        protected virtual TableCell CreateTableCell(Location location, string value)
        {
            return new TableCell(location, value);
        }

        private Location GetLocation(Token token, int column = 0)
        {
            return column == 0 ? token.Location : CreateLocation(token.Location.Line, column);
        }

        private Tag[] GetTags(AstNode node)
        {
            var tagsNode = node.GetSingle<AstNode>(RuleType.Tags);
            if (tagsNode == null)
                return new Tag[0];

            return tagsNode.GetTokens(TokenType.TagLine)
                .SelectMany(t => t.MatchedItems, (t, tagItem) =>
                    CreateTag(GetLocation(t, tagItem.Column), tagItem.Text, tagsNode))
                .ToArray();
        }

        private TableRow[] GetTableRows(AstNode node)
        {
            var rows = node.GetTokens(TokenType.TableRow).Select(token => CreateTableRow(GetLocation(token), GetCells(token), node)).ToArray();
            CheckCellCountConsistency(rows);
            return rows;
        }

        protected virtual void CheckCellCountConsistency(TableRow[] rows)
        {
            if (rows.Length == 0)
                return;

            int cellCount = rows[0].Cells.Count();
            foreach (var row in rows)
            {
                if (row.Cells.Count() != cellCount)
                {
                    HandleAstError("inconsistent cell count within the table", row.Location);
                }
            }
        }

        protected virtual void HandleAstError(string message, Location location)
        {
            throw new AstBuilderException(message, location);
        }

        private TableCell[] GetCells(Token tableRowToken)
        {
            return tableRowToken.MatchedItems
                .Select(cellItem => CreateTableCell(GetLocation(tableRowToken, cellItem.Column), cellItem.Text))
                .ToArray();
        }

        private static Step[] GetSteps(AstNode scenarioDefinitionNode)
        {
            return scenarioDefinitionNode.GetItems<Step>(RuleType.Step).ToArray();
        }

        private static string GetDescription(AstNode scenarioDefinitionNode)
        {
            return scenarioDefinitionNode.GetSingle<string>(RuleType.Description);
        }
    }
}
