package io.cucumber.config;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

import static java.util.Arrays.asList;

class FieldSetter {
    private final Object o;

    FieldSetter(Object o) {
        this.o = o;
    }

    private static Integer toInteger(Object value) {
        value = single(value);
        if (value instanceof Number) {
            return ((Number) value).intValue();
        } else if (value instanceof String) {
            return Integer.valueOf((String) value);
        } else {
            throw new RuntimeException(String.format("Can't convert %s to Integer", value.getClass().getName()));
        }
    }

    private static Boolean toBoolean(Object value) {
        value = single(value);
        if (value instanceof Boolean) {
            return (Boolean) value;
        } else if (value instanceof String) {
            return Boolean.valueOf((String) value);
        } else {
            throw new RuntimeException(String.format("Can't convert %s to Boolean", value.getClass().getName()));
        }
    }

    private static Object single(Object value) {
        if (value instanceof List) {
            List list = (List) value;
            if (list.size() == 1) {
                return list.get(0);
            } else {
                throw new RuntimeException("Expected exactly 1, had " + list.size());
            }
        } else {
            return value;
        }
    }

    private static String toString(Object value) {
        value = single(value);
        if (value instanceof String) {
            return (String) value;
        } else {
            throw new RuntimeException(String.format("Can't convert %s to String", value.getClass().getName()));
        }
    }

    private static List toList(Object value) {
        if (value instanceof List) {
            return (List) value;
        } else if (value instanceof String) {
            return asList(((String) value).split(","));
        } else if (value instanceof String[]) {
            return asList((String[]) value);
        } else {
            throw new RuntimeException(String.format("Can't convert %s to List", value.getClass().getName()));
        }
    }

    void setFields(Map<String, ?> map) {
        for (Map.Entry<String, ?> entry : map.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            setField(key, value);
        }
    }

    private void setField(String key, Object value) {
        try {
            Field field = getField(key);

            Object fieldValue;
            if (field.getType().isAssignableFrom(String.class)) {
                fieldValue = toString(value);
            } else if (isBoolean(field)) {
                fieldValue = toBoolean(value);
            } else if (isInteger(field)) {
                fieldValue = toInteger(value);
            } else if (isList(field)) {
                fieldValue = toList(value);
            } else {
                throw new RuntimeException(String.format("Can't convert %s to %s", value.getClass().getName(), field.getType().getName()));
            }
            field.set(o, fieldValue);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }

    private boolean isList(Field field) {
        return field.getType().isAssignableFrom(List.class);
    }

    private boolean isInteger(Field field) {
        return field.getType().isAssignableFrom(Integer.class) || field.getType().isAssignableFrom(Integer.TYPE);
    }

    private boolean isBoolean(Field field) {
        return field.getType().isAssignableFrom(Boolean.class) || field.getType().isAssignableFrom(Boolean.TYPE);
    }

    private Field getField(String key) {
        String fieldName = key.toLowerCase().replaceAll("_", "");
        try {
            return o.getClass().getField(fieldName);
        } catch (NoSuchFieldException e) {
            throw new RuntimeException(e);
        }
    }

    boolean isBoolean(String key) {
        return isBoolean(getField(key));
    }
}
