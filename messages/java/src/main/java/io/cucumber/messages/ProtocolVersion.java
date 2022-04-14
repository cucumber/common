package io.cucumber.messages;

import java.util.ResourceBundle;

public final class ProtocolVersion {

    private ProtocolVersion(){

    }

    public static String getVersion() {
        return ResourceBundle.getBundle("io.cucumber.messages.version").getString("messages.version");
    }
}
