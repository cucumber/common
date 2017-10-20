package gherkin.events;

public class AttachmentEvent implements CucumberEvent {
    private final String type = "attachment";
    private final SourceRef source;
    private final String data;
    private final Media media = new Media();

    public AttachmentEvent(SourceRef source, String data) {
        this.source = source;
        this.data = data;
    }

    public static class SourceRef {
        private final String uri;
        private final Location start;

        public SourceRef(String uri, Location start) {
            this.uri = uri;
            this.start = start;
        }
    }

    public static class Location {
        private final int line;
        private final int column;

        public Location(int line, int column) {
            this.line = line;
            this.column = column;
        }
    }

    public static class Media {
        private final String encoding = "utf-8";
        private final String type = "text/x.cucumber.stacktrace+plain";
    }
}
