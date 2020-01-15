const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const stringify = require('./stringify');
const Types = require('./types');

const DEFAULT_OPTIONS = {
    language: 'en',
    resources: {
        en: JSON.parse(fs.readFileSync(path.join(__dirname, '../res/en.json'), 'utf8'))
    }
};

// order matters for these!
const FUNCTION_DETAILS = ['new', 'this'];
const FUNCTION_DETAILS_VARIABLES = ['functionNew', 'functionThis'];
const MODIFIERS = ['optional', 'nullable', 'repeatable'];

const TEMPLATE_VARIABLES = [
    'application',
    'codeTagClose',
    'codeTagOpen',
    'element',
    'field',
    'functionNew',
    'functionParams',
    'functionReturns',
    'functionThis',
    'keyApplication',
    'name',
    'nullable',
    'optional',
    'param',
    'prefix',
    'repeatable',
    'suffix',
    'type'
];

const FORMATS = {
    EXTENDED: 'extended',
    SIMPLE: 'simple'
};

function makeTagOpen(codeTag, codeClass) {
    let tagOpen = '';
    const tags = codeTag ? codeTag.split(' ') : [];

    tags.forEach(tag => {
        const tagClass = codeClass ? ` class="${codeClass}"` : '';

        tagOpen += `<${tag}${tagClass}>`;
    });

    return tagOpen;
}

function makeTagClose(codeTag) {
    let tagClose = '';
    const tags = codeTag ? codeTag.split(' ') : [];

    tags.reverse();
    tags.forEach(tag => {
        tagClose += `</${tag}>`;
    });

    return tagClose;
}

function reduceMultiple(context, keyName, contextName, translate, previous, current, index, items) {
    let key;

    switch (index) {
        case 0:
            key = '.first.many';
            break;

        case (items.length - 1):
            key = '.last.many';
            break;

        default:
            key = '.middle.many';
    }

    key = keyName + key;
    context[contextName] = items[index];

    return previous + translate(key, context);
}

function modifierKind(useLongFormat) {
    return useLongFormat ? FORMATS.EXTENDED : FORMATS.SIMPLE;
}

function buildModifierStrings(describer, modifiers, type, useLongFormat) {
    const result = {};

    modifiers.forEach(modifier => {
        const key = modifierKind(useLongFormat);
        const modifierStrings = describer[modifier](type[modifier]);

        result[modifier] = modifierStrings[key];
    });

    return result;
}

function addModifiers(describer, context, result, type, useLongFormat) {
    const keyPrefix = `modifiers.${modifierKind(useLongFormat)}`;
    const modifiers = buildModifierStrings(describer, MODIFIERS, type, useLongFormat);

    MODIFIERS.forEach(modifier => {
        const modifierText = modifiers[modifier] || '';

        result.modifiers[modifier] = modifierText;
        if (!useLongFormat) {
            context[modifier] = modifierText;
        }
    });

    context.prefix = describer._translate(`${keyPrefix}.prefix`, context);
    context.suffix = describer._translate(`${keyPrefix}.suffix`, context);
}

function addFunctionModifiers(describer, context, {modifiers}, type, useLongFormat) {
    const functionDetails = buildModifierStrings(describer, FUNCTION_DETAILS, type, useLongFormat);

    FUNCTION_DETAILS.forEach((functionDetail, i) => {
        const functionExtraInfo = functionDetails[functionDetail] || '';
        const functionDetailsVariable = FUNCTION_DETAILS_VARIABLES[i];

        modifiers[functionDetailsVariable] = functionExtraInfo;
        if (!useLongFormat) {
            context[functionDetailsVariable] += functionExtraInfo;
        }
    });
}

// Replace 2+ whitespace characters with a single whitespace character.
function collapseSpaces(string) {
    return string.replace(/(\s)+/g, '$1');
}

function getApplicationKey({expression}, applications) {
    if (applications.length === 1) {
        if (/[Aa]rray/.test(expression.name)) {
            return 'array';
        } else {
            return 'other';
        }
    } else if (/[Ss]tring/.test(applications[0].name)) {
        // object with string keys
        return 'object';
    } else {
        // object with non-string keys
        return 'objectNonString';
    }
}

class Result {
    constructor() {
        this.description = '';
        this.modifiers = {
            functionNew: '',
            functionThis: '',
            optional: '',
            nullable: '',
            repeatable: ''
        };
        this.returns = '';
    }
}

class Context {
    constructor(props) {
        props = props || {};

        TEMPLATE_VARIABLES.forEach(variable => {
            this[variable] = props[variable] || '';
        });
    }
}

class Describer {
    constructor(opts) {
        let options;

        this._useLongFormat = true;
        options = this._options = _.defaults(opts || {}, DEFAULT_OPTIONS);
        this._stringifyOptions = _.defaults(options, { _ignoreModifiers: true });

        // use a dictionary, not a Context object, so we can more easily merge this into Context objects
        this._i18nContext = {
            codeTagClose: makeTagClose(options.codeTag),
            codeTagOpen: makeTagOpen(options.codeTag, options.codeClass)
        };

        // templates start out as strings; we lazily replace them with template functions
        this._templates = options.resources[options.language];
        if (!this._templates) {
            throw new Error(`I18N resources are not available for the language ${options.language}`);
        }
    }

    _stringify(type, typeString, useLongFormat) {
        const context = new Context({
            type: typeString || stringify(type, this._stringifyOptions)
        });
        const result = new Result();

        addModifiers(this, context, result, type, useLongFormat);
        result.description = this._translate('type', context).trim();

        return result;
    }

    _translate(key, context) {
        let result;
        let templateFunction = _.get(this._templates, key);

        context = context || new Context();

        if (templateFunction === undefined) {
            throw new Error(`The template ${key} does not exist for the ` +
                `language ${this._options.language}`);
        }

        // compile and cache the template function if necessary
        if (typeof templateFunction === 'string') {
            // force the templates to use the `context` object
            templateFunction = templateFunction.replace(/<%= /g, '<%= context.');
            templateFunction = _.template(templateFunction, {variable: 'context'});
            _.set(this._templates, key, templateFunction);
        }

        result = (templateFunction(_.extend(context, this._i18nContext)) || '')
            // strip leading spaces
            .replace(/^\s+/, '');
        result = collapseSpaces(result);

        return result;
    }

    _modifierHelper(key, modifierPrefix = '', context) {
        return {
            extended: key ?
                this._translate(`${modifierPrefix}.${FORMATS.EXTENDED}.${key}`, context) :
                '',
            simple: key ?
                this._translate(`${modifierPrefix}.${FORMATS.SIMPLE}.${key}`, context) :
                ''
        };
    }

    _translateModifier(key, context) {
        return this._modifierHelper(key, 'modifiers', context);
    }

    _translateFunctionModifier(key, context) {
        return this._modifierHelper(key, 'function', context);
    }

    application(type, useLongFormat) {
        const applications = type.applications.slice(0);
        const context = new Context();
        const key = `application.${getApplicationKey(type, applications)}`;
        const result = new Result();

        addModifiers(this, context, result, type, useLongFormat);

        context.type = this.type(type.expression).description;
        context.application = this.type(applications.pop()).description;
        context.keyApplication = applications.length ? this.type(applications.pop()).description : '';

        result.description = this._translate(key, context).trim();

        return result;
    }

    elements(type, useLongFormat) {
        const context = new Context();
        const items = type.elements.slice(0);
        const result = new Result();

        addModifiers(this, context, result, type, useLongFormat);
        result.description = this._combineMultiple(items, context, 'union', 'element');

        return result;
    }

    new(funcNew) {
        const context = new Context({'functionNew': this.type(funcNew).description});
        const key = funcNew ? 'new' : '';

        return this._translateFunctionModifier(key, context);
    }

    nullable(nullable) {
        let key;

        switch (nullable) {
            case true:
                key = 'nullable';
                break;

            case false:
                key = 'nonNullable';
                break;

            default:
                key = '';
        }

        return this._translateModifier(key);
    }

    optional(optional) {
        const key = (optional === true) ? 'optional' : '';

        return this._translateModifier(key);
    }

    repeatable(repeatable) {
        const key = (repeatable === true) ? 'repeatable' : '';

        return this._translateModifier(key);
    }

    _combineMultiple(items, context, keyName, contextName) {
        const result = new Result();
        const self = this;
        let strings;

        strings = typeof items[0] === 'string' ?
            items.slice(0) :
            items.map(item => self.type(item).description);

        switch (strings.length) {
            case 0:
                // falls through
            case 1:
                context[contextName] = strings[0] || '';
                result.description = this._translate(`${keyName}.first.one`, context);
                break;
            case 2:
                strings.forEach((item, idx) => {
                    const key = `${keyName + (idx === 0 ? '.first' : '.last' )}.two`;

                    context[contextName] = item;
                    result.description += self._translate(key, context);
                });
                break;
            default:
                result.description = strings.reduce(reduceMultiple.bind(null, context, keyName,
                    contextName, this._translate.bind(this)), '');
        }

        return result.description.trim();
    }

    /* eslint-enable no-unused-vars */

    params(params, functionContext) {
        const context = new Context();
        const result = new Result();
        const self = this;
        let strings;

        // TODO: this hardcodes the order and placement of functionNew and functionThis; need to move
        // this to the template (and also track whether to put a comma after the last modifier)
        functionContext = functionContext || {};
        params = params || [];
        strings = params.map(param => self.type(param).description);

        if (functionContext.functionThis) {
            strings.unshift(functionContext.functionThis);
        }
        if (functionContext.functionNew) {
            strings.unshift(functionContext.functionNew);
        }
        result.description = this._combineMultiple(strings, context, 'params', 'param');

        return result;
    }

    this(funcThis) {
        const context = new Context({'functionThis': this.type(funcThis).description});
        const key = funcThis ? 'this' : '';

        return this._translateFunctionModifier(key, context);
    }

    type(type, useLongFormat) {
        let result = new Result();

        if (useLongFormat === undefined) {
            useLongFormat = this._useLongFormat;
        }
        // ensure we don't use the long format for inner types
        this._useLongFormat = false;

        if (!type) {
            return result;
        }

        switch (type.type) {
            case Types.AllLiteral:
                result = this._stringify(type, this._translate('all'), useLongFormat);
                break;
            case Types.FunctionType:
                result = this._signature(type, useLongFormat);
                break;
            case Types.NameExpression:
                result = this._stringify(type, null, useLongFormat);
                break;
            case Types.NullLiteral:
                result = this._stringify(type, this._translate('null'), useLongFormat);
                break;
            case Types.RecordType:
                result = this._record(type, useLongFormat);
                break;
            case Types.TypeApplication:
                result = this.application(type, useLongFormat);
                break;
            case Types.TypeUnion:
                result = this.elements(type, useLongFormat);
                break;
            case Types.UndefinedLiteral:
                result = this._stringify(type, this._translate('undefined'), useLongFormat);
                break;
            case Types.UnknownLiteral:
                result = this._stringify(type, this._translate('unknown'), useLongFormat);
                break;
            default:
                throw new Error(`Unknown type: ${JSON.stringify(type)}`);
        }

        return result;
    }

    _record(type, useLongFormat) {
        const context = new Context();
        let items;
        const result = new Result();

        items = this._recordFields(type.fields);

        addModifiers(this, context, result, type, useLongFormat);
        result.description = this._combineMultiple(items, context, 'record', 'field');

        return result;
    }

    _recordFields(fields) {
        const context = new Context();
        let result = [];
        const self = this;

        if (!fields.length) {
            return result;
        }

        result = fields.map(field => {
            const key = `field.${field.value ? 'typed' : 'untyped'}`;

            context.name = self.type(field.key).description;
            if (field.value) {
                context.type = self.type(field.value).description;
            }

            return self._translate(key, context);
        });

        return result;
    }

    _addLinks(nameString) {
        let linkClass = '';
        const options = this._options;


        if (options.links && Object.prototype.hasOwnProperty.call(options.links, nameString)) {
            if (options.linkClass) {
                linkClass = ` class="${options.linkClass}"`;
            }

            nameString = `<a href="${options.links[nameString]}"${linkClass}>${nameString}</a>`;
        }

        return nameString;
    }

    result(type, useLongFormat) {
        const context = new Context();
        const key = `function.${modifierKind(useLongFormat)}.returns`;
        const result = new Result();

        context.type = this.type(type).description;

        addModifiers(this, context, result, type, useLongFormat);
        result.description = this._translate(key, context);

        return result;
    }

    _signature(type, useLongFormat) {
        const context = new Context();
        const kind = modifierKind(useLongFormat);
        const result = new Result();
        let returns;

        addModifiers(this, context, result, type, useLongFormat);
        addFunctionModifiers(this, context, result, type, useLongFormat);

        context.functionParams = this.params(type.params || [], context).description;

        if (type.result) {
            returns = this.result(type.result, useLongFormat);
            if (useLongFormat) {
                result.returns = returns.description;
            } else {
                context.functionReturns = returns.description;
            }
        }

        result.description += this._translate(`function.${kind}.signature`, context).trim();

        return result;
    }
}

module.exports = (type, options) => {
    const simple = new Describer(options).type(type, false);
    const extended = new Describer(options).type(type);

    [simple, extended].forEach(result => {
        result.description = collapseSpaces(result.description.trim());
    });

    return {
        simple: simple.description,
        extended
    };
};
