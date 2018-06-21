package gherkin.cli;

import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.Message;
import com.google.protobuf.util.JsonFormat;
import io.cucumber.messages.Sources.Source;
import gherkin.messages.CucumberMessages;
import gherkin.messages.FileSources;

import java.util.ArrayList;
import java.util.List;

import static java.util.Arrays.asList;

public class Main {
    public static void main(String[] argv) throws InvalidProtocolBufferException {
        JsonFormat.Printer printer = JsonFormat.printer().includingDefaultValueFields();

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

        FileSources fileSources = new FileSources(paths);
        CucumberMessages cucumberMessages = new CucumberMessages(printSource, printAst, printPickles);
        for (Source sourceEventEvent : fileSources) {
            for (Message message : cucumberMessages.messages(sourceEventEvent)) {
                Stdio.out.write(printer.print(message));
                Stdio.out.write("\n");
                Stdio.out.flush();
            }
        }
    }
}
