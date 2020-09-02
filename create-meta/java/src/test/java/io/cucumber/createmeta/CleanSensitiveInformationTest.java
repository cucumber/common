package io.cucumber.createmeta;

import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.matchesPattern;
import static org.junit.jupiter.api.Assertions.assertEquals;

class CleanSensitiveInformationTest {
  @Test
  void leaves_the_data_intact_when_no_sensitive_information_is_detected() {
    assertEquals("pretty safe", CreateMeta.cleanSensitiveInformation("pretty safe"));
  }

  @Test
  void with_URLS_leaves_intact_when_no_password_is_found() {
    assertEquals("https://example.com/git/repo.git", CreateMeta.cleanSensitiveInformation("https://example.com/git/repo.git"));
  }

  @Test
  void with_URLS_removes_credentials_when_found() {
    assertEquals("http://example.com/git/repo.git", CreateMeta.cleanSensitiveInformation("http://login@example.com/git/repo.git"));
  }

  @Test
  void with_URLS_removes_credentials_and_passwords_when_found() {
    assertEquals("ssh://example.com/git/repo.git", CreateMeta.cleanSensitiveInformation("ssh://login:password@example.com/git/repo.git"));
  }
}