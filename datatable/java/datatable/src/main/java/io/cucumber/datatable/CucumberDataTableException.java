package io.cucumber.datatable;

import java.lang.reflect.Type;

import static io.cucumber.datatable.TypeFactory.typeName;
import static java.lang.String.format;

class CucumberDataTableException extends RuntimeException {
    CucumberDataTableException(String message) {
        super(message);
    }

    CucumberDataTableException(String s, Throwable throwable) {
        super(s, throwable);
    }

    static CucumberDataTableException cantConvertTo(Type type, String message) {
        return new CucumberDataTableException(
                format("Can't convert DataTable to %s. %s", typeName(type), message)
        );
    }

    static CucumberDataTableException cantConvertToMap(Type keyType, Type valueType, String message) {
        return new CucumberDataTableException(
                format("Can't convert DataTable to Map<%s, %s>. %s", typeName(keyType), typeName(valueType), message)
        );
    }

    static CucumberDataTableException cantConvertToMaps(Type keyType, Type valueType, String message) {
        return new CucumberDataTableException(
                format("Can't convert DataTable to List<Map<%s, %s>>. %s", typeName(keyType), typeName(valueType), message)
        );
    }

    static CucumberDataTableException cantConvertToList(Type itemType, String message) {
        return new CucumberDataTableException(
                format("Can't convert DataTable to List<%s>. %s", typeName(itemType), message)
        );
    }

    static CucumberDataTableException cantConvertToLists(Type itemType, String message) {
        return new CucumberDataTableException(
                format("Can't convert DataTable to List<List<%s>>. %s", typeName(itemType), message)
        );
    }

    static <K, V> CucumberDataTableException duplicateKeyException(Type keyType, Type valueType, K key, V value, V replaced) {
        return cantConvertToMap(keyType, valueType,
                format("Encountered duplicate key %s with values %s and %s", key, replaced, value));
    }

    static CucumberDataTableException keyValueMismatchException(boolean firstHeaderCellIsBlank, int keySize, Type keyType, int valueSize, Type valueType) {
        if (keySize > valueSize) {
            return cantConvertToMap(keyType, valueType,
                    "There are more keys then values. " +
                            "Did you use a TableEntryTransformer for the value while using a TableRow or TableCellTransformer for the keys?");
        }

        if (valueSize % keySize == 0) {
            return cantConvertToMap(keyType, valueType,
                    format(
                            "There is more then one value per key. " +
                                    "Did you mean to transform to Map<%s, List<%s>> instead?",
                            typeName(keyType), typeName(valueType)));
        }

        if (firstHeaderCellIsBlank) {
            return cantConvertToMap(keyType, valueType,
                    "There are more values then keys. The first header cell was left blank. You can add a value there");
        }

        return cantConvertToMap(keyType, valueType,
                "There are more values then keys. " +
                        "Did you use a TableEntryTransformer for the key while using a TableRow or TableCellTransformer for the value?");

    }

}
