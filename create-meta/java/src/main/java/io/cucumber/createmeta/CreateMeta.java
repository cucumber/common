package io.cucumber.createmeta;

import com.eclipsesource.json.Json;
import com.eclipsesource.json.JsonObject;
import io.cucumber.messages.Messages;
import io.cucumber.messages.ProtocolVersion;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.nio.charset.StandardCharsets.UTF_8;

public class CreateMeta {
    private static final JsonObject CI_DICT;
    private static final String JSON_PATH = "/io/cucumber/createmeta/ciDict.json";

    static {
        try (Reader reader = new InputStreamReader(CreateMeta.class.getResourceAsStream(JSON_PATH), UTF_8)) {
            CI_DICT = Json.parse(reader).asObject();
        } catch (IOException e) {
            throw new RuntimeException("Unable to parse " + JSON_PATH, e);
        }
    }

    public static Messages.Meta createMeta(
            String toolName,
            String toolVersion,
            Map<String, String> env
    ) {
        Messages.Meta.Builder metaBuilder = Messages.Meta.newBuilder()
                .setRuntime(Messages.Meta.Product.newBuilder()
                        .setName(System.getProperty("java.vm.name"))
                        .setVersion(System.getProperty("java.vm.version")))
                .setImplementation(Messages.Meta.Product.newBuilder()
                        .setName(toolName)
                        .setVersion(toolVersion))
                .setOs(Messages.Meta.Product.newBuilder()
                        .setName(System.getProperty("os.name")))
                .setCpu(Messages.Meta.Product.newBuilder()
                        .setName(System.getProperty("os.arch")));

        ProtocolVersion.getVersion()
                .ifPresent(metaBuilder::setProtocolVersion);

        Messages.Meta.CI ci = detectCI(env);
        if (ci != null) {
            metaBuilder.setCi(ci);
        }

        return metaBuilder
                .build();
    }

    public static String cleanSensitiveInformation(String value) {
        if (value == null) return null;
        try {
            URI uri = URI.create(value);
            return new URI(uri.getScheme(), null, uri.getHost(), uri.getPort(), uri.getPath(), uri.getQuery(), uri.getFragment()).toASCIIString();
        } catch (URISyntaxException | IllegalArgumentException e) {
            return value;
        }
    }

    static Messages.Meta.CI detectCI(Map<String, String> env) {
        List<Messages.Meta.CI> detected = new ArrayList<>();
        for (JsonObject.Member envEntry : CI_DICT) {
            Messages.Meta.CI ci = createCi(envEntry.getName(), envEntry.getValue().asObject(), env);
            if (ci != null) {
                detected.add(ci);
            }
        }
        return detected.size() == 1 ? detected.get(0) : null;
    }

    private static Messages.Meta.CI createCi(String name, JsonObject ciSystem, Map<String, String> env) {
        String url = evaluate(ciSystem.getString("url", null), env);
        if (url == null) return null;
        JsonObject git = ciSystem.get("git").asObject();
        String remote = cleanSensitiveInformation(evaluate(git.getString("remote", null), env));
        String revision = evaluate(git.getString("revision", null), env);
        String branch = evaluate(git.getString("branch", null), env);
        String tag = evaluate(git.getString("tag", null), env);

        Messages.Meta.CI.Builder ciBuilder = Messages.Meta.CI.newBuilder()
                .setName(name)
                .setUrl(url);
        Messages.Meta.CI.Git.Builder gitBuilder = Messages.Meta.CI.Git.newBuilder();
        if (remote != null) gitBuilder.setRemote(remote);
        if (revision != null) gitBuilder.setRevision(revision);
        if (branch != null) gitBuilder.setBranch(branch);
        if (tag != null) gitBuilder.setTag(tag);
        return ciBuilder.setGit(gitBuilder).build();
    }

    private static String evaluate(String template, Map<String, String> env) {
        if (template == null) return null;
        try {
            Pattern pattern = Pattern.compile("\\$\\{((refbranch|reftag)\\s+)?([^\\s}]+)(\\s+\\|\\s+([^}]+))?}");
            Matcher matcher = pattern.matcher(template);
            StringBuffer sb = new StringBuffer();
            while (matcher.find()) {
                String func = matcher.group(2);
                String variable = matcher.group(3);
                String defaultValue = matcher.group(5);
                String value = env.getOrDefault(variable, defaultValue);
                if (value == null) {
                    throw new RuntimeException(String.format("Undefined variable: %s", variable));
                }
                if (func != null) {
                    switch (func) {
                        case "refbranch":
                            value = group1(value, Pattern.compile("^refs/heads/(.*)"));
                            break;
                        case "reftag":
                            value = group1(value, Pattern.compile("^refs/tags/(.*)"));
                            break;
                    }
                }
                if (value == null) {
                    throw new RuntimeException(String.format("Undefined variable: %s", variable));
                }
                matcher.appendReplacement(sb, value);
            }
            matcher.appendTail(sb);
            return sb.toString();
        } catch (RuntimeException e) {
            return null;
        }
    }

    private static String group1(String value, Pattern pattern) {
        Matcher matcher = pattern.matcher(value);
        if (matcher.find()) {
            String g1 = matcher.group(1);
            return g1;
        }
        return matcher.find() ? matcher.group(1) : null;
    }
}
