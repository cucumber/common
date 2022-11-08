import re
from .errors import ParserException


class GherkinLine(object):
    def __init__(self, line_text, line_number):
        self._line_text = line_text
        self._line_number = line_number
        self._trimmed_line_text = line_text.lstrip()
        self.indent = len(line_text) - len(self._trimmed_line_text)

    def get_rest_trimmed(self, length):
        return self._trimmed_line_text[length:].strip()

    def get_line_text(self, indent_to_remove=-1):
        if indent_to_remove < 0 or indent_to_remove > self.indent:
            return self._trimmed_line_text
        else:
            return self._line_text[indent_to_remove:]

    def is_empty(self):
        return not self._trimmed_line_text

    def startswith(self, prefix):
        return self._trimmed_line_text.startswith(prefix)

    def startswith_title_keyword(self, keyword):
        return self._trimmed_line_text.startswith(keyword + ':')

    @property
    def table_cells(self):
        cells = []
        for cell, col in self.split_table_cells(self._trimmed_line_text.strip()):
            lstripped_cell = re.sub(r"^[^\S\n]*", "" , cell, flags=re.U)
            cell_indent = len(cell) - len(lstripped_cell)
            cells.append({'column': col + self.indent + cell_indent, 'text': re.sub(r"[^\S\n]*$", "", lstripped_cell, flags=re.U)})
        return cells

    def split_table_cells(self, row):
        """
        An iterator returning all the table cells in a row with their positions,
        accounting for escaping.
        """

        row = iter(row)
        col = 0
        start_col = col + 1
        cell = ''
        first_cell = True
        while True:
            char = next(row, None)
            col += 1
            if char == '|':
                if first_cell:
                    # First cell (content before the first |) is skipped
                    first_cell = False
                else:
                    yield (cell, start_col)
                cell = ''
                start_col = col + 1
            elif char == '\\':
                char = next(row)
                col += 1
                if char == 'n':
                    cell += '\n'
                else:
                    if char not in ['|', '\\']:
                        cell += '\\'
                    cell += char
            elif char:
                cell += char
            else:
                break
        # Last cell (content after the last |) is skipped

    @property
    def tags(self):
        column = self.indent + 1
        uncommented_line = re.split(r"\s#", self._trimmed_line_text.strip(), 2)[0]
        items = uncommented_line.strip().split('@')
        tags = []
        for item in items[1:]:
            tag_value = '@' + item.strip()
            if re.search(r"[^\S+]", tag_value) is not None:
                location = {'line': self._line_number, 'column': column}
                raise ParserException('A tag may not contain whitespace', location)

            tags.append({'column': column, 'text': tag_value})
            column += len(item) + 1
        return tags
