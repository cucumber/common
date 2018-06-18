/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.cucumber = (function() {

    /**
     * Namespace cucumber.
     * @exports cucumber
     * @namespace
     */
    var cucumber = {};

    cucumber.messages = (function() {

        /**
         * Namespace messages.
         * @memberof cucumber
         * @namespace
         */
        var messages = {};

        messages.Location = (function() {

            /**
             * Properties of a Location.
             * @memberof cucumber.messages
             * @interface ILocation
             * @property {number|null} [line] Location line
             * @property {number|null} [column] Location column
             */

            /**
             * Constructs a new Location.
             * @memberof cucumber.messages
             * @classdesc Represents a Location.
             * @implements ILocation
             * @constructor
             * @param {cucumber.messages.ILocation=} [properties] Properties to set
             */
            function Location(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Location line.
             * @member {number} line
             * @memberof cucumber.messages.Location
             * @instance
             */
            Location.prototype.line = 0;

            /**
             * Location column.
             * @member {number} column
             * @memberof cucumber.messages.Location
             * @instance
             */
            Location.prototype.column = 0;

            /**
             * Creates a new Location instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.Location
             * @static
             * @param {cucumber.messages.ILocation=} [properties] Properties to set
             * @returns {cucumber.messages.Location} Location instance
             */
            Location.create = function create(properties) {
                return new Location(properties);
            };

            /**
             * Encodes the specified Location message. Does not implicitly {@link cucumber.messages.Location.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.Location
             * @static
             * @param {cucumber.messages.ILocation} message Location message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Location.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.line != null && message.hasOwnProperty("line"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.line);
                if (message.column != null && message.hasOwnProperty("column"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.column);
                return writer;
            };

            /**
             * Encodes the specified Location message, length delimited. Does not implicitly {@link cucumber.messages.Location.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.Location
             * @static
             * @param {cucumber.messages.ILocation} message Location message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Location.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Location message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.Location
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.Location} Location
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Location.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.Location();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.line = reader.uint32();
                        break;
                    case 2:
                        message.column = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Location message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.Location
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.Location} Location
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Location.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Location message.
             * @function verify
             * @memberof cucumber.messages.Location
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Location.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.line != null && message.hasOwnProperty("line"))
                    if (!$util.isInteger(message.line))
                        return "line: integer expected";
                if (message.column != null && message.hasOwnProperty("column"))
                    if (!$util.isInteger(message.column))
                        return "column: integer expected";
                return null;
            };

            /**
             * Creates a Location message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.Location
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.Location} Location
             */
            Location.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.Location)
                    return object;
                var message = new $root.cucumber.messages.Location();
                if (object.line != null)
                    message.line = object.line >>> 0;
                if (object.column != null)
                    message.column = object.column >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a Location message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.Location
             * @static
             * @param {cucumber.messages.Location} message Location
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Location.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.line = 0;
                    object.column = 0;
                }
                if (message.line != null && message.hasOwnProperty("line"))
                    object.line = message.line;
                if (message.column != null && message.hasOwnProperty("column"))
                    object.column = message.column;
                return object;
            };

            /**
             * Converts this Location to JSON.
             * @function toJSON
             * @memberof cucumber.messages.Location
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Location.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Location;
        })();

        messages.Attachment = (function() {

            /**
             * Properties of an Attachment.
             * @memberof cucumber.messages
             * @interface IAttachment
             * @property {cucumber.messages.ISourceReference|null} [source] Attachment source
             * @property {string|null} [data] Attachment data
             * @property {cucumber.messages.IMedia|null} [media] Attachment media
             */

            /**
             * Constructs a new Attachment.
             * @memberof cucumber.messages
             * @classdesc Represents an Attachment.
             * @implements IAttachment
             * @constructor
             * @param {cucumber.messages.IAttachment=} [properties] Properties to set
             */
            function Attachment(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Attachment source.
             * @member {cucumber.messages.ISourceReference|null|undefined} source
             * @memberof cucumber.messages.Attachment
             * @instance
             */
            Attachment.prototype.source = null;

            /**
             * Attachment data.
             * @member {string} data
             * @memberof cucumber.messages.Attachment
             * @instance
             */
            Attachment.prototype.data = "";

            /**
             * Attachment media.
             * @member {cucumber.messages.IMedia|null|undefined} media
             * @memberof cucumber.messages.Attachment
             * @instance
             */
            Attachment.prototype.media = null;

            /**
             * Creates a new Attachment instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.Attachment
             * @static
             * @param {cucumber.messages.IAttachment=} [properties] Properties to set
             * @returns {cucumber.messages.Attachment} Attachment instance
             */
            Attachment.create = function create(properties) {
                return new Attachment(properties);
            };

            /**
             * Encodes the specified Attachment message. Does not implicitly {@link cucumber.messages.Attachment.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.Attachment
             * @static
             * @param {cucumber.messages.IAttachment} message Attachment message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Attachment.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.source != null && message.hasOwnProperty("source"))
                    $root.cucumber.messages.SourceReference.encode(message.source, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.data != null && message.hasOwnProperty("data"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
                if (message.media != null && message.hasOwnProperty("media"))
                    $root.cucumber.messages.Media.encode(message.media, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Attachment message, length delimited. Does not implicitly {@link cucumber.messages.Attachment.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.Attachment
             * @static
             * @param {cucumber.messages.IAttachment} message Attachment message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Attachment.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Attachment message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.Attachment
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.Attachment} Attachment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Attachment.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.Attachment();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.source = $root.cucumber.messages.SourceReference.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.data = reader.string();
                        break;
                    case 3:
                        message.media = $root.cucumber.messages.Media.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Attachment message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.Attachment
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.Attachment} Attachment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Attachment.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Attachment message.
             * @function verify
             * @memberof cucumber.messages.Attachment
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Attachment.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.source != null && message.hasOwnProperty("source")) {
                    var error = $root.cucumber.messages.SourceReference.verify(message.source);
                    if (error)
                        return "source." + error;
                }
                if (message.data != null && message.hasOwnProperty("data"))
                    if (!$util.isString(message.data))
                        return "data: string expected";
                if (message.media != null && message.hasOwnProperty("media")) {
                    var error = $root.cucumber.messages.Media.verify(message.media);
                    if (error)
                        return "media." + error;
                }
                return null;
            };

            /**
             * Creates an Attachment message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.Attachment
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.Attachment} Attachment
             */
            Attachment.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.Attachment)
                    return object;
                var message = new $root.cucumber.messages.Attachment();
                if (object.source != null) {
                    if (typeof object.source !== "object")
                        throw TypeError(".cucumber.messages.Attachment.source: object expected");
                    message.source = $root.cucumber.messages.SourceReference.fromObject(object.source);
                }
                if (object.data != null)
                    message.data = String(object.data);
                if (object.media != null) {
                    if (typeof object.media !== "object")
                        throw TypeError(".cucumber.messages.Attachment.media: object expected");
                    message.media = $root.cucumber.messages.Media.fromObject(object.media);
                }
                return message;
            };

            /**
             * Creates a plain object from an Attachment message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.Attachment
             * @static
             * @param {cucumber.messages.Attachment} message Attachment
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Attachment.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.source = null;
                    object.data = "";
                    object.media = null;
                }
                if (message.source != null && message.hasOwnProperty("source"))
                    object.source = $root.cucumber.messages.SourceReference.toObject(message.source, options);
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = message.data;
                if (message.media != null && message.hasOwnProperty("media"))
                    object.media = $root.cucumber.messages.Media.toObject(message.media, options);
                return object;
            };

            /**
             * Converts this Attachment to JSON.
             * @function toJSON
             * @memberof cucumber.messages.Attachment
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Attachment.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Attachment;
        })();

        messages.Media = (function() {

            /**
             * Properties of a Media.
             * @memberof cucumber.messages
             * @interface IMedia
             * @property {string|null} [encoding] Media encoding
             * @property {string|null} [contentType] Media contentType
             */

            /**
             * Constructs a new Media.
             * @memberof cucumber.messages
             * @classdesc Represents a Media.
             * @implements IMedia
             * @constructor
             * @param {cucumber.messages.IMedia=} [properties] Properties to set
             */
            function Media(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Media encoding.
             * @member {string} encoding
             * @memberof cucumber.messages.Media
             * @instance
             */
            Media.prototype.encoding = "";

            /**
             * Media contentType.
             * @member {string} contentType
             * @memberof cucumber.messages.Media
             * @instance
             */
            Media.prototype.contentType = "";

            /**
             * Creates a new Media instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.Media
             * @static
             * @param {cucumber.messages.IMedia=} [properties] Properties to set
             * @returns {cucumber.messages.Media} Media instance
             */
            Media.create = function create(properties) {
                return new Media(properties);
            };

            /**
             * Encodes the specified Media message. Does not implicitly {@link cucumber.messages.Media.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.Media
             * @static
             * @param {cucumber.messages.IMedia} message Media message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Media.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.encoding != null && message.hasOwnProperty("encoding"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.encoding);
                if (message.contentType != null && message.hasOwnProperty("contentType"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.contentType);
                return writer;
            };

            /**
             * Encodes the specified Media message, length delimited. Does not implicitly {@link cucumber.messages.Media.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.Media
             * @static
             * @param {cucumber.messages.IMedia} message Media message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Media.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Media message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.Media
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.Media} Media
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Media.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.Media();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.encoding = reader.string();
                        break;
                    case 2:
                        message.contentType = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Media message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.Media
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.Media} Media
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Media.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Media message.
             * @function verify
             * @memberof cucumber.messages.Media
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Media.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.encoding != null && message.hasOwnProperty("encoding"))
                    if (!$util.isString(message.encoding))
                        return "encoding: string expected";
                if (message.contentType != null && message.hasOwnProperty("contentType"))
                    if (!$util.isString(message.contentType))
                        return "contentType: string expected";
                return null;
            };

            /**
             * Creates a Media message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.Media
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.Media} Media
             */
            Media.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.Media)
                    return object;
                var message = new $root.cucumber.messages.Media();
                if (object.encoding != null)
                    message.encoding = String(object.encoding);
                if (object.contentType != null)
                    message.contentType = String(object.contentType);
                return message;
            };

            /**
             * Creates a plain object from a Media message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.Media
             * @static
             * @param {cucumber.messages.Media} message Media
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Media.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.encoding = "";
                    object.contentType = "";
                }
                if (message.encoding != null && message.hasOwnProperty("encoding"))
                    object.encoding = message.encoding;
                if (message.contentType != null && message.hasOwnProperty("contentType"))
                    object.contentType = message.contentType;
                return object;
            };

            /**
             * Converts this Media to JSON.
             * @function toJSON
             * @memberof cucumber.messages.Media
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Media.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Media;
        })();

        messages.Source = (function() {

            /**
             * Properties of a Source.
             * @memberof cucumber.messages
             * @interface ISource
             * @property {string|null} [uri] Source uri
             * @property {string|null} [data] Source data
             * @property {cucumber.messages.IMedia|null} [media] Source media
             */

            /**
             * Constructs a new Source.
             * @memberof cucumber.messages
             * @classdesc Represents a Source.
             * @implements ISource
             * @constructor
             * @param {cucumber.messages.ISource=} [properties] Properties to set
             */
            function Source(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Source uri.
             * @member {string} uri
             * @memberof cucumber.messages.Source
             * @instance
             */
            Source.prototype.uri = "";

            /**
             * Source data.
             * @member {string} data
             * @memberof cucumber.messages.Source
             * @instance
             */
            Source.prototype.data = "";

            /**
             * Source media.
             * @member {cucumber.messages.IMedia|null|undefined} media
             * @memberof cucumber.messages.Source
             * @instance
             */
            Source.prototype.media = null;

            /**
             * Creates a new Source instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.Source
             * @static
             * @param {cucumber.messages.ISource=} [properties] Properties to set
             * @returns {cucumber.messages.Source} Source instance
             */
            Source.create = function create(properties) {
                return new Source(properties);
            };

            /**
             * Encodes the specified Source message. Does not implicitly {@link cucumber.messages.Source.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.Source
             * @static
             * @param {cucumber.messages.ISource} message Source message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Source.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uri != null && message.hasOwnProperty("uri"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.uri);
                if (message.data != null && message.hasOwnProperty("data"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
                if (message.media != null && message.hasOwnProperty("media"))
                    $root.cucumber.messages.Media.encode(message.media, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Source message, length delimited. Does not implicitly {@link cucumber.messages.Source.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.Source
             * @static
             * @param {cucumber.messages.ISource} message Source message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Source.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Source message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.Source
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.Source} Source
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Source.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.Source();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uri = reader.string();
                        break;
                    case 2:
                        message.data = reader.string();
                        break;
                    case 3:
                        message.media = $root.cucumber.messages.Media.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Source message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.Source
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.Source} Source
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Source.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Source message.
             * @function verify
             * @memberof cucumber.messages.Source
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Source.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uri != null && message.hasOwnProperty("uri"))
                    if (!$util.isString(message.uri))
                        return "uri: string expected";
                if (message.data != null && message.hasOwnProperty("data"))
                    if (!$util.isString(message.data))
                        return "data: string expected";
                if (message.media != null && message.hasOwnProperty("media")) {
                    var error = $root.cucumber.messages.Media.verify(message.media);
                    if (error)
                        return "media." + error;
                }
                return null;
            };

            /**
             * Creates a Source message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.Source
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.Source} Source
             */
            Source.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.Source)
                    return object;
                var message = new $root.cucumber.messages.Source();
                if (object.uri != null)
                    message.uri = String(object.uri);
                if (object.data != null)
                    message.data = String(object.data);
                if (object.media != null) {
                    if (typeof object.media !== "object")
                        throw TypeError(".cucumber.messages.Source.media: object expected");
                    message.media = $root.cucumber.messages.Media.fromObject(object.media);
                }
                return message;
            };

            /**
             * Creates a plain object from a Source message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.Source
             * @static
             * @param {cucumber.messages.Source} message Source
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Source.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.uri = "";
                    object.data = "";
                    object.media = null;
                }
                if (message.uri != null && message.hasOwnProperty("uri"))
                    object.uri = message.uri;
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = message.data;
                if (message.media != null && message.hasOwnProperty("media"))
                    object.media = $root.cucumber.messages.Media.toObject(message.media, options);
                return object;
            };

            /**
             * Converts this Source to JSON.
             * @function toJSON
             * @memberof cucumber.messages.Source
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Source.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Source;
        })();

        messages.SourceReference = (function() {

            /**
             * Properties of a SourceReference.
             * @memberof cucumber.messages
             * @interface ISourceReference
             * @property {string|null} [uri] SourceReference uri
             * @property {cucumber.messages.ILocation|null} [location] SourceReference location
             */

            /**
             * Constructs a new SourceReference.
             * @memberof cucumber.messages
             * @classdesc Represents a SourceReference.
             * @implements ISourceReference
             * @constructor
             * @param {cucumber.messages.ISourceReference=} [properties] Properties to set
             */
            function SourceReference(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SourceReference uri.
             * @member {string} uri
             * @memberof cucumber.messages.SourceReference
             * @instance
             */
            SourceReference.prototype.uri = "";

            /**
             * SourceReference location.
             * @member {cucumber.messages.ILocation|null|undefined} location
             * @memberof cucumber.messages.SourceReference
             * @instance
             */
            SourceReference.prototype.location = null;

            /**
             * Creates a new SourceReference instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.SourceReference
             * @static
             * @param {cucumber.messages.ISourceReference=} [properties] Properties to set
             * @returns {cucumber.messages.SourceReference} SourceReference instance
             */
            SourceReference.create = function create(properties) {
                return new SourceReference(properties);
            };

            /**
             * Encodes the specified SourceReference message. Does not implicitly {@link cucumber.messages.SourceReference.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.SourceReference
             * @static
             * @param {cucumber.messages.ISourceReference} message SourceReference message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SourceReference.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uri != null && message.hasOwnProperty("uri"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.uri);
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified SourceReference message, length delimited. Does not implicitly {@link cucumber.messages.SourceReference.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.SourceReference
             * @static
             * @param {cucumber.messages.ISourceReference} message SourceReference message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SourceReference.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SourceReference message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.SourceReference
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.SourceReference} SourceReference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SourceReference.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.SourceReference();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uri = reader.string();
                        break;
                    case 2:
                        message.location = $root.cucumber.messages.Location.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SourceReference message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.SourceReference
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.SourceReference} SourceReference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SourceReference.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SourceReference message.
             * @function verify
             * @memberof cucumber.messages.SourceReference
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SourceReference.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uri != null && message.hasOwnProperty("uri"))
                    if (!$util.isString(message.uri))
                        return "uri: string expected";
                if (message.location != null && message.hasOwnProperty("location")) {
                    var error = $root.cucumber.messages.Location.verify(message.location);
                    if (error)
                        return "location." + error;
                }
                return null;
            };

            /**
             * Creates a SourceReference message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.SourceReference
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.SourceReference} SourceReference
             */
            SourceReference.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.SourceReference)
                    return object;
                var message = new $root.cucumber.messages.SourceReference();
                if (object.uri != null)
                    message.uri = String(object.uri);
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".cucumber.messages.SourceReference.location: object expected");
                    message.location = $root.cucumber.messages.Location.fromObject(object.location);
                }
                return message;
            };

            /**
             * Creates a plain object from a SourceReference message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.SourceReference
             * @static
             * @param {cucumber.messages.SourceReference} message SourceReference
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SourceReference.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.uri = "";
                    object.location = null;
                }
                if (message.uri != null && message.hasOwnProperty("uri"))
                    object.uri = message.uri;
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.cucumber.messages.Location.toObject(message.location, options);
                return object;
            };

            /**
             * Converts this SourceReference to JSON.
             * @function toJSON
             * @memberof cucumber.messages.SourceReference
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SourceReference.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return SourceReference;
        })();

        messages.GherkinDocument = (function() {

            /**
             * Properties of a GherkinDocument.
             * @memberof cucumber.messages
             * @interface IGherkinDocument
             * @property {string|null} [uri] GherkinDocument uri
             * @property {cucumber.messages.IFeature|null} [feature] GherkinDocument feature
             * @property {Array.<cucumber.messages.IComment>|null} [comments] GherkinDocument comments
             */

            /**
             * Constructs a new GherkinDocument.
             * @memberof cucumber.messages
             * @classdesc Represents a GherkinDocument.
             * @implements IGherkinDocument
             * @constructor
             * @param {cucumber.messages.IGherkinDocument=} [properties] Properties to set
             */
            function GherkinDocument(properties) {
                this.comments = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GherkinDocument uri.
             * @member {string} uri
             * @memberof cucumber.messages.GherkinDocument
             * @instance
             */
            GherkinDocument.prototype.uri = "";

            /**
             * GherkinDocument feature.
             * @member {cucumber.messages.IFeature|null|undefined} feature
             * @memberof cucumber.messages.GherkinDocument
             * @instance
             */
            GherkinDocument.prototype.feature = null;

            /**
             * GherkinDocument comments.
             * @member {Array.<cucumber.messages.IComment>} comments
             * @memberof cucumber.messages.GherkinDocument
             * @instance
             */
            GherkinDocument.prototype.comments = $util.emptyArray;

            /**
             * Creates a new GherkinDocument instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.GherkinDocument
             * @static
             * @param {cucumber.messages.IGherkinDocument=} [properties] Properties to set
             * @returns {cucumber.messages.GherkinDocument} GherkinDocument instance
             */
            GherkinDocument.create = function create(properties) {
                return new GherkinDocument(properties);
            };

            /**
             * Encodes the specified GherkinDocument message. Does not implicitly {@link cucumber.messages.GherkinDocument.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.GherkinDocument
             * @static
             * @param {cucumber.messages.IGherkinDocument} message GherkinDocument message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GherkinDocument.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uri != null && message.hasOwnProperty("uri"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.uri);
                if (message.feature != null && message.hasOwnProperty("feature"))
                    $root.cucumber.messages.Feature.encode(message.feature, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.comments != null && message.comments.length)
                    for (var i = 0; i < message.comments.length; ++i)
                        $root.cucumber.messages.Comment.encode(message.comments[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified GherkinDocument message, length delimited. Does not implicitly {@link cucumber.messages.GherkinDocument.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.GherkinDocument
             * @static
             * @param {cucumber.messages.IGherkinDocument} message GherkinDocument message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GherkinDocument.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GherkinDocument message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.GherkinDocument
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.GherkinDocument} GherkinDocument
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GherkinDocument.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.GherkinDocument();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uri = reader.string();
                        break;
                    case 2:
                        message.feature = $root.cucumber.messages.Feature.decode(reader, reader.uint32());
                        break;
                    case 3:
                        if (!(message.comments && message.comments.length))
                            message.comments = [];
                        message.comments.push($root.cucumber.messages.Comment.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GherkinDocument message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.GherkinDocument
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.GherkinDocument} GherkinDocument
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GherkinDocument.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GherkinDocument message.
             * @function verify
             * @memberof cucumber.messages.GherkinDocument
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GherkinDocument.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uri != null && message.hasOwnProperty("uri"))
                    if (!$util.isString(message.uri))
                        return "uri: string expected";
                if (message.feature != null && message.hasOwnProperty("feature")) {
                    var error = $root.cucumber.messages.Feature.verify(message.feature);
                    if (error)
                        return "feature." + error;
                }
                if (message.comments != null && message.hasOwnProperty("comments")) {
                    if (!Array.isArray(message.comments))
                        return "comments: array expected";
                    for (var i = 0; i < message.comments.length; ++i) {
                        var error = $root.cucumber.messages.Comment.verify(message.comments[i]);
                        if (error)
                            return "comments." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a GherkinDocument message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.GherkinDocument
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.GherkinDocument} GherkinDocument
             */
            GherkinDocument.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.GherkinDocument)
                    return object;
                var message = new $root.cucumber.messages.GherkinDocument();
                if (object.uri != null)
                    message.uri = String(object.uri);
                if (object.feature != null) {
                    if (typeof object.feature !== "object")
                        throw TypeError(".cucumber.messages.GherkinDocument.feature: object expected");
                    message.feature = $root.cucumber.messages.Feature.fromObject(object.feature);
                }
                if (object.comments) {
                    if (!Array.isArray(object.comments))
                        throw TypeError(".cucumber.messages.GherkinDocument.comments: array expected");
                    message.comments = [];
                    for (var i = 0; i < object.comments.length; ++i) {
                        if (typeof object.comments[i] !== "object")
                            throw TypeError(".cucumber.messages.GherkinDocument.comments: object expected");
                        message.comments[i] = $root.cucumber.messages.Comment.fromObject(object.comments[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a GherkinDocument message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.GherkinDocument
             * @static
             * @param {cucumber.messages.GherkinDocument} message GherkinDocument
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GherkinDocument.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.comments = [];
                if (options.defaults) {
                    object.uri = "";
                    object.feature = null;
                }
                if (message.uri != null && message.hasOwnProperty("uri"))
                    object.uri = message.uri;
                if (message.feature != null && message.hasOwnProperty("feature"))
                    object.feature = $root.cucumber.messages.Feature.toObject(message.feature, options);
                if (message.comments && message.comments.length) {
                    object.comments = [];
                    for (var j = 0; j < message.comments.length; ++j)
                        object.comments[j] = $root.cucumber.messages.Comment.toObject(message.comments[j], options);
                }
                return object;
            };

            /**
             * Converts this GherkinDocument to JSON.
             * @function toJSON
             * @memberof cucumber.messages.GherkinDocument
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GherkinDocument.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GherkinDocument;
        })();

        messages.Feature = (function() {

            /**
             * Properties of a Feature.
             * @memberof cucumber.messages
             * @interface IFeature
             * @property {cucumber.messages.ILocation|null} [location] Feature location
             * @property {Array.<cucumber.messages.ITag>|null} [tags] Feature tags
             * @property {string|null} [language] Feature language
             * @property {string|null} [keyword] Feature keyword
             * @property {string|null} [name] Feature name
             * @property {string|null} [description] Feature description
             * @property {Array.<cucumber.messages.IFeatureChild>|null} [children] Feature children
             */

            /**
             * Constructs a new Feature.
             * @memberof cucumber.messages
             * @classdesc Represents a Feature.
             * @implements IFeature
             * @constructor
             * @param {cucumber.messages.IFeature=} [properties] Properties to set
             */
            function Feature(properties) {
                this.tags = [];
                this.children = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Feature location.
             * @member {cucumber.messages.ILocation|null|undefined} location
             * @memberof cucumber.messages.Feature
             * @instance
             */
            Feature.prototype.location = null;

            /**
             * Feature tags.
             * @member {Array.<cucumber.messages.ITag>} tags
             * @memberof cucumber.messages.Feature
             * @instance
             */
            Feature.prototype.tags = $util.emptyArray;

            /**
             * Feature language.
             * @member {string} language
             * @memberof cucumber.messages.Feature
             * @instance
             */
            Feature.prototype.language = "";

            /**
             * Feature keyword.
             * @member {string} keyword
             * @memberof cucumber.messages.Feature
             * @instance
             */
            Feature.prototype.keyword = "";

            /**
             * Feature name.
             * @member {string} name
             * @memberof cucumber.messages.Feature
             * @instance
             */
            Feature.prototype.name = "";

            /**
             * Feature description.
             * @member {string} description
             * @memberof cucumber.messages.Feature
             * @instance
             */
            Feature.prototype.description = "";

            /**
             * Feature children.
             * @member {Array.<cucumber.messages.IFeatureChild>} children
             * @memberof cucumber.messages.Feature
             * @instance
             */
            Feature.prototype.children = $util.emptyArray;

            /**
             * Creates a new Feature instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.Feature
             * @static
             * @param {cucumber.messages.IFeature=} [properties] Properties to set
             * @returns {cucumber.messages.Feature} Feature instance
             */
            Feature.create = function create(properties) {
                return new Feature(properties);
            };

            /**
             * Encodes the specified Feature message. Does not implicitly {@link cucumber.messages.Feature.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.Feature
             * @static
             * @param {cucumber.messages.IFeature} message Feature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Feature.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.tags != null && message.tags.length)
                    for (var i = 0; i < message.tags.length; ++i)
                        $root.cucumber.messages.Tag.encode(message.tags[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.language != null && message.hasOwnProperty("language"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.language);
                if (message.keyword != null && message.hasOwnProperty("keyword"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.keyword);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.name);
                if (message.description != null && message.hasOwnProperty("description"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.description);
                if (message.children != null && message.children.length)
                    for (var i = 0; i < message.children.length; ++i)
                        $root.cucumber.messages.FeatureChild.encode(message.children[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Feature message, length delimited. Does not implicitly {@link cucumber.messages.Feature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.Feature
             * @static
             * @param {cucumber.messages.IFeature} message Feature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Feature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Feature message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.Feature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.Feature} Feature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Feature.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.Feature();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.location = $root.cucumber.messages.Location.decode(reader, reader.uint32());
                        break;
                    case 2:
                        if (!(message.tags && message.tags.length))
                            message.tags = [];
                        message.tags.push($root.cucumber.messages.Tag.decode(reader, reader.uint32()));
                        break;
                    case 3:
                        message.language = reader.string();
                        break;
                    case 4:
                        message.keyword = reader.string();
                        break;
                    case 5:
                        message.name = reader.string();
                        break;
                    case 6:
                        message.description = reader.string();
                        break;
                    case 7:
                        if (!(message.children && message.children.length))
                            message.children = [];
                        message.children.push($root.cucumber.messages.FeatureChild.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Feature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.Feature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.Feature} Feature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Feature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Feature message.
             * @function verify
             * @memberof cucumber.messages.Feature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Feature.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.location != null && message.hasOwnProperty("location")) {
                    var error = $root.cucumber.messages.Location.verify(message.location);
                    if (error)
                        return "location." + error;
                }
                if (message.tags != null && message.hasOwnProperty("tags")) {
                    if (!Array.isArray(message.tags))
                        return "tags: array expected";
                    for (var i = 0; i < message.tags.length; ++i) {
                        var error = $root.cucumber.messages.Tag.verify(message.tags[i]);
                        if (error)
                            return "tags." + error;
                    }
                }
                if (message.language != null && message.hasOwnProperty("language"))
                    if (!$util.isString(message.language))
                        return "language: string expected";
                if (message.keyword != null && message.hasOwnProperty("keyword"))
                    if (!$util.isString(message.keyword))
                        return "keyword: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.description != null && message.hasOwnProperty("description"))
                    if (!$util.isString(message.description))
                        return "description: string expected";
                if (message.children != null && message.hasOwnProperty("children")) {
                    if (!Array.isArray(message.children))
                        return "children: array expected";
                    for (var i = 0; i < message.children.length; ++i) {
                        var error = $root.cucumber.messages.FeatureChild.verify(message.children[i]);
                        if (error)
                            return "children." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Feature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.Feature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.Feature} Feature
             */
            Feature.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.Feature)
                    return object;
                var message = new $root.cucumber.messages.Feature();
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".cucumber.messages.Feature.location: object expected");
                    message.location = $root.cucumber.messages.Location.fromObject(object.location);
                }
                if (object.tags) {
                    if (!Array.isArray(object.tags))
                        throw TypeError(".cucumber.messages.Feature.tags: array expected");
                    message.tags = [];
                    for (var i = 0; i < object.tags.length; ++i) {
                        if (typeof object.tags[i] !== "object")
                            throw TypeError(".cucumber.messages.Feature.tags: object expected");
                        message.tags[i] = $root.cucumber.messages.Tag.fromObject(object.tags[i]);
                    }
                }
                if (object.language != null)
                    message.language = String(object.language);
                if (object.keyword != null)
                    message.keyword = String(object.keyword);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.description != null)
                    message.description = String(object.description);
                if (object.children) {
                    if (!Array.isArray(object.children))
                        throw TypeError(".cucumber.messages.Feature.children: array expected");
                    message.children = [];
                    for (var i = 0; i < object.children.length; ++i) {
                        if (typeof object.children[i] !== "object")
                            throw TypeError(".cucumber.messages.Feature.children: object expected");
                        message.children[i] = $root.cucumber.messages.FeatureChild.fromObject(object.children[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Feature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.Feature
             * @static
             * @param {cucumber.messages.Feature} message Feature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Feature.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.tags = [];
                    object.children = [];
                }
                if (options.defaults) {
                    object.location = null;
                    object.language = "";
                    object.keyword = "";
                    object.name = "";
                    object.description = "";
                }
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.cucumber.messages.Location.toObject(message.location, options);
                if (message.tags && message.tags.length) {
                    object.tags = [];
                    for (var j = 0; j < message.tags.length; ++j)
                        object.tags[j] = $root.cucumber.messages.Tag.toObject(message.tags[j], options);
                }
                if (message.language != null && message.hasOwnProperty("language"))
                    object.language = message.language;
                if (message.keyword != null && message.hasOwnProperty("keyword"))
                    object.keyword = message.keyword;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.description != null && message.hasOwnProperty("description"))
                    object.description = message.description;
                if (message.children && message.children.length) {
                    object.children = [];
                    for (var j = 0; j < message.children.length; ++j)
                        object.children[j] = $root.cucumber.messages.FeatureChild.toObject(message.children[j], options);
                }
                return object;
            };

            /**
             * Converts this Feature to JSON.
             * @function toJSON
             * @memberof cucumber.messages.Feature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Feature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Feature;
        })();

        messages.FeatureChild = (function() {

            /**
             * Properties of a FeatureChild.
             * @memberof cucumber.messages
             * @interface IFeatureChild
             * @property {cucumber.messages.IRule|null} [rule] FeatureChild rule
             * @property {cucumber.messages.IBackground|null} [background] FeatureChild background
             * @property {cucumber.messages.IScenario|null} [scenario] FeatureChild scenario
             */

            /**
             * Constructs a new FeatureChild.
             * @memberof cucumber.messages
             * @classdesc Represents a FeatureChild.
             * @implements IFeatureChild
             * @constructor
             * @param {cucumber.messages.IFeatureChild=} [properties] Properties to set
             */
            function FeatureChild(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FeatureChild rule.
             * @member {cucumber.messages.IRule|null|undefined} rule
             * @memberof cucumber.messages.FeatureChild
             * @instance
             */
            FeatureChild.prototype.rule = null;

            /**
             * FeatureChild background.
             * @member {cucumber.messages.IBackground|null|undefined} background
             * @memberof cucumber.messages.FeatureChild
             * @instance
             */
            FeatureChild.prototype.background = null;

            /**
             * FeatureChild scenario.
             * @member {cucumber.messages.IScenario|null|undefined} scenario
             * @memberof cucumber.messages.FeatureChild
             * @instance
             */
            FeatureChild.prototype.scenario = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * FeatureChild theValue.
             * @member {"rule"|"background"|"scenario"|undefined} theValue
             * @memberof cucumber.messages.FeatureChild
             * @instance
             */
            Object.defineProperty(FeatureChild.prototype, "theValue", {
                get: $util.oneOfGetter($oneOfFields = ["rule", "background", "scenario"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new FeatureChild instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.FeatureChild
             * @static
             * @param {cucumber.messages.IFeatureChild=} [properties] Properties to set
             * @returns {cucumber.messages.FeatureChild} FeatureChild instance
             */
            FeatureChild.create = function create(properties) {
                return new FeatureChild(properties);
            };

            /**
             * Encodes the specified FeatureChild message. Does not implicitly {@link cucumber.messages.FeatureChild.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.FeatureChild
             * @static
             * @param {cucumber.messages.IFeatureChild} message FeatureChild message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FeatureChild.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.rule != null && message.hasOwnProperty("rule"))
                    $root.cucumber.messages.Rule.encode(message.rule, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.background != null && message.hasOwnProperty("background"))
                    $root.cucumber.messages.Background.encode(message.background, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.scenario != null && message.hasOwnProperty("scenario"))
                    $root.cucumber.messages.Scenario.encode(message.scenario, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified FeatureChild message, length delimited. Does not implicitly {@link cucumber.messages.FeatureChild.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.FeatureChild
             * @static
             * @param {cucumber.messages.IFeatureChild} message FeatureChild message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FeatureChild.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FeatureChild message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.FeatureChild
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.FeatureChild} FeatureChild
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FeatureChild.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.FeatureChild();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.rule = $root.cucumber.messages.Rule.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.background = $root.cucumber.messages.Background.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.scenario = $root.cucumber.messages.Scenario.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a FeatureChild message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.FeatureChild
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.FeatureChild} FeatureChild
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FeatureChild.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a FeatureChild message.
             * @function verify
             * @memberof cucumber.messages.FeatureChild
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            FeatureChild.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.rule != null && message.hasOwnProperty("rule")) {
                    properties.theValue = 1;
                    {
                        var error = $root.cucumber.messages.Rule.verify(message.rule);
                        if (error)
                            return "rule." + error;
                    }
                }
                if (message.background != null && message.hasOwnProperty("background")) {
                    if (properties.theValue === 1)
                        return "theValue: multiple values";
                    properties.theValue = 1;
                    {
                        var error = $root.cucumber.messages.Background.verify(message.background);
                        if (error)
                            return "background." + error;
                    }
                }
                if (message.scenario != null && message.hasOwnProperty("scenario")) {
                    if (properties.theValue === 1)
                        return "theValue: multiple values";
                    properties.theValue = 1;
                    {
                        var error = $root.cucumber.messages.Scenario.verify(message.scenario);
                        if (error)
                            return "scenario." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a FeatureChild message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.FeatureChild
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.FeatureChild} FeatureChild
             */
            FeatureChild.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.FeatureChild)
                    return object;
                var message = new $root.cucumber.messages.FeatureChild();
                if (object.rule != null) {
                    if (typeof object.rule !== "object")
                        throw TypeError(".cucumber.messages.FeatureChild.rule: object expected");
                    message.rule = $root.cucumber.messages.Rule.fromObject(object.rule);
                }
                if (object.background != null) {
                    if (typeof object.background !== "object")
                        throw TypeError(".cucumber.messages.FeatureChild.background: object expected");
                    message.background = $root.cucumber.messages.Background.fromObject(object.background);
                }
                if (object.scenario != null) {
                    if (typeof object.scenario !== "object")
                        throw TypeError(".cucumber.messages.FeatureChild.scenario: object expected");
                    message.scenario = $root.cucumber.messages.Scenario.fromObject(object.scenario);
                }
                return message;
            };

            /**
             * Creates a plain object from a FeatureChild message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.FeatureChild
             * @static
             * @param {cucumber.messages.FeatureChild} message FeatureChild
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FeatureChild.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.rule != null && message.hasOwnProperty("rule")) {
                    object.rule = $root.cucumber.messages.Rule.toObject(message.rule, options);
                    if (options.oneofs)
                        object.theValue = "rule";
                }
                if (message.background != null && message.hasOwnProperty("background")) {
                    object.background = $root.cucumber.messages.Background.toObject(message.background, options);
                    if (options.oneofs)
                        object.theValue = "background";
                }
                if (message.scenario != null && message.hasOwnProperty("scenario")) {
                    object.scenario = $root.cucumber.messages.Scenario.toObject(message.scenario, options);
                    if (options.oneofs)
                        object.theValue = "scenario";
                }
                return object;
            };

            /**
             * Converts this FeatureChild to JSON.
             * @function toJSON
             * @memberof cucumber.messages.FeatureChild
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FeatureChild.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return FeatureChild;
        })();

        messages.Rule = (function() {

            /**
             * Properties of a Rule.
             * @memberof cucumber.messages
             * @interface IRule
             * @property {cucumber.messages.ILocation|null} [location] Rule location
             * @property {string|null} [keyword] Rule keyword
             * @property {string|null} [name] Rule name
             * @property {string|null} [description] Rule description
             * @property {Array.<cucumber.messages.IRuleChild>|null} [children] Rule children
             */

            /**
             * Constructs a new Rule.
             * @memberof cucumber.messages
             * @classdesc Represents a Rule.
             * @implements IRule
             * @constructor
             * @param {cucumber.messages.IRule=} [properties] Properties to set
             */
            function Rule(properties) {
                this.children = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Rule location.
             * @member {cucumber.messages.ILocation|null|undefined} location
             * @memberof cucumber.messages.Rule
             * @instance
             */
            Rule.prototype.location = null;

            /**
             * Rule keyword.
             * @member {string} keyword
             * @memberof cucumber.messages.Rule
             * @instance
             */
            Rule.prototype.keyword = "";

            /**
             * Rule name.
             * @member {string} name
             * @memberof cucumber.messages.Rule
             * @instance
             */
            Rule.prototype.name = "";

            /**
             * Rule description.
             * @member {string} description
             * @memberof cucumber.messages.Rule
             * @instance
             */
            Rule.prototype.description = "";

            /**
             * Rule children.
             * @member {Array.<cucumber.messages.IRuleChild>} children
             * @memberof cucumber.messages.Rule
             * @instance
             */
            Rule.prototype.children = $util.emptyArray;

            /**
             * Creates a new Rule instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.Rule
             * @static
             * @param {cucumber.messages.IRule=} [properties] Properties to set
             * @returns {cucumber.messages.Rule} Rule instance
             */
            Rule.create = function create(properties) {
                return new Rule(properties);
            };

            /**
             * Encodes the specified Rule message. Does not implicitly {@link cucumber.messages.Rule.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.Rule
             * @static
             * @param {cucumber.messages.IRule} message Rule message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Rule.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.keyword != null && message.hasOwnProperty("keyword"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.keyword);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                if (message.description != null && message.hasOwnProperty("description"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.description);
                if (message.children != null && message.children.length)
                    for (var i = 0; i < message.children.length; ++i)
                        $root.cucumber.messages.RuleChild.encode(message.children[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Rule message, length delimited. Does not implicitly {@link cucumber.messages.Rule.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.Rule
             * @static
             * @param {cucumber.messages.IRule} message Rule message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Rule.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Rule message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.Rule
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.Rule} Rule
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Rule.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.Rule();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.location = $root.cucumber.messages.Location.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.keyword = reader.string();
                        break;
                    case 3:
                        message.name = reader.string();
                        break;
                    case 4:
                        message.description = reader.string();
                        break;
                    case 5:
                        if (!(message.children && message.children.length))
                            message.children = [];
                        message.children.push($root.cucumber.messages.RuleChild.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Rule message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.Rule
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.Rule} Rule
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Rule.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Rule message.
             * @function verify
             * @memberof cucumber.messages.Rule
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Rule.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.location != null && message.hasOwnProperty("location")) {
                    var error = $root.cucumber.messages.Location.verify(message.location);
                    if (error)
                        return "location." + error;
                }
                if (message.keyword != null && message.hasOwnProperty("keyword"))
                    if (!$util.isString(message.keyword))
                        return "keyword: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.description != null && message.hasOwnProperty("description"))
                    if (!$util.isString(message.description))
                        return "description: string expected";
                if (message.children != null && message.hasOwnProperty("children")) {
                    if (!Array.isArray(message.children))
                        return "children: array expected";
                    for (var i = 0; i < message.children.length; ++i) {
                        var error = $root.cucumber.messages.RuleChild.verify(message.children[i]);
                        if (error)
                            return "children." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Rule message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.Rule
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.Rule} Rule
             */
            Rule.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.Rule)
                    return object;
                var message = new $root.cucumber.messages.Rule();
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".cucumber.messages.Rule.location: object expected");
                    message.location = $root.cucumber.messages.Location.fromObject(object.location);
                }
                if (object.keyword != null)
                    message.keyword = String(object.keyword);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.description != null)
                    message.description = String(object.description);
                if (object.children) {
                    if (!Array.isArray(object.children))
                        throw TypeError(".cucumber.messages.Rule.children: array expected");
                    message.children = [];
                    for (var i = 0; i < object.children.length; ++i) {
                        if (typeof object.children[i] !== "object")
                            throw TypeError(".cucumber.messages.Rule.children: object expected");
                        message.children[i] = $root.cucumber.messages.RuleChild.fromObject(object.children[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Rule message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.Rule
             * @static
             * @param {cucumber.messages.Rule} message Rule
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Rule.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.children = [];
                if (options.defaults) {
                    object.location = null;
                    object.keyword = "";
                    object.name = "";
                    object.description = "";
                }
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.cucumber.messages.Location.toObject(message.location, options);
                if (message.keyword != null && message.hasOwnProperty("keyword"))
                    object.keyword = message.keyword;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.description != null && message.hasOwnProperty("description"))
                    object.description = message.description;
                if (message.children && message.children.length) {
                    object.children = [];
                    for (var j = 0; j < message.children.length; ++j)
                        object.children[j] = $root.cucumber.messages.RuleChild.toObject(message.children[j], options);
                }
                return object;
            };

            /**
             * Converts this Rule to JSON.
             * @function toJSON
             * @memberof cucumber.messages.Rule
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Rule.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Rule;
        })();

        messages.RuleChild = (function() {

            /**
             * Properties of a RuleChild.
             * @memberof cucumber.messages
             * @interface IRuleChild
             * @property {cucumber.messages.IBackground|null} [background] RuleChild background
             * @property {cucumber.messages.IScenario|null} [scenario] RuleChild scenario
             */

            /**
             * Constructs a new RuleChild.
             * @memberof cucumber.messages
             * @classdesc Represents a RuleChild.
             * @implements IRuleChild
             * @constructor
             * @param {cucumber.messages.IRuleChild=} [properties] Properties to set
             */
            function RuleChild(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RuleChild background.
             * @member {cucumber.messages.IBackground|null|undefined} background
             * @memberof cucumber.messages.RuleChild
             * @instance
             */
            RuleChild.prototype.background = null;

            /**
             * RuleChild scenario.
             * @member {cucumber.messages.IScenario|null|undefined} scenario
             * @memberof cucumber.messages.RuleChild
             * @instance
             */
            RuleChild.prototype.scenario = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * RuleChild value.
             * @member {"background"|"scenario"|undefined} value
             * @memberof cucumber.messages.RuleChild
             * @instance
             */
            Object.defineProperty(RuleChild.prototype, "value", {
                get: $util.oneOfGetter($oneOfFields = ["background", "scenario"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new RuleChild instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.RuleChild
             * @static
             * @param {cucumber.messages.IRuleChild=} [properties] Properties to set
             * @returns {cucumber.messages.RuleChild} RuleChild instance
             */
            RuleChild.create = function create(properties) {
                return new RuleChild(properties);
            };

            /**
             * Encodes the specified RuleChild message. Does not implicitly {@link cucumber.messages.RuleChild.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.RuleChild
             * @static
             * @param {cucumber.messages.IRuleChild} message RuleChild message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RuleChild.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.background != null && message.hasOwnProperty("background"))
                    $root.cucumber.messages.Background.encode(message.background, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.scenario != null && message.hasOwnProperty("scenario"))
                    $root.cucumber.messages.Scenario.encode(message.scenario, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified RuleChild message, length delimited. Does not implicitly {@link cucumber.messages.RuleChild.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.RuleChild
             * @static
             * @param {cucumber.messages.IRuleChild} message RuleChild message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RuleChild.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RuleChild message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.RuleChild
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.RuleChild} RuleChild
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RuleChild.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.RuleChild();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.background = $root.cucumber.messages.Background.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.scenario = $root.cucumber.messages.Scenario.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RuleChild message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.RuleChild
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.RuleChild} RuleChild
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RuleChild.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RuleChild message.
             * @function verify
             * @memberof cucumber.messages.RuleChild
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RuleChild.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.background != null && message.hasOwnProperty("background")) {
                    properties.value = 1;
                    {
                        var error = $root.cucumber.messages.Background.verify(message.background);
                        if (error)
                            return "background." + error;
                    }
                }
                if (message.scenario != null && message.hasOwnProperty("scenario")) {
                    if (properties.value === 1)
                        return "value: multiple values";
                    properties.value = 1;
                    {
                        var error = $root.cucumber.messages.Scenario.verify(message.scenario);
                        if (error)
                            return "scenario." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a RuleChild message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.RuleChild
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.RuleChild} RuleChild
             */
            RuleChild.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.RuleChild)
                    return object;
                var message = new $root.cucumber.messages.RuleChild();
                if (object.background != null) {
                    if (typeof object.background !== "object")
                        throw TypeError(".cucumber.messages.RuleChild.background: object expected");
                    message.background = $root.cucumber.messages.Background.fromObject(object.background);
                }
                if (object.scenario != null) {
                    if (typeof object.scenario !== "object")
                        throw TypeError(".cucumber.messages.RuleChild.scenario: object expected");
                    message.scenario = $root.cucumber.messages.Scenario.fromObject(object.scenario);
                }
                return message;
            };

            /**
             * Creates a plain object from a RuleChild message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.RuleChild
             * @static
             * @param {cucumber.messages.RuleChild} message RuleChild
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RuleChild.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.background != null && message.hasOwnProperty("background")) {
                    object.background = $root.cucumber.messages.Background.toObject(message.background, options);
                    if (options.oneofs)
                        object.value = "background";
                }
                if (message.scenario != null && message.hasOwnProperty("scenario")) {
                    object.scenario = $root.cucumber.messages.Scenario.toObject(message.scenario, options);
                    if (options.oneofs)
                        object.value = "scenario";
                }
                return object;
            };

            /**
             * Converts this RuleChild to JSON.
             * @function toJSON
             * @memberof cucumber.messages.RuleChild
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RuleChild.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RuleChild;
        })();

        messages.Background = (function() {

            /**
             * Properties of a Background.
             * @memberof cucumber.messages
             * @interface IBackground
             * @property {cucumber.messages.ILocation|null} [location] Background location
             * @property {string|null} [keyword] Background keyword
             * @property {string|null} [name] Background name
             * @property {string|null} [description] Background description
             * @property {Array.<cucumber.messages.IStep>|null} [steps] Background steps
             */

            /**
             * Constructs a new Background.
             * @memberof cucumber.messages
             * @classdesc Represents a Background.
             * @implements IBackground
             * @constructor
             * @param {cucumber.messages.IBackground=} [properties] Properties to set
             */
            function Background(properties) {
                this.steps = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Background location.
             * @member {cucumber.messages.ILocation|null|undefined} location
             * @memberof cucumber.messages.Background
             * @instance
             */
            Background.prototype.location = null;

            /**
             * Background keyword.
             * @member {string} keyword
             * @memberof cucumber.messages.Background
             * @instance
             */
            Background.prototype.keyword = "";

            /**
             * Background name.
             * @member {string} name
             * @memberof cucumber.messages.Background
             * @instance
             */
            Background.prototype.name = "";

            /**
             * Background description.
             * @member {string} description
             * @memberof cucumber.messages.Background
             * @instance
             */
            Background.prototype.description = "";

            /**
             * Background steps.
             * @member {Array.<cucumber.messages.IStep>} steps
             * @memberof cucumber.messages.Background
             * @instance
             */
            Background.prototype.steps = $util.emptyArray;

            /**
             * Creates a new Background instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.Background
             * @static
             * @param {cucumber.messages.IBackground=} [properties] Properties to set
             * @returns {cucumber.messages.Background} Background instance
             */
            Background.create = function create(properties) {
                return new Background(properties);
            };

            /**
             * Encodes the specified Background message. Does not implicitly {@link cucumber.messages.Background.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.Background
             * @static
             * @param {cucumber.messages.IBackground} message Background message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Background.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.keyword != null && message.hasOwnProperty("keyword"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.keyword);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                if (message.description != null && message.hasOwnProperty("description"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.description);
                if (message.steps != null && message.steps.length)
                    for (var i = 0; i < message.steps.length; ++i)
                        $root.cucumber.messages.Step.encode(message.steps[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Background message, length delimited. Does not implicitly {@link cucumber.messages.Background.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.Background
             * @static
             * @param {cucumber.messages.IBackground} message Background message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Background.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Background message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.Background
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.Background} Background
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Background.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.Background();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.location = $root.cucumber.messages.Location.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.keyword = reader.string();
                        break;
                    case 3:
                        message.name = reader.string();
                        break;
                    case 4:
                        message.description = reader.string();
                        break;
                    case 5:
                        if (!(message.steps && message.steps.length))
                            message.steps = [];
                        message.steps.push($root.cucumber.messages.Step.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Background message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.Background
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.Background} Background
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Background.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Background message.
             * @function verify
             * @memberof cucumber.messages.Background
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Background.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.location != null && message.hasOwnProperty("location")) {
                    var error = $root.cucumber.messages.Location.verify(message.location);
                    if (error)
                        return "location." + error;
                }
                if (message.keyword != null && message.hasOwnProperty("keyword"))
                    if (!$util.isString(message.keyword))
                        return "keyword: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.description != null && message.hasOwnProperty("description"))
                    if (!$util.isString(message.description))
                        return "description: string expected";
                if (message.steps != null && message.hasOwnProperty("steps")) {
                    if (!Array.isArray(message.steps))
                        return "steps: array expected";
                    for (var i = 0; i < message.steps.length; ++i) {
                        var error = $root.cucumber.messages.Step.verify(message.steps[i]);
                        if (error)
                            return "steps." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Background message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.Background
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.Background} Background
             */
            Background.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.Background)
                    return object;
                var message = new $root.cucumber.messages.Background();
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".cucumber.messages.Background.location: object expected");
                    message.location = $root.cucumber.messages.Location.fromObject(object.location);
                }
                if (object.keyword != null)
                    message.keyword = String(object.keyword);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.description != null)
                    message.description = String(object.description);
                if (object.steps) {
                    if (!Array.isArray(object.steps))
                        throw TypeError(".cucumber.messages.Background.steps: array expected");
                    message.steps = [];
                    for (var i = 0; i < object.steps.length; ++i) {
                        if (typeof object.steps[i] !== "object")
                            throw TypeError(".cucumber.messages.Background.steps: object expected");
                        message.steps[i] = $root.cucumber.messages.Step.fromObject(object.steps[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Background message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.Background
             * @static
             * @param {cucumber.messages.Background} message Background
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Background.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.steps = [];
                if (options.defaults) {
                    object.location = null;
                    object.keyword = "";
                    object.name = "";
                    object.description = "";
                }
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.cucumber.messages.Location.toObject(message.location, options);
                if (message.keyword != null && message.hasOwnProperty("keyword"))
                    object.keyword = message.keyword;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.description != null && message.hasOwnProperty("description"))
                    object.description = message.description;
                if (message.steps && message.steps.length) {
                    object.steps = [];
                    for (var j = 0; j < message.steps.length; ++j)
                        object.steps[j] = $root.cucumber.messages.Step.toObject(message.steps[j], options);
                }
                return object;
            };

            /**
             * Converts this Background to JSON.
             * @function toJSON
             * @memberof cucumber.messages.Background
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Background.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Background;
        })();

        messages.Scenario = (function() {

            /**
             * Properties of a Scenario.
             * @memberof cucumber.messages
             * @interface IScenario
             * @property {cucumber.messages.ILocation|null} [location] Scenario location
             * @property {Array.<cucumber.messages.ITag>|null} [tags] Scenario tags
             * @property {string|null} [keyword] Scenario keyword
             * @property {string|null} [name] Scenario name
             * @property {string|null} [description] Scenario description
             * @property {Array.<cucumber.messages.IStep>|null} [steps] Scenario steps
             * @property {Array.<cucumber.messages.IExamples>|null} [examples] Scenario examples
             */

            /**
             * Constructs a new Scenario.
             * @memberof cucumber.messages
             * @classdesc Represents a Scenario.
             * @implements IScenario
             * @constructor
             * @param {cucumber.messages.IScenario=} [properties] Properties to set
             */
            function Scenario(properties) {
                this.tags = [];
                this.steps = [];
                this.examples = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Scenario location.
             * @member {cucumber.messages.ILocation|null|undefined} location
             * @memberof cucumber.messages.Scenario
             * @instance
             */
            Scenario.prototype.location = null;

            /**
             * Scenario tags.
             * @member {Array.<cucumber.messages.ITag>} tags
             * @memberof cucumber.messages.Scenario
             * @instance
             */
            Scenario.prototype.tags = $util.emptyArray;

            /**
             * Scenario keyword.
             * @member {string} keyword
             * @memberof cucumber.messages.Scenario
             * @instance
             */
            Scenario.prototype.keyword = "";

            /**
             * Scenario name.
             * @member {string} name
             * @memberof cucumber.messages.Scenario
             * @instance
             */
            Scenario.prototype.name = "";

            /**
             * Scenario description.
             * @member {string} description
             * @memberof cucumber.messages.Scenario
             * @instance
             */
            Scenario.prototype.description = "";

            /**
             * Scenario steps.
             * @member {Array.<cucumber.messages.IStep>} steps
             * @memberof cucumber.messages.Scenario
             * @instance
             */
            Scenario.prototype.steps = $util.emptyArray;

            /**
             * Scenario examples.
             * @member {Array.<cucumber.messages.IExamples>} examples
             * @memberof cucumber.messages.Scenario
             * @instance
             */
            Scenario.prototype.examples = $util.emptyArray;

            /**
             * Creates a new Scenario instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.Scenario
             * @static
             * @param {cucumber.messages.IScenario=} [properties] Properties to set
             * @returns {cucumber.messages.Scenario} Scenario instance
             */
            Scenario.create = function create(properties) {
                return new Scenario(properties);
            };

            /**
             * Encodes the specified Scenario message. Does not implicitly {@link cucumber.messages.Scenario.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.Scenario
             * @static
             * @param {cucumber.messages.IScenario} message Scenario message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Scenario.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.tags != null && message.tags.length)
                    for (var i = 0; i < message.tags.length; ++i)
                        $root.cucumber.messages.Tag.encode(message.tags[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.keyword != null && message.hasOwnProperty("keyword"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.keyword);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.name);
                if (message.description != null && message.hasOwnProperty("description"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.description);
                if (message.steps != null && message.steps.length)
                    for (var i = 0; i < message.steps.length; ++i)
                        $root.cucumber.messages.Step.encode(message.steps[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.examples != null && message.examples.length)
                    for (var i = 0; i < message.examples.length; ++i)
                        $root.cucumber.messages.Examples.encode(message.examples[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Scenario message, length delimited. Does not implicitly {@link cucumber.messages.Scenario.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.Scenario
             * @static
             * @param {cucumber.messages.IScenario} message Scenario message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Scenario.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Scenario message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.Scenario
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.Scenario} Scenario
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Scenario.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.Scenario();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.location = $root.cucumber.messages.Location.decode(reader, reader.uint32());
                        break;
                    case 2:
                        if (!(message.tags && message.tags.length))
                            message.tags = [];
                        message.tags.push($root.cucumber.messages.Tag.decode(reader, reader.uint32()));
                        break;
                    case 3:
                        message.keyword = reader.string();
                        break;
                    case 4:
                        message.name = reader.string();
                        break;
                    case 5:
                        message.description = reader.string();
                        break;
                    case 6:
                        if (!(message.steps && message.steps.length))
                            message.steps = [];
                        message.steps.push($root.cucumber.messages.Step.decode(reader, reader.uint32()));
                        break;
                    case 7:
                        if (!(message.examples && message.examples.length))
                            message.examples = [];
                        message.examples.push($root.cucumber.messages.Examples.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Scenario message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.Scenario
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.Scenario} Scenario
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Scenario.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Scenario message.
             * @function verify
             * @memberof cucumber.messages.Scenario
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Scenario.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.location != null && message.hasOwnProperty("location")) {
                    var error = $root.cucumber.messages.Location.verify(message.location);
                    if (error)
                        return "location." + error;
                }
                if (message.tags != null && message.hasOwnProperty("tags")) {
                    if (!Array.isArray(message.tags))
                        return "tags: array expected";
                    for (var i = 0; i < message.tags.length; ++i) {
                        var error = $root.cucumber.messages.Tag.verify(message.tags[i]);
                        if (error)
                            return "tags." + error;
                    }
                }
                if (message.keyword != null && message.hasOwnProperty("keyword"))
                    if (!$util.isString(message.keyword))
                        return "keyword: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.description != null && message.hasOwnProperty("description"))
                    if (!$util.isString(message.description))
                        return "description: string expected";
                if (message.steps != null && message.hasOwnProperty("steps")) {
                    if (!Array.isArray(message.steps))
                        return "steps: array expected";
                    for (var i = 0; i < message.steps.length; ++i) {
                        var error = $root.cucumber.messages.Step.verify(message.steps[i]);
                        if (error)
                            return "steps." + error;
                    }
                }
                if (message.examples != null && message.hasOwnProperty("examples")) {
                    if (!Array.isArray(message.examples))
                        return "examples: array expected";
                    for (var i = 0; i < message.examples.length; ++i) {
                        var error = $root.cucumber.messages.Examples.verify(message.examples[i]);
                        if (error)
                            return "examples." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Scenario message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.Scenario
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.Scenario} Scenario
             */
            Scenario.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.Scenario)
                    return object;
                var message = new $root.cucumber.messages.Scenario();
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".cucumber.messages.Scenario.location: object expected");
                    message.location = $root.cucumber.messages.Location.fromObject(object.location);
                }
                if (object.tags) {
                    if (!Array.isArray(object.tags))
                        throw TypeError(".cucumber.messages.Scenario.tags: array expected");
                    message.tags = [];
                    for (var i = 0; i < object.tags.length; ++i) {
                        if (typeof object.tags[i] !== "object")
                            throw TypeError(".cucumber.messages.Scenario.tags: object expected");
                        message.tags[i] = $root.cucumber.messages.Tag.fromObject(object.tags[i]);
                    }
                }
                if (object.keyword != null)
                    message.keyword = String(object.keyword);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.description != null)
                    message.description = String(object.description);
                if (object.steps) {
                    if (!Array.isArray(object.steps))
                        throw TypeError(".cucumber.messages.Scenario.steps: array expected");
                    message.steps = [];
                    for (var i = 0; i < object.steps.length; ++i) {
                        if (typeof object.steps[i] !== "object")
                            throw TypeError(".cucumber.messages.Scenario.steps: object expected");
                        message.steps[i] = $root.cucumber.messages.Step.fromObject(object.steps[i]);
                    }
                }
                if (object.examples) {
                    if (!Array.isArray(object.examples))
                        throw TypeError(".cucumber.messages.Scenario.examples: array expected");
                    message.examples = [];
                    for (var i = 0; i < object.examples.length; ++i) {
                        if (typeof object.examples[i] !== "object")
                            throw TypeError(".cucumber.messages.Scenario.examples: object expected");
                        message.examples[i] = $root.cucumber.messages.Examples.fromObject(object.examples[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Scenario message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.Scenario
             * @static
             * @param {cucumber.messages.Scenario} message Scenario
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Scenario.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.tags = [];
                    object.steps = [];
                    object.examples = [];
                }
                if (options.defaults) {
                    object.location = null;
                    object.keyword = "";
                    object.name = "";
                    object.description = "";
                }
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.cucumber.messages.Location.toObject(message.location, options);
                if (message.tags && message.tags.length) {
                    object.tags = [];
                    for (var j = 0; j < message.tags.length; ++j)
                        object.tags[j] = $root.cucumber.messages.Tag.toObject(message.tags[j], options);
                }
                if (message.keyword != null && message.hasOwnProperty("keyword"))
                    object.keyword = message.keyword;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.description != null && message.hasOwnProperty("description"))
                    object.description = message.description;
                if (message.steps && message.steps.length) {
                    object.steps = [];
                    for (var j = 0; j < message.steps.length; ++j)
                        object.steps[j] = $root.cucumber.messages.Step.toObject(message.steps[j], options);
                }
                if (message.examples && message.examples.length) {
                    object.examples = [];
                    for (var j = 0; j < message.examples.length; ++j)
                        object.examples[j] = $root.cucumber.messages.Examples.toObject(message.examples[j], options);
                }
                return object;
            };

            /**
             * Converts this Scenario to JSON.
             * @function toJSON
             * @memberof cucumber.messages.Scenario
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Scenario.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Scenario;
        })();

        messages.Comment = (function() {

            /**
             * Properties of a Comment.
             * @memberof cucumber.messages
             * @interface IComment
             * @property {cucumber.messages.ILocation|null} [location] Comment location
             * @property {string|null} [text] Comment text
             */

            /**
             * Constructs a new Comment.
             * @memberof cucumber.messages
             * @classdesc Represents a Comment.
             * @implements IComment
             * @constructor
             * @param {cucumber.messages.IComment=} [properties] Properties to set
             */
            function Comment(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Comment location.
             * @member {cucumber.messages.ILocation|null|undefined} location
             * @memberof cucumber.messages.Comment
             * @instance
             */
            Comment.prototype.location = null;

            /**
             * Comment text.
             * @member {string} text
             * @memberof cucumber.messages.Comment
             * @instance
             */
            Comment.prototype.text = "";

            /**
             * Creates a new Comment instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.Comment
             * @static
             * @param {cucumber.messages.IComment=} [properties] Properties to set
             * @returns {cucumber.messages.Comment} Comment instance
             */
            Comment.create = function create(properties) {
                return new Comment(properties);
            };

            /**
             * Encodes the specified Comment message. Does not implicitly {@link cucumber.messages.Comment.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.Comment
             * @static
             * @param {cucumber.messages.IComment} message Comment message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Comment.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.text != null && message.hasOwnProperty("text"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.text);
                return writer;
            };

            /**
             * Encodes the specified Comment message, length delimited. Does not implicitly {@link cucumber.messages.Comment.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.Comment
             * @static
             * @param {cucumber.messages.IComment} message Comment message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Comment.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Comment message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.Comment
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.Comment} Comment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Comment.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.Comment();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.location = $root.cucumber.messages.Location.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.text = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Comment message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.Comment
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.Comment} Comment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Comment.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Comment message.
             * @function verify
             * @memberof cucumber.messages.Comment
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Comment.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.location != null && message.hasOwnProperty("location")) {
                    var error = $root.cucumber.messages.Location.verify(message.location);
                    if (error)
                        return "location." + error;
                }
                if (message.text != null && message.hasOwnProperty("text"))
                    if (!$util.isString(message.text))
                        return "text: string expected";
                return null;
            };

            /**
             * Creates a Comment message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.Comment
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.Comment} Comment
             */
            Comment.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.Comment)
                    return object;
                var message = new $root.cucumber.messages.Comment();
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".cucumber.messages.Comment.location: object expected");
                    message.location = $root.cucumber.messages.Location.fromObject(object.location);
                }
                if (object.text != null)
                    message.text = String(object.text);
                return message;
            };

            /**
             * Creates a plain object from a Comment message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.Comment
             * @static
             * @param {cucumber.messages.Comment} message Comment
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Comment.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.location = null;
                    object.text = "";
                }
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.cucumber.messages.Location.toObject(message.location, options);
                if (message.text != null && message.hasOwnProperty("text"))
                    object.text = message.text;
                return object;
            };

            /**
             * Converts this Comment to JSON.
             * @function toJSON
             * @memberof cucumber.messages.Comment
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Comment.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Comment;
        })();

        messages.DataTable = (function() {

            /**
             * Properties of a DataTable.
             * @memberof cucumber.messages
             * @interface IDataTable
             * @property {cucumber.messages.ILocation|null} [location] DataTable location
             * @property {Array.<cucumber.messages.ITableRow>|null} [rows] DataTable rows
             */

            /**
             * Constructs a new DataTable.
             * @memberof cucumber.messages
             * @classdesc Represents a DataTable.
             * @implements IDataTable
             * @constructor
             * @param {cucumber.messages.IDataTable=} [properties] Properties to set
             */
            function DataTable(properties) {
                this.rows = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DataTable location.
             * @member {cucumber.messages.ILocation|null|undefined} location
             * @memberof cucumber.messages.DataTable
             * @instance
             */
            DataTable.prototype.location = null;

            /**
             * DataTable rows.
             * @member {Array.<cucumber.messages.ITableRow>} rows
             * @memberof cucumber.messages.DataTable
             * @instance
             */
            DataTable.prototype.rows = $util.emptyArray;

            /**
             * Creates a new DataTable instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.DataTable
             * @static
             * @param {cucumber.messages.IDataTable=} [properties] Properties to set
             * @returns {cucumber.messages.DataTable} DataTable instance
             */
            DataTable.create = function create(properties) {
                return new DataTable(properties);
            };

            /**
             * Encodes the specified DataTable message. Does not implicitly {@link cucumber.messages.DataTable.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.DataTable
             * @static
             * @param {cucumber.messages.IDataTable} message DataTable message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DataTable.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.rows != null && message.rows.length)
                    for (var i = 0; i < message.rows.length; ++i)
                        $root.cucumber.messages.TableRow.encode(message.rows[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified DataTable message, length delimited. Does not implicitly {@link cucumber.messages.DataTable.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.DataTable
             * @static
             * @param {cucumber.messages.IDataTable} message DataTable message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DataTable.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DataTable message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.DataTable
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.DataTable} DataTable
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DataTable.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.DataTable();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.location = $root.cucumber.messages.Location.decode(reader, reader.uint32());
                        break;
                    case 2:
                        if (!(message.rows && message.rows.length))
                            message.rows = [];
                        message.rows.push($root.cucumber.messages.TableRow.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DataTable message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.DataTable
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.DataTable} DataTable
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DataTable.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DataTable message.
             * @function verify
             * @memberof cucumber.messages.DataTable
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DataTable.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.location != null && message.hasOwnProperty("location")) {
                    var error = $root.cucumber.messages.Location.verify(message.location);
                    if (error)
                        return "location." + error;
                }
                if (message.rows != null && message.hasOwnProperty("rows")) {
                    if (!Array.isArray(message.rows))
                        return "rows: array expected";
                    for (var i = 0; i < message.rows.length; ++i) {
                        var error = $root.cucumber.messages.TableRow.verify(message.rows[i]);
                        if (error)
                            return "rows." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a DataTable message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.DataTable
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.DataTable} DataTable
             */
            DataTable.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.DataTable)
                    return object;
                var message = new $root.cucumber.messages.DataTable();
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".cucumber.messages.DataTable.location: object expected");
                    message.location = $root.cucumber.messages.Location.fromObject(object.location);
                }
                if (object.rows) {
                    if (!Array.isArray(object.rows))
                        throw TypeError(".cucumber.messages.DataTable.rows: array expected");
                    message.rows = [];
                    for (var i = 0; i < object.rows.length; ++i) {
                        if (typeof object.rows[i] !== "object")
                            throw TypeError(".cucumber.messages.DataTable.rows: object expected");
                        message.rows[i] = $root.cucumber.messages.TableRow.fromObject(object.rows[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a DataTable message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.DataTable
             * @static
             * @param {cucumber.messages.DataTable} message DataTable
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DataTable.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.rows = [];
                if (options.defaults)
                    object.location = null;
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.cucumber.messages.Location.toObject(message.location, options);
                if (message.rows && message.rows.length) {
                    object.rows = [];
                    for (var j = 0; j < message.rows.length; ++j)
                        object.rows[j] = $root.cucumber.messages.TableRow.toObject(message.rows[j], options);
                }
                return object;
            };

            /**
             * Converts this DataTable to JSON.
             * @function toJSON
             * @memberof cucumber.messages.DataTable
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DataTable.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DataTable;
        })();

        messages.DocString = (function() {

            /**
             * Properties of a DocString.
             * @memberof cucumber.messages
             * @interface IDocString
             * @property {cucumber.messages.ILocation|null} [location] DocString location
             * @property {string|null} [contentType] DocString contentType
             * @property {string|null} [content] DocString content
             * @property {string|null} [delimiter] DocString delimiter
             */

            /**
             * Constructs a new DocString.
             * @memberof cucumber.messages
             * @classdesc Represents a DocString.
             * @implements IDocString
             * @constructor
             * @param {cucumber.messages.IDocString=} [properties] Properties to set
             */
            function DocString(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DocString location.
             * @member {cucumber.messages.ILocation|null|undefined} location
             * @memberof cucumber.messages.DocString
             * @instance
             */
            DocString.prototype.location = null;

            /**
             * DocString contentType.
             * @member {string} contentType
             * @memberof cucumber.messages.DocString
             * @instance
             */
            DocString.prototype.contentType = "";

            /**
             * DocString content.
             * @member {string} content
             * @memberof cucumber.messages.DocString
             * @instance
             */
            DocString.prototype.content = "";

            /**
             * DocString delimiter.
             * @member {string} delimiter
             * @memberof cucumber.messages.DocString
             * @instance
             */
            DocString.prototype.delimiter = "";

            /**
             * Creates a new DocString instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.DocString
             * @static
             * @param {cucumber.messages.IDocString=} [properties] Properties to set
             * @returns {cucumber.messages.DocString} DocString instance
             */
            DocString.create = function create(properties) {
                return new DocString(properties);
            };

            /**
             * Encodes the specified DocString message. Does not implicitly {@link cucumber.messages.DocString.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.DocString
             * @static
             * @param {cucumber.messages.IDocString} message DocString message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DocString.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.contentType != null && message.hasOwnProperty("contentType"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.contentType);
                if (message.content != null && message.hasOwnProperty("content"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.content);
                if (message.delimiter != null && message.hasOwnProperty("delimiter"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.delimiter);
                return writer;
            };

            /**
             * Encodes the specified DocString message, length delimited. Does not implicitly {@link cucumber.messages.DocString.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.DocString
             * @static
             * @param {cucumber.messages.IDocString} message DocString message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DocString.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DocString message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.DocString
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.DocString} DocString
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DocString.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.DocString();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.location = $root.cucumber.messages.Location.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.contentType = reader.string();
                        break;
                    case 3:
                        message.content = reader.string();
                        break;
                    case 4:
                        message.delimiter = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DocString message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.DocString
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.DocString} DocString
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DocString.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DocString message.
             * @function verify
             * @memberof cucumber.messages.DocString
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DocString.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.location != null && message.hasOwnProperty("location")) {
                    var error = $root.cucumber.messages.Location.verify(message.location);
                    if (error)
                        return "location." + error;
                }
                if (message.contentType != null && message.hasOwnProperty("contentType"))
                    if (!$util.isString(message.contentType))
                        return "contentType: string expected";
                if (message.content != null && message.hasOwnProperty("content"))
                    if (!$util.isString(message.content))
                        return "content: string expected";
                if (message.delimiter != null && message.hasOwnProperty("delimiter"))
                    if (!$util.isString(message.delimiter))
                        return "delimiter: string expected";
                return null;
            };

            /**
             * Creates a DocString message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.DocString
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.DocString} DocString
             */
            DocString.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.DocString)
                    return object;
                var message = new $root.cucumber.messages.DocString();
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".cucumber.messages.DocString.location: object expected");
                    message.location = $root.cucumber.messages.Location.fromObject(object.location);
                }
                if (object.contentType != null)
                    message.contentType = String(object.contentType);
                if (object.content != null)
                    message.content = String(object.content);
                if (object.delimiter != null)
                    message.delimiter = String(object.delimiter);
                return message;
            };

            /**
             * Creates a plain object from a DocString message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.DocString
             * @static
             * @param {cucumber.messages.DocString} message DocString
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DocString.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.location = null;
                    object.contentType = "";
                    object.content = "";
                    object.delimiter = "";
                }
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.cucumber.messages.Location.toObject(message.location, options);
                if (message.contentType != null && message.hasOwnProperty("contentType"))
                    object.contentType = message.contentType;
                if (message.content != null && message.hasOwnProperty("content"))
                    object.content = message.content;
                if (message.delimiter != null && message.hasOwnProperty("delimiter"))
                    object.delimiter = message.delimiter;
                return object;
            };

            /**
             * Converts this DocString to JSON.
             * @function toJSON
             * @memberof cucumber.messages.DocString
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DocString.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DocString;
        })();

        messages.Examples = (function() {

            /**
             * Properties of an Examples.
             * @memberof cucumber.messages
             * @interface IExamples
             * @property {cucumber.messages.ILocation|null} [location] Examples location
             * @property {Array.<cucumber.messages.ITag>|null} [tags] Examples tags
             * @property {string|null} [keyword] Examples keyword
             * @property {string|null} [name] Examples name
             * @property {string|null} [description] Examples description
             * @property {cucumber.messages.ITableRow|null} [tableHeader] Examples tableHeader
             * @property {Array.<cucumber.messages.ITableRow>|null} [tableBody] Examples tableBody
             */

            /**
             * Constructs a new Examples.
             * @memberof cucumber.messages
             * @classdesc Represents an Examples.
             * @implements IExamples
             * @constructor
             * @param {cucumber.messages.IExamples=} [properties] Properties to set
             */
            function Examples(properties) {
                this.tags = [];
                this.tableBody = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Examples location.
             * @member {cucumber.messages.ILocation|null|undefined} location
             * @memberof cucumber.messages.Examples
             * @instance
             */
            Examples.prototype.location = null;

            /**
             * Examples tags.
             * @member {Array.<cucumber.messages.ITag>} tags
             * @memberof cucumber.messages.Examples
             * @instance
             */
            Examples.prototype.tags = $util.emptyArray;

            /**
             * Examples keyword.
             * @member {string} keyword
             * @memberof cucumber.messages.Examples
             * @instance
             */
            Examples.prototype.keyword = "";

            /**
             * Examples name.
             * @member {string} name
             * @memberof cucumber.messages.Examples
             * @instance
             */
            Examples.prototype.name = "";

            /**
             * Examples description.
             * @member {string} description
             * @memberof cucumber.messages.Examples
             * @instance
             */
            Examples.prototype.description = "";

            /**
             * Examples tableHeader.
             * @member {cucumber.messages.ITableRow|null|undefined} tableHeader
             * @memberof cucumber.messages.Examples
             * @instance
             */
            Examples.prototype.tableHeader = null;

            /**
             * Examples tableBody.
             * @member {Array.<cucumber.messages.ITableRow>} tableBody
             * @memberof cucumber.messages.Examples
             * @instance
             */
            Examples.prototype.tableBody = $util.emptyArray;

            /**
             * Creates a new Examples instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.Examples
             * @static
             * @param {cucumber.messages.IExamples=} [properties] Properties to set
             * @returns {cucumber.messages.Examples} Examples instance
             */
            Examples.create = function create(properties) {
                return new Examples(properties);
            };

            /**
             * Encodes the specified Examples message. Does not implicitly {@link cucumber.messages.Examples.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.Examples
             * @static
             * @param {cucumber.messages.IExamples} message Examples message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Examples.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.tags != null && message.tags.length)
                    for (var i = 0; i < message.tags.length; ++i)
                        $root.cucumber.messages.Tag.encode(message.tags[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.keyword != null && message.hasOwnProperty("keyword"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.keyword);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.name);
                if (message.description != null && message.hasOwnProperty("description"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.description);
                if (message.tableHeader != null && message.hasOwnProperty("tableHeader"))
                    $root.cucumber.messages.TableRow.encode(message.tableHeader, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.tableBody != null && message.tableBody.length)
                    for (var i = 0; i < message.tableBody.length; ++i)
                        $root.cucumber.messages.TableRow.encode(message.tableBody[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Examples message, length delimited. Does not implicitly {@link cucumber.messages.Examples.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.Examples
             * @static
             * @param {cucumber.messages.IExamples} message Examples message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Examples.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Examples message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.Examples
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.Examples} Examples
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Examples.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.Examples();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.location = $root.cucumber.messages.Location.decode(reader, reader.uint32());
                        break;
                    case 2:
                        if (!(message.tags && message.tags.length))
                            message.tags = [];
                        message.tags.push($root.cucumber.messages.Tag.decode(reader, reader.uint32()));
                        break;
                    case 3:
                        message.keyword = reader.string();
                        break;
                    case 4:
                        message.name = reader.string();
                        break;
                    case 5:
                        message.description = reader.string();
                        break;
                    case 6:
                        message.tableHeader = $root.cucumber.messages.TableRow.decode(reader, reader.uint32());
                        break;
                    case 7:
                        if (!(message.tableBody && message.tableBody.length))
                            message.tableBody = [];
                        message.tableBody.push($root.cucumber.messages.TableRow.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Examples message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.Examples
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.Examples} Examples
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Examples.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Examples message.
             * @function verify
             * @memberof cucumber.messages.Examples
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Examples.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.location != null && message.hasOwnProperty("location")) {
                    var error = $root.cucumber.messages.Location.verify(message.location);
                    if (error)
                        return "location." + error;
                }
                if (message.tags != null && message.hasOwnProperty("tags")) {
                    if (!Array.isArray(message.tags))
                        return "tags: array expected";
                    for (var i = 0; i < message.tags.length; ++i) {
                        var error = $root.cucumber.messages.Tag.verify(message.tags[i]);
                        if (error)
                            return "tags." + error;
                    }
                }
                if (message.keyword != null && message.hasOwnProperty("keyword"))
                    if (!$util.isString(message.keyword))
                        return "keyword: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.description != null && message.hasOwnProperty("description"))
                    if (!$util.isString(message.description))
                        return "description: string expected";
                if (message.tableHeader != null && message.hasOwnProperty("tableHeader")) {
                    var error = $root.cucumber.messages.TableRow.verify(message.tableHeader);
                    if (error)
                        return "tableHeader." + error;
                }
                if (message.tableBody != null && message.hasOwnProperty("tableBody")) {
                    if (!Array.isArray(message.tableBody))
                        return "tableBody: array expected";
                    for (var i = 0; i < message.tableBody.length; ++i) {
                        var error = $root.cucumber.messages.TableRow.verify(message.tableBody[i]);
                        if (error)
                            return "tableBody." + error;
                    }
                }
                return null;
            };

            /**
             * Creates an Examples message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.Examples
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.Examples} Examples
             */
            Examples.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.Examples)
                    return object;
                var message = new $root.cucumber.messages.Examples();
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".cucumber.messages.Examples.location: object expected");
                    message.location = $root.cucumber.messages.Location.fromObject(object.location);
                }
                if (object.tags) {
                    if (!Array.isArray(object.tags))
                        throw TypeError(".cucumber.messages.Examples.tags: array expected");
                    message.tags = [];
                    for (var i = 0; i < object.tags.length; ++i) {
                        if (typeof object.tags[i] !== "object")
                            throw TypeError(".cucumber.messages.Examples.tags: object expected");
                        message.tags[i] = $root.cucumber.messages.Tag.fromObject(object.tags[i]);
                    }
                }
                if (object.keyword != null)
                    message.keyword = String(object.keyword);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.description != null)
                    message.description = String(object.description);
                if (object.tableHeader != null) {
                    if (typeof object.tableHeader !== "object")
                        throw TypeError(".cucumber.messages.Examples.tableHeader: object expected");
                    message.tableHeader = $root.cucumber.messages.TableRow.fromObject(object.tableHeader);
                }
                if (object.tableBody) {
                    if (!Array.isArray(object.tableBody))
                        throw TypeError(".cucumber.messages.Examples.tableBody: array expected");
                    message.tableBody = [];
                    for (var i = 0; i < object.tableBody.length; ++i) {
                        if (typeof object.tableBody[i] !== "object")
                            throw TypeError(".cucumber.messages.Examples.tableBody: object expected");
                        message.tableBody[i] = $root.cucumber.messages.TableRow.fromObject(object.tableBody[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from an Examples message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.Examples
             * @static
             * @param {cucumber.messages.Examples} message Examples
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Examples.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.tags = [];
                    object.tableBody = [];
                }
                if (options.defaults) {
                    object.location = null;
                    object.keyword = "";
                    object.name = "";
                    object.description = "";
                    object.tableHeader = null;
                }
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.cucumber.messages.Location.toObject(message.location, options);
                if (message.tags && message.tags.length) {
                    object.tags = [];
                    for (var j = 0; j < message.tags.length; ++j)
                        object.tags[j] = $root.cucumber.messages.Tag.toObject(message.tags[j], options);
                }
                if (message.keyword != null && message.hasOwnProperty("keyword"))
                    object.keyword = message.keyword;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.description != null && message.hasOwnProperty("description"))
                    object.description = message.description;
                if (message.tableHeader != null && message.hasOwnProperty("tableHeader"))
                    object.tableHeader = $root.cucumber.messages.TableRow.toObject(message.tableHeader, options);
                if (message.tableBody && message.tableBody.length) {
                    object.tableBody = [];
                    for (var j = 0; j < message.tableBody.length; ++j)
                        object.tableBody[j] = $root.cucumber.messages.TableRow.toObject(message.tableBody[j], options);
                }
                return object;
            };

            /**
             * Converts this Examples to JSON.
             * @function toJSON
             * @memberof cucumber.messages.Examples
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Examples.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Examples;
        })();

        messages.Step = (function() {

            /**
             * Properties of a Step.
             * @memberof cucumber.messages
             * @interface IStep
             * @property {cucumber.messages.ILocation|null} [location] Step location
             * @property {string|null} [keyword] Step keyword
             * @property {string|null} [text] Step text
             * @property {cucumber.messages.IDocString|null} [docString] Step docString
             * @property {cucumber.messages.IDataTable|null} [dataTable] Step dataTable
             */

            /**
             * Constructs a new Step.
             * @memberof cucumber.messages
             * @classdesc Represents a Step.
             * @implements IStep
             * @constructor
             * @param {cucumber.messages.IStep=} [properties] Properties to set
             */
            function Step(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Step location.
             * @member {cucumber.messages.ILocation|null|undefined} location
             * @memberof cucumber.messages.Step
             * @instance
             */
            Step.prototype.location = null;

            /**
             * Step keyword.
             * @member {string} keyword
             * @memberof cucumber.messages.Step
             * @instance
             */
            Step.prototype.keyword = "";

            /**
             * Step text.
             * @member {string} text
             * @memberof cucumber.messages.Step
             * @instance
             */
            Step.prototype.text = "";

            /**
             * Step docString.
             * @member {cucumber.messages.IDocString|null|undefined} docString
             * @memberof cucumber.messages.Step
             * @instance
             */
            Step.prototype.docString = null;

            /**
             * Step dataTable.
             * @member {cucumber.messages.IDataTable|null|undefined} dataTable
             * @memberof cucumber.messages.Step
             * @instance
             */
            Step.prototype.dataTable = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * Step argument.
             * @member {"docString"|"dataTable"|undefined} argument
             * @memberof cucumber.messages.Step
             * @instance
             */
            Object.defineProperty(Step.prototype, "argument", {
                get: $util.oneOfGetter($oneOfFields = ["docString", "dataTable"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new Step instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.Step
             * @static
             * @param {cucumber.messages.IStep=} [properties] Properties to set
             * @returns {cucumber.messages.Step} Step instance
             */
            Step.create = function create(properties) {
                return new Step(properties);
            };

            /**
             * Encodes the specified Step message. Does not implicitly {@link cucumber.messages.Step.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.Step
             * @static
             * @param {cucumber.messages.IStep} message Step message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Step.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.keyword != null && message.hasOwnProperty("keyword"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.keyword);
                if (message.text != null && message.hasOwnProperty("text"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.text);
                if (message.docString != null && message.hasOwnProperty("docString"))
                    $root.cucumber.messages.DocString.encode(message.docString, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.dataTable != null && message.hasOwnProperty("dataTable"))
                    $root.cucumber.messages.DataTable.encode(message.dataTable, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Step message, length delimited. Does not implicitly {@link cucumber.messages.Step.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.Step
             * @static
             * @param {cucumber.messages.IStep} message Step message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Step.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Step message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.Step
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.Step} Step
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Step.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.Step();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.location = $root.cucumber.messages.Location.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.keyword = reader.string();
                        break;
                    case 3:
                        message.text = reader.string();
                        break;
                    case 5:
                        message.docString = $root.cucumber.messages.DocString.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.dataTable = $root.cucumber.messages.DataTable.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Step message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.Step
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.Step} Step
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Step.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Step message.
             * @function verify
             * @memberof cucumber.messages.Step
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Step.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.location != null && message.hasOwnProperty("location")) {
                    var error = $root.cucumber.messages.Location.verify(message.location);
                    if (error)
                        return "location." + error;
                }
                if (message.keyword != null && message.hasOwnProperty("keyword"))
                    if (!$util.isString(message.keyword))
                        return "keyword: string expected";
                if (message.text != null && message.hasOwnProperty("text"))
                    if (!$util.isString(message.text))
                        return "text: string expected";
                if (message.docString != null && message.hasOwnProperty("docString")) {
                    properties.argument = 1;
                    {
                        var error = $root.cucumber.messages.DocString.verify(message.docString);
                        if (error)
                            return "docString." + error;
                    }
                }
                if (message.dataTable != null && message.hasOwnProperty("dataTable")) {
                    if (properties.argument === 1)
                        return "argument: multiple values";
                    properties.argument = 1;
                    {
                        var error = $root.cucumber.messages.DataTable.verify(message.dataTable);
                        if (error)
                            return "dataTable." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Step message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.Step
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.Step} Step
             */
            Step.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.Step)
                    return object;
                var message = new $root.cucumber.messages.Step();
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".cucumber.messages.Step.location: object expected");
                    message.location = $root.cucumber.messages.Location.fromObject(object.location);
                }
                if (object.keyword != null)
                    message.keyword = String(object.keyword);
                if (object.text != null)
                    message.text = String(object.text);
                if (object.docString != null) {
                    if (typeof object.docString !== "object")
                        throw TypeError(".cucumber.messages.Step.docString: object expected");
                    message.docString = $root.cucumber.messages.DocString.fromObject(object.docString);
                }
                if (object.dataTable != null) {
                    if (typeof object.dataTable !== "object")
                        throw TypeError(".cucumber.messages.Step.dataTable: object expected");
                    message.dataTable = $root.cucumber.messages.DataTable.fromObject(object.dataTable);
                }
                return message;
            };

            /**
             * Creates a plain object from a Step message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.Step
             * @static
             * @param {cucumber.messages.Step} message Step
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Step.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.location = null;
                    object.keyword = "";
                    object.text = "";
                }
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.cucumber.messages.Location.toObject(message.location, options);
                if (message.keyword != null && message.hasOwnProperty("keyword"))
                    object.keyword = message.keyword;
                if (message.text != null && message.hasOwnProperty("text"))
                    object.text = message.text;
                if (message.docString != null && message.hasOwnProperty("docString")) {
                    object.docString = $root.cucumber.messages.DocString.toObject(message.docString, options);
                    if (options.oneofs)
                        object.argument = "docString";
                }
                if (message.dataTable != null && message.hasOwnProperty("dataTable")) {
                    object.dataTable = $root.cucumber.messages.DataTable.toObject(message.dataTable, options);
                    if (options.oneofs)
                        object.argument = "dataTable";
                }
                return object;
            };

            /**
             * Converts this Step to JSON.
             * @function toJSON
             * @memberof cucumber.messages.Step
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Step.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Step;
        })();

        messages.TableCell = (function() {

            /**
             * Properties of a TableCell.
             * @memberof cucumber.messages
             * @interface ITableCell
             * @property {cucumber.messages.ILocation|null} [location] TableCell location
             * @property {string|null} [value] TableCell value
             */

            /**
             * Constructs a new TableCell.
             * @memberof cucumber.messages
             * @classdesc Represents a TableCell.
             * @implements ITableCell
             * @constructor
             * @param {cucumber.messages.ITableCell=} [properties] Properties to set
             */
            function TableCell(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TableCell location.
             * @member {cucumber.messages.ILocation|null|undefined} location
             * @memberof cucumber.messages.TableCell
             * @instance
             */
            TableCell.prototype.location = null;

            /**
             * TableCell value.
             * @member {string} value
             * @memberof cucumber.messages.TableCell
             * @instance
             */
            TableCell.prototype.value = "";

            /**
             * Creates a new TableCell instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.TableCell
             * @static
             * @param {cucumber.messages.ITableCell=} [properties] Properties to set
             * @returns {cucumber.messages.TableCell} TableCell instance
             */
            TableCell.create = function create(properties) {
                return new TableCell(properties);
            };

            /**
             * Encodes the specified TableCell message. Does not implicitly {@link cucumber.messages.TableCell.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.TableCell
             * @static
             * @param {cucumber.messages.ITableCell} message TableCell message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TableCell.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.value);
                return writer;
            };

            /**
             * Encodes the specified TableCell message, length delimited. Does not implicitly {@link cucumber.messages.TableCell.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.TableCell
             * @static
             * @param {cucumber.messages.ITableCell} message TableCell message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TableCell.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TableCell message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.TableCell
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.TableCell} TableCell
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TableCell.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.TableCell();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.location = $root.cucumber.messages.Location.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.value = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TableCell message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.TableCell
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.TableCell} TableCell
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TableCell.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TableCell message.
             * @function verify
             * @memberof cucumber.messages.TableCell
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TableCell.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.location != null && message.hasOwnProperty("location")) {
                    var error = $root.cucumber.messages.Location.verify(message.location);
                    if (error)
                        return "location." + error;
                }
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!$util.isString(message.value))
                        return "value: string expected";
                return null;
            };

            /**
             * Creates a TableCell message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.TableCell
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.TableCell} TableCell
             */
            TableCell.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.TableCell)
                    return object;
                var message = new $root.cucumber.messages.TableCell();
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".cucumber.messages.TableCell.location: object expected");
                    message.location = $root.cucumber.messages.Location.fromObject(object.location);
                }
                if (object.value != null)
                    message.value = String(object.value);
                return message;
            };

            /**
             * Creates a plain object from a TableCell message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.TableCell
             * @static
             * @param {cucumber.messages.TableCell} message TableCell
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TableCell.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.location = null;
                    object.value = "";
                }
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.cucumber.messages.Location.toObject(message.location, options);
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = message.value;
                return object;
            };

            /**
             * Converts this TableCell to JSON.
             * @function toJSON
             * @memberof cucumber.messages.TableCell
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TableCell.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TableCell;
        })();

        messages.TableRow = (function() {

            /**
             * Properties of a TableRow.
             * @memberof cucumber.messages
             * @interface ITableRow
             * @property {cucumber.messages.ILocation|null} [location] TableRow location
             * @property {Array.<cucumber.messages.ITableCell>|null} [cells] TableRow cells
             */

            /**
             * Constructs a new TableRow.
             * @memberof cucumber.messages
             * @classdesc Represents a TableRow.
             * @implements ITableRow
             * @constructor
             * @param {cucumber.messages.ITableRow=} [properties] Properties to set
             */
            function TableRow(properties) {
                this.cells = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TableRow location.
             * @member {cucumber.messages.ILocation|null|undefined} location
             * @memberof cucumber.messages.TableRow
             * @instance
             */
            TableRow.prototype.location = null;

            /**
             * TableRow cells.
             * @member {Array.<cucumber.messages.ITableCell>} cells
             * @memberof cucumber.messages.TableRow
             * @instance
             */
            TableRow.prototype.cells = $util.emptyArray;

            /**
             * Creates a new TableRow instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.TableRow
             * @static
             * @param {cucumber.messages.ITableRow=} [properties] Properties to set
             * @returns {cucumber.messages.TableRow} TableRow instance
             */
            TableRow.create = function create(properties) {
                return new TableRow(properties);
            };

            /**
             * Encodes the specified TableRow message. Does not implicitly {@link cucumber.messages.TableRow.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.TableRow
             * @static
             * @param {cucumber.messages.ITableRow} message TableRow message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TableRow.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.cells != null && message.cells.length)
                    for (var i = 0; i < message.cells.length; ++i)
                        $root.cucumber.messages.TableCell.encode(message.cells[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified TableRow message, length delimited. Does not implicitly {@link cucumber.messages.TableRow.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.TableRow
             * @static
             * @param {cucumber.messages.ITableRow} message TableRow message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TableRow.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TableRow message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.TableRow
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.TableRow} TableRow
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TableRow.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.TableRow();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.location = $root.cucumber.messages.Location.decode(reader, reader.uint32());
                        break;
                    case 2:
                        if (!(message.cells && message.cells.length))
                            message.cells = [];
                        message.cells.push($root.cucumber.messages.TableCell.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TableRow message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.TableRow
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.TableRow} TableRow
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TableRow.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TableRow message.
             * @function verify
             * @memberof cucumber.messages.TableRow
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TableRow.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.location != null && message.hasOwnProperty("location")) {
                    var error = $root.cucumber.messages.Location.verify(message.location);
                    if (error)
                        return "location." + error;
                }
                if (message.cells != null && message.hasOwnProperty("cells")) {
                    if (!Array.isArray(message.cells))
                        return "cells: array expected";
                    for (var i = 0; i < message.cells.length; ++i) {
                        var error = $root.cucumber.messages.TableCell.verify(message.cells[i]);
                        if (error)
                            return "cells." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a TableRow message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.TableRow
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.TableRow} TableRow
             */
            TableRow.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.TableRow)
                    return object;
                var message = new $root.cucumber.messages.TableRow();
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".cucumber.messages.TableRow.location: object expected");
                    message.location = $root.cucumber.messages.Location.fromObject(object.location);
                }
                if (object.cells) {
                    if (!Array.isArray(object.cells))
                        throw TypeError(".cucumber.messages.TableRow.cells: array expected");
                    message.cells = [];
                    for (var i = 0; i < object.cells.length; ++i) {
                        if (typeof object.cells[i] !== "object")
                            throw TypeError(".cucumber.messages.TableRow.cells: object expected");
                        message.cells[i] = $root.cucumber.messages.TableCell.fromObject(object.cells[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a TableRow message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.TableRow
             * @static
             * @param {cucumber.messages.TableRow} message TableRow
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TableRow.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.cells = [];
                if (options.defaults)
                    object.location = null;
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.cucumber.messages.Location.toObject(message.location, options);
                if (message.cells && message.cells.length) {
                    object.cells = [];
                    for (var j = 0; j < message.cells.length; ++j)
                        object.cells[j] = $root.cucumber.messages.TableCell.toObject(message.cells[j], options);
                }
                return object;
            };

            /**
             * Converts this TableRow to JSON.
             * @function toJSON
             * @memberof cucumber.messages.TableRow
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TableRow.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TableRow;
        })();

        messages.Tag = (function() {

            /**
             * Properties of a Tag.
             * @memberof cucumber.messages
             * @interface ITag
             * @property {cucumber.messages.ILocation|null} [location] Tag location
             * @property {string|null} [name] Tag name
             */

            /**
             * Constructs a new Tag.
             * @memberof cucumber.messages
             * @classdesc Represents a Tag.
             * @implements ITag
             * @constructor
             * @param {cucumber.messages.ITag=} [properties] Properties to set
             */
            function Tag(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Tag location.
             * @member {cucumber.messages.ILocation|null|undefined} location
             * @memberof cucumber.messages.Tag
             * @instance
             */
            Tag.prototype.location = null;

            /**
             * Tag name.
             * @member {string} name
             * @memberof cucumber.messages.Tag
             * @instance
             */
            Tag.prototype.name = "";

            /**
             * Creates a new Tag instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.Tag
             * @static
             * @param {cucumber.messages.ITag=} [properties] Properties to set
             * @returns {cucumber.messages.Tag} Tag instance
             */
            Tag.create = function create(properties) {
                return new Tag(properties);
            };

            /**
             * Encodes the specified Tag message. Does not implicitly {@link cucumber.messages.Tag.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.Tag
             * @static
             * @param {cucumber.messages.ITag} message Tag message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Tag.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                return writer;
            };

            /**
             * Encodes the specified Tag message, length delimited. Does not implicitly {@link cucumber.messages.Tag.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.Tag
             * @static
             * @param {cucumber.messages.ITag} message Tag message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Tag.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Tag message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.Tag
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.Tag} Tag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Tag.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.Tag();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.location = $root.cucumber.messages.Location.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Tag message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.Tag
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.Tag} Tag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Tag.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Tag message.
             * @function verify
             * @memberof cucumber.messages.Tag
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Tag.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.location != null && message.hasOwnProperty("location")) {
                    var error = $root.cucumber.messages.Location.verify(message.location);
                    if (error)
                        return "location." + error;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                return null;
            };

            /**
             * Creates a Tag message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.Tag
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.Tag} Tag
             */
            Tag.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.Tag)
                    return object;
                var message = new $root.cucumber.messages.Tag();
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".cucumber.messages.Tag.location: object expected");
                    message.location = $root.cucumber.messages.Location.fromObject(object.location);
                }
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };

            /**
             * Creates a plain object from a Tag message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.Tag
             * @static
             * @param {cucumber.messages.Tag} message Tag
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Tag.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.location = null;
                    object.name = "";
                }
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.cucumber.messages.Location.toObject(message.location, options);
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                return object;
            };

            /**
             * Converts this Tag to JSON.
             * @function toJSON
             * @memberof cucumber.messages.Tag
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Tag.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Tag;
        })();

        messages.Pickle = (function() {

            /**
             * Properties of a Pickle.
             * @memberof cucumber.messages
             * @interface IPickle
             * @property {string|null} [uri] Pickle uri
             * @property {string|null} [name] Pickle name
             * @property {string|null} [language] Pickle language
             * @property {Array.<cucumber.messages.IPickleStep>|null} [steps] Pickle steps
             * @property {Array.<cucumber.messages.IPickleTag>|null} [tags] Pickle tags
             * @property {Array.<cucumber.messages.ILocation>|null} [locations] Pickle locations
             */

            /**
             * Constructs a new Pickle.
             * @memberof cucumber.messages
             * @classdesc Represents a Pickle.
             * @implements IPickle
             * @constructor
             * @param {cucumber.messages.IPickle=} [properties] Properties to set
             */
            function Pickle(properties) {
                this.steps = [];
                this.tags = [];
                this.locations = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Pickle uri.
             * @member {string} uri
             * @memberof cucumber.messages.Pickle
             * @instance
             */
            Pickle.prototype.uri = "";

            /**
             * Pickle name.
             * @member {string} name
             * @memberof cucumber.messages.Pickle
             * @instance
             */
            Pickle.prototype.name = "";

            /**
             * Pickle language.
             * @member {string} language
             * @memberof cucumber.messages.Pickle
             * @instance
             */
            Pickle.prototype.language = "";

            /**
             * Pickle steps.
             * @member {Array.<cucumber.messages.IPickleStep>} steps
             * @memberof cucumber.messages.Pickle
             * @instance
             */
            Pickle.prototype.steps = $util.emptyArray;

            /**
             * Pickle tags.
             * @member {Array.<cucumber.messages.IPickleTag>} tags
             * @memberof cucumber.messages.Pickle
             * @instance
             */
            Pickle.prototype.tags = $util.emptyArray;

            /**
             * Pickle locations.
             * @member {Array.<cucumber.messages.ILocation>} locations
             * @memberof cucumber.messages.Pickle
             * @instance
             */
            Pickle.prototype.locations = $util.emptyArray;

            /**
             * Creates a new Pickle instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.Pickle
             * @static
             * @param {cucumber.messages.IPickle=} [properties] Properties to set
             * @returns {cucumber.messages.Pickle} Pickle instance
             */
            Pickle.create = function create(properties) {
                return new Pickle(properties);
            };

            /**
             * Encodes the specified Pickle message. Does not implicitly {@link cucumber.messages.Pickle.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.Pickle
             * @static
             * @param {cucumber.messages.IPickle} message Pickle message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Pickle.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uri != null && message.hasOwnProperty("uri"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.uri);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.language != null && message.hasOwnProperty("language"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.language);
                if (message.steps != null && message.steps.length)
                    for (var i = 0; i < message.steps.length; ++i)
                        $root.cucumber.messages.PickleStep.encode(message.steps[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.tags != null && message.tags.length)
                    for (var i = 0; i < message.tags.length; ++i)
                        $root.cucumber.messages.PickleTag.encode(message.tags[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.locations != null && message.locations.length)
                    for (var i = 0; i < message.locations.length; ++i)
                        $root.cucumber.messages.Location.encode(message.locations[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Pickle message, length delimited. Does not implicitly {@link cucumber.messages.Pickle.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.Pickle
             * @static
             * @param {cucumber.messages.IPickle} message Pickle message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Pickle.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Pickle message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.Pickle
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.Pickle} Pickle
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Pickle.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.Pickle();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uri = reader.string();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.language = reader.string();
                        break;
                    case 4:
                        if (!(message.steps && message.steps.length))
                            message.steps = [];
                        message.steps.push($root.cucumber.messages.PickleStep.decode(reader, reader.uint32()));
                        break;
                    case 5:
                        if (!(message.tags && message.tags.length))
                            message.tags = [];
                        message.tags.push($root.cucumber.messages.PickleTag.decode(reader, reader.uint32()));
                        break;
                    case 6:
                        if (!(message.locations && message.locations.length))
                            message.locations = [];
                        message.locations.push($root.cucumber.messages.Location.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Pickle message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.Pickle
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.Pickle} Pickle
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Pickle.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Pickle message.
             * @function verify
             * @memberof cucumber.messages.Pickle
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Pickle.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uri != null && message.hasOwnProperty("uri"))
                    if (!$util.isString(message.uri))
                        return "uri: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.language != null && message.hasOwnProperty("language"))
                    if (!$util.isString(message.language))
                        return "language: string expected";
                if (message.steps != null && message.hasOwnProperty("steps")) {
                    if (!Array.isArray(message.steps))
                        return "steps: array expected";
                    for (var i = 0; i < message.steps.length; ++i) {
                        var error = $root.cucumber.messages.PickleStep.verify(message.steps[i]);
                        if (error)
                            return "steps." + error;
                    }
                }
                if (message.tags != null && message.hasOwnProperty("tags")) {
                    if (!Array.isArray(message.tags))
                        return "tags: array expected";
                    for (var i = 0; i < message.tags.length; ++i) {
                        var error = $root.cucumber.messages.PickleTag.verify(message.tags[i]);
                        if (error)
                            return "tags." + error;
                    }
                }
                if (message.locations != null && message.hasOwnProperty("locations")) {
                    if (!Array.isArray(message.locations))
                        return "locations: array expected";
                    for (var i = 0; i < message.locations.length; ++i) {
                        var error = $root.cucumber.messages.Location.verify(message.locations[i]);
                        if (error)
                            return "locations." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Pickle message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.Pickle
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.Pickle} Pickle
             */
            Pickle.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.Pickle)
                    return object;
                var message = new $root.cucumber.messages.Pickle();
                if (object.uri != null)
                    message.uri = String(object.uri);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.language != null)
                    message.language = String(object.language);
                if (object.steps) {
                    if (!Array.isArray(object.steps))
                        throw TypeError(".cucumber.messages.Pickle.steps: array expected");
                    message.steps = [];
                    for (var i = 0; i < object.steps.length; ++i) {
                        if (typeof object.steps[i] !== "object")
                            throw TypeError(".cucumber.messages.Pickle.steps: object expected");
                        message.steps[i] = $root.cucumber.messages.PickleStep.fromObject(object.steps[i]);
                    }
                }
                if (object.tags) {
                    if (!Array.isArray(object.tags))
                        throw TypeError(".cucumber.messages.Pickle.tags: array expected");
                    message.tags = [];
                    for (var i = 0; i < object.tags.length; ++i) {
                        if (typeof object.tags[i] !== "object")
                            throw TypeError(".cucumber.messages.Pickle.tags: object expected");
                        message.tags[i] = $root.cucumber.messages.PickleTag.fromObject(object.tags[i]);
                    }
                }
                if (object.locations) {
                    if (!Array.isArray(object.locations))
                        throw TypeError(".cucumber.messages.Pickle.locations: array expected");
                    message.locations = [];
                    for (var i = 0; i < object.locations.length; ++i) {
                        if (typeof object.locations[i] !== "object")
                            throw TypeError(".cucumber.messages.Pickle.locations: object expected");
                        message.locations[i] = $root.cucumber.messages.Location.fromObject(object.locations[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Pickle message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.Pickle
             * @static
             * @param {cucumber.messages.Pickle} message Pickle
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Pickle.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.steps = [];
                    object.tags = [];
                    object.locations = [];
                }
                if (options.defaults) {
                    object.uri = "";
                    object.name = "";
                    object.language = "";
                }
                if (message.uri != null && message.hasOwnProperty("uri"))
                    object.uri = message.uri;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.language != null && message.hasOwnProperty("language"))
                    object.language = message.language;
                if (message.steps && message.steps.length) {
                    object.steps = [];
                    for (var j = 0; j < message.steps.length; ++j)
                        object.steps[j] = $root.cucumber.messages.PickleStep.toObject(message.steps[j], options);
                }
                if (message.tags && message.tags.length) {
                    object.tags = [];
                    for (var j = 0; j < message.tags.length; ++j)
                        object.tags[j] = $root.cucumber.messages.PickleTag.toObject(message.tags[j], options);
                }
                if (message.locations && message.locations.length) {
                    object.locations = [];
                    for (var j = 0; j < message.locations.length; ++j)
                        object.locations[j] = $root.cucumber.messages.Location.toObject(message.locations[j], options);
                }
                return object;
            };

            /**
             * Converts this Pickle to JSON.
             * @function toJSON
             * @memberof cucumber.messages.Pickle
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Pickle.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Pickle;
        })();

        messages.PickleDocString = (function() {

            /**
             * Properties of a PickleDocString.
             * @memberof cucumber.messages
             * @interface IPickleDocString
             * @property {cucumber.messages.ILocation|null} [location] PickleDocString location
             * @property {string|null} [contentType] PickleDocString contentType
             * @property {string|null} [content] PickleDocString content
             */

            /**
             * Constructs a new PickleDocString.
             * @memberof cucumber.messages
             * @classdesc Represents a PickleDocString.
             * @implements IPickleDocString
             * @constructor
             * @param {cucumber.messages.IPickleDocString=} [properties] Properties to set
             */
            function PickleDocString(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PickleDocString location.
             * @member {cucumber.messages.ILocation|null|undefined} location
             * @memberof cucumber.messages.PickleDocString
             * @instance
             */
            PickleDocString.prototype.location = null;

            /**
             * PickleDocString contentType.
             * @member {string} contentType
             * @memberof cucumber.messages.PickleDocString
             * @instance
             */
            PickleDocString.prototype.contentType = "";

            /**
             * PickleDocString content.
             * @member {string} content
             * @memberof cucumber.messages.PickleDocString
             * @instance
             */
            PickleDocString.prototype.content = "";

            /**
             * Creates a new PickleDocString instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.PickleDocString
             * @static
             * @param {cucumber.messages.IPickleDocString=} [properties] Properties to set
             * @returns {cucumber.messages.PickleDocString} PickleDocString instance
             */
            PickleDocString.create = function create(properties) {
                return new PickleDocString(properties);
            };

            /**
             * Encodes the specified PickleDocString message. Does not implicitly {@link cucumber.messages.PickleDocString.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.PickleDocString
             * @static
             * @param {cucumber.messages.IPickleDocString} message PickleDocString message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PickleDocString.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.contentType != null && message.hasOwnProperty("contentType"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.contentType);
                if (message.content != null && message.hasOwnProperty("content"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.content);
                return writer;
            };

            /**
             * Encodes the specified PickleDocString message, length delimited. Does not implicitly {@link cucumber.messages.PickleDocString.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.PickleDocString
             * @static
             * @param {cucumber.messages.IPickleDocString} message PickleDocString message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PickleDocString.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PickleDocString message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.PickleDocString
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.PickleDocString} PickleDocString
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PickleDocString.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.PickleDocString();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.location = $root.cucumber.messages.Location.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.contentType = reader.string();
                        break;
                    case 3:
                        message.content = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PickleDocString message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.PickleDocString
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.PickleDocString} PickleDocString
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PickleDocString.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PickleDocString message.
             * @function verify
             * @memberof cucumber.messages.PickleDocString
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PickleDocString.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.location != null && message.hasOwnProperty("location")) {
                    var error = $root.cucumber.messages.Location.verify(message.location);
                    if (error)
                        return "location." + error;
                }
                if (message.contentType != null && message.hasOwnProperty("contentType"))
                    if (!$util.isString(message.contentType))
                        return "contentType: string expected";
                if (message.content != null && message.hasOwnProperty("content"))
                    if (!$util.isString(message.content))
                        return "content: string expected";
                return null;
            };

            /**
             * Creates a PickleDocString message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.PickleDocString
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.PickleDocString} PickleDocString
             */
            PickleDocString.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.PickleDocString)
                    return object;
                var message = new $root.cucumber.messages.PickleDocString();
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".cucumber.messages.PickleDocString.location: object expected");
                    message.location = $root.cucumber.messages.Location.fromObject(object.location);
                }
                if (object.contentType != null)
                    message.contentType = String(object.contentType);
                if (object.content != null)
                    message.content = String(object.content);
                return message;
            };

            /**
             * Creates a plain object from a PickleDocString message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.PickleDocString
             * @static
             * @param {cucumber.messages.PickleDocString} message PickleDocString
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PickleDocString.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.location = null;
                    object.contentType = "";
                    object.content = "";
                }
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.cucumber.messages.Location.toObject(message.location, options);
                if (message.contentType != null && message.hasOwnProperty("contentType"))
                    object.contentType = message.contentType;
                if (message.content != null && message.hasOwnProperty("content"))
                    object.content = message.content;
                return object;
            };

            /**
             * Converts this PickleDocString to JSON.
             * @function toJSON
             * @memberof cucumber.messages.PickleDocString
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PickleDocString.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return PickleDocString;
        })();

        messages.PickleStep = (function() {

            /**
             * Properties of a PickleStep.
             * @memberof cucumber.messages
             * @interface IPickleStep
             * @property {string|null} [text] PickleStep text
             * @property {Array.<cucumber.messages.ILocation>|null} [locations] PickleStep locations
             * @property {cucumber.messages.IPickleDocString|null} [docString] PickleStep docString
             * @property {cucumber.messages.IPickleTable|null} [dataTable] PickleStep dataTable
             */

            /**
             * Constructs a new PickleStep.
             * @memberof cucumber.messages
             * @classdesc Represents a PickleStep.
             * @implements IPickleStep
             * @constructor
             * @param {cucumber.messages.IPickleStep=} [properties] Properties to set
             */
            function PickleStep(properties) {
                this.locations = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PickleStep text.
             * @member {string} text
             * @memberof cucumber.messages.PickleStep
             * @instance
             */
            PickleStep.prototype.text = "";

            /**
             * PickleStep locations.
             * @member {Array.<cucumber.messages.ILocation>} locations
             * @memberof cucumber.messages.PickleStep
             * @instance
             */
            PickleStep.prototype.locations = $util.emptyArray;

            /**
             * PickleStep docString.
             * @member {cucumber.messages.IPickleDocString|null|undefined} docString
             * @memberof cucumber.messages.PickleStep
             * @instance
             */
            PickleStep.prototype.docString = null;

            /**
             * PickleStep dataTable.
             * @member {cucumber.messages.IPickleTable|null|undefined} dataTable
             * @memberof cucumber.messages.PickleStep
             * @instance
             */
            PickleStep.prototype.dataTable = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * PickleStep argument.
             * @member {"docString"|"dataTable"|undefined} argument
             * @memberof cucumber.messages.PickleStep
             * @instance
             */
            Object.defineProperty(PickleStep.prototype, "argument", {
                get: $util.oneOfGetter($oneOfFields = ["docString", "dataTable"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new PickleStep instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.PickleStep
             * @static
             * @param {cucumber.messages.IPickleStep=} [properties] Properties to set
             * @returns {cucumber.messages.PickleStep} PickleStep instance
             */
            PickleStep.create = function create(properties) {
                return new PickleStep(properties);
            };

            /**
             * Encodes the specified PickleStep message. Does not implicitly {@link cucumber.messages.PickleStep.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.PickleStep
             * @static
             * @param {cucumber.messages.IPickleStep} message PickleStep message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PickleStep.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.text != null && message.hasOwnProperty("text"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
                if (message.locations != null && message.locations.length)
                    for (var i = 0; i < message.locations.length; ++i)
                        $root.cucumber.messages.Location.encode(message.locations[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.docString != null && message.hasOwnProperty("docString"))
                    $root.cucumber.messages.PickleDocString.encode(message.docString, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.dataTable != null && message.hasOwnProperty("dataTable"))
                    $root.cucumber.messages.PickleTable.encode(message.dataTable, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified PickleStep message, length delimited. Does not implicitly {@link cucumber.messages.PickleStep.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.PickleStep
             * @static
             * @param {cucumber.messages.IPickleStep} message PickleStep message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PickleStep.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PickleStep message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.PickleStep
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.PickleStep} PickleStep
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PickleStep.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.PickleStep();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.text = reader.string();
                        break;
                    case 2:
                        if (!(message.locations && message.locations.length))
                            message.locations = [];
                        message.locations.push($root.cucumber.messages.Location.decode(reader, reader.uint32()));
                        break;
                    case 3:
                        message.docString = $root.cucumber.messages.PickleDocString.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.dataTable = $root.cucumber.messages.PickleTable.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PickleStep message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.PickleStep
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.PickleStep} PickleStep
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PickleStep.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PickleStep message.
             * @function verify
             * @memberof cucumber.messages.PickleStep
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PickleStep.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.text != null && message.hasOwnProperty("text"))
                    if (!$util.isString(message.text))
                        return "text: string expected";
                if (message.locations != null && message.hasOwnProperty("locations")) {
                    if (!Array.isArray(message.locations))
                        return "locations: array expected";
                    for (var i = 0; i < message.locations.length; ++i) {
                        var error = $root.cucumber.messages.Location.verify(message.locations[i]);
                        if (error)
                            return "locations." + error;
                    }
                }
                if (message.docString != null && message.hasOwnProperty("docString")) {
                    properties.argument = 1;
                    {
                        var error = $root.cucumber.messages.PickleDocString.verify(message.docString);
                        if (error)
                            return "docString." + error;
                    }
                }
                if (message.dataTable != null && message.hasOwnProperty("dataTable")) {
                    if (properties.argument === 1)
                        return "argument: multiple values";
                    properties.argument = 1;
                    {
                        var error = $root.cucumber.messages.PickleTable.verify(message.dataTable);
                        if (error)
                            return "dataTable." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a PickleStep message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.PickleStep
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.PickleStep} PickleStep
             */
            PickleStep.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.PickleStep)
                    return object;
                var message = new $root.cucumber.messages.PickleStep();
                if (object.text != null)
                    message.text = String(object.text);
                if (object.locations) {
                    if (!Array.isArray(object.locations))
                        throw TypeError(".cucumber.messages.PickleStep.locations: array expected");
                    message.locations = [];
                    for (var i = 0; i < object.locations.length; ++i) {
                        if (typeof object.locations[i] !== "object")
                            throw TypeError(".cucumber.messages.PickleStep.locations: object expected");
                        message.locations[i] = $root.cucumber.messages.Location.fromObject(object.locations[i]);
                    }
                }
                if (object.docString != null) {
                    if (typeof object.docString !== "object")
                        throw TypeError(".cucumber.messages.PickleStep.docString: object expected");
                    message.docString = $root.cucumber.messages.PickleDocString.fromObject(object.docString);
                }
                if (object.dataTable != null) {
                    if (typeof object.dataTable !== "object")
                        throw TypeError(".cucumber.messages.PickleStep.dataTable: object expected");
                    message.dataTable = $root.cucumber.messages.PickleTable.fromObject(object.dataTable);
                }
                return message;
            };

            /**
             * Creates a plain object from a PickleStep message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.PickleStep
             * @static
             * @param {cucumber.messages.PickleStep} message PickleStep
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PickleStep.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.locations = [];
                if (options.defaults)
                    object.text = "";
                if (message.text != null && message.hasOwnProperty("text"))
                    object.text = message.text;
                if (message.locations && message.locations.length) {
                    object.locations = [];
                    for (var j = 0; j < message.locations.length; ++j)
                        object.locations[j] = $root.cucumber.messages.Location.toObject(message.locations[j], options);
                }
                if (message.docString != null && message.hasOwnProperty("docString")) {
                    object.docString = $root.cucumber.messages.PickleDocString.toObject(message.docString, options);
                    if (options.oneofs)
                        object.argument = "docString";
                }
                if (message.dataTable != null && message.hasOwnProperty("dataTable")) {
                    object.dataTable = $root.cucumber.messages.PickleTable.toObject(message.dataTable, options);
                    if (options.oneofs)
                        object.argument = "dataTable";
                }
                return object;
            };

            /**
             * Converts this PickleStep to JSON.
             * @function toJSON
             * @memberof cucumber.messages.PickleStep
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PickleStep.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return PickleStep;
        })();

        messages.PickleTable = (function() {

            /**
             * Properties of a PickleTable.
             * @memberof cucumber.messages
             * @interface IPickleTable
             * @property {Array.<cucumber.messages.IPickleTableRow>|null} [rows] PickleTable rows
             */

            /**
             * Constructs a new PickleTable.
             * @memberof cucumber.messages
             * @classdesc Represents a PickleTable.
             * @implements IPickleTable
             * @constructor
             * @param {cucumber.messages.IPickleTable=} [properties] Properties to set
             */
            function PickleTable(properties) {
                this.rows = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PickleTable rows.
             * @member {Array.<cucumber.messages.IPickleTableRow>} rows
             * @memberof cucumber.messages.PickleTable
             * @instance
             */
            PickleTable.prototype.rows = $util.emptyArray;

            /**
             * Creates a new PickleTable instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.PickleTable
             * @static
             * @param {cucumber.messages.IPickleTable=} [properties] Properties to set
             * @returns {cucumber.messages.PickleTable} PickleTable instance
             */
            PickleTable.create = function create(properties) {
                return new PickleTable(properties);
            };

            /**
             * Encodes the specified PickleTable message. Does not implicitly {@link cucumber.messages.PickleTable.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.PickleTable
             * @static
             * @param {cucumber.messages.IPickleTable} message PickleTable message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PickleTable.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.rows != null && message.rows.length)
                    for (var i = 0; i < message.rows.length; ++i)
                        $root.cucumber.messages.PickleTableRow.encode(message.rows[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified PickleTable message, length delimited. Does not implicitly {@link cucumber.messages.PickleTable.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.PickleTable
             * @static
             * @param {cucumber.messages.IPickleTable} message PickleTable message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PickleTable.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PickleTable message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.PickleTable
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.PickleTable} PickleTable
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PickleTable.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.PickleTable();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.rows && message.rows.length))
                            message.rows = [];
                        message.rows.push($root.cucumber.messages.PickleTableRow.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PickleTable message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.PickleTable
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.PickleTable} PickleTable
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PickleTable.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PickleTable message.
             * @function verify
             * @memberof cucumber.messages.PickleTable
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PickleTable.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.rows != null && message.hasOwnProperty("rows")) {
                    if (!Array.isArray(message.rows))
                        return "rows: array expected";
                    for (var i = 0; i < message.rows.length; ++i) {
                        var error = $root.cucumber.messages.PickleTableRow.verify(message.rows[i]);
                        if (error)
                            return "rows." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a PickleTable message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.PickleTable
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.PickleTable} PickleTable
             */
            PickleTable.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.PickleTable)
                    return object;
                var message = new $root.cucumber.messages.PickleTable();
                if (object.rows) {
                    if (!Array.isArray(object.rows))
                        throw TypeError(".cucumber.messages.PickleTable.rows: array expected");
                    message.rows = [];
                    for (var i = 0; i < object.rows.length; ++i) {
                        if (typeof object.rows[i] !== "object")
                            throw TypeError(".cucumber.messages.PickleTable.rows: object expected");
                        message.rows[i] = $root.cucumber.messages.PickleTableRow.fromObject(object.rows[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a PickleTable message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.PickleTable
             * @static
             * @param {cucumber.messages.PickleTable} message PickleTable
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PickleTable.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.rows = [];
                if (message.rows && message.rows.length) {
                    object.rows = [];
                    for (var j = 0; j < message.rows.length; ++j)
                        object.rows[j] = $root.cucumber.messages.PickleTableRow.toObject(message.rows[j], options);
                }
                return object;
            };

            /**
             * Converts this PickleTable to JSON.
             * @function toJSON
             * @memberof cucumber.messages.PickleTable
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PickleTable.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return PickleTable;
        })();

        messages.PickleTableCell = (function() {

            /**
             * Properties of a PickleTableCell.
             * @memberof cucumber.messages
             * @interface IPickleTableCell
             * @property {cucumber.messages.ILocation|null} [location] PickleTableCell location
             * @property {string|null} [value] PickleTableCell value
             */

            /**
             * Constructs a new PickleTableCell.
             * @memberof cucumber.messages
             * @classdesc Represents a PickleTableCell.
             * @implements IPickleTableCell
             * @constructor
             * @param {cucumber.messages.IPickleTableCell=} [properties] Properties to set
             */
            function PickleTableCell(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PickleTableCell location.
             * @member {cucumber.messages.ILocation|null|undefined} location
             * @memberof cucumber.messages.PickleTableCell
             * @instance
             */
            PickleTableCell.prototype.location = null;

            /**
             * PickleTableCell value.
             * @member {string} value
             * @memberof cucumber.messages.PickleTableCell
             * @instance
             */
            PickleTableCell.prototype.value = "";

            /**
             * Creates a new PickleTableCell instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.PickleTableCell
             * @static
             * @param {cucumber.messages.IPickleTableCell=} [properties] Properties to set
             * @returns {cucumber.messages.PickleTableCell} PickleTableCell instance
             */
            PickleTableCell.create = function create(properties) {
                return new PickleTableCell(properties);
            };

            /**
             * Encodes the specified PickleTableCell message. Does not implicitly {@link cucumber.messages.PickleTableCell.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.PickleTableCell
             * @static
             * @param {cucumber.messages.IPickleTableCell} message PickleTableCell message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PickleTableCell.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.value);
                return writer;
            };

            /**
             * Encodes the specified PickleTableCell message, length delimited. Does not implicitly {@link cucumber.messages.PickleTableCell.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.PickleTableCell
             * @static
             * @param {cucumber.messages.IPickleTableCell} message PickleTableCell message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PickleTableCell.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PickleTableCell message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.PickleTableCell
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.PickleTableCell} PickleTableCell
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PickleTableCell.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.PickleTableCell();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.location = $root.cucumber.messages.Location.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.value = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PickleTableCell message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.PickleTableCell
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.PickleTableCell} PickleTableCell
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PickleTableCell.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PickleTableCell message.
             * @function verify
             * @memberof cucumber.messages.PickleTableCell
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PickleTableCell.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.location != null && message.hasOwnProperty("location")) {
                    var error = $root.cucumber.messages.Location.verify(message.location);
                    if (error)
                        return "location." + error;
                }
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!$util.isString(message.value))
                        return "value: string expected";
                return null;
            };

            /**
             * Creates a PickleTableCell message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.PickleTableCell
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.PickleTableCell} PickleTableCell
             */
            PickleTableCell.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.PickleTableCell)
                    return object;
                var message = new $root.cucumber.messages.PickleTableCell();
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".cucumber.messages.PickleTableCell.location: object expected");
                    message.location = $root.cucumber.messages.Location.fromObject(object.location);
                }
                if (object.value != null)
                    message.value = String(object.value);
                return message;
            };

            /**
             * Creates a plain object from a PickleTableCell message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.PickleTableCell
             * @static
             * @param {cucumber.messages.PickleTableCell} message PickleTableCell
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PickleTableCell.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.location = null;
                    object.value = "";
                }
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.cucumber.messages.Location.toObject(message.location, options);
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = message.value;
                return object;
            };

            /**
             * Converts this PickleTableCell to JSON.
             * @function toJSON
             * @memberof cucumber.messages.PickleTableCell
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PickleTableCell.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return PickleTableCell;
        })();

        messages.PickleTableRow = (function() {

            /**
             * Properties of a PickleTableRow.
             * @memberof cucumber.messages
             * @interface IPickleTableRow
             * @property {Array.<cucumber.messages.IPickleTableCell>|null} [cells] PickleTableRow cells
             */

            /**
             * Constructs a new PickleTableRow.
             * @memberof cucumber.messages
             * @classdesc Represents a PickleTableRow.
             * @implements IPickleTableRow
             * @constructor
             * @param {cucumber.messages.IPickleTableRow=} [properties] Properties to set
             */
            function PickleTableRow(properties) {
                this.cells = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PickleTableRow cells.
             * @member {Array.<cucumber.messages.IPickleTableCell>} cells
             * @memberof cucumber.messages.PickleTableRow
             * @instance
             */
            PickleTableRow.prototype.cells = $util.emptyArray;

            /**
             * Creates a new PickleTableRow instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.PickleTableRow
             * @static
             * @param {cucumber.messages.IPickleTableRow=} [properties] Properties to set
             * @returns {cucumber.messages.PickleTableRow} PickleTableRow instance
             */
            PickleTableRow.create = function create(properties) {
                return new PickleTableRow(properties);
            };

            /**
             * Encodes the specified PickleTableRow message. Does not implicitly {@link cucumber.messages.PickleTableRow.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.PickleTableRow
             * @static
             * @param {cucumber.messages.IPickleTableRow} message PickleTableRow message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PickleTableRow.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.cells != null && message.cells.length)
                    for (var i = 0; i < message.cells.length; ++i)
                        $root.cucumber.messages.PickleTableCell.encode(message.cells[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified PickleTableRow message, length delimited. Does not implicitly {@link cucumber.messages.PickleTableRow.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.PickleTableRow
             * @static
             * @param {cucumber.messages.IPickleTableRow} message PickleTableRow message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PickleTableRow.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PickleTableRow message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.PickleTableRow
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.PickleTableRow} PickleTableRow
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PickleTableRow.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.PickleTableRow();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.cells && message.cells.length))
                            message.cells = [];
                        message.cells.push($root.cucumber.messages.PickleTableCell.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PickleTableRow message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.PickleTableRow
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.PickleTableRow} PickleTableRow
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PickleTableRow.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PickleTableRow message.
             * @function verify
             * @memberof cucumber.messages.PickleTableRow
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PickleTableRow.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.cells != null && message.hasOwnProperty("cells")) {
                    if (!Array.isArray(message.cells))
                        return "cells: array expected";
                    for (var i = 0; i < message.cells.length; ++i) {
                        var error = $root.cucumber.messages.PickleTableCell.verify(message.cells[i]);
                        if (error)
                            return "cells." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a PickleTableRow message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.PickleTableRow
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.PickleTableRow} PickleTableRow
             */
            PickleTableRow.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.PickleTableRow)
                    return object;
                var message = new $root.cucumber.messages.PickleTableRow();
                if (object.cells) {
                    if (!Array.isArray(object.cells))
                        throw TypeError(".cucumber.messages.PickleTableRow.cells: array expected");
                    message.cells = [];
                    for (var i = 0; i < object.cells.length; ++i) {
                        if (typeof object.cells[i] !== "object")
                            throw TypeError(".cucumber.messages.PickleTableRow.cells: object expected");
                        message.cells[i] = $root.cucumber.messages.PickleTableCell.fromObject(object.cells[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a PickleTableRow message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.PickleTableRow
             * @static
             * @param {cucumber.messages.PickleTableRow} message PickleTableRow
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PickleTableRow.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.cells = [];
                if (message.cells && message.cells.length) {
                    object.cells = [];
                    for (var j = 0; j < message.cells.length; ++j)
                        object.cells[j] = $root.cucumber.messages.PickleTableCell.toObject(message.cells[j], options);
                }
                return object;
            };

            /**
             * Converts this PickleTableRow to JSON.
             * @function toJSON
             * @memberof cucumber.messages.PickleTableRow
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PickleTableRow.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return PickleTableRow;
        })();

        messages.PickleTag = (function() {

            /**
             * Properties of a PickleTag.
             * @memberof cucumber.messages
             * @interface IPickleTag
             * @property {cucumber.messages.ILocation|null} [location] PickleTag location
             * @property {string|null} [name] PickleTag name
             */

            /**
             * Constructs a new PickleTag.
             * @memberof cucumber.messages
             * @classdesc Represents a PickleTag.
             * @implements IPickleTag
             * @constructor
             * @param {cucumber.messages.IPickleTag=} [properties] Properties to set
             */
            function PickleTag(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PickleTag location.
             * @member {cucumber.messages.ILocation|null|undefined} location
             * @memberof cucumber.messages.PickleTag
             * @instance
             */
            PickleTag.prototype.location = null;

            /**
             * PickleTag name.
             * @member {string} name
             * @memberof cucumber.messages.PickleTag
             * @instance
             */
            PickleTag.prototype.name = "";

            /**
             * Creates a new PickleTag instance using the specified properties.
             * @function create
             * @memberof cucumber.messages.PickleTag
             * @static
             * @param {cucumber.messages.IPickleTag=} [properties] Properties to set
             * @returns {cucumber.messages.PickleTag} PickleTag instance
             */
            PickleTag.create = function create(properties) {
                return new PickleTag(properties);
            };

            /**
             * Encodes the specified PickleTag message. Does not implicitly {@link cucumber.messages.PickleTag.verify|verify} messages.
             * @function encode
             * @memberof cucumber.messages.PickleTag
             * @static
             * @param {cucumber.messages.IPickleTag} message PickleTag message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PickleTag.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                return writer;
            };

            /**
             * Encodes the specified PickleTag message, length delimited. Does not implicitly {@link cucumber.messages.PickleTag.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cucumber.messages.PickleTag
             * @static
             * @param {cucumber.messages.IPickleTag} message PickleTag message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PickleTag.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PickleTag message from the specified reader or buffer.
             * @function decode
             * @memberof cucumber.messages.PickleTag
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cucumber.messages.PickleTag} PickleTag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PickleTag.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cucumber.messages.PickleTag();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.location = $root.cucumber.messages.Location.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PickleTag message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cucumber.messages.PickleTag
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cucumber.messages.PickleTag} PickleTag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PickleTag.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PickleTag message.
             * @function verify
             * @memberof cucumber.messages.PickleTag
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PickleTag.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.location != null && message.hasOwnProperty("location")) {
                    var error = $root.cucumber.messages.Location.verify(message.location);
                    if (error)
                        return "location." + error;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                return null;
            };

            /**
             * Creates a PickleTag message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cucumber.messages.PickleTag
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cucumber.messages.PickleTag} PickleTag
             */
            PickleTag.fromObject = function fromObject(object) {
                if (object instanceof $root.cucumber.messages.PickleTag)
                    return object;
                var message = new $root.cucumber.messages.PickleTag();
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".cucumber.messages.PickleTag.location: object expected");
                    message.location = $root.cucumber.messages.Location.fromObject(object.location);
                }
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };

            /**
             * Creates a plain object from a PickleTag message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cucumber.messages.PickleTag
             * @static
             * @param {cucumber.messages.PickleTag} message PickleTag
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PickleTag.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.location = null;
                    object.name = "";
                }
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.cucumber.messages.Location.toObject(message.location, options);
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                return object;
            };

            /**
             * Converts this PickleTag to JSON.
             * @function toJSON
             * @memberof cucumber.messages.PickleTag
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PickleTag.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return PickleTag;
        })();

        return messages;
    })();

    return cucumber;
})();

module.exports = $root;
