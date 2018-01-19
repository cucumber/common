package io.cucumber.datatable;

import java.lang.reflect.Type;

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
            format("Can't convert DataTable to %s. %s", type, message)
        );
    }

    static CucumberDataTableException cantConvertToMap(Type keyType, Type valueType, String message) {
        return new CucumberDataTableException(
            format("Can't convert DataTable to Map<%s,%s>. %s", keyType, valueType, message)
        );
    }

    static <K, V> CucumberDataTableException duplicateKeyException(Type keyType, Type valueType, K key, V value, V replaced) {
        return cantConvertToMap(keyType, valueType,
                format("Encountered duplicate key %s with values %s and %s", key, replaced, value));
    }

    static CucumberDataTableException cantConvertToMaps(Type keyType, Type valueType, String message) {
        return new CucumberDataTableException(
            format("Can't convert DataTable to List<Map<%s,%s>>. %s", keyType, valueType, message)
        );
    }

    static CucumberDataTableException cantConvertToList(Type itemType, String message) {
        return new CucumberDataTableException(
            format("Can't convert DataTable to List<%s>. %s", itemType, message)
        );
    }

    static CucumberDataTableException cantConvertToLists(Type itemType, String message) {
        return new CucumberDataTableException(
            format("Can't convert DataTable to List<List<%s>>. %s", itemType, message)
        );
    }

}
