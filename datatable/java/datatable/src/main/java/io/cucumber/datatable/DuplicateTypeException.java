package io.cucumber.datatable;

import org.apiguardian.api.API;

@API(status = API.Status.STABLE)
public final class DuplicateTypeException extends CucumberDataTableException {
    DuplicateTypeException(String message) {
        super(message);
    }
}
