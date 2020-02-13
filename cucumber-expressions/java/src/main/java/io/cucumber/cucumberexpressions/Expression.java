package io.cucumber.cucumberexpressions;

import org.apiguardian.api.API;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

@API(status = API.Status.STABLE)
public interface Expression {
    List<Argument<?>> match(String text, Type... typeHints);

    Pattern getRegexp();

    String getSource();
}
