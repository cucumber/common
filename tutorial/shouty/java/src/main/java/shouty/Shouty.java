package shouty;

import java.util.HashMap;
import java.util.Map;

public class Shouty {
    private static final int MESSAGE_RANGE = 1000;
    private Map<String, Coordinate> locations = new HashMap<String, Coordinate>();
    private Map<String, String> messages = new HashMap<String, String>();

    public void setLocation(String person, Coordinate location) {
        locations.put(person, location);
    }

    public void shout(String person, String message) {
        messages.put(person, message);
    }

    public Map<String, String> getMessagesHeardBy(String listener) {
        HashMap<String, String> result = new HashMap<String, String>();

        for (Map.Entry<String, String> entry : messages.entrySet()) {
            String shouter = entry.getKey();
            String message = entry.getValue();
            int distance = locations.get(listener).distanceFrom(locations.get(shouter));
            if (distance < MESSAGE_RANGE)
                result.put(shouter, message);
        }

        return result;
    }
}
