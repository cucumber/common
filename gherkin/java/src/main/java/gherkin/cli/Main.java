package gherkin.cli;

import gherkin.stream.Stdio;
import gherkin.deps.com.google.gson.Gson;
import gherkin.deps.com.google.gson.GsonBuilder;
import gherkin.events.CucumberEvent;
import gherkin.events.SourceEvent;
import gherkin.stream.GherkinEvents;
import gherkin.stream.SourceEvents;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static java.util.Arrays.asList;

public class Main {
    public static void main(String[] argv) throws IOException {
        final Gson gson = new GsonBuilder().create();

        List<String> args = new ArrayList<>(asList(argv));
        List<String> paths = new ArrayList<>();

        boolean printSource = true;
        boolean printAst = true;
        boolean printPickles = true;

        while (!args.isEmpty()) {
            String arg = args.remove(0).trim();

            switch (arg) {
                case "--no-source":
                    printSource = false;
                    break;
                case "--no-ast":
                    printAst = false;
                    break;
                case "--no-pickles":
                    printPickles = false;
                    break;
                default:
                    paths.add(arg);
            }
        }

        SourceEvents sourceEvents = new SourceEvents(paths);
        GherkinEvents gherkinEvents = new GherkinEvents(printSource, printAst, printPickles);
        for (SourceEvent sourceEventEvent : sourceEvents) {
            for (CucumberEvent cucumberEvent : gherkinEvents.iterable(sourceEventEvent)) {
                Stdio.out.write(gson.toJson(cucumberEvent));
                Stdio.out.write("\n");
                Stdio.out.flush();
            }
        }
    }
}
