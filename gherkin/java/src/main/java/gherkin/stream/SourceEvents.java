package gherkin.stream;

import gherkin.events.SourceEvent;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Iterator;
import java.util.List;

public class SourceEvents implements Iterable<SourceEvent> {
    private final List<String> paths;

    public SourceEvents(List<String> paths) {
        this.paths = paths;
    }

    @Override
    public Iterator<SourceEvent> iterator() {
        final Iterator<String> pathIterator = paths.iterator();

        return new Iterator<SourceEvent>() {
            @Override
            public boolean hasNext() {
                return pathIterator.hasNext();
            }

            @Override
            public SourceEvent next() {
                try {
                    String path = pathIterator.next();
                    String data = read(new InputStreamReader(new FileInputStream(path), "UTF-8"));
                    return new SourceEvent(path, data);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            @Override
            public void remove() {
                throw new UnsupportedOperationException();
            }
        };
    }

    private static String read(Reader reader) throws IOException {
        final char[] buffer = new char[0x10000];
        StringBuilder sb = new StringBuilder();
        int read;
        do {
            read = reader.read(buffer, 0, buffer.length);
            if (read > 0) {
                sb.append(buffer, 0, read);
            }
        } while (read >= 0);
        return sb.toString();
    }
}
