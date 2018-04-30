package io.cucumber.datatable;

import org.junit.Test;

import java.util.List;

import static java.util.Collections.singletonList;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class DataTableTypeTest {

    private final DataTableType singleCellType = new DataTableType(Integer.class, new TableCellTransformer<Integer>() {
        @Override
        public Integer transform(String cell) {
            return Integer.parseInt(cell);
        }
    });

    @Test
    @SuppressWarnings("unchecked")
    public void shouldTransformATableCell() {
        assertThat((List<List<Integer>>)singleCellType.transform(singletonList(singletonList("12"))), equalTo(singletonList(singletonList(12))));
    }

    @Test
    public void shouldHaveAReasonableCanonicalRepresentation() {
        assertThat(singleCellType.toCanonical(), is("java.util.List<java.util.List<java.lang.Integer>>"));
    }

}