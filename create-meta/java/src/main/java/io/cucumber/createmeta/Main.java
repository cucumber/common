package io.cucumber.createmeta;

import io.cucumber.messages.Messages;
import io.cucumber.messages.internal.com.google.protobuf.util.JsonFormat;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) throws IOException {
        String envPath = args[0];
        Map<String, String> env = Files.readAllLines(Paths.get(envPath))
                .stream()
                .map(line -> line.split("="))
                .collect(Collectors.toMap(arr -> arr[0], arr -> arr[1]));

        Messages.Meta.CI ci = CreateMeta.detectCI(env);
        JsonFormat.Printer jsonPrinter = JsonFormat.printer();
        System.out.println(jsonPrinter.print(ci));
    }
}
