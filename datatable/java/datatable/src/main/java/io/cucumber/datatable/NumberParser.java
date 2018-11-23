package io.cucumber.datatable;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.Locale;

class NumberParser {
    private final NumberFormat numberFormat;

    NumberParser(Locale locale) {
        numberFormat = DecimalFormat.getNumberInstance(locale);
        if (numberFormat instanceof DecimalFormat) {
            DecimalFormat decimalFormat = (DecimalFormat) numberFormat;
            decimalFormat.setParseBigDecimal(true);
        }
    }

    double parseDouble(String s) {
        return parse(s).doubleValue();
    }

    float parseFloat(String s) {
        return parse(s).floatValue();
    }

    BigDecimal parseBigDecimal(String s) {
        if (numberFormat instanceof DecimalFormat) {
            return (BigDecimal) parse(s);
        }
        // Fall back to default big decimal format
        // if the locale does not have a DecimalFormat
        return new BigDecimal(s);
    }

    private Number parse(String s) {
        try {
            return numberFormat.parse(s);
        } catch (ParseException e) {
            throw new CucumberDataTableException("Failed to parse number", e);
        }
    }
}
