package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.List;
import java.util.regex.Pattern;

import org.apiguardian.api.API;

@API(status = API.Status.STABLE)
public interface Expression {

	enum ExpressionType {
		CUCUMBER, REGULAR;
	}

    List<Argument<?>> match(String text, Type... typeHints);

    Pattern getRegexp();

    String getSource();

	ExpressionType getType();
}
