package shouty;

public class Coordinate {
    private final int x;
    private int y;

    public Coordinate(int xCoord, int yCoord) {
        x = xCoord;
        y = yCoord;
    }

    public int distanceFrom(Coordinate other) {
        // TODO: actually caluculate distance. I think we need to use pythagoras' theorem?
        return 0;
    }
}
