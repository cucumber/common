package io.cucumber.datatable;

import org.hamcrest.Factory;

/**
 * @deprecated use {@link io.cucumber.datatable.matchers.DataTableHasTheSameRowsAs}
 */
// TODO class needs to be deleted before cucumber fully supports Java 9 Modules as multiple modules can't export the same package
@Deprecated
public class DataTableHasTheSameRowsAs extends io.cucumber.datatable.matchers.DataTableHasTheSameRowsAs {
    private DataTableHasTheSameRowsAs(DataTable expectedValue, boolean unordered) {
        super(expectedValue, unordered);
    }

    @Factory
    public static DataTableHasTheSameRowsAs hasTheSameRowsAs(DataTable operand) {
        return new DataTableHasTheSameRowsAs(operand, true);
    }
}
