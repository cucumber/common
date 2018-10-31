package io.cucumber.config;

import java.util.ArrayList;
import java.util.List;

/**
 * This test struct is used to verify that fields are set prooerly
 */
public class MyConfig {
    public enum Myenum {
        FOO,
        BAR
    }
    public Myenum myenum = Myenum.valueOf("FOO");
    public boolean somebool = false;
    public int meaning = 12;
    public String message = "nothing";
    public List<String> stringlist = new ArrayList<>();
}
