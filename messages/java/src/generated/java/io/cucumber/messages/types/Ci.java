package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class Ci {
    private final String name;
    private final String url;
    private final String buildNumber;
    private final Git git;

    public Ci(
        String name,
        String url,
        String buildNumber,
        Git git
    ) {
        this.name = requireNonNull(name, "Ci.name cannot be null");
        this.url = url;
        this.buildNumber = buildNumber;
        this.git = git;
    }

    public String getName() {
        return name;
    }

    public Optional<String> getUrl() {
        return Optional.ofNullable(url);
    }

    public Optional<String> getBuildNumber() {
        return Optional.ofNullable(buildNumber);
    }

    public Optional<Git> getGit() {
        return Optional.ofNullable(git);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ci that = (Ci) o;
        return 
            name.equals(that.name) &&         
            Objects.equals(url, that.url) &&         
            Objects.equals(buildNumber, that.buildNumber) &&         
            Objects.equals(git, that.git);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            name,
            url,
            buildNumber,
            git
        );
    }

    @Override
    public String toString() {
        return "Ci{" +
            "name=" + name +
            ", url=" + url +
            ", buildNumber=" + buildNumber +
            ", git=" + git +
            '}';
    }
}
