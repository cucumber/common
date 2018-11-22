package io.cucumber.datatable;

import java.math.BigDecimal;
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

    BigDecimal parseDecimal(String s) {
        return BigDecimal.valueOf(parse(s).doubleValue());
    }

    private Number parse(String s) {
        try {
            return numberFormat.parse(s);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
