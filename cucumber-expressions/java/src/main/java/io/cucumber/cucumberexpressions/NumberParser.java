package io.cucumber.cucumberexpressions;

import java.text.NumberFormat;
import java.text.ParseException;

class NumberParser {
    private final NumberFormat numberFormat;

    NumberParser(NumberFormat numberFormat) {
        this.numberFormat = numberFormat;
    }

    double parseDouble(String s) {
        return parse(s).doubleValue();
    }

    float parseFloat(String s) {
        return parse(s).floatValue();
    }

    byte parseByte(String s) {
        return parse(s).byteValue();
    }

    int parseInt(String s) {
        return parse(s).intValue();
    }

    long parseLong(String s) {
        return parse(s).longValue();
    }

    short parseShort(String s) {
        return parse(s).shortValue();
    }

    private Number parse(String s) {
        try {
            return numberFormat.parse(s);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
