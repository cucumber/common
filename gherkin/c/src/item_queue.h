#ifndef GHERKIN_ITEM_QUEUE_H_
#define GHERKIN_ITEM_QUEUE_H_

#include "item.h"
#include <stdbool.h>

#ifdef __cplusplus
extern "C" {
#endif

typedef struct QueueItem QueueItem;

typedef struct QueueItem {
    Item* item;
    QueueItem* next;
} QueueItem;

typedef struct ItemQueue {
    QueueItem* first;
    QueueItem* last;
} ItemQueue;

ItemQueue* ItemQueue_new();

ItemQueue* ItemQueue_new_array(int size);

void ItemQueue_delete(ItemQueue* item_queue);

void ItemQueue_delete_array(ItemQueue* item_queue, int size);

bool ItemQueue_is_empty(ItemQueue* item_queue);

int ItemQueue_size(ItemQueue* item_queue);

void ItemQueue_add(ItemQueue* item_queue, Item* item);

Item* ItemQueue_remove(ItemQueue* item_queue);

void ItemQueue_extend(ItemQueue* item_queue, ItemQueue* other_queue);

void ItemQueue_push(ItemQueue* item_queue, Item* item);

Item* ItemQueue_pop(ItemQueue* item_queue);

Item* ItemQueue_peek(ItemQueue* item_queue);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_ITEM_QUEUE_H_ */
