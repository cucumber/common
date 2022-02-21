package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class Git {
    private final String remote;
    private final String revision;
    private final String branch;
    private final String tag;

    public Git(
        String remote,
        String revision,
        String branch,
        String tag
    ) {
        this.remote = requireNonNull(remote, "Git.remote cannot be null");
        this.revision = requireNonNull(revision, "Git.revision cannot be null");
        this.branch = branch;
        this.tag = tag;
    }

    public String getRemote() {
        return remote;
    }

    public String getRevision() {
        return revision;
    }

    public Optional<String> getBranch() {
        return Optional.ofNullable(branch);
    }

    public Optional<String> getTag() {
        return Optional.ofNullable(tag);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Git that = (Git) o;
        return 
            remote.equals(that.remote) &&         
            revision.equals(that.revision) &&         
            Objects.equals(branch, that.branch) &&         
            Objects.equals(tag, that.tag);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            remote,
            revision,
            branch,
            tag
        );
    }

    @Override
    public String toString() {
        return "Git{" +
            "remote=" + remote +
            ", revision=" + revision +
            ", branch=" + branch +
            ", tag=" + tag +
            '}';
    }
}
