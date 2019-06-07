package io.cucumber.datatable;

import io.cucumber.datatable.dependency.com.fasterxml.jackson.databind.JavaType;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import static io.cucumber.datatable.TypeFactory.constructType;
import static java.lang.String.format;

public final class DataTableTypeRegistry {

    private final DataTableCellByTypeTransformer tableCellByTypeTransformer = new DataTableCellByTypeTransformer(this);
    private final Map<JavaType, DataTableType> tableTypeByType = new HashMap<>();
    private TableEntryByTypeTransformer defaultDataTableEntryTransformer;
    private TableCellByTypeTransformer defaultDataTableCellTransformer;

    public DataTableTypeRegistry(Locale locale) {
        final NumberParser numberParser = new NumberParser(locale);

        defineDataTableType(new DataTableType(BigInteger.class, new TableCellTransformer<BigInteger>() {
            @Override
            public BigInteger transform(String cell) {
                return cell.isEmpty() ? null : new BigInteger(cell);
            }
        }));

        defineDataTableType(new DataTableType(BigDecimal.class, new TableCellTransformer<BigDecimal>() {
            @Override
            public BigDecimal transform(String cell) {
                return cell.isEmpty() ? null : numberParser.parseBigDecimal(cell);
            }
        }));

        TableCellTransformer<Byte> byteTableCellTransformer = new TableCellTransformer<Byte>() {
            @Override
            public Byte transform(String cell) {
                return cell.isEmpty() ? null : Byte.decode(cell);
            }
        };
        defineDataTableType(new DataTableType(Byte.class, byteTableCellTransformer));
        defineDataTableType(new DataTableType(byte.class, byteTableCellTransformer));

        TableCellTransformer<Short> shortTableCellTransformer = new TableCellTransformer<Short>() {
            @Override
            public Short transform(String cell) {
                return cell.isEmpty() ? null : Short.decode(cell);
            }
        };
        defineDataTableType(new DataTableType(Short.class, shortTableCellTransformer));
        defineDataTableType(new DataTableType(short.class, shortTableCellTransformer));

        TableCellTransformer<Integer> integerTableCellTransformer = new TableCellTransformer<Integer>() {
            @Override
            public Integer transform(String cell) {
                return cell.isEmpty() ? null : Integer.decode(cell);
            }
        };
        defineDataTableType(new DataTableType(Integer.class, integerTableCellTransformer));
        defineDataTableType(new DataTableType(int.class, integerTableCellTransformer));

        TableCellTransformer<Long> longTableCellTransformer = new TableCellTransformer<Long>() {
            @Override
            public Long transform(String cell) {
                return cell.isEmpty() ? null : Long.decode(cell);
            }
        };
        defineDataTableType(new DataTableType(Long.class, longTableCellTransformer));
        defineDataTableType(new DataTableType(long.class, longTableCellTransformer));

        TableCellTransformer<Float> floatTableCellTransformer = new TableCellTransformer<Float>() {
            @Override
            public Float transform(String cell) {
                return cell.isEmpty() ? null : numberParser.parseFloat(cell);
            }
        };
        defineDataTableType(new DataTableType(Float.class, floatTableCellTransformer));
        defineDataTableType(new DataTableType(float.class, floatTableCellTransformer));

        TableCellTransformer<Double> doubleTableCellTransformer = new TableCellTransformer<Double>() {
            @Override
            public Double transform(String cell) {
                return cell.isEmpty() ? null : numberParser.parseDouble(cell);
            }
        };
        defineDataTableType(new DataTableType(Double.class, doubleTableCellTransformer));
        defineDataTableType(new DataTableType(double.class, doubleTableCellTransformer));

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
        JavaType targetType = constructType(tableType);
        return tableTypeByType.get(targetType);
    }

    DataTableType getDefaultTableCellTransformer(final Type tableType) {
        if (defaultDataTableCellTransformer == null) {
            return null;
        }

        JavaType targetType = constructType(tableType);
        return DataTableType.defaultCell(
                targetType.getRawClass(),
                defaultDataTableCellTransformer
        );
    }

    DataTableType getDefaultTableEntryTransformer(final Type tableType) {
        if (defaultDataTableEntryTransformer == null) {
            return null;
        }

        JavaType targetType = constructType(tableType);
        return DataTableType.defaultEntry(
                targetType.getRawClass(),
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


