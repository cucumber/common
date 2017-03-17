#include "background.h"
#include "string_utilities.h"
#include <stdlib.h>

const Background* Background_new(Location location, const wchar_t* keyword, const wchar_t* name, const wchar_t* description, const Steps* steps) {
    Background* background = (Background*)malloc(sizeof(Background));
    background->background_delete = (item_delete_function)Background_delete;
    background->type = Gherkin_Background;
    background->location.line = location.line;
    background->location.column = location.column;
    background->keyword = 0;
    if (keyword) {
        background->keyword = StringUtilities_copy_string(keyword);
    }
    background->name = 0;
    if (name) {
        background->name = StringUtilities_copy_string(name);
    }
    background->description = description;
    background->steps = steps;
    return background;
}

void Background_delete(const Background* background) {
    if (!background) {
        return;
    }
    if (background->keyword) {
        free((void*)background->keyword);
    }
    if (background->name) {
        free((void*)background->name);
    }
    if (background->description) {
        free((void*)background->description);
    }
    if (background->steps) {
        Steps_delete(background->steps);
    }
    free((void*)background);
}
