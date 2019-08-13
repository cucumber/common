package io.cucumber.datatable;

import java.io.IOException;
import java.util.List;

final class DiffTablePrinter extends TablePrinter {
    private final List<DiffType> diffTypes;

    DiffTablePrinter(List<DiffType> diffTypes) {
        this.diffTypes = diffTypes;
    }

    @Override
    protected void printStartIndent(Appendable buffer, int rowIndex) throws IOException {
        switch (diffTypes.get(rowIndex)) {
        case NONE:
            buffer.append("      ");
            break;
        case DELETE:
            buffer.append("    - ");
            break;
        case INSERT:
            buffer.append("    + ");
            break;
        }
    }

}
