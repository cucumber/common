package io.cucumber.datatable;

import io.cucumber.datatable.DataTable.TableConverter;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static java.util.Collections.singletonList;
import static org.junit.jupiter.api.Assertions.assertThrows;

class NoConverterDefinedTest {


    private final TableConverter converter = new DataTable.NoConverterDefined();
    private final DataTable table = DataTable.create(singletonList(singletonList("1")));

    @Test
    void convert_throws() {
        assertThrows(CucumberDataTableException.class, () -> converter.convert(table, DataTable.class, false));
    }

    @Test
    void to_list_throws() {
        assertThrows(CucumberDataTableException.class, () -> converter.toList(table, Integer.class));
    }

    @Test
    void to_lists_throws() {
        assertThrows(CucumberDataTableException.class, () -> converter.toLists(table, Integer.class));
    }

    @Test
    void to_map_throws() {
        assertThrows(CucumberDataTableException.class, () -> converter.toMap(table, String.class, Integer.class));
    }

    @Test
    void to_maps_throws() {
        assertThrows(CucumberDataTableException.class, () -> converter.toMaps(table, String.class, Integer.class));
    }

}
