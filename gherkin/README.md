# Gherkin

Gherkin is a parser and compiler for the Gherkin language.

Gherkin is currently implemented for the following platforms (in order of birthday):

* [.NET](https://github.com/cucumber/gherkin-dotnet)
* [Java](https://github.com/cucumber/gherkin-java)
* [JavaScript](https://github.com/cucumber/gherkin-javascript)
* [Ruby](https://github.com/cucumber/gherkin-ruby)
* [Go](https://github.com/cucumber/gherkin-go)
* [Python](https://github.com/cucumber/gherkin-python)
* [Objective-C](https://github.com/cucumber/gherkin-objective-c)
* [Perl](https://github.com/cucumber/gherkin-perl)

See [`CONTRIBUTING.md`](CONTRIBUTING.md) if you want to contribute a parser for a new language.
Our wish-list is (in no particular order):

* C
* PHP
* Rust
* Elixir

## Usage

Gherkin can be used either through its command line interface (CLI) or as a library.

It is designed to be used in conjunction with other tools such as Cucumber or
Gherkin-Lint, which consume the output from the CLI or library.

Other tools should use the library if there is a Gherkin library in the same language
as the tool itself. If not, use the CLI in one of the implementations.

The Gherkin CLI makes it possible to implement Cucumber for a new language, say
Rust or Elixir, without having to implement a Gherkin parser too.

### CLI

The Gherkin CLI `gherkin` reads Gherkin source files (`.feature` files) and outputs
[ASTs](#ast) and [Pickles](#pickles).

The `gherkin` program takes any number of files as arguments and prints the results
to `STDOUT` as [Newline Delimited JSON](http://ndjson.org/).

Each line is a JSON document that conforms to the [Cucumber Event Protocol](https://docs.cucumber.io/event-protocol/).

To try it out, just install Gherkin for your favourite language, and run it over the
files in this repository:

    gherkin testdata/**/*.feature

Ndjson is easy to read for programs, but hard for people. To pretty print each JSON
document you can pipe it to the [jq](https://stedolan.github.io/jq/) program:

    gherkin testdata/**/*.feature | jq

### Library

Using the library is the preferred way to use Gherkin since it produces easily
consumable AST and Pickle objects in-process without having to fork a CLI process
or parse JSON.

The library itself provides a *stream* API, which is what the CLI is based on.
This is the recommended way to use the library as it provides a high level API
that is easy to use. See the CLI implementations to get an idea of how to use it.

Alternatively, you can use the lower level parser and compiler. Some usage examples are below:

```java
// Java
Parser<GherkinDocument> parser = new Parser<>(new AstBuilder());
GherkinDocument gherkinDocument = parser.parse("Feature: ...");
List<Pickle> pickles = new Compiler().compile(gherkinDocument)
```

```csharp
// C#
var parser = new Parser();
var gherkinDocument = parser.Parse("Feature: ...");
```

```ruby
# Ruby
require 'gherkin/parser'
require 'gherkin/pickles/compiler'
parser = Gherkin::Parser.new
gherkin_document = parser.parse("Feature: ...")
pickles = Gherkin::Pickles::Compiler.new.compile(gherkin_document)
```

```javascript
// JavaScript
var Gherkin = require('gherkin');
var parser = new Gherkin.Parser();
var gherkinDocument = parser.parse("Feature: ...");
var pickles = new Gherkin.Compiler().compile(gherkinDocument);
```

```go
// Go
// Download the package via: `go get github.com/cucumber/gherkin-go`
import (
  "strings"
  "github.com/cucumber/gherkin-go"
)
reader := strings.NewReader(`Feature: ...`)
gherkinDocument, err := gherkin.ParseGherkinDocument(reader)
```

```python
# Python
from gherkin.parser import Parser
from gherkin.pickles.compiler import compile

parser = Parser()
gherkin_document = parser.parse("Feature: ...")
pickles = compile(gherkin_document)
```

```Objective-C
// Objective-C
#import "GHParser+Extensions.h"

GHParser * parser = [[GHParser alloc] init];
NSString * featureFilePath; // Should refer to the place where we can get the content of the feature
NSString * content = [NSString stringWithContentsOfURL:featureFilePath encoding:NSUTF8StringEncoding error:nil];
if([content stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]].length == 0){
      // GHParser will throw an error if you passed empty content... handle this issue first.
}
GHGherkinDocument * result = [parser parseContent:content];
```

```perl
# Perl
use Gherkin::Parser;
use Gherkin::Pickles::Compiler;

my $parser = Gherkin::Parser->new();
my $gherkin_document = $parser->parse("Feature: ...");
my $pickles = Gherkin::Pickles::Compiler->compile($gherkin_document);
```

## Table cell escaping

If you want to use a newline character in a table cell, you can write this
as `\n`. If you need a '|' as part of the cell, you can escape it as `\|`. And
finally, if you need a '\', you can escape that with `\\`.

## Architecture

The following diagram outlines the architecture:

    ╔════════════╗   ┌───────┐   ╔══════╗   ┌──────┐   ╔═══╗
    ║Feature file║──>│Scanner│──>║Tokens║──>│Parser│──>║AST║
    ╚════════════╝   └───────┘   ╚══════╝   └──────┘   ╚═══╝

The *scanner* reads a gherkin doc (typically read from a `.feature` file) and creates
a *token* for each line. The tokens are passed to the *parser*, which outputs an *AST*
(Abstract Syntax Tree).

If the scanner sees a `#language` header, it will reconfigure itself dynamically
to look for Gherkin keywords for the associated language. The keywords are defined in
`gherkin-languages.json`.

The scanner is hand-written, but the parser is generated by the [Berp](https://github.com/gasparnagy/berp)
parser generator as part of the build process.

Berp takes a grammar file (`gherkin.berp`) and a template file (`gherkin-X.razor`) as input
and outputs a parser in language *X*:

    ╔════════════╗   ┌────────┐   ╔═══════════════╗
    ║gherkin.berp║──>│berp.exe│<──║gherkin-X.razor║
    ╚════════════╝   └────────┘   ╚═══════════════╝
                          │
                          V
                     ╔════════╗
                     ║Parser.x║
                     ╚════════╝

Also see the [wiki](https://github.com/cucumber/gherkin/wiki) for some early
design docs (which might be a little outdated, but mostly OK).

### AST

The AST produced by the parser can be described with the following class diagram:

![](https://github.com/cucumber/cucumber/blob/master/gherkin/docs/ast.png)

Every class represents a node in the AST. Every node has a `Location` that describes
the line number and column number in the input file. These numbers are 1-indexed.

All fields on nodes are strings (except for `Location.line` and `Location.column`).

The implementation is simple objects without behaviour, only data. It's up to
the implementation to decide whether to use classes or just basic collections,
but the AST *must* have a JSON representation (this is used for testing).

Each node in the JSON representation also has a `type` property with the name
of the node type.

You can see some examples in the
[testdata/good](https://github.com/cucumber/cucumber/tree/master/gherkin/testdata/good)
directory.

### Pickles

The AST isn't suitable for execution by Cucumber. It needs further processing
into a simpler form called *Pickles*.

The compiler compiles the AST produced by the parser into pickles:

    ╔═══╗   ┌────────┐   ╔═══════╗
    ║AST║──>│Compiler│──>║Pickles║
    ╚═══╝   └────────┘   ╚═══════╝

The rationale is to decouple Gherkin from Cucumber so that Cucumber is open to
support alternative formats to Gherkin (for example Markdown).

The simpler *Pickles* data structure also simplifies the internals of Cucumber.
With the compilation logic maintained in the Gherkin library
we can easily use the same test suite for all implementations to verify that
compilation is behaving consistently between implementations.

Each `Scenario` will be compiled into a `Pickle`. A `Pickle` has a list of
`PickleStep`, derived from the steps in a `Scenario`.

Each `Examples` row under `Scenario Outline` will also be compiled into a `Pickle`.

Any `Background` steps will also be compiled into a `Pickle`.

Every tag, like  `@a`, will be compiled into a `Pickle` as well (inheriting tags from parent elements
in the Gherkin AST).

Example:

```gherkin
@a
Feature:
  @b @c
  Scenario Outline:
    Given <x>

    Examples:
      | x |
      | y |

  @d @e
  Scenario Outline:
    Given <m>

    @f
    Examples:
      | m |
      | n |
```

Using the [CLI](#cli) we can compile this into several pickle objects:

    gherkin testdata/good/readme_example.feature --no-source --no-ast | jq

Output:
```json
{
  "type": "pickle",
  "uri": "testdata/good/readme_example.feature",
  "pickle": {
    "name": "",
    "steps": [
      {
        "text": "y",
        "arguments": [],
        "locations": [
          {
            "line": 9,
            "column": 7
          },
          {
            "line": 5,
            "column": 11
          }
        ]
      }
    ],
    "tags": [
      {
        "name": "@a",
        "location": {
          "line": 1,
          "column": 1
        }
      },
      {
        "name": "@b",
        "location": {
          "line": 3,
          "column": 3
        }
      },
      {
        "name": "@c",
        "location": {
          "line": 3,
          "column": 6
        }
      }
    ],
    "locations": [
      {
        "line": 9,
        "column": 7
      },
      {
        "line": 4,
        "column": 3
      }
    ]
  }
}
{
  "type": "pickle",
  "uri": "testdata/good/readme_example.feature",
  "pickle": {
    "name": "",
    "steps": [
      {
        "text": "n",
        "arguments": [],
        "locations": [
          {
            "line": 18,
            "column": 7
          },
          {
            "line": 13,
            "column": 11
          }
        ]
      }
    ],
    "tags": [
      {
        "name": "@a",
        "location": {
          "line": 1,
          "column": 1
        }
      },
      {
        "name": "@d",
        "location": {
          "line": 11,
          "column": 3
        }
      },
      {
        "name": "@e",
        "location": {
          "line": 11,
          "column": 6
        }
      },
      {
        "name": "@f",
        "location": {
          "line": 15,
          "column": 5
        }
      }
    ],
    "locations": [
      {
        "line": 18,
        "column": 7
      },
      {
        "line": 12,
        "column": 3
      }
    ]
  }
}
```

Each `Pickle` event also contains the path to the original source. This is useful for
generating reports and stack traces when a Scenario fails.

Cucumber will further transform this list of `Pickle` objects to a list of `TestCase`
objects. `TestCase` objects link to user code such as Hooks and Step Definitions.

## Building Gherkin

See [`CONTRIBUTING.md`](CONTRIBUTING.md)

## Projects using Gherkin

- [cucumber-ruby](https://github.com/cucumber/cucumber-ruby)
- [cucumber-js](https://github.com/cucumber/cucumber-js)
- [godog](https://github.com/DATA-DOG/godog) - Cucumber like BDD framework for **go**
