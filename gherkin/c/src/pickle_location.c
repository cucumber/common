#include "pickle_location.h"
#include <stdlib.h>

const PickleLocation* PickleLocation_new(int line, int column) {
    PickleLocation* location = (PickleLocation*)malloc(sizeof(PickleLocation));
    location->line = line;
    location->column = column;
    return location;
}

const PickleLocations* PickleLocations_new_single(int line, int column) {
    const PickleLocation* location = PickleLocation_new(line, column);
    PickleLocations* locations = (PickleLocations*)malloc(sizeof(PickleLocations));
    locations->location_count = 1;
    locations->locations = location;
    return locations;
}

const PickleLocations* PickleLocations_new_double(int line_1, int column_1, int line_2, int column_2) {
    PickleLocation* location_array = (PickleLocation*)malloc(2 * sizeof(PickleLocation));
    location_array[0].line = line_1;
    location_array[0].column = column_1;
    location_array[1].line = line_2;
    location_array[1].column = column_2;
    PickleLocations* locations = (PickleLocations*)malloc(sizeof(PickleLocations));
    locations->location_count = 2;
    locations->locations = location_array;
    return locations;
}

void PickleLocation_delete(const PickleLocation* location) {
    if (!location) {
        return;
    }
    free((void*) location);
}

void PickleLocations_delete(const PickleLocations* locations) {
    if (!locations) {
        return;
    }
    if (locations->locations) {
        free((void*) locations->locations);
    }
    free((void*) locations);
}
