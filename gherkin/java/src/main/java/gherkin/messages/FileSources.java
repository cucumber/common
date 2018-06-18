package gherkin.messages;

import cucumber.messages.Sources;
import cucumber.messages.Sources.Source;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Iterator;
import java.util.List;

/**
 * Iterates over {@link Source} messages from the file system.
 */
public class FileSources implements Iterable<Source> {
    private final List<String> paths;

    public FileSources(List<String> paths) {
        this.paths = paths;
    }

    @Override
    public Iterator<Source> iterator() {
        final Iterator<String> pathIterator = paths.iterator();

        return new Iterator<Source>() {
            @Override
            public boolean hasNext() {
                return pathIterator.hasNext();
            }

            @Override
            public Source next() {
                try {
                    String path = pathIterator.next();
                    String data = read(new InputStreamReader(new FileInputStream(path), "UTF-8"));
                    return Source.newBuilder()
                            .setData(data)
                            .setUri(path)
                            .setMedia(
                                    Sources.Media.newBuilder()
                                            .setContentType("text/x.cucumber.gherkin+plain")
                                            .setEncoding("UTF-8")
                            )
                            .build();
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
