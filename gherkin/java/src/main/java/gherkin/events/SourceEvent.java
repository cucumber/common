package gherkin.events;

public class SourceEvent implements CucumberEvent {
    private final String type = "source";
    public final String uri;
    public final String data;
    private final Media media = new Media();

    public SourceEvent(String uri, String data) {
        this.uri = uri;
        this.data = data;
    }

    public static class Media {
        private final String encoding = "utf-8";
        private final String type = "text/vnd.cucumber.gherkin+plain";
    }
}
