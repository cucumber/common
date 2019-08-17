package io.cucumber.datatable;

import java.util.ArrayList;
import java.util.List;


class TableParser {

    private TableParser() {
    }


    static DataTable parse(String... source) {
        return parse(String.join("\n", source));
    }

    static DataTable parse(String source) {
        List<List<String>> rows = new ArrayList<>();
        for (String line : source.split("\n")) {
            if (line.isEmpty()) {
                continue;
            }
            rows.add(parseRow(line));
        }
        return DataTable.create(rows);
    }

    private static List<String> parseRow(String line) {
        List<String> row = new ArrayList<>();
        String[] split = line.trim().split("\\|");
        for (int i = 0; i < split.length; i++) {
            String s = split[i];
            if (i == 0) {
                continue;
            }
            String trimmed = s.trim();
            row.add(trimmed);
        }
        return row;
    }

}
