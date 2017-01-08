package gherkin.events;

import gherkin.pickles.Pickle;

public class PickleEvent implements CucumberEvent {
    private final String type = "pickle";
    public final String uri;
    public final Pickle pickle;

    public PickleEvent(String uri, Pickle pickle) {
        this.uri = uri;
        this.pickle = pickle;
    }
}
