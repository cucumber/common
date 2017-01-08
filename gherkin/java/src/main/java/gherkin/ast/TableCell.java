package gherkin.ast;

public class TableCell extends Node {
    private final String value;

    public TableCell(Location location, String value) {
        super(location);
        this.value = value;
    }

    public String getValue() {
        return value;
    }

}
