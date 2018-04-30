package io.cucumber.config;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Builds a map from another map, such as environment variables or system properties.
 */
class StringMapBuilder implements MapBuilder {
    private final String prefix;
    private final Map<?, ?> map;

    StringMapBuilder(String prefix, Map<?, ?> map) {
        this.prefix = prefix;
        this.map = map;
    }

    @Override
    public Map<String, ?> buildMap() {
        Map<String, Object> result = new HashMap<>();
        Pattern pattern = Pattern.compile("^" + prefix + "(.*)", Pattern.CASE_INSENSITIVE);
        for (Map.Entry<?, ?> entry : map.entrySet()) {
            if (entry.getKey() instanceof String) {
                String key = (String) entry.getKey();
                Matcher matcher = pattern.matcher(key);
                if (matcher.matches()) {
                    String keyWithoutPrefix = matcher.group(1);
                    result.put(keyWithoutPrefix, entry.getValue());
                }
            }
        }
        return result;
    }
}
