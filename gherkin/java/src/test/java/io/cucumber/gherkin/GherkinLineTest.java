package io.cucumber.gherkin;

import org.junit.Test;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;

public class GherkinLineTest {

    private final Location location = new Location(-1, 12);

    @Test
    public void finds_tags() {
        GherkinLine gherkinLine = new GherkinLine("@this @is @a @tag", location);
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
        GherkinLine gherkinLine = new GherkinLine("@this @is @a space separated @tag", location);
        assertThrows(ParserException.class, gherkinLine::getTags);
    }

    @Test
    public void throws_on_tags_with_leading_spaces() {
        GherkinLine gherkinLine = new GherkinLine("@ leadingSpace", location);
        assertThrows(ParserException.class, gherkinLine::getTags);
    }

    @Test
    public void ignores_empty_tag() {
        GherkinLine gherkinLine = new GherkinLine("@", location);
        List<GherkinLineSpan> gherkinLineSpans = gherkinLine.getTags();

        assertEquals(Collections.emptyList(), gherkinLineSpans);
    }

    @Test
    public void ignores_empty_tags() {
        GherkinLine gherkinLine = new GherkinLine("@@", location);
        List<GherkinLineSpan> gherkinLineSpans = gherkinLine.getTags();

        assertEquals(Collections.emptyList(), gherkinLineSpans);
    }

    @Test
    public void finds_tags__trim_whitespace() {
        GherkinLine gherkinLine = new GherkinLine("    @this @is  @a @tag  ", location);
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
        GherkinLine gherkinLine = new GherkinLine("@this @is #acomment  ", location);
        List<GherkinLineSpan> gherkinLineSpans = gherkinLine.getTags();

        assertEquals(asList(
                new GherkinLineSpan(1, "@this"),
                new GherkinLineSpan(7, "@is")
        ), gherkinLineSpans);
    }

    @Test
    public void finds_tags__commented_before_tag() {
        GherkinLine gherkinLine = new GherkinLine("@this @is #@a commented tag", location);
        List<GherkinLineSpan> gherkinLineSpans = gherkinLine.getTags();

        assertEquals(asList(
                new GherkinLineSpan(1, "@this"),
                new GherkinLineSpan(7, "@is")
        ), gherkinLineSpans);
    }

    @Test
    public void finds_tags__commented_multiple_tags() {
        GherkinLine gherkinLine = new GherkinLine("@this @is #@a @commented @sequence of tags", location);
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
        GherkinLine gherkinLine = new GherkinLine("      |  \tred  \t|  \tblue  \t|  \t\uD83E\uDD52\uD83E\uDD52\uD83E\uDD52  \t|  \tgreen  \t|", location);
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
        GherkinLine gherkinLine = new GherkinLine("      | \\|æ\\\\n     | \\o\\no\\  | \\\\\\|a\\\\\\\\n | ø\\\\\\nø\\\\|", location);

        List<String> texts = gherkinLine.getTableCells().stream().map(span -> span.text).collect(Collectors.toList());
        assertEquals(asList("|æ\\n", "\\o\no\\", "\\|a\\\\n", "ø\\\nø\\"), texts);
    }

    @Test
    public void escapes_backslash() {
        GherkinLine gherkinLine = new GherkinLine("|\\\\o\\no\\||", location);
        List<String> texts = gherkinLine.getTableCells().stream().map(span -> span.text).collect(Collectors.toList());
        assertEquals(asList("\\o\no|"), texts);
    }

    @Test
    public void throws_on_illegal_escapes_backslash() {
        GherkinLine gherkinLine = new GherkinLine("|\\o\\no\\||", location);
        List<String> texts = gherkinLine.getTableCells().stream().map(span -> span.text).collect(Collectors.toList());
        assertEquals(asList("\\o\no|"), texts);
    }
}
