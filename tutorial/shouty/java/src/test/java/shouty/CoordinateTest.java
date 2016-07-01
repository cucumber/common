package shouty;

import junit.framework.TestCase;
import org.junit.Test;

public class CoordinateTest extends TestCase {

    @Test
    public void testItCalculatesTheDistanceFromAnotherCoordinateAlongXAxis() {
        Coordinate a = new Coordinate(0, 0);
        Coordinate b = new Coordinate(1000, 0);
        assertEquals(1000, a.distanceFrom(b));
    }
}
