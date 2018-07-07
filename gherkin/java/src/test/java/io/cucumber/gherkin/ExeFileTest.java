package io.cucumber.gherkin;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.io.File;
import java.util.HashMap;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class ExeFileTest {

    @Rule
    public ExpectedException expected = ExpectedException.none();
    
    @Test
    public void generates_file_name_for_darwin() {
        ExeFile exeFile = new ExeFile("gherkin-{{.OS}}-{{.Arch}}{{.Ext}}", new HashMap<Object, Object>() {{
            put("os.name", "Mac OS X");
            put("os.arch", "x86_64");
        }});
        assertEquals("gherkin-darwin-amd64", exeFile.getFileName());
    }

    @Test
    public void generates_file_name_for_windows() {
        ExeFile exeFile = new ExeFile("gherkin-{{.OS}}-{{.Arch}}{{.Ext}}", new HashMap<Object, Object>() {{
            put("os.name", "Windows 10");
            put("os.arch", "x86_32");
        }});
        assertEquals("gherkin-windows-386.exe", exeFile.getFileName());
    }

    @Test
    public void throws_exception_with_explanation_when_file_not_found() {
        expected.expectMessage("No gherkin executable for notfound-darwin-amd64. Please submit an issue to https://github.com/cucumber/cucumber/issues");
        ExeFile exeFile = new ExeFile("notfound-{{.OS}}-{{.Arch}}{{.Ext}}", new HashMap<Object, Object>() {{
            put("os.name", "Mac OS X");
            put("os.arch", "x86_64");
        }});

        File targetFile = exeFile.getFile();
        targetFile.delete();
        exeFile.extract();
        assertTrue(targetFile.isFile());
    }
}
