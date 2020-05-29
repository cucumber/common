package io.cucumber.gherkin;

import org.junit.Test;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;

public class GherkinLineTest {

    private final int line = 12;

    @Test
    public void finds_tags() {
        GherkinLine gherkinLine = new GherkinLine("@this @is @a @tag", line);
        List<GherkinLineSpan> gherkinLineSpans = gherkinLine.getTags();

        assertEquals(asList(
                new GherkinLineSpan(1, "@this"),
                new GherkinLineSpan(7, "@is"),
                new GherkinLineSpan(11, "@a"),
                new GherkinLineSpan(14, "@tag")
        ), gherkinLineSpans);
    }

    @Test
    public void throws_on_tags_with_spaces() {
        GherkinLine gherkinLine = new GherkinLine("@this @is @a space separated @tag", line);
        assertThrows(ParserException.class, gherkinLine::getTags);
    }

    @Test
    public void throws_on_tags_with_leading_spaces() {
        GherkinLine gherkinLine = new GherkinLine("@ leadingSpace", line);
        assertThrows(ParserException.class, gherkinLine::getTags);
    }

    @Test
    public void ignores_empty_tag() {
        GherkinLine gherkinLine = new GherkinLine("@", line);
        List<GherkinLineSpan> gherkinLineSpans = gherkinLine.getTags();

        assertEquals(Collections.emptyList(), gherkinLineSpans);
    }

    @Test
    public void ignores_empty_tags() {
        GherkinLine gherkinLine = new GherkinLine("@@", line);
        List<GherkinLineSpan> gherkinLineSpans = gherkinLine.getTags();

        assertEquals(Collections.emptyList(), gherkinLineSpans);
    }

    @Test
    public void finds_tags__trim_whitespace() {
        GherkinLine gherkinLine = new GherkinLine("    @this @is  @a @tag  ", line);
        List<GherkinLineSpan> gherkinLineSpans = gherkinLine.getTags();

        assertEquals(asList(
                new GherkinLineSpan(5, "@this"),
                new GherkinLineSpan(11, "@is"),
                new GherkinLineSpan(16, "@a"),
                new GherkinLineSpan(19, "@tag")
        ), gherkinLineSpans);
    }

    @Test
    public void finds_tags__comment_inside_tag() {
        GherkinLine gherkinLine = new GherkinLine("@this @is #acomment  ", line);
        List<GherkinLineSpan> gherkinLineSpans = gherkinLine.getTags();

        assertEquals(asList(
                new GherkinLineSpan(1, "@this"),
                new GherkinLineSpan(7, "@is")
        ), gherkinLineSpans);
    }

    @Test
    public void finds_tags__commented_before_tag() {
        GherkinLine gherkinLine = new GherkinLine("@this @is #@a commented tag", line);
        List<GherkinLineSpan> gherkinLineSpans = gherkinLine.getTags();

        assertEquals(asList(
                new GherkinLineSpan(1, "@this"),
                new GherkinLineSpan(7, "@is")
        ), gherkinLineSpans);
    }

    @Test
    public void finds_tags__commented_multiple_tags() {
        GherkinLine gherkinLine = new GherkinLine("@this @is #@a @commented @sequence of tags", line);
        List<GherkinLineSpan> gherkinLineSpans = gherkinLine.getTags();

        assertEquals(asList(
                new GherkinLineSpan(1, "@this"),
                new GherkinLineSpan(7, "@is")
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
        GherkinLine gherkinLine = new GherkinLine("      |  \tred  \t|  \tblue  \t|  \t\uD83E\uDD52\uD83E\uDD52\uD83E\uDD52  \t|  \tgreen  \t|", line);
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
        GherkinLine gherkinLine = new GherkinLine("      | \\|æ\\\\n     | \\o\\no\\  | \\\\\\|a\\\\\\\\n | ø\\\\\\nø\\\\|", line);

        List<String> texts = gherkinLine.getTableCells().stream().map(span -> span.text).collect(Collectors.toList());
        assertEquals(asList("|æ\\n", "\\o\no\\", "\\|a\\\\n", "ø\\\nø\\"), texts);
    }

    @Test
    public void preserve_escaped_new_lines_at_start_and_end() {
        GherkinLine gherkinLine = new GherkinLine("      |  \nraindrops--\nher last kiss\ngoodbye.\n  |", line);
        List<String> texts = gherkinLine.getTableCells().stream().map(span -> span.text).collect(Collectors.toList());
        assertEquals(asList("" +
                "\n" +
                "raindrops--\n" +
                "her last kiss\n" +
                "goodbye.\n"
        ), texts);
    }

    @Test
    public void escapes_backslash() {
        GherkinLine gherkinLine = new GherkinLine("|\\\\o\\no\\||", line);
        List<String> texts = gherkinLine.getTableCells().stream().map(span -> span.text).collect(Collectors.toList());
        assertEquals(asList("\\o\no|"), texts);
    }

    @Test
    public void throws_on_illegal_escapes_backslash() {
        GherkinLine gherkinLine = new GherkinLine("|\\o\\no\\||", line);
        List<String> texts = gherkinLine.getTableCells().stream().map(span -> span.text).collect(Collectors.toList());
        assertEquals(asList("\\o\no|"), texts);
    }

    @Test
    public void correctly_trims_white_spaces_before_cell_content() {
        GherkinLine gherkinLine = new GherkinLine("|   \t spaces before|", line);
        List<String> texts = gherkinLine.getTableCells().stream().map(span -> span.text).collect(Collectors.toList());
        assertEquals(asList("spaces before"), texts);
    }

    @Test
    public void correctly_trims_white_spaces_after_cell_content() {
        GherkinLine gherkinLine = new GherkinLine("|spaces after   |", line);
        List<String> texts = gherkinLine.getTableCells().stream().map(span -> span.text).collect(Collectors.toList());
        assertEquals(asList("spaces after"), texts);
    }

    @Test
    public void correctly_trims_white_spaces_around_cell_content() {
        GherkinLine gherkinLine = new GherkinLine("|   \t spaces everywhere   \t|", line);
        List<String> texts = gherkinLine.getTableCells().stream().map(span -> span.text).collect(Collectors.toList());
        assertEquals(asList("spaces everywhere"), texts);
    }

    @Test
    public void does_not_drop_white_spaces_inside_a_cell() {
        GherkinLine gherkinLine = new GherkinLine("| foo()\n  bar\nbaz |", line);
        List<String> texts = gherkinLine.getTableCells().stream().map(span -> span.text).collect(Collectors.toList());
        assertEquals(asList("foo()\n  bar\nbaz"), texts);
    }
}
