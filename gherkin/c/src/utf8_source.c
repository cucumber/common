#include "utf8_source.h"

unsigned char Utf8Source_read(Utf8Source* utf8_source) {
    return utf8_source->read(utf8_source);
}

void Utf8Source_delete(Utf8Source* utf8_source) {
    utf8_source->delete(utf8_source);
}
