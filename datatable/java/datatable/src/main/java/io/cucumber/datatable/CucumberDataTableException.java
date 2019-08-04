package io.cucumber.datatable;

import org.apiguardian.api.API;

import java.lang.reflect.Type;

import static io.cucumber.datatable.TypeFactory.typeName;
import static java.lang.String.format;

@API(status = API.Status.STABLE)
public class CucumberDataTableException extends RuntimeException {
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

    private static CucumberDataTableException cantConvertToMap(Type keyType, Type valueType, String message) {
        return new CucumberDataTableException(
                format("Can't convert DataTable to Map<%s, %s>. %s", typeName(keyType), typeName(valueType), message)
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

    static CucumberDataTableException keysImplyTableEntryTransformer(Type keyType, Type valueType) {
        return cantConvertToMap(keyType, valueType,
                format("The first cell was either blank or you have registered a TableEntryTransformer for the key type.\n" +
                        "\n" +
                        "This requires that there is a TableEntryTransformer for the value type but I couldn't find any.\n" +
                        "\n" +
                        "You can either:\n" +
                        "\n" +
                        "  1) Use a DataTableType that uses a TableEntryTransformer for %s\n" +
                        "\n" +
                        "  2) Add a key to the first cell and use a DataTableType that uses a TableEntryTransformer for %s", valueType, keyType));
    }

}
