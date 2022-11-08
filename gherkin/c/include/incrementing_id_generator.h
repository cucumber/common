#ifndef INCREMENTING_ID_GENERATOR_H_
#define INCREMENTING_ID_GENERATOR_H_

#include "id_generator.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct IncrementingIdGenerator IncrementingIdGenerator;

struct IncrementingIdGenerator {
    new_id_function new_id;
    id_generator_delete_function id_generator_delete;
    long index;
};

IdGenerator* IncrementingIdGenerator_new();

void IncrementingIdGenerator_delete(IdGenerator* id_generator);

#ifdef __cplusplus
}
#endif
#endif /* INCREMENTING_ID_GENERATOR_H_ */
