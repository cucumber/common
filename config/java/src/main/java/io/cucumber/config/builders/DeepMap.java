package io.cucumber.config.builders;

import java.util.Map;

class DeepMap {
    static Map<String, ?> getMap(String[] keys, Map<String, ?> map) {
        for (String key : keys) {
            map = (Map<String, ?>) map.get(key);
        }
        return map;
    }
}
