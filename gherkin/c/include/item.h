#ifndef GHERKIN_ITEM_H_
#define GHERKIN_ITEM_H_

typedef struct Item Item;

typedef void (*item_delete_function) (Item*);

typedef struct Item {
    item_delete_function item_delete;
} Item;

#endif /* GHERKIN_ITEM_H_ */
