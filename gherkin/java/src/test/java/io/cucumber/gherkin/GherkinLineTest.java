package io.cucumber.gherkin;

import org.junit.Test;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;

public class GherkinLineTest {
    @Test
    public void finds_tags() {
        GherkinLine gherkinLine = new GherkinLine("    @this @is  @atag  ");
        List<GherkinLineSpan> gherkinLineSpans = gherkinLine.getTags();

        assertEquals(asList(
                new GherkinLineSpan(5, "@this"),
                new GherkinLineSpan(11, "@is"),
                new GherkinLineSpan(16, "@atag")
        ), gherkinLineSpans);
    }

    @Test
    public void finds_table_cells() {
        // The cells below has the following whitespace characters on each side:
        // - U+00A0 (non-breaking space)
        // - U+0020 (space)
        // - U+0009 (tab)
        // This is generated with `ruby -e 'STDOUT.write "\u00A0\u0020\u0009".encode("utf-8")' | pbcopy`
        // and pasted.
        GherkinLine gherkinLine = new GherkinLine("      |  \tred  \t|  \tblue  \t|  \t\uD83E\uDD52\uD83E\uDD52\uD83E\uDD52  \t|  \tgreen  \t|");
        GherkinLineSpan redSpan = gherkinLine.getTableCells().get(0);
        GherkinLineSpan blueSpan = gherkinLine.getTableCells().get(1);
        GherkinLineSpan emojiSpan = gherkinLine.getTableCells().get(2);
        GherkinLineSpan greenSpan = gherkinLine.getTableCells().get(3);

        assertEquals("red", redSpan.text);
        assertEquals(11, redSpan.column);

        assertEquals("blue", blueSpan.text);
        assertEquals(21, blueSpan.column);

        assertEquals("\uD83E\uDD52\uD83E\uDD52\uD83E\uDD52", emojiSpan.text);
        assertEquals(32, emojiSpan.column);

        assertEquals("green", greenSpan.text);
        assertEquals(42, greenSpan.column);
    }

    @Test
    public void finds_escaped_table_cells() {
        GherkinLine gherkinLine = new GherkinLine("      | \\|æ\\\\n     | \\o\\no\\  | \\\\\\|a\\\\\\\\n | ø\\\\\\nø\\\\|");

        List<String> texts = gherkinLine.getTableCells().stream().map(span -> span.text).collect(Collectors.toList());
        assertEquals(asList("|æ\\n", "\\o\no\\", "\\|a\\\\n", "ø\\\nø\\"), texts);
    }

    @Test
    public void escapes_backslash() {
        GherkinLine gherkinLine = new GherkinLine("|\\\\o\\no\\||");
        List<String> texts = gherkinLine.getTableCells().stream().map(span -> span.text).collect(Collectors.toList());
        assertEquals(asList("\\o\no|"), texts);
    }

    @Test
    public void throws_on_illegal_escapes_backslash() {
        GherkinLine gherkinLine = new GherkinLine("|\\o\\no\\||");
        List<String> texts = gherkinLine.getTableCells().stream().map(span -> span.text).collect(Collectors.toList());
        assertEquals(asList("\\o\no|"), texts);
    }

    @Test
    public void correctly_trims_white_spaces_before_cell_content() {
        GherkinLine gherkinLine = new GherkinLine("|   \t spaces before|");
        List<String> texts = gherkinLine.getTableCells().stream().map(span -> span.text).collect(Collectors.toList());
        assertEquals(asList("spaces before"), texts);
    }

    @Test
    public void correctly_trims_white_spaces_after_cell_content() {
        GherkinLine gherkinLine = new GherkinLine("|spaces after   |");
        List<String> texts = gherkinLine.getTableCells().stream().map(span -> span.text).collect(Collectors.toList());
        assertEquals(asList("spaces after"), texts);
    }

    @Test
    public void correctly_trims_white_spaces_around_cell_content() {
        GherkinLine gherkinLine = new GherkinLine("|   \t spaces everywhere   \t|");
        List<String> texts = gherkinLine.getTableCells().stream().map(span -> span.text).collect(Collectors.toList());
        assertEquals(asList("spaces everywhere"), texts);
    }

    @Test
    public void does_not_drop_white_spaces_inside_a_cell() {
        GherkinLine gherkinLine = new GherkinLine("| foo()\n  bar\nbaz |");
        List<String> texts = gherkinLine.getTableCells().stream().map(span -> span.text).collect(Collectors.toList());
        assertEquals(asList("foo()\n  bar\nbaz"), texts);
    }
}
