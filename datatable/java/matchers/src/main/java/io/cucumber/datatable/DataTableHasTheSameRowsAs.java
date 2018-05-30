package io.cucumber.datatable;

import org.hamcrest.Factory;

/**
 * @deprecated use {@link io.cucumber.datatable.matchers.DataTableHasTheSameRowsAs}
 */
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
