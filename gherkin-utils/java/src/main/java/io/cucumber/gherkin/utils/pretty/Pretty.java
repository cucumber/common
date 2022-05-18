package io.cucumber.gherkin.utils.pretty;

import io.cucumber.gherkin.utils.WalkGherkinDocument;
import io.cucumber.messages.types.GherkinDocument;

import java.util.ArrayList;

public class Pretty {
    /**
     * Pretty print a GherkinDocument as either markdown or gherkin.
     *
     * @param gherkinDocument The GherkinDocument object.
     * @param syntax          What syntax do you want to format to?
     * @return The pretty printed string representation of the Gherkin doc in the syntax indicated.
     */
    public static String prettyPrint(GherkinDocument gherkinDocument, Syntax syntax) {
        WalkGherkinDocument<Result> walker = new WalkGherkinDocument<>();
        Result result = walker.walkGherkinDocument(
                gherkinDocument,
                new Result(),
                new PrettyHandlers(new ArrayList<>(gherkinDocument.getComments()), syntax)
        );
        return result.toString();
    }

    private Pretty() {
    }
}
