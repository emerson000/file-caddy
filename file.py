import json


class File(dict):

    def __init__(self):
        self._filename = ''
        self._filetype = None
        self._parent = ''
        self._size = 0

    def set_filename(self, filename):
        self._filename = filename

    def get_filename(self):
        return self._filename

    def set_filetype(self, filetype):
        self._filetype = filetype

    def get_filetype(self):
        return self._filetype

    def set_parent(self, parent):
        self._parent = parent

    def get_parent(self):
        return self._parent

    def set_size(self, size):
        self._size = size

    def get_size(self):
        return self._size

    def toDict(self):
        output = {
            'filename': self._filename,
            'type': self._filetype.name,
            'parent': self._parent,
            'size': self._size
        }
        return output

    def toJSON(self):
        return json.dumps(self.toDict())
