package io.cucumber.datatable;


import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.SortedSet;

import static java.lang.String.format;

class AmbiguousDataTableTypeException extends CucumberDataTableException {

    AmbiguousDataTableTypeException(Type tableType, SortedSet<DataTableType> dataTableTypes) {
        super(format(
            "\n" +
                "The type %s matches multiple data table types:\n" +
                "\n" +
                "   %s\n" +
                "\n" +
                "I couldn't decide which one to use. You have two options:\n" +
                "\n" +
                "1) Add an explicit table name to your step definition\n" +
                "\n" +
                "2) Make one of the data table types preferential and continue to use an implicit data table.\n",
            tableType, dataTableTypeNames(dataTableTypes))
        );
    }

    private static String dataTableTypeNames(SortedSet<DataTableType> dataTableTypes) {
        List<String> parameterNames = new ArrayList<>();
        for (DataTableType dataTableType : dataTableTypes) {
            parameterNames.add("{" + dataTableType.getName() + "}");
        }
        return join(parameterNames);
    }

    private static String join(List<String> strings) {
        StringBuilder builder = new StringBuilder();
        boolean first = true;
        for (String element : strings) {
            if (first) {
                first = false;
            } else {
                builder.append("\n   ");
            }
            builder.append(element);
        }

        return builder.toString();
    }

}
