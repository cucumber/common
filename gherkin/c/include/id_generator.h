#ifndef ID_GENERATOR_H_
#define ID_GENERATOR_H_

#include <wchar.h>

#ifdef __cplusplus
extern "C" {
#endif

typedef struct IdGenerator IdGenerator;

typedef const wchar_t* (*new_id_function) (IdGenerator*);

typedef void (*id_generator_delete_function) (IdGenerator*);

struct IdGenerator {
    new_id_function new_id;
    id_generator_delete_function id_generator_delete;
};

#ifdef __cplusplus
}
#endif
#endif /* ID_GENERATOR_H_ */
