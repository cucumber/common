package io.cucumber.cucumberexpressions;

import java.util.List;

import static java.util.Collections.singletonList;

public class ArgumentPartHelper {
    public static List<Group> parts(String value) {
        return singletonList(new Group(0, value.length(), value));
    }
}
