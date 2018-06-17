package io.cucumber.datatable.matchers;

import io.cucumber.datatable.DataTable;
import io.cucumber.datatable.DataTableDiff;
import io.cucumber.datatable.TableDiffer;
import org.hamcrest.Description;
import org.hamcrest.Factory;
import org.hamcrest.TypeSafeDiagnosingMatcher;

/**
 * Matches two data tables by their rows. By default the matcher
 * does not take row order into account. This can be fluently
 * enabled.
 *
 * <pre>
 *   assertThat(identical, hasTheSameRowsAs(table).inOrder());
 *   assertThat(shuffled, hasTheSameRowsAs(table));
 * </pre>
 */
public class DataTableHasTheSameRowsAs extends TypeSafeDiagnosingMatcher<DataTable> {
    private final DataTable expectedValue;
    private final boolean unordered;

    protected DataTableHasTheSameRowsAs(DataTable expectedValue, boolean unordered) {
        this.expectedValue = expectedValue;
        this.unordered = unordered;
    }

    @Override
    public void describeTo(Description description) {
        description.appendText("a datable with the same rows");
        if (unordered) {
            description.appendText(" in any order");
        }
    }


    @Override
    protected boolean matchesSafely(DataTable item, Description description) {
        TableDiffer tableDiffer = new TableDiffer(expectedValue, item);
        DataTableDiff diff = unordered ? tableDiffer.calculateUnorderedDiffs() : tableDiffer.calculateDiffs();

        if (diff.isEmpty()) {
            return true;
        }
        description.appendText("the tables were different\n");
        description.appendText(diff.toString());
        return false;
    }

    /**
     * Compare the rows of the data table in order.
     *
     * @return a new matcher that compares the rows of the data table in order.
     */
    public DataTableHasTheSameRowsAs inOrder() {
        return new DataTableHasTheSameRowsAs(expectedValue, false);
    }

    @Factory
    public static DataTableHasTheSameRowsAs hasTheSameRowsAs(DataTable operand) {
        return new DataTableHasTheSameRowsAs(operand, true);
    }


}
