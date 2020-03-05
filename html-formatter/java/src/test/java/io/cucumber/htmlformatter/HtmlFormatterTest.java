package io.cucumber.htmlformatter;

import io.cucumber.messages.Messages;
import io.cucumber.messages.internal.com.google.protobuf.InvalidProtocolBufferException;
import io.cucumber.messages.internal.com.google.protobuf.util.JsonFormat;
import org.junit.jupiter.api.Test;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.junit.jupiter.api.Assertions.assertEquals;

class HtmlFormatterTest {

    @Test
    void it_writes_html_to_output() throws IOException {
        JsonFormat.Printer jsonPrinter = JsonFormat
                .printer()
                .omittingInsignificantWhitespace();

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(out, UTF_8));

        List<Messages.Envelope> messages = Arrays.asList(
                Messages.Envelope.newBuilder()
                        .setTestCaseStarted(Messages.TestCaseStarted.newBuilder()
                                .setId("random-id")
                                .build())
                        .build());

        String json = messages.stream()
                .map(message -> {
                    try {
                        return jsonPrinter.print(message);
                    } catch (InvalidProtocolBufferException e) {
                        throw new IllegalStateException(e);
                    }
                })
                .collect(Collectors.joining(",", "[", "]"));

        String css = getResourceAsString("cucumber-react.css");
        String js = getResourceAsString("cucumber-html.js");

        writer.write("<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "  <head>\n" +
                "    <title>Cucumber</title>\n" +
                "    <meta content=\"text/html;charset=utf-8\" http-equiv=\"Content-Type\">\n" +
                "    <style>\n" +
                css +
                "    </style>\n" +
                "  </head>\n" +
                "  <body>\n" +
                "    <div id=\"content\">\n" +
                "    </div>\n" +
                "    <script>\n" +
                "      window.CUCUMBER_MESSAGES = " + json + ";\n" +
                "    </script>\n" +
                "    <script>\n" +
                js +
                "    </script>\n" +
                "  </body>\n" +
                "</html>"
        );

        writer.flush();
        assertEquals("", new String(out.toByteArray(), UTF_8));
    }

    private String getResourceAsString(String name) {
        InputStream resourceAsStream = HtmlFormatterTest.class.getResourceAsStream(name);
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(resourceAsStream, UTF_8));
        return bufferedReader.lines().collect(Collectors.joining("\n", "", "\n"));
    }
}
