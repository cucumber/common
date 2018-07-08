package io.cucumber.gherkin;

import io.cucumber.messages.Messages.Wrapper;
import io.cucumber.messages.com.google.protobuf.util.JsonFormat;
import io.cucumber.messages.com.google.protobuf.util.JsonFormat.Printer;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static java.util.Arrays.asList;

public class Main {

    public static void main(String[] argv) throws IOException, InterruptedException {
        List<String> args = new ArrayList<>(asList(argv));
        List<String> paths = new ArrayList<>();

        boolean includeSource = true;
        boolean includeAst = true;
        boolean includePickles = true;
        Printer jsonPrinter = null;
        boolean dialects = false;

        while (!args.isEmpty()) {
            String arg = args.remove(0).trim();

            switch (arg) {
                case "--no-source":
                    includeSource = false;
                    break;
                case "--no-ast":
                    includeAst = false;
                    break;
                case "--no-pickles":
                    includePickles = false;
                    break;
                case "--json":
                    jsonPrinter = JsonFormat.printer();
                    break;
                case "--dialects":
                    dialects = true;
                    break;
                default:
                    paths.add(arg);
            }
        }

        if (dialects) {
            InputStream gherkinStdout = Gherkin.EXE.execute(Collections.singletonList("--dialects"), null);
            IO.copy(gherkinStdout, System.out);
            System.exit(0);
        }

        if (paths.isEmpty()) {
            GherkinMessages gherkinMessages = new ProtobufGherkinMessages(System.in);
            printMessages(jsonPrinter, gherkinMessages);
        } else {
            GherkinMessages gherkinMessages = Gherkin.fromPaths(paths, includeSource, includeAst, includePickles);
            printMessages(jsonPrinter, gherkinMessages);
        }
    }

    private static void printMessages(Printer jsonPrinter, GherkinMessages gherkinMessages) throws IOException {
        for (Wrapper wrapper : gherkinMessages.messages()) {
            if (jsonPrinter != null) {
                IO.out.write(jsonPrinter.print(wrapper));
                IO.out.write("\n");
                IO.out.flush();
            } else {
                wrapper.writeDelimitedTo(System.out);
            }
        }
    }
}
