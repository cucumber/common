import sys

if sys.version_info[0] == 3:
    from .count_symbols_py3_plus import count_symbols
else:
    from .count_symbols_py2 import count_symbols
