package gherkin;

// http://rosettacode.org/wiki/String_length#Java
public class SymbolCounter {
    public static int countSymbols(String string) {
        return string.codePointCount(0, string.length());
    }
}
