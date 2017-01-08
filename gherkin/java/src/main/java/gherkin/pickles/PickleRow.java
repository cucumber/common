package gherkin.pickles;

import java.util.List;

import static java.util.Collections.unmodifiableList;

public class PickleRow {
    private final List<PickleCell> cells;

    public PickleRow(List<PickleCell> cells) {
        this.cells = unmodifiableList(cells);
    }

    public List<PickleCell> getCells() {
        return cells;
    }

}
