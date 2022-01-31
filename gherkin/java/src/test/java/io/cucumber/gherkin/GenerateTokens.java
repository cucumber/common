package io.cucumber.gherkin;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;

public final class GenerateTokens {
    public static void main(String[] args) throws FileNotFoundException {
        TokenFormatterBuilder builder = new TokenFormatterBuilder();
        Parser<String> parser = new Parser<>(builder);
        TokenMatcher matcher = new TokenMatcher();
        for (String fileName : args) {
            Reader in = new InputStreamReader(new FileInputStream(fileName), StandardCharsets.UTF_8);
            String result = parser.parse(in, matcher, fileName);
            Stdio.out.print(result);
            Stdio.out.flush(); // print doesn't autoflush
        }
    }
}
