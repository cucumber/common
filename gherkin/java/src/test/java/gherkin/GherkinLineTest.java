package gherkin;

import org.junit.Test;

import java.util.List;

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

}
