package io.cucumber.datatable;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.util.Locale;

import static org.junit.Assert.assertSame;


public class DataTableTypeRegistryTest {

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private final DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);


    @Test
    public void throws_duplicate_type_exception() {

        registry.defineDataTableType(new DataTableType(Place.class, new TableTransformer<Place>() {
            @Override
            public Place transform(DataTable table) {
                return new Place(table.cell(0, 0));
            }

        }));
        expectedException.expectMessage(
                "There is already a data table type with type io.cucumber.datatable.DataTableTypeRegistryTest$Place"
        );
        registry.defineDataTableType(new DataTableType(Place.class, new TableTransformer<Place>() {
            @Override
            public Place transform(DataTable table) {
                return new Place(table.cell(0, 0));
            }
        }));
    }

    static class Place {
        Place(String s) {
        }
    }
}
