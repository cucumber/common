import string


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
        whitespace_except_newline = string.whitespace.replace('\n', '')
        for cell, col in self.split_table_cells(self._trimmed_line_text.strip()):
            cell_indent = len(cell) - len(cell.lstrip(whitespace_except_newline))
            cells.append({'column': col + self.indent + cell_indent, 'text': cell.strip(whitespace_except_newline)})
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
        items = self._trimmed_line_text.strip().split('@')
        tags = []
        for item in items[1:]:
            tags.append({'column': column, 'text': '@' + item.strip()})
            column += len(item) + 1
        return tags
