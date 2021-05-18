package io.cucumber.createmeta;

import io.cucumber.messages.types.Ci;
import io.cucumber.messages.types.Git;
import io.cucumber.messages.types.Meta;
import io.cucumber.messages.JSON;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.HashMap;

import static io.cucumber.createmeta.CreateMeta.createMeta;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.matchesPattern;
import static org.junit.jupiter.api.Assertions.assertEquals;

class CreateMetaTest {
    @Test
    void it_provides_the_correct_tool_name() {
        Meta meta = createMeta("cucumber-jvm", "3.2.1", new HashMap<>());
        assertEquals("cucumber-jvm", meta.getImplementation().getName());
    }

    @Test
    void it_provides_the_correct_tool_version() {
        Meta meta = createMeta("cucumber-jvm", "3.2.1", new HashMap<>());
        assertEquals("3.2.1", meta.getImplementation().getVersion());
    }

    @Test
    void it_provides_the_correct_protocol_version() {
        Meta meta = createMeta("cucumber-jvm", "3.2.1", new HashMap<>());
        assertThat(meta.getProtocolVersion(), matchesPattern("\\d+\\.\\d+\\.\\d+(-SNAPSHOT)?"));
    }

    @Test
    void it_provides_the_correct_jvm_version_and_name() {
        Meta meta = createMeta("cucumber-jvm", "3.2.1", new HashMap<>());
        assertThat(meta.getRuntime().getName(), matchesPattern("(OpenJDK).*"));
    }

    @Test
    void it_detects_github_actions() throws IOException {
        HashMap<String, String> env = new HashMap<String, String>() {{
            put("GITHUB_SERVER_URL", "https://github.company.com");
            put("GITHUB_REPOSITORY", "cucumber/cucumber-ruby");
            put("GITHUB_RUN_ID", "140170388");
            put("GITHUB_SHA", "the-revision");
            put("GITHUB_REF", "refs/tags/the-tag");
        }};
        Meta meta = createMeta("cucumber-jvm", "3.2.1", env);
        System.out.println("JSON.toJSON(meta.getCi()) = " + JSON.toJSON(meta.getCi()));

        assertEquals(new Ci(
                        "GitHub Actions",
                        "https://github.company.com/cucumber/cucumber-ruby/actions/runs/140170388",
                        new Git(
                                "https://github.company.com/cucumber/cucumber-ruby.git",
                                "the-revision",
                                null,
                                "the-tag"
                        )
                ),
                meta.getCi());
    }

    @Test
    void it_detects_go_cd() throws IOException {
        // https://github.com/gocd/gocd/blob/3e948218bfb163c5c3d2bf5140cb4a12f110769e/server/src/main/webapp/WEB-INF/rails/config/routes.rb#L55
        HashMap<String, String> env = new HashMap<String, String>() {{
            put("GO_SERVER_URL", "https://mygocd.com");
            put("GO_PIPELINE_NAME", "my-pipeline");
            put("GO_PIPELINE_COUNTER", "1234");
            put("GO_STAGE_NAME", "my-stage");
            put("GO_STAGE_COUNTER", "456");
            put("GO_REVISION", "the-revision");
            // https://github.com/ashwanthkumar/gocd-build-github-pull-requests
            put("GO_SCM_MY_MATERIAL_PR_BRANCH", "ashwankthkumar:feature-1");
            put("GO_SCM_MY_MATERIAL_PR_URL", "https://github.com/owner/repo/pull/1669");
        }};
        Meta meta = createMeta("cucumber-jvm", "3.2.1", env);

        assertEquals(new Ci(
                        "GoCD",
                        "https://mygocd.com/pipelines/my-pipeline/1234/my-stage/456",
                        new Git(
                                "https://github.com/owner/repo.git",
                                "the-revision",
                                "feature-1",
                                null
                        )
                ),
                meta.getCi(),
                "The Git JSON was:\n" + JSON.toJSON(meta.getCi()));
    }
}
