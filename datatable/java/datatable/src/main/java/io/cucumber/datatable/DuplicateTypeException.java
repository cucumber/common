package io.cucumber.datatable;

class DuplicateTypeException extends CucumberDataTableException {
    DuplicateTypeException(String message) {
        super(message);
    }
}
