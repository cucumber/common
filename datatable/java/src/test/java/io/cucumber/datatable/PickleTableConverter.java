package io.cucumber.datatable;

import gherkin.pickles.PickleCell;
import gherkin.pickles.PickleRow;
import gherkin.pickles.PickleTable;

import java.util.ArrayList;
import java.util.List;

class PickleTableConverter {
    static List<List<String>> toTable(PickleTable pickleTable) {
        List<List<String>> table = new ArrayList<List<String>>();
        for (PickleRow pickleRow : pickleTable.getRows()) {
            List<String> row = new ArrayList<String>();
            for (PickleCell pickleCell : pickleRow.getCells()) {
                row.add(pickleCell.getValue());
            }
            table.add(row);
        }
        return table;
    }
}
