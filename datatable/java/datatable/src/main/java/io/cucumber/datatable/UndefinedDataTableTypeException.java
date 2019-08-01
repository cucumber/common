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
                format("Can't convert DataTable to %s.\n" +
                                "Please register a DataTableType with a " +
                                "TableTransformer, TableEntryTransformer or TableRowTransformer for %s.",
                        typeName(type), typeName(type))
        );
    }

    static CucumberDataTableException singletonTableTooWide(Type itemType, String missingConverter, Type typeToRegister) {
        return new UndefinedDataTableTypeException(
                format("Can't convert DataTable to %s.\n" +
                                "There was a table cell converter but the table was too wide to use it.\n" +
                                "Please reduce the table width or register a %s for %s.\n" ,
                        typeName(itemType), missingConverter, typeName(typeToRegister))
        );
    }

    static UndefinedDataTableTypeException mapNoConverterDefined(Type keyType, Type valueType, String missingConverter, Type typeToRegister) {
        return new UndefinedDataTableTypeException(
                format("Can't convert DataTable to Map<%s, %s>.\n" +
                                "Please register a DataTableType with a %s for %s.",
                        typeName(keyType), typeName(valueType), missingConverter, typeName(typeToRegister))
        );
    }


    static UndefinedDataTableTypeException mapsNoConverterDefined(Type keyType, Type valueType, Type typeToRegister) {
        return new UndefinedDataTableTypeException(
                format("Can't convert DataTable to List<Map<%s, %s>>.\n" +
                                "Please register a DataTableType with a TableCellTransformer for %s.",
                        typeName(keyType), typeName(valueType), typeName(typeToRegister))
        );
    }


    static CucumberDataTableException listNoConverterDefined(Type itemType, String missingConverter, Type typeToRegister) {
        return new UndefinedDataTableTypeException(
                format("Can't convert DataTable to List<%s>.\n" +
                                "You can register a DataTableType using DataTableType.entry(%s.class).\n" +
                                "For more control you can define your own DataTableType with a %s for %s.\n",
                        typeName(itemType), typeName(typeToRegister), missingConverter, typeName(typeToRegister))
        );
    }

    static CucumberDataTableException listTableTooWide(Type itemType, String missingConverter, Type typeToRegister) {
        return new UndefinedDataTableTypeException(
                format("Can't convert DataTable to List<%s>.\n" +
                                "There was a table cell converter but the table was too wide to use it.\n" +
                                "Please reduce the table width or register a %s for %s.\n" ,
                        typeName(itemType), missingConverter, typeName(typeToRegister))
        );
    }

    static CucumberDataTableException listsNoConverterDefined(Type itemType) {
        return new UndefinedDataTableTypeException(
                format("Can't convert DataTable to List<List<%s>>.\n" +
                                "Please register a DataTableType with a TableCellTransformer for %s.",
                        typeName(itemType), typeName(itemType))
        );
    }

}
