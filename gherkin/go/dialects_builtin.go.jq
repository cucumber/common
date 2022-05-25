. as $root
| (
  [ to_entries[]
    | [
        "\t",(.key|@json),": &Dialect{\n",
        "\t\t", (.key|@json),", ", (.value.name|@json),", ", (.value.native|@json), ", map[string][]string{\n"
      ] + (
          [ .value
            | {"feature","rule","background","scenario","scenarioOutline","examples","given","when","then","and","but"}
            | to_entries[]
            | "\t\t\t"+(.key), ": {\n",
              ([ .value[] | "\t\t\t\t", @json, ",\n"  ]|add),
              "\t\t\t},\n"
          ]
      ) + [
        "\t\t},\n",
        "map[string]messages.StepKeywordType {\n"
      ] + (
        [ .value.given
          | (
              [ .[] | select(. != "* ") |
                "\t\t\t\t",
                @json,
                ": messages.StepKeywordType_CONTEXT",
                ",\n"
              ] | add
            ),
            "\t\t\t\n"
        ]
        +
        [ .value.when
          | (
              [ .[] | select(. != "* ") |
                "\t\t\t\t",
                @json,
                ": messages.StepKeywordType_ACTION",
                ",\n"
              ] | add
            ),
            "\t\t\t\n"
        ]
        +
        [ .value.then
          | (
              [ .[] | select(. != "* ") |
                "\t\t\t\t",
                @json,
                ": messages.StepKeywordType_OUTCOME",
                ",\n"
              ] | add
            ),
            "\t\t\t\n"
        ]
        +
        [ .value.and
          | (
              [ .[] | select(. != "* ") |
                "\t\t\t\t",
                @json,
                ": messages.StepKeywordType_CONJUNCTION",
                ",\n"
              ] | add
            ),
            "\t\t\t\n"
        ]
        +
        [ .value.but
          | (
              [ .[] | select(. != "* ") |
                "\t\t\t\t",
                @json,
                ": messages.StepKeywordType_CONJUNCTION",
                ",\n"
              ] | add
            ),
            "\t\t\t\n"
        ]
        + [
          "\"* \": messages.StepKeywordType_UNKNOWN,\n"
        ]
      ) + [
        "}",
        "\t},\n"
      ]
    | add
  ]
  | add
  )
| "package gherkin\n\n"
+ "import messages \"github.com/cucumber/common/messages/go/v18\"\n\n"
+ "// Builtin dialects for " + ([ $root | to_entries[] | .key+" ("+.value.name+")" ] | join(", ")) + "\n"
+ "func DialectsBuiltin() DialectProvider {\n"
+ "\treturn builtinDialects\n"
+ "}\n\n"
+ "const (\n"
+ (
  ["feature","rule","background","scenario","scenarioOutline","examples","given","when","then","and","but"]
  | [ .[] | "\t" + . + " = " + (.|@json) + "\n" ]
  | add )
+ ")\n\n"
+ "var builtinDialects = gherkinDialectMap{\n"
+ .
+ "}\n"
