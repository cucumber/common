const _ = require('lodash');

// JSON schema types
const ARRAY = 'array';
const BOOLEAN = 'boolean';
const OBJECT = 'object';
const STRING = 'string';

const BOOLEAN_SCHEMA = {
    type: BOOLEAN
};
const STRING_SCHEMA = {
    type: STRING
};

const TYPES = require('./types');
const TYPE_NAMES = _.values(TYPES);

module.exports = {
    type: OBJECT,
    additionalProperties: false,
    properties: {
        type: {
            type: STRING,
            enum: TYPE_NAMES
        },

        // field type
        key: { '$ref': '#' },
        value: { '$ref': '#' },

        // function type
        params: {
            type: ARRAY,
            items: { '$ref': '#' }
        },
        'new': { '$ref': '#' },
        'this': { '$ref': '#' },
        result: {'$ref': '#' },

        // name expression
        name: STRING_SCHEMA,

        // record type
        fields: {
            type: ARRAY,
            items: { '$ref': '#' }
        },

        // type application
        expression: { '$ref': '#' },
        applications: {
            type: ARRAY,
            minItems: 1,
            maxItems: 2,
            items: { '$ref': '#' }
        },

        // type union
        elements: {
            type: ARRAY,
            minItems: 1,
            items: { '$ref': '#' }
        },

        optional: BOOLEAN_SCHEMA,
        nullable: BOOLEAN_SCHEMA,
        repeatable: BOOLEAN_SCHEMA,
        reservedWord: BOOLEAN_SCHEMA
    },
    required: ['type']
};
