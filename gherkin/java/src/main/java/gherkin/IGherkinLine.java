package gherkin;

import java.util.List;

public interface IGherkinLine {
    int indent();

    void detach();

    String getLineText(int indentToRemove);

    boolean isEmpty();

    boolean startsWith(String prefix);

    String getRestTrimmed(int length);

    List<GherkinLineSpan> getTags();

    boolean startsWithTitleKeyword(String keyword);

    List<GherkinLineSpan> getTableCells();
}
