package io.cucumber.cucumberexpressions;

import java.util.List;
import java.util.regex.Pattern;

public interface Expression {
    List<Argument<?>> match(String text);

    String getSource();

    Pattern getRegexp();
}
