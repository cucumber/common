def before_scenario(context, scenario):
    pass

def before_tag(context, tag):
    if tag == 'failBeforeHook':
        raise Exception('spam', 'eggs')

def after_tags(context, tag):
    pass