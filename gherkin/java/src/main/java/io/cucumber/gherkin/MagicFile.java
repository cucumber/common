package io.cucumber.gherkin;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLConnection;
import java.net.UnknownHostException;
import java.util.Locale;
import java.util.Map;

/**
 * A Magic File can be extracted from a Jar file or downloaded from the World Wide Web.
 */
public class MagicFile {
    private static boolean deleteOnExit;
    private final Map<Object, Object> props;
    private final String fileName;
    private final File targetFile;

    /**
     * @param fileNamePattern A string that contains <pre>{{.OS}}</pre> anb <pre>{{.Arch}}</pre>, which will be replaced
     *                        with platform-specific values
     */
    public MagicFile(String fileNamePattern) {
        this(fileNamePattern, System.getProperties());
    }

    MagicFile(String executablePattern, Map<Object, Object> props) {
        this.props = props;
        String formatPattern = executablePattern
                .replace("{{.OS}}", "%s")
                .replace("{{.Arch}}", "%s")
                .replace("{{.Ext}}", "%s");
        this.fileName = String.format(formatPattern, getOs(), getArch(), getExt());
        File codeFile = new File(getClass().getProtectionDomain().getCodeSource().getLocation().getFile());
        File targetDir = codeFile.isDirectory() ? codeFile : codeFile.getParentFile();
        targetFile = new File(targetDir, new File(fileName).getName());
    }

    private String getExt() {
        return "windows".equals(getOs()) ? ".exe" : "";
    }

    public static void deleteOnExit() {
        deleteOnExit = true;
    }

    /**
     * Extracts the file. The file is made executable, and will be deleted when the VM exits.
     *
     * @return the extracted file.
     */
    public File extract() {
        try {
            InputStream is = getInputStream();

            try (FileOutputStream os = new FileOutputStream(targetFile)) {
                copy(is, os);
                is.close();
            }
            targetFile.setExecutable(true);
            targetFile.setLastModified(System.currentTimeMillis());
            if (deleteOnExit) targetFile.deleteOnExit();
            return targetFile;
        } catch (IOException e) {
            throw new GherkinException(e);
        }
    }

    private InputStream getInputStream() throws IOException {
        File file = new File(fileName);
        if (file.isFile()) return new FileInputStream(fileName);

        InputStream is = getClass().getResourceAsStream("/gherkin-go/" + fileName);
        if (is != null) return is;

        return newUrlInputStream(fileName, targetFile);
    }

    private InputStream newUrlInputStream(String fileName, File targetFile) throws IOException {
        URL baseUrl = new URL("https://s3.eu-west-2.amazonaws.com/io.cucumber/gherkin-go/" + getVersion() + "/");
        URL fileUrl = new URL(baseUrl, fileName);
        URLConnection con = fileUrl.openConnection();
        con.setRequestProperty("User-Agent", "Mozilla");
        try {
            return con.getInputStream();
        } catch (UnknownHostException | FileNotFoundException e) {
            throw new GherkinException(String.format("Failed to download %s.\nTry downloading it manually and place it in %s", fileUrl, targetFile.getAbsolutePath()));
        }
    }

    private String getVersion() {
        Package p = getClass().getPackage();
        // This is set in pom.xml
        String version = p.getImplementationVersion();
        if (version == null || version.endsWith("-SNAPSHOT")) {
            version = "master";
        }
        return version;
    }

    String getOs() {
        return normalizeOs((String) props.get("os.name"));
    }

    String getArch() {
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

    File getTargetFile() {
        return targetFile;
    }

    private static void copy(InputStream in, OutputStream out) throws IOException {
        int read = 0;
        byte[] buf = new byte[4096];
        while ((read = in.read(buf)) > 0) out.write(buf, 0, read);
    }
}
