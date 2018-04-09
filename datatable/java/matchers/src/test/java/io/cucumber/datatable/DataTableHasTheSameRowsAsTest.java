package io.cucumber.datatable;

import org.junit.Test;

import static io.cucumber.datatable.DataTableHasTheSameRowsAs.hasTheSameRowsAs;
import static java.util.Arrays.asList;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

public class DataTableHasTheSameRowsAsTest {
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
    public void testHasTheSameRowsAsInOrder() {
        assertTrue(hasTheSameRowsAs(table).inOrder().matches(identical));
        assertFalse(hasTheSameRowsAs(table).inOrder().matches(shuffled));
        assertFalse(hasTheSameRowsAs(table).inOrder().matches(different));
    }

    @Test
    public void testHasTheSameRowsAs() {
        assertTrue(hasTheSameRowsAs(table).matches(identical));
        assertTrue(hasTheSameRowsAs(table).matches(shuffled));
        assertFalse(hasTheSameRowsAs(table).matches(different));
    }

    @Test
    public void usageExample() {
        assertThat(identical, hasTheSameRowsAs(table).inOrder());
        assertThat(shuffled, hasTheSameRowsAs(table));
    }
}
