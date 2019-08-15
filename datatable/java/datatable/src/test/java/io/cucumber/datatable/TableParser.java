package io.cucumber.datatable;

import gherkin.AstBuilder;
import gherkin.Parser;
import gherkin.ast.GherkinDocument;
import gherkin.pickles.Compiler;
import gherkin.pickles.Pickle;
import gherkin.pickles.PickleTable;

import java.util.List;

import static io.cucumber.datatable.PickleTableConverter.toTable;

class TableParser {

    private TableParser() {
    }


    static DataTable parse(String... source) {
        return parse(String.join("\n", source));
    }

    static DataTable parse(String source) {
        String feature = "" +
                "Feature:\n" +
                "  Scenario:\n" +
                "    Given x\n" +
                source;
        Parser<GherkinDocument> parser = new Parser<>(new AstBuilder());
        Compiler compiler = new Compiler();
        List<Pickle> pickles = compiler.compile(parser.parse(feature));
        PickleTable pickleTable = (PickleTable) pickles.get(0).getSteps().get(0).getArgument().get(0);

        return DataTable.create(toTable(pickleTable));

    }

}
