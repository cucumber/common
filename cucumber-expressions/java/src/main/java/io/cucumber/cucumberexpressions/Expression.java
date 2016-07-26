package io.cucumber.cucumberexpressions;

import java.util.List;

public interface Expression {
    List<Argument> match(String text);
    String getSource();
}
