package io.cucumber.gherkin;

import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.Locale.ROOT;
import static java.util.regex.Pattern.CASE_INSENSITIVE;

/**
 * Parser for the {@code # encoding: <encoding> } pragma.
 */
class EncodingParser {
    private static final byte[] UTF_BOM_BYTES = "\uFEFF".getBytes(UTF_8);
    private static final Pattern COMMENT_OR_EMPTY_LINE_PATTERN = Pattern.compile("^\\s*#|^\\s*$");
    private static final Pattern ENCODING_PATTERN = Pattern.compile("^\\s*#\\s*encoding\\s*:\\s*([0-9a-zA-Z\\-]+)",
            CASE_INSENSITIVE);

    static String readWithEncodingFromSource(byte[] source) {
        byte[] bomFreeSource = removeByteOrderMarker(source);
        String presumedUtf8Source = new String(bomFreeSource, UTF_8);
        return parseEncodingPragma(presumedUtf8Source)
                .map(charset -> new String(bomFreeSource, charset))
                .orElse(presumedUtf8Source);
    }

    private static byte[] removeByteOrderMarker(byte[] source) {
        int utfBomBytesLength = UTF_BOM_BYTES.length;
        if (source.length < utfBomBytesLength) {
            return source;
        }
        for (int i = 0; i < utfBomBytesLength; i++) {
            if (source[i] != UTF_BOM_BYTES[i]) {
                return source;
            }
        }
        return Arrays.copyOfRange(source, utfBomBytesLength, source.length);
    }

    private static Optional<Charset> parseEncodingPragma(String source) {
        for (String line : source.split("[\\n\\r]")) {
            if (!COMMENT_OR_EMPTY_LINE_PATTERN.matcher(line).find()) {
                return Optional.empty();
            }
            Matcher matcher = ENCODING_PATTERN.matcher(line);
            if (matcher.find()) {
                String charSetName = matcher.group(1).toUpperCase(ROOT);
                Charset charset = Charset.forName(charSetName);
                return Optional.of(charset);
            }
        }
        return Optional.empty();
    }

}
