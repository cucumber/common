package io.cucumber.datatable;

import io.cucumber.datatable.dependency.com.fasterxml.jackson.databind.JavaType;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.NumberFormat;
import java.util.HashMap;
import java.util.Locale;

import static io.cucumber.datatable.TypeFactory.constructType;
import static java.lang.String.format;

public final class DataTableTypeRegistry {

    private final HashMap<JavaType, DataTableType> tableTypeByType = new HashMap<>();

    public DataTableTypeRegistry(Locale locale) {
        NumberFormat numberFormat = NumberFormat.getNumberInstance(locale);
        final NumberParser numberParser = new NumberParser(numberFormat);

        defineDataTableType(new DataTableType(BigInteger.class, new TableCellTransformer<BigInteger>() {
            @Override
            public BigInteger transform(String cell) {
                return new BigInteger(cell);
            }
        }));

        defineDataTableType(new DataTableType(BigDecimal.class, new TableCellTransformer<BigDecimal>() {
            @Override
            public BigDecimal transform(String cell) {
                return new BigDecimal(cell);
            }
        }));

        defineDataTableType(new DataTableType(Byte.class, new TableCellTransformer<Byte>() {
            @Override
            public Byte transform(String cell) {
                return Byte.decode(cell);
            }
        }));

        defineDataTableType(new DataTableType(Short.class, new TableCellTransformer<Short>() {
            @Override
            public Short transform(String cell) {
                return Short.decode(cell);
            }
        }));

        defineDataTableType(new DataTableType(Integer.class, new TableCellTransformer<Integer>() {
            @Override
            public Integer transform(String cell) {
                return Integer.decode(cell);
            }
        }));

        defineDataTableType(new DataTableType(Long.class, new TableCellTransformer<Long>() {
            @Override
            public Long transform(String cell) {
                return Long.decode(cell);
            }
        }));

        defineDataTableType(new DataTableType(Float.class, new TableCellTransformer<Float>() {
            @Override
            public Float transform(String cell) {
                return numberParser.parseFloat(cell);
            }
        }));

        defineDataTableType(new DataTableType(Double.class, new TableCellTransformer<Double>() {
            @Override
            public Double transform(String cell) {
                return numberParser.parseDouble(cell);
            }
        }));

        defineDataTableType(new DataTableType(String.class, new TableCellTransformer<String>() {
            @Override
            public String transform(String cell) {
                return cell;
            }
        }));

    }

    public void defineDataTableType(DataTableType dataTableType) {
        DataTableType existing = tableTypeByType.get(dataTableType.getTargetType());
        if (existing != null) {
            throw new DuplicateTypeException(format(
                    "There is already a data table type registered for %s.\n" +
                            "It registered an %s. You are trying to add a %s",
                    dataTableType.getElementType(),
                    dataTableType.getTransformerType().getSimpleName(),
                    existing.getTransformerType().getSimpleName()
            ));
        }
        tableTypeByType.put(dataTableType.getTargetType(), dataTableType);

    }

    public DataTableType lookupTableTypeByType(final Type tableType) {
        return tableTypeByType.get(constructType(tableType));
    }
}


