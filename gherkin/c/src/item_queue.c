#include "item_queue.h"
#include <stdlib.h>

static void add(ItemQueue* item_queue, QueueItem* queue_item);

static void push(ItemQueue* item_queue, QueueItem* queue_item);

static QueueItem* remove(ItemQueue* item_queue);

static void delete_items(ItemQueue* item_queue);

static void delete_item(Item* item);

ItemQueue* ItemQueue_new() {
    ItemQueue* item_queue = (ItemQueue*)malloc(sizeof(ItemQueue));
    item_queue->first = 0;
    item_queue->last = 0;
    return item_queue;
}

ItemQueue* ItemQueue_new_array(int size) {
    ItemQueue* item_queues = (ItemQueue*)malloc(size * sizeof(ItemQueue));
    int i;
    for (i = 0; i < size; ++i) {
        item_queues[i].first = 0;
        item_queues[i].last = 0;
    }
    return item_queues;
}

void ItemQueue_delete(ItemQueue* item_queue) {
    while (item_queue->first) {
        delete_item(ItemQueue_remove(item_queue));
    }
    free((void*)item_queue);
}

void ItemQueue_delete_array(ItemQueue* item_queues, int size) {
    int i;
    for (i = 0; i < size; ++i) {
        delete_items(&item_queues[i]);
    }
    free((void*)item_queues);
}

bool ItemQueue_is_empty(ItemQueue* item_queue) {
    return item_queue->first == 0;
}

int ItemQueue_size(ItemQueue* item_queue) {
    if (ItemQueue_is_empty(item_queue)) {
        return 0;
    }
    int size = 1;
    QueueItem* next = item_queue->first;
    while (next != item_queue->last) {
        ++size;
        next = next->next;
    }
    return size;
}

void ItemQueue_add(ItemQueue* item_queue, Item* item) {
    QueueItem* queue_item = (QueueItem*)malloc(sizeof(QueueItem));
    queue_item->item = item;
    queue_item->next = 0;
    add(item_queue, queue_item);
}

Item* ItemQueue_remove(ItemQueue* item_queue) {
    QueueItem* queue_item = remove(item_queue);
    if (!queue_item)
        return 0;
    Item* item = queue_item->item;
    free((void*)queue_item);
    return item;
}

void ItemQueue_extend(ItemQueue* item_queue, ItemQueue* other_queue) {
    while (other_queue->first) {
        add(item_queue, remove(other_queue));
    }
    ItemQueue_delete(other_queue);
}

void ItemQueue_push(ItemQueue* item_queue, Item* item) {
    QueueItem* queue_item = (QueueItem*)malloc(sizeof(QueueItem));
    queue_item->item = item;
    queue_item->next = 0;
    push(item_queue, queue_item);
}

Item* ItemQueue_pop(ItemQueue* item_queue) {
    return ItemQueue_remove(item_queue);
}

Item* ItemQueue_peek(ItemQueue* item_queue) {
    if (item_queue->first) {
        return item_queue->first->item;
    }
    return 0;
}

static void add(ItemQueue* item_queue, QueueItem* queue_item) {
    if (!item_queue->first) {
        item_queue->first = queue_item;
        item_queue->last = queue_item;
    } else {
        item_queue->last->next = queue_item;
        item_queue->last = queue_item;
    }
}

static void push(ItemQueue* item_queue, QueueItem* queue_item) {
    if (!item_queue->first) {
        item_queue->first = queue_item;
        item_queue->last = queue_item;
    } else {
        queue_item->next = item_queue->first;
        item_queue->first = queue_item;
    }
}

static QueueItem* remove(ItemQueue* item_queue) {
    if (!item_queue->first)
        return 0;
    QueueItem* queue_item = item_queue->first;
    item_queue->first = item_queue->first->next;
    if (!item_queue->first)
        item_queue->last = 0;
    return queue_item;
}

static void delete_items(ItemQueue* item_queue) {
    while (item_queue->first) {
        Item* item = ItemQueue_remove(item_queue);
        if (item) {
            delete_item(item);
        }
    }
}

static void delete_item(Item* item) {
    item->item_delete(item);
}
