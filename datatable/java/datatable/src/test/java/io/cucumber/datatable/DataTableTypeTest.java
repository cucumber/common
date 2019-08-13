package io.cucumber.datatable;

import org.junit.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static java.util.Collections.singletonList;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;

public class DataTableTypeTest {

    private final DataTableType singleCellType = new DataTableType(Integer.class, (String cell) -> Integer.parseInt(cell));

    @Test
    public void shouldTransformATableCell() {
        assertThat(singleCellType.transform(singletonList(singletonList("12"))), equalTo(singletonList(singletonList(12))));
    }

    @Test
    public void shouldTransformATableEntry() {
        DataTableType tableType = new DataTableType(Place.class, (Map<String, String> entry) -> new Place(entry.get("place")));

        String here = "here";
        //noinspection unchecked
        List<Place> transform = (List<Place>) tableType.transform(Arrays.asList(singletonList("place"), singletonList(here)));

        assertEquals(1, transform.size());
        assertEquals(here, transform.get(0).name);
    }

    @Test
    public void shouldHaveAReasonableCanonicalRepresentation() {
        assertThat(singleCellType.toCanonical(), is("java.util.List<java.util.List<java.lang.Integer>>"));
    }

}