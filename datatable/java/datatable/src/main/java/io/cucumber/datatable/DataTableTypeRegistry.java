package io.cucumber.datatable;

import io.cucumber.datatable.TypeFactory.JavaType;
import org.apiguardian.api.API;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

import static io.cucumber.datatable.TypeFactory.constructType;
import static java.lang.String.format;

@API(status = API.Status.STABLE)
public final class DataTableTypeRegistry {

    private final DataTableCellByTypeTransformer tableCellByTypeTransformer = new DataTableCellByTypeTransformer(this);
    private final Map<JavaType, DataTableType> tableTypeByType = new HashMap<>();
    private TableEntryByTypeTransformer defaultDataTableEntryTransformer;
    private TableCellByTypeTransformer defaultDataTableCellTransformer;

    public DataTableTypeRegistry(Locale locale) {
        final NumberParser numberParser = new NumberParser(locale);

        TableCellTransformer<Object> objectTableCellTransformer = applyIfPresent(s -> s);
        defineDataTableType(new DataTableType(Object.class, objectTableCellTransformer, true));
        defineDataTableType(new DataTableType(String.class, objectTableCellTransformer, true));

        TableCellTransformer<BigInteger> bigIntegerTableCellTransformer = applyIfPresent(BigInteger::new);
        defineDataTableType(new DataTableType(BigInteger.class, bigIntegerTableCellTransformer));

        TableCellTransformer<BigDecimal> bigDecimalTableCellTransformer = applyIfPresent(numberParser::parseBigDecimal);
        defineDataTableType(new DataTableType(BigDecimal.class, bigDecimalTableCellTransformer));
        TableCellTransformer<Byte> byteTableCellTransformer = applyIfPresent(Byte::decode);
        defineDataTableType(new DataTableType(Byte.class, byteTableCellTransformer));
        defineDataTableType(new DataTableType(byte.class, byteTableCellTransformer));

        TableCellTransformer<Short> shortTableCellTransformer = applyIfPresent(Short::decode);
        defineDataTableType(new DataTableType(Short.class, shortTableCellTransformer));
        defineDataTableType(new DataTableType(short.class, shortTableCellTransformer));

        TableCellTransformer<Integer> integerTableCellTransformer = applyIfPresent(Integer::decode);
        defineDataTableType(new DataTableType(Integer.class, integerTableCellTransformer));
        defineDataTableType(new DataTableType(int.class, integerTableCellTransformer));

        TableCellTransformer<Long> longTableCellTransformer = applyIfPresent(Long::decode);
        defineDataTableType(new DataTableType(Long.class, longTableCellTransformer));
        defineDataTableType(new DataTableType(long.class, longTableCellTransformer));

        TableCellTransformer<Float> floatTableCellTransformer = applyIfPresent(numberParser::parseFloat);
        defineDataTableType(new DataTableType(Float.class, floatTableCellTransformer));
        defineDataTableType(new DataTableType(float.class, floatTableCellTransformer));

        TableCellTransformer<Double> doubleTableCellTransformer = applyIfPresent(numberParser::parseDouble);
        defineDataTableType(new DataTableType(Double.class, doubleTableCellTransformer));
        defineDataTableType(new DataTableType(double.class, doubleTableCellTransformer));

        TableCellTransformer<Optional<Object>> optionalTableCellTransformer =
                (String s) -> s == null || s.isEmpty() ? Optional.empty() : Optional.of(s);
        defineDataTableType(new DataTableType(Optional.class, optionalTableCellTransformer));

        Type optionalString = new TypeReference<Optional<String>>() { }.getType();
        defineDataTableType(new DataTableType(optionalString, optionalTableCellTransformer));

        Type optionalDouble = new TypeReference<Optional<Double>>() { }.getType();
        TableCellTransformer<Optional<Double>> optionalDoubleTableCellTransformer =
                (String s) -> s == null || s.isEmpty() ? Optional.empty() : Optional.of(numberParser.parseDouble(s));
        defineDataTableType(new DataTableType(optionalDouble, optionalDoubleTableCellTransformer));

        Type optionalFloat = new TypeReference<Optional<Float>>() { }.getType();
        TableCellTransformer<Optional<Float>> optionalFloatTableCellTransformer =
                (String s) -> s == null || s.isEmpty() ? Optional.empty() : Optional.of(numberParser.parseFloat(s));
        defineDataTableType(new DataTableType(optionalFloat, optionalFloatTableCellTransformer));

        Type optionalLong = new TypeReference<Optional<Long>>() { }.getType();
        TableCellTransformer<Optional<Long>> optionalLongTableCellTransformer =
                (String s) -> s == null || s.isEmpty() ? Optional.empty() : Optional.of(Long.decode(s));
        defineDataTableType(new DataTableType(optionalLong, optionalLongTableCellTransformer));

        Type optionalByte = new TypeReference<Optional<Byte>>() { }.getType();
        TableCellTransformer<Optional<Byte>> optionalByteTableCellTransformer =
                (String s) -> s == null || s.isEmpty() ? Optional.empty() : Optional.of(Byte.decode(s));
        defineDataTableType(new DataTableType(optionalByte, optionalByteTableCellTransformer));

        Type optionalBigDecimal = new TypeReference<Optional<BigDecimal>>() { }.getType();
        TableCellTransformer<Optional<BigDecimal>> optionalBigDecimalTableCellTransformer =
                (String s) -> s == null || s.isEmpty() ? Optional.empty() : Optional.of(numberParser.parseBigDecimal(s));
        defineDataTableType(new DataTableType(optionalBigDecimal, optionalBigDecimalTableCellTransformer));


        Type optionalBigInt = new TypeReference<Optional<BigInteger>>() { }.getType();
        TableCellTransformer<Optional<BigInteger>> optionalBigIntTableCellTransformer =
                (String s) -> s == null || s.isEmpty() ? Optional.empty() : Optional.of(new BigInteger(s));
        defineDataTableType(new DataTableType(optionalBigInt, optionalBigIntTableCellTransformer));
    }

    private static <R> TableCellTransformer<R> applyIfPresent(Function<String, R> f) {
        return s -> s == null ? null : f.apply(s);
    }

    public void defineDataTableType(DataTableType dataTableType) {
        DataTableType existing = tableTypeByType.get(dataTableType.getTargetType());
        if (existing != null && !existing.isReplaceable()) {
            throw new DuplicateTypeException(format("" +
                            "There already is a data table type registered that can supply %s.\n" +
                            "You are trying to register a %s for %s.\n" +
                            "The existing data table type registered a %s for %s.\n",
                    dataTableType.getElementType(),
                    dataTableType.getTransformerType().getSimpleName(),
                    dataTableType.getElementType(),
                    existing.getTransformerType().getSimpleName(),
                    existing.getElementType()
            ));
        }
        tableTypeByType.put(dataTableType.getTargetType(), dataTableType);

    }

    DataTableType lookupTableTypeByType(final Type tableType) {
        JavaType targetType = constructType(tableType);
        return tableTypeByType.get(targetType);
    }

    DataTableType getDefaultTableCellTransformer(Type tableType) {
        if (defaultDataTableCellTransformer == null) {
            return null;
        }

        if (tableType instanceof JavaType) {
            JavaType javaType = (JavaType) tableType;
            tableType = javaType.getOriginal();
        }

        return DataTableType.defaultCell(
                tableType,
                defaultDataTableCellTransformer
        );
    }

    DataTableType getDefaultTableEntryTransformer(Type tableType) {
        if (defaultDataTableEntryTransformer == null) {
            return null;
        }

        if (tableType instanceof JavaType) {
            JavaType javaType = (JavaType) tableType;
            tableType = javaType.getOriginal();
        }

        return DataTableType.defaultEntry(
                tableType,
                defaultDataTableEntryTransformer,
                tableCellByTypeTransformer
        );
    }

    public void setDefaultDataTableEntryTransformer(TableEntryByTypeTransformer defaultDataTableEntryTransformer) {
        this.defaultDataTableEntryTransformer = defaultDataTableEntryTransformer;
    }

    public void setDefaultDataTableCellTransformer(TableCellByTypeTransformer defaultDataTableCellTransformer) {
        this.defaultDataTableCellTransformer = defaultDataTableCellTransformer;
    }
}


