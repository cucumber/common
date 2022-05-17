package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class JavaMethod {
    private final String className;
    private final String methodName;
    private final java.util.List<String> methodParameterTypes;

    public JavaMethod(
        String className,
        String methodName,
        java.util.List<String> methodParameterTypes
    ) {
        this.className = requireNonNull(className, "JavaMethod.className cannot be null");
        this.methodName = requireNonNull(methodName, "JavaMethod.methodName cannot be null");
        this.methodParameterTypes = unmodifiableList(new ArrayList<>(requireNonNull(methodParameterTypes, "JavaMethod.methodParameterTypes cannot be null")));
    }

    public String getClassName() {
        return className;
    }

    public String getMethodName() {
        return methodName;
    }

    public java.util.List<String> getMethodParameterTypes() {
        return methodParameterTypes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        JavaMethod that = (JavaMethod) o;
        return 
            className.equals(that.className) &&         
            methodName.equals(that.methodName) &&         
            methodParameterTypes.equals(that.methodParameterTypes);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            className,
            methodName,
            methodParameterTypes
        );
    }

    @Override
    public String toString() {
        return "JavaMethod{" +
            "className=" + className +
            ", methodName=" + methodName +
            ", methodParameterTypes=" + methodParameterTypes +
            '}';
    }
}
