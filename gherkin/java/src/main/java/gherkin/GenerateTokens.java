package gherkin;

import gherkin.stream.Stdio;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

public class GenerateTokens {
    public static void main(String[] args) throws FileNotFoundException, UnsupportedEncodingException {
        TokenFormatterBuilder builder = new TokenFormatterBuilder();
        Parser<String> parser = new Parser<>(builder);
        TokenMatcher matcher = new TokenMatcher();
        for (String fileName : args) {
            InputStreamReader in = new InputStreamReader(new FileInputStream(fileName), "UTF-8");
            String result = parser.parse(in, matcher);
            Stdio.out.print(result);
            Stdio.out.flush(); // print doesn't autoflush
        }
    }
}
