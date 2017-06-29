. as $root |
[(to_entries[] | .key as $lang_orig |(.key | split("-") | join("_")) as $lang | .value |
  [({"and", "background", "but", "examples", "feature", "given", "scenario", "scenarioOutline", "then", "when"} | to_entries[] |
    [(
      ["static const wchar_t* const ",$lang,"_",.key,"_KEYWORDS[] = { ",([.value[] | ["L",@json] | add] | join(", "))," };\n"] | add
     ),
     ("static const Keywords ",$lang,"_",.key,"_keywords = { ",(.value | length | tostring),", ",$lang,"_",.key,"_KEYWORDS };\n\n"
     )
    ] | add
   ),
   (["static const Dialect ",$lang,"_dialect = {\n        L\"",$lang_orig,"\",\n",
     ([{"and", "background", "but", "examples", "feature", "given", "scenario", "scenarioOutline", "then", "when"} | to_entries[] |
       ["        &",$lang,"_",.key,"_keywords"] | add
      ] | join(",\n")
     )," };\n\n"
    ] | add
   )
  ] | add
)] | add | 
["#include \"dialect.h\"\n\n",
 .,
 "const Dialect* Dialect_for(const wchar_t* language) {\n",
 ([$root | to_entries[] | (.key | split("-") | join("_")) as $lang |
   "    if (wcscmp(",$lang,"_dialect.language_name, language) == 0)\n        return &",$lang,"_dialect;\n"] | add),
 "    return 0;\n}\n"
] | add

