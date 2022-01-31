package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class Product {
    private final String name;
    private final String version;

    public Product(
        String name,
        String version
    ) {
        this.name = requireNonNull(name, "Product.name cannot be null");
        this.version = version;
    }

    public String getName() {
        return name;
    }

    public Optional<String> getVersion() {
        return Optional.ofNullable(version);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product that = (Product) o;
        return 
            name.equals(that.name) &&         
            Objects.equals(version, that.version);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            name,
            version
        );
    }

    @Override
    public String toString() {
        return "Product{" +
            "name=" + name +
            ", version=" + version +
            '}';
    }
}
