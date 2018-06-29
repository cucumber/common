package gherkin.cli;

import gherkin.messages.CucumberMessages;
import gherkin.messages.ParserCucumberMessages;
import gherkin.messages.ProtobufCucumberMessages;
import gherkin.messages.SubprocessCucumberMessages;
import io.cucumber.messages.Messages.Wrapper;
import io.cucumber.messages.com.google.protobuf.util.JsonFormat;
import io.cucumber.messages.com.google.protobuf.util.JsonFormat.Printer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static java.util.Arrays.asList;

public class Main {

    public static void main(String[] argv) throws IOException {
        Printer printer = JsonFormat.printer().includingDefaultValueFields();

        List<String> args = new ArrayList<>(asList(argv));
        List<String> paths = new ArrayList<>();

        boolean printSource = true;
        boolean printAst = true;
        boolean printPickles = true;
        boolean protobuf = false;

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
                case "--protobuf":
                    protobuf = true;
                    break;
                default:
                    paths.add(arg);
            }
        }

        String gherkinExecutable = System.getenv("GHERKIN_EXECUTABLE");
        if (paths.isEmpty()) {
            CucumberMessages cucumberMessages = new ProtobufCucumberMessages(System.in);
            printMessages(printer, protobuf, cucumberMessages);
        } else if (gherkinExecutable != null) {
            CucumberMessages cucumberMessages = new SubprocessCucumberMessages(gherkinExecutable, paths, printSource, printAst, printPickles);
            printMessages(printer, protobuf, cucumberMessages);
        } else {
            CucumberMessages cucumberMessages = new ParserCucumberMessages(paths, printSource, printAst, printPickles);
            printMessages(printer, protobuf, cucumberMessages);
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
