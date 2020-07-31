package io.cucumber.messages;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.assertThat;

class ProtocolVersionTest {

    @Test
    void should_have_a_resource_bundle_version() {
        String version = ProtocolVersion.getVersion().get();
        assertThat(version, Matchers.matchesPattern("\\d+\\.\\d+\\.\\d+(-SNAPSHOT)?"));
    }

}
