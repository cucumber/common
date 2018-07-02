package io.cucumber.gherkin;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;

/**
 * A Magic File can be extracted from a Jar file.
 */
public class MagicFile {
    private final Map<Object, Object> props;
    private final String fileName;
    private final File targetFile;
    private final File targetDir;

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
        targetDir = codeFile.isDirectory() ? codeFile : codeFile.getParentFile();
        targetFile = new File(targetDir, new File(fileName).getName());
    }

    /**
     * Extracts the file. The file is made executable, and will be deleted when the VM exits.
     * @return the extracted file.
     */
    public File extract() {
        try {
            File targetFile = getTargetFile();

            String resourcePath = "/" + fileName;
            FileOutputStream os = null;
            InputStream is = getClass().getResourceAsStream(resourcePath);
            if (is == null) {
                File file = new File(fileName);
                if (!file.isFile()) {
                    throw new GherkinException(String.format("%s not found. I looked in the jar and on the file system: ", fileName));
                }
                is = new FileInputStream(fileName);
            }

            try {
                os = new FileOutputStream(targetFile);
                copy(is, os);
            } finally {
                is.close();
                if (os != null) os.close();
            }
            targetFile.setExecutable(true);
            targetFile.deleteOnExit();
            return targetFile;
        } catch (IOException e) {
            throw new GherkinException(e);
        }
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

    File getTargetDir() {
        return targetDir;
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
