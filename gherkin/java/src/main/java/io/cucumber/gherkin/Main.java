package io.cucumber.gherkin;

import io.cucumber.messages.Messages.Wrapper;
import io.cucumber.messages.com.google.protobuf.util.JsonFormat;
import io.cucumber.messages.com.google.protobuf.util.JsonFormat.Printer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static java.util.Arrays.asList;

public class Main {

    public static void main(String[] argv) throws IOException {
        Printer printer = JsonFormat.printer();

        List<String> args = new ArrayList<>(asList(argv));
        List<String> paths = new ArrayList<>();

        boolean includeSource = true;
        boolean includeAst = true;
        boolean includePickles = true;
        boolean json = false;

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
                    json = true;
                    break;
                default:
                    paths.add(arg);
            }
        }

        String gherkinExecutable = System.getenv("GHERKIN_EXECUTABLE");
        if (paths.isEmpty()) {
            CucumberMessages cucumberMessages = new ProtobufCucumberMessages(System.in);
            printMessages(printer, json, cucumberMessages);
        } else if (gherkinExecutable != null) {
            CucumberMessages cucumberMessages = new SubprocessCucumberMessages(gherkinExecutable, paths, includeSource, includeAst, includePickles);
            printMessages(printer, json, cucumberMessages);
        }
    }

    private static void printMessages(Printer printer, boolean protobuf, CucumberMessages cucumberMessages) throws IOException {
        for (Wrapper wrapper : cucumberMessages.messages()) {
            if (protobuf) {
                wrapper.writeDelimitedTo(System.out);
            } else {
                Stdio.out.write(printer.print(wrapper));
                Stdio.out.write("\n");
                Stdio.out.flush();
            }
        }
    }
}
