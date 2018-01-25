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
    public void does_not_allow_more_than_one_preferential_parameter_type_for_each_type() {
        registry.defineDataTableType(new DataTableType("name", Name.class, new TableCellTransformer<Name>() {
            @Override
            public Name transform(String cell) throws Throwable {
                return new Name(cell);
            }
        }, true));

        registry.defineDataTableType(new DataTableType("place", Place.class, new TableCellTransformer<Place>() {
            @Override
            public Place transform(String cell) throws Throwable {
                return new Place(cell);
            }
        }, true));

        expectedException.expectMessage(
            "There can only be one preferential data table type per type. " +
                "Both {place} and {location} are preferential for the same type.");

        registry.defineDataTableType(new DataTableType("location", Place.class, new TableCellTransformer<Place>() {
            @Override
            public Place transform(String cell) throws Throwable {
                return new Place(cell);
            }
        }, true));
    }

    @Test
    public void looks_up_preferential_data_table_type_by_type() {
        DataTableType place = new DataTableType("place", Place.class, new TableTransformer<Place>() {
            @Override
            public Place transform(DataTable table) throws Throwable {
                return new Place(table.cell(0, 0));
            }

        }, true);
        DataTableType location = new DataTableType("location", Place.class, new TableTransformer<Place>() {
            @Override
            public Place transform(DataTable table) throws Throwable {
                return new Place(table.cell(0, 0));
            }
        }, false);

        registry.defineDataTableType(place);
        registry.defineDataTableType(location);

        assertSame(place, registry.lookupTableTypeByType(Place.class));
    }

    @Test
    public void throws_ambiguous_exception_on_lookup_when_no_data_table_types_are_preferential() {

        registry.defineDataTableType(new DataTableType("place", Place.class, new TableTransformer<Place>() {
            @Override
            public Place transform(DataTable table) throws Throwable {
                return new Place(table.cell(0, 0));
            }

        }, false));
        registry.defineDataTableType(new DataTableType("location", Place.class, new TableTransformer<Place>() {
            @Override
            public Place transform(DataTable table) throws Throwable {
                return new Place(table.cell(0, 0));
            }
        }, false));

        expectedException.expectMessage(
            "\n" +
                "The type class io.cucumber.datatable.DataTableTypeRegistryTest$Place matches multiple data table types:\n" +
                "\n" +
                "   {location}\n" +
                "   {place}\n" +
                "\n" +
                "I couldn't decide which one to use. You have two options:\n" +
                "\n" +
                "1) Add an explicit table name to your step definition\n" +
                "\n" +
                "2) Make one of the data table types preferential and continue to use an implicit data table.\n");

        registry.lookupTableTypeByType(Place.class);
    }

    static class Name {
        Name(String s) {
        }
    }

    static class Place {
        Place(String s) {
        }
    }
}
