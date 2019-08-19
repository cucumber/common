package io.cucumber.datatable;

import java.lang.reflect.Type;

class InvalidDataTableTypeException extends CucumberDataTableException {

    InvalidDataTableTypeException(Type type, Exception e) {
        super(createMessage(type, e), e);
    }

    private static String createMessage(Type type, Exception e) {
        return "Can't create a data table type for type " + type + ". " + e.getMessage();
    }
}
