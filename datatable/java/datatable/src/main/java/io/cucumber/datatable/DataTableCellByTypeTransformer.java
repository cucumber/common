package io.cucumber.datatable;

import java.util.List;

import static io.cucumber.datatable.TypeFactory.aListOf;
import static java.util.Collections.singletonList;

class DataTableCellByTypeTransformer implements TableCellByTypeTransformer {

    private DataTableTypeRegistry dataTableTypeRegistry;

    DataTableCellByTypeTransformer(DataTableTypeRegistry dataTableTypeRegistry) {
        this.dataTableTypeRegistry = dataTableTypeRegistry;
    }

    @Override
    public <T> T transform(String value, Class<T> cellType) throws Throwable {
        //noinspection unchecked
        DataTableType typeByType = dataTableTypeRegistry.lookupTableTypeByType(aListOf(aListOf(cellType)));
        if (typeByType == null) {
            throw new CucumberDataTableException("There is no DataTableType registered for cell type "+ cellType);
        }
        //noinspection unchecked
        return ((List<List<T>>)typeByType.transform(singletonList(singletonList(value)))).get(0).get(0);
    }
}
