package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class Meta {
    private final String protocolVersion;
    private final Product implementation;
    private final Product runtime;
    private final Product os;
    private final Product cpu;
    private final Ci ci;

    public Meta(
        String protocolVersion,
        Product implementation,
        Product runtime,
        Product os,
        Product cpu,
        Ci ci
    ) {
        this.protocolVersion = requireNonNull(protocolVersion, "Meta.protocolVersion cannot be null");
        this.implementation = requireNonNull(implementation, "Meta.implementation cannot be null");
        this.runtime = requireNonNull(runtime, "Meta.runtime cannot be null");
        this.os = requireNonNull(os, "Meta.os cannot be null");
        this.cpu = requireNonNull(cpu, "Meta.cpu cannot be null");
        this.ci = ci;
    }

    public String getProtocolVersion() {
        return protocolVersion;
    }

    public Product getImplementation() {
        return implementation;
    }

    public Product getRuntime() {
        return runtime;
    }

    public Product getOs() {
        return os;
    }

    public Product getCpu() {
        return cpu;
    }

    public Optional<Ci> getCi() {
        return Optional.ofNullable(ci);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Meta that = (Meta) o;
        return 
            protocolVersion.equals(that.protocolVersion) &&         
            implementation.equals(that.implementation) &&         
            runtime.equals(that.runtime) &&         
            os.equals(that.os) &&         
            cpu.equals(that.cpu) &&         
            Objects.equals(ci, that.ci);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            protocolVersion,
            implementation,
            runtime,
            os,
            cpu,
            ci
        );
    }

    @Override
    public String toString() {
        return "Meta{" +
            "protocolVersion=" + protocolVersion +
            ", implementation=" + implementation +
            ", runtime=" + runtime +
            ", os=" + os +
            ", cpu=" + cpu +
            ", ci=" + ci +
            '}';
    }
}
