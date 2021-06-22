import 'dart:collection';
import 'package:gherkin/core.dart';
import 'package:gherkin/exceptions.dart';
import 'package:gherkin/language.dart';

import 'IBuilder.dart';
import 'ITokenMatcher.dart';
import 'ITokenScanner.dart';
import 'ParserContext.dart';
import 'RuleType.dart';

class Parser<T extends INullSafetyObject> {
  final IBuilder<T> _builder;

  bool stopAtFirstError = false;

  Parser(this._builder);

  T parse(ITokenScanner tokenScanner, ITokenMatcher tokenMatcher) {
    _builder.reset();
    tokenMatcher.reset();

    var context = ParserContext(
        tokenScanner,
        tokenMatcher,
        Queue<Token>(),
        <ParserException>[]
    );

    startRule(context, RuleType.GherkinDocument);
    var state = 0;
    Token token;
    do {
      token = _readToken(context);
      state = _matchToken(state, token, context);
    } while (!token.isEof);

    endRule(context, RuleType.GherkinDocument);

    if (context.errors.isNotEmpty) {
      throw CompositeParserException(context.errors);
    }

    return _builder.result;
  }

  void addError(ParserContext context, ParserException error) {
    var newErrorMessage = error.message;
    for (var e in context.errors) {
      if (e.message == newErrorMessage) {
        return;
      }
    }
    context.errors.add(error);
    if (context.errors.length > 10) {
      throw CompositeParserException(context.errors);
    }
  }

  void _handleAstError<V>(ParserContext context, V Function() action) =>
      _handleExternalError(context, () {
        action();
      }, null);

  V _handleExternalError<V>(ParserContext context, V Function() action,
      V defaultValue) {
    if (stopAtFirstError) {
      return action();
    }

    try {
      return action();
    }
    on CompositeParserException catch (compositeParserException) {
      for (var error in compositeParserException.errors) {
        addError(context, error);
      }
    }
    on ParserException catch (error) {
      addError(context, error);
    }
    return defaultValue;
  }

  void build(ParserContext context, Token token) =>
      _handleAstError(context, () => _builder.build(token));

  void startRule(ParserContext context, RuleType ruleType) =>
      _handleAstError(context, () => _builder.startRule(ruleType));

  void endRule(ParserContext context, RuleType ruleType) =>
      _handleAstError(context, () => _builder.endRule(ruleType));

  Token _readToken(ParserContext context) =>
      context.tokenQueue.isNotEmpty
          ? context.tokenQueue.removeFirst()
          : context.tokenScanner.read();

  bool match_EOF(ParserContext context, Token token) {
    return _handleExternalError(
        context, () => context.tokenMatcher.match_EOF(token), false);
  }

  bool match_Empty(ParserContext context, Token token) {
    if (token.isEof) {
      return false;
    }
    return _handleExternalError(
        context, () => context.tokenMatcher.match_Empty(token), false);
  }

  bool match_Comment(ParserContext context, Token token) {
    if (token.isEof) {
      return false;
    }
    return _handleExternalError(
        context, () => context.tokenMatcher.match_Comment(token), false);
  }

  bool match_TagLine(ParserContext context, Token token) {
    if (token.isEof) {
      return false;
    }
    return _handleExternalError(
        context, () => context.tokenMatcher.match_TagLine(token), false);
  }

  bool match_FeatureLine(ParserContext context, Token token) {
    if (token.isEof) {
      return false;
    }
    return _handleExternalError(
        context, () => context.tokenMatcher.match_FeatureLine(token), false);
  }

  bool match_RuleLine(ParserContext context, Token token) {
    if (token.isEof) {
      return false;
    }
    return _handleExternalError(
        context, () => context.tokenMatcher.match_RuleLine(token), false);
  }

  bool match_BackgroundLine(ParserContext context, Token token) {
    if (token.isEof) {
      return false;
    }
    return _handleExternalError(
        context, () => context.tokenMatcher.match_BackgroundLine(token), false);
  }

  bool match_ScenarioLine(ParserContext context, Token token) {
    if (token.isEof) {
      return false;
    }
    return _handleExternalError(
        context, () => context.tokenMatcher.match_ScenarioLine(token), false);
  }

  bool match_ExamplesLine(ParserContext context, Token token) {
    if (token.isEof) {
      return false;
    }
    return _handleExternalError(
        context, () => context.tokenMatcher.match_ExamplesLine(token), false);
  }

  bool match_StepLine(ParserContext context, Token token) {
    if (token.isEof) {
      return false;
    }
    return _handleExternalError(
        context, () => context.tokenMatcher.match_StepLine(token), false);
  }

  bool match_DocStringSeparator(ParserContext context, Token token) {
    if (token.isEof) {
      return false;
    }
    return _handleExternalError(
        context, () => context.tokenMatcher.match_DocStringSeparator(token),
        false);
  }

  bool match_TableRow(ParserContext context, Token token) {
    if (token.isEof) {
      return false;
    }
    return _handleExternalError(
        context, () => context.tokenMatcher.match_TableRow(token), false);
  }

  bool match_Language(ParserContext context, Token token) {
    if (token.isEof) {
      return false;
    }
    return _handleExternalError(
        context, () => context.tokenMatcher.match_Language(token), false);
  }

  bool match_Other(ParserContext context, Token token) {
    if (token.isEof) {
      return false;
    }
    return _handleExternalError(
        context, () => context.tokenMatcher.match_Other(token), false);
  }

  int _matchToken(int state, Token token, ParserContext context) {
    var newState;
    switch (state) {
      case 0:
        newState = matchTokenAt_0(token, context);
        break;
      case 1:
        newState = matchTokenAt_1(token, context);
        break;
      case 2:
        newState = matchTokenAt_2(token, context);
        break;
      case 3:
        newState = matchTokenAt_3(token, context);
        break;
      case 4:
        newState = matchTokenAt_4(token, context);
        break;
      case 5:
        newState = matchTokenAt_5(token, context);
        break;
      case 6:
        newState = matchTokenAt_6(token, context);
        break;
      case 7:
        newState = matchTokenAt_7(token, context);
        break;
      case 8:
        newState = matchTokenAt_8(token, context);
        break;
      case 9:
        newState = matchTokenAt_9(token, context);
        break;
      case 10:
        newState = matchTokenAt_10(token, context);
        break;
      case 11:
        newState = matchTokenAt_11(token, context);
        break;
      case 12:
        newState = matchTokenAt_12(token, context);
        break;
      case 13:
        newState = matchTokenAt_13(token, context);
        break;
      case 14:
        newState = matchTokenAt_14(token, context);
        break;
      case 15:
        newState = matchTokenAt_15(token, context);
        break;
      case 16:
        newState = matchTokenAt_16(token, context);
        break;
      case 17:
        newState = matchTokenAt_17(token, context);
        break;
      case 18:
        newState = matchTokenAt_18(token, context);
        break;
      case 19:
        newState = matchTokenAt_19(token, context);
        break;
      case 20:
        newState = matchTokenAt_20(token, context);
        break;
      case 21:
        newState = matchTokenAt_21(token, context);
        break;
      case 22:
        newState = matchTokenAt_22(token, context);
        break;
      case 23:
        newState = matchTokenAt_23(token, context);
        break;
      case 24:
        newState = matchTokenAt_24(token, context);
        break;
      case 25:
        newState = matchTokenAt_25(token, context);
        break;
      case 26:
        newState = matchTokenAt_26(token, context);
        break;
      case 27:
        newState = matchTokenAt_27(token, context);
        break;
      case 28:
        newState = matchTokenAt_28(token, context);
        break;
      case 29:
        newState = matchTokenAt_29(token, context);
        break;
      case 30:
        newState = matchTokenAt_30(token, context);
        break;
      case 31:
        newState = matchTokenAt_31(token, context);
        break;
      case 32:
        newState = matchTokenAt_32(token, context);
        break;
      case 33:
        newState = matchTokenAt_33(token, context);
        break;
      case 34:
        newState = matchTokenAt_34(token, context);
        break;
      case 35:
        newState = matchTokenAt_35(token, context);
        break;
      case 36:
        newState = matchTokenAt_36(token, context);
        break;
      case 37:
        newState = matchTokenAt_37(token, context);
        break;
      case 38:
        newState = matchTokenAt_38(token, context);
        break;
      case 39:
        newState = matchTokenAt_39(token, context);
        break;
      case 40:
        newState = matchTokenAt_40(token, context);
        break;
      case 41:
        newState = matchTokenAt_41(token, context);
        break;
      case 43:
        newState = matchTokenAt_43(token, context);
        break;
      case 44:
        newState = matchTokenAt_44(token, context);
        break;
      case 45:
        newState = matchTokenAt_45(token, context);
        break;
      case 46:
        newState = matchTokenAt_46(token, context);
        break;
      case 47:
        newState = matchTokenAt_47(token, context);
        break;
      case 48:
        newState = matchTokenAt_48(token, context);
        break;
      case 49:
        newState = matchTokenAt_49(token, context);
        break;
      case 50:
        newState = matchTokenAt_50(token, context);
        break;
      default:
        throw StateError('Unknown state: $state');
    }
    return newState;
  }

  // Start
  int matchTokenAt_0(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      build(context, token);
      return 42;
    }
    if (match_Language(context, token)) {
      startRule(context, RuleType.Feature);
      startRule(context, RuleType.FeatureHeader);
      build(context, token);
      return 1;
    }
    if (match_TagLine(context, token)) {
      startRule(context, RuleType.Feature);
      startRule(context, RuleType.FeatureHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 2;
    }
    if (match_FeatureLine(context, token)) {
      startRule(context, RuleType.Feature);
      startRule(context, RuleType.FeatureHeader);
      build(context, token);
      return 3;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 0;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 0;
    }

    final stateComment = 'State: 0 - Start';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Language',
      '#TagLine',
      '#FeatureLine',
      '#Comment',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 0;
  }

  // GherkinDocument:0>Feature:0>FeatureHeader:0>#Language:0
  int matchTokenAt_1(Token token, ParserContext context) {
    if (match_TagLine(context, token)) {
      startRule(context, RuleType.Tags);
      build(context, token);
      return 2;
    }
    if (match_FeatureLine(context, token)) {
      build(context, token);
      return 3;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 1;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 1;
    }

    final stateComment = 'State: 1 - GherkinDocument:0>Feature:0>FeatureHeader:0>#Language:0';
    token.detach();
    var expectedTokens = ['#TagLine', '#FeatureLine', '#Comment', '#Empty'];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 1;
  }

  // GherkinDocument:0>Feature:0>FeatureHeader:1>Tags:0>#TagLine:0
  int matchTokenAt_2(Token token, ParserContext context) {
    if (match_TagLine(context, token)) {
      build(context, token);
      return 2;
    }
    if (match_FeatureLine(context, token)) {
      endRule(context, RuleType.Tags);
      build(context, token);
      return 3;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 2;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 2;
    }

    final stateComment = 'State: 2 - GherkinDocument:0>Feature:0>FeatureHeader:1>Tags:0>#TagLine:0';
    token.detach();
    var expectedTokens = ['#TagLine', '#FeatureLine', '#Comment', '#Empty'];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 2;
  }

  // GherkinDocument:0>Feature:0>FeatureHeader:2>#FeatureLine:0
  int matchTokenAt_3(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.FeatureHeader);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 3;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 5;
    }
    if (match_BackgroundLine(context, token)) {
      endRule(context, RuleType.FeatureHeader);
      startRule(context, RuleType.Background);
      build(context, token);
      return 6;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.FeatureHeader);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 11;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.FeatureHeader);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.FeatureHeader);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.FeatureHeader);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Other(context, token)) {
      startRule(context, RuleType.Description);
      build(context, token);
      return 4;
    }

    final stateComment = 'State: 3 - GherkinDocument:0>Feature:0>FeatureHeader:2>#FeatureLine:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Empty',
      '#Comment',
      '#BackgroundLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 3;
  }

  // GherkinDocument:0>Feature:0>FeatureHeader:3>DescriptionHelper:1>Description:0>#Other:0
  int matchTokenAt_4(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.FeatureHeader);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Comment(context, token)) {
      endRule(context, RuleType.Description);
      build(context, token);
      return 5;
    }
    if (match_BackgroundLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.FeatureHeader);
      startRule(context, RuleType.Background);
      build(context, token);
      return 6;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Description);
        endRule(context, RuleType.FeatureHeader);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 11;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.FeatureHeader);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.FeatureHeader);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.FeatureHeader);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Other(context, token)) {
      build(context, token);
      return 4;
    }

    final stateComment = 'State: 4 - GherkinDocument:0>Feature:0>FeatureHeader:3>DescriptionHelper:1>Description:0>#Other:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Comment',
      '#BackgroundLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 4;
  }

  // GherkinDocument:0>Feature:0>FeatureHeader:3>DescriptionHelper:2>#Comment:0
  int matchTokenAt_5(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.FeatureHeader);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 5;
    }
    if (match_BackgroundLine(context, token)) {
      endRule(context, RuleType.FeatureHeader);
      startRule(context, RuleType.Background);
      build(context, token);
      return 6;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.FeatureHeader);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 11;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.FeatureHeader);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.FeatureHeader);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.FeatureHeader);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 5;
    }

    final stateComment = 'State: 5 - GherkinDocument:0>Feature:0>FeatureHeader:3>DescriptionHelper:2>#Comment:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Comment',
      '#BackgroundLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 5;
  }

  // GherkinDocument:0>Feature:1>Background:0>#BackgroundLine:0
  int matchTokenAt_6(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 6;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 8;
    }
    if (match_StepLine(context, token)) {
      startRule(context, RuleType.Step);
      build(context, token);
      return 9;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Background);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 11;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Background);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Background);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Background);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Other(context, token)) {
      startRule(context, RuleType.Description);
      build(context, token);
      return 7;
    }

    final stateComment = 'State: 6 - GherkinDocument:0>Feature:1>Background:0>#BackgroundLine:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Empty',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 6;
  }

  // GherkinDocument:0>Feature:1>Background:1>DescriptionHelper:1>Description:0>#Other:0
  int matchTokenAt_7(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Comment(context, token)) {
      endRule(context, RuleType.Description);
      build(context, token);
      return 8;
    }
    if (match_StepLine(context, token)) {
      endRule(context, RuleType.Description);
      startRule(context, RuleType.Step);
      build(context, token);
      return 9;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Description);
        endRule(context, RuleType.Background);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 11;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Background);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Background);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Background);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Other(context, token)) {
      build(context, token);
      return 7;
    }

    final stateComment = 'State: 7 - GherkinDocument:0>Feature:1>Background:1>DescriptionHelper:1>Description:0>#Other:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 7;
  }

  // GherkinDocument:0>Feature:1>Background:1>DescriptionHelper:2>#Comment:0
  int matchTokenAt_8(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 8;
    }
    if (match_StepLine(context, token)) {
      startRule(context, RuleType.Step);
      build(context, token);
      return 9;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Background);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 11;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Background);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Background);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Background);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 8;
    }

    final stateComment = 'State: 8 - GherkinDocument:0>Feature:1>Background:1>DescriptionHelper:2>#Comment:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 8;
  }

  // GherkinDocument:0>Feature:1>Background:2>Step:0>#StepLine:0
  int matchTokenAt_9(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_TableRow(context, token)) {
      startRule(context, RuleType.DataTable);
      build(context, token);
      return 10;
    }
    if (match_DocStringSeparator(context, token)) {
      startRule(context, RuleType.DocString);
      build(context, token);
      return 49;
    }
    if (match_StepLine(context, token)) {
      endRule(context, RuleType.Step);
      startRule(context, RuleType.Step);
      build(context, token);
      return 9;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Step);
        endRule(context, RuleType.Background);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 11;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 9;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 9;
    }

    final stateComment = 'State: 9 - GherkinDocument:0>Feature:1>Background:2>Step:0>#StepLine:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#TableRow',
      '#DocStringSeparator',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 9;
  }

  // GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0
  int matchTokenAt_10(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_TableRow(context, token)) {
      build(context, token);
      return 10;
    }
    if (match_StepLine(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      startRule(context, RuleType.Step);
      build(context, token);
      return 9;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.DataTable);
        endRule(context, RuleType.Step);
        endRule(context, RuleType.Background);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 11;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 10;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 10;
    }

    final stateComment = 'State: 10 - GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#TableRow',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 10;
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:0>Tags:0>#TagLine:0
  int matchTokenAt_11(Token token, ParserContext context) {
    if (match_TagLine(context, token)) {
      build(context, token);
      return 11;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Tags);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 11;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 11;
    }

    final stateComment = 'State: 11 - GherkinDocument:0>Feature:2>ScenarioDefinition:0>Tags:0>#TagLine:0';
    token.detach();
    var expectedTokens = ['#TagLine', '#ScenarioLine', '#Comment', '#Empty'];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 11;
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0
  int matchTokenAt_12(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 12;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 14;
    }
    if (match_StepLine(context, token)) {
      startRule(context, RuleType.Step);
      build(context, token);
      return 15;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 11;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 18;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Other(context, token)) {
      startRule(context, RuleType.Description);
      build(context, token);
      return 13;
    }

    final stateComment = 'State: 12 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Empty',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 12;
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>#Other:0
  int matchTokenAt_13(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Comment(context, token)) {
      endRule(context, RuleType.Description);
      build(context, token);
      return 14;
    }
    if (match_StepLine(context, token)) {
      endRule(context, RuleType.Description);
      startRule(context, RuleType.Step);
      build(context, token);
      return 15;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        endRule(context, RuleType.Description);
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Description);
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 11;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      endRule(context, RuleType.Description);
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 18;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Other(context, token)) {
      build(context, token);
      return 13;
    }

    final stateComment = 'State: 13 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>#Other:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 13;
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:2>#Comment:0
  int matchTokenAt_14(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 14;
    }
    if (match_StepLine(context, token)) {
      startRule(context, RuleType.Step);
      build(context, token);
      return 15;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 11;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 18;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 14;
    }

    final stateComment = 'State: 14 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:2>#Comment:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 14;
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0
  int matchTokenAt_15(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_TableRow(context, token)) {
      startRule(context, RuleType.DataTable);
      build(context, token);
      return 16;
    }
    if (match_DocStringSeparator(context, token)) {
      startRule(context, RuleType.DocString);
      build(context, token);
      return 47;
    }
    if (match_StepLine(context, token)) {
      endRule(context, RuleType.Step);
      startRule(context, RuleType.Step);
      build(context, token);
      return 15;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        endRule(context, RuleType.Step);
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Step);
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 11;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      endRule(context, RuleType.Step);
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 18;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 15;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 15;
    }

    final stateComment = 'State: 15 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#TableRow',
      '#DocStringSeparator',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 15;
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0
  int matchTokenAt_16(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_TableRow(context, token)) {
      build(context, token);
      return 16;
    }
    if (match_StepLine(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      startRule(context, RuleType.Step);
      build(context, token);
      return 15;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        endRule(context, RuleType.DataTable);
        endRule(context, RuleType.Step);
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.DataTable);
        endRule(context, RuleType.Step);
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 11;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 18;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 16;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 16;
    }

    final stateComment = 'State: 16 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#TableRow',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 16;
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0
  int matchTokenAt_17(Token token, ParserContext context) {
    if (match_TagLine(context, token)) {
      build(context, token);
      return 17;
    }
    if (match_ExamplesLine(context, token)) {
      endRule(context, RuleType.Tags);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 18;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 17;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 17;
    }

    final stateComment = 'State: 17 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0';
    token.detach();
    var expectedTokens = ['#TagLine', '#ExamplesLine', '#Comment', '#Empty'];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 17;
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0
  int matchTokenAt_18(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 18;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 20;
    }
    if (match_TableRow(context, token)) {
      startRule(context, RuleType.ExamplesTable);
      build(context, token);
      return 21;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        endRule(context, RuleType.Examples);
        endRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Examples);
        endRule(context, RuleType.ExamplesDefinition);
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 11;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 18;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Other(context, token)) {
      startRule(context, RuleType.Description);
      build(context, token);
      return 19;
    }

    final stateComment = 'State: 18 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Empty',
      '#Comment',
      '#TableRow',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 18;
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>#Other:0
  int matchTokenAt_19(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Comment(context, token)) {
      endRule(context, RuleType.Description);
      build(context, token);
      return 20;
    }
    if (match_TableRow(context, token)) {
      endRule(context, RuleType.Description);
      startRule(context, RuleType.ExamplesTable);
      build(context, token);
      return 21;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        endRule(context, RuleType.Description);
        endRule(context, RuleType.Examples);
        endRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Description);
        endRule(context, RuleType.Examples);
        endRule(context, RuleType.ExamplesDefinition);
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 11;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 18;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Other(context, token)) {
      build(context, token);
      return 19;
    }

    final stateComment = 'State: 19 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>#Other:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Comment',
      '#TableRow',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 19;
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:2>#Comment:0
  int matchTokenAt_20(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 20;
    }
    if (match_TableRow(context, token)) {
      startRule(context, RuleType.ExamplesTable);
      build(context, token);
      return 21;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        endRule(context, RuleType.Examples);
        endRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Examples);
        endRule(context, RuleType.ExamplesDefinition);
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 11;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 18;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 20;
    }

    final stateComment = 'State: 20 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:2>#Comment:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Comment',
      '#TableRow',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 20;
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0
  int matchTokenAt_21(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.ExamplesTable);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_TableRow(context, token)) {
      build(context, token);
      return 21;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        endRule(context, RuleType.ExamplesTable);
        endRule(context, RuleType.Examples);
        endRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.ExamplesTable);
        endRule(context, RuleType.Examples);
        endRule(context, RuleType.ExamplesDefinition);
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 11;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.ExamplesTable);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      endRule(context, RuleType.ExamplesTable);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 18;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.ExamplesTable);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.ExamplesTable);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 21;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 21;
    }

    final stateComment = 'State: 21 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#TableRow',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 21;
  }

  // GherkinDocument:0>Feature:3>Rule:0>RuleHeader:0>Tags:0>#TagLine:0
  int matchTokenAt_22(Token token, ParserContext context) {
    if (match_TagLine(context, token)) {
      build(context, token);
      return 22;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Tags);
      build(context, token);
      return 23;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 22;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 22;
    }

    final stateComment = 'State: 22 - GherkinDocument:0>Feature:3>Rule:0>RuleHeader:0>Tags:0>#TagLine:0';
    token.detach();
    var expectedTokens = ['#TagLine', '#RuleLine', '#Comment', '#Empty'];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);
    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 22;
  }

  // GherkinDocument:0>Feature:3>Rule:0>RuleHeader:0>#RuleLine:0
  int matchTokenAt_23(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.RuleHeader);
      endRule(context, RuleType.Rule);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 23;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 25;
    }
    if (match_BackgroundLine(context, token)) {
      endRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Background);
      build(context, token);
      return 26;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.RuleHeader);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 31;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.RuleHeader);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.RuleHeader);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Other(context, token)) {
      startRule(context, RuleType.Description);
      build(context, token);
      return 24;
    }

    final stateComment = 'State: 23 - GherkinDocument:0>Feature:3>Rule:0>RuleHeader:0>#RuleLine:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Empty',
      '#Comment',
      '#BackgroundLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 23;
  }

  // GherkinDocument:0>Feature:3>Rule:0>RuleHeader:1>DescriptionHelper:1>Description:0>#Other:0
  int matchTokenAt_24(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.RuleHeader);
      endRule(context, RuleType.Rule);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Comment(context, token)) {
      endRule(context, RuleType.Description);
      build(context, token);
      return 25;
    }
    if (match_BackgroundLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Background);
      build(context, token);
      return 26;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Description);
        endRule(context, RuleType.RuleHeader);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 31;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.RuleHeader);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.RuleHeader);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Other(context, token)) {
      build(context, token);
      return 24;
    }

    final stateComment = 'State: 24 - GherkinDocument:0>Feature:3>Rule:0>RuleHeader:1>DescriptionHelper:1>Description:0>#Other:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Comment',
      '#BackgroundLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 24;
  }

  // GherkinDocument:0>Feature:3>Rule:0>RuleHeader:1>DescriptionHelper:2>#Comment:0
  int matchTokenAt_25(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.RuleHeader);
      endRule(context, RuleType.Rule);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 25;
    }
    if (match_BackgroundLine(context, token)) {
      endRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Background);
      build(context, token);
      return 26;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.RuleHeader);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 31;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.RuleHeader);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.RuleHeader);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 25;
    }

    final stateComment = 'State: 25 - GherkinDocument:0>Feature:3>Rule:0>RuleHeader:1>DescriptionHelper:2>#Comment:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Comment',
      '#BackgroundLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 25;
  }

  // GherkinDocument:0>Feature:3>Rule:1>Background:0>#BackgroundLine:0
  int matchTokenAt_26(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Rule);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 26;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 28;
    }
    if (match_StepLine(context, token)) {
      startRule(context, RuleType.Step);
      build(context, token);
      return 29;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Background);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 31;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Background);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Other(context, token)) {
      startRule(context, RuleType.Description);
      build(context, token);
      return 27;
    }

    final stateComment = 'State: 26 - GherkinDocument:0>Feature:3>Rule:1>Background:0>#BackgroundLine:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Empty',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 26;
  }

  // GherkinDocument:0>Feature:3>Rule:1>Background:1>DescriptionHelper:1>Description:0>#Other:0
  int matchTokenAt_27(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Rule);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Comment(context, token)) {
      endRule(context, RuleType.Description);
      build(context, token);
      return 28;
    }
    if (match_StepLine(context, token)) {
      endRule(context, RuleType.Description);
      startRule(context, RuleType.Step);
      build(context, token);
      return 29;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Description);
        endRule(context, RuleType.Background);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 31;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Background);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Other(context, token)) {
      build(context, token);
      return 27;
    }

    final stateComment = 'State: 27 - GherkinDocument:0>Feature:3>Rule:1>Background:1>DescriptionHelper:1>Description:0>#Other:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 27;
  }

  // GherkinDocument:0>Feature:3>Rule:1>Background:1>DescriptionHelper:2>#Comment:0
  int matchTokenAt_28(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Rule);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 28;
    }
    if (match_StepLine(context, token)) {
      startRule(context, RuleType.Step);
      build(context, token);
      return 29;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Background);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 31;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Background);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 28;
    }

    final stateComment = 'State: 28 - GherkinDocument:0>Feature:3>Rule:1>Background:1>DescriptionHelper:2>#Comment:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 28;
  }

  // GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:0>#StepLine:0
  int matchTokenAt_29(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Rule);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_TableRow(context, token)) {
      startRule(context, RuleType.DataTable);
      build(context, token);
      return 30;
    }
    if (match_DocStringSeparator(context, token)) {
      startRule(context, RuleType.DocString);
      build(context, token);
      return 45;
    }
    if (match_StepLine(context, token)) {
      endRule(context, RuleType.Step);
      startRule(context, RuleType.Step);
      build(context, token);
      return 29;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Step);
        endRule(context, RuleType.Background);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 31;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 29;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 29;
    }

    final stateComment = 'State: 29 - GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:0>#StepLine:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#TableRow',
      '#DocStringSeparator',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 29;
  }

  // GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0
  int matchTokenAt_30(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Rule);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_TableRow(context, token)) {
      build(context, token);
      return 30;
    }
    if (match_StepLine(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      startRule(context, RuleType.Step);
      build(context, token);
      return 29;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.DataTable);
        endRule(context, RuleType.Step);
        endRule(context, RuleType.Background);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 31;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 30;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 30;
    }

    final stateComment = 'State: 30 - GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#TableRow',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 30;
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:0>Tags:0>#TagLine:0
  int matchTokenAt_31(Token token, ParserContext context) {
    if (match_TagLine(context, token)) {
      build(context, token);
      return 31;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Tags);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 31;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 31;
    }

    final stateComment = 'State: 31 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:0>Tags:0>#TagLine:0';
    token.detach();
    var expectedTokens = ['#TagLine', '#ScenarioLine', '#Comment', '#Empty'];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 31;
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0
  int matchTokenAt_32(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 32;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 34;
    }
    if (match_StepLine(context, token)) {
      startRule(context, RuleType.Step);
      build(context, token);
      return 35;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 37;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 31;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 38;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Other(context, token)) {
      startRule(context, RuleType.Description);
      build(context, token);
      return 33;
    }

    final stateComment = 'State: 32 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Empty',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 32;
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>#Other:0
  int matchTokenAt_33(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Comment(context, token)) {
      endRule(context, RuleType.Description);
      build(context, token);
      return 34;
    }
    if (match_StepLine(context, token)) {
      endRule(context, RuleType.Description);
      startRule(context, RuleType.Step);
      build(context, token);
      return 35;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        endRule(context, RuleType.Description);
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 37;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Description);
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 31;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      endRule(context, RuleType.Description);
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 38;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Other(context, token)) {
      build(context, token);
      return 33;
    }

    final stateComment = 'State: 33 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>#Other:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 33;
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:2>#Comment:0
  int matchTokenAt_34(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 34;
    }
    if (match_StepLine(context, token)) {
      startRule(context, RuleType.Step);
      build(context, token);
      return 35;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 37;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 31;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 38;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 34;
    }

    final stateComment = 'State: 34 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:2>#Comment:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 34;
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0
  int matchTokenAt_35(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_TableRow(context, token)) {
      startRule(context, RuleType.DataTable);
      build(context, token);
      return 36;
    }
    if (match_DocStringSeparator(context, token)) {
      startRule(context, RuleType.DocString);
      build(context, token);
      return 43;
    }
    if (match_StepLine(context, token)) {
      endRule(context, RuleType.Step);
      startRule(context, RuleType.Step);
      build(context, token);
      return 35;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        endRule(context, RuleType.Step);
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 37;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Step);
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 31;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      endRule(context, RuleType.Step);
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 38;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 35;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 35;
    }

    final stateComment = 'State: 35 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#TableRow',
      '#DocStringSeparator',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 35;
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0
  int matchTokenAt_36(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_TableRow(context, token)) {
      build(context, token);
      return 36;
    }
    if (match_StepLine(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      startRule(context, RuleType.Step);
      build(context, token);
      return 35;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        endRule(context, RuleType.DataTable);
        endRule(context, RuleType.Step);
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 37;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.DataTable);
        endRule(context, RuleType.Step);
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 31;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 38;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.DataTable);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 36;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 36;
    }

    final stateComment = 'State: 36 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#TableRow',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 36;
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0
  int matchTokenAt_37(Token token, ParserContext context) {
    if (match_TagLine(context, token)) {
      build(context, token);
      return 37;
    }
    if (match_ExamplesLine(context, token)) {
      endRule(context, RuleType.Tags);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 38;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 37;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 37;
    }

    final stateComment = 'State: 37 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0';
    token.detach();
    var expectedTokens = ['#TagLine', '#ExamplesLine', '#Comment', '#Empty'];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 37;
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0
  int matchTokenAt_38(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 38;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 40;
    }
    if (match_TableRow(context, token)) {
      startRule(context, RuleType.ExamplesTable);
      build(context, token);
      return 41;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        endRule(context, RuleType.Examples);
        endRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 37;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Examples);
        endRule(context, RuleType.ExamplesDefinition);
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 31;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 38;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Other(context, token)) {
      startRule(context, RuleType.Description);
      build(context, token);
      return 39;
    }

    final stateComment = 'State: 38 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Empty',
      '#Comment',
      '#TableRow',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 38;
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>#Other:0
  int matchTokenAt_39(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Comment(context, token)) {
      endRule(context, RuleType.Description);
      build(context, token);
      return 40;
    }
    if (match_TableRow(context, token)) {
      endRule(context, RuleType.Description);
      startRule(context, RuleType.ExamplesTable);
      build(context, token);
      return 41;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        endRule(context, RuleType.Description);
        endRule(context, RuleType.Examples);
        endRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 37;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Description);
        endRule(context, RuleType.Examples);
        endRule(context, RuleType.ExamplesDefinition);
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 31;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 38;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Description);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Other(context, token)) {
      build(context, token);
      return 39;
    }

    final stateComment = 'State: 39 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>#Other:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Comment',
      '#TableRow',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 39;
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:2>#Comment:0
  int matchTokenAt_40(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 40;
    }
    if (match_TableRow(context, token)) {
      startRule(context, RuleType.ExamplesTable);
      build(context, token);
      return 41;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        endRule(context, RuleType.Examples);
        endRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 37;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.Examples);
        endRule(context, RuleType.ExamplesDefinition);
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 31;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 38;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 40;
    }

    final stateComment = 'State: 40 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:2>#Comment:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#Comment',
      '#TableRow',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 40;
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0
  int matchTokenAt_41(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.ExamplesTable);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_TableRow(context, token)) {
      build(context, token);
      return 41;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        endRule(context, RuleType.ExamplesTable);
        endRule(context, RuleType.Examples);
        endRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 37;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.ExamplesTable);
        endRule(context, RuleType.Examples);
        endRule(context, RuleType.ExamplesDefinition);
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 31;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.ExamplesTable);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      endRule(context, RuleType.ExamplesTable);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 38;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.ExamplesTable);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.ExamplesTable);
      endRule(context, RuleType.Examples);
      endRule(context, RuleType.ExamplesDefinition);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 41;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 41;
    }

    final stateComment = 'State: 41 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#TableRow',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 41;
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0
  int matchTokenAt_43(Token token, ParserContext context) {
    if (match_DocStringSeparator(context, token)) {
      build(context, token);
      return 44;
    }
    if (match_Other(context, token)) {
      build(context, token);
      return 43;
    }

    final stateComment = 'State: 43 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0';
    token.detach();
    var expectedTokens = ['#DocStringSeparator', '#Other'];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 43;
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0
  int matchTokenAt_44(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_StepLine(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      startRule(context, RuleType.Step);
      build(context, token);
      return 35;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        endRule(context, RuleType.DocString);
        endRule(context, RuleType.Step);
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 37;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.DocString);
        endRule(context, RuleType.Step);
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 31;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 38;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 44;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 44;
    }

    final stateComment = 'State: 44 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 44;
  }

  // GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0
  int matchTokenAt_45(Token token, ParserContext context) {
    if (match_DocStringSeparator(context, token)) {
      build(context, token);
      return 46;
    }
    if (match_Other(context, token)) {
      build(context, token);
      return 45;
    }

    final stateComment = 'State: 44 - GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0';
    token.detach();
    var expectedTokens = ['#DocStringSeparator', '#Other'];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 45;
  }

  // GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0
  int matchTokenAt_46(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Rule);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_StepLine(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      startRule(context, RuleType.Step);
      build(context, token);
      return 29;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.DocString);
        endRule(context, RuleType.Step);
        endRule(context, RuleType.Background);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 31;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 32;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Rule);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 46;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 46;
    }

    final stateComment = 'State: 46 - GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 46;
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0
  int matchTokenAt_47(Token token, ParserContext context) {
    if (match_DocStringSeparator(context, token)) {
      build(context, token);
      return 48;
    }
    if (match_Other(context, token)) {
      build(context, token);
      return 47;
    }

    final stateComment = 'State: 47 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0';
    token.detach();
    var expectedTokens = ['#DocStringSeparator', '#Other'];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 47;
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0
  int matchTokenAt_48(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_StepLine(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      startRule(context, RuleType.Step);
      build(context, token);
      return 15;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_1(context, token)) {
        endRule(context, RuleType.DocString);
        endRule(context, RuleType.Step);
        startRule(context, RuleType.ExamplesDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 17;
      }
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.DocString);
        endRule(context, RuleType.Step);
        endRule(context, RuleType.Scenario);
        endRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 11;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ExamplesLine(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      startRule(context, RuleType.ExamplesDefinition);
      startRule(context, RuleType.Examples);
      build(context, token);
      return 18;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Scenario);
      endRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 48;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 48;
    }

    final stateComment = 'State: 48 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 48;
  }

  // GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0
  int matchTokenAt_49(Token token, ParserContext context) {
    if (match_DocStringSeparator(context, token)) {
      build(context, token);
      return 50;
    }
    if (match_Other(context, token)) {
      build(context, token);
      return 49;
    }

    final stateComment = 'State: 49 - GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0';
    token.detach();
    var expectedTokens = ['#DocStringSeparator', '#Other'];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 49;
  }

  // GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0
  int matchTokenAt_50(Token token, ParserContext context) {
    if (match_EOF(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      endRule(context, RuleType.Feature);
      build(context, token);
      return 42;
    }
    if (match_StepLine(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      startRule(context, RuleType.Step);
      build(context, token);
      return 9;
    }
    if (match_TagLine(context, token)) {
      if (lookahead_0(context, token)) {
        endRule(context, RuleType.DocString);
        endRule(context, RuleType.Step);
        endRule(context, RuleType.Background);
        startRule(context, RuleType.ScenarioDefinition);
        startRule(context, RuleType.Tags);
        build(context, token);
        return 11;
      }
    }
    if (match_TagLine(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      startRule(context, RuleType.Tags);
      build(context, token);
      return 22;
    }
    if (match_ScenarioLine(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      startRule(context, RuleType.ScenarioDefinition);
      startRule(context, RuleType.Scenario);
      build(context, token);
      return 12;
    }
    if (match_RuleLine(context, token)) {
      endRule(context, RuleType.DocString);
      endRule(context, RuleType.Step);
      endRule(context, RuleType.Background);
      startRule(context, RuleType.Rule);
      startRule(context, RuleType.RuleHeader);
      build(context, token);
      return 23;
    }
    if (match_Comment(context, token)) {
      build(context, token);
      return 50;
    }
    if (match_Empty(context, token)) {
      build(context, token);
      return 50;
    }

    final stateComment = 'State: 50 - GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0';
    token.detach();
    var expectedTokens = [
      '#EOF',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty'
    ];
    var error = token.isEof
        ? UnexpectedEofException(token, expectedTokens, stateComment)
        : UnexpectedTokenException(token, expectedTokens, stateComment);

    if (stopAtFirstError) {
      throw error;
    }

    addError(context, error);
    return 50;
  }

  bool lookahead_0(ParserContext context, Token currentToken) {
    currentToken.detach();
    Token token;
    var queue = Queue<Token>();
    var match = false;
    do {
      token = _readToken(context);
      token.detach();
      queue.add(token);

      if (false || match_ScenarioLine(context, token)) {
        match = true;
        break;
      }
    }

    while (false
        || match_Empty(context, token)
        || match_Comment(context, token)
        || match_TagLine(context, token)
    );

    context.tokenQueue.addAll(queue);

    return match;
  }

  bool lookahead_1(ParserContext context, Token currentToken) {
    currentToken.detach();
    Token token;
    var queue = Queue<Token>();
    var match = false;
    do {
      token = _readToken(context);
      token.detach();
      queue.add(token);

      if (false || match_ExamplesLine(context, token)) {
        match = true;
        break;
      }
    } while (false
        || match_Empty(context, token)
        || match_Comment(context, token)
        || match_TagLine(context, token));

    context.tokenQueue.addAll(queue);

    return match;
  }

}