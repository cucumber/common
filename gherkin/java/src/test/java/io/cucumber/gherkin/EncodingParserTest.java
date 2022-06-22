package io.cucumber.gherkin;

import io.cucumber.core.resource.Resource;
import org.junit.jupiter.api.Test;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;

import static org.junit.jupiter.api.Assertions.assertFalse;

class EncodingParserTest {

    private final EncodingParser parser = new EncodingParser();

    @Test
    void test_utf8_bom_encode() throws RuntimeException, IOException {
        Resource resource = resource("src/test/resources/io/cucumber/core/feature/UTF_8_BOM_Encoded.feature");
        assertFalse(parser.parse(resource).startsWith("\uFEFF"), "UTF-8 BOM encoding not removed.");
    }

    @Test
    void test_utf8_encode() throws RuntimeException, IOException {
        Resource resource = resource("src/test/resources/io/cucumber/core/feature/UTF_8_Encoded.feature");
        assertFalse(parser.parse(resource).startsWith("\uFEFF"), "UTF-8 BOM encoding should not be present.");
    }

    private Resource resource(String name) {
        Resource resource = new Resource() {
            @Override
            public URI getUri() {
                return null;
            }

            @Override
            public InputStream getInputStream() throws IOException {

                return new FileInputStream(name);
            }
        };
        return resource;
    }
}
