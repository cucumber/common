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
        String formatPattern = executablePattern.replace("{{.OS}}", "%s").replace("{{.Arch}}", "%s");
        this.fileName = String.format(formatPattern, getOs(), getArch());
        File codeFile = new File(getClass().getProtectionDomain().getCodeSource().getLocation().getFile());
        File targetDir = codeFile.isDirectory() ? codeFile : codeFile.getParentFile();
        targetFile = new File(targetDir, new File(fileName).getName());
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

        InputStream is = getClass().getResourceAsStream("/" + fileName);
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
        String osName = ((String) props.get("os.name")).toLowerCase();
        if (osName.contains("mac")) {
            return "darwin";
        }
        return null;
    }

    String getArch() {
        String osArch = ((String) props.get("os.arch")).toLowerCase();
        if (osArch.contains("x86_64")) {
            return "386";
        }
        return null;
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
