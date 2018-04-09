package gherkin.ast;

import java.util.Collections;
import java.util.List;

public class ExampleData extends Node {
    private final List<Tag> tags;
    private final String keyword;
    private final String name;
    private final String description;
    private final TableRow tableHeader;
    private final List<TableRow> tableBody;

    public ExampleData(Location location, List<Tag> tags, String keyword, String name, String description, TableRow tableHeader, List<TableRow> tableBody) {
        super(location);
        this.tags = Collections.unmodifiableList(tags);
        this.keyword = keyword;
        this.name = name;
        this.description = description;
        this.tableHeader = tableHeader;
        this.tableBody = tableBody != null ? Collections.unmodifiableList(tableBody) : null;
    }

    public String getKeyword() {
        return keyword;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public List<TableRow> getTableBody() {
        return tableBody;
    }

    public TableRow getTableHeader() {
        return tableHeader;
    }

    public List<Tag> getTags() {
        return tags;
    }
}
