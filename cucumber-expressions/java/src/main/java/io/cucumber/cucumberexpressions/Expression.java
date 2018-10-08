package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.List;
import java.util.regex.Pattern;

public interface Expression {
    List<Argument<?>> match(String text, Type... types);

    Pattern getRegexp();

    String getSource();
}
