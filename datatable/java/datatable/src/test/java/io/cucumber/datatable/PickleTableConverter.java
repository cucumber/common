package io.cucumber.datatable;

import io.cucumber.messages.Messages;

import java.util.ArrayList;
import java.util.List;

class PickleTableConverter {
    static List<List<String>> toTable(Messages.PickleStepArgument.PickleTable pickleTable) {
        List<List<String>> table = new ArrayList<>();
        for (Messages.PickleStepArgument.PickleTable.PickleTableRow pickleRow : pickleTable.getRowsList()) {
            List<String> row = new ArrayList<>();
            for (Messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell pickleCell : pickleRow.getCellsList()) {
                row.add(pickleCell.getValue());
            }
            table.add(row);
        }
        return table;
    }
}
