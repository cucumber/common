#include "incrementing_id_generator.h"
#include <stdlib.h>
#include <math.h>


static const wchar_t* IncrementingIdGenerator_new_id(IdGenerator* id_generator);

static int calculate_string_length_for_number(long number);

static int print_number_to_string(wchar_t* string, long number, int number_width);


IdGenerator* IncrementingIdGenerator_new() {
    IncrementingIdGenerator* id_generator = (IncrementingIdGenerator*)malloc(sizeof(IncrementingIdGenerator));
    id_generator->new_id = IncrementingIdGenerator_new_id;
    id_generator->id_generator_delete = IncrementingIdGenerator_delete;
    id_generator->index = 0;
    return (IdGenerator*)id_generator;
}

void IncrementingIdGenerator_delete(IdGenerator* id_generator){
    if (!id_generator) {
        return;
    }
    free((void*)id_generator);
}

const wchar_t* IncrementingIdGenerator_new_id(IdGenerator* id_generator) {
    long number = ((IncrementingIdGenerator*)id_generator)->index++;
    int number_width = calculate_string_length_for_number(number);
    wchar_t* buffer = (wchar_t*)malloc((number_width + 1) * sizeof(wchar_t));
    print_number_to_string(buffer, number, number_width);
    buffer[number_width] = L'\0';
    return buffer;
}

int calculate_string_length_for_number(long number) {
    if (number == 0) {
        return 1;
    }
    return (int)log10(number) + 1;
}

int print_number_to_string(wchar_t* string, long number, int number_width) {
    int divisor = 1;
    int i;
    for (i = number_width - 1; i >= 0; --i) {
        string[i] = L'0' + ((number / divisor) % 10);
        divisor *= 10;
    }
    return number_width;
}
