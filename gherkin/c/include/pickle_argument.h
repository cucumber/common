#ifndef GHERKIN_PICKLE_ARGUMENT_H_
#define GHERKIN_PICKLE_ARGUMENT_H_

typedef enum PickleArgumentType {
    Argument_String,
    Argument_Table
} PickleArgumentType;

typedef struct PickleArgument {
    PickleArgumentType type;
} PickleArgument;

#endif /* GHERKIN_PICKLE_ARGUMENT_H_ */
