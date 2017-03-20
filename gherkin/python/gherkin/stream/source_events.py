import io

def source_event(path):
    event = {
        'type': 'source',
        'uri': path,
        'data': io.open(path, 'rU', encoding='utf8', newline='').read(),
        'media': {
            'encoding': 'utf-8',
            'type': 'text/vnd.cucumber.gherkin+plain'
        }
    }
    return event

class SourceEvents:
    def __init__(self, paths):
        self.paths = paths

    def enum(self):
        return map(source_event, self.paths)
