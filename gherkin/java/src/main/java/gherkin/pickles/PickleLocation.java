package gherkin.pickles;

public class PickleLocation {
    private final int line;
    private final int column;

    public PickleLocation(int line, int column) {
        this.line = line;
        this.column = column;
    }

    public int getLine() {
        return line;
    }

    public int getColumn() {
        return column;
    }
}
