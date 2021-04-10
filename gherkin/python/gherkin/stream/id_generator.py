class IdGenerator(object):
    def __init__(self):
        self._id_counter = 0

    def get_next_id(self):
        id = self._id_counter
        self._id_counter += 1
        return str(id)
