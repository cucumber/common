import os
from optparse import OptionParser
import sys
if sys.version_info < (3, 0):
    string_type = basestring
    if os.name != 'nt':
        import codecs
        UTF8Writer = codecs.getwriter('utf8')
        sys.stdout = UTF8Writer(sys.stdout)
else:
    string_type = str

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
import json
from gherkin.stream.gherkin_events import GherkinEvents
from gherkin.stream.source_events import SourceEvents

parser = OptionParser()
parser.add_option("--no-source",  action="store_false", dest="print_source",  default=True, help="don't print source events")
parser.add_option("--no-ast",     action="store_false", dest="print_ast",     default=True, help="don't print ast events")
parser.add_option("--no-pickles", action="store_false", dest="print_pickles", default=True, help="don't print pickle events")

(options, args) = parser.parse_args()

source_events = SourceEvents(args)
gherkin_events = GherkinEvents(options)


def reject_empty_values(data):
    if isinstance(data, dict):
        return {k: reject_empty_values(v) for k, v in data.items() if v}
    if isinstance(data, list):
        return [reject_empty_values(v) for v in data if v]
    else:
        return data


for source_event in source_events.enum():
    for event in gherkin_events.enum(source_event):
        print(json.dumps(reject_empty_values(event)))
