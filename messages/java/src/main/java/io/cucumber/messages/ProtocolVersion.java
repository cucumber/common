package io.cucumber.messages;

import java.util.Optional;
import java.util.ResourceBundle;

public final class ProtocolVersion {

    public static Optional<String> getVersion(){
        try {
            return Optional.of(ResourceBundle.getBundle("io.cucumber.messages.version").getString("messages.version"));
        } catch (Exception ignored){
            return Optional.empty();
        }
    }
}
