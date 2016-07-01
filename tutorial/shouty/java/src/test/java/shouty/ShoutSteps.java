package shouty;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;

import static java.util.Collections.emptyList;
import static java.util.Collections.emptyMap;
import static org.junit.Assert.assertEquals;


public class ShoutSteps {
    private static final String ARBITRARY_MESSAGE = "Hello, world";
    private final Shouty shouty = new Shouty();

    @Given("^Lucy is at \\[(\\d+), (\\d+)\\]$")
    public void lucy_is_at(int xCoord, int yCoord) throws Throwable {
        shouty.setLocation("Lucy", new Coordinate(xCoord, yCoord));
    }

    @Given("^Sean is at \\[(\\d+), (\\d+)\\]$")
    public void sean_is_at(int xCoord, int yCoord) throws Throwable {
        shouty.setLocation("Sean", new Coordinate(xCoord, yCoord));
    }

    @When("^Sean shouts$")
    public void sean_shouts() throws Throwable {
        shouty.shout("Sean", ARBITRARY_MESSAGE);
    }

    @Then("^Lucy should hear Sean")
    public void lucy_should_hear_sean() throws Throwable {
        assertEquals(1, shouty.getMessagesHeardBy("Lucy").size());
    }

    @Then("^Lucy should hear nothing$")
    public void lucy_should_hear_nothing() throws Throwable {
        assertEquals(emptyMap(), shouty.getMessagesHeardBy("Lucy"));
    }
}
