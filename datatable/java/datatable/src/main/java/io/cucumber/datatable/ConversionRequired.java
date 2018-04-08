package io.cucumber.datatable;

import io.cucumber.datatable.DataTable.TableConverter;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

final class ConversionRequired implements TableConverter {

    @Override
    public <T> T convert(DataTable dataTable, Type type) {
        return convert(dataTable, type, false);
    }

    @Override
    public <T> T convert(DataTable dataTable, Type type, boolean transposed) {
        throw new CucumberDataTableException(String.format("Can't convert DataTable to %s. You have to write the conversion for it in this method", type));
    }

    @Override
    public <T> List<T> toList(DataTable dataTable, Type itemType) {
        throw new CucumberDataTableException(String.format("Can't convert DataTable to List<%s>. You have to write the conversion for it in this method", itemType));
    }

    @Override
    public <T> List<List<T>> toLists(DataTable dataTable, Type itemType) {
        throw new CucumberDataTableException(String.format("Can't convert DataTable to List<List<%s>>. You have to write the conversion for it in this method", itemType));
    }

    @Override
    public <K, V> Map<K, V> toMap(DataTable dataTable, Type keyType, Type valueType) {
        throw new CucumberDataTableException(String.format("Can't convert DataTable to Map<%s,%s>. You have to write the conversion for it in this method", keyType, valueType));
    }

    @Override
    public <K, V> List<Map<K, V>> toMaps(DataTable dataTable, Type keyType, Type valueType) {
        throw new CucumberDataTableException(String.format("Can't convert DataTable to List<Map<%s,%s>>. You have to write the conversion for it in this method", keyType, valueType));
    }

}
