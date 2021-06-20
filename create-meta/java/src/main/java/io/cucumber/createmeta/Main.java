package io.cucumber.createmeta;

import io.cucumber.messages.types.Ci;
import io.cucumber.messages.JSON;

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
                .collect(Collectors.toMap(arr -> arr[0], arr -> arr.length > 1 ? arr[1] : ""));
        Ci ci = CreateMeta.detectCI(env);
        System.out.println(JSON.toJSON(ci));
    }
}
