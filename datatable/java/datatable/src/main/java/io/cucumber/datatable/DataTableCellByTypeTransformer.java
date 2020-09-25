package io.cucumber.datatable;

import java.lang.reflect.Type;
import java.util.List;

import static java.util.Collections.singletonList;

final class DataTableCellByTypeTransformer implements TableCellByTypeTransformer {

    private DataTableTypeRegistry dataTableTypeRegistry;

    DataTableCellByTypeTransformer(DataTableTypeRegistry dataTableTypeRegistry) {
        this.dataTableTypeRegistry = dataTableTypeRegistry;
    }

    @Override
    public Object transform(String cellValue, Type toValueType) {
        DataTableType typeByType = dataTableTypeRegistry.lookupTableCellByType(toValueType);
        if (typeByType == null) {
            throw new CucumberDataTableException("There is no DataTableType registered for cell type " + toValueType);
        }
        return ((List<List<Object>>) typeByType.transform(singletonList(singletonList(cellValue)))).get(0).get(0);
    }
}
