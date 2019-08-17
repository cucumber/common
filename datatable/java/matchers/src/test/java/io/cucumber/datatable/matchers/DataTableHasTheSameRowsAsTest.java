package io.cucumber.datatable.matchers;

import io.cucumber.datatable.DataTable;
import org.junit.jupiter.api.Test;

import static io.cucumber.datatable.matchers.DataTableHasTheSameRowsAs.hasTheSameRowsAs;
import static java.util.Arrays.asList;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class DataTableHasTheSameRowsAsTest {
    private final DataTable table = DataTable.create(
            asList(
                    asList("Aslak", "aslak@email.com", "123"),
                    asList("Joe", "joe@email.com", "234"),
                    asList("Bryan", "bryan@email.com", "345"),
                    asList("Ni", "ni@email.com", "567")
            ));

    private final DataTable identical = DataTable.create(
            asList(
                    asList("Aslak", "aslak@email.com", "123"),
                    asList("Joe", "joe@email.com", "234"),
                    asList("Bryan", "bryan@email.com", "345"),
                    asList("Ni", "ni@email.com", "567")
            ));

    private final DataTable shuffled = DataTable.create(
            asList(
                    asList("Ni", "ni@email.com", "567"),
                    asList("Joe", "joe@email.com", "234"),
                    asList("Bryan", "bryan@email.com", "345"),
                    asList("Aslak", "aslak@email.com", "123")
            ));

    private final DataTable different = DataTable.create(
            asList(
                    asList("Aslak", "aslak@email.com", "123"),
                    asList("Doe", "joe@email.com", "345"),
                    asList("Bryan", "bryan@email.com", "456"),
                    asList("Ni", "ni@email.com", "567")
            ));

    @Test
    void testHasTheSameRowsAsInOrder() {
        assertTrue(hasTheSameRowsAs(table).inOrder().matches(identical));
        assertFalse(hasTheSameRowsAs(table).inOrder().matches(shuffled));
        assertFalse(hasTheSameRowsAs(table).inOrder().matches(different));
    }

    @Test
    void testHasTheSameRowsAs() {
        assertTrue(hasTheSameRowsAs(table).matches(identical));
        assertTrue(hasTheSameRowsAs(table).matches(shuffled));
        assertFalse(hasTheSameRowsAs(table).matches(different));
    }

    @Test
    void usageExample() {
        assertThat(identical, hasTheSameRowsAs(table).inOrder());
        assertThat(shuffled, hasTheSameRowsAs(table));
    }
}
