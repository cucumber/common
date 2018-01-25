package io.cucumber.datatable.matchers;

import io.cucumber.datatable.DataTable;
import org.hamcrest.Description;
import org.hamcrest.Factory;
import org.hamcrest.TypeSafeMatcher;


//TODO(cucumber-expressions): Doc and examples
public class DataTableIsEqualTo extends TypeSafeMatcher<DataTable> {
    private final DataTable expectedValue;

    private DataTableIsEqualTo(DataTable equalArg) {
        expectedValue = equalArg;
    }

    @Override
    protected boolean matchesSafely(DataTable item) {
        return areEqual(expectedValue, item);
    }

    @Override
    public void describeTo(Description description) {
        description.appendText("\n");
        description.appendText(expectedValue.toString());
    }

    private static boolean areEqual(DataTable actual, DataTable expected) {
        if (actual == null) {
            return expected == null;
        }

        return actual.equals(expected);
    }

    @Override
    protected void describeMismatchSafely(DataTable item, Description description) {
        description.appendText("was "); //The space is significant. It is used by IDE's to highlight differences
        description.appendText("\n");
        description.appendText(item.toString());
    }

    @Factory
    public static DataTableIsEqualTo equalTo(DataTable operand) {
        return new DataTableIsEqualTo(operand);
    }
}
