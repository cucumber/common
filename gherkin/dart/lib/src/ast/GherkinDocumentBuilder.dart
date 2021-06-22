import 'package:gherkin/ast.dart';
import 'package:gherkin/exceptions.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/parser.dart';
import 'package:gherkin/collections.dart';
import 'package:gherkin/language.dart';

import 'AstNode.dart';
import 'Background.dart';
import 'Comment.dart';
import 'DocString.dart';
import 'Examples.dart';
import 'Feature.dart';
import 'GherkinDocument.dart';
import 'DataTable.dart';
import 'Rule.dart';
import 'Scenario.dart';
import 'TableCell.dart';
import 'TableRow.dart';
import 'Step.dart';
import 'StepArgument.dart';
import 'Tag.dart';

class GherkinDocumentBuilder
    extends AstRulesBuilder
    implements IBuilder<GherkinDocument>
{
  final IdGenerator idGenerator;
  final Stack<AstNode> _stack = Stack<AstNode>();
  final List<Comment> _comments = <Comment>[];

  GherkinDocumentBuilder(this.idGenerator) {
    reset();
  }

  AstNode get _currentNode => _stack.top;

  @override
  void build(Token token) {
    if (token.matchedType == TokenType.Comment) {
      _comments.add(Comment(_getLocation(token), token.matchedText));
    }
    else {
      _currentNode.add(token.matchedType.toRuleType(), token);
    }
  }

  @override
  void endRule(RuleType ruleType) {
    var node = _stack.pop();
    var transformedNode = _getTransformedNode(node, _comments);
    _currentNode.add(node.ruleType, transformedNode);
  }

  @override
  void reset() {
    _stack.clear();
    _stack.push(AstNode(RuleType.None));
    _comments.clear();
  }

  @override
  GherkinDocument get result
    => _currentNode.singleOrDefault<GherkinDocument>(RuleType.GherkinDocument
        , GherkinDocument.empty);

  @override
  void startRule(RuleType ruleType)
    => _stack.push(AstNode(ruleType));
}

abstract class AstRulesBuilder
    implements IBuilder<GherkinDocument>
{
  dynamic _getTransformedNode(AstNode node, List<Comment> comments) {
    switch (node.ruleType) {
      case RuleType.Step:
        return _createStep(node);
      case RuleType.DocString:
        return _createDocString(node);
      case RuleType.DataTable:
        return _createDataTable(node);
      case RuleType.Background:
        return _createBackground(node);
      case RuleType.ScenarioDefinition:
        return _createScenario(node);
      case RuleType.ExamplesDefinition:
        return _createExamplesDefinition(node);
      case RuleType.ExamplesTable:
        return _getTableRows(node);
      case RuleType.Description:
        return _createDescription(node);
      case RuleType.Feature:
        return _createFeature(node);
      case RuleType.Rule:
        return _createRule(node);
      case RuleType.GherkinDocument:
        return _createGherkinDocument(node, comments);
      default:
        return node;
    }
  }

  Step _createStep(AstNode node) {
    var stepLine = node.getToken(TokenType.StepLine);
    var stepArg = node.singleOrDefault<StepArgument>(RuleType.DataTable
        , StepArgument.empty);
    if( stepArg.isEmpty ) {
      stepArg = node.singleOrDefault<StepArgument>(RuleType.DocString
          , StepArgument.empty);
    }
    return Step(_getLocation(stepLine), stepLine.matchedKeyword
        , stepLine.matchedText, stepArg );
  }

  Location _getLocation(Token token, [int column=0])
    => column == 0 ? token.location : Location(token.location.line, column);

  DocString _createDocString(AstNode node) {
    var separatorToken = node.getTokens(TokenType.DocStringSeparator).first;
    var contentType = separatorToken.matchedText.isEmpty
        ? Strings.empty
        : separatorToken.matchedText;
    var lineTokens = node.getTokens(TokenType.Other);
    var content = lineTokens.map((lt) => lt.matchedText).toList().join('\n');
    return DocString(_getLocation(separatorToken), contentType, content);
  }

  DataTable _createDataTable(AstNode node) {
    var rows = _getTableRows(node);
    return DataTable.newInstance(rows);
  }

  List<TableRow> _getTableRows(AstNode node) {
    var tokens = node.getTokens(TokenType.TableRow);
    var rows = tokens.map((token)
      => TableRow(_getLocation(token), _getCells(token))
    ).toList();
    _checkCellCountConsistency(rows);
    return rows;
  }

  List<TableCell> _getCells(Token token)
    => token.matchedItems.map((item)
      => _createTableCell(_getLocation(token, item.column), item.text)
    ).toList();

  TableCell _createTableCell(Location location, String text)
    => TableCell(location, text);

  void _checkCellCountConsistency(List<TableRow> rows) {
    if (rows.isNotEmpty) {
      var cellCount = rows[0].cells.length;
      for (var row in rows) {
        if (row.cells.length != cellCount) {
          _handleAstError(
            'inconsistent cell count within the table', row.location);
        }
      }
    }
  }

  void _handleAstError(String message, Location location)
    => throw AstBuilderException(message, location);

  Background _createBackground(AstNode node) {
    var backgroundLine = node.getToken(TokenType.BackgroundLine);
    var description = _getDescription(node);
    var steps = _getSteps(node);
    return Background(_getLocation(backgroundLine)
        , backgroundLine.matchedKeyword, backgroundLine.matchedText
        , description, steps);
  }

  Scenario _createScenario(AstNode node) {
    var tags = _getTags(node);

    var scenarioNode = node.singleOrDefault<AstNode>(RuleType.Scenario
      , AstNode.empty );
    var scenarioLine = scenarioNode.getToken(TokenType.ScenarioLine);

    var description = _getDescription(scenarioNode);
    var steps =_getSteps(scenarioNode);
    var examples = scenarioNode.items<Examples>(RuleType.ExamplesDefinition).toList();
    return Scenario(tags, _getLocation(scenarioLine)
        , scenarioLine.matchedKeyword, scenarioLine.matchedText, description
        , steps, examples);
  }

  String _getDescription(AstNode scenarioDefinitionNode)
    => scenarioDefinitionNode.singleOrDefault<String>(RuleType.Description
        , Strings.empty);

  List<Step> _getSteps(AstNode scenarioDefinitionNode)
    => scenarioDefinitionNode.items<Step>(RuleType.Step).toList();

  Examples _createExamplesDefinition(AstNode node) {
    var tags = _getTags(node);
    var examplesNode = node.singleOrDefault<AstNode>(RuleType.Examples
        , AstNode.empty);
    var examplesLine = examplesNode.getToken(TokenType.ExamplesLine);
    var description = _getDescription(examplesNode);

    var allRows = examplesNode.singleOrDefault<List<TableRow>>(
        RuleType.ExamplesTable
      , const <TableRow>[] );

    var header = allRows.isEmpty ? TableRow.empty : allRows.first;
    var rows = allRows.isEmpty ? <TableRow>[] : allRows.skip(1).toList();
    return Examples(tags, _getLocation(examplesLine), examplesLine.matchedKeyword,
      examplesLine.matchedText, description, header, rows);
  }

  List<Tag> _getTags(AstNode node) {
    var tagsNode = node.singleOrDefault<AstNode>(RuleType.Tags, AstNode.empty);
    if (tagsNode.isEmpty) {
      return <Tag>[];
    }

    var tokens = tagsNode.getTokens(TokenType.TagLine);

    return tokens.expand((token)
        => token.matchedItems.map((tagItem)
            => _createTag(_getLocation(token, tagItem.column), tagItem.text))
      )
      .cast<Tag>().toList();
  }

  Tag _createTag(Location location, String name)
    => Tag(location, name);

  String _createDescription(AstNode node) {
    var lineTokens = node.getTokens(TokenType.Other)
        .cast<Token>()
        .toList();

    // Trim trailing empty lines
    var reversed = lineTokens.reversed;

    var skipped = reversed.skipWhile((token) =>
        token.matchedText.isEmptyOrWhiteSpace
    ).toList();

    lineTokens = skipped.reversed.toList();

    return lineTokens.map((lt) => lt.matchedText).toList().join('\n');
  }

  Feature _createFeature(AstNode node) {
    var header = node.singleOrDefault<AstNode>(RuleType.FeatureHeader
      , AstNode.empty );
    if(header.isEmpty) {
      return Feature.empty;
    }

    var tags = _getTags(header);

    var featureLine = header.getToken(TokenType.FeatureLine);
    if(featureLine.isEmpty) {
      return Feature.empty;
    }

    var children = <FeatureChild>[];

    final background = node.singleOrDefault<Background>(RuleType.Background
        , Background.empty);
    if (background.isNotEmpty) {
      final featureChild = FeatureChild.fromBackground(background);
      children.add(featureChild);
    }

    final scenarios = node.items<Scenario>(RuleType.ScenarioDefinition);
    for( var scenario in scenarios ) {
      final featureChild = FeatureChild.fromScenario(scenario);
      children.add(featureChild);
    }

    final rules = node.items<Rule>(RuleType.Rule);
    for( var rule in rules ) {
      final featureChild = FeatureChild.fromRule(rule);
      children.add(featureChild);
    }

    var description = _getDescription(header);
    if(featureLine.matchedGherkinDialect.isEmpty) {
      return Feature.empty;
    }
    var language = featureLine.matchedGherkinDialect.language;

    return Feature(tags, _getLocation(featureLine), language,
      featureLine.matchedKeyword, featureLine.matchedText, description,
      children);
  }

  Rule _createRule(AstNode node) {
    var header = node.singleOrDefault<AstNode>(RuleType.RuleHeader
        , AstNode.empty);
    if (header.isEmpty) {
      return Rule.empty;
    }

    var ruleLine = header.getToken(TokenType.RuleLine);
    if (ruleLine.isEmpty) {
      return Rule.empty;
    }

    var children = <RuleChild>[];
    var background = node.singleOrDefault<Background>(RuleType.Background
      , Background.empty );
    if (background.isNotEmpty)
    {
      final child = RuleChild.fromBackground(background);
      children.add(child);
    }

    final scenarios = node.items<Scenario>(RuleType.ScenarioDefinition);
    for( var scenario in scenarios ) {
      final child = RuleChild.fromScenario(scenario);
      children.add(child);
    }

    if (ruleLine.matchedGherkinDialect.isEmpty) {
      return Rule.empty;
    }

    var description = _getDescription(header);

    return Rule(_getLocation(ruleLine), ruleLine.matchedKeyword,
        ruleLine.matchedText, description, children);
  }

  GherkinDocument _createGherkinDocument(AstNode node, List<Comment> comments) {
    var feature = node.singleOrDefault<Feature>(RuleType.Feature, Feature.empty);
    return GherkinDocument(feature, comments);
  }
}
