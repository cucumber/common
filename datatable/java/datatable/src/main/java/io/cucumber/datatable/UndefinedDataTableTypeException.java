package io.cucumber.datatable;

import java.lang.reflect.Type;

import static io.cucumber.datatable.TypeFactory.typeName;
import static java.lang.String.format;

public class UndefinedDataTableTypeException extends CucumberDataTableException {
    private UndefinedDataTableTypeException(String message) {
        super(message);
    }

    static UndefinedDataTableTypeException singletonNoConverterDefined(Type type) {
        return new UndefinedDataTableTypeException(
                format("Can't convert DataTable to %s. " +
                                "Please register a DataTableType with a " +
                                "TableTransformer, TableEntryTransformer or TableRowTransformer for %s",
                        typeName(type), type)
        );
    }

    static UndefinedDataTableTypeException mapNoConverterDefined(Type keyType, Type valueType, String missingConverter, Type typeToRegister) {
        return new UndefinedDataTableTypeException(
                format("Can't convert DataTable to Map<%s, %s>. " +
                                "Please register a DataTableType with a %s for %s",
                        typeName(keyType), typeName(valueType), missingConverter, typeToRegister)
        );
    }


    static UndefinedDataTableTypeException mapsNoConverterDefined(Type keyType, Type valueType, Type typeToRegister) {
        return new UndefinedDataTableTypeException(
                format("Can't convert DataTable to List<Map<%s, %s>>. " +
                                "Please register a DataTableType with a TableCellTransformer for %s",
                        typeName(keyType), typeName(valueType), typeToRegister)
        );
    }


    static CucumberDataTableException listNoConverterDefined(Type itemType, String missingConverter, Type typeToRegister) {
        return new UndefinedDataTableTypeException(
                format("Can't convert DataTable to List<%s>. " +
                                "Please register a DataTableType with a %s for %s",
                        typeName(itemType), missingConverter, typeToRegister)
        );
    }


    static CucumberDataTableException listsNoConverterDefined(Type itemType) {
        return new UndefinedDataTableTypeException(
                format("Can't convert DataTable to List<List<%s>>. " +
                                "Please register a DataTableType with a TableCellTransformer for %s",
                        typeName(itemType), itemType)
        );
    }

}
