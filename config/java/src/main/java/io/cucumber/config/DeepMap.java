package io.cucumber.config;

import java.util.Map;

class DeepMap {
    /**
     * Gets a {@link Map} deep inside another {@link Map}
     *
     * @param keys the path to the map to get
     * @param map  the Map to get from
     * @return a nested Map
     */
    static Map<String, ?> getMap(String[] keys, Map<String, ?> map) {
        for (String key : keys) {
            map = (Map<String, ?>) map.get(key);
        }
        return map;
    }
}
