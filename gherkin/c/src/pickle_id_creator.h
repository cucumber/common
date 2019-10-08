#ifndef GHERKIN_PICKLE_ID_CREATOR_H_
#define GHERKIN_PICKLE_ID_CREATOR_H_

#include <wchar.h>
#include "pickle_location.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct Pickle_Id_Data {
    unsigned char* message_buffer;
    unsigned long buffer_size;
    unsigned long source_size;
    unsigned long message_size;
} Pickle_Id_Data;

const Pickle_Id_Data* Pickle_Id_Data_new(const wchar_t* source);

void Pickle_Id_Data_delete(const Pickle_Id_Data* pickle_id_data);

const unsigned char* Pickle_Id_calculate(const Pickle_Id_Data* pickle_id_data, const PickleLocations* locations);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_PICKLE_ID_CREATOR_H_ */
