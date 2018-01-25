package io.cucumber.datatable.matchers;

import io.cucumber.datatable.DataTable;
import org.junit.Test;

import static io.cucumber.datatable.matchers.DataTableIsEqualTo.equalTo;
import static java.util.Arrays.asList;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class DataTableIsEqualToTest {
    private final DataTable table = DataTable.create(
        asList(
            asList("Aslak", "aslak@email.com", "123"),
            asList("Joe", "joe@email.com", "234"),
            asList("Bryan", "bryan@email.com", "345"),
            asList("Ni", "ni@email.com", "567")
        ));

    private final DataTable other = DataTable.create(
        asList(
            asList("Aslak", "aslak@email.com", "123"),
            asList("Doe", "joe@email.com", "345"),
            asList("Bryan", "bryan@email.com", "456"),
            asList("Ni", "ni@email.com", "567")
        ));

    @Test
    public void test() {
        assertTrue(equalTo(other).matches(other));
        assertFalse(equalTo(other).matches(table));
    }


}
