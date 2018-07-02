package io.cucumber.gherkin;

import org.junit.Test;

import java.io.File;
import java.util.HashMap;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class MagicFileTest {

    @Test
    public void detects_osx() {
        MagicFile magicFile = new MagicFile("", new HashMap<Object, Object>() {{
            put("os.name", "Mac OS X");
            put("os.arch", "x86_64");
        }});

        assertEquals("darwin", magicFile.getOs());
        assertEquals("386", magicFile.getArch());
    }

    @Test
    public void generates_file_name() {
        MagicFile magicFile = new MagicFile("gherkin-{{.OS}}-{{.Arch}}", new HashMap<Object, Object>() {{
            put("os.name", "Mac OS X");
            put("os.arch", "x86_64");
        }});
        assertEquals("gherkin-darwin-386", magicFile.getFileName());
    }

    @Test
    public void extracts_file() {
        MagicFile magicFile = new MagicFile("README.md", new HashMap<Object, Object>() {{
            put("os.name", "Mac OS X");
            put("os.arch", "x86_64");
        }});

        File targetFile = magicFile.getTargetFile();
        targetFile.delete();
        magicFile.extract();
        magicFile.extract();
        System.out.println("targetFile = " + magicFile.getTargetDir());
        assertTrue(targetFile.isFile());
    }

}
