/*
The MIT License (MIT)

Copyright (c) Cucumber Ltd, Gaspar Nagy, Björn Rasmusson, Peter Sergeant

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    // Node.js/IO.js/RequireJS
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.Gherkin = factory();
  }
}(this, function () {
  return {
    Parser: require('./lib/gherkin/parser'),
    TokenScanner: require('./lib/gherkin/token_scanner'),
    TokenMatcher: require('./lib/gherkin/token_matcher'),
    AstBuilder: require('./lib/gherkin/ast_builder'),
    Compiler: require('./lib/gherkin/pickles/compiler'),
    DIALECTS: require('./lib/gherkin/dialects'),
    Stream: {
      createGherkinStream: require('./lib/gherkin/stream/gherkin_stream'),
      createSourceEventStream: require('./lib/gherkin/stream/source_event_stream'),
      createNdjsonStream: require('./lib/gherkin/stream/ndjson_stream')
    }
  };
}));

},{"./lib/gherkin/ast_builder":2,"./lib/gherkin/dialects":5,"./lib/gherkin/parser":9,"./lib/gherkin/pickles/compiler":10,"./lib/gherkin/stream/gherkin_stream":11,"./lib/gherkin/stream/ndjson_stream":12,"./lib/gherkin/stream/source_event_stream":13,"./lib/gherkin/token_matcher":15,"./lib/gherkin/token_scanner":16}],2:[function(require,module,exports){
var AstNode = require('./ast_node');
var Errors = require('./errors');

module.exports = function AstBuilder () {

  var stack = [new AstNode('None')];
  var comments = [];

  this.reset = function () {
    stack = [new AstNode('None')];
    comments = [];
  };

  this.startRule = function (ruleType) {
    stack.push(new AstNode(ruleType));
  };

  this.endRule = function (ruleType) {
    var node = stack.pop();
    var transformedNode = transformNode(node);
    currentNode().add(node.ruleType, transformedNode);
  };

  this.build = function (token) {
    if(token.matchedType === 'Comment') {
      comments.push({
        type: 'Comment',
        location: getLocation(token),
        text: token.matchedText
      });
    } else {
      currentNode().add(token.matchedType, token);
    }
  };

  this.getResult = function () {
    return currentNode().getSingle('GherkinDocument');
  };

  function currentNode () {
    return stack[stack.length - 1];
  }

  function getLocation (token, column) {
    return !column ? token.location : {line: token.location.line, column: column};
  }

  function getTags (node) {
    var tags = [];
    var tagsNode = node.getSingle('Tags');
    if (!tagsNode) return tags;
    tagsNode.getTokens('TagLine').forEach(function (token) {
      token.matchedItems.forEach(function (tagItem) {
        tags.push({
          type: 'Tag',
          location: getLocation(token, tagItem.column),
          name: tagItem.text
        });
      });

    });
    return tags;
  }

  function getCells(tableRowToken) {
    return tableRowToken.matchedItems.map(function (cellItem) {
      return {
        type: 'TableCell',
        location: getLocation(tableRowToken, cellItem.column),
        value: cellItem.text
      }
    });
  }

  function getDescription (node) {
    return node.getSingle('Description');
  }

  function getSteps (node) {
    return node.getItems('Step');
  }

  function getTableRows(node) {
    var rows = node.getTokens('TableRow').map(function (token) {
      return {
        type: 'TableRow',
        location: getLocation(token),
        cells: getCells(token)
      };
    });
    ensureCellCount(rows);
    return rows;
  }

  function ensureCellCount(rows) {
    if(rows.length == 0) return;
    var cellCount = rows[0].cells.length;

    rows.forEach(function (row) {
      if (row.cells.length != cellCount) {
        throw Errors.AstBuilderException.create("inconsistent cell count within the table", row.location);
      }
    });
  }

  function transformNode(node) {
    switch(node.ruleType) {
      case 'Step':
        var stepLine = node.getToken('StepLine');
        var stepArgument = node.getSingle('DataTable') || node.getSingle('DocString') || undefined;

        return {
          type: node.ruleType,
          location: getLocation(stepLine),
          keyword: stepLine.matchedKeyword,
          text: stepLine.matchedText,
          argument: stepArgument
        }
      case 'DocString':
        var separatorToken = node.getTokens('DocStringSeparator')[0];
        var contentType = separatorToken.matchedText.length > 0 ? separatorToken.matchedText : undefined;
        var lineTokens = node.getTokens('Other');
        var content = lineTokens.map(function (t) {return t.matchedText}).join("\n");

        var result = {
          type: node.ruleType,
          location: getLocation(separatorToken),
          content: content
        };
        // conditionally add this like this (needed to make tests pass on node 0.10 as well as 4.0)
        if(contentType) {
          result.contentType = contentType;
        }
        return result;
      case 'DataTable':
        var rows = getTableRows(node);
        return {
          type: node.ruleType,
          location: rows[0].location,
          rows: rows,
        }
      case 'Background':
        var backgroundLine = node.getToken('BackgroundLine');
        var description = getDescription(node);
        var steps = getSteps(node);

        return {
          type: node.ruleType,
          location: getLocation(backgroundLine),
          keyword: backgroundLine.matchedKeyword,
          name: backgroundLine.matchedText,
          description: description,
          steps: steps
        };
      case 'Scenario_Definition':
        var tags = getTags(node);
        var scenarioNode = node.getSingle('Scenario');
        if(scenarioNode) {
          var scenarioLine = scenarioNode.getToken('ScenarioLine');
          var description = getDescription(scenarioNode);
          var steps = getSteps(scenarioNode);

          return {
            type: scenarioNode.ruleType,
            tags: tags,
            location: getLocation(scenarioLine),
            keyword: scenarioLine.matchedKeyword,
            name: scenarioLine.matchedText,
            description: description,
            steps: steps
          };
        } else {
          var scenarioOutlineNode = node.getSingle('ScenarioOutline');
          if(!scenarioOutlineNode) throw new Error('Internal grammar error');

          var scenarioOutlineLine = scenarioOutlineNode.getToken('ScenarioOutlineLine');
          var description = getDescription(scenarioOutlineNode);
          var steps = getSteps(scenarioOutlineNode);
          var examples = scenarioOutlineNode.getItems('Examples_Definition');

          return {
            type: scenarioOutlineNode.ruleType,
            tags: tags,
            location: getLocation(scenarioOutlineLine),
            keyword: scenarioOutlineLine.matchedKeyword,
            name: scenarioOutlineLine.matchedText,
            description: description,
            steps: steps,
            examples: examples
          };
        }
      case 'Examples_Definition':
        var tags = getTags(node);
        var examplesNode = node.getSingle('Examples');
        var examplesLine = examplesNode.getToken('ExamplesLine');
        var description = getDescription(examplesNode);
        var exampleTable = examplesNode.getSingle('Examples_Table')

        return {
          type: examplesNode.ruleType,
          tags: tags,
          location: getLocation(examplesLine),
          keyword: examplesLine.matchedKeyword,
          name: examplesLine.matchedText,
          description: description,
          tableHeader: exampleTable != undefined ? exampleTable.tableHeader : undefined,
          tableBody: exampleTable != undefined ? exampleTable.tableBody : undefined
        };
      case 'Examples_Table':
        var rows = getTableRows(node)

        return {
          tableHeader: rows != undefined ? rows[0] : undefined,
          tableBody: rows != undefined ? rows.slice(1) : undefined
        };
      case 'Description':
        var lineTokens = node.getTokens('Other');
        // Trim trailing empty lines
        var end = lineTokens.length;
        while (end > 0 && lineTokens[end-1].line.trimmedLineText === '') {
            end--;
        }
        lineTokens = lineTokens.slice(0, end);

        var description = lineTokens.map(function (token) { return token.matchedText}).join("\n");
        return description;

      case 'Feature':
        var header = node.getSingle('Feature_Header');
        if(!header) return null;
        var tags = getTags(header);
        var featureLine = header.getToken('FeatureLine');
        if(!featureLine) return null;
        var children = []
        var background = node.getSingle('Background');
        if(background) children.push(background);
        children = children.concat(node.getItems('Scenario_Definition'));
        var description = getDescription(header);
        var language = featureLine.matchedGherkinDialect;

        return {
          type: node.ruleType,
          tags: tags,
          location: getLocation(featureLine),
          language: language,
          keyword: featureLine.matchedKeyword,
          name: featureLine.matchedText,
          description: description,
          children: children,
        };
      case 'GherkinDocument':
        var feature = node.getSingle('Feature');

        return {
          type: node.ruleType,
          feature: feature,
          comments: comments
        };
      default:
        return node;
    }
  }

};

},{"./ast_node":3,"./errors":6}],3:[function(require,module,exports){
function AstNode (ruleType) {
  this.ruleType = ruleType;
  this._subItems = {};
}

AstNode.prototype.add = function (ruleType, obj) {
  var items = this._subItems[ruleType];
  if(items === undefined) this._subItems[ruleType] = items = [];
  items.push(obj);
}

AstNode.prototype.getSingle = function (ruleType) {
  return (this._subItems[ruleType] || [])[0];
}

AstNode.prototype.getItems = function (ruleType) {
  return this._subItems[ruleType] || [];
}

AstNode.prototype.getToken = function (tokenType) {
  return this.getSingle(tokenType);
}

AstNode.prototype.getTokens = function (tokenType) {
  return this._subItems[tokenType] || [];
}

module.exports = AstNode;

},{}],4:[function(require,module,exports){
// https://mathiasbynens.be/notes/javascript-unicode
var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

module.exports = function countSymbols(string) {
  return string.replace(regexAstralSymbols, '_').length;
}

},{}],5:[function(require,module,exports){
module.exports = require('./gherkin-languages.json');

},{"./gherkin-languages.json":7}],6:[function(require,module,exports){
var Errors = {};

[
  'ParserException',
  'CompositeParserException',
  'UnexpectedTokenException',
  'UnexpectedEOFException',
  'AstBuilderException',
  'NoSuchLanguageException'
].forEach(function (name) {

  function ErrorProto (message) {
    this.message = message || ('Unspecified ' + name);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, arguments.callee);
    }
  }

  ErrorProto.prototype = Object.create(Error.prototype);
  ErrorProto.prototype.name = name;
  ErrorProto.prototype.constructor = ErrorProto;
  Errors[name] = ErrorProto;
});

Errors.CompositeParserException.create = function(errors) {
  var message = "Parser errors:\n" + errors.map(function (e) { return e.message; }).join("\n");
  var err = new Errors.CompositeParserException(message);
  err.errors = errors;
  return err;
};

Errors.UnexpectedTokenException.create = function(token, expectedTokenTypes, stateComment) {
  var message = "expected: " + expectedTokenTypes.join(', ') + ", got '" + token.getTokenValue().trim() + "'";
  var location = !token.location.column
    ? {line: token.location.line, column: token.line.indent + 1 }
    : token.location;
  return createError(Errors.UnexpectedEOFException, message, location);
};

Errors.UnexpectedEOFException.create = function(token, expectedTokenTypes, stateComment) {
  var message = "unexpected end of file, expected: " + expectedTokenTypes.join(', ');
  return createError(Errors.UnexpectedTokenException, message, token.location);
};

Errors.AstBuilderException.create = function(message, location) {
  return createError(Errors.AstBuilderException, message, location);
};

Errors.NoSuchLanguageException.create = function(language, location) {
  var message = "Language not supported: " + language;
  return createError(Errors.NoSuchLanguageException, message, location);
};

function createError(Ctor, message, location) {
  var fullMessage = "(" + location.line + ":" + location.column + "): " + message;
  var error = new Ctor(fullMessage);
  error.location = location;
  return error;
}

module.exports = Errors;

},{}],7:[function(require,module,exports){
module.exports={
  "af": {
    "and": [
      "* ",
      "En "
    ],
    "background": [
      "Agtergrond"
    ],
    "but": [
      "* ",
      "Maar "
    ],
    "examples": [
      "Voorbeelde"
    ],
    "feature": [
      "Funksie",
      "Besigheid Behoefte",
      "Vermoë"
    ],
    "given": [
      "* ",
      "Gegewe "
    ],
    "name": "Afrikaans",
    "native": "Afrikaans",
    "scenario": [
      "Situasie"
    ],
    "scenarioOutline": [
      "Situasie Uiteensetting"
    ],
    "then": [
      "* ",
      "Dan "
    ],
    "when": [
      "* ",
      "Wanneer "
    ]
  },
  "am": {
    "and": [
      "* ",
      "Եվ "
    ],
    "background": [
      "Կոնտեքստ"
    ],
    "but": [
      "* ",
      "Բայց "
    ],
    "examples": [
      "Օրինակներ"
    ],
    "feature": [
      "Ֆունկցիոնալություն",
      "Հատկություն"
    ],
    "given": [
      "* ",
      "Դիցուք "
    ],
    "name": "Armenian",
    "native": "հայերեն",
    "scenario": [
      "Սցենար"
    ],
    "scenarioOutline": [
      "Սցենարի կառուցվացքը"
    ],
    "then": [
      "* ",
      "Ապա "
    ],
    "when": [
      "* ",
      "Եթե ",
      "Երբ "
    ]
  },
  "ar": {
    "and": [
      "* ",
      "و "
    ],
    "background": [
      "الخلفية"
    ],
    "but": [
      "* ",
      "لكن "
    ],
    "examples": [
      "امثلة"
    ],
    "feature": [
      "خاصية"
    ],
    "given": [
      "* ",
      "بفرض "
    ],
    "name": "Arabic",
    "native": "العربية",
    "scenario": [
      "سيناريو"
    ],
    "scenarioOutline": [
      "سيناريو مخطط"
    ],
    "then": [
      "* ",
      "اذاً ",
      "ثم "
    ],
    "when": [
      "* ",
      "متى ",
      "عندما "
    ]
  },
  "ast": {
    "and": [
      "* ",
      "Y ",
      "Ya "
    ],
    "background": [
      "Antecedentes"
    ],
    "but": [
      "* ",
      "Peru "
    ],
    "examples": [
      "Exemplos"
    ],
    "feature": [
      "Carauterística"
    ],
    "given": [
      "* ",
      "Dáu ",
      "Dada ",
      "Daos ",
      "Daes "
    ],
    "name": "Asturian",
    "native": "asturianu",
    "scenario": [
      "Casu"
    ],
    "scenarioOutline": [
      "Esbozu del casu"
    ],
    "then": [
      "* ",
      "Entós "
    ],
    "when": [
      "* ",
      "Cuando "
    ]
  },
  "az": {
    "and": [
      "* ",
      "Və ",
      "Həm "
    ],
    "background": [
      "Keçmiş",
      "Kontekst"
    ],
    "but": [
      "* ",
      "Amma ",
      "Ancaq "
    ],
    "examples": [
      "Nümunələr"
    ],
    "feature": [
      "Özəllik"
    ],
    "given": [
      "* ",
      "Tutaq ki ",
      "Verilir "
    ],
    "name": "Azerbaijani",
    "native": "Azərbaycanca",
    "scenario": [
      "Ssenari"
    ],
    "scenarioOutline": [
      "Ssenarinin strukturu"
    ],
    "then": [
      "* ",
      "O halda "
    ],
    "when": [
      "* ",
      "Əgər ",
      "Nə vaxt ki "
    ]
  },
  "bg": {
    "and": [
      "* ",
      "И "
    ],
    "background": [
      "Предистория"
    ],
    "but": [
      "* ",
      "Но "
    ],
    "examples": [
      "Примери"
    ],
    "feature": [
      "Функционалност"
    ],
    "given": [
      "* ",
      "Дадено "
    ],
    "name": "Bulgarian",
    "native": "български",
    "scenario": [
      "Сценарий"
    ],
    "scenarioOutline": [
      "Рамка на сценарий"
    ],
    "then": [
      "* ",
      "То "
    ],
    "when": [
      "* ",
      "Когато "
    ]
  },
  "bm": {
    "and": [
      "* ",
      "Dan "
    ],
    "background": [
      "Latar Belakang"
    ],
    "but": [
      "* ",
      "Tetapi ",
      "Tapi "
    ],
    "examples": [
      "Contoh"
    ],
    "feature": [
      "Fungsi"
    ],
    "given": [
      "* ",
      "Diberi ",
      "Bagi "
    ],
    "name": "Malay",
    "native": "Bahasa Melayu",
    "scenario": [
      "Senario",
      "Situasi",
      "Keadaan"
    ],
    "scenarioOutline": [
      "Kerangka Senario",
      "Kerangka Situasi",
      "Kerangka Keadaan",
      "Garis Panduan Senario"
    ],
    "then": [
      "* ",
      "Maka ",
      "Kemudian "
    ],
    "when": [
      "* ",
      "Apabila "
    ]
  },
  "bs": {
    "and": [
      "* ",
      "I ",
      "A "
    ],
    "background": [
      "Pozadina"
    ],
    "but": [
      "* ",
      "Ali "
    ],
    "examples": [
      "Primjeri"
    ],
    "feature": [
      "Karakteristika"
    ],
    "given": [
      "* ",
      "Dato "
    ],
    "name": "Bosnian",
    "native": "Bosanski",
    "scenario": [
      "Scenariju",
      "Scenario"
    ],
    "scenarioOutline": [
      "Scenariju-obris",
      "Scenario-outline"
    ],
    "then": [
      "* ",
      "Zatim "
    ],
    "when": [
      "* ",
      "Kada "
    ]
  },
  "ca": {
    "and": [
      "* ",
      "I "
    ],
    "background": [
      "Rerefons",
      "Antecedents"
    ],
    "but": [
      "* ",
      "Però "
    ],
    "examples": [
      "Exemples"
    ],
    "feature": [
      "Característica",
      "Funcionalitat"
    ],
    "given": [
      "* ",
      "Donat ",
      "Donada ",
      "Atès ",
      "Atesa "
    ],
    "name": "Catalan",
    "native": "català",
    "scenario": [
      "Escenari"
    ],
    "scenarioOutline": [
      "Esquema de l'escenari"
    ],
    "then": [
      "* ",
      "Aleshores ",
      "Cal "
    ],
    "when": [
      "* ",
      "Quan "
    ]
  },
  "cs": {
    "and": [
      "* ",
      "A také ",
      "A "
    ],
    "background": [
      "Pozadí",
      "Kontext"
    ],
    "but": [
      "* ",
      "Ale "
    ],
    "examples": [
      "Příklady"
    ],
    "feature": [
      "Požadavek"
    ],
    "given": [
      "* ",
      "Pokud ",
      "Za předpokladu "
    ],
    "name": "Czech",
    "native": "Česky",
    "scenario": [
      "Scénář"
    ],
    "scenarioOutline": [
      "Náčrt Scénáře",
      "Osnova scénáře"
    ],
    "then": [
      "* ",
      "Pak "
    ],
    "when": [
      "* ",
      "Když "
    ]
  },
  "cy-GB": {
    "and": [
      "* ",
      "A "
    ],
    "background": [
      "Cefndir"
    ],
    "but": [
      "* ",
      "Ond "
    ],
    "examples": [
      "Enghreifftiau"
    ],
    "feature": [
      "Arwedd"
    ],
    "given": [
      "* ",
      "Anrhegedig a "
    ],
    "name": "Welsh",
    "native": "Cymraeg",
    "scenario": [
      "Scenario"
    ],
    "scenarioOutline": [
      "Scenario Amlinellol"
    ],
    "then": [
      "* ",
      "Yna "
    ],
    "when": [
      "* ",
      "Pryd "
    ]
  },
  "da": {
    "and": [
      "* ",
      "Og "
    ],
    "background": [
      "Baggrund"
    ],
    "but": [
      "* ",
      "Men "
    ],
    "examples": [
      "Eksempler"
    ],
    "feature": [
      "Egenskab"
    ],
    "given": [
      "* ",
      "Givet "
    ],
    "name": "Danish",
    "native": "dansk",
    "scenario": [
      "Scenarie"
    ],
    "scenarioOutline": [
      "Abstrakt Scenario"
    ],
    "then": [
      "* ",
      "Så "
    ],
    "when": [
      "* ",
      "Når "
    ]
  },
  "de": {
    "and": [
      "* ",
      "Und "
    ],
    "background": [
      "Grundlage"
    ],
    "but": [
      "* ",
      "Aber "
    ],
    "examples": [
      "Beispiele"
    ],
    "feature": [
      "Funktionalität"
    ],
    "given": [
      "* ",
      "Angenommen ",
      "Gegeben sei ",
      "Gegeben seien "
    ],
    "name": "German",
    "native": "Deutsch",
    "scenario": [
      "Szenario"
    ],
    "scenarioOutline": [
      "Szenariogrundriss"
    ],
    "then": [
      "* ",
      "Dann "
    ],
    "when": [
      "* ",
      "Wenn "
    ]
  },
  "el": {
    "and": [
      "* ",
      "Και "
    ],
    "background": [
      "Υπόβαθρο"
    ],
    "but": [
      "* ",
      "Αλλά "
    ],
    "examples": [
      "Παραδείγματα",
      "Σενάρια"
    ],
    "feature": [
      "Δυνατότητα",
      "Λειτουργία"
    ],
    "given": [
      "* ",
      "Δεδομένου "
    ],
    "name": "Greek",
    "native": "Ελληνικά",
    "scenario": [
      "Σενάριο"
    ],
    "scenarioOutline": [
      "Περιγραφή Σεναρίου"
    ],
    "then": [
      "* ",
      "Τότε "
    ],
    "when": [
      "* ",
      "Όταν "
    ]
  },
  "em": {
    "and": [
      "* ",
      "😂"
    ],
    "background": [
      "💤"
    ],
    "but": [
      "* ",
      "😔"
    ],
    "examples": [
      "📓"
    ],
    "feature": [
      "📚"
    ],
    "given": [
      "* ",
      "😐"
    ],
    "name": "Emoji",
    "native": "😀",
    "scenario": [
      "📕"
    ],
    "scenarioOutline": [
      "📖"
    ],
    "then": [
      "* ",
      "🙏"
    ],
    "when": [
      "* ",
      "🎬"
    ]
  },
  "en": {
    "and": [
      "* ",
      "And "
    ],
    "background": [
      "Background"
    ],
    "but": [
      "* ",
      "But "
    ],
    "examples": [
      "Examples",
      "Scenarios"
    ],
    "feature": [
      "Feature",
      "Business Need",
      "Ability"
    ],
    "given": [
      "* ",
      "Given "
    ],
    "name": "English",
    "native": "English",
    "scenario": [
      "Scenario"
    ],
    "scenarioOutline": [
      "Scenario Outline",
      "Scenario Template"
    ],
    "then": [
      "* ",
      "Then "
    ],
    "when": [
      "* ",
      "When "
    ]
  },
  "en-Scouse": {
    "and": [
      "* ",
      "An "
    ],
    "background": [
      "Dis is what went down"
    ],
    "but": [
      "* ",
      "Buh "
    ],
    "examples": [
      "Examples"
    ],
    "feature": [
      "Feature"
    ],
    "given": [
      "* ",
      "Givun ",
      "Youse know when youse got "
    ],
    "name": "Scouse",
    "native": "Scouse",
    "scenario": [
      "The thing of it is"
    ],
    "scenarioOutline": [
      "Wharrimean is"
    ],
    "then": [
      "* ",
      "Dun ",
      "Den youse gotta "
    ],
    "when": [
      "* ",
      "Wun ",
      "Youse know like when "
    ]
  },
  "en-au": {
    "and": [
      "* ",
      "Too right "
    ],
    "background": [
      "First off"
    ],
    "but": [
      "* ",
      "Yeah nah "
    ],
    "examples": [
      "You'll wanna"
    ],
    "feature": [
      "Pretty much"
    ],
    "given": [
      "* ",
      "Y'know "
    ],
    "name": "Australian",
    "native": "Australian",
    "scenario": [
      "Awww, look mate"
    ],
    "scenarioOutline": [
      "Reckon it's like"
    ],
    "then": [
      "* ",
      "But at the end of the day I reckon "
    ],
    "when": [
      "* ",
      "It's just unbelievable "
    ]
  },
  "en-lol": {
    "and": [
      "* ",
      "AN "
    ],
    "background": [
      "B4"
    ],
    "but": [
      "* ",
      "BUT "
    ],
    "examples": [
      "EXAMPLZ"
    ],
    "feature": [
      "OH HAI"
    ],
    "given": [
      "* ",
      "I CAN HAZ "
    ],
    "name": "LOLCAT",
    "native": "LOLCAT",
    "scenario": [
      "MISHUN"
    ],
    "scenarioOutline": [
      "MISHUN SRSLY"
    ],
    "then": [
      "* ",
      "DEN "
    ],
    "when": [
      "* ",
      "WEN "
    ]
  },
  "en-old": {
    "and": [
      "* ",
      "Ond ",
      "7 "
    ],
    "background": [
      "Aer",
      "Ær"
    ],
    "but": [
      "* ",
      "Ac "
    ],
    "examples": [
      "Se the",
      "Se þe",
      "Se ðe"
    ],
    "feature": [
      "Hwaet",
      "Hwæt"
    ],
    "given": [
      "* ",
      "Thurh ",
      "Þurh ",
      "Ðurh "
    ],
    "name": "Old English",
    "native": "Englisc",
    "scenario": [
      "Swa"
    ],
    "scenarioOutline": [
      "Swa hwaer swa",
      "Swa hwær swa"
    ],
    "then": [
      "* ",
      "Tha ",
      "Þa ",
      "Ða ",
      "Tha the ",
      "Þa þe ",
      "Ða ðe "
    ],
    "when": [
      "* ",
      "Tha ",
      "Þa ",
      "Ða "
    ]
  },
  "en-pirate": {
    "and": [
      "* ",
      "Aye "
    ],
    "background": [
      "Yo-ho-ho"
    ],
    "but": [
      "* ",
      "Avast! "
    ],
    "examples": [
      "Dead men tell no tales"
    ],
    "feature": [
      "Ahoy matey!"
    ],
    "given": [
      "* ",
      "Gangway! "
    ],
    "name": "Pirate",
    "native": "Pirate",
    "scenario": [
      "Heave to"
    ],
    "scenarioOutline": [
      "Shiver me timbers"
    ],
    "then": [
      "* ",
      "Let go and haul "
    ],
    "when": [
      "* ",
      "Blimey! "
    ]
  },
  "eo": {
    "and": [
      "* ",
      "Kaj "
    ],
    "background": [
      "Fono"
    ],
    "but": [
      "* ",
      "Sed "
    ],
    "examples": [
      "Ekzemploj"
    ],
    "feature": [
      "Trajto"
    ],
    "given": [
      "* ",
      "Donitaĵo ",
      "Komence "
    ],
    "name": "Esperanto",
    "native": "Esperanto",
    "scenario": [
      "Scenaro",
      "Kazo"
    ],
    "scenarioOutline": [
      "Konturo de la scenaro",
      "Skizo",
      "Kazo-skizo"
    ],
    "then": [
      "* ",
      "Do "
    ],
    "when": [
      "* ",
      "Se "
    ]
  },
  "es": {
    "and": [
      "* ",
      "Y ",
      "E "
    ],
    "background": [
      "Antecedentes"
    ],
    "but": [
      "* ",
      "Pero "
    ],
    "examples": [
      "Ejemplos"
    ],
    "feature": [
      "Característica"
    ],
    "given": [
      "* ",
      "Dado ",
      "Dada ",
      "Dados ",
      "Dadas "
    ],
    "name": "Spanish",
    "native": "español",
    "scenario": [
      "Escenario"
    ],
    "scenarioOutline": [
      "Esquema del escenario"
    ],
    "then": [
      "* ",
      "Entonces "
    ],
    "when": [
      "* ",
      "Cuando "
    ]
  },
  "et": {
    "and": [
      "* ",
      "Ja "
    ],
    "background": [
      "Taust"
    ],
    "but": [
      "* ",
      "Kuid "
    ],
    "examples": [
      "Juhtumid"
    ],
    "feature": [
      "Omadus"
    ],
    "given": [
      "* ",
      "Eeldades "
    ],
    "name": "Estonian",
    "native": "eesti keel",
    "scenario": [
      "Stsenaarium"
    ],
    "scenarioOutline": [
      "Raamstsenaarium"
    ],
    "then": [
      "* ",
      "Siis "
    ],
    "when": [
      "* ",
      "Kui "
    ]
  },
  "fa": {
    "and": [
      "* ",
      "و "
    ],
    "background": [
      "زمینه"
    ],
    "but": [
      "* ",
      "اما "
    ],
    "examples": [
      "نمونه ها"
    ],
    "feature": [
      "وِیژگی"
    ],
    "given": [
      "* ",
      "با فرض "
    ],
    "name": "Persian",
    "native": "فارسی",
    "scenario": [
      "سناریو"
    ],
    "scenarioOutline": [
      "الگوی سناریو"
    ],
    "then": [
      "* ",
      "آنگاه "
    ],
    "when": [
      "* ",
      "هنگامی "
    ]
  },
  "fi": {
    "and": [
      "* ",
      "Ja "
    ],
    "background": [
      "Tausta"
    ],
    "but": [
      "* ",
      "Mutta "
    ],
    "examples": [
      "Tapaukset"
    ],
    "feature": [
      "Ominaisuus"
    ],
    "given": [
      "* ",
      "Oletetaan "
    ],
    "name": "Finnish",
    "native": "suomi",
    "scenario": [
      "Tapaus"
    ],
    "scenarioOutline": [
      "Tapausaihio"
    ],
    "then": [
      "* ",
      "Niin "
    ],
    "when": [
      "* ",
      "Kun "
    ]
  },
  "fr": {
    "and": [
      "* ",
      "Et que ",
      "Et qu'",
      "Et "
    ],
    "background": [
      "Contexte"
    ],
    "but": [
      "* ",
      "Mais que ",
      "Mais qu'",
      "Mais "
    ],
    "examples": [
      "Exemples"
    ],
    "feature": [
      "Fonctionnalité"
    ],
    "given": [
      "* ",
      "Soit ",
      "Etant donné que ",
      "Etant donné qu'",
      "Etant donné ",
      "Etant donnée ",
      "Etant donnés ",
      "Etant données ",
      "Étant donné que ",
      "Étant donné qu'",
      "Étant donné ",
      "Étant donnée ",
      "Étant donnés ",
      "Étant données "
    ],
    "name": "French",
    "native": "français",
    "scenario": [
      "Scénario"
    ],
    "scenarioOutline": [
      "Plan du scénario",
      "Plan du Scénario"
    ],
    "then": [
      "* ",
      "Alors "
    ],
    "when": [
      "* ",
      "Quand ",
      "Lorsque ",
      "Lorsqu'"
    ]
  },
  "ga": {
    "and": [
      "* ",
      "Agus"
    ],
    "background": [
      "Cúlra"
    ],
    "but": [
      "* ",
      "Ach"
    ],
    "examples": [
      "Samplaí"
    ],
    "feature": [
      "Gné"
    ],
    "given": [
      "* ",
      "Cuir i gcás go",
      "Cuir i gcás nach",
      "Cuir i gcás gur",
      "Cuir i gcás nár"
    ],
    "name": "Irish",
    "native": "Gaeilge",
    "scenario": [
      "Cás"
    ],
    "scenarioOutline": [
      "Cás Achomair"
    ],
    "then": [
      "* ",
      "Ansin"
    ],
    "when": [
      "* ",
      "Nuair a",
      "Nuair nach",
      "Nuair ba",
      "Nuair nár"
    ]
  },
  "gj": {
    "and": [
      "* ",
      "અને "
    ],
    "background": [
      "બેકગ્રાઉન્ડ"
    ],
    "but": [
      "* ",
      "પણ "
    ],
    "examples": [
      "ઉદાહરણો"
    ],
    "feature": [
      "લક્ષણ",
      "વ્યાપાર જરૂર",
      "ક્ષમતા"
    ],
    "given": [
      "* ",
      "આપેલ છે "
    ],
    "name": "Gujarati",
    "native": "ગુજરાતી",
    "scenario": [
      "સ્થિતિ"
    ],
    "scenarioOutline": [
      "પરિદ્દશ્ય રૂપરેખા",
      "પરિદ્દશ્ય ઢાંચો"
    ],
    "then": [
      "* ",
      "પછી "
    ],
    "when": [
      "* ",
      "ક્યારે "
    ]
  },
  "gl": {
    "and": [
      "* ",
      "E "
    ],
    "background": [
      "Contexto"
    ],
    "but": [
      "* ",
      "Mais ",
      "Pero "
    ],
    "examples": [
      "Exemplos"
    ],
    "feature": [
      "Característica"
    ],
    "given": [
      "* ",
      "Dado ",
      "Dada ",
      "Dados ",
      "Dadas "
    ],
    "name": "Galician",
    "native": "galego",
    "scenario": [
      "Escenario"
    ],
    "scenarioOutline": [
      "Esbozo do escenario"
    ],
    "then": [
      "* ",
      "Entón ",
      "Logo "
    ],
    "when": [
      "* ",
      "Cando "
    ]
  },
  "he": {
    "and": [
      "* ",
      "וגם "
    ],
    "background": [
      "רקע"
    ],
    "but": [
      "* ",
      "אבל "
    ],
    "examples": [
      "דוגמאות"
    ],
    "feature": [
      "תכונה"
    ],
    "given": [
      "* ",
      "בהינתן "
    ],
    "name": "Hebrew",
    "native": "עברית",
    "scenario": [
      "תרחיש"
    ],
    "scenarioOutline": [
      "תבנית תרחיש"
    ],
    "then": [
      "* ",
      "אז ",
      "אזי "
    ],
    "when": [
      "* ",
      "כאשר "
    ]
  },
  "hi": {
    "and": [
      "* ",
      "और ",
      "तथा "
    ],
    "background": [
      "पृष्ठभूमि"
    ],
    "but": [
      "* ",
      "पर ",
      "परन्तु ",
      "किन्तु "
    ],
    "examples": [
      "उदाहरण"
    ],
    "feature": [
      "रूप लेख"
    ],
    "given": [
      "* ",
      "अगर ",
      "यदि ",
      "चूंकि "
    ],
    "name": "Hindi",
    "native": "हिंदी",
    "scenario": [
      "परिदृश्य"
    ],
    "scenarioOutline": [
      "परिदृश्य रूपरेखा"
    ],
    "then": [
      "* ",
      "तब ",
      "तदा "
    ],
    "when": [
      "* ",
      "जब ",
      "कदा "
    ]
  },
  "hr": {
    "and": [
      "* ",
      "I "
    ],
    "background": [
      "Pozadina"
    ],
    "but": [
      "* ",
      "Ali "
    ],
    "examples": [
      "Primjeri",
      "Scenariji"
    ],
    "feature": [
      "Osobina",
      "Mogućnost",
      "Mogucnost"
    ],
    "given": [
      "* ",
      "Zadan ",
      "Zadani ",
      "Zadano "
    ],
    "name": "Croatian",
    "native": "hrvatski",
    "scenario": [
      "Scenarij"
    ],
    "scenarioOutline": [
      "Skica",
      "Koncept"
    ],
    "then": [
      "* ",
      "Onda "
    ],
    "when": [
      "* ",
      "Kada ",
      "Kad "
    ]
  },
  "ht": {
    "and": [
      "* ",
      "Ak ",
      "Epi ",
      "E "
    ],
    "background": [
      "Kontèks",
      "Istorik"
    ],
    "but": [
      "* ",
      "Men "
    ],
    "examples": [
      "Egzanp"
    ],
    "feature": [
      "Karakteristik",
      "Mak",
      "Fonksyonalite"
    ],
    "given": [
      "* ",
      "Sipoze ",
      "Sipoze ke ",
      "Sipoze Ke "
    ],
    "name": "Creole",
    "native": "kreyòl",
    "scenario": [
      "Senaryo"
    ],
    "scenarioOutline": [
      "Plan senaryo",
      "Plan Senaryo",
      "Senaryo deskripsyon",
      "Senaryo Deskripsyon",
      "Dyagram senaryo",
      "Dyagram Senaryo"
    ],
    "then": [
      "* ",
      "Lè sa a ",
      "Le sa a "
    ],
    "when": [
      "* ",
      "Lè ",
      "Le "
    ]
  },
  "hu": {
    "and": [
      "* ",
      "És "
    ],
    "background": [
      "Háttér"
    ],
    "but": [
      "* ",
      "De "
    ],
    "examples": [
      "Példák"
    ],
    "feature": [
      "Jellemző"
    ],
    "given": [
      "* ",
      "Amennyiben ",
      "Adott "
    ],
    "name": "Hungarian",
    "native": "magyar",
    "scenario": [
      "Forgatókönyv"
    ],
    "scenarioOutline": [
      "Forgatókönyv vázlat"
    ],
    "then": [
      "* ",
      "Akkor "
    ],
    "when": [
      "* ",
      "Majd ",
      "Ha ",
      "Amikor "
    ]
  },
  "id": {
    "and": [
      "* ",
      "Dan "
    ],
    "background": [
      "Dasar"
    ],
    "but": [
      "* ",
      "Tapi "
    ],
    "examples": [
      "Contoh"
    ],
    "feature": [
      "Fitur"
    ],
    "given": [
      "* ",
      "Dengan "
    ],
    "name": "Indonesian",
    "native": "Bahasa Indonesia",
    "scenario": [
      "Skenario"
    ],
    "scenarioOutline": [
      "Skenario konsep"
    ],
    "then": [
      "* ",
      "Maka "
    ],
    "when": [
      "* ",
      "Ketika "
    ]
  },
  "is": {
    "and": [
      "* ",
      "Og "
    ],
    "background": [
      "Bakgrunnur"
    ],
    "but": [
      "* ",
      "En "
    ],
    "examples": [
      "Dæmi",
      "Atburðarásir"
    ],
    "feature": [
      "Eiginleiki"
    ],
    "given": [
      "* ",
      "Ef "
    ],
    "name": "Icelandic",
    "native": "Íslenska",
    "scenario": [
      "Atburðarás"
    ],
    "scenarioOutline": [
      "Lýsing Atburðarásar",
      "Lýsing Dæma"
    ],
    "then": [
      "* ",
      "Þá "
    ],
    "when": [
      "* ",
      "Þegar "
    ]
  },
  "it": {
    "and": [
      "* ",
      "E "
    ],
    "background": [
      "Contesto"
    ],
    "but": [
      "* ",
      "Ma "
    ],
    "examples": [
      "Esempi"
    ],
    "feature": [
      "Funzionalità"
    ],
    "given": [
      "* ",
      "Dato ",
      "Data ",
      "Dati ",
      "Date "
    ],
    "name": "Italian",
    "native": "italiano",
    "scenario": [
      "Scenario"
    ],
    "scenarioOutline": [
      "Schema dello scenario"
    ],
    "then": [
      "* ",
      "Allora "
    ],
    "when": [
      "* ",
      "Quando "
    ]
  },
  "ja": {
    "and": [
      "* ",
      "かつ"
    ],
    "background": [
      "背景"
    ],
    "but": [
      "* ",
      "しかし",
      "但し",
      "ただし"
    ],
    "examples": [
      "例",
      "サンプル"
    ],
    "feature": [
      "フィーチャ",
      "機能"
    ],
    "given": [
      "* ",
      "前提"
    ],
    "name": "Japanese",
    "native": "日本語",
    "scenario": [
      "シナリオ"
    ],
    "scenarioOutline": [
      "シナリオアウトライン",
      "シナリオテンプレート",
      "テンプレ",
      "シナリオテンプレ"
    ],
    "then": [
      "* ",
      "ならば"
    ],
    "when": [
      "* ",
      "もし"
    ]
  },
  "jv": {
    "and": [
      "* ",
      "Lan "
    ],
    "background": [
      "Dasar"
    ],
    "but": [
      "* ",
      "Tapi ",
      "Nanging ",
      "Ananging "
    ],
    "examples": [
      "Conto",
      "Contone"
    ],
    "feature": [
      "Fitur"
    ],
    "given": [
      "* ",
      "Nalika ",
      "Nalikaning "
    ],
    "name": "Javanese",
    "native": "Basa Jawa",
    "scenario": [
      "Skenario"
    ],
    "scenarioOutline": [
      "Konsep skenario"
    ],
    "then": [
      "* ",
      "Njuk ",
      "Banjur "
    ],
    "when": [
      "* ",
      "Manawa ",
      "Menawa "
    ]
  },
  "ka": {
    "and": [
      "* ",
      "და"
    ],
    "background": [
      "კონტექსტი"
    ],
    "but": [
      "* ",
      "მაგ­რამ"
    ],
    "examples": [
      "მაგალითები"
    ],
    "feature": [
      "თვისება"
    ],
    "given": [
      "* ",
      "მოცემული"
    ],
    "name": "Georgian",
    "native": "ქართველი",
    "scenario": [
      "სცენარის"
    ],
    "scenarioOutline": [
      "სცენარის ნიმუში"
    ],
    "then": [
      "* ",
      "მაშინ"
    ],
    "when": [
      "* ",
      "როდესაც"
    ]
  },
  "kn": {
    "and": [
      "* ",
      "ಮತ್ತು "
    ],
    "background": [
      "ಹಿನ್ನೆಲೆ"
    ],
    "but": [
      "* ",
      "ಆದರೆ "
    ],
    "examples": [
      "ಉದಾಹರಣೆಗಳು"
    ],
    "feature": [
      "ಹೆಚ್ಚಳ"
    ],
    "given": [
      "* ",
      "ನೀಡಿದ "
    ],
    "name": "Kannada",
    "native": "ಕನ್ನಡ",
    "scenario": [
      "ಕಥಾಸಾರಾಂಶ"
    ],
    "scenarioOutline": [
      "ವಿವರಣೆ"
    ],
    "then": [
      "* ",
      "ನಂತರ "
    ],
    "when": [
      "* ",
      "ಸ್ಥಿತಿಯನ್ನು "
    ]
  },
  "ko": {
    "and": [
      "* ",
      "그리고"
    ],
    "background": [
      "배경"
    ],
    "but": [
      "* ",
      "하지만",
      "단"
    ],
    "examples": [
      "예"
    ],
    "feature": [
      "기능"
    ],
    "given": [
      "* ",
      "조건",
      "먼저"
    ],
    "name": "Korean",
    "native": "한국어",
    "scenario": [
      "시나리오"
    ],
    "scenarioOutline": [
      "시나리오 개요"
    ],
    "then": [
      "* ",
      "그러면"
    ],
    "when": [
      "* ",
      "만일",
      "만약"
    ]
  },
  "lt": {
    "and": [
      "* ",
      "Ir "
    ],
    "background": [
      "Kontekstas"
    ],
    "but": [
      "* ",
      "Bet "
    ],
    "examples": [
      "Pavyzdžiai",
      "Scenarijai",
      "Variantai"
    ],
    "feature": [
      "Savybė"
    ],
    "given": [
      "* ",
      "Duota "
    ],
    "name": "Lithuanian",
    "native": "lietuvių kalba",
    "scenario": [
      "Scenarijus"
    ],
    "scenarioOutline": [
      "Scenarijaus šablonas"
    ],
    "then": [
      "* ",
      "Tada "
    ],
    "when": [
      "* ",
      "Kai "
    ]
  },
  "lu": {
    "and": [
      "* ",
      "an ",
      "a "
    ],
    "background": [
      "Hannergrond"
    ],
    "but": [
      "* ",
      "awer ",
      "mä "
    ],
    "examples": [
      "Beispiller"
    ],
    "feature": [
      "Funktionalitéit"
    ],
    "given": [
      "* ",
      "ugeholl "
    ],
    "name": "Luxemburgish",
    "native": "Lëtzebuergesch",
    "scenario": [
      "Szenario"
    ],
    "scenarioOutline": [
      "Plang vum Szenario"
    ],
    "then": [
      "* ",
      "dann "
    ],
    "when": [
      "* ",
      "wann "
    ]
  },
  "lv": {
    "and": [
      "* ",
      "Un "
    ],
    "background": [
      "Konteksts",
      "Situācija"
    ],
    "but": [
      "* ",
      "Bet "
    ],
    "examples": [
      "Piemēri",
      "Paraugs"
    ],
    "feature": [
      "Funkcionalitāte",
      "Fīča"
    ],
    "given": [
      "* ",
      "Kad "
    ],
    "name": "Latvian",
    "native": "latviešu",
    "scenario": [
      "Scenārijs"
    ],
    "scenarioOutline": [
      "Scenārijs pēc parauga"
    ],
    "then": [
      "* ",
      "Tad "
    ],
    "when": [
      "* ",
      "Ja "
    ]
  },
  "mk-Cyrl": {
    "and": [
      "* ",
      "И "
    ],
    "background": [
      "Контекст",
      "Содржина"
    ],
    "but": [
      "* ",
      "Но "
    ],
    "examples": [
      "Примери",
      "Сценарија"
    ],
    "feature": [
      "Функционалност",
      "Бизнис потреба",
      "Можност"
    ],
    "given": [
      "* ",
      "Дадено ",
      "Дадена "
    ],
    "name": "Macedonian",
    "native": "Македонски",
    "scenario": [
      "Сценарио",
      "На пример"
    ],
    "scenarioOutline": [
      "Преглед на сценарија",
      "Скица",
      "Концепт"
    ],
    "then": [
      "* ",
      "Тогаш "
    ],
    "when": [
      "* ",
      "Кога "
    ]
  },
  "mk-Latn": {
    "and": [
      "* ",
      "I "
    ],
    "background": [
      "Kontekst",
      "Sodrzhina"
    ],
    "but": [
      "* ",
      "No "
    ],
    "examples": [
      "Primeri",
      "Scenaria"
    ],
    "feature": [
      "Funkcionalnost",
      "Biznis potreba",
      "Mozhnost"
    ],
    "given": [
      "* ",
      "Dadeno ",
      "Dadena "
    ],
    "name": "Macedonian (Latin)",
    "native": "Makedonski (Latinica)",
    "scenario": [
      "Scenario",
      "Na primer"
    ],
    "scenarioOutline": [
      "Pregled na scenarija",
      "Skica",
      "Koncept"
    ],
    "then": [
      "* ",
      "Togash "
    ],
    "when": [
      "* ",
      "Koga "
    ]
  },
  "mn": {
    "and": [
      "* ",
      "Мөн ",
      "Тэгээд "
    ],
    "background": [
      "Агуулга"
    ],
    "but": [
      "* ",
      "Гэхдээ ",
      "Харин "
    ],
    "examples": [
      "Тухайлбал"
    ],
    "feature": [
      "Функц",
      "Функционал"
    ],
    "given": [
      "* ",
      "Өгөгдсөн нь ",
      "Анх "
    ],
    "name": "Mongolian",
    "native": "монгол",
    "scenario": [
      "Сценар"
    ],
    "scenarioOutline": [
      "Сценарын төлөвлөгөө"
    ],
    "then": [
      "* ",
      "Тэгэхэд ",
      "Үүний дараа "
    ],
    "when": [
      "* ",
      "Хэрэв "
    ]
  },
  "nl": {
    "and": [
      "* ",
      "En "
    ],
    "background": [
      "Achtergrond"
    ],
    "but": [
      "* ",
      "Maar "
    ],
    "examples": [
      "Voorbeelden"
    ],
    "feature": [
      "Functionaliteit"
    ],
    "given": [
      "* ",
      "Gegeven ",
      "Stel "
    ],
    "name": "Dutch",
    "native": "Nederlands",
    "scenario": [
      "Scenario"
    ],
    "scenarioOutline": [
      "Abstract Scenario"
    ],
    "then": [
      "* ",
      "Dan "
    ],
    "when": [
      "* ",
      "Als ",
      "Wanneer "
    ]
  },
  "no": {
    "and": [
      "* ",
      "Og "
    ],
    "background": [
      "Bakgrunn"
    ],
    "but": [
      "* ",
      "Men "
    ],
    "examples": [
      "Eksempler"
    ],
    "feature": [
      "Egenskap"
    ],
    "given": [
      "* ",
      "Gitt "
    ],
    "name": "Norwegian",
    "native": "norsk",
    "scenario": [
      "Scenario"
    ],
    "scenarioOutline": [
      "Scenariomal",
      "Abstrakt Scenario"
    ],
    "then": [
      "* ",
      "Så "
    ],
    "when": [
      "* ",
      "Når "
    ]
  },
  "pa": {
    "and": [
      "* ",
      "ਅਤੇ "
    ],
    "background": [
      "ਪਿਛੋਕੜ"
    ],
    "but": [
      "* ",
      "ਪਰ "
    ],
    "examples": [
      "ਉਦਾਹਰਨਾਂ"
    ],
    "feature": [
      "ਖਾਸੀਅਤ",
      "ਮੁਹਾਂਦਰਾ",
      "ਨਕਸ਼ ਨੁਹਾਰ"
    ],
    "given": [
      "* ",
      "ਜੇਕਰ ",
      "ਜਿਵੇਂ ਕਿ "
    ],
    "name": "Panjabi",
    "native": "ਪੰਜਾਬੀ",
    "scenario": [
      "ਪਟਕਥਾ"
    ],
    "scenarioOutline": [
      "ਪਟਕਥਾ ਢਾਂਚਾ",
      "ਪਟਕਥਾ ਰੂਪ ਰੇਖਾ"
    ],
    "then": [
      "* ",
      "ਤਦ "
    ],
    "when": [
      "* ",
      "ਜਦੋਂ "
    ]
  },
  "pl": {
    "and": [
      "* ",
      "Oraz ",
      "I "
    ],
    "background": [
      "Założenia"
    ],
    "but": [
      "* ",
      "Ale "
    ],
    "examples": [
      "Przykłady"
    ],
    "feature": [
      "Właściwość",
      "Funkcja",
      "Aspekt",
      "Potrzeba biznesowa"
    ],
    "given": [
      "* ",
      "Zakładając ",
      "Mając ",
      "Zakładając, że "
    ],
    "name": "Polish",
    "native": "polski",
    "scenario": [
      "Scenariusz"
    ],
    "scenarioOutline": [
      "Szablon scenariusza"
    ],
    "then": [
      "* ",
      "Wtedy "
    ],
    "when": [
      "* ",
      "Jeżeli ",
      "Jeśli ",
      "Gdy ",
      "Kiedy "
    ]
  },
  "pt": {
    "and": [
      "* ",
      "E "
    ],
    "background": [
      "Contexto",
      "Cenário de Fundo",
      "Cenario de Fundo",
      "Fundo"
    ],
    "but": [
      "* ",
      "Mas "
    ],
    "examples": [
      "Exemplos",
      "Cenários",
      "Cenarios"
    ],
    "feature": [
      "Funcionalidade",
      "Característica",
      "Caracteristica"
    ],
    "given": [
      "* ",
      "Dado ",
      "Dada ",
      "Dados ",
      "Dadas "
    ],
    "name": "Portuguese",
    "native": "português",
    "scenario": [
      "Cenário",
      "Cenario"
    ],
    "scenarioOutline": [
      "Esquema do Cenário",
      "Esquema do Cenario",
      "Delineação do Cenário",
      "Delineacao do Cenario"
    ],
    "then": [
      "* ",
      "Então ",
      "Entao "
    ],
    "when": [
      "* ",
      "Quando "
    ]
  },
  "ro": {
    "and": [
      "* ",
      "Si ",
      "Și ",
      "Şi "
    ],
    "background": [
      "Context"
    ],
    "but": [
      "* ",
      "Dar "
    ],
    "examples": [
      "Exemple"
    ],
    "feature": [
      "Functionalitate",
      "Funcționalitate",
      "Funcţionalitate"
    ],
    "given": [
      "* ",
      "Date fiind ",
      "Dat fiind ",
      "Dati fiind ",
      "Dați fiind ",
      "Daţi fiind "
    ],
    "name": "Romanian",
    "native": "română",
    "scenario": [
      "Scenariu"
    ],
    "scenarioOutline": [
      "Structura scenariu",
      "Structură scenariu"
    ],
    "then": [
      "* ",
      "Atunci "
    ],
    "when": [
      "* ",
      "Cand ",
      "Când "
    ]
  },
  "ru": {
    "and": [
      "* ",
      "И ",
      "К тому же ",
      "Также "
    ],
    "background": [
      "Предыстория",
      "Контекст"
    ],
    "but": [
      "* ",
      "Но ",
      "А "
    ],
    "examples": [
      "Примеры"
    ],
    "feature": [
      "Функция",
      "Функциональность",
      "Функционал",
      "Свойство"
    ],
    "given": [
      "* ",
      "Допустим ",
      "Дано ",
      "Пусть ",
      "Если "
    ],
    "name": "Russian",
    "native": "русский",
    "scenario": [
      "Сценарий"
    ],
    "scenarioOutline": [
      "Структура сценария"
    ],
    "then": [
      "* ",
      "То ",
      "Затем ",
      "Тогда "
    ],
    "when": [
      "* ",
      "Когда "
    ]
  },
  "sk": {
    "and": [
      "* ",
      "A ",
      "A tiež ",
      "A taktiež ",
      "A zároveň "
    ],
    "background": [
      "Pozadie"
    ],
    "but": [
      "* ",
      "Ale "
    ],
    "examples": [
      "Príklady"
    ],
    "feature": [
      "Požiadavka",
      "Funkcia",
      "Vlastnosť"
    ],
    "given": [
      "* ",
      "Pokiaľ ",
      "Za predpokladu "
    ],
    "name": "Slovak",
    "native": "Slovensky",
    "scenario": [
      "Scenár"
    ],
    "scenarioOutline": [
      "Náčrt Scenáru",
      "Náčrt Scenára",
      "Osnova Scenára"
    ],
    "then": [
      "* ",
      "Tak ",
      "Potom "
    ],
    "when": [
      "* ",
      "Keď ",
      "Ak "
    ]
  },
  "sl": {
    "and": [
      "In ",
      "Ter "
    ],
    "background": [
      "Kontekst",
      "Osnova",
      "Ozadje"
    ],
    "but": [
      "Toda ",
      "Ampak ",
      "Vendar "
    ],
    "examples": [
      "Primeri",
      "Scenariji"
    ],
    "feature": [
      "Funkcionalnost",
      "Funkcija",
      "Možnosti",
      "Moznosti",
      "Lastnost",
      "Značilnost"
    ],
    "given": [
      "Dano ",
      "Podano ",
      "Zaradi ",
      "Privzeto "
    ],
    "name": "Slovenian",
    "native": "Slovenski",
    "scenario": [
      "Scenarij",
      "Primer"
    ],
    "scenarioOutline": [
      "Struktura scenarija",
      "Skica",
      "Koncept",
      "Oris scenarija",
      "Osnutek"
    ],
    "then": [
      "Nato ",
      "Potem ",
      "Takrat "
    ],
    "when": [
      "Ko ",
      "Ce ",
      "Če ",
      "Kadar "
    ]
  },
  "sr-Cyrl": {
    "and": [
      "* ",
      "И "
    ],
    "background": [
      "Контекст",
      "Основа",
      "Позадина"
    ],
    "but": [
      "* ",
      "Али "
    ],
    "examples": [
      "Примери",
      "Сценарији"
    ],
    "feature": [
      "Функционалност",
      "Могућност",
      "Особина"
    ],
    "given": [
      "* ",
      "За дато ",
      "За дате ",
      "За дати "
    ],
    "name": "Serbian",
    "native": "Српски",
    "scenario": [
      "Сценарио",
      "Пример"
    ],
    "scenarioOutline": [
      "Структура сценарија",
      "Скица",
      "Концепт"
    ],
    "then": [
      "* ",
      "Онда "
    ],
    "when": [
      "* ",
      "Када ",
      "Кад "
    ]
  },
  "sr-Latn": {
    "and": [
      "* ",
      "I "
    ],
    "background": [
      "Kontekst",
      "Osnova",
      "Pozadina"
    ],
    "but": [
      "* ",
      "Ali "
    ],
    "examples": [
      "Primeri",
      "Scenariji"
    ],
    "feature": [
      "Funkcionalnost",
      "Mogućnost",
      "Mogucnost",
      "Osobina"
    ],
    "given": [
      "* ",
      "Za dato ",
      "Za date ",
      "Za dati "
    ],
    "name": "Serbian (Latin)",
    "native": "Srpski (Latinica)",
    "scenario": [
      "Scenario",
      "Primer"
    ],
    "scenarioOutline": [
      "Struktura scenarija",
      "Skica",
      "Koncept"
    ],
    "then": [
      "* ",
      "Onda "
    ],
    "when": [
      "* ",
      "Kada ",
      "Kad "
    ]
  },
  "sv": {
    "and": [
      "* ",
      "Och "
    ],
    "background": [
      "Bakgrund"
    ],
    "but": [
      "* ",
      "Men "
    ],
    "examples": [
      "Exempel"
    ],
    "feature": [
      "Egenskap"
    ],
    "given": [
      "* ",
      "Givet "
    ],
    "name": "Swedish",
    "native": "Svenska",
    "scenario": [
      "Scenario"
    ],
    "scenarioOutline": [
      "Abstrakt Scenario",
      "Scenariomall"
    ],
    "then": [
      "* ",
      "Så "
    ],
    "when": [
      "* ",
      "När "
    ]
  },
  "ta": {
    "and": [
      "* ",
      "மேலும்  ",
      "மற்றும் "
    ],
    "background": [
      "பின்னணி"
    ],
    "but": [
      "* ",
      "ஆனால்  "
    ],
    "examples": [
      "எடுத்துக்காட்டுகள்",
      "காட்சிகள்",
      " நிலைமைகளில்"
    ],
    "feature": [
      "அம்சம்",
      "வணிக தேவை",
      "திறன்"
    ],
    "given": [
      "* ",
      "கொடுக்கப்பட்ட "
    ],
    "name": "Tamil",
    "native": "தமிழ்",
    "scenario": [
      "காட்சி"
    ],
    "scenarioOutline": [
      "காட்சி சுருக்கம்",
      "காட்சி வார்ப்புரு"
    ],
    "then": [
      "* ",
      "அப்பொழுது "
    ],
    "when": [
      "* ",
      "எப்போது "
    ]
  },
  "th": {
    "and": [
      "* ",
      "และ "
    ],
    "background": [
      "แนวคิด"
    ],
    "but": [
      "* ",
      "แต่ "
    ],
    "examples": [
      "ชุดของตัวอย่าง",
      "ชุดของเหตุการณ์"
    ],
    "feature": [
      "โครงหลัก",
      "ความต้องการทางธุรกิจ",
      "ความสามารถ"
    ],
    "given": [
      "* ",
      "กำหนดให้ "
    ],
    "name": "Thai",
    "native": "ไทย",
    "scenario": [
      "เหตุการณ์"
    ],
    "scenarioOutline": [
      "สรุปเหตุการณ์",
      "โครงสร้างของเหตุการณ์"
    ],
    "then": [
      "* ",
      "ดังนั้น "
    ],
    "when": [
      "* ",
      "เมื่อ "
    ]
  },
  "tl": {
    "and": [
      "* ",
      "మరియు "
    ],
    "background": [
      "నేపథ్యం"
    ],
    "but": [
      "* ",
      "కాని "
    ],
    "examples": [
      "ఉదాహరణలు"
    ],
    "feature": [
      "గుణము"
    ],
    "given": [
      "* ",
      "చెప్పబడినది "
    ],
    "name": "Telugu",
    "native": "తెలుగు",
    "scenario": [
      "సన్నివేశం"
    ],
    "scenarioOutline": [
      "కథనం"
    ],
    "then": [
      "* ",
      "అప్పుడు "
    ],
    "when": [
      "* ",
      "ఈ పరిస్థితిలో "
    ]
  },
  "tlh": {
    "and": [
      "* ",
      "'ej ",
      "latlh "
    ],
    "background": [
      "mo'"
    ],
    "but": [
      "* ",
      "'ach ",
      "'a "
    ],
    "examples": [
      "ghantoH",
      "lutmey"
    ],
    "feature": [
      "Qap",
      "Qu'meH 'ut",
      "perbogh",
      "poQbogh malja'",
      "laH"
    ],
    "given": [
      "* ",
      "ghu' noblu' ",
      "DaH ghu' bejlu' "
    ],
    "name": "Klingon",
    "native": "tlhIngan",
    "scenario": [
      "lut"
    ],
    "scenarioOutline": [
      "lut chovnatlh"
    ],
    "then": [
      "* ",
      "vaj "
    ],
    "when": [
      "* ",
      "qaSDI' "
    ]
  },
  "tr": {
    "and": [
      "* ",
      "Ve "
    ],
    "background": [
      "Geçmiş"
    ],
    "but": [
      "* ",
      "Fakat ",
      "Ama "
    ],
    "examples": [
      "Örnekler"
    ],
    "feature": [
      "Özellik"
    ],
    "given": [
      "* ",
      "Diyelim ki "
    ],
    "name": "Turkish",
    "native": "Türkçe",
    "scenario": [
      "Senaryo"
    ],
    "scenarioOutline": [
      "Senaryo taslağı"
    ],
    "then": [
      "* ",
      "O zaman "
    ],
    "when": [
      "* ",
      "Eğer ki "
    ]
  },
  "tt": {
    "and": [
      "* ",
      "Һәм ",
      "Вә "
    ],
    "background": [
      "Кереш"
    ],
    "but": [
      "* ",
      "Ләкин ",
      "Әмма "
    ],
    "examples": [
      "Үрнәкләр",
      "Мисаллар"
    ],
    "feature": [
      "Мөмкинлек",
      "Үзенчәлеклелек"
    ],
    "given": [
      "* ",
      "Әйтик "
    ],
    "name": "Tatar",
    "native": "Татарча",
    "scenario": [
      "Сценарий"
    ],
    "scenarioOutline": [
      "Сценарийның төзелеше"
    ],
    "then": [
      "* ",
      "Нәтиҗәдә "
    ],
    "when": [
      "* ",
      "Әгәр "
    ]
  },
  "uk": {
    "and": [
      "* ",
      "І ",
      "А також ",
      "Та "
    ],
    "background": [
      "Передумова"
    ],
    "but": [
      "* ",
      "Але "
    ],
    "examples": [
      "Приклади"
    ],
    "feature": [
      "Функціонал"
    ],
    "given": [
      "* ",
      "Припустимо ",
      "Припустимо, що ",
      "Нехай ",
      "Дано "
    ],
    "name": "Ukrainian",
    "native": "Українська",
    "scenario": [
      "Сценарій"
    ],
    "scenarioOutline": [
      "Структура сценарію"
    ],
    "then": [
      "* ",
      "То ",
      "Тоді "
    ],
    "when": [
      "* ",
      "Якщо ",
      "Коли "
    ]
  },
  "ur": {
    "and": [
      "* ",
      "اور "
    ],
    "background": [
      "پس منظر"
    ],
    "but": [
      "* ",
      "لیکن "
    ],
    "examples": [
      "مثالیں"
    ],
    "feature": [
      "صلاحیت",
      "کاروبار کی ضرورت",
      "خصوصیت"
    ],
    "given": [
      "* ",
      "اگر ",
      "بالفرض ",
      "فرض کیا "
    ],
    "name": "Urdu",
    "native": "اردو",
    "scenario": [
      "منظرنامہ"
    ],
    "scenarioOutline": [
      "منظر نامے کا خاکہ"
    ],
    "then": [
      "* ",
      "پھر ",
      "تب "
    ],
    "when": [
      "* ",
      "جب "
    ]
  },
  "uz": {
    "and": [
      "* ",
      "Ва "
    ],
    "background": [
      "Тарих"
    ],
    "but": [
      "* ",
      "Лекин ",
      "Бирок ",
      "Аммо "
    ],
    "examples": [
      "Мисоллар"
    ],
    "feature": [
      "Функционал"
    ],
    "given": [
      "* ",
      "Агар "
    ],
    "name": "Uzbek",
    "native": "Узбекча",
    "scenario": [
      "Сценарий"
    ],
    "scenarioOutline": [
      "Сценарий структураси"
    ],
    "then": [
      "* ",
      "Унда "
    ],
    "when": [
      "* ",
      "Агар "
    ]
  },
  "vi": {
    "and": [
      "* ",
      "Và "
    ],
    "background": [
      "Bối cảnh"
    ],
    "but": [
      "* ",
      "Nhưng "
    ],
    "examples": [
      "Dữ liệu"
    ],
    "feature": [
      "Tính năng"
    ],
    "given": [
      "* ",
      "Biết ",
      "Cho "
    ],
    "name": "Vietnamese",
    "native": "Tiếng Việt",
    "scenario": [
      "Tình huống",
      "Kịch bản"
    ],
    "scenarioOutline": [
      "Khung tình huống",
      "Khung kịch bản"
    ],
    "then": [
      "* ",
      "Thì "
    ],
    "when": [
      "* ",
      "Khi "
    ]
  },
  "zh-CN": {
    "and": [
      "* ",
      "而且",
      "并且",
      "同时"
    ],
    "background": [
      "背景"
    ],
    "but": [
      "* ",
      "但是"
    ],
    "examples": [
      "例子"
    ],
    "feature": [
      "功能"
    ],
    "given": [
      "* ",
      "假如",
      "假设",
      "假定"
    ],
    "name": "Chinese simplified",
    "native": "简体中文",
    "scenario": [
      "场景",
      "剧本"
    ],
    "scenarioOutline": [
      "场景大纲",
      "剧本大纲"
    ],
    "then": [
      "* ",
      "那么"
    ],
    "when": [
      "* ",
      "当"
    ]
  },
  "zh-TW": {
    "and": [
      "* ",
      "而且",
      "並且",
      "同時"
    ],
    "background": [
      "背景"
    ],
    "but": [
      "* ",
      "但是"
    ],
    "examples": [
      "例子"
    ],
    "feature": [
      "功能"
    ],
    "given": [
      "* ",
      "假如",
      "假設",
      "假定"
    ],
    "name": "Chinese traditional",
    "native": "繁體中文",
    "scenario": [
      "場景",
      "劇本"
    ],
    "scenarioOutline": [
      "場景大綱",
      "劇本大綱"
    ],
    "then": [
      "* ",
      "那麼"
    ],
    "when": [
      "* ",
      "當"
    ]
  }
}

},{}],8:[function(require,module,exports){
var countSymbols = require('./count_symbols')

function GherkinLine(lineText, lineNumber) {
  this.lineText = lineText;
  this.lineNumber = lineNumber;
  this.trimmedLineText = lineText.replace(/^\s+/g, ''); // ltrim
  this.isEmpty = this.trimmedLineText.length == 0;
  this.indent = countSymbols(lineText) - countSymbols(this.trimmedLineText);
};

GherkinLine.prototype.startsWith = function startsWith(prefix) {
  return this.trimmedLineText.indexOf(prefix) == 0;
};

GherkinLine.prototype.startsWithTitleKeyword = function startsWithTitleKeyword(keyword) {
  return this.startsWith(keyword+':'); // The C# impl is more complicated. Find out why.
};

GherkinLine.prototype.getLineText = function getLineText(indentToRemove) {
  if (indentToRemove < 0 || indentToRemove > this.indent) {
    return this.trimmedLineText;
  } else {
    return this.lineText.substring(indentToRemove);
  }
};

GherkinLine.prototype.getRestTrimmed = function getRestTrimmed(length) {
  return this.trimmedLineText.substring(length).trim();
};

GherkinLine.prototype.getTableCells = function getTableCells() {
  var cells = [];
  var col = 0;
  var startCol = col + 1;
  var cell = '';
  var firstCell = true;
  while (col < this.trimmedLineText.length) {
    var chr = this.trimmedLineText[col];
    col++;

    if (chr == '|') {
      if (firstCell) {
        // First cell (content before the first |) is skipped
        firstCell = false;
      } else {
        var cellIndent = cell.length - cell.replace(/^\s+/g, '').length;
        var span = {column: this.indent + startCol + cellIndent, text: cell.trim()};
        cells.push(span);
      }
      cell = '';
      startCol = col + 1;
    } else if (chr == '\\') {
      chr = this.trimmedLineText[col];
      col += 1;
      if (chr == 'n') {
        cell += '\n';
      } else {
        if (chr != '|' && chr != '\\') {
          cell += '\\';
        }
        cell += chr;
      }
    } else {
      cell += chr;
    }
  }

  return cells;
};

GherkinLine.prototype.getTags = function getTags() {
  var column = this.indent + 1;
  var items = this.trimmedLineText.trim().split('@');
  items.shift();
  return items.map(function (item) {
    var length = item.length;
    var span = {column: column, text: '@' + item.trim()};
    column += length + 1;
    return span;
  });
};

module.exports = GherkinLine;

},{"./count_symbols":4}],9:[function(require,module,exports){
// This file is generated. Do not edit! Edit gherkin-javascript.razor instead.
var Errors = require('./errors');
var AstBuilder = require('./ast_builder');
var TokenScanner = require('./token_scanner');
var TokenMatcher = require('./token_matcher');

var RULE_TYPES = [
  'None',
  '_EOF', // #EOF
  '_Empty', // #Empty
  '_Comment', // #Comment
  '_TagLine', // #TagLine
  '_FeatureLine', // #FeatureLine
  '_BackgroundLine', // #BackgroundLine
  '_ScenarioLine', // #ScenarioLine
  '_ScenarioOutlineLine', // #ScenarioOutlineLine
  '_ExamplesLine', // #ExamplesLine
  '_StepLine', // #StepLine
  '_DocStringSeparator', // #DocStringSeparator
  '_TableRow', // #TableRow
  '_Language', // #Language
  '_Other', // #Other
  'GherkinDocument', // GherkinDocument! := Feature?
  'Feature', // Feature! := Feature_Header Background? Scenario_Definition*
  'Feature_Header', // Feature_Header! := #Language? Tags? #FeatureLine Feature_Description
  'Background', // Background! := #BackgroundLine Background_Description Scenario_Step*
  'Scenario_Definition', // Scenario_Definition! := Tags? (Scenario | ScenarioOutline)
  'Scenario', // Scenario! := #ScenarioLine Scenario_Description Scenario_Step*
  'ScenarioOutline', // ScenarioOutline! := #ScenarioOutlineLine ScenarioOutline_Description ScenarioOutline_Step* Examples_Definition*
  'Examples_Definition', // Examples_Definition! [#Empty|#Comment|#TagLine-&gt;#ExamplesLine] := Tags? Examples
  'Examples', // Examples! := #ExamplesLine Examples_Description Examples_Table?
  'Examples_Table', // Examples_Table! := #TableRow #TableRow*
  'Scenario_Step', // Scenario_Step := Step
  'ScenarioOutline_Step', // ScenarioOutline_Step := Step
  'Step', // Step! := #StepLine Step_Arg?
  'Step_Arg', // Step_Arg := (DataTable | DocString)
  'DataTable', // DataTable! := #TableRow+
  'DocString', // DocString! := #DocStringSeparator #Other* #DocStringSeparator
  'Tags', // Tags! := #TagLine+
  'Feature_Description', // Feature_Description := Description_Helper
  'Background_Description', // Background_Description := Description_Helper
  'Scenario_Description', // Scenario_Description := Description_Helper
  'ScenarioOutline_Description', // ScenarioOutline_Description := Description_Helper
  'Examples_Description', // Examples_Description := Description_Helper
  'Description_Helper', // Description_Helper := #Empty* Description? #Comment*
  'Description', // Description! := #Other+
];

module.exports = function Parser(builder) {
  builder = builder || new AstBuilder();
  var self = this;
  var context;

  this.parse = function(tokenScanner, tokenMatcher) {
    if(typeof tokenScanner == 'string') {
      tokenScanner = new TokenScanner(tokenScanner);
    }
    tokenMatcher = tokenMatcher || new TokenMatcher();
    builder.reset();
    tokenMatcher.reset();
    context = {
      tokenScanner: tokenScanner,
      tokenMatcher: tokenMatcher,
      tokenQueue: [],
      errors: []
    };
    startRule(context, "GherkinDocument");
    var state = 0;
    var token = null;
    while(true) {
      token = readToken(context);
      state = matchToken(state, token, context);
      if(token.isEof) break;
    }

    endRule(context, "GherkinDocument");

    if(context.errors.length > 0) {
      throw Errors.CompositeParserException.create(context.errors);
    }

    return getResult();
  };

  function addError(context, error) {
    context.errors.push(error);
    if (context.errors.length > 10)
      throw Errors.CompositeParserException.create(context.errors);
  }

  function startRule(context, ruleType) {
    handleAstError(context, function () {
      builder.startRule(ruleType);
    });
  }

  function endRule(context, ruleType) {
    handleAstError(context, function () {
      builder.endRule(ruleType);
    });
  }

  function build(context, token) {
    handleAstError(context, function () {
      builder.build(token);
    });
  }

  function getResult() {
    return builder.getResult();
  }

  function handleAstError(context, action) {
    handleExternalError(context, true, action)
  }

  function handleExternalError(context, defaultValue, action) {
    if(self.stopAtFirstError) return action();
    try {
      return action();
    } catch (e) {
      if(e instanceof Errors.CompositeParserException) {
        e.errors.forEach(function (error) {
          addError(context, error);
        });
      } else if(
        e instanceof Errors.ParserException ||
        e instanceof Errors.AstBuilderException ||
        e instanceof Errors.UnexpectedTokenException ||
        e instanceof Errors.NoSuchLanguageException
      ) {
        addError(context, e);
      } else {
        throw e;
      }
    }
    return defaultValue;
  }

  function readToken(context) {
    return context.tokenQueue.length > 0 ?
      context.tokenQueue.shift() :
      context.tokenScanner.read();
  }

  function matchToken(state, token, context) {
    switch(state) {
    case 0:
      return matchTokenAt_0(token, context);
    case 1:
      return matchTokenAt_1(token, context);
    case 2:
      return matchTokenAt_2(token, context);
    case 3:
      return matchTokenAt_3(token, context);
    case 4:
      return matchTokenAt_4(token, context);
    case 5:
      return matchTokenAt_5(token, context);
    case 6:
      return matchTokenAt_6(token, context);
    case 7:
      return matchTokenAt_7(token, context);
    case 8:
      return matchTokenAt_8(token, context);
    case 9:
      return matchTokenAt_9(token, context);
    case 10:
      return matchTokenAt_10(token, context);
    case 11:
      return matchTokenAt_11(token, context);
    case 12:
      return matchTokenAt_12(token, context);
    case 13:
      return matchTokenAt_13(token, context);
    case 14:
      return matchTokenAt_14(token, context);
    case 15:
      return matchTokenAt_15(token, context);
    case 16:
      return matchTokenAt_16(token, context);
    case 17:
      return matchTokenAt_17(token, context);
    case 18:
      return matchTokenAt_18(token, context);
    case 19:
      return matchTokenAt_19(token, context);
    case 20:
      return matchTokenAt_20(token, context);
    case 21:
      return matchTokenAt_21(token, context);
    case 22:
      return matchTokenAt_22(token, context);
    case 23:
      return matchTokenAt_23(token, context);
    case 24:
      return matchTokenAt_24(token, context);
    case 25:
      return matchTokenAt_25(token, context);
    case 26:
      return matchTokenAt_26(token, context);
    case 28:
      return matchTokenAt_28(token, context);
    case 29:
      return matchTokenAt_29(token, context);
    case 30:
      return matchTokenAt_30(token, context);
    case 31:
      return matchTokenAt_31(token, context);
    case 32:
      return matchTokenAt_32(token, context);
    case 33:
      return matchTokenAt_33(token, context);
    default:
      throw new Error("Unknown state: " + state);
    }
  }


  // Start
  function matchTokenAt_0(token, context) {
    if(match_EOF(context, token)) {
      build(context, token);
      return 27;
    }
    if(match_Language(context, token)) {
      startRule(context, 'Feature');
      startRule(context, 'Feature_Header');
      build(context, token);
      return 1;
    }
    if(match_TagLine(context, token)) {
      startRule(context, 'Feature');
      startRule(context, 'Feature_Header');
      startRule(context, 'Tags');
      build(context, token);
      return 2;
    }
    if(match_FeatureLine(context, token)) {
      startRule(context, 'Feature');
      startRule(context, 'Feature_Header');
      build(context, token);
      return 3;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 0;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 0;
    }
    
    var stateComment = "State: 0 - Start";
    token.detach();
    var expectedTokens = ["#EOF", "#Language", "#TagLine", "#FeatureLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 0;
  }


  // GherkinDocument:0>Feature:0>Feature_Header:0>#Language:0
  function matchTokenAt_1(token, context) {
    if(match_TagLine(context, token)) {
      startRule(context, 'Tags');
      build(context, token);
      return 2;
    }
    if(match_FeatureLine(context, token)) {
      build(context, token);
      return 3;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 1;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 1;
    }
    
    var stateComment = "State: 1 - GherkinDocument:0>Feature:0>Feature_Header:0>#Language:0";
    token.detach();
    var expectedTokens = ["#TagLine", "#FeatureLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 1;
  }


  // GherkinDocument:0>Feature:0>Feature_Header:1>Tags:0>#TagLine:0
  function matchTokenAt_2(token, context) {
    if(match_TagLine(context, token)) {
      build(context, token);
      return 2;
    }
    if(match_FeatureLine(context, token)) {
      endRule(context, 'Tags');
      build(context, token);
      return 3;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 2;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 2;
    }
    
    var stateComment = "State: 2 - GherkinDocument:0>Feature:0>Feature_Header:1>Tags:0>#TagLine:0";
    token.detach();
    var expectedTokens = ["#TagLine", "#FeatureLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 2;
  }


  // GherkinDocument:0>Feature:0>Feature_Header:2>#FeatureLine:0
  function matchTokenAt_3(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Feature_Header');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 3;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 5;
    }
    if(match_BackgroundLine(context, token)) {
      endRule(context, 'Feature_Header');
      startRule(context, 'Background');
      build(context, token);
      return 6;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Feature_Header');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'Feature_Header');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'Feature_Header');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Other(context, token)) {
      startRule(context, 'Description');
      build(context, token);
      return 4;
    }
    
    var stateComment = "State: 3 - GherkinDocument:0>Feature:0>Feature_Header:2>#FeatureLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Empty", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 3;
  }


  // GherkinDocument:0>Feature:0>Feature_Header:3>Feature_Description:0>Description_Helper:1>Description:0>#Other:0
  function matchTokenAt_4(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Feature_Header');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_Comment(context, token)) {
      endRule(context, 'Description');
      build(context, token);
      return 5;
    }
    if(match_BackgroundLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Feature_Header');
      startRule(context, 'Background');
      build(context, token);
      return 6;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Feature_Header');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Feature_Header');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Feature_Header');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Other(context, token)) {
      build(context, token);
      return 4;
    }
    
    var stateComment = "State: 4 - GherkinDocument:0>Feature:0>Feature_Header:3>Feature_Description:0>Description_Helper:1>Description:0>#Other:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 4;
  }


  // GherkinDocument:0>Feature:0>Feature_Header:3>Feature_Description:0>Description_Helper:2>#Comment:0
  function matchTokenAt_5(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Feature_Header');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 5;
    }
    if(match_BackgroundLine(context, token)) {
      endRule(context, 'Feature_Header');
      startRule(context, 'Background');
      build(context, token);
      return 6;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Feature_Header');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'Feature_Header');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'Feature_Header');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 5;
    }
    
    var stateComment = "State: 5 - GherkinDocument:0>Feature:0>Feature_Header:3>Feature_Description:0>Description_Helper:2>#Comment:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 5;
  }


  // GherkinDocument:0>Feature:1>Background:0>#BackgroundLine:0
  function matchTokenAt_6(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Background');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 6;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 8;
    }
    if(match_StepLine(context, token)) {
      startRule(context, 'Step');
      build(context, token);
      return 9;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Background');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'Background');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'Background');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Other(context, token)) {
      startRule(context, 'Description');
      build(context, token);
      return 7;
    }
    
    var stateComment = "State: 6 - GherkinDocument:0>Feature:1>Background:0>#BackgroundLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Empty", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 6;
  }


  // GherkinDocument:0>Feature:1>Background:1>Background_Description:0>Description_Helper:1>Description:0>#Other:0
  function matchTokenAt_7(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Background');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_Comment(context, token)) {
      endRule(context, 'Description');
      build(context, token);
      return 8;
    }
    if(match_StepLine(context, token)) {
      endRule(context, 'Description');
      startRule(context, 'Step');
      build(context, token);
      return 9;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Background');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Background');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Background');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Other(context, token)) {
      build(context, token);
      return 7;
    }
    
    var stateComment = "State: 7 - GherkinDocument:0>Feature:1>Background:1>Background_Description:0>Description_Helper:1>Description:0>#Other:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 7;
  }


  // GherkinDocument:0>Feature:1>Background:1>Background_Description:0>Description_Helper:2>#Comment:0
  function matchTokenAt_8(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Background');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 8;
    }
    if(match_StepLine(context, token)) {
      startRule(context, 'Step');
      build(context, token);
      return 9;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Background');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'Background');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'Background');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 8;
    }
    
    var stateComment = "State: 8 - GherkinDocument:0>Feature:1>Background:1>Background_Description:0>Description_Helper:2>#Comment:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 8;
  }


  // GherkinDocument:0>Feature:1>Background:2>Scenario_Step:0>Step:0>#StepLine:0
  function matchTokenAt_9(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Step');
      endRule(context, 'Background');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_TableRow(context, token)) {
      startRule(context, 'DataTable');
      build(context, token);
      return 10;
    }
    if(match_DocStringSeparator(context, token)) {
      startRule(context, 'DocString');
      build(context, token);
      return 32;
    }
    if(match_StepLine(context, token)) {
      endRule(context, 'Step');
      startRule(context, 'Step');
      build(context, token);
      return 9;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Step');
      endRule(context, 'Background');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'Step');
      endRule(context, 'Background');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'Step');
      endRule(context, 'Background');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 9;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 9;
    }
    
    var stateComment = "State: 9 - GherkinDocument:0>Feature:1>Background:2>Scenario_Step:0>Step:0>#StepLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 9;
  }


  // GherkinDocument:0>Feature:1>Background:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:0>DataTable:0>#TableRow:0
  function matchTokenAt_10(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Step');
      endRule(context, 'Background');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_TableRow(context, token)) {
      build(context, token);
      return 10;
    }
    if(match_StepLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Step');
      startRule(context, 'Step');
      build(context, token);
      return 9;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Step');
      endRule(context, 'Background');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Step');
      endRule(context, 'Background');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Step');
      endRule(context, 'Background');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 10;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 10;
    }
    
    var stateComment = "State: 10 - GherkinDocument:0>Feature:1>Background:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:0>DataTable:0>#TableRow:0";
    token.detach();
    var expectedTokens = ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 10;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:0>Tags:0>#TagLine:0
  function matchTokenAt_11(token, context) {
    if(match_TagLine(context, token)) {
      build(context, token);
      return 11;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'Tags');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'Tags');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 11;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 11;
    }
    
    var stateComment = "State: 11 - GherkinDocument:0>Feature:2>Scenario_Definition:0>Tags:0>#TagLine:0";
    token.detach();
    var expectedTokens = ["#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 11;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:0>#ScenarioLine:0
  function matchTokenAt_12(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 12;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 14;
    }
    if(match_StepLine(context, token)) {
      startRule(context, 'Step');
      build(context, token);
      return 15;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Other(context, token)) {
      startRule(context, 'Description');
      build(context, token);
      return 13;
    }
    
    var stateComment = "State: 12 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:0>#ScenarioLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Empty", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 12;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:1>Scenario_Description:0>Description_Helper:1>Description:0>#Other:0
  function matchTokenAt_13(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_Comment(context, token)) {
      endRule(context, 'Description');
      build(context, token);
      return 14;
    }
    if(match_StepLine(context, token)) {
      endRule(context, 'Description');
      startRule(context, 'Step');
      build(context, token);
      return 15;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Other(context, token)) {
      build(context, token);
      return 13;
    }
    
    var stateComment = "State: 13 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:1>Scenario_Description:0>Description_Helper:1>Description:0>#Other:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 13;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:1>Scenario_Description:0>Description_Helper:2>#Comment:0
  function matchTokenAt_14(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 14;
    }
    if(match_StepLine(context, token)) {
      startRule(context, 'Step');
      build(context, token);
      return 15;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 14;
    }
    
    var stateComment = "State: 14 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:1>Scenario_Description:0>Description_Helper:2>#Comment:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 14;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:2>Scenario_Step:0>Step:0>#StepLine:0
  function matchTokenAt_15(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Step');
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_TableRow(context, token)) {
      startRule(context, 'DataTable');
      build(context, token);
      return 16;
    }
    if(match_DocStringSeparator(context, token)) {
      startRule(context, 'DocString');
      build(context, token);
      return 30;
    }
    if(match_StepLine(context, token)) {
      endRule(context, 'Step');
      startRule(context, 'Step');
      build(context, token);
      return 15;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Step');
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'Step');
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'Step');
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 15;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 15;
    }
    
    var stateComment = "State: 15 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:2>Scenario_Step:0>Step:0>#StepLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 15;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:0>DataTable:0>#TableRow:0
  function matchTokenAt_16(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Step');
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_TableRow(context, token)) {
      build(context, token);
      return 16;
    }
    if(match_StepLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Step');
      startRule(context, 'Step');
      build(context, token);
      return 15;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Step');
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Step');
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Step');
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 16;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 16;
    }
    
    var stateComment = "State: 16 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:0>DataTable:0>#TableRow:0";
    token.detach();
    var expectedTokens = ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 16;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:0>#ScenarioOutlineLine:0
  function matchTokenAt_17(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 17;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 19;
    }
    if(match_StepLine(context, token)) {
      startRule(context, 'Step');
      build(context, token);
      return 20;
    }
    if(match_TagLine(context, token)) {
      if(lookahead_0(context, token)) {
      startRule(context, 'Examples_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 22;
      }
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ExamplesLine(context, token)) {
      startRule(context, 'Examples_Definition');
      startRule(context, 'Examples');
      build(context, token);
      return 23;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Other(context, token)) {
      startRule(context, 'Description');
      build(context, token);
      return 18;
    }
    
    var stateComment = "State: 17 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:0>#ScenarioOutlineLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Empty", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 17;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:1>ScenarioOutline_Description:0>Description_Helper:1>Description:0>#Other:0
  function matchTokenAt_18(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_Comment(context, token)) {
      endRule(context, 'Description');
      build(context, token);
      return 19;
    }
    if(match_StepLine(context, token)) {
      endRule(context, 'Description');
      startRule(context, 'Step');
      build(context, token);
      return 20;
    }
    if(match_TagLine(context, token)) {
      if(lookahead_0(context, token)) {
      endRule(context, 'Description');
      startRule(context, 'Examples_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 22;
      }
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ExamplesLine(context, token)) {
      endRule(context, 'Description');
      startRule(context, 'Examples_Definition');
      startRule(context, 'Examples');
      build(context, token);
      return 23;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Other(context, token)) {
      build(context, token);
      return 18;
    }
    
    var stateComment = "State: 18 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:1>ScenarioOutline_Description:0>Description_Helper:1>Description:0>#Other:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 18;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:1>ScenarioOutline_Description:0>Description_Helper:2>#Comment:0
  function matchTokenAt_19(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 19;
    }
    if(match_StepLine(context, token)) {
      startRule(context, 'Step');
      build(context, token);
      return 20;
    }
    if(match_TagLine(context, token)) {
      if(lookahead_0(context, token)) {
      startRule(context, 'Examples_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 22;
      }
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ExamplesLine(context, token)) {
      startRule(context, 'Examples_Definition');
      startRule(context, 'Examples');
      build(context, token);
      return 23;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 19;
    }
    
    var stateComment = "State: 19 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:1>ScenarioOutline_Description:0>Description_Helper:2>#Comment:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 19;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:2>ScenarioOutline_Step:0>Step:0>#StepLine:0
  function matchTokenAt_20(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Step');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_TableRow(context, token)) {
      startRule(context, 'DataTable');
      build(context, token);
      return 21;
    }
    if(match_DocStringSeparator(context, token)) {
      startRule(context, 'DocString');
      build(context, token);
      return 28;
    }
    if(match_StepLine(context, token)) {
      endRule(context, 'Step');
      startRule(context, 'Step');
      build(context, token);
      return 20;
    }
    if(match_TagLine(context, token)) {
      if(lookahead_0(context, token)) {
      endRule(context, 'Step');
      startRule(context, 'Examples_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 22;
      }
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Step');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ExamplesLine(context, token)) {
      endRule(context, 'Step');
      startRule(context, 'Examples_Definition');
      startRule(context, 'Examples');
      build(context, token);
      return 23;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'Step');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'Step');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 20;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 20;
    }
    
    var stateComment = "State: 20 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:2>ScenarioOutline_Step:0>Step:0>#StepLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 20;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:2>ScenarioOutline_Step:0>Step:1>Step_Arg:0>__alt1:0>DataTable:0>#TableRow:0
  function matchTokenAt_21(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Step');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_TableRow(context, token)) {
      build(context, token);
      return 21;
    }
    if(match_StepLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Step');
      startRule(context, 'Step');
      build(context, token);
      return 20;
    }
    if(match_TagLine(context, token)) {
      if(lookahead_0(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Step');
      startRule(context, 'Examples_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 22;
      }
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Step');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ExamplesLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Step');
      startRule(context, 'Examples_Definition');
      startRule(context, 'Examples');
      build(context, token);
      return 23;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Step');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Step');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 21;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 21;
    }
    
    var stateComment = "State: 21 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:2>ScenarioOutline_Step:0>Step:1>Step_Arg:0>__alt1:0>DataTable:0>#TableRow:0";
    token.detach();
    var expectedTokens = ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 21;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:0>Tags:0>#TagLine:0
  function matchTokenAt_22(token, context) {
    if(match_TagLine(context, token)) {
      build(context, token);
      return 22;
    }
    if(match_ExamplesLine(context, token)) {
      endRule(context, 'Tags');
      startRule(context, 'Examples');
      build(context, token);
      return 23;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 22;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 22;
    }
    
    var stateComment = "State: 22 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:0>Tags:0>#TagLine:0";
    token.detach();
    var expectedTokens = ["#TagLine", "#ExamplesLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 22;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:1>Examples:0>#ExamplesLine:0
  function matchTokenAt_23(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 23;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 25;
    }
    if(match_TableRow(context, token)) {
      startRule(context, 'Examples_Table');
      build(context, token);
      return 26;
    }
    if(match_TagLine(context, token)) {
      if(lookahead_0(context, token)) {
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      startRule(context, 'Examples_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 22;
      }
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ExamplesLine(context, token)) {
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      startRule(context, 'Examples_Definition');
      startRule(context, 'Examples');
      build(context, token);
      return 23;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Other(context, token)) {
      startRule(context, 'Description');
      build(context, token);
      return 24;
    }
    
    var stateComment = "State: 23 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:1>Examples:0>#ExamplesLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Empty", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 23;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:1>Examples:1>Examples_Description:0>Description_Helper:1>Description:0>#Other:0
  function matchTokenAt_24(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_Comment(context, token)) {
      endRule(context, 'Description');
      build(context, token);
      return 25;
    }
    if(match_TableRow(context, token)) {
      endRule(context, 'Description');
      startRule(context, 'Examples_Table');
      build(context, token);
      return 26;
    }
    if(match_TagLine(context, token)) {
      if(lookahead_0(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      startRule(context, 'Examples_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 22;
      }
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ExamplesLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      startRule(context, 'Examples_Definition');
      startRule(context, 'Examples');
      build(context, token);
      return 23;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Other(context, token)) {
      build(context, token);
      return 24;
    }
    
    var stateComment = "State: 24 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:1>Examples:1>Examples_Description:0>Description_Helper:1>Description:0>#Other:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 24;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:1>Examples:1>Examples_Description:0>Description_Helper:2>#Comment:0
  function matchTokenAt_25(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 25;
    }
    if(match_TableRow(context, token)) {
      startRule(context, 'Examples_Table');
      build(context, token);
      return 26;
    }
    if(match_TagLine(context, token)) {
      if(lookahead_0(context, token)) {
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      startRule(context, 'Examples_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 22;
      }
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ExamplesLine(context, token)) {
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      startRule(context, 'Examples_Definition');
      startRule(context, 'Examples');
      build(context, token);
      return 23;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 25;
    }
    
    var stateComment = "State: 25 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:1>Examples:1>Examples_Description:0>Description_Helper:2>#Comment:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 25;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:1>Examples:2>Examples_Table:0>#TableRow:0
  function matchTokenAt_26(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Examples_Table');
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_TableRow(context, token)) {
      build(context, token);
      return 26;
    }
    if(match_TagLine(context, token)) {
      if(lookahead_0(context, token)) {
      endRule(context, 'Examples_Table');
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      startRule(context, 'Examples_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 22;
      }
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Examples_Table');
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ExamplesLine(context, token)) {
      endRule(context, 'Examples_Table');
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      startRule(context, 'Examples_Definition');
      startRule(context, 'Examples');
      build(context, token);
      return 23;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'Examples_Table');
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'Examples_Table');
      endRule(context, 'Examples');
      endRule(context, 'Examples_Definition');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 26;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 26;
    }
    
    var stateComment = "State: 26 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:3>Examples_Definition:1>Examples:2>Examples_Table:0>#TableRow:0";
    token.detach();
    var expectedTokens = ["#EOF", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 26;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:2>ScenarioOutline_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:0>#DocStringSeparator:0
  function matchTokenAt_28(token, context) {
    if(match_DocStringSeparator(context, token)) {
      build(context, token);
      return 29;
    }
    if(match_Other(context, token)) {
      build(context, token);
      return 28;
    }
    
    var stateComment = "State: 28 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:2>ScenarioOutline_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:0>#DocStringSeparator:0";
    token.detach();
    var expectedTokens = ["#DocStringSeparator", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 28;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:2>ScenarioOutline_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:2>#DocStringSeparator:0
  function matchTokenAt_29(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Step');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_StepLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Step');
      startRule(context, 'Step');
      build(context, token);
      return 20;
    }
    if(match_TagLine(context, token)) {
      if(lookahead_0(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Step');
      startRule(context, 'Examples_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 22;
      }
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Step');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ExamplesLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Step');
      startRule(context, 'Examples_Definition');
      startRule(context, 'Examples');
      build(context, token);
      return 23;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Step');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Step');
      endRule(context, 'ScenarioOutline');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 29;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 29;
    }
    
    var stateComment = "State: 29 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:1>ScenarioOutline:2>ScenarioOutline_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:2>#DocStringSeparator:0";
    token.detach();
    var expectedTokens = ["#EOF", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 29;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:0>#DocStringSeparator:0
  function matchTokenAt_30(token, context) {
    if(match_DocStringSeparator(context, token)) {
      build(context, token);
      return 31;
    }
    if(match_Other(context, token)) {
      build(context, token);
      return 30;
    }
    
    var stateComment = "State: 30 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:0>#DocStringSeparator:0";
    token.detach();
    var expectedTokens = ["#DocStringSeparator", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 30;
  }


  // GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:2>#DocStringSeparator:0
  function matchTokenAt_31(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Step');
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_StepLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Step');
      startRule(context, 'Step');
      build(context, token);
      return 15;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Step');
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Step');
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Step');
      endRule(context, 'Scenario');
      endRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 31;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 31;
    }
    
    var stateComment = "State: 31 - GherkinDocument:0>Feature:2>Scenario_Definition:1>__alt0:0>Scenario:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:2>#DocStringSeparator:0";
    token.detach();
    var expectedTokens = ["#EOF", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 31;
  }


  // GherkinDocument:0>Feature:1>Background:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:0>#DocStringSeparator:0
  function matchTokenAt_32(token, context) {
    if(match_DocStringSeparator(context, token)) {
      build(context, token);
      return 33;
    }
    if(match_Other(context, token)) {
      build(context, token);
      return 32;
    }
    
    var stateComment = "State: 32 - GherkinDocument:0>Feature:1>Background:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:0>#DocStringSeparator:0";
    token.detach();
    var expectedTokens = ["#DocStringSeparator", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 32;
  }


  // GherkinDocument:0>Feature:1>Background:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:2>#DocStringSeparator:0
  function matchTokenAt_33(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Step');
      endRule(context, 'Background');
      endRule(context, 'Feature');
      build(context, token);
      return 27;
    }
    if(match_StepLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Step');
      startRule(context, 'Step');
      build(context, token);
      return 9;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Step');
      endRule(context, 'Background');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 11;
    }
    if(match_ScenarioLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Step');
      endRule(context, 'Background');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'Scenario');
      build(context, token);
      return 12;
    }
    if(match_ScenarioOutlineLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Step');
      endRule(context, 'Background');
      startRule(context, 'Scenario_Definition');
      startRule(context, 'ScenarioOutline');
      build(context, token);
      return 17;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 33;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 33;
    }
    
    var stateComment = "State: 33 - GherkinDocument:0>Feature:1>Background:2>Scenario_Step:0>Step:1>Step_Arg:0>__alt1:1>DocString:2>#DocStringSeparator:0";
    token.detach();
    var expectedTokens = ["#EOF", "#StepLine", "#TagLine", "#ScenarioLine", "#ScenarioOutlineLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 33;
  }



  function match_EOF(context, token) {
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_EOF(token);
    });
  }


  function match_Empty(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_Empty(token);
    });
  }


  function match_Comment(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_Comment(token);
    });
  }


  function match_TagLine(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_TagLine(token);
    });
  }


  function match_FeatureLine(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_FeatureLine(token);
    });
  }


  function match_BackgroundLine(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_BackgroundLine(token);
    });
  }


  function match_ScenarioLine(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_ScenarioLine(token);
    });
  }


  function match_ScenarioOutlineLine(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_ScenarioOutlineLine(token);
    });
  }


  function match_ExamplesLine(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_ExamplesLine(token);
    });
  }


  function match_StepLine(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_StepLine(token);
    });
  }


  function match_DocStringSeparator(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_DocStringSeparator(token);
    });
  }


  function match_TableRow(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_TableRow(token);
    });
  }


  function match_Language(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_Language(token);
    });
  }


  function match_Other(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_Other(token);
    });
  }



  function lookahead_0(context, currentToken) {
    currentToken.detach();
    var token;
    var queue = [];
    var match = false;
    do {
      token = readToken(context);
      token.detach();
      queue.push(token);

      if (false  || match_ExamplesLine(context, token)) {
        match = true;
        break;
      }
    } while(false  || match_Empty(context, token) || match_Comment(context, token) || match_TagLine(context, token));

    context.tokenQueue = context.tokenQueue.concat(queue);

    return match;
  }


}

},{"./ast_builder":2,"./errors":6,"./token_matcher":15,"./token_scanner":16}],10:[function(require,module,exports){
var countSymbols = require('../count_symbols');

function Compiler() {
  this.compile = function (gherkin_document) {
    var pickles = [];

    if (gherkin_document.feature == null) return pickles;

    var feature = gherkin_document.feature;
    var language = feature.language;
    var featureTags = feature.tags;
    var backgroundSteps = [];

    feature.children.forEach(function (scenarioDefinition) {
      if(scenarioDefinition.type === 'Background') {
        backgroundSteps = pickleSteps(scenarioDefinition);
      } else if(scenarioDefinition.type === 'Scenario') {
        compileScenario(featureTags, backgroundSteps, scenarioDefinition, language, pickles);
      } else {
        compileScenarioOutline(featureTags, backgroundSteps, scenarioDefinition, language, pickles);
      }
    });
    return pickles;
  };

  function compileScenario(featureTags, backgroundSteps, scenario, language, pickles) {
    if (scenario.steps.length == 0) return;

    var steps = [].concat(backgroundSteps);

    var tags = [].concat(featureTags).concat(scenario.tags);

    scenario.steps.forEach(function (step) {
      steps.push(pickleStep(step));
    });

    var pickle = {
      tags: pickleTags(tags),
      name: scenario.name,
      language: language,
      locations: [pickleLocation(scenario.location)],
      steps: steps
    };
    pickles.push(pickle);
  }

  function compileScenarioOutline(featureTags, backgroundSteps, scenarioOutline, language, pickles) {
    if (scenarioOutline.steps.length == 0) return;

    scenarioOutline.examples.filter(function(e) { return e.tableHeader != undefined; }).forEach(function (examples) {
      var variableCells = examples.tableHeader.cells;
      examples.tableBody.forEach(function (values) {
        var valueCells = values.cells;
        var steps = [].concat(backgroundSteps);
        var tags = [].concat(featureTags).concat(scenarioOutline.tags).concat(examples.tags);

        scenarioOutline.steps.forEach(function (scenarioOutlineStep) {
          var stepText = interpolate(scenarioOutlineStep.text, variableCells, valueCells);
          var args = createPickleArguments(scenarioOutlineStep.argument, variableCells, valueCells);
          var pickleStep = {
            text: stepText,
            arguments: args,
            locations: [
              pickleLocation(values.location),
              pickleStepLocation(scenarioOutlineStep)
            ]
          };
          steps.push(pickleStep);
        });

        var pickle = {
          name: interpolate(scenarioOutline.name, variableCells, valueCells),
          language: language,
          steps: steps,
          tags: pickleTags(tags),
          locations: [
            pickleLocation(values.location),
            pickleLocation(scenarioOutline.location)
          ]
        };
        pickles.push(pickle);

      });
    });
  }

  function createPickleArguments(argument, variableCells, valueCells) {
    var result = [];
    if (!argument) return result;
    if (argument.type === 'DataTable') {
      var table = {
        rows: argument.rows.map(function (row) {
          return {
            cells: row.cells.map(function (cell) {
              return {
                location: pickleLocation(cell.location),
                value: interpolate(cell.value, variableCells, valueCells)
              };
            })
          };
        })
      };
      result.push(table);
    } else if (argument.type === 'DocString') {
      var docString = {
        location: pickleLocation(argument.location),
        content: interpolate(argument.content, variableCells, valueCells)
      };
      result.push(docString);
    } else {
      throw Error('Internal error');
    }
    return result;
  }

  function interpolate(name, variableCells, valueCells) {
    variableCells.forEach(function (variableCell, n) {
      var valueCell = valueCells[n];
      var search = new RegExp('<' + variableCell.value + '>', 'g');
      name = name.replace(search, valueCell.value);
    });
    return name;
  }

  function pickleSteps(scenarioDefinition) {
    return scenarioDefinition.steps.map(function (step) {
      return pickleStep(step);
    });
  }

  function pickleStep(step) {
    return {
      text: step.text,
      arguments: createPickleArguments(step.argument, [], []),
      locations: [pickleStepLocation(step)]
    }
  }

  function pickleStepLocation(step) {
    return {
      line: step.location.line,
      column: step.location.column + (step.keyword ? countSymbols(step.keyword) : 0)
    };
  }

  function pickleLocation(location) {
    return {
      line: location.line,
      column: location.column
    }
  }

  function pickleTags(tags) {
    return tags.map(function (tag) {
      return pickleTag(tag);
    });
  }

  function pickleTag(tag) {
    return {
      name: tag.name,
      location: pickleLocation(tag.location)
    };
  }
}

module.exports = Compiler;

},{"../count_symbols":4}],11:[function(require,module,exports){
var Stream = require('stream')
var Parser = require('../parser')
var Compiler = require('../pickles/compiler')

var compiler = new Compiler();
var parser = new Parser();
parser.stopAtFirstError = false;

function gherkinStream(options) {
  return new Stream.Transform({
    objectMode: true,
    transform: function (event, _, callback) {
      if (event.type === 'source') {
        try {
          var gherkinDocument = parser.parse(event.data);

          if (options.printSource)
            this.push(event);

          if (options.printAst)
            this.push({
              type: 'gherkin-document',
              uri: event.uri,
              document: gherkinDocument
            });

          if (options.printPickles) {
            var pickles = compiler.compile(gherkinDocument  );
            for (var p in pickles) {
              this.push({
                type: 'pickle',
                uri: event.uri,
                pickle: pickles[p]
              })
            }
          }
        } catch (err) {
          var errors = err.errors || [err]
          for (var e in errors) {
            this.push({
              type: "attachment",
              source: {
                uri: event.uri,
                start: {
                  line: errors[e].location.line,
                  column: errors[e].location.column
                }
              },
              data: errors[e].message,
              media: {
                encoding: "utf-8",
                type: "text/vnd.cucumber.stacktrace+plain"
              }
            })
          }
        }
      } else {
        this.push(event)
      }
      callback()
    }
  })
}

module.exports = gherkinStream

},{"../parser":9,"../pickles/compiler":10,"stream":41}],12:[function(require,module,exports){
var Stream = require('stream')

function ndjsonStream() {
  return new Stream.Transform({
    objectMode: true,
    transform: function (event, _, callback) {
      this.push(JSON.stringify(event) + "\n")
      callback()
    }
  })
}

module.exports = ndjsonStream
},{"stream":41}],13:[function(require,module,exports){
var Stream = require('stream')
var fs = require('fs')

function sourceEventStream(paths) {
  var stream = new Stream.PassThrough({objectMode: true})
  Promise.all(paths.map(function (path) {
    return new Promise(function (resolve, reject) {
      fs.readFile(path, 'utf-8', function (err, data) {
        if (err) return reject(err)
        resolve({
          type: 'source',
          uri: path,
          data: data,
          media: {
            encoding: 'utf-8',
            type: 'text/vnd.cucumber.gherkin+plain'
          }
        })
      })
    })
  }))
    .then(function (events) {
      events.forEach(function (event) {
        stream.write(event)
      })
    })
  return stream
}

module.exports = sourceEventStream
},{"fs":19,"stream":41}],14:[function(require,module,exports){
function Token(line, location) {
  this.line = line;
  this.location = location;
  this.isEof = line == null;
};

Token.prototype.getTokenValue = function () {
  return this.isEof ? "EOF" : this.line.getLineText(-1);
};

Token.prototype.detach = function () {
  // TODO: Detach line, but is this really needed?
};

module.exports = Token;

},{}],15:[function(require,module,exports){
var DIALECTS = require('./dialects');
var Errors = require('./errors');
var LANGUAGE_PATTERN = /^\s*#\s*language\s*:\s*([a-zA-Z\-_]+)\s*$/;

module.exports = function TokenMatcher(defaultDialectName) {
  defaultDialectName = defaultDialectName || 'en';

  var dialect;
  var dialectName;
  var activeDocStringSeparator;
  var indentToRemove;

  function changeDialect(newDialectName, location) {
    var newDialect = DIALECTS[newDialectName];
    if(!newDialect) {
      throw Errors.NoSuchLanguageException.create(newDialectName, location);
    }

    dialectName = newDialectName;
    dialect = newDialect;
  }

  this.reset = function () {
    if(dialectName != defaultDialectName) changeDialect(defaultDialectName);
    activeDocStringSeparator = null;
    indentToRemove = 0;
  };

  this.reset();

  this.match_TagLine = function match_TagLine(token) {
    if(token.line.startsWith('@')) {
      setTokenMatched(token, 'TagLine', null, null, null, token.line.getTags());
      return true;
    }
    return false;
  };

  this.match_FeatureLine = function match_FeatureLine(token) {
    return matchTitleLine(token, 'FeatureLine', dialect.feature);
  };

  this.match_ScenarioLine = function match_ScenarioLine(token) {
    return matchTitleLine(token, 'ScenarioLine', dialect.scenario);
  };

  this.match_ScenarioOutlineLine = function match_ScenarioOutlineLine(token) {
    return matchTitleLine(token, 'ScenarioOutlineLine', dialect.scenarioOutline);
  };

  this.match_BackgroundLine = function match_BackgroundLine(token) {
    return matchTitleLine(token, 'BackgroundLine', dialect.background);
  };

  this.match_ExamplesLine = function match_ExamplesLine(token) {
    return matchTitleLine(token, 'ExamplesLine', dialect.examples);
  };

  this.match_TableRow = function match_TableRow(token) {
    if (token.line.startsWith('|')) {
      // TODO: indent
      setTokenMatched(token, 'TableRow', null, null, null, token.line.getTableCells());
      return true;
    }
    return false;
  };

  this.match_Empty = function match_Empty(token) {
    if (token.line.isEmpty) {
      setTokenMatched(token, 'Empty', null, null, 0);
      return true;
    }
    return false;
  };

  this.match_Comment = function match_Comment(token) {
    if(token.line.startsWith('#')) {
      var text = token.line.getLineText(0); //take the entire line, including leading space
      setTokenMatched(token, 'Comment', text, null, 0);
      return true;
    }
    return false;
  };

  this.match_Language = function match_Language(token) {
    var match;
    if(match = token.line.trimmedLineText.match(LANGUAGE_PATTERN)) {
      var newDialectName = match[1];
      setTokenMatched(token, 'Language', newDialectName);

      changeDialect(newDialectName, token.location);
      return true;
    }
    return false;
  };

  this.match_DocStringSeparator = function match_DocStringSeparator(token) {
    return activeDocStringSeparator == null
      ?
      // open
      _match_DocStringSeparator(token, '"""', true) ||
      _match_DocStringSeparator(token, '```', true)
      :
      // close
      _match_DocStringSeparator(token, activeDocStringSeparator, false);
  };

  function _match_DocStringSeparator(token, separator, isOpen) {
    if (token.line.startsWith(separator)) {
      var contentType = null;
      if (isOpen) {
        contentType = token.line.getRestTrimmed(separator.length);
        activeDocStringSeparator = separator;
        indentToRemove = token.line.indent;
      } else {
        activeDocStringSeparator = null;
        indentToRemove = 0;
      }

      // TODO: Use the separator as keyword. That's needed for pretty printing.
      setTokenMatched(token, 'DocStringSeparator', contentType);
      return true;
    }
    return false;
  }

  this.match_EOF = function match_EOF(token) {
    if(token.isEof) {
      setTokenMatched(token, 'EOF');
      return true;
    }
    return false;
  };

  this.match_StepLine = function match_StepLine(token) {
    var keywords = []
      .concat(dialect.given)
      .concat(dialect.when)
      .concat(dialect.then)
      .concat(dialect.and)
      .concat(dialect.but);
    var length = keywords.length;
    for(var i = 0, keyword; i < length; i++) {
      var keyword = keywords[i];

      if (token.line.startsWith(keyword)) {
        var title = token.line.getRestTrimmed(keyword.length);
        setTokenMatched(token, 'StepLine', title, keyword);
        return true;
      }
    }
    return false;
  };

  this.match_Other = function match_Other(token) {
    var text = token.line.getLineText(indentToRemove); //take the entire line, except removing DocString indents
    setTokenMatched(token, 'Other', unescapeDocString(text), null, 0);
    return true;
  };

  function matchTitleLine(token, tokenType, keywords) {
    var length = keywords.length;
    for(var i = 0, keyword; i < length; i++) {
      var keyword = keywords[i];

      if (token.line.startsWithTitleKeyword(keyword)) {
        var title = token.line.getRestTrimmed(keyword.length + ':'.length);
        setTokenMatched(token, tokenType, title, keyword);
        return true;
      }
    }
    return false;
  }

  function setTokenMatched(token, matchedType, text, keyword, indent, items) {
    token.matchedType = matchedType;
    token.matchedText = text;
    token.matchedKeyword = keyword;
    token.matchedIndent = (typeof indent === 'number') ? indent : (token.line == null ? 0 : token.line.indent);
    token.matchedItems = items || [];

    token.location.column = token.matchedIndent + 1;
    token.matchedGherkinDialect = dialectName;
  }

  function unescapeDocString(text) {
    return activeDocStringSeparator != null ? text.replace("\\\"\\\"\\\"", "\"\"\"") : text;
  }
};

},{"./dialects":5,"./errors":6}],16:[function(require,module,exports){
var Token = require('./token');
var GherkinLine = require('./gherkin_line');

/**
 * The scanner reads a gherkin doc (typically read from a .feature file) and creates a token for each line. 
 * The tokens are passed to the parser, which outputs an AST (Abstract Syntax Tree).
 * 
 * If the scanner sees a `#` language header, it will reconfigure itself dynamically to look for 
 * Gherkin keywords for the associated language. The keywords are defined in gherkin-languages.json.
 */
module.exports = function TokenScanner(source) {
  var lines = source.split(/\r?\n/);
  if(lines.length > 0 && lines[lines.length-1].trim() == '') {
    lines.pop();
  }
  var lineNumber = 0;

  this.read = function () {
    var line = lines[lineNumber++];
    var location = {line: lineNumber, column: 0};
    return line == null ? new Token(null, location) : new Token(new GherkinLine(line, lineNumber), location);
  }
};

},{"./gherkin_line":8,"./token":14}],17:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],18:[function(require,module,exports){

},{}],19:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],20:[function(require,module,exports){
(function (global){
'use strict';

var buffer = require('buffer');
var Buffer = buffer.Buffer;
var SlowBuffer = buffer.SlowBuffer;
var MAX_LEN = buffer.kMaxLength || 2147483647;
exports.alloc = function alloc(size, fill, encoding) {
  if (typeof Buffer.alloc === 'function') {
    return Buffer.alloc(size, fill, encoding);
  }
  if (typeof encoding === 'number') {
    throw new TypeError('encoding must not be number');
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  var enc = encoding;
  var _fill = fill;
  if (_fill === undefined) {
    enc = undefined;
    _fill = 0;
  }
  var buf = new Buffer(size);
  if (typeof _fill === 'string') {
    var fillBuf = new Buffer(_fill, enc);
    var flen = fillBuf.length;
    var i = -1;
    while (++i < size) {
      buf[i] = fillBuf[i % flen];
    }
  } else {
    buf.fill(_fill);
  }
  return buf;
}
exports.allocUnsafe = function allocUnsafe(size) {
  if (typeof Buffer.allocUnsafe === 'function') {
    return Buffer.allocUnsafe(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new Buffer(size);
}
exports.from = function from(value, encodingOrOffset, length) {
  if (typeof Buffer.from === 'function' && (!global.Uint8Array || Uint8Array.from !== Buffer.from)) {
    return Buffer.from(value, encodingOrOffset, length);
  }
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof value === 'string') {
    return new Buffer(value, encodingOrOffset);
  }
  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    var offset = encodingOrOffset;
    if (arguments.length === 1) {
      return new Buffer(value);
    }
    if (typeof offset === 'undefined') {
      offset = 0;
    }
    var len = length;
    if (typeof len === 'undefined') {
      len = value.byteLength - offset;
    }
    if (offset >= value.byteLength) {
      throw new RangeError('\'offset\' is out of bounds');
    }
    if (len > value.byteLength - offset) {
      throw new RangeError('\'length\' is out of bounds');
    }
    return new Buffer(value.slice(offset, offset + len));
  }
  if (Buffer.isBuffer(value)) {
    var out = new Buffer(value.length);
    value.copy(out, 0, 0, value.length);
    return out;
  }
  if (value) {
    if (Array.isArray(value) || (typeof ArrayBuffer !== 'undefined' && value.buffer instanceof ArrayBuffer) || 'length' in value) {
      return new Buffer(value);
    }
    if (value.type === 'Buffer' && Array.isArray(value.data)) {
      return new Buffer(value.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ' + 'ArrayBuffer, Array, or array-like object.');
}
exports.allocUnsafeSlow = function allocUnsafeSlow(size) {
  if (typeof Buffer.allocUnsafeSlow === 'function') {
    return Buffer.allocUnsafeSlow(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size >= MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new SlowBuffer(size);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"buffer":21}],21:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('Invalid typed array length')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (value instanceof ArrayBuffer) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  return fromObject(value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj) {
    if (ArrayBuffer.isView(obj) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(0)
      }
      return fromArrayLike(obj)
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || string instanceof ArrayBuffer) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : new Buffer(val, encoding)
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

},{"base64-js":17,"ieee754":24}],22:[function(require,module,exports){
(function (Buffer){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})
},{"../../is-buffer/index.js":26}],23:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],24:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],25:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],26:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],27:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],28:[function(require,module,exports){
(function (process){
'use strict';

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

}).call(this,require('_process'))
},{"_process":29}],29:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],30:[function(require,module,exports){
module.exports = require("./lib/_stream_duplex.js")

},{"./lib/_stream_duplex.js":31}],31:[function(require,module,exports){
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}
},{"./_stream_readable":33,"./_stream_writable":35,"core-util-is":22,"inherits":25,"process-nextick-args":28}],32:[function(require,module,exports){
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":34,"core-util-is":22,"inherits":25}],33:[function(require,module,exports){
(function (process){
'use strict';

module.exports = Readable;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = require('events').EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream;
(function () {
  try {
    Stream = require('st' + 'ream');
  } catch (_) {} finally {
    if (!Stream) Stream = require('events').EventEmitter;
  }
})();
/*</replacement>*/

var Buffer = require('buffer').Buffer;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var debugUtil = require('util');
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = require('./internal/streams/BufferList');
var StringDecoder;

util.inherits(Readable, Stream);

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options && typeof options.read === 'function') this._read = options.read;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;

  if (!state.objectMode && typeof chunk === 'string') {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = bufferShim.from(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var _e = new Error('stream.unshift() after end event');
      stream.emit('error', _e);
    } else {
      var skipAdd;
      if (state.decoder && !addToFront && !encoding) {
        chunk = state.decoder.write(chunk);
        skipAdd = !state.objectMode && chunk.length === 0;
      }

      if (!addToFront) state.reading = false;

      // Don't add to the buffer if we've decoded to an empty string chunk and
      // we're not in object mode
      if (!skipAdd) {
        // if we want the data now, just emit it.
        if (state.flowing && state.length === 0 && !state.sync) {
          stream.emit('data', chunk);
          stream.read(0);
        } else {
          // update the buffer info.
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

          if (state.needReadable) emitReadable(stream);
        }
      }

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function (ev) {
    stream.on(ev, self.emit.bind(self, ev));
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = bufferShim.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
}).call(this,require('_process'))
},{"./_stream_duplex":31,"./internal/streams/BufferList":36,"_process":29,"buffer":21,"buffer-shims":20,"core-util-is":22,"events":23,"inherits":25,"isarray":27,"process-nextick-args":28,"string_decoder/":42,"util":18}],34:[function(require,module,exports){
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

'use strict';

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":31,"core-util-is":22,"inherits":25}],35:[function(require,module,exports){
(function (process){
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

'use strict';

module.exports = Writable;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/
var Stream;
(function () {
  try {
    Stream = require('st' + 'ream');
  } catch (_) {} finally {
    if (!Stream) Stream = require('events').EventEmitter;
  }
})();
/*</replacement>*/

var Buffer = require('buffer').Buffer;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/

util.inherits(Writable, Stream);

function nop() {}

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = Buffer.isBuffer(chunk);

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = bufferShim.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    chunk = decodeChunk(state, chunk, encoding);
    if (Buffer.isBuffer(chunk)) encoding = 'buffer';
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync) processNextTick(cb, er);else cb(er);

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    while (entry) {
      buffer[count] = entry;
      entry = entry.next;
      count += 1;
    }

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else {
      prefinish(stream, state);
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function (err) {
    var entry = _this.entry;
    _this.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    if (state.corkedRequestsFree) {
      state.corkedRequestsFree.next = _this;
    } else {
      state.corkedRequestsFree = _this;
    }
  };
}
}).call(this,require('_process'))
},{"./_stream_duplex":31,"_process":29,"buffer":21,"buffer-shims":20,"core-util-is":22,"events":23,"inherits":25,"process-nextick-args":28,"util-deprecate":43}],36:[function(require,module,exports){
'use strict';

var Buffer = require('buffer').Buffer;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/

module.exports = BufferList;

function BufferList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

BufferList.prototype.push = function (v) {
  var entry = { data: v, next: null };
  if (this.length > 0) this.tail.next = entry;else this.head = entry;
  this.tail = entry;
  ++this.length;
};

BufferList.prototype.unshift = function (v) {
  var entry = { data: v, next: this.head };
  if (this.length === 0) this.tail = entry;
  this.head = entry;
  ++this.length;
};

BufferList.prototype.shift = function () {
  if (this.length === 0) return;
  var ret = this.head.data;
  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
  --this.length;
  return ret;
};

BufferList.prototype.clear = function () {
  this.head = this.tail = null;
  this.length = 0;
};

BufferList.prototype.join = function (s) {
  if (this.length === 0) return '';
  var p = this.head;
  var ret = '' + p.data;
  while (p = p.next) {
    ret += s + p.data;
  }return ret;
};

BufferList.prototype.concat = function (n) {
  if (this.length === 0) return bufferShim.alloc(0);
  if (this.length === 1) return this.head.data;
  var ret = bufferShim.allocUnsafe(n >>> 0);
  var p = this.head;
  var i = 0;
  while (p) {
    p.data.copy(ret, i);
    i += p.data.length;
    p = p.next;
  }
  return ret;
};
},{"buffer":21,"buffer-shims":20}],37:[function(require,module,exports){
module.exports = require("./lib/_stream_passthrough.js")

},{"./lib/_stream_passthrough.js":32}],38:[function(require,module,exports){
(function (process){
var Stream = (function (){
  try {
    return require('st' + 'ream'); // hack to fix a circular dependency issue when used with browserify
  } catch(_){}
}());
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = Stream || exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

if (!process.browser && process.env.READABLE_STREAM === 'disable' && Stream) {
  module.exports = Stream;
}

}).call(this,require('_process'))
},{"./lib/_stream_duplex.js":31,"./lib/_stream_passthrough.js":32,"./lib/_stream_readable.js":33,"./lib/_stream_transform.js":34,"./lib/_stream_writable.js":35,"_process":29}],39:[function(require,module,exports){
module.exports = require("./lib/_stream_transform.js")

},{"./lib/_stream_transform.js":34}],40:[function(require,module,exports){
module.exports = require("./lib/_stream_writable.js")

},{"./lib/_stream_writable.js":35}],41:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":23,"inherits":25,"readable-stream/duplex.js":30,"readable-stream/passthrough.js":37,"readable-stream/readable.js":38,"readable-stream/transform.js":39,"readable-stream/writable.js":40}],42:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = require('buffer').Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}

},{"buffer":21}],43:[function(require,module,exports){
(function (global){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
