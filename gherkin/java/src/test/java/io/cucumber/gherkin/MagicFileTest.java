package io.cucumber.gherkin;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.io.File;
import java.util.HashMap;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class MagicFileTest {

    @Rule
    public ExpectedException expected = ExpectedException.none();

    @Before
    public void setup() {
        MagicFile.deleteOnExit();
    }

    @Test
    public void detects_osx() {
        MagicFile magicFile = new MagicFile("", new HashMap<Object, Object>() {{
            put("os.name", "Mac OS X");
            put("os.arch", "x86_64");
        }});

        assertEquals("darwin", magicFile.getOs());
        assertEquals("amd64", magicFile.getArch());
    }

    @Test
    public void generates_file_name_for_macos() {
        MagicFile magicFile = new MagicFile("gherkin-{{.OS}}-{{.Arch}}{{.Ext}}", new HashMap<Object, Object>() {{
            put("os.name", "Mac OS X");
            put("os.arch", "x86_64");
        }});
        assertEquals("gherkin-darwin-amd64", magicFile.getFileName());
    }

    @Test
    public void generates_file_name_for_windows() {
        MagicFile magicFile = new MagicFile("gherkin-{{.OS}}-{{.Arch}}{{.Ext}}", new HashMap<Object, Object>() {{
            put("os.name", "Windows 10");
            put("os.arch", "x86_32");
        }});
        assertEquals("gherkin-windows-386.exe", magicFile.getFileName());
    }

    @Test
    public void extracts_file_from_file_system() {
        MagicFile magicFile = new MagicFile("README.md", new HashMap<Object, Object>() {{
            put("os.name", "Mac OS X");
            put("os.arch", "x86_64");
        }});

        File targetFile = magicFile.getTargetFile();
        targetFile.delete();
        magicFile.extract();
        assertTrue(targetFile.isFile());
    }

    @Test
    public void downloads_file_from_s3() {
        MagicFile magicFile = new MagicFile("gherkin-{{.OS}}-{{.Arch}}", new HashMap<Object, Object>() {{
            put("os.name", "Mac OS X");
            put("os.arch", "x86_64");
        }});

        File targetFile = magicFile.getTargetFile();
        targetFile.delete();
        magicFile.extract();
        assertTrue(targetFile.isFile());
    }

    @Test
    public void throws_exception_with_explanation_when_file_not_found() {
        expected.expectMessage("Failed to download https://s3.eu-west-2.amazonaws.com/io.cucumber/gherkin-go/master/notfound-darwin-amd64");
        MagicFile magicFile = new MagicFile("notfound-{{.OS}}-{{.Arch}}", new HashMap<Object, Object>() {{
            put("os.name", "Mac OS X");
            put("os.arch", "x86_64");
        }});

        File targetFile = magicFile.getTargetFile();
        targetFile.delete();
        magicFile.extract();
        assertTrue(targetFile.isFile());
    }
}
