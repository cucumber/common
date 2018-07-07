package io.cucumber.gherkin;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Locale;
import java.util.Map;

/**
 * Resolves a file pattern to a platform-specific executable file. The pattern can use the following tokens to refer to
 * platform-specific names:
 *
 * <ul>
 * <li><pre>{{.OS}}</pre> - Operating system</li>
 * <li><pre>{{.Arch}}</pre> - Processor architecture</li>
 * <li><pre>{{.Ext}}</pre> - Executable file extension</li>
 * </ul>
 * These values will be replaced with values corresponding to the names
 * <a href="https://gist.github.com/asukakenji/f15ba7e588ac42795f421b48b8aede63">Go's cross-compiler</a> uses for its
 * output.
 */
class ExeFile {
    private final Map<Object, Object> props;
    private final String fileName;
    private final File exeFile;

    ExeFile(String fileNamePattern) {
        this(fileNamePattern, System.getProperties());
    }

    ExeFile(String executablePattern, Map<Object, Object> props) {
        this.props = props;
        this.fileName = executablePattern
                .replace("{{.OS}}", getOs())
                .replace("{{.Arch}}", getArch())
                .replace("{{.Ext}}", getExt());
        try {
            exeFile = File.createTempFile(fileName, "");
            exeFile.deleteOnExit();
        } catch (Exception ioe) {
            throw new GherkinException("Couldn't extract " + fileName, ioe);
        }
    }

    private String getExt() {
        return "windows".equals(getOs()) ? ".exe" : "";
    }

    /**
     * Extracts the executable file. The file is made executable, and will be deleted when the VM exits.
     */
    void extract() {
        try {
            InputStream is = getInputStream();

            try (FileOutputStream os = new FileOutputStream(exeFile)) {
                IO.copy(is, os);
                is.close();
            }
            if (!exeFile.setExecutable(true)) {
                throw new GherkinException(String.format("Unable to make %s executable", exeFile.getAbsolutePath()));
            }
            exeFile.setLastModified(System.currentTimeMillis());
        } catch (IOException | SecurityException e) {
            throw new GherkinException("Couldn't resolve " + exeFile.getAbsolutePath(), e);
        }
    }

    private InputStream getInputStream() throws IOException {
        File file = new File("./gherkin-go/" + fileName);
        if (file.isFile()) return new FileInputStream(file);

        InputStream is = getClass().getResourceAsStream("/gherkin-go/" + fileName);
        if (is != null) return is;

        throw new GherkinException(String.format("No gherkin executable for %s. Please submit an issue to https://github.com/cucumber/cucumber/issues", fileName));
    }

    private String getOs() {
        return normalizeOs((String) props.get("os.name"));
    }

    private String getArch() {
        return normalizeArch((String) props.get("os.arch"));
    }

    private static String normalize(String value) {
        if (value == null) {
            return "";
        }
        return value.toLowerCase(Locale.US).replaceAll("[^a-z0-9]+", "");
    }

    // https://github.com/trustin/os-maven-plugin/blob/master/src/main/java/kr/motd/maven/os/Detector.java
    // https://gist.github.com/asukakenji/f15ba7e588ac42795f421b48b8aede63
    private static String normalizeArch(String value) {
        value = normalize(value);
        if (value.matches("^(x8664|amd64|ia32e|em64t|x64)$")) {
            return "amd64";
        }
        if (value.matches("^(x8632|x86|i[3-6]86|ia32|x32)$")) {
            return "386";
        }
        if (value.matches("^(ia64w?|itanium64)$")) {
            return "itanium_64"; // TODO - not supported by https://github.com/mitchellh/gox ?
        }
        if ("ia64n".equals(value)) {
            return "itanium_32"; // TODO - not supported by https://github.com/mitchellh/gox ?
        }
        if (value.matches("^(sparc|sparc32)$")) {
            return "sparc_32"; // TODO - not supported by https://github.com/mitchellh/gox ?
        }
        if (value.matches("^(sparcv9|sparc64)$")) {
            return "sparc_64"; // TODO - not supported by https://github.com/mitchellh/gox ?
        }
        if (value.matches("^(arm|arm32)$")) {
            return "arm";
        }
        if ("aarch64".equals(value)) {
            return "aarch_64"; // TODO - not supported by https://github.com/mitchellh/gox ?
        }
        if (value.matches("^(mips|mips32)$")) {
            return "mips";
        }
        if (value.matches("^(mipsel|mips32el)$")) { // TODO - Is this a typo? Should it be mipsle|mips32le ?
            return "mipsle";
        }
        if ("mips64".equals(value)) {
            return "mips64";
        }
        if ("mips64el".equals(value)) { // TODO - Is this a typo? Should it be mips64le?
            return "mips64le";
        }
        if (value.matches("^(ppc|ppc32)$")) {
            return "ppc_32"; // TODO - not supported by https://github.com/mitchellh/gox ?
        }
        if (value.matches("^(ppcle|ppc32le)$")) {
            return "ppcle_32"; // TODO - not supported by https://github.com/mitchellh/gox ?
        }
        if ("ppc64".equals(value)) {
            return "ppc_64"; // TODO - not supported by https://github.com/mitchellh/gox ?
        }
        if ("ppc64le".equals(value)) {
            return "ppcle_64"; // TODO - not supported by https://github.com/mitchellh/gox ?
        }
        if ("s390".equals(value)) {
            return "s390_32"; // TODO - not supported by https://github.com/mitchellh/gox ?
        }
        if ("s390x".equals(value)) {
            return "s390x";
        }

        return "unknown";
    }

    private static String normalizeOs(String value) {
        value = normalize(value);
        if (value.startsWith("aix")) {
            return "aix"; // TODO - not supported by https://github.com/mitchellh/gox ?
        }
        if (value.startsWith("hpux")) {
            return "hpux"; // TODO - not supported by https://github.com/mitchellh/gox ?
        }
        if (value.startsWith("os400")) {
            // Avoid the names such as os4000
            if (value.length() <= 5 || !Character.isDigit(value.charAt(5))) {
                return "os400"; // TODO - not supported by https://github.com/mitchellh/gox ?
            }
        }
        if (value.startsWith("linux")) {
            return "linux";
        }
        if (value.startsWith("macosx") || value.startsWith("osx")) {
            return "darwin";
        }
        if (value.startsWith("freebsd")) {
            return "freebsd";
        }
        if (value.startsWith("openbsd")) {
            return "openbsd";
        }
        if (value.startsWith("netbsd")) {
            return "netbsd";
        }
        if (value.startsWith("solaris") || value.startsWith("sunos")) {
            return "sunos";
        }
        if (value.startsWith("windows")) {
            return "windows";
        }

        return "unknown";
    }

    String getFileName() {
        return fileName;
    }

    File getFile() {
        return exeFile;
    }
}
