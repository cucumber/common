package gherkin.events;

import org.junit.Test;

import java.util.List;

import static org.junit.Assert.assertEquals;

public class EventsTest {
    @Test
    public void generates_events() {
        String data = "Feature: Hello\n  Scenario: World\n    Given hello";
        String uri = "features/hello.feature";
        List<CucumberEvent> events = Events.generate(data, uri);
        assertEquals(SourceEvent.class, events.get(0).getClass());
        assertEquals(GherkinDocumentEvent.class, events.get(1).getClass());
        assertEquals(PickleEvent.class, events.get(2).getClass());
    }
}
