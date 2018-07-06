package io.cucumber.datatable;

import java.lang.reflect.Field;
import java.util.Map;

/**
 * {@link DefaultDataTableEntryTransformer} based on reflection.
 * <p>
 * For example:
 *
 * <pre>
 *  | firstName   | last name | age |
 *  | Annie M. G. | Schmidt   | 20  |
 *  </pre>
 * can be transformed to class:
 * <pre>
 *
 *          public class User {
 *
 *              String firstName;
 *              String lastName;
 *              int age;
 *
 *              public User() {
 *
 *              }
 *          }
 *
 *  </pre>
 */
public class SimpleDefaultDataTableEntryTransformer implements DefaultDataTableEntryTransformer {

	public interface InstanceCreator {

		<T> T createInstance(Class<T> type) throws Throwable;
	}

	public static class DefaultInstanceCreator implements InstanceCreator {

		@Override
		public <T> T createInstance(Class<T> type) throws Throwable {
			return type.newInstance();
		}
	}

	private CamelCaseStringConverter fieldNameConverter = new CamelCaseStringConverter();
	private InstanceCreator instanceCreator;

	public SimpleDefaultDataTableEntryTransformer(InstanceCreator instanceCreator) {
		this.instanceCreator = instanceCreator;
	}

	@Override
	public <T> T transform(Map<String, String> value, Class<T> type, TableCellByTypeTransformer cellTransformer) throws Throwable {

		T instance = instanceCreator.createInstance(type);
		Field[] fields = type.getDeclaredFields();
		for (Map.Entry<String, String> entry : value.entrySet()) {
			String key = entry.getKey();
			String cell = entry.getValue();
			for (Field field : fields) {
				if (fieldNameConverter.map(key).equals(field.getName())) {
					field.setAccessible(true);
					field.set(instance, cellTransformer.transform(cell, field.getType()));
					break;
				}
			}
		}
		return instance;
	}
}
