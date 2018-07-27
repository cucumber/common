package io.cucumber.datatable;

class Place {

    final String name;
    final int indexOfPlace;

    Place(String name) {
        this(name, -1);
    }

    Place(String name, int indexOfPlace) {
        this.name = name;
        this.indexOfPlace = indexOfPlace;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Place place = (Place) o;

        if (indexOfPlace != place.indexOfPlace) {
            return false;
        }
        return name != null ? name.equals(place.name) : place.name == null;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + indexOfPlace;
        return result;
    }

    @Override
    public String toString() {
        return "Place{" +
                "name='" + name + '\'' +
                ", indexOfPlace=" + indexOfPlace +
                '}';
    }
}
