package io.cucumber.datatable;

class DuplicateTypeNameException extends CucumberDataTableException {
    DuplicateTypeNameException(String message) {
        super(message);
    }
}
