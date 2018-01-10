package io.cucumber.datatable;

import io.cucumber.datatable.DataTable.TableConverter;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import static java.util.Collections.singletonList;

public class NoConverterDefinedTest {

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private final TableConverter converter = new DataTable.NoConverterDefined();
    private final DataTable table = DataTable.create(singletonList(singletonList("1")));

    @Before
    public void setup() {
        expectedException.expect(CucumberDataTableException.class);
    }

    @Test
    public void convert_throws() {
        converter.convert(table, DataTable.class, false);
    }

    @Test
    public void to_list_throws() {
        converter.toList(table, Integer.class);
    }

    @Test
    public void to_lists_throws() {
        converter.toLists(table, Integer.class);
    }

    @Test
    public void to_map_throws() {
        converter.toMap(table, String.class, Integer.class);
    }

    @Test
    public void to_maps_throws() {
        converter.toMaps(table, String.class, Integer.class);
    }

}
