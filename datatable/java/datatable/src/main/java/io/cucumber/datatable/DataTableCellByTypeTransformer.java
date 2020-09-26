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
    @SuppressWarnings("unchecked")
    public Object transform(String cellValue, Type toValueType) {
        DataTableType typeByType = dataTableTypeRegistry.lookupCellTypeByType(toValueType);
        if (typeByType == null) {
            throw new CucumberDataTableException("There is no DataTableType registered for cell type " + toValueType);
        }
        List<List<String>> rawTable = singletonList(singletonList(cellValue));
        List<List<Object>> transformed = (List<List<Object>>) typeByType.transform(rawTable);
        return transformed.get(0).get(0);
    }
}
