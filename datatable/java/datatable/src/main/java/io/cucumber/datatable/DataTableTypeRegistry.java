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

        {
            TableCellTransformer<Object> objectTableCellTransformer = applyIfPresent(s -> s);
            defineDataTableType(new DataTableType(Object.class, objectTableCellTransformer, true));
            defineDataTableType(new DataTableType(Optional.class, emptyIfAbsent(objectTableCellTransformer), true));
        }
        {
            TableCellTransformer<Object> stringTableCellTransformer = applyIfPresent(s -> s);
            defineDataTableType(new DataTableType(String.class, stringTableCellTransformer, true));
            Type optionalString = new TypeReference<Optional<String>>() {}.getType();
            defineDataTableType(new DataTableType(optionalString, emptyIfAbsent(stringTableCellTransformer), true));
        }
        {
            TableCellTransformer<BigInteger> bigIntegerTableCellTransformer = applyIfPresent(BigInteger::new);
            defineDataTableType(new DataTableType(BigInteger.class, bigIntegerTableCellTransformer));
            Type optionalBigInteger = new TypeReference<Optional<BigInteger>>() {}.getType();
            defineDataTableType(new DataTableType(optionalBigInteger, emptyIfAbsent(bigIntegerTableCellTransformer)));
        }
        {
            TableCellTransformer<BigDecimal> bigDecimalTableCellTransformer = applyIfPresent(numberParser::parseBigDecimal);
            defineDataTableType(new DataTableType(BigDecimal.class, bigDecimalTableCellTransformer));
            Type optionalBigDecimal = new TypeReference<Optional<BigDecimal>>() {}.getType();
            defineDataTableType(new DataTableType(optionalBigDecimal, emptyIfAbsent(bigDecimalTableCellTransformer)));
        }
        {
            TableCellTransformer<Byte> byteTableCellTransformer = applyIfPresent(Byte::decode);
            defineDataTableType(new DataTableType(Byte.class, byteTableCellTransformer));
            defineDataTableType(new DataTableType(byte.class, byteTableCellTransformer));
            Type optionalByte = new TypeReference<Optional<Byte>>() {}.getType();
            defineDataTableType(new DataTableType(optionalByte, emptyIfAbsent(byteTableCellTransformer)));
        }
        {
            TableCellTransformer<Short> shortTableCellTransformer = applyIfPresent(Short::decode);
            defineDataTableType(new DataTableType(Short.class, shortTableCellTransformer));
            defineDataTableType(new DataTableType(short.class, shortTableCellTransformer));
            Type optionalShort = new TypeReference<Optional<Short>>() {}.getType();
            defineDataTableType(new DataTableType(optionalShort, emptyIfAbsent(shortTableCellTransformer)));
        }
        {
            TableCellTransformer<Integer> integerTableCellTransformer = applyIfPresent(Integer::decode);
            defineDataTableType(new DataTableType(Integer.class, integerTableCellTransformer));
            defineDataTableType(new DataTableType(int.class, integerTableCellTransformer));
            Type optionalInteger = new TypeReference<Optional<Integer>>() {}.getType();
            defineDataTableType(new DataTableType(optionalInteger, emptyIfAbsent(integerTableCellTransformer)));
        }
        {
            TableCellTransformer<Long> longTableCellTransformer = applyIfPresent(Long::decode);
            defineDataTableType(new DataTableType(Long.class, longTableCellTransformer));
            defineDataTableType(new DataTableType(long.class, longTableCellTransformer));
            Type optionalLong = new TypeReference<Optional<Long>>() {}.getType();
            defineDataTableType(new DataTableType(optionalLong, emptyIfAbsent(longTableCellTransformer)));
        }
        {
            TableCellTransformer<Float> floatTableCellTransformer = applyIfPresent(numberParser::parseFloat);
            defineDataTableType(new DataTableType(Float.class, floatTableCellTransformer));
            defineDataTableType(new DataTableType(float.class, floatTableCellTransformer));
            Type optionalFloat = new TypeReference<Optional<Float>>() {}.getType();
            defineDataTableType(new DataTableType(optionalFloat, emptyIfAbsent(floatTableCellTransformer)));
        }
        {
            TableCellTransformer<Double> doubleTableCellTransformer = applyIfPresent(numberParser::parseDouble);
            defineDataTableType(new DataTableType(Double.class, doubleTableCellTransformer));
            defineDataTableType(new DataTableType(double.class, doubleTableCellTransformer));
            Type optionalDouble = new TypeReference<Optional<Double>>() {}.getType();
            defineDataTableType(new DataTableType(optionalDouble, emptyIfAbsent(doubleTableCellTransformer)));
        }
    }

    private static <R> TableCellTransformer<R> applyIfPresent(Function<String, R> f) {
        return s -> s == null ? null : f.apply(s);
    }

    private static <R> TableCellTransformer<Optional<R>> emptyIfAbsent(TableCellTransformer<R> t) {
        return s -> s == null || s.isEmpty() ? Optional.empty() : Optional.ofNullable(t.transform(s));
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


