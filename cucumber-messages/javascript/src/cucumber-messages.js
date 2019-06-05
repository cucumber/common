/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.io = (function() {

    /**
     * Namespace io.
     * @exports io
     * @namespace
     */
    var io = {};

    io.cucumber = (function() {

        /**
         * Namespace cucumber.
         * @memberof io
         * @namespace
         */
        var cucumber = {};

        cucumber.messages = (function() {

            /**
             * Namespace messages.
             * @memberof io.cucumber
             * @namespace
             */
            var messages = {};

            messages.Wrapper = (function() {

                /**
                 * Properties of a Wrapper.
                 * @memberof io.cucumber.messages
                 * @interface IWrapper
                 * @property {io.cucumber.messages.ISource|null} [source] Wrapper source
                 * @property {io.cucumber.messages.IGherkinDocument|null} [gherkinDocument] Wrapper gherkinDocument
                 * @property {io.cucumber.messages.IPickle|null} [pickle] Wrapper pickle
                 * @property {io.cucumber.messages.IAttachment|null} [attachment] Wrapper attachment
                 * @property {io.cucumber.messages.ITestCaseStarted|null} [testCaseStarted] Wrapper testCaseStarted
                 * @property {io.cucumber.messages.ITestStepStarted|null} [testStepStarted] Wrapper testStepStarted
                 * @property {io.cucumber.messages.ITestStepFinished|null} [testStepFinished] Wrapper testStepFinished
                 * @property {io.cucumber.messages.ITestCaseFinished|null} [testCaseFinished] Wrapper testCaseFinished
                 * @property {io.cucumber.messages.ITestHookStarted|null} [testHookStarted] Wrapper testHookStarted
                 * @property {io.cucumber.messages.ITestHookFinished|null} [testHookFinished] Wrapper testHookFinished
                 * @property {io.cucumber.messages.IPickleAccepted|null} [pickleAccepted] Wrapper pickleAccepted
                 * @property {io.cucumber.messages.IPickleRejected|null} [pickleRejected] Wrapper pickleRejected
                 * @property {io.cucumber.messages.ITestCasePrepared|null} [testCasePrepared] Wrapper testCasePrepared
                 * @property {io.cucumber.messages.ITestRunStarted|null} [testRunStarted] Wrapper testRunStarted
                 * @property {io.cucumber.messages.ITestRunFinished|null} [testRunFinished] Wrapper testRunFinished
                 * @property {io.cucumber.messages.ICommandStart|null} [commandStart] Wrapper commandStart
                 * @property {io.cucumber.messages.ICommandActionComplete|null} [commandActionComplete] Wrapper commandActionComplete
                 * @property {io.cucumber.messages.ICommandRunBeforeTestRunHooks|null} [commandRunBeforeTestRunHooks] Wrapper commandRunBeforeTestRunHooks
                 * @property {io.cucumber.messages.ICommandInitializeTestCase|null} [commandInitializeTestCase] Wrapper commandInitializeTestCase
                 * @property {io.cucumber.messages.ICommandRunBeforeTestCaseHook|null} [commandRunBeforeTestCaseHook] Wrapper commandRunBeforeTestCaseHook
                 * @property {io.cucumber.messages.ICommandRunTestStep|null} [commandRunTestStep] Wrapper commandRunTestStep
                 * @property {io.cucumber.messages.ICommandRunAfterTestCaseHook|null} [commandRunAfterTestCaseHook] Wrapper commandRunAfterTestCaseHook
                 * @property {io.cucumber.messages.ICommandRunAfterTestRunHooks|null} [commandRunAfterTestRunHooks] Wrapper commandRunAfterTestRunHooks
                 * @property {io.cucumber.messages.ICommandGenerateSnippet|null} [commandGenerateSnippet] Wrapper commandGenerateSnippet
                 * @property {string|null} [commandError] Wrapper commandError
                 */

                /**
                 * Constructs a new Wrapper.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a Wrapper.
                 * @implements IWrapper
                 * @constructor
                 * @param {io.cucumber.messages.IWrapper=} [properties] Properties to set
                 */
                function Wrapper(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Wrapper source.
                 * @member {io.cucumber.messages.ISource|null|undefined} source
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.source = null;

                /**
                 * Wrapper gherkinDocument.
                 * @member {io.cucumber.messages.IGherkinDocument|null|undefined} gherkinDocument
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.gherkinDocument = null;

                /**
                 * Wrapper pickle.
                 * @member {io.cucumber.messages.IPickle|null|undefined} pickle
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.pickle = null;

                /**
                 * Wrapper attachment.
                 * @member {io.cucumber.messages.IAttachment|null|undefined} attachment
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.attachment = null;

                /**
                 * Wrapper testCaseStarted.
                 * @member {io.cucumber.messages.ITestCaseStarted|null|undefined} testCaseStarted
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.testCaseStarted = null;

                /**
                 * Wrapper testStepStarted.
                 * @member {io.cucumber.messages.ITestStepStarted|null|undefined} testStepStarted
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.testStepStarted = null;

                /**
                 * Wrapper testStepFinished.
                 * @member {io.cucumber.messages.ITestStepFinished|null|undefined} testStepFinished
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.testStepFinished = null;

                /**
                 * Wrapper testCaseFinished.
                 * @member {io.cucumber.messages.ITestCaseFinished|null|undefined} testCaseFinished
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.testCaseFinished = null;

                /**
                 * Wrapper testHookStarted.
                 * @member {io.cucumber.messages.ITestHookStarted|null|undefined} testHookStarted
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.testHookStarted = null;

                /**
                 * Wrapper testHookFinished.
                 * @member {io.cucumber.messages.ITestHookFinished|null|undefined} testHookFinished
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.testHookFinished = null;

                /**
                 * Wrapper pickleAccepted.
                 * @member {io.cucumber.messages.IPickleAccepted|null|undefined} pickleAccepted
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.pickleAccepted = null;

                /**
                 * Wrapper pickleRejected.
                 * @member {io.cucumber.messages.IPickleRejected|null|undefined} pickleRejected
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.pickleRejected = null;

                /**
                 * Wrapper testCasePrepared.
                 * @member {io.cucumber.messages.ITestCasePrepared|null|undefined} testCasePrepared
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.testCasePrepared = null;

                /**
                 * Wrapper testRunStarted.
                 * @member {io.cucumber.messages.ITestRunStarted|null|undefined} testRunStarted
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.testRunStarted = null;

                /**
                 * Wrapper testRunFinished.
                 * @member {io.cucumber.messages.ITestRunFinished|null|undefined} testRunFinished
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.testRunFinished = null;

                /**
                 * Wrapper commandStart.
                 * @member {io.cucumber.messages.ICommandStart|null|undefined} commandStart
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.commandStart = null;

                /**
                 * Wrapper commandActionComplete.
                 * @member {io.cucumber.messages.ICommandActionComplete|null|undefined} commandActionComplete
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.commandActionComplete = null;

                /**
                 * Wrapper commandRunBeforeTestRunHooks.
                 * @member {io.cucumber.messages.ICommandRunBeforeTestRunHooks|null|undefined} commandRunBeforeTestRunHooks
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.commandRunBeforeTestRunHooks = null;

                /**
                 * Wrapper commandInitializeTestCase.
                 * @member {io.cucumber.messages.ICommandInitializeTestCase|null|undefined} commandInitializeTestCase
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.commandInitializeTestCase = null;

                /**
                 * Wrapper commandRunBeforeTestCaseHook.
                 * @member {io.cucumber.messages.ICommandRunBeforeTestCaseHook|null|undefined} commandRunBeforeTestCaseHook
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.commandRunBeforeTestCaseHook = null;

                /**
                 * Wrapper commandRunTestStep.
                 * @member {io.cucumber.messages.ICommandRunTestStep|null|undefined} commandRunTestStep
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.commandRunTestStep = null;

                /**
                 * Wrapper commandRunAfterTestCaseHook.
                 * @member {io.cucumber.messages.ICommandRunAfterTestCaseHook|null|undefined} commandRunAfterTestCaseHook
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.commandRunAfterTestCaseHook = null;

                /**
                 * Wrapper commandRunAfterTestRunHooks.
                 * @member {io.cucumber.messages.ICommandRunAfterTestRunHooks|null|undefined} commandRunAfterTestRunHooks
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.commandRunAfterTestRunHooks = null;

                /**
                 * Wrapper commandGenerateSnippet.
                 * @member {io.cucumber.messages.ICommandGenerateSnippet|null|undefined} commandGenerateSnippet
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.commandGenerateSnippet = null;

                /**
                 * Wrapper commandError.
                 * @member {string} commandError
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Wrapper.prototype.commandError = "";

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * Wrapper message.
                 * @member {"source"|"gherkinDocument"|"pickle"|"attachment"|"testCaseStarted"|"testStepStarted"|"testStepFinished"|"testCaseFinished"|"testHookStarted"|"testHookFinished"|"pickleAccepted"|"pickleRejected"|"testCasePrepared"|"testRunStarted"|"testRunFinished"|"commandStart"|"commandActionComplete"|"commandRunBeforeTestRunHooks"|"commandInitializeTestCase"|"commandRunBeforeTestCaseHook"|"commandRunTestStep"|"commandRunAfterTestCaseHook"|"commandRunAfterTestRunHooks"|"commandGenerateSnippet"|"commandError"|undefined} message
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 */
                Object.defineProperty(Wrapper.prototype, "message", {
                    get: $util.oneOfGetter($oneOfFields = ["source", "gherkinDocument", "pickle", "attachment", "testCaseStarted", "testStepStarted", "testStepFinished", "testCaseFinished", "testHookStarted", "testHookFinished", "pickleAccepted", "pickleRejected", "testCasePrepared", "testRunStarted", "testRunFinished", "commandStart", "commandActionComplete", "commandRunBeforeTestRunHooks", "commandInitializeTestCase", "commandRunBeforeTestCaseHook", "commandRunTestStep", "commandRunAfterTestCaseHook", "commandRunAfterTestRunHooks", "commandGenerateSnippet", "commandError"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new Wrapper instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.Wrapper
                 * @static
                 * @param {io.cucumber.messages.IWrapper=} [properties] Properties to set
                 * @returns {io.cucumber.messages.Wrapper} Wrapper instance
                 */
                Wrapper.create = function create(properties) {
                    return new Wrapper(properties);
                };

                /**
                 * Encodes the specified Wrapper message. Does not implicitly {@link io.cucumber.messages.Wrapper.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.Wrapper
                 * @static
                 * @param {io.cucumber.messages.IWrapper} message Wrapper message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Wrapper.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.source != null && message.hasOwnProperty("source"))
                        $root.io.cucumber.messages.Source.encode(message.source, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.gherkinDocument != null && message.hasOwnProperty("gherkinDocument"))
                        $root.io.cucumber.messages.GherkinDocument.encode(message.gherkinDocument, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.pickle != null && message.hasOwnProperty("pickle"))
                        $root.io.cucumber.messages.Pickle.encode(message.pickle, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.attachment != null && message.hasOwnProperty("attachment"))
                        $root.io.cucumber.messages.Attachment.encode(message.attachment, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.testCaseStarted != null && message.hasOwnProperty("testCaseStarted"))
                        $root.io.cucumber.messages.TestCaseStarted.encode(message.testCaseStarted, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    if (message.testStepStarted != null && message.hasOwnProperty("testStepStarted"))
                        $root.io.cucumber.messages.TestStepStarted.encode(message.testStepStarted, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    if (message.testStepFinished != null && message.hasOwnProperty("testStepFinished"))
                        $root.io.cucumber.messages.TestStepFinished.encode(message.testStepFinished, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                    if (message.testCaseFinished != null && message.hasOwnProperty("testCaseFinished"))
                        $root.io.cucumber.messages.TestCaseFinished.encode(message.testCaseFinished, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                    if (message.testHookStarted != null && message.hasOwnProperty("testHookStarted"))
                        $root.io.cucumber.messages.TestHookStarted.encode(message.testHookStarted, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                    if (message.testHookFinished != null && message.hasOwnProperty("testHookFinished"))
                        $root.io.cucumber.messages.TestHookFinished.encode(message.testHookFinished, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                    if (message.pickleAccepted != null && message.hasOwnProperty("pickleAccepted"))
                        $root.io.cucumber.messages.PickleAccepted.encode(message.pickleAccepted, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                    if (message.pickleRejected != null && message.hasOwnProperty("pickleRejected"))
                        $root.io.cucumber.messages.PickleRejected.encode(message.pickleRejected, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                    if (message.testCasePrepared != null && message.hasOwnProperty("testCasePrepared"))
                        $root.io.cucumber.messages.TestCasePrepared.encode(message.testCasePrepared, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
                    if (message.testRunStarted != null && message.hasOwnProperty("testRunStarted"))
                        $root.io.cucumber.messages.TestRunStarted.encode(message.testRunStarted, writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
                    if (message.testRunFinished != null && message.hasOwnProperty("testRunFinished"))
                        $root.io.cucumber.messages.TestRunFinished.encode(message.testRunFinished, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
                    if (message.commandStart != null && message.hasOwnProperty("commandStart"))
                        $root.io.cucumber.messages.CommandStart.encode(message.commandStart, writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
                    if (message.commandActionComplete != null && message.hasOwnProperty("commandActionComplete"))
                        $root.io.cucumber.messages.CommandActionComplete.encode(message.commandActionComplete, writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
                    if (message.commandRunBeforeTestRunHooks != null && message.hasOwnProperty("commandRunBeforeTestRunHooks"))
                        $root.io.cucumber.messages.CommandRunBeforeTestRunHooks.encode(message.commandRunBeforeTestRunHooks, writer.uint32(/* id 18, wireType 2 =*/146).fork()).ldelim();
                    if (message.commandInitializeTestCase != null && message.hasOwnProperty("commandInitializeTestCase"))
                        $root.io.cucumber.messages.CommandInitializeTestCase.encode(message.commandInitializeTestCase, writer.uint32(/* id 19, wireType 2 =*/154).fork()).ldelim();
                    if (message.commandRunBeforeTestCaseHook != null && message.hasOwnProperty("commandRunBeforeTestCaseHook"))
                        $root.io.cucumber.messages.CommandRunBeforeTestCaseHook.encode(message.commandRunBeforeTestCaseHook, writer.uint32(/* id 20, wireType 2 =*/162).fork()).ldelim();
                    if (message.commandRunTestStep != null && message.hasOwnProperty("commandRunTestStep"))
                        $root.io.cucumber.messages.CommandRunTestStep.encode(message.commandRunTestStep, writer.uint32(/* id 21, wireType 2 =*/170).fork()).ldelim();
                    if (message.commandRunAfterTestCaseHook != null && message.hasOwnProperty("commandRunAfterTestCaseHook"))
                        $root.io.cucumber.messages.CommandRunAfterTestCaseHook.encode(message.commandRunAfterTestCaseHook, writer.uint32(/* id 22, wireType 2 =*/178).fork()).ldelim();
                    if (message.commandRunAfterTestRunHooks != null && message.hasOwnProperty("commandRunAfterTestRunHooks"))
                        $root.io.cucumber.messages.CommandRunAfterTestRunHooks.encode(message.commandRunAfterTestRunHooks, writer.uint32(/* id 23, wireType 2 =*/186).fork()).ldelim();
                    if (message.commandGenerateSnippet != null && message.hasOwnProperty("commandGenerateSnippet"))
                        $root.io.cucumber.messages.CommandGenerateSnippet.encode(message.commandGenerateSnippet, writer.uint32(/* id 24, wireType 2 =*/194).fork()).ldelim();
                    if (message.commandError != null && message.hasOwnProperty("commandError"))
                        writer.uint32(/* id 25, wireType 2 =*/202).string(message.commandError);
                    return writer;
                };

                /**
                 * Encodes the specified Wrapper message, length delimited. Does not implicitly {@link io.cucumber.messages.Wrapper.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.Wrapper
                 * @static
                 * @param {io.cucumber.messages.IWrapper} message Wrapper message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Wrapper.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Wrapper message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.Wrapper
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.Wrapper} Wrapper
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Wrapper.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.Wrapper();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.source = $root.io.cucumber.messages.Source.decode(reader, reader.uint32());
                            break;
                        case 2:
                            message.gherkinDocument = $root.io.cucumber.messages.GherkinDocument.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.pickle = $root.io.cucumber.messages.Pickle.decode(reader, reader.uint32());
                            break;
                        case 4:
                            message.attachment = $root.io.cucumber.messages.Attachment.decode(reader, reader.uint32());
                            break;
                        case 5:
                            message.testCaseStarted = $root.io.cucumber.messages.TestCaseStarted.decode(reader, reader.uint32());
                            break;
                        case 6:
                            message.testStepStarted = $root.io.cucumber.messages.TestStepStarted.decode(reader, reader.uint32());
                            break;
                        case 7:
                            message.testStepFinished = $root.io.cucumber.messages.TestStepFinished.decode(reader, reader.uint32());
                            break;
                        case 8:
                            message.testCaseFinished = $root.io.cucumber.messages.TestCaseFinished.decode(reader, reader.uint32());
                            break;
                        case 9:
                            message.testHookStarted = $root.io.cucumber.messages.TestHookStarted.decode(reader, reader.uint32());
                            break;
                        case 10:
                            message.testHookFinished = $root.io.cucumber.messages.TestHookFinished.decode(reader, reader.uint32());
                            break;
                        case 11:
                            message.pickleAccepted = $root.io.cucumber.messages.PickleAccepted.decode(reader, reader.uint32());
                            break;
                        case 12:
                            message.pickleRejected = $root.io.cucumber.messages.PickleRejected.decode(reader, reader.uint32());
                            break;
                        case 13:
                            message.testCasePrepared = $root.io.cucumber.messages.TestCasePrepared.decode(reader, reader.uint32());
                            break;
                        case 14:
                            message.testRunStarted = $root.io.cucumber.messages.TestRunStarted.decode(reader, reader.uint32());
                            break;
                        case 15:
                            message.testRunFinished = $root.io.cucumber.messages.TestRunFinished.decode(reader, reader.uint32());
                            break;
                        case 16:
                            message.commandStart = $root.io.cucumber.messages.CommandStart.decode(reader, reader.uint32());
                            break;
                        case 17:
                            message.commandActionComplete = $root.io.cucumber.messages.CommandActionComplete.decode(reader, reader.uint32());
                            break;
                        case 18:
                            message.commandRunBeforeTestRunHooks = $root.io.cucumber.messages.CommandRunBeforeTestRunHooks.decode(reader, reader.uint32());
                            break;
                        case 19:
                            message.commandInitializeTestCase = $root.io.cucumber.messages.CommandInitializeTestCase.decode(reader, reader.uint32());
                            break;
                        case 20:
                            message.commandRunBeforeTestCaseHook = $root.io.cucumber.messages.CommandRunBeforeTestCaseHook.decode(reader, reader.uint32());
                            break;
                        case 21:
                            message.commandRunTestStep = $root.io.cucumber.messages.CommandRunTestStep.decode(reader, reader.uint32());
                            break;
                        case 22:
                            message.commandRunAfterTestCaseHook = $root.io.cucumber.messages.CommandRunAfterTestCaseHook.decode(reader, reader.uint32());
                            break;
                        case 23:
                            message.commandRunAfterTestRunHooks = $root.io.cucumber.messages.CommandRunAfterTestRunHooks.decode(reader, reader.uint32());
                            break;
                        case 24:
                            message.commandGenerateSnippet = $root.io.cucumber.messages.CommandGenerateSnippet.decode(reader, reader.uint32());
                            break;
                        case 25:
                            message.commandError = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Wrapper message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.Wrapper
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.Wrapper} Wrapper
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Wrapper.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Wrapper message.
                 * @function verify
                 * @memberof io.cucumber.messages.Wrapper
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Wrapper.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.source != null && message.hasOwnProperty("source")) {
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.Source.verify(message.source);
                            if (error)
                                return "source." + error;
                        }
                    }
                    if (message.gherkinDocument != null && message.hasOwnProperty("gherkinDocument")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.GherkinDocument.verify(message.gherkinDocument);
                            if (error)
                                return "gherkinDocument." + error;
                        }
                    }
                    if (message.pickle != null && message.hasOwnProperty("pickle")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.Pickle.verify(message.pickle);
                            if (error)
                                return "pickle." + error;
                        }
                    }
                    if (message.attachment != null && message.hasOwnProperty("attachment")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.Attachment.verify(message.attachment);
                            if (error)
                                return "attachment." + error;
                        }
                    }
                    if (message.testCaseStarted != null && message.hasOwnProperty("testCaseStarted")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.TestCaseStarted.verify(message.testCaseStarted);
                            if (error)
                                return "testCaseStarted." + error;
                        }
                    }
                    if (message.testStepStarted != null && message.hasOwnProperty("testStepStarted")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.TestStepStarted.verify(message.testStepStarted);
                            if (error)
                                return "testStepStarted." + error;
                        }
                    }
                    if (message.testStepFinished != null && message.hasOwnProperty("testStepFinished")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.TestStepFinished.verify(message.testStepFinished);
                            if (error)
                                return "testStepFinished." + error;
                        }
                    }
                    if (message.testCaseFinished != null && message.hasOwnProperty("testCaseFinished")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.TestCaseFinished.verify(message.testCaseFinished);
                            if (error)
                                return "testCaseFinished." + error;
                        }
                    }
                    if (message.testHookStarted != null && message.hasOwnProperty("testHookStarted")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.TestHookStarted.verify(message.testHookStarted);
                            if (error)
                                return "testHookStarted." + error;
                        }
                    }
                    if (message.testHookFinished != null && message.hasOwnProperty("testHookFinished")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.TestHookFinished.verify(message.testHookFinished);
                            if (error)
                                return "testHookFinished." + error;
                        }
                    }
                    if (message.pickleAccepted != null && message.hasOwnProperty("pickleAccepted")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.PickleAccepted.verify(message.pickleAccepted);
                            if (error)
                                return "pickleAccepted." + error;
                        }
                    }
                    if (message.pickleRejected != null && message.hasOwnProperty("pickleRejected")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.PickleRejected.verify(message.pickleRejected);
                            if (error)
                                return "pickleRejected." + error;
                        }
                    }
                    if (message.testCasePrepared != null && message.hasOwnProperty("testCasePrepared")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.TestCasePrepared.verify(message.testCasePrepared);
                            if (error)
                                return "testCasePrepared." + error;
                        }
                    }
                    if (message.testRunStarted != null && message.hasOwnProperty("testRunStarted")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.TestRunStarted.verify(message.testRunStarted);
                            if (error)
                                return "testRunStarted." + error;
                        }
                    }
                    if (message.testRunFinished != null && message.hasOwnProperty("testRunFinished")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.TestRunFinished.verify(message.testRunFinished);
                            if (error)
                                return "testRunFinished." + error;
                        }
                    }
                    if (message.commandStart != null && message.hasOwnProperty("commandStart")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.CommandStart.verify(message.commandStart);
                            if (error)
                                return "commandStart." + error;
                        }
                    }
                    if (message.commandActionComplete != null && message.hasOwnProperty("commandActionComplete")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.CommandActionComplete.verify(message.commandActionComplete);
                            if (error)
                                return "commandActionComplete." + error;
                        }
                    }
                    if (message.commandRunBeforeTestRunHooks != null && message.hasOwnProperty("commandRunBeforeTestRunHooks")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.CommandRunBeforeTestRunHooks.verify(message.commandRunBeforeTestRunHooks);
                            if (error)
                                return "commandRunBeforeTestRunHooks." + error;
                        }
                    }
                    if (message.commandInitializeTestCase != null && message.hasOwnProperty("commandInitializeTestCase")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.CommandInitializeTestCase.verify(message.commandInitializeTestCase);
                            if (error)
                                return "commandInitializeTestCase." + error;
                        }
                    }
                    if (message.commandRunBeforeTestCaseHook != null && message.hasOwnProperty("commandRunBeforeTestCaseHook")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.CommandRunBeforeTestCaseHook.verify(message.commandRunBeforeTestCaseHook);
                            if (error)
                                return "commandRunBeforeTestCaseHook." + error;
                        }
                    }
                    if (message.commandRunTestStep != null && message.hasOwnProperty("commandRunTestStep")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.CommandRunTestStep.verify(message.commandRunTestStep);
                            if (error)
                                return "commandRunTestStep." + error;
                        }
                    }
                    if (message.commandRunAfterTestCaseHook != null && message.hasOwnProperty("commandRunAfterTestCaseHook")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.CommandRunAfterTestCaseHook.verify(message.commandRunAfterTestCaseHook);
                            if (error)
                                return "commandRunAfterTestCaseHook." + error;
                        }
                    }
                    if (message.commandRunAfterTestRunHooks != null && message.hasOwnProperty("commandRunAfterTestRunHooks")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.CommandRunAfterTestRunHooks.verify(message.commandRunAfterTestRunHooks);
                            if (error)
                                return "commandRunAfterTestRunHooks." + error;
                        }
                    }
                    if (message.commandGenerateSnippet != null && message.hasOwnProperty("commandGenerateSnippet")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.CommandGenerateSnippet.verify(message.commandGenerateSnippet);
                            if (error)
                                return "commandGenerateSnippet." + error;
                        }
                    }
                    if (message.commandError != null && message.hasOwnProperty("commandError")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        if (!$util.isString(message.commandError))
                            return "commandError: string expected";
                    }
                    return null;
                };

                /**
                 * Creates a Wrapper message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.Wrapper
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.Wrapper} Wrapper
                 */
                Wrapper.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.Wrapper)
                        return object;
                    var message = new $root.io.cucumber.messages.Wrapper();
                    if (object.source != null) {
                        if (typeof object.source !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.source: object expected");
                        message.source = $root.io.cucumber.messages.Source.fromObject(object.source);
                    }
                    if (object.gherkinDocument != null) {
                        if (typeof object.gherkinDocument !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.gherkinDocument: object expected");
                        message.gherkinDocument = $root.io.cucumber.messages.GherkinDocument.fromObject(object.gherkinDocument);
                    }
                    if (object.pickle != null) {
                        if (typeof object.pickle !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.pickle: object expected");
                        message.pickle = $root.io.cucumber.messages.Pickle.fromObject(object.pickle);
                    }
                    if (object.attachment != null) {
                        if (typeof object.attachment !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.attachment: object expected");
                        message.attachment = $root.io.cucumber.messages.Attachment.fromObject(object.attachment);
                    }
                    if (object.testCaseStarted != null) {
                        if (typeof object.testCaseStarted !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.testCaseStarted: object expected");
                        message.testCaseStarted = $root.io.cucumber.messages.TestCaseStarted.fromObject(object.testCaseStarted);
                    }
                    if (object.testStepStarted != null) {
                        if (typeof object.testStepStarted !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.testStepStarted: object expected");
                        message.testStepStarted = $root.io.cucumber.messages.TestStepStarted.fromObject(object.testStepStarted);
                    }
                    if (object.testStepFinished != null) {
                        if (typeof object.testStepFinished !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.testStepFinished: object expected");
                        message.testStepFinished = $root.io.cucumber.messages.TestStepFinished.fromObject(object.testStepFinished);
                    }
                    if (object.testCaseFinished != null) {
                        if (typeof object.testCaseFinished !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.testCaseFinished: object expected");
                        message.testCaseFinished = $root.io.cucumber.messages.TestCaseFinished.fromObject(object.testCaseFinished);
                    }
                    if (object.testHookStarted != null) {
                        if (typeof object.testHookStarted !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.testHookStarted: object expected");
                        message.testHookStarted = $root.io.cucumber.messages.TestHookStarted.fromObject(object.testHookStarted);
                    }
                    if (object.testHookFinished != null) {
                        if (typeof object.testHookFinished !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.testHookFinished: object expected");
                        message.testHookFinished = $root.io.cucumber.messages.TestHookFinished.fromObject(object.testHookFinished);
                    }
                    if (object.pickleAccepted != null) {
                        if (typeof object.pickleAccepted !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.pickleAccepted: object expected");
                        message.pickleAccepted = $root.io.cucumber.messages.PickleAccepted.fromObject(object.pickleAccepted);
                    }
                    if (object.pickleRejected != null) {
                        if (typeof object.pickleRejected !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.pickleRejected: object expected");
                        message.pickleRejected = $root.io.cucumber.messages.PickleRejected.fromObject(object.pickleRejected);
                    }
                    if (object.testCasePrepared != null) {
                        if (typeof object.testCasePrepared !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.testCasePrepared: object expected");
                        message.testCasePrepared = $root.io.cucumber.messages.TestCasePrepared.fromObject(object.testCasePrepared);
                    }
                    if (object.testRunStarted != null) {
                        if (typeof object.testRunStarted !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.testRunStarted: object expected");
                        message.testRunStarted = $root.io.cucumber.messages.TestRunStarted.fromObject(object.testRunStarted);
                    }
                    if (object.testRunFinished != null) {
                        if (typeof object.testRunFinished !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.testRunFinished: object expected");
                        message.testRunFinished = $root.io.cucumber.messages.TestRunFinished.fromObject(object.testRunFinished);
                    }
                    if (object.commandStart != null) {
                        if (typeof object.commandStart !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.commandStart: object expected");
                        message.commandStart = $root.io.cucumber.messages.CommandStart.fromObject(object.commandStart);
                    }
                    if (object.commandActionComplete != null) {
                        if (typeof object.commandActionComplete !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.commandActionComplete: object expected");
                        message.commandActionComplete = $root.io.cucumber.messages.CommandActionComplete.fromObject(object.commandActionComplete);
                    }
                    if (object.commandRunBeforeTestRunHooks != null) {
                        if (typeof object.commandRunBeforeTestRunHooks !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.commandRunBeforeTestRunHooks: object expected");
                        message.commandRunBeforeTestRunHooks = $root.io.cucumber.messages.CommandRunBeforeTestRunHooks.fromObject(object.commandRunBeforeTestRunHooks);
                    }
                    if (object.commandInitializeTestCase != null) {
                        if (typeof object.commandInitializeTestCase !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.commandInitializeTestCase: object expected");
                        message.commandInitializeTestCase = $root.io.cucumber.messages.CommandInitializeTestCase.fromObject(object.commandInitializeTestCase);
                    }
                    if (object.commandRunBeforeTestCaseHook != null) {
                        if (typeof object.commandRunBeforeTestCaseHook !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.commandRunBeforeTestCaseHook: object expected");
                        message.commandRunBeforeTestCaseHook = $root.io.cucumber.messages.CommandRunBeforeTestCaseHook.fromObject(object.commandRunBeforeTestCaseHook);
                    }
                    if (object.commandRunTestStep != null) {
                        if (typeof object.commandRunTestStep !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.commandRunTestStep: object expected");
                        message.commandRunTestStep = $root.io.cucumber.messages.CommandRunTestStep.fromObject(object.commandRunTestStep);
                    }
                    if (object.commandRunAfterTestCaseHook != null) {
                        if (typeof object.commandRunAfterTestCaseHook !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.commandRunAfterTestCaseHook: object expected");
                        message.commandRunAfterTestCaseHook = $root.io.cucumber.messages.CommandRunAfterTestCaseHook.fromObject(object.commandRunAfterTestCaseHook);
                    }
                    if (object.commandRunAfterTestRunHooks != null) {
                        if (typeof object.commandRunAfterTestRunHooks !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.commandRunAfterTestRunHooks: object expected");
                        message.commandRunAfterTestRunHooks = $root.io.cucumber.messages.CommandRunAfterTestRunHooks.fromObject(object.commandRunAfterTestRunHooks);
                    }
                    if (object.commandGenerateSnippet != null) {
                        if (typeof object.commandGenerateSnippet !== "object")
                            throw TypeError(".io.cucumber.messages.Wrapper.commandGenerateSnippet: object expected");
                        message.commandGenerateSnippet = $root.io.cucumber.messages.CommandGenerateSnippet.fromObject(object.commandGenerateSnippet);
                    }
                    if (object.commandError != null)
                        message.commandError = String(object.commandError);
                    return message;
                };

                /**
                 * Creates a plain object from a Wrapper message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.Wrapper
                 * @static
                 * @param {io.cucumber.messages.Wrapper} message Wrapper
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Wrapper.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (message.source != null && message.hasOwnProperty("source")) {
                        object.source = $root.io.cucumber.messages.Source.toObject(message.source, options);
                        if (options.oneofs)
                            object.message = "source";
                    }
                    if (message.gherkinDocument != null && message.hasOwnProperty("gherkinDocument")) {
                        object.gherkinDocument = $root.io.cucumber.messages.GherkinDocument.toObject(message.gherkinDocument, options);
                        if (options.oneofs)
                            object.message = "gherkinDocument";
                    }
                    if (message.pickle != null && message.hasOwnProperty("pickle")) {
                        object.pickle = $root.io.cucumber.messages.Pickle.toObject(message.pickle, options);
                        if (options.oneofs)
                            object.message = "pickle";
                    }
                    if (message.attachment != null && message.hasOwnProperty("attachment")) {
                        object.attachment = $root.io.cucumber.messages.Attachment.toObject(message.attachment, options);
                        if (options.oneofs)
                            object.message = "attachment";
                    }
                    if (message.testCaseStarted != null && message.hasOwnProperty("testCaseStarted")) {
                        object.testCaseStarted = $root.io.cucumber.messages.TestCaseStarted.toObject(message.testCaseStarted, options);
                        if (options.oneofs)
                            object.message = "testCaseStarted";
                    }
                    if (message.testStepStarted != null && message.hasOwnProperty("testStepStarted")) {
                        object.testStepStarted = $root.io.cucumber.messages.TestStepStarted.toObject(message.testStepStarted, options);
                        if (options.oneofs)
                            object.message = "testStepStarted";
                    }
                    if (message.testStepFinished != null && message.hasOwnProperty("testStepFinished")) {
                        object.testStepFinished = $root.io.cucumber.messages.TestStepFinished.toObject(message.testStepFinished, options);
                        if (options.oneofs)
                            object.message = "testStepFinished";
                    }
                    if (message.testCaseFinished != null && message.hasOwnProperty("testCaseFinished")) {
                        object.testCaseFinished = $root.io.cucumber.messages.TestCaseFinished.toObject(message.testCaseFinished, options);
                        if (options.oneofs)
                            object.message = "testCaseFinished";
                    }
                    if (message.testHookStarted != null && message.hasOwnProperty("testHookStarted")) {
                        object.testHookStarted = $root.io.cucumber.messages.TestHookStarted.toObject(message.testHookStarted, options);
                        if (options.oneofs)
                            object.message = "testHookStarted";
                    }
                    if (message.testHookFinished != null && message.hasOwnProperty("testHookFinished")) {
                        object.testHookFinished = $root.io.cucumber.messages.TestHookFinished.toObject(message.testHookFinished, options);
                        if (options.oneofs)
                            object.message = "testHookFinished";
                    }
                    if (message.pickleAccepted != null && message.hasOwnProperty("pickleAccepted")) {
                        object.pickleAccepted = $root.io.cucumber.messages.PickleAccepted.toObject(message.pickleAccepted, options);
                        if (options.oneofs)
                            object.message = "pickleAccepted";
                    }
                    if (message.pickleRejected != null && message.hasOwnProperty("pickleRejected")) {
                        object.pickleRejected = $root.io.cucumber.messages.PickleRejected.toObject(message.pickleRejected, options);
                        if (options.oneofs)
                            object.message = "pickleRejected";
                    }
                    if (message.testCasePrepared != null && message.hasOwnProperty("testCasePrepared")) {
                        object.testCasePrepared = $root.io.cucumber.messages.TestCasePrepared.toObject(message.testCasePrepared, options);
                        if (options.oneofs)
                            object.message = "testCasePrepared";
                    }
                    if (message.testRunStarted != null && message.hasOwnProperty("testRunStarted")) {
                        object.testRunStarted = $root.io.cucumber.messages.TestRunStarted.toObject(message.testRunStarted, options);
                        if (options.oneofs)
                            object.message = "testRunStarted";
                    }
                    if (message.testRunFinished != null && message.hasOwnProperty("testRunFinished")) {
                        object.testRunFinished = $root.io.cucumber.messages.TestRunFinished.toObject(message.testRunFinished, options);
                        if (options.oneofs)
                            object.message = "testRunFinished";
                    }
                    if (message.commandStart != null && message.hasOwnProperty("commandStart")) {
                        object.commandStart = $root.io.cucumber.messages.CommandStart.toObject(message.commandStart, options);
                        if (options.oneofs)
                            object.message = "commandStart";
                    }
                    if (message.commandActionComplete != null && message.hasOwnProperty("commandActionComplete")) {
                        object.commandActionComplete = $root.io.cucumber.messages.CommandActionComplete.toObject(message.commandActionComplete, options);
                        if (options.oneofs)
                            object.message = "commandActionComplete";
                    }
                    if (message.commandRunBeforeTestRunHooks != null && message.hasOwnProperty("commandRunBeforeTestRunHooks")) {
                        object.commandRunBeforeTestRunHooks = $root.io.cucumber.messages.CommandRunBeforeTestRunHooks.toObject(message.commandRunBeforeTestRunHooks, options);
                        if (options.oneofs)
                            object.message = "commandRunBeforeTestRunHooks";
                    }
                    if (message.commandInitializeTestCase != null && message.hasOwnProperty("commandInitializeTestCase")) {
                        object.commandInitializeTestCase = $root.io.cucumber.messages.CommandInitializeTestCase.toObject(message.commandInitializeTestCase, options);
                        if (options.oneofs)
                            object.message = "commandInitializeTestCase";
                    }
                    if (message.commandRunBeforeTestCaseHook != null && message.hasOwnProperty("commandRunBeforeTestCaseHook")) {
                        object.commandRunBeforeTestCaseHook = $root.io.cucumber.messages.CommandRunBeforeTestCaseHook.toObject(message.commandRunBeforeTestCaseHook, options);
                        if (options.oneofs)
                            object.message = "commandRunBeforeTestCaseHook";
                    }
                    if (message.commandRunTestStep != null && message.hasOwnProperty("commandRunTestStep")) {
                        object.commandRunTestStep = $root.io.cucumber.messages.CommandRunTestStep.toObject(message.commandRunTestStep, options);
                        if (options.oneofs)
                            object.message = "commandRunTestStep";
                    }
                    if (message.commandRunAfterTestCaseHook != null && message.hasOwnProperty("commandRunAfterTestCaseHook")) {
                        object.commandRunAfterTestCaseHook = $root.io.cucumber.messages.CommandRunAfterTestCaseHook.toObject(message.commandRunAfterTestCaseHook, options);
                        if (options.oneofs)
                            object.message = "commandRunAfterTestCaseHook";
                    }
                    if (message.commandRunAfterTestRunHooks != null && message.hasOwnProperty("commandRunAfterTestRunHooks")) {
                        object.commandRunAfterTestRunHooks = $root.io.cucumber.messages.CommandRunAfterTestRunHooks.toObject(message.commandRunAfterTestRunHooks, options);
                        if (options.oneofs)
                            object.message = "commandRunAfterTestRunHooks";
                    }
                    if (message.commandGenerateSnippet != null && message.hasOwnProperty("commandGenerateSnippet")) {
                        object.commandGenerateSnippet = $root.io.cucumber.messages.CommandGenerateSnippet.toObject(message.commandGenerateSnippet, options);
                        if (options.oneofs)
                            object.message = "commandGenerateSnippet";
                    }
                    if (message.commandError != null && message.hasOwnProperty("commandError")) {
                        object.commandError = message.commandError;
                        if (options.oneofs)
                            object.message = "commandError";
                    }
                    return object;
                };

                /**
                 * Converts this Wrapper to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.Wrapper
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Wrapper.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Wrapper;
            })();

            messages.Location = (function() {

                /**
                 * Properties of a Location.
                 * @memberof io.cucumber.messages
                 * @interface ILocation
                 * @property {number|null} [line] Location line
                 * @property {number|null} [column] Location column
                 */

                /**
                 * Constructs a new Location.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a Location.
                 * @implements ILocation
                 * @constructor
                 * @param {io.cucumber.messages.ILocation=} [properties] Properties to set
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
                 * @memberof io.cucumber.messages.Location
                 * @instance
                 */
                Location.prototype.line = 0;

                /**
                 * Location column.
                 * @member {number} column
                 * @memberof io.cucumber.messages.Location
                 * @instance
                 */
                Location.prototype.column = 0;

                /**
                 * Creates a new Location instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.Location
                 * @static
                 * @param {io.cucumber.messages.ILocation=} [properties] Properties to set
                 * @returns {io.cucumber.messages.Location} Location instance
                 */
                Location.create = function create(properties) {
                    return new Location(properties);
                };

                /**
                 * Encodes the specified Location message. Does not implicitly {@link io.cucumber.messages.Location.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.Location
                 * @static
                 * @param {io.cucumber.messages.ILocation} message Location message or plain object to encode
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
                 * Encodes the specified Location message, length delimited. Does not implicitly {@link io.cucumber.messages.Location.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.Location
                 * @static
                 * @param {io.cucumber.messages.ILocation} message Location message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Location.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Location message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.Location
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.Location} Location
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Location.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.Location();
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
                 * @memberof io.cucumber.messages.Location
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.Location} Location
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
                 * @memberof io.cucumber.messages.Location
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
                 * @memberof io.cucumber.messages.Location
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.Location} Location
                 */
                Location.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.Location)
                        return object;
                    var message = new $root.io.cucumber.messages.Location();
                    if (object.line != null)
                        message.line = object.line >>> 0;
                    if (object.column != null)
                        message.column = object.column >>> 0;
                    return message;
                };

                /**
                 * Creates a plain object from a Location message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.Location
                 * @static
                 * @param {io.cucumber.messages.Location} message Location
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
                 * @memberof io.cucumber.messages.Location
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Location.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Location;
            })();

            messages.SourceReference = (function() {

                /**
                 * Properties of a SourceReference.
                 * @memberof io.cucumber.messages
                 * @interface ISourceReference
                 * @property {string|null} [uri] SourceReference uri
                 * @property {io.cucumber.messages.ILocation|null} [location] SourceReference location
                 */

                /**
                 * Constructs a new SourceReference.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a SourceReference.
                 * @implements ISourceReference
                 * @constructor
                 * @param {io.cucumber.messages.ISourceReference=} [properties] Properties to set
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
                 * @memberof io.cucumber.messages.SourceReference
                 * @instance
                 */
                SourceReference.prototype.uri = "";

                /**
                 * SourceReference location.
                 * @member {io.cucumber.messages.ILocation|null|undefined} location
                 * @memberof io.cucumber.messages.SourceReference
                 * @instance
                 */
                SourceReference.prototype.location = null;

                /**
                 * Creates a new SourceReference instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.SourceReference
                 * @static
                 * @param {io.cucumber.messages.ISourceReference=} [properties] Properties to set
                 * @returns {io.cucumber.messages.SourceReference} SourceReference instance
                 */
                SourceReference.create = function create(properties) {
                    return new SourceReference(properties);
                };

                /**
                 * Encodes the specified SourceReference message. Does not implicitly {@link io.cucumber.messages.SourceReference.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.SourceReference
                 * @static
                 * @param {io.cucumber.messages.ISourceReference} message SourceReference message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SourceReference.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.uri != null && message.hasOwnProperty("uri"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.uri);
                    if (message.location != null && message.hasOwnProperty("location"))
                        $root.io.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified SourceReference message, length delimited. Does not implicitly {@link io.cucumber.messages.SourceReference.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.SourceReference
                 * @static
                 * @param {io.cucumber.messages.ISourceReference} message SourceReference message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SourceReference.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a SourceReference message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.SourceReference
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.SourceReference} SourceReference
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SourceReference.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.SourceReference();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.uri = reader.string();
                            break;
                        case 2:
                            message.location = $root.io.cucumber.messages.Location.decode(reader, reader.uint32());
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
                 * @memberof io.cucumber.messages.SourceReference
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.SourceReference} SourceReference
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
                 * @memberof io.cucumber.messages.SourceReference
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
                        var error = $root.io.cucumber.messages.Location.verify(message.location);
                        if (error)
                            return "location." + error;
                    }
                    return null;
                };

                /**
                 * Creates a SourceReference message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.SourceReference
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.SourceReference} SourceReference
                 */
                SourceReference.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.SourceReference)
                        return object;
                    var message = new $root.io.cucumber.messages.SourceReference();
                    if (object.uri != null)
                        message.uri = String(object.uri);
                    if (object.location != null) {
                        if (typeof object.location !== "object")
                            throw TypeError(".io.cucumber.messages.SourceReference.location: object expected");
                        message.location = $root.io.cucumber.messages.Location.fromObject(object.location);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a SourceReference message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.SourceReference
                 * @static
                 * @param {io.cucumber.messages.SourceReference} message SourceReference
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
                        object.location = $root.io.cucumber.messages.Location.toObject(message.location, options);
                    return object;
                };

                /**
                 * Converts this SourceReference to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.SourceReference
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SourceReference.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return SourceReference;
            })();

            messages.Media = (function() {

                /**
                 * Properties of a Media.
                 * @memberof io.cucumber.messages
                 * @interface IMedia
                 * @property {string|null} [encoding] Media encoding
                 * @property {string|null} [contentType] Media contentType
                 */

                /**
                 * Constructs a new Media.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a Media.
                 * @implements IMedia
                 * @constructor
                 * @param {io.cucumber.messages.IMedia=} [properties] Properties to set
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
                 * @memberof io.cucumber.messages.Media
                 * @instance
                 */
                Media.prototype.encoding = "";

                /**
                 * Media contentType.
                 * @member {string} contentType
                 * @memberof io.cucumber.messages.Media
                 * @instance
                 */
                Media.prototype.contentType = "";

                /**
                 * Creates a new Media instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.Media
                 * @static
                 * @param {io.cucumber.messages.IMedia=} [properties] Properties to set
                 * @returns {io.cucumber.messages.Media} Media instance
                 */
                Media.create = function create(properties) {
                    return new Media(properties);
                };

                /**
                 * Encodes the specified Media message. Does not implicitly {@link io.cucumber.messages.Media.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.Media
                 * @static
                 * @param {io.cucumber.messages.IMedia} message Media message or plain object to encode
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
                 * Encodes the specified Media message, length delimited. Does not implicitly {@link io.cucumber.messages.Media.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.Media
                 * @static
                 * @param {io.cucumber.messages.IMedia} message Media message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Media.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Media message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.Media
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.Media} Media
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Media.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.Media();
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
                 * @memberof io.cucumber.messages.Media
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.Media} Media
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
                 * @memberof io.cucumber.messages.Media
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
                 * @memberof io.cucumber.messages.Media
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.Media} Media
                 */
                Media.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.Media)
                        return object;
                    var message = new $root.io.cucumber.messages.Media();
                    if (object.encoding != null)
                        message.encoding = String(object.encoding);
                    if (object.contentType != null)
                        message.contentType = String(object.contentType);
                    return message;
                };

                /**
                 * Creates a plain object from a Media message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.Media
                 * @static
                 * @param {io.cucumber.messages.Media} message Media
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
                 * @memberof io.cucumber.messages.Media
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
                 * @memberof io.cucumber.messages
                 * @interface ISource
                 * @property {string|null} [uri] Source uri
                 * @property {string|null} [data] Source data
                 * @property {io.cucumber.messages.IMedia|null} [media] Source media
                 */

                /**
                 * Constructs a new Source.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a Source.
                 * @implements ISource
                 * @constructor
                 * @param {io.cucumber.messages.ISource=} [properties] Properties to set
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
                 * @memberof io.cucumber.messages.Source
                 * @instance
                 */
                Source.prototype.uri = "";

                /**
                 * Source data.
                 * @member {string} data
                 * @memberof io.cucumber.messages.Source
                 * @instance
                 */
                Source.prototype.data = "";

                /**
                 * Source media.
                 * @member {io.cucumber.messages.IMedia|null|undefined} media
                 * @memberof io.cucumber.messages.Source
                 * @instance
                 */
                Source.prototype.media = null;

                /**
                 * Creates a new Source instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.Source
                 * @static
                 * @param {io.cucumber.messages.ISource=} [properties] Properties to set
                 * @returns {io.cucumber.messages.Source} Source instance
                 */
                Source.create = function create(properties) {
                    return new Source(properties);
                };

                /**
                 * Encodes the specified Source message. Does not implicitly {@link io.cucumber.messages.Source.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.Source
                 * @static
                 * @param {io.cucumber.messages.ISource} message Source message or plain object to encode
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
                        $root.io.cucumber.messages.Media.encode(message.media, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Source message, length delimited. Does not implicitly {@link io.cucumber.messages.Source.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.Source
                 * @static
                 * @param {io.cucumber.messages.ISource} message Source message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Source.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Source message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.Source
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.Source} Source
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Source.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.Source();
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
                            message.media = $root.io.cucumber.messages.Media.decode(reader, reader.uint32());
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
                 * @memberof io.cucumber.messages.Source
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.Source} Source
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
                 * @memberof io.cucumber.messages.Source
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
                        var error = $root.io.cucumber.messages.Media.verify(message.media);
                        if (error)
                            return "media." + error;
                    }
                    return null;
                };

                /**
                 * Creates a Source message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.Source
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.Source} Source
                 */
                Source.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.Source)
                        return object;
                    var message = new $root.io.cucumber.messages.Source();
                    if (object.uri != null)
                        message.uri = String(object.uri);
                    if (object.data != null)
                        message.data = String(object.data);
                    if (object.media != null) {
                        if (typeof object.media !== "object")
                            throw TypeError(".io.cucumber.messages.Source.media: object expected");
                        message.media = $root.io.cucumber.messages.Media.fromObject(object.media);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Source message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.Source
                 * @static
                 * @param {io.cucumber.messages.Source} message Source
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
                        object.media = $root.io.cucumber.messages.Media.toObject(message.media, options);
                    return object;
                };

                /**
                 * Converts this Source to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.Source
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Source.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Source;
            })();

            messages.GherkinDocument = (function() {

                /**
                 * Properties of a GherkinDocument.
                 * @memberof io.cucumber.messages
                 * @interface IGherkinDocument
                 * @property {string|null} [uri] GherkinDocument uri
                 * @property {io.cucumber.messages.GherkinDocument.IFeature|null} [feature] GherkinDocument feature
                 * @property {Array.<io.cucumber.messages.GherkinDocument.IComment>|null} [comments] GherkinDocument comments
                 */

                /**
                 * Constructs a new GherkinDocument.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a GherkinDocument.
                 * @implements IGherkinDocument
                 * @constructor
                 * @param {io.cucumber.messages.IGherkinDocument=} [properties] Properties to set
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
                 * @memberof io.cucumber.messages.GherkinDocument
                 * @instance
                 */
                GherkinDocument.prototype.uri = "";

                /**
                 * GherkinDocument feature.
                 * @member {io.cucumber.messages.GherkinDocument.IFeature|null|undefined} feature
                 * @memberof io.cucumber.messages.GherkinDocument
                 * @instance
                 */
                GherkinDocument.prototype.feature = null;

                /**
                 * GherkinDocument comments.
                 * @member {Array.<io.cucumber.messages.GherkinDocument.IComment>} comments
                 * @memberof io.cucumber.messages.GherkinDocument
                 * @instance
                 */
                GherkinDocument.prototype.comments = $util.emptyArray;

                /**
                 * Creates a new GherkinDocument instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.GherkinDocument
                 * @static
                 * @param {io.cucumber.messages.IGherkinDocument=} [properties] Properties to set
                 * @returns {io.cucumber.messages.GherkinDocument} GherkinDocument instance
                 */
                GherkinDocument.create = function create(properties) {
                    return new GherkinDocument(properties);
                };

                /**
                 * Encodes the specified GherkinDocument message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.GherkinDocument
                 * @static
                 * @param {io.cucumber.messages.IGherkinDocument} message GherkinDocument message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GherkinDocument.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.uri != null && message.hasOwnProperty("uri"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.uri);
                    if (message.feature != null && message.hasOwnProperty("feature"))
                        $root.io.cucumber.messages.GherkinDocument.Feature.encode(message.feature, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.comments != null && message.comments.length)
                        for (var i = 0; i < message.comments.length; ++i)
                            $root.io.cucumber.messages.GherkinDocument.Comment.encode(message.comments[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified GherkinDocument message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.GherkinDocument
                 * @static
                 * @param {io.cucumber.messages.IGherkinDocument} message GherkinDocument message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GherkinDocument.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GherkinDocument message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.GherkinDocument
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.GherkinDocument} GherkinDocument
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GherkinDocument.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.GherkinDocument();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.uri = reader.string();
                            break;
                        case 2:
                            message.feature = $root.io.cucumber.messages.GherkinDocument.Feature.decode(reader, reader.uint32());
                            break;
                        case 3:
                            if (!(message.comments && message.comments.length))
                                message.comments = [];
                            message.comments.push($root.io.cucumber.messages.GherkinDocument.Comment.decode(reader, reader.uint32()));
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
                 * @memberof io.cucumber.messages.GherkinDocument
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.GherkinDocument} GherkinDocument
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
                 * @memberof io.cucumber.messages.GherkinDocument
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
                        var error = $root.io.cucumber.messages.GherkinDocument.Feature.verify(message.feature);
                        if (error)
                            return "feature." + error;
                    }
                    if (message.comments != null && message.hasOwnProperty("comments")) {
                        if (!Array.isArray(message.comments))
                            return "comments: array expected";
                        for (var i = 0; i < message.comments.length; ++i) {
                            var error = $root.io.cucumber.messages.GherkinDocument.Comment.verify(message.comments[i]);
                            if (error)
                                return "comments." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a GherkinDocument message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.GherkinDocument
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.GherkinDocument} GherkinDocument
                 */
                GherkinDocument.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.GherkinDocument)
                        return object;
                    var message = new $root.io.cucumber.messages.GherkinDocument();
                    if (object.uri != null)
                        message.uri = String(object.uri);
                    if (object.feature != null) {
                        if (typeof object.feature !== "object")
                            throw TypeError(".io.cucumber.messages.GherkinDocument.feature: object expected");
                        message.feature = $root.io.cucumber.messages.GherkinDocument.Feature.fromObject(object.feature);
                    }
                    if (object.comments) {
                        if (!Array.isArray(object.comments))
                            throw TypeError(".io.cucumber.messages.GherkinDocument.comments: array expected");
                        message.comments = [];
                        for (var i = 0; i < object.comments.length; ++i) {
                            if (typeof object.comments[i] !== "object")
                                throw TypeError(".io.cucumber.messages.GherkinDocument.comments: object expected");
                            message.comments[i] = $root.io.cucumber.messages.GherkinDocument.Comment.fromObject(object.comments[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a GherkinDocument message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.GherkinDocument
                 * @static
                 * @param {io.cucumber.messages.GherkinDocument} message GherkinDocument
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
                        object.feature = $root.io.cucumber.messages.GherkinDocument.Feature.toObject(message.feature, options);
                    if (message.comments && message.comments.length) {
                        object.comments = [];
                        for (var j = 0; j < message.comments.length; ++j)
                            object.comments[j] = $root.io.cucumber.messages.GherkinDocument.Comment.toObject(message.comments[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this GherkinDocument to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.GherkinDocument
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GherkinDocument.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                GherkinDocument.Comment = (function() {

                    /**
                     * Properties of a Comment.
                     * @memberof io.cucumber.messages.GherkinDocument
                     * @interface IComment
                     * @property {io.cucumber.messages.ILocation|null} [location] Comment location
                     * @property {string|null} [text] Comment text
                     */

                    /**
                     * Constructs a new Comment.
                     * @memberof io.cucumber.messages.GherkinDocument
                     * @classdesc Represents a Comment.
                     * @implements IComment
                     * @constructor
                     * @param {io.cucumber.messages.GherkinDocument.IComment=} [properties] Properties to set
                     */
                    function Comment(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Comment location.
                     * @member {io.cucumber.messages.ILocation|null|undefined} location
                     * @memberof io.cucumber.messages.GherkinDocument.Comment
                     * @instance
                     */
                    Comment.prototype.location = null;

                    /**
                     * Comment text.
                     * @member {string} text
                     * @memberof io.cucumber.messages.GherkinDocument.Comment
                     * @instance
                     */
                    Comment.prototype.text = "";

                    /**
                     * Creates a new Comment instance using the specified properties.
                     * @function create
                     * @memberof io.cucumber.messages.GherkinDocument.Comment
                     * @static
                     * @param {io.cucumber.messages.GherkinDocument.IComment=} [properties] Properties to set
                     * @returns {io.cucumber.messages.GherkinDocument.Comment} Comment instance
                     */
                    Comment.create = function create(properties) {
                        return new Comment(properties);
                    };

                    /**
                     * Encodes the specified Comment message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Comment.verify|verify} messages.
                     * @function encode
                     * @memberof io.cucumber.messages.GherkinDocument.Comment
                     * @static
                     * @param {io.cucumber.messages.GherkinDocument.IComment} message Comment message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Comment.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.location != null && message.hasOwnProperty("location"))
                            $root.io.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.text != null && message.hasOwnProperty("text"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.text);
                        return writer;
                    };

                    /**
                     * Encodes the specified Comment message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Comment.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof io.cucumber.messages.GherkinDocument.Comment
                     * @static
                     * @param {io.cucumber.messages.GherkinDocument.IComment} message Comment message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Comment.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Comment message from the specified reader or buffer.
                     * @function decode
                     * @memberof io.cucumber.messages.GherkinDocument.Comment
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {io.cucumber.messages.GherkinDocument.Comment} Comment
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Comment.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.GherkinDocument.Comment();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.location = $root.io.cucumber.messages.Location.decode(reader, reader.uint32());
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
                     * @memberof io.cucumber.messages.GherkinDocument.Comment
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {io.cucumber.messages.GherkinDocument.Comment} Comment
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
                     * @memberof io.cucumber.messages.GherkinDocument.Comment
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Comment.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.location != null && message.hasOwnProperty("location")) {
                            var error = $root.io.cucumber.messages.Location.verify(message.location);
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
                     * @memberof io.cucumber.messages.GherkinDocument.Comment
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {io.cucumber.messages.GherkinDocument.Comment} Comment
                     */
                    Comment.fromObject = function fromObject(object) {
                        if (object instanceof $root.io.cucumber.messages.GherkinDocument.Comment)
                            return object;
                        var message = new $root.io.cucumber.messages.GherkinDocument.Comment();
                        if (object.location != null) {
                            if (typeof object.location !== "object")
                                throw TypeError(".io.cucumber.messages.GherkinDocument.Comment.location: object expected");
                            message.location = $root.io.cucumber.messages.Location.fromObject(object.location);
                        }
                        if (object.text != null)
                            message.text = String(object.text);
                        return message;
                    };

                    /**
                     * Creates a plain object from a Comment message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof io.cucumber.messages.GherkinDocument.Comment
                     * @static
                     * @param {io.cucumber.messages.GherkinDocument.Comment} message Comment
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
                            object.location = $root.io.cucumber.messages.Location.toObject(message.location, options);
                        if (message.text != null && message.hasOwnProperty("text"))
                            object.text = message.text;
                        return object;
                    };

                    /**
                     * Converts this Comment to JSON.
                     * @function toJSON
                     * @memberof io.cucumber.messages.GherkinDocument.Comment
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Comment.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Comment;
                })();

                GherkinDocument.Feature = (function() {

                    /**
                     * Properties of a Feature.
                     * @memberof io.cucumber.messages.GherkinDocument
                     * @interface IFeature
                     * @property {io.cucumber.messages.ILocation|null} [location] Feature location
                     * @property {Array.<io.cucumber.messages.GherkinDocument.Feature.ITag>|null} [tags] Feature tags
                     * @property {string|null} [language] Feature language
                     * @property {string|null} [keyword] Feature keyword
                     * @property {string|null} [name] Feature name
                     * @property {string|null} [description] Feature description
                     * @property {Array.<io.cucumber.messages.GherkinDocument.Feature.IFeatureChild>|null} [children] Feature children
                     */

                    /**
                     * Constructs a new Feature.
                     * @memberof io.cucumber.messages.GherkinDocument
                     * @classdesc Represents a Feature.
                     * @implements IFeature
                     * @constructor
                     * @param {io.cucumber.messages.GherkinDocument.IFeature=} [properties] Properties to set
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
                     * @member {io.cucumber.messages.ILocation|null|undefined} location
                     * @memberof io.cucumber.messages.GherkinDocument.Feature
                     * @instance
                     */
                    Feature.prototype.location = null;

                    /**
                     * Feature tags.
                     * @member {Array.<io.cucumber.messages.GherkinDocument.Feature.ITag>} tags
                     * @memberof io.cucumber.messages.GherkinDocument.Feature
                     * @instance
                     */
                    Feature.prototype.tags = $util.emptyArray;

                    /**
                     * Feature language.
                     * @member {string} language
                     * @memberof io.cucumber.messages.GherkinDocument.Feature
                     * @instance
                     */
                    Feature.prototype.language = "";

                    /**
                     * Feature keyword.
                     * @member {string} keyword
                     * @memberof io.cucumber.messages.GherkinDocument.Feature
                     * @instance
                     */
                    Feature.prototype.keyword = "";

                    /**
                     * Feature name.
                     * @member {string} name
                     * @memberof io.cucumber.messages.GherkinDocument.Feature
                     * @instance
                     */
                    Feature.prototype.name = "";

                    /**
                     * Feature description.
                     * @member {string} description
                     * @memberof io.cucumber.messages.GherkinDocument.Feature
                     * @instance
                     */
                    Feature.prototype.description = "";

                    /**
                     * Feature children.
                     * @member {Array.<io.cucumber.messages.GherkinDocument.Feature.IFeatureChild>} children
                     * @memberof io.cucumber.messages.GherkinDocument.Feature
                     * @instance
                     */
                    Feature.prototype.children = $util.emptyArray;

                    /**
                     * Creates a new Feature instance using the specified properties.
                     * @function create
                     * @memberof io.cucumber.messages.GherkinDocument.Feature
                     * @static
                     * @param {io.cucumber.messages.GherkinDocument.IFeature=} [properties] Properties to set
                     * @returns {io.cucumber.messages.GherkinDocument.Feature} Feature instance
                     */
                    Feature.create = function create(properties) {
                        return new Feature(properties);
                    };

                    /**
                     * Encodes the specified Feature message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.verify|verify} messages.
                     * @function encode
                     * @memberof io.cucumber.messages.GherkinDocument.Feature
                     * @static
                     * @param {io.cucumber.messages.GherkinDocument.IFeature} message Feature message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Feature.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.location != null && message.hasOwnProperty("location"))
                            $root.io.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.tags != null && message.tags.length)
                            for (var i = 0; i < message.tags.length; ++i)
                                $root.io.cucumber.messages.GherkinDocument.Feature.Tag.encode(message.tags[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
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
                                $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.encode(message.children[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified Feature message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof io.cucumber.messages.GherkinDocument.Feature
                     * @static
                     * @param {io.cucumber.messages.GherkinDocument.IFeature} message Feature message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Feature.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Feature message from the specified reader or buffer.
                     * @function decode
                     * @memberof io.cucumber.messages.GherkinDocument.Feature
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {io.cucumber.messages.GherkinDocument.Feature} Feature
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Feature.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.GherkinDocument.Feature();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.location = $root.io.cucumber.messages.Location.decode(reader, reader.uint32());
                                break;
                            case 2:
                                if (!(message.tags && message.tags.length))
                                    message.tags = [];
                                message.tags.push($root.io.cucumber.messages.GherkinDocument.Feature.Tag.decode(reader, reader.uint32()));
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
                                message.children.push($root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.decode(reader, reader.uint32()));
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
                     * @memberof io.cucumber.messages.GherkinDocument.Feature
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {io.cucumber.messages.GherkinDocument.Feature} Feature
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
                     * @memberof io.cucumber.messages.GherkinDocument.Feature
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Feature.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.location != null && message.hasOwnProperty("location")) {
                            var error = $root.io.cucumber.messages.Location.verify(message.location);
                            if (error)
                                return "location." + error;
                        }
                        if (message.tags != null && message.hasOwnProperty("tags")) {
                            if (!Array.isArray(message.tags))
                                return "tags: array expected";
                            for (var i = 0; i < message.tags.length; ++i) {
                                var error = $root.io.cucumber.messages.GherkinDocument.Feature.Tag.verify(message.tags[i]);
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
                                var error = $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.verify(message.children[i]);
                                if (error)
                                    return "children." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a Feature message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof io.cucumber.messages.GherkinDocument.Feature
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {io.cucumber.messages.GherkinDocument.Feature} Feature
                     */
                    Feature.fromObject = function fromObject(object) {
                        if (object instanceof $root.io.cucumber.messages.GherkinDocument.Feature)
                            return object;
                        var message = new $root.io.cucumber.messages.GherkinDocument.Feature();
                        if (object.location != null) {
                            if (typeof object.location !== "object")
                                throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.location: object expected");
                            message.location = $root.io.cucumber.messages.Location.fromObject(object.location);
                        }
                        if (object.tags) {
                            if (!Array.isArray(object.tags))
                                throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.tags: array expected");
                            message.tags = [];
                            for (var i = 0; i < object.tags.length; ++i) {
                                if (typeof object.tags[i] !== "object")
                                    throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.tags: object expected");
                                message.tags[i] = $root.io.cucumber.messages.GherkinDocument.Feature.Tag.fromObject(object.tags[i]);
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
                                throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.children: array expected");
                            message.children = [];
                            for (var i = 0; i < object.children.length; ++i) {
                                if (typeof object.children[i] !== "object")
                                    throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.children: object expected");
                                message.children[i] = $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.fromObject(object.children[i]);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a Feature message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof io.cucumber.messages.GherkinDocument.Feature
                     * @static
                     * @param {io.cucumber.messages.GherkinDocument.Feature} message Feature
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
                            object.location = $root.io.cucumber.messages.Location.toObject(message.location, options);
                        if (message.tags && message.tags.length) {
                            object.tags = [];
                            for (var j = 0; j < message.tags.length; ++j)
                                object.tags[j] = $root.io.cucumber.messages.GherkinDocument.Feature.Tag.toObject(message.tags[j], options);
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
                                object.children[j] = $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.toObject(message.children[j], options);
                        }
                        return object;
                    };

                    /**
                     * Converts this Feature to JSON.
                     * @function toJSON
                     * @memberof io.cucumber.messages.GherkinDocument.Feature
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Feature.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    Feature.Tag = (function() {

                        /**
                         * Properties of a Tag.
                         * @memberof io.cucumber.messages.GherkinDocument.Feature
                         * @interface ITag
                         * @property {io.cucumber.messages.ILocation|null} [location] Tag location
                         * @property {string|null} [name] Tag name
                         */

                        /**
                         * Constructs a new Tag.
                         * @memberof io.cucumber.messages.GherkinDocument.Feature
                         * @classdesc Represents a Tag.
                         * @implements ITag
                         * @constructor
                         * @param {io.cucumber.messages.GherkinDocument.Feature.ITag=} [properties] Properties to set
                         */
                        function Tag(properties) {
                            if (properties)
                                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * Tag location.
                         * @member {io.cucumber.messages.ILocation|null|undefined} location
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Tag
                         * @instance
                         */
                        Tag.prototype.location = null;

                        /**
                         * Tag name.
                         * @member {string} name
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Tag
                         * @instance
                         */
                        Tag.prototype.name = "";

                        /**
                         * Creates a new Tag instance using the specified properties.
                         * @function create
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Tag
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.ITag=} [properties] Properties to set
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.Tag} Tag instance
                         */
                        Tag.create = function create(properties) {
                            return new Tag(properties);
                        };

                        /**
                         * Encodes the specified Tag message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Tag.verify|verify} messages.
                         * @function encode
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Tag
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.ITag} message Tag message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Tag.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.location != null && message.hasOwnProperty("location"))
                                $root.io.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                            if (message.name != null && message.hasOwnProperty("name"))
                                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                            return writer;
                        };

                        /**
                         * Encodes the specified Tag message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Tag.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Tag
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.ITag} message Tag message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Tag.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a Tag message from the specified reader or buffer.
                         * @function decode
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Tag
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.Tag} Tag
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        Tag.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.GherkinDocument.Feature.Tag();
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1:
                                    message.location = $root.io.cucumber.messages.Location.decode(reader, reader.uint32());
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
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Tag
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.Tag} Tag
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
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Tag
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        Tag.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.location != null && message.hasOwnProperty("location")) {
                                var error = $root.io.cucumber.messages.Location.verify(message.location);
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
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Tag
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.Tag} Tag
                         */
                        Tag.fromObject = function fromObject(object) {
                            if (object instanceof $root.io.cucumber.messages.GherkinDocument.Feature.Tag)
                                return object;
                            var message = new $root.io.cucumber.messages.GherkinDocument.Feature.Tag();
                            if (object.location != null) {
                                if (typeof object.location !== "object")
                                    throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Tag.location: object expected");
                                message.location = $root.io.cucumber.messages.Location.fromObject(object.location);
                            }
                            if (object.name != null)
                                message.name = String(object.name);
                            return message;
                        };

                        /**
                         * Creates a plain object from a Tag message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Tag
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.Tag} message Tag
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
                                object.location = $root.io.cucumber.messages.Location.toObject(message.location, options);
                            if (message.name != null && message.hasOwnProperty("name"))
                                object.name = message.name;
                            return object;
                        };

                        /**
                         * Converts this Tag to JSON.
                         * @function toJSON
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Tag
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        Tag.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        return Tag;
                    })();

                    Feature.FeatureChild = (function() {

                        /**
                         * Properties of a FeatureChild.
                         * @memberof io.cucumber.messages.GherkinDocument.Feature
                         * @interface IFeatureChild
                         * @property {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRule|null} [rule] FeatureChild rule
                         * @property {io.cucumber.messages.GherkinDocument.Feature.IBackground|null} [background] FeatureChild background
                         * @property {io.cucumber.messages.GherkinDocument.Feature.IScenario|null} [scenario] FeatureChild scenario
                         */

                        /**
                         * Constructs a new FeatureChild.
                         * @memberof io.cucumber.messages.GherkinDocument.Feature
                         * @classdesc Represents a FeatureChild.
                         * @implements IFeatureChild
                         * @constructor
                         * @param {io.cucumber.messages.GherkinDocument.Feature.IFeatureChild=} [properties] Properties to set
                         */
                        function FeatureChild(properties) {
                            if (properties)
                                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * FeatureChild rule.
                         * @member {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRule|null|undefined} rule
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild
                         * @instance
                         */
                        FeatureChild.prototype.rule = null;

                        /**
                         * FeatureChild background.
                         * @member {io.cucumber.messages.GherkinDocument.Feature.IBackground|null|undefined} background
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild
                         * @instance
                         */
                        FeatureChild.prototype.background = null;

                        /**
                         * FeatureChild scenario.
                         * @member {io.cucumber.messages.GherkinDocument.Feature.IScenario|null|undefined} scenario
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild
                         * @instance
                         */
                        FeatureChild.prototype.scenario = null;

                        // OneOf field names bound to virtual getters and setters
                        var $oneOfFields;

                        /**
                         * FeatureChild value.
                         * @member {"rule"|"background"|"scenario"|undefined} value
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild
                         * @instance
                         */
                        Object.defineProperty(FeatureChild.prototype, "value", {
                            get: $util.oneOfGetter($oneOfFields = ["rule", "background", "scenario"]),
                            set: $util.oneOfSetter($oneOfFields)
                        });

                        /**
                         * Creates a new FeatureChild instance using the specified properties.
                         * @function create
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.IFeatureChild=} [properties] Properties to set
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.FeatureChild} FeatureChild instance
                         */
                        FeatureChild.create = function create(properties) {
                            return new FeatureChild(properties);
                        };

                        /**
                         * Encodes the specified FeatureChild message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.FeatureChild.verify|verify} messages.
                         * @function encode
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.IFeatureChild} message FeatureChild message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        FeatureChild.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.rule != null && message.hasOwnProperty("rule"))
                                $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule.encode(message.rule, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                            if (message.background != null && message.hasOwnProperty("background"))
                                $root.io.cucumber.messages.GherkinDocument.Feature.Background.encode(message.background, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                            if (message.scenario != null && message.hasOwnProperty("scenario"))
                                $root.io.cucumber.messages.GherkinDocument.Feature.Scenario.encode(message.scenario, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified FeatureChild message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.FeatureChild.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.IFeatureChild} message FeatureChild message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        FeatureChild.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a FeatureChild message from the specified reader or buffer.
                         * @function decode
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.FeatureChild} FeatureChild
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        FeatureChild.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild();
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1:
                                    message.rule = $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule.decode(reader, reader.uint32());
                                    break;
                                case 2:
                                    message.background = $root.io.cucumber.messages.GherkinDocument.Feature.Background.decode(reader, reader.uint32());
                                    break;
                                case 3:
                                    message.scenario = $root.io.cucumber.messages.GherkinDocument.Feature.Scenario.decode(reader, reader.uint32());
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
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.FeatureChild} FeatureChild
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
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        FeatureChild.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            var properties = {};
                            if (message.rule != null && message.hasOwnProperty("rule")) {
                                properties.value = 1;
                                {
                                    var error = $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule.verify(message.rule);
                                    if (error)
                                        return "rule." + error;
                                }
                            }
                            if (message.background != null && message.hasOwnProperty("background")) {
                                if (properties.value === 1)
                                    return "value: multiple values";
                                properties.value = 1;
                                {
                                    var error = $root.io.cucumber.messages.GherkinDocument.Feature.Background.verify(message.background);
                                    if (error)
                                        return "background." + error;
                                }
                            }
                            if (message.scenario != null && message.hasOwnProperty("scenario")) {
                                if (properties.value === 1)
                                    return "value: multiple values";
                                properties.value = 1;
                                {
                                    var error = $root.io.cucumber.messages.GherkinDocument.Feature.Scenario.verify(message.scenario);
                                    if (error)
                                        return "scenario." + error;
                                }
                            }
                            return null;
                        };

                        /**
                         * Creates a FeatureChild message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.FeatureChild} FeatureChild
                         */
                        FeatureChild.fromObject = function fromObject(object) {
                            if (object instanceof $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild)
                                return object;
                            var message = new $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild();
                            if (object.rule != null) {
                                if (typeof object.rule !== "object")
                                    throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.FeatureChild.rule: object expected");
                                message.rule = $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule.fromObject(object.rule);
                            }
                            if (object.background != null) {
                                if (typeof object.background !== "object")
                                    throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.FeatureChild.background: object expected");
                                message.background = $root.io.cucumber.messages.GherkinDocument.Feature.Background.fromObject(object.background);
                            }
                            if (object.scenario != null) {
                                if (typeof object.scenario !== "object")
                                    throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.FeatureChild.scenario: object expected");
                                message.scenario = $root.io.cucumber.messages.GherkinDocument.Feature.Scenario.fromObject(object.scenario);
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a FeatureChild message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.FeatureChild} message FeatureChild
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        FeatureChild.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            var object = {};
                            if (message.rule != null && message.hasOwnProperty("rule")) {
                                object.rule = $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule.toObject(message.rule, options);
                                if (options.oneofs)
                                    object.value = "rule";
                            }
                            if (message.background != null && message.hasOwnProperty("background")) {
                                object.background = $root.io.cucumber.messages.GherkinDocument.Feature.Background.toObject(message.background, options);
                                if (options.oneofs)
                                    object.value = "background";
                            }
                            if (message.scenario != null && message.hasOwnProperty("scenario")) {
                                object.scenario = $root.io.cucumber.messages.GherkinDocument.Feature.Scenario.toObject(message.scenario, options);
                                if (options.oneofs)
                                    object.value = "scenario";
                            }
                            return object;
                        };

                        /**
                         * Converts this FeatureChild to JSON.
                         * @function toJSON
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        FeatureChild.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        FeatureChild.Rule = (function() {

                            /**
                             * Properties of a Rule.
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild
                             * @interface IRule
                             * @property {io.cucumber.messages.ILocation|null} [location] Rule location
                             * @property {string|null} [keyword] Rule keyword
                             * @property {string|null} [name] Rule name
                             * @property {string|null} [description] Rule description
                             * @property {Array.<io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRuleChild>|null} [children] Rule children
                             */

                            /**
                             * Constructs a new Rule.
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild
                             * @classdesc Represents a Rule.
                             * @implements IRule
                             * @constructor
                             * @param {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRule=} [properties] Properties to set
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
                             * @member {io.cucumber.messages.ILocation|null|undefined} location
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule
                             * @instance
                             */
                            Rule.prototype.location = null;

                            /**
                             * Rule keyword.
                             * @member {string} keyword
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule
                             * @instance
                             */
                            Rule.prototype.keyword = "";

                            /**
                             * Rule name.
                             * @member {string} name
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule
                             * @instance
                             */
                            Rule.prototype.name = "";

                            /**
                             * Rule description.
                             * @member {string} description
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule
                             * @instance
                             */
                            Rule.prototype.description = "";

                            /**
                             * Rule children.
                             * @member {Array.<io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRuleChild>} children
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule
                             * @instance
                             */
                            Rule.prototype.children = $util.emptyArray;

                            /**
                             * Creates a new Rule instance using the specified properties.
                             * @function create
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRule=} [properties] Properties to set
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule} Rule instance
                             */
                            Rule.create = function create(properties) {
                                return new Rule(properties);
                            };

                            /**
                             * Encodes the specified Rule message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule.verify|verify} messages.
                             * @function encode
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRule} message Rule message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            Rule.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.location != null && message.hasOwnProperty("location"))
                                    $root.io.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                                if (message.keyword != null && message.hasOwnProperty("keyword"))
                                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.keyword);
                                if (message.name != null && message.hasOwnProperty("name"))
                                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                                if (message.description != null && message.hasOwnProperty("description"))
                                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.description);
                                if (message.children != null && message.children.length)
                                    for (var i = 0; i < message.children.length; ++i)
                                        $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild.encode(message.children[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                                return writer;
                            };

                            /**
                             * Encodes the specified Rule message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRule} message Rule message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            Rule.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a Rule message from the specified reader or buffer.
                             * @function decode
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule} Rule
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            Rule.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule();
                                while (reader.pos < end) {
                                    var tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.location = $root.io.cucumber.messages.Location.decode(reader, reader.uint32());
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
                                        message.children.push($root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild.decode(reader, reader.uint32()));
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
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule} Rule
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
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            Rule.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.location != null && message.hasOwnProperty("location")) {
                                    var error = $root.io.cucumber.messages.Location.verify(message.location);
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
                                        var error = $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild.verify(message.children[i]);
                                        if (error)
                                            return "children." + error;
                                    }
                                }
                                return null;
                            };

                            /**
                             * Creates a Rule message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule} Rule
                             */
                            Rule.fromObject = function fromObject(object) {
                                if (object instanceof $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule)
                                    return object;
                                var message = new $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule();
                                if (object.location != null) {
                                    if (typeof object.location !== "object")
                                        throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule.location: object expected");
                                    message.location = $root.io.cucumber.messages.Location.fromObject(object.location);
                                }
                                if (object.keyword != null)
                                    message.keyword = String(object.keyword);
                                if (object.name != null)
                                    message.name = String(object.name);
                                if (object.description != null)
                                    message.description = String(object.description);
                                if (object.children) {
                                    if (!Array.isArray(object.children))
                                        throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule.children: array expected");
                                    message.children = [];
                                    for (var i = 0; i < object.children.length; ++i) {
                                        if (typeof object.children[i] !== "object")
                                            throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule.children: object expected");
                                        message.children[i] = $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild.fromObject(object.children[i]);
                                    }
                                }
                                return message;
                            };

                            /**
                             * Creates a plain object from a Rule message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule} message Rule
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
                                    object.location = $root.io.cucumber.messages.Location.toObject(message.location, options);
                                if (message.keyword != null && message.hasOwnProperty("keyword"))
                                    object.keyword = message.keyword;
                                if (message.name != null && message.hasOwnProperty("name"))
                                    object.name = message.name;
                                if (message.description != null && message.hasOwnProperty("description"))
                                    object.description = message.description;
                                if (message.children && message.children.length) {
                                    object.children = [];
                                    for (var j = 0; j < message.children.length; ++j)
                                        object.children[j] = $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild.toObject(message.children[j], options);
                                }
                                return object;
                            };

                            /**
                             * Converts this Rule to JSON.
                             * @function toJSON
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            Rule.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return Rule;
                        })();

                        FeatureChild.RuleChild = (function() {

                            /**
                             * Properties of a RuleChild.
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild
                             * @interface IRuleChild
                             * @property {io.cucumber.messages.GherkinDocument.Feature.IBackground|null} [background] RuleChild background
                             * @property {io.cucumber.messages.GherkinDocument.Feature.IScenario|null} [scenario] RuleChild scenario
                             */

                            /**
                             * Constructs a new RuleChild.
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild
                             * @classdesc Represents a RuleChild.
                             * @implements IRuleChild
                             * @constructor
                             * @param {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRuleChild=} [properties] Properties to set
                             */
                            function RuleChild(properties) {
                                if (properties)
                                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * RuleChild background.
                             * @member {io.cucumber.messages.GherkinDocument.Feature.IBackground|null|undefined} background
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild
                             * @instance
                             */
                            RuleChild.prototype.background = null;

                            /**
                             * RuleChild scenario.
                             * @member {io.cucumber.messages.GherkinDocument.Feature.IScenario|null|undefined} scenario
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild
                             * @instance
                             */
                            RuleChild.prototype.scenario = null;

                            // OneOf field names bound to virtual getters and setters
                            var $oneOfFields;

                            /**
                             * RuleChild value.
                             * @member {"background"|"scenario"|undefined} value
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild
                             * @instance
                             */
                            Object.defineProperty(RuleChild.prototype, "value", {
                                get: $util.oneOfGetter($oneOfFields = ["background", "scenario"]),
                                set: $util.oneOfSetter($oneOfFields)
                            });

                            /**
                             * Creates a new RuleChild instance using the specified properties.
                             * @function create
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRuleChild=} [properties] Properties to set
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild} RuleChild instance
                             */
                            RuleChild.create = function create(properties) {
                                return new RuleChild(properties);
                            };

                            /**
                             * Encodes the specified RuleChild message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild.verify|verify} messages.
                             * @function encode
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRuleChild} message RuleChild message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            RuleChild.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.background != null && message.hasOwnProperty("background"))
                                    $root.io.cucumber.messages.GherkinDocument.Feature.Background.encode(message.background, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                                if (message.scenario != null && message.hasOwnProperty("scenario"))
                                    $root.io.cucumber.messages.GherkinDocument.Feature.Scenario.encode(message.scenario, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                                return writer;
                            };

                            /**
                             * Encodes the specified RuleChild message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRuleChild} message RuleChild message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            RuleChild.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a RuleChild message from the specified reader or buffer.
                             * @function decode
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild} RuleChild
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            RuleChild.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild();
                                while (reader.pos < end) {
                                    var tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.background = $root.io.cucumber.messages.GherkinDocument.Feature.Background.decode(reader, reader.uint32());
                                        break;
                                    case 2:
                                        message.scenario = $root.io.cucumber.messages.GherkinDocument.Feature.Scenario.decode(reader, reader.uint32());
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
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild} RuleChild
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
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild
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
                                        var error = $root.io.cucumber.messages.GherkinDocument.Feature.Background.verify(message.background);
                                        if (error)
                                            return "background." + error;
                                    }
                                }
                                if (message.scenario != null && message.hasOwnProperty("scenario")) {
                                    if (properties.value === 1)
                                        return "value: multiple values";
                                    properties.value = 1;
                                    {
                                        var error = $root.io.cucumber.messages.GherkinDocument.Feature.Scenario.verify(message.scenario);
                                        if (error)
                                            return "scenario." + error;
                                    }
                                }
                                return null;
                            };

                            /**
                             * Creates a RuleChild message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild} RuleChild
                             */
                            RuleChild.fromObject = function fromObject(object) {
                                if (object instanceof $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild)
                                    return object;
                                var message = new $root.io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild();
                                if (object.background != null) {
                                    if (typeof object.background !== "object")
                                        throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild.background: object expected");
                                    message.background = $root.io.cucumber.messages.GherkinDocument.Feature.Background.fromObject(object.background);
                                }
                                if (object.scenario != null) {
                                    if (typeof object.scenario !== "object")
                                        throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild.scenario: object expected");
                                    message.scenario = $root.io.cucumber.messages.GherkinDocument.Feature.Scenario.fromObject(object.scenario);
                                }
                                return message;
                            };

                            /**
                             * Creates a plain object from a RuleChild message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild} message RuleChild
                             * @param {$protobuf.IConversionOptions} [options] Conversion options
                             * @returns {Object.<string,*>} Plain object
                             */
                            RuleChild.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                var object = {};
                                if (message.background != null && message.hasOwnProperty("background")) {
                                    object.background = $root.io.cucumber.messages.GherkinDocument.Feature.Background.toObject(message.background, options);
                                    if (options.oneofs)
                                        object.value = "background";
                                }
                                if (message.scenario != null && message.hasOwnProperty("scenario")) {
                                    object.scenario = $root.io.cucumber.messages.GherkinDocument.Feature.Scenario.toObject(message.scenario, options);
                                    if (options.oneofs)
                                        object.value = "scenario";
                                }
                                return object;
                            };

                            /**
                             * Converts this RuleChild to JSON.
                             * @function toJSON
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            RuleChild.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return RuleChild;
                        })();

                        return FeatureChild;
                    })();

                    Feature.Background = (function() {

                        /**
                         * Properties of a Background.
                         * @memberof io.cucumber.messages.GherkinDocument.Feature
                         * @interface IBackground
                         * @property {io.cucumber.messages.ILocation|null} [location] Background location
                         * @property {string|null} [keyword] Background keyword
                         * @property {string|null} [name] Background name
                         * @property {string|null} [description] Background description
                         * @property {Array.<io.cucumber.messages.GherkinDocument.Feature.IStep>|null} [steps] Background steps
                         */

                        /**
                         * Constructs a new Background.
                         * @memberof io.cucumber.messages.GherkinDocument.Feature
                         * @classdesc Represents a Background.
                         * @implements IBackground
                         * @constructor
                         * @param {io.cucumber.messages.GherkinDocument.Feature.IBackground=} [properties] Properties to set
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
                         * @member {io.cucumber.messages.ILocation|null|undefined} location
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Background
                         * @instance
                         */
                        Background.prototype.location = null;

                        /**
                         * Background keyword.
                         * @member {string} keyword
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Background
                         * @instance
                         */
                        Background.prototype.keyword = "";

                        /**
                         * Background name.
                         * @member {string} name
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Background
                         * @instance
                         */
                        Background.prototype.name = "";

                        /**
                         * Background description.
                         * @member {string} description
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Background
                         * @instance
                         */
                        Background.prototype.description = "";

                        /**
                         * Background steps.
                         * @member {Array.<io.cucumber.messages.GherkinDocument.Feature.IStep>} steps
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Background
                         * @instance
                         */
                        Background.prototype.steps = $util.emptyArray;

                        /**
                         * Creates a new Background instance using the specified properties.
                         * @function create
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Background
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.IBackground=} [properties] Properties to set
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.Background} Background instance
                         */
                        Background.create = function create(properties) {
                            return new Background(properties);
                        };

                        /**
                         * Encodes the specified Background message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Background.verify|verify} messages.
                         * @function encode
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Background
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.IBackground} message Background message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Background.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.location != null && message.hasOwnProperty("location"))
                                $root.io.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                            if (message.keyword != null && message.hasOwnProperty("keyword"))
                                writer.uint32(/* id 2, wireType 2 =*/18).string(message.keyword);
                            if (message.name != null && message.hasOwnProperty("name"))
                                writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                            if (message.description != null && message.hasOwnProperty("description"))
                                writer.uint32(/* id 4, wireType 2 =*/34).string(message.description);
                            if (message.steps != null && message.steps.length)
                                for (var i = 0; i < message.steps.length; ++i)
                                    $root.io.cucumber.messages.GherkinDocument.Feature.Step.encode(message.steps[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified Background message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Background.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Background
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.IBackground} message Background message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Background.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a Background message from the specified reader or buffer.
                         * @function decode
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Background
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.Background} Background
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        Background.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.GherkinDocument.Feature.Background();
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1:
                                    message.location = $root.io.cucumber.messages.Location.decode(reader, reader.uint32());
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
                                    message.steps.push($root.io.cucumber.messages.GherkinDocument.Feature.Step.decode(reader, reader.uint32()));
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
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Background
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.Background} Background
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
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Background
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        Background.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.location != null && message.hasOwnProperty("location")) {
                                var error = $root.io.cucumber.messages.Location.verify(message.location);
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
                                    var error = $root.io.cucumber.messages.GherkinDocument.Feature.Step.verify(message.steps[i]);
                                    if (error)
                                        return "steps." + error;
                                }
                            }
                            return null;
                        };

                        /**
                         * Creates a Background message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Background
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.Background} Background
                         */
                        Background.fromObject = function fromObject(object) {
                            if (object instanceof $root.io.cucumber.messages.GherkinDocument.Feature.Background)
                                return object;
                            var message = new $root.io.cucumber.messages.GherkinDocument.Feature.Background();
                            if (object.location != null) {
                                if (typeof object.location !== "object")
                                    throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Background.location: object expected");
                                message.location = $root.io.cucumber.messages.Location.fromObject(object.location);
                            }
                            if (object.keyword != null)
                                message.keyword = String(object.keyword);
                            if (object.name != null)
                                message.name = String(object.name);
                            if (object.description != null)
                                message.description = String(object.description);
                            if (object.steps) {
                                if (!Array.isArray(object.steps))
                                    throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Background.steps: array expected");
                                message.steps = [];
                                for (var i = 0; i < object.steps.length; ++i) {
                                    if (typeof object.steps[i] !== "object")
                                        throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Background.steps: object expected");
                                    message.steps[i] = $root.io.cucumber.messages.GherkinDocument.Feature.Step.fromObject(object.steps[i]);
                                }
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a Background message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Background
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.Background} message Background
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
                                object.location = $root.io.cucumber.messages.Location.toObject(message.location, options);
                            if (message.keyword != null && message.hasOwnProperty("keyword"))
                                object.keyword = message.keyword;
                            if (message.name != null && message.hasOwnProperty("name"))
                                object.name = message.name;
                            if (message.description != null && message.hasOwnProperty("description"))
                                object.description = message.description;
                            if (message.steps && message.steps.length) {
                                object.steps = [];
                                for (var j = 0; j < message.steps.length; ++j)
                                    object.steps[j] = $root.io.cucumber.messages.GherkinDocument.Feature.Step.toObject(message.steps[j], options);
                            }
                            return object;
                        };

                        /**
                         * Converts this Background to JSON.
                         * @function toJSON
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Background
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        Background.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        return Background;
                    })();

                    Feature.Scenario = (function() {

                        /**
                         * Properties of a Scenario.
                         * @memberof io.cucumber.messages.GherkinDocument.Feature
                         * @interface IScenario
                         * @property {io.cucumber.messages.ILocation|null} [location] Scenario location
                         * @property {Array.<io.cucumber.messages.GherkinDocument.Feature.ITag>|null} [tags] Scenario tags
                         * @property {string|null} [keyword] Scenario keyword
                         * @property {string|null} [name] Scenario name
                         * @property {string|null} [description] Scenario description
                         * @property {Array.<io.cucumber.messages.GherkinDocument.Feature.IStep>|null} [steps] Scenario steps
                         * @property {Array.<io.cucumber.messages.GherkinDocument.Feature.Scenario.IExamples>|null} [examples] Scenario examples
                         */

                        /**
                         * Constructs a new Scenario.
                         * @memberof io.cucumber.messages.GherkinDocument.Feature
                         * @classdesc Represents a Scenario.
                         * @implements IScenario
                         * @constructor
                         * @param {io.cucumber.messages.GherkinDocument.Feature.IScenario=} [properties] Properties to set
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
                         * @member {io.cucumber.messages.ILocation|null|undefined} location
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario
                         * @instance
                         */
                        Scenario.prototype.location = null;

                        /**
                         * Scenario tags.
                         * @member {Array.<io.cucumber.messages.GherkinDocument.Feature.ITag>} tags
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario
                         * @instance
                         */
                        Scenario.prototype.tags = $util.emptyArray;

                        /**
                         * Scenario keyword.
                         * @member {string} keyword
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario
                         * @instance
                         */
                        Scenario.prototype.keyword = "";

                        /**
                         * Scenario name.
                         * @member {string} name
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario
                         * @instance
                         */
                        Scenario.prototype.name = "";

                        /**
                         * Scenario description.
                         * @member {string} description
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario
                         * @instance
                         */
                        Scenario.prototype.description = "";

                        /**
                         * Scenario steps.
                         * @member {Array.<io.cucumber.messages.GherkinDocument.Feature.IStep>} steps
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario
                         * @instance
                         */
                        Scenario.prototype.steps = $util.emptyArray;

                        /**
                         * Scenario examples.
                         * @member {Array.<io.cucumber.messages.GherkinDocument.Feature.Scenario.IExamples>} examples
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario
                         * @instance
                         */
                        Scenario.prototype.examples = $util.emptyArray;

                        /**
                         * Creates a new Scenario instance using the specified properties.
                         * @function create
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.IScenario=} [properties] Properties to set
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.Scenario} Scenario instance
                         */
                        Scenario.create = function create(properties) {
                            return new Scenario(properties);
                        };

                        /**
                         * Encodes the specified Scenario message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Scenario.verify|verify} messages.
                         * @function encode
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.IScenario} message Scenario message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Scenario.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.location != null && message.hasOwnProperty("location"))
                                $root.io.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                            if (message.tags != null && message.tags.length)
                                for (var i = 0; i < message.tags.length; ++i)
                                    $root.io.cucumber.messages.GherkinDocument.Feature.Tag.encode(message.tags[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                            if (message.keyword != null && message.hasOwnProperty("keyword"))
                                writer.uint32(/* id 3, wireType 2 =*/26).string(message.keyword);
                            if (message.name != null && message.hasOwnProperty("name"))
                                writer.uint32(/* id 4, wireType 2 =*/34).string(message.name);
                            if (message.description != null && message.hasOwnProperty("description"))
                                writer.uint32(/* id 5, wireType 2 =*/42).string(message.description);
                            if (message.steps != null && message.steps.length)
                                for (var i = 0; i < message.steps.length; ++i)
                                    $root.io.cucumber.messages.GherkinDocument.Feature.Step.encode(message.steps[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                            if (message.examples != null && message.examples.length)
                                for (var i = 0; i < message.examples.length; ++i)
                                    $root.io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples.encode(message.examples[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified Scenario message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Scenario.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.IScenario} message Scenario message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Scenario.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a Scenario message from the specified reader or buffer.
                         * @function decode
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.Scenario} Scenario
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        Scenario.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.GherkinDocument.Feature.Scenario();
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1:
                                    message.location = $root.io.cucumber.messages.Location.decode(reader, reader.uint32());
                                    break;
                                case 2:
                                    if (!(message.tags && message.tags.length))
                                        message.tags = [];
                                    message.tags.push($root.io.cucumber.messages.GherkinDocument.Feature.Tag.decode(reader, reader.uint32()));
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
                                    message.steps.push($root.io.cucumber.messages.GherkinDocument.Feature.Step.decode(reader, reader.uint32()));
                                    break;
                                case 7:
                                    if (!(message.examples && message.examples.length))
                                        message.examples = [];
                                    message.examples.push($root.io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples.decode(reader, reader.uint32()));
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
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.Scenario} Scenario
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
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        Scenario.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.location != null && message.hasOwnProperty("location")) {
                                var error = $root.io.cucumber.messages.Location.verify(message.location);
                                if (error)
                                    return "location." + error;
                            }
                            if (message.tags != null && message.hasOwnProperty("tags")) {
                                if (!Array.isArray(message.tags))
                                    return "tags: array expected";
                                for (var i = 0; i < message.tags.length; ++i) {
                                    var error = $root.io.cucumber.messages.GherkinDocument.Feature.Tag.verify(message.tags[i]);
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
                                    var error = $root.io.cucumber.messages.GherkinDocument.Feature.Step.verify(message.steps[i]);
                                    if (error)
                                        return "steps." + error;
                                }
                            }
                            if (message.examples != null && message.hasOwnProperty("examples")) {
                                if (!Array.isArray(message.examples))
                                    return "examples: array expected";
                                for (var i = 0; i < message.examples.length; ++i) {
                                    var error = $root.io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples.verify(message.examples[i]);
                                    if (error)
                                        return "examples." + error;
                                }
                            }
                            return null;
                        };

                        /**
                         * Creates a Scenario message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.Scenario} Scenario
                         */
                        Scenario.fromObject = function fromObject(object) {
                            if (object instanceof $root.io.cucumber.messages.GherkinDocument.Feature.Scenario)
                                return object;
                            var message = new $root.io.cucumber.messages.GherkinDocument.Feature.Scenario();
                            if (object.location != null) {
                                if (typeof object.location !== "object")
                                    throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Scenario.location: object expected");
                                message.location = $root.io.cucumber.messages.Location.fromObject(object.location);
                            }
                            if (object.tags) {
                                if (!Array.isArray(object.tags))
                                    throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Scenario.tags: array expected");
                                message.tags = [];
                                for (var i = 0; i < object.tags.length; ++i) {
                                    if (typeof object.tags[i] !== "object")
                                        throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Scenario.tags: object expected");
                                    message.tags[i] = $root.io.cucumber.messages.GherkinDocument.Feature.Tag.fromObject(object.tags[i]);
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
                                    throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Scenario.steps: array expected");
                                message.steps = [];
                                for (var i = 0; i < object.steps.length; ++i) {
                                    if (typeof object.steps[i] !== "object")
                                        throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Scenario.steps: object expected");
                                    message.steps[i] = $root.io.cucumber.messages.GherkinDocument.Feature.Step.fromObject(object.steps[i]);
                                }
                            }
                            if (object.examples) {
                                if (!Array.isArray(object.examples))
                                    throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Scenario.examples: array expected");
                                message.examples = [];
                                for (var i = 0; i < object.examples.length; ++i) {
                                    if (typeof object.examples[i] !== "object")
                                        throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Scenario.examples: object expected");
                                    message.examples[i] = $root.io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples.fromObject(object.examples[i]);
                                }
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a Scenario message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.Scenario} message Scenario
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
                                object.location = $root.io.cucumber.messages.Location.toObject(message.location, options);
                            if (message.tags && message.tags.length) {
                                object.tags = [];
                                for (var j = 0; j < message.tags.length; ++j)
                                    object.tags[j] = $root.io.cucumber.messages.GherkinDocument.Feature.Tag.toObject(message.tags[j], options);
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
                                    object.steps[j] = $root.io.cucumber.messages.GherkinDocument.Feature.Step.toObject(message.steps[j], options);
                            }
                            if (message.examples && message.examples.length) {
                                object.examples = [];
                                for (var j = 0; j < message.examples.length; ++j)
                                    object.examples[j] = $root.io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples.toObject(message.examples[j], options);
                            }
                            return object;
                        };

                        /**
                         * Converts this Scenario to JSON.
                         * @function toJSON
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        Scenario.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        Scenario.Examples = (function() {

                            /**
                             * Properties of an Examples.
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario
                             * @interface IExamples
                             * @property {io.cucumber.messages.ILocation|null} [location] Examples location
                             * @property {Array.<io.cucumber.messages.GherkinDocument.Feature.ITag>|null} [tags] Examples tags
                             * @property {string|null} [keyword] Examples keyword
                             * @property {string|null} [name] Examples name
                             * @property {string|null} [description] Examples description
                             * @property {io.cucumber.messages.GherkinDocument.Feature.ITableRow|null} [tableHeader] Examples tableHeader
                             * @property {Array.<io.cucumber.messages.GherkinDocument.Feature.ITableRow>|null} [tableBody] Examples tableBody
                             */

                            /**
                             * Constructs a new Examples.
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario
                             * @classdesc Represents an Examples.
                             * @implements IExamples
                             * @constructor
                             * @param {io.cucumber.messages.GherkinDocument.Feature.Scenario.IExamples=} [properties] Properties to set
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
                             * @member {io.cucumber.messages.ILocation|null|undefined} location
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples
                             * @instance
                             */
                            Examples.prototype.location = null;

                            /**
                             * Examples tags.
                             * @member {Array.<io.cucumber.messages.GherkinDocument.Feature.ITag>} tags
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples
                             * @instance
                             */
                            Examples.prototype.tags = $util.emptyArray;

                            /**
                             * Examples keyword.
                             * @member {string} keyword
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples
                             * @instance
                             */
                            Examples.prototype.keyword = "";

                            /**
                             * Examples name.
                             * @member {string} name
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples
                             * @instance
                             */
                            Examples.prototype.name = "";

                            /**
                             * Examples description.
                             * @member {string} description
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples
                             * @instance
                             */
                            Examples.prototype.description = "";

                            /**
                             * Examples tableHeader.
                             * @member {io.cucumber.messages.GherkinDocument.Feature.ITableRow|null|undefined} tableHeader
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples
                             * @instance
                             */
                            Examples.prototype.tableHeader = null;

                            /**
                             * Examples tableBody.
                             * @member {Array.<io.cucumber.messages.GherkinDocument.Feature.ITableRow>} tableBody
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples
                             * @instance
                             */
                            Examples.prototype.tableBody = $util.emptyArray;

                            /**
                             * Creates a new Examples instance using the specified properties.
                             * @function create
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.Scenario.IExamples=} [properties] Properties to set
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples} Examples instance
                             */
                            Examples.create = function create(properties) {
                                return new Examples(properties);
                            };

                            /**
                             * Encodes the specified Examples message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples.verify|verify} messages.
                             * @function encode
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.Scenario.IExamples} message Examples message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            Examples.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.location != null && message.hasOwnProperty("location"))
                                    $root.io.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                                if (message.tags != null && message.tags.length)
                                    for (var i = 0; i < message.tags.length; ++i)
                                        $root.io.cucumber.messages.GherkinDocument.Feature.Tag.encode(message.tags[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                                if (message.keyword != null && message.hasOwnProperty("keyword"))
                                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.keyword);
                                if (message.name != null && message.hasOwnProperty("name"))
                                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.name);
                                if (message.description != null && message.hasOwnProperty("description"))
                                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.description);
                                if (message.tableHeader != null && message.hasOwnProperty("tableHeader"))
                                    $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.encode(message.tableHeader, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                                if (message.tableBody != null && message.tableBody.length)
                                    for (var i = 0; i < message.tableBody.length; ++i)
                                        $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.encode(message.tableBody[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                                return writer;
                            };

                            /**
                             * Encodes the specified Examples message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.Scenario.IExamples} message Examples message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            Examples.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes an Examples message from the specified reader or buffer.
                             * @function decode
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples} Examples
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            Examples.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples();
                                while (reader.pos < end) {
                                    var tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.location = $root.io.cucumber.messages.Location.decode(reader, reader.uint32());
                                        break;
                                    case 2:
                                        if (!(message.tags && message.tags.length))
                                            message.tags = [];
                                        message.tags.push($root.io.cucumber.messages.GherkinDocument.Feature.Tag.decode(reader, reader.uint32()));
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
                                        message.tableHeader = $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.decode(reader, reader.uint32());
                                        break;
                                    case 7:
                                        if (!(message.tableBody && message.tableBody.length))
                                            message.tableBody = [];
                                        message.tableBody.push($root.io.cucumber.messages.GherkinDocument.Feature.TableRow.decode(reader, reader.uint32()));
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
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples} Examples
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
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            Examples.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.location != null && message.hasOwnProperty("location")) {
                                    var error = $root.io.cucumber.messages.Location.verify(message.location);
                                    if (error)
                                        return "location." + error;
                                }
                                if (message.tags != null && message.hasOwnProperty("tags")) {
                                    if (!Array.isArray(message.tags))
                                        return "tags: array expected";
                                    for (var i = 0; i < message.tags.length; ++i) {
                                        var error = $root.io.cucumber.messages.GherkinDocument.Feature.Tag.verify(message.tags[i]);
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
                                    var error = $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.verify(message.tableHeader);
                                    if (error)
                                        return "tableHeader." + error;
                                }
                                if (message.tableBody != null && message.hasOwnProperty("tableBody")) {
                                    if (!Array.isArray(message.tableBody))
                                        return "tableBody: array expected";
                                    for (var i = 0; i < message.tableBody.length; ++i) {
                                        var error = $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.verify(message.tableBody[i]);
                                        if (error)
                                            return "tableBody." + error;
                                    }
                                }
                                return null;
                            };

                            /**
                             * Creates an Examples message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples} Examples
                             */
                            Examples.fromObject = function fromObject(object) {
                                if (object instanceof $root.io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples)
                                    return object;
                                var message = new $root.io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples();
                                if (object.location != null) {
                                    if (typeof object.location !== "object")
                                        throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples.location: object expected");
                                    message.location = $root.io.cucumber.messages.Location.fromObject(object.location);
                                }
                                if (object.tags) {
                                    if (!Array.isArray(object.tags))
                                        throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples.tags: array expected");
                                    message.tags = [];
                                    for (var i = 0; i < object.tags.length; ++i) {
                                        if (typeof object.tags[i] !== "object")
                                            throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples.tags: object expected");
                                        message.tags[i] = $root.io.cucumber.messages.GherkinDocument.Feature.Tag.fromObject(object.tags[i]);
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
                                        throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples.tableHeader: object expected");
                                    message.tableHeader = $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.fromObject(object.tableHeader);
                                }
                                if (object.tableBody) {
                                    if (!Array.isArray(object.tableBody))
                                        throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples.tableBody: array expected");
                                    message.tableBody = [];
                                    for (var i = 0; i < object.tableBody.length; ++i) {
                                        if (typeof object.tableBody[i] !== "object")
                                            throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples.tableBody: object expected");
                                        message.tableBody[i] = $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.fromObject(object.tableBody[i]);
                                    }
                                }
                                return message;
                            };

                            /**
                             * Creates a plain object from an Examples message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples} message Examples
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
                                    object.location = $root.io.cucumber.messages.Location.toObject(message.location, options);
                                if (message.tags && message.tags.length) {
                                    object.tags = [];
                                    for (var j = 0; j < message.tags.length; ++j)
                                        object.tags[j] = $root.io.cucumber.messages.GherkinDocument.Feature.Tag.toObject(message.tags[j], options);
                                }
                                if (message.keyword != null && message.hasOwnProperty("keyword"))
                                    object.keyword = message.keyword;
                                if (message.name != null && message.hasOwnProperty("name"))
                                    object.name = message.name;
                                if (message.description != null && message.hasOwnProperty("description"))
                                    object.description = message.description;
                                if (message.tableHeader != null && message.hasOwnProperty("tableHeader"))
                                    object.tableHeader = $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.toObject(message.tableHeader, options);
                                if (message.tableBody && message.tableBody.length) {
                                    object.tableBody = [];
                                    for (var j = 0; j < message.tableBody.length; ++j)
                                        object.tableBody[j] = $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.toObject(message.tableBody[j], options);
                                }
                                return object;
                            };

                            /**
                             * Converts this Examples to JSON.
                             * @function toJSON
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            Examples.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return Examples;
                        })();

                        return Scenario;
                    })();

                    Feature.TableRow = (function() {

                        /**
                         * Properties of a TableRow.
                         * @memberof io.cucumber.messages.GherkinDocument.Feature
                         * @interface ITableRow
                         * @property {io.cucumber.messages.ILocation|null} [location] TableRow location
                         * @property {Array.<io.cucumber.messages.GherkinDocument.Feature.TableRow.ITableCell>|null} [cells] TableRow cells
                         */

                        /**
                         * Constructs a new TableRow.
                         * @memberof io.cucumber.messages.GherkinDocument.Feature
                         * @classdesc Represents a TableRow.
                         * @implements ITableRow
                         * @constructor
                         * @param {io.cucumber.messages.GherkinDocument.Feature.ITableRow=} [properties] Properties to set
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
                         * @member {io.cucumber.messages.ILocation|null|undefined} location
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow
                         * @instance
                         */
                        TableRow.prototype.location = null;

                        /**
                         * TableRow cells.
                         * @member {Array.<io.cucumber.messages.GherkinDocument.Feature.TableRow.ITableCell>} cells
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow
                         * @instance
                         */
                        TableRow.prototype.cells = $util.emptyArray;

                        /**
                         * Creates a new TableRow instance using the specified properties.
                         * @function create
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.ITableRow=} [properties] Properties to set
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.TableRow} TableRow instance
                         */
                        TableRow.create = function create(properties) {
                            return new TableRow(properties);
                        };

                        /**
                         * Encodes the specified TableRow message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.TableRow.verify|verify} messages.
                         * @function encode
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.ITableRow} message TableRow message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        TableRow.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.location != null && message.hasOwnProperty("location"))
                                $root.io.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                            if (message.cells != null && message.cells.length)
                                for (var i = 0; i < message.cells.length; ++i)
                                    $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell.encode(message.cells[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified TableRow message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.TableRow.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.ITableRow} message TableRow message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        TableRow.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a TableRow message from the specified reader or buffer.
                         * @function decode
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.TableRow} TableRow
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        TableRow.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.GherkinDocument.Feature.TableRow();
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1:
                                    message.location = $root.io.cucumber.messages.Location.decode(reader, reader.uint32());
                                    break;
                                case 2:
                                    if (!(message.cells && message.cells.length))
                                        message.cells = [];
                                    message.cells.push($root.io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell.decode(reader, reader.uint32()));
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
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.TableRow} TableRow
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
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        TableRow.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.location != null && message.hasOwnProperty("location")) {
                                var error = $root.io.cucumber.messages.Location.verify(message.location);
                                if (error)
                                    return "location." + error;
                            }
                            if (message.cells != null && message.hasOwnProperty("cells")) {
                                if (!Array.isArray(message.cells))
                                    return "cells: array expected";
                                for (var i = 0; i < message.cells.length; ++i) {
                                    var error = $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell.verify(message.cells[i]);
                                    if (error)
                                        return "cells." + error;
                                }
                            }
                            return null;
                        };

                        /**
                         * Creates a TableRow message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.TableRow} TableRow
                         */
                        TableRow.fromObject = function fromObject(object) {
                            if (object instanceof $root.io.cucumber.messages.GherkinDocument.Feature.TableRow)
                                return object;
                            var message = new $root.io.cucumber.messages.GherkinDocument.Feature.TableRow();
                            if (object.location != null) {
                                if (typeof object.location !== "object")
                                    throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.TableRow.location: object expected");
                                message.location = $root.io.cucumber.messages.Location.fromObject(object.location);
                            }
                            if (object.cells) {
                                if (!Array.isArray(object.cells))
                                    throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.TableRow.cells: array expected");
                                message.cells = [];
                                for (var i = 0; i < object.cells.length; ++i) {
                                    if (typeof object.cells[i] !== "object")
                                        throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.TableRow.cells: object expected");
                                    message.cells[i] = $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell.fromObject(object.cells[i]);
                                }
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a TableRow message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.TableRow} message TableRow
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
                                object.location = $root.io.cucumber.messages.Location.toObject(message.location, options);
                            if (message.cells && message.cells.length) {
                                object.cells = [];
                                for (var j = 0; j < message.cells.length; ++j)
                                    object.cells[j] = $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell.toObject(message.cells[j], options);
                            }
                            return object;
                        };

                        /**
                         * Converts this TableRow to JSON.
                         * @function toJSON
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        TableRow.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        TableRow.TableCell = (function() {

                            /**
                             * Properties of a TableCell.
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow
                             * @interface ITableCell
                             * @property {io.cucumber.messages.ILocation|null} [location] TableCell location
                             * @property {string|null} [value] TableCell value
                             */

                            /**
                             * Constructs a new TableCell.
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow
                             * @classdesc Represents a TableCell.
                             * @implements ITableCell
                             * @constructor
                             * @param {io.cucumber.messages.GherkinDocument.Feature.TableRow.ITableCell=} [properties] Properties to set
                             */
                            function TableCell(properties) {
                                if (properties)
                                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * TableCell location.
                             * @member {io.cucumber.messages.ILocation|null|undefined} location
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell
                             * @instance
                             */
                            TableCell.prototype.location = null;

                            /**
                             * TableCell value.
                             * @member {string} value
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell
                             * @instance
                             */
                            TableCell.prototype.value = "";

                            /**
                             * Creates a new TableCell instance using the specified properties.
                             * @function create
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.TableRow.ITableCell=} [properties] Properties to set
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell} TableCell instance
                             */
                            TableCell.create = function create(properties) {
                                return new TableCell(properties);
                            };

                            /**
                             * Encodes the specified TableCell message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell.verify|verify} messages.
                             * @function encode
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.TableRow.ITableCell} message TableCell message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            TableCell.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.location != null && message.hasOwnProperty("location"))
                                    $root.io.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                                if (message.value != null && message.hasOwnProperty("value"))
                                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.value);
                                return writer;
                            };

                            /**
                             * Encodes the specified TableCell message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.TableRow.ITableCell} message TableCell message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            TableCell.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a TableCell message from the specified reader or buffer.
                             * @function decode
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell} TableCell
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            TableCell.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell();
                                while (reader.pos < end) {
                                    var tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.location = $root.io.cucumber.messages.Location.decode(reader, reader.uint32());
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
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell} TableCell
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
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            TableCell.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.location != null && message.hasOwnProperty("location")) {
                                    var error = $root.io.cucumber.messages.Location.verify(message.location);
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
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell} TableCell
                             */
                            TableCell.fromObject = function fromObject(object) {
                                if (object instanceof $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell)
                                    return object;
                                var message = new $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell();
                                if (object.location != null) {
                                    if (typeof object.location !== "object")
                                        throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell.location: object expected");
                                    message.location = $root.io.cucumber.messages.Location.fromObject(object.location);
                                }
                                if (object.value != null)
                                    message.value = String(object.value);
                                return message;
                            };

                            /**
                             * Creates a plain object from a TableCell message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell} message TableCell
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
                                    object.location = $root.io.cucumber.messages.Location.toObject(message.location, options);
                                if (message.value != null && message.hasOwnProperty("value"))
                                    object.value = message.value;
                                return object;
                            };

                            /**
                             * Converts this TableCell to JSON.
                             * @function toJSON
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            TableCell.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return TableCell;
                        })();

                        return TableRow;
                    })();

                    Feature.Step = (function() {

                        /**
                         * Properties of a Step.
                         * @memberof io.cucumber.messages.GherkinDocument.Feature
                         * @interface IStep
                         * @property {io.cucumber.messages.ILocation|null} [location] Step location
                         * @property {string|null} [keyword] Step keyword
                         * @property {string|null} [text] Step text
                         * @property {io.cucumber.messages.GherkinDocument.Feature.Step.IDocString|null} [docString] Step docString
                         * @property {io.cucumber.messages.GherkinDocument.Feature.Step.IDataTable|null} [dataTable] Step dataTable
                         */

                        /**
                         * Constructs a new Step.
                         * @memberof io.cucumber.messages.GherkinDocument.Feature
                         * @classdesc Represents a Step.
                         * @implements IStep
                         * @constructor
                         * @param {io.cucumber.messages.GherkinDocument.Feature.IStep=} [properties] Properties to set
                         */
                        function Step(properties) {
                            if (properties)
                                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * Step location.
                         * @member {io.cucumber.messages.ILocation|null|undefined} location
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Step
                         * @instance
                         */
                        Step.prototype.location = null;

                        /**
                         * Step keyword.
                         * @member {string} keyword
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Step
                         * @instance
                         */
                        Step.prototype.keyword = "";

                        /**
                         * Step text.
                         * @member {string} text
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Step
                         * @instance
                         */
                        Step.prototype.text = "";

                        /**
                         * Step docString.
                         * @member {io.cucumber.messages.GherkinDocument.Feature.Step.IDocString|null|undefined} docString
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Step
                         * @instance
                         */
                        Step.prototype.docString = null;

                        /**
                         * Step dataTable.
                         * @member {io.cucumber.messages.GherkinDocument.Feature.Step.IDataTable|null|undefined} dataTable
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Step
                         * @instance
                         */
                        Step.prototype.dataTable = null;

                        // OneOf field names bound to virtual getters and setters
                        var $oneOfFields;

                        /**
                         * Step argument.
                         * @member {"docString"|"dataTable"|undefined} argument
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Step
                         * @instance
                         */
                        Object.defineProperty(Step.prototype, "argument", {
                            get: $util.oneOfGetter($oneOfFields = ["docString", "dataTable"]),
                            set: $util.oneOfSetter($oneOfFields)
                        });

                        /**
                         * Creates a new Step instance using the specified properties.
                         * @function create
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Step
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.IStep=} [properties] Properties to set
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.Step} Step instance
                         */
                        Step.create = function create(properties) {
                            return new Step(properties);
                        };

                        /**
                         * Encodes the specified Step message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Step.verify|verify} messages.
                         * @function encode
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Step
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.IStep} message Step message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Step.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.location != null && message.hasOwnProperty("location"))
                                $root.io.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                            if (message.keyword != null && message.hasOwnProperty("keyword"))
                                writer.uint32(/* id 2, wireType 2 =*/18).string(message.keyword);
                            if (message.text != null && message.hasOwnProperty("text"))
                                writer.uint32(/* id 3, wireType 2 =*/26).string(message.text);
                            if (message.docString != null && message.hasOwnProperty("docString"))
                                $root.io.cucumber.messages.GherkinDocument.Feature.Step.DocString.encode(message.docString, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                            if (message.dataTable != null && message.hasOwnProperty("dataTable"))
                                $root.io.cucumber.messages.GherkinDocument.Feature.Step.DataTable.encode(message.dataTable, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified Step message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Step.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Step
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.IStep} message Step message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Step.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a Step message from the specified reader or buffer.
                         * @function decode
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Step
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.Step} Step
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        Step.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.GherkinDocument.Feature.Step();
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1:
                                    message.location = $root.io.cucumber.messages.Location.decode(reader, reader.uint32());
                                    break;
                                case 2:
                                    message.keyword = reader.string();
                                    break;
                                case 3:
                                    message.text = reader.string();
                                    break;
                                case 5:
                                    message.docString = $root.io.cucumber.messages.GherkinDocument.Feature.Step.DocString.decode(reader, reader.uint32());
                                    break;
                                case 6:
                                    message.dataTable = $root.io.cucumber.messages.GherkinDocument.Feature.Step.DataTable.decode(reader, reader.uint32());
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
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Step
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.Step} Step
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
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Step
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        Step.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            var properties = {};
                            if (message.location != null && message.hasOwnProperty("location")) {
                                var error = $root.io.cucumber.messages.Location.verify(message.location);
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
                                    var error = $root.io.cucumber.messages.GherkinDocument.Feature.Step.DocString.verify(message.docString);
                                    if (error)
                                        return "docString." + error;
                                }
                            }
                            if (message.dataTable != null && message.hasOwnProperty("dataTable")) {
                                if (properties.argument === 1)
                                    return "argument: multiple values";
                                properties.argument = 1;
                                {
                                    var error = $root.io.cucumber.messages.GherkinDocument.Feature.Step.DataTable.verify(message.dataTable);
                                    if (error)
                                        return "dataTable." + error;
                                }
                            }
                            return null;
                        };

                        /**
                         * Creates a Step message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Step
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {io.cucumber.messages.GherkinDocument.Feature.Step} Step
                         */
                        Step.fromObject = function fromObject(object) {
                            if (object instanceof $root.io.cucumber.messages.GherkinDocument.Feature.Step)
                                return object;
                            var message = new $root.io.cucumber.messages.GherkinDocument.Feature.Step();
                            if (object.location != null) {
                                if (typeof object.location !== "object")
                                    throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Step.location: object expected");
                                message.location = $root.io.cucumber.messages.Location.fromObject(object.location);
                            }
                            if (object.keyword != null)
                                message.keyword = String(object.keyword);
                            if (object.text != null)
                                message.text = String(object.text);
                            if (object.docString != null) {
                                if (typeof object.docString !== "object")
                                    throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Step.docString: object expected");
                                message.docString = $root.io.cucumber.messages.GherkinDocument.Feature.Step.DocString.fromObject(object.docString);
                            }
                            if (object.dataTable != null) {
                                if (typeof object.dataTable !== "object")
                                    throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Step.dataTable: object expected");
                                message.dataTable = $root.io.cucumber.messages.GherkinDocument.Feature.Step.DataTable.fromObject(object.dataTable);
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a Step message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Step
                         * @static
                         * @param {io.cucumber.messages.GherkinDocument.Feature.Step} message Step
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
                                object.location = $root.io.cucumber.messages.Location.toObject(message.location, options);
                            if (message.keyword != null && message.hasOwnProperty("keyword"))
                                object.keyword = message.keyword;
                            if (message.text != null && message.hasOwnProperty("text"))
                                object.text = message.text;
                            if (message.docString != null && message.hasOwnProperty("docString")) {
                                object.docString = $root.io.cucumber.messages.GherkinDocument.Feature.Step.DocString.toObject(message.docString, options);
                                if (options.oneofs)
                                    object.argument = "docString";
                            }
                            if (message.dataTable != null && message.hasOwnProperty("dataTable")) {
                                object.dataTable = $root.io.cucumber.messages.GherkinDocument.Feature.Step.DataTable.toObject(message.dataTable, options);
                                if (options.oneofs)
                                    object.argument = "dataTable";
                            }
                            return object;
                        };

                        /**
                         * Converts this Step to JSON.
                         * @function toJSON
                         * @memberof io.cucumber.messages.GherkinDocument.Feature.Step
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        Step.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        Step.DataTable = (function() {

                            /**
                             * Properties of a DataTable.
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step
                             * @interface IDataTable
                             * @property {io.cucumber.messages.ILocation|null} [location] DataTable location
                             * @property {Array.<io.cucumber.messages.GherkinDocument.Feature.ITableRow>|null} [rows] DataTable rows
                             */

                            /**
                             * Constructs a new DataTable.
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step
                             * @classdesc Represents a DataTable.
                             * @implements IDataTable
                             * @constructor
                             * @param {io.cucumber.messages.GherkinDocument.Feature.Step.IDataTable=} [properties] Properties to set
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
                             * @member {io.cucumber.messages.ILocation|null|undefined} location
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DataTable
                             * @instance
                             */
                            DataTable.prototype.location = null;

                            /**
                             * DataTable rows.
                             * @member {Array.<io.cucumber.messages.GherkinDocument.Feature.ITableRow>} rows
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DataTable
                             * @instance
                             */
                            DataTable.prototype.rows = $util.emptyArray;

                            /**
                             * Creates a new DataTable instance using the specified properties.
                             * @function create
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DataTable
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.Step.IDataTable=} [properties] Properties to set
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.Step.DataTable} DataTable instance
                             */
                            DataTable.create = function create(properties) {
                                return new DataTable(properties);
                            };

                            /**
                             * Encodes the specified DataTable message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Step.DataTable.verify|verify} messages.
                             * @function encode
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DataTable
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.Step.IDataTable} message DataTable message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            DataTable.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.location != null && message.hasOwnProperty("location"))
                                    $root.io.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                                if (message.rows != null && message.rows.length)
                                    for (var i = 0; i < message.rows.length; ++i)
                                        $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.encode(message.rows[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                                return writer;
                            };

                            /**
                             * Encodes the specified DataTable message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Step.DataTable.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DataTable
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.Step.IDataTable} message DataTable message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            DataTable.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a DataTable message from the specified reader or buffer.
                             * @function decode
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DataTable
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.Step.DataTable} DataTable
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            DataTable.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.GherkinDocument.Feature.Step.DataTable();
                                while (reader.pos < end) {
                                    var tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.location = $root.io.cucumber.messages.Location.decode(reader, reader.uint32());
                                        break;
                                    case 2:
                                        if (!(message.rows && message.rows.length))
                                            message.rows = [];
                                        message.rows.push($root.io.cucumber.messages.GherkinDocument.Feature.TableRow.decode(reader, reader.uint32()));
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
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DataTable
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.Step.DataTable} DataTable
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
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DataTable
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            DataTable.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.location != null && message.hasOwnProperty("location")) {
                                    var error = $root.io.cucumber.messages.Location.verify(message.location);
                                    if (error)
                                        return "location." + error;
                                }
                                if (message.rows != null && message.hasOwnProperty("rows")) {
                                    if (!Array.isArray(message.rows))
                                        return "rows: array expected";
                                    for (var i = 0; i < message.rows.length; ++i) {
                                        var error = $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.verify(message.rows[i]);
                                        if (error)
                                            return "rows." + error;
                                    }
                                }
                                return null;
                            };

                            /**
                             * Creates a DataTable message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DataTable
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.Step.DataTable} DataTable
                             */
                            DataTable.fromObject = function fromObject(object) {
                                if (object instanceof $root.io.cucumber.messages.GherkinDocument.Feature.Step.DataTable)
                                    return object;
                                var message = new $root.io.cucumber.messages.GherkinDocument.Feature.Step.DataTable();
                                if (object.location != null) {
                                    if (typeof object.location !== "object")
                                        throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Step.DataTable.location: object expected");
                                    message.location = $root.io.cucumber.messages.Location.fromObject(object.location);
                                }
                                if (object.rows) {
                                    if (!Array.isArray(object.rows))
                                        throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Step.DataTable.rows: array expected");
                                    message.rows = [];
                                    for (var i = 0; i < object.rows.length; ++i) {
                                        if (typeof object.rows[i] !== "object")
                                            throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Step.DataTable.rows: object expected");
                                        message.rows[i] = $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.fromObject(object.rows[i]);
                                    }
                                }
                                return message;
                            };

                            /**
                             * Creates a plain object from a DataTable message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DataTable
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.Step.DataTable} message DataTable
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
                                    object.location = $root.io.cucumber.messages.Location.toObject(message.location, options);
                                if (message.rows && message.rows.length) {
                                    object.rows = [];
                                    for (var j = 0; j < message.rows.length; ++j)
                                        object.rows[j] = $root.io.cucumber.messages.GherkinDocument.Feature.TableRow.toObject(message.rows[j], options);
                                }
                                return object;
                            };

                            /**
                             * Converts this DataTable to JSON.
                             * @function toJSON
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DataTable
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            DataTable.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return DataTable;
                        })();

                        Step.DocString = (function() {

                            /**
                             * Properties of a DocString.
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step
                             * @interface IDocString
                             * @property {io.cucumber.messages.ILocation|null} [location] DocString location
                             * @property {string|null} [contentType] DocString contentType
                             * @property {string|null} [content] DocString content
                             * @property {string|null} [delimiter] DocString delimiter
                             */

                            /**
                             * Constructs a new DocString.
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step
                             * @classdesc Represents a DocString.
                             * @implements IDocString
                             * @constructor
                             * @param {io.cucumber.messages.GherkinDocument.Feature.Step.IDocString=} [properties] Properties to set
                             */
                            function DocString(properties) {
                                if (properties)
                                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * DocString location.
                             * @member {io.cucumber.messages.ILocation|null|undefined} location
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DocString
                             * @instance
                             */
                            DocString.prototype.location = null;

                            /**
                             * DocString contentType.
                             * @member {string} contentType
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DocString
                             * @instance
                             */
                            DocString.prototype.contentType = "";

                            /**
                             * DocString content.
                             * @member {string} content
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DocString
                             * @instance
                             */
                            DocString.prototype.content = "";

                            /**
                             * DocString delimiter.
                             * @member {string} delimiter
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DocString
                             * @instance
                             */
                            DocString.prototype.delimiter = "";

                            /**
                             * Creates a new DocString instance using the specified properties.
                             * @function create
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DocString
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.Step.IDocString=} [properties] Properties to set
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.Step.DocString} DocString instance
                             */
                            DocString.create = function create(properties) {
                                return new DocString(properties);
                            };

                            /**
                             * Encodes the specified DocString message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Step.DocString.verify|verify} messages.
                             * @function encode
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DocString
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.Step.IDocString} message DocString message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            DocString.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.location != null && message.hasOwnProperty("location"))
                                    $root.io.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                                if (message.contentType != null && message.hasOwnProperty("contentType"))
                                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.contentType);
                                if (message.content != null && message.hasOwnProperty("content"))
                                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.content);
                                if (message.delimiter != null && message.hasOwnProperty("delimiter"))
                                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.delimiter);
                                return writer;
                            };

                            /**
                             * Encodes the specified DocString message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Step.DocString.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DocString
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.Step.IDocString} message DocString message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            DocString.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a DocString message from the specified reader or buffer.
                             * @function decode
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DocString
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.Step.DocString} DocString
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            DocString.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.GherkinDocument.Feature.Step.DocString();
                                while (reader.pos < end) {
                                    var tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.location = $root.io.cucumber.messages.Location.decode(reader, reader.uint32());
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
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DocString
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.Step.DocString} DocString
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
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DocString
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            DocString.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.location != null && message.hasOwnProperty("location")) {
                                    var error = $root.io.cucumber.messages.Location.verify(message.location);
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
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DocString
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {io.cucumber.messages.GherkinDocument.Feature.Step.DocString} DocString
                             */
                            DocString.fromObject = function fromObject(object) {
                                if (object instanceof $root.io.cucumber.messages.GherkinDocument.Feature.Step.DocString)
                                    return object;
                                var message = new $root.io.cucumber.messages.GherkinDocument.Feature.Step.DocString();
                                if (object.location != null) {
                                    if (typeof object.location !== "object")
                                        throw TypeError(".io.cucumber.messages.GherkinDocument.Feature.Step.DocString.location: object expected");
                                    message.location = $root.io.cucumber.messages.Location.fromObject(object.location);
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
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DocString
                             * @static
                             * @param {io.cucumber.messages.GherkinDocument.Feature.Step.DocString} message DocString
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
                                    object.location = $root.io.cucumber.messages.Location.toObject(message.location, options);
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
                             * @memberof io.cucumber.messages.GherkinDocument.Feature.Step.DocString
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            DocString.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return DocString;
                        })();

                        return Step;
                    })();

                    return Feature;
                })();

                return GherkinDocument;
            })();

            messages.Attachment = (function() {

                /**
                 * Properties of an Attachment.
                 * @memberof io.cucumber.messages
                 * @interface IAttachment
                 * @property {io.cucumber.messages.ISourceReference|null} [source] Attachment source
                 * @property {string|null} [data] Attachment data
                 * @property {io.cucumber.messages.IMedia|null} [media] Attachment media
                 */

                /**
                 * Constructs a new Attachment.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents an Attachment.
                 * @implements IAttachment
                 * @constructor
                 * @param {io.cucumber.messages.IAttachment=} [properties] Properties to set
                 */
                function Attachment(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Attachment source.
                 * @member {io.cucumber.messages.ISourceReference|null|undefined} source
                 * @memberof io.cucumber.messages.Attachment
                 * @instance
                 */
                Attachment.prototype.source = null;

                /**
                 * Attachment data.
                 * @member {string} data
                 * @memberof io.cucumber.messages.Attachment
                 * @instance
                 */
                Attachment.prototype.data = "";

                /**
                 * Attachment media.
                 * @member {io.cucumber.messages.IMedia|null|undefined} media
                 * @memberof io.cucumber.messages.Attachment
                 * @instance
                 */
                Attachment.prototype.media = null;

                /**
                 * Creates a new Attachment instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.Attachment
                 * @static
                 * @param {io.cucumber.messages.IAttachment=} [properties] Properties to set
                 * @returns {io.cucumber.messages.Attachment} Attachment instance
                 */
                Attachment.create = function create(properties) {
                    return new Attachment(properties);
                };

                /**
                 * Encodes the specified Attachment message. Does not implicitly {@link io.cucumber.messages.Attachment.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.Attachment
                 * @static
                 * @param {io.cucumber.messages.IAttachment} message Attachment message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Attachment.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.source != null && message.hasOwnProperty("source"))
                        $root.io.cucumber.messages.SourceReference.encode(message.source, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.data != null && message.hasOwnProperty("data"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
                    if (message.media != null && message.hasOwnProperty("media"))
                        $root.io.cucumber.messages.Media.encode(message.media, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Attachment message, length delimited. Does not implicitly {@link io.cucumber.messages.Attachment.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.Attachment
                 * @static
                 * @param {io.cucumber.messages.IAttachment} message Attachment message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Attachment.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an Attachment message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.Attachment
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.Attachment} Attachment
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Attachment.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.Attachment();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.source = $root.io.cucumber.messages.SourceReference.decode(reader, reader.uint32());
                            break;
                        case 2:
                            message.data = reader.string();
                            break;
                        case 3:
                            message.media = $root.io.cucumber.messages.Media.decode(reader, reader.uint32());
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
                 * @memberof io.cucumber.messages.Attachment
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.Attachment} Attachment
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
                 * @memberof io.cucumber.messages.Attachment
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Attachment.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.source != null && message.hasOwnProperty("source")) {
                        var error = $root.io.cucumber.messages.SourceReference.verify(message.source);
                        if (error)
                            return "source." + error;
                    }
                    if (message.data != null && message.hasOwnProperty("data"))
                        if (!$util.isString(message.data))
                            return "data: string expected";
                    if (message.media != null && message.hasOwnProperty("media")) {
                        var error = $root.io.cucumber.messages.Media.verify(message.media);
                        if (error)
                            return "media." + error;
                    }
                    return null;
                };

                /**
                 * Creates an Attachment message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.Attachment
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.Attachment} Attachment
                 */
                Attachment.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.Attachment)
                        return object;
                    var message = new $root.io.cucumber.messages.Attachment();
                    if (object.source != null) {
                        if (typeof object.source !== "object")
                            throw TypeError(".io.cucumber.messages.Attachment.source: object expected");
                        message.source = $root.io.cucumber.messages.SourceReference.fromObject(object.source);
                    }
                    if (object.data != null)
                        message.data = String(object.data);
                    if (object.media != null) {
                        if (typeof object.media !== "object")
                            throw TypeError(".io.cucumber.messages.Attachment.media: object expected");
                        message.media = $root.io.cucumber.messages.Media.fromObject(object.media);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an Attachment message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.Attachment
                 * @static
                 * @param {io.cucumber.messages.Attachment} message Attachment
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
                        object.source = $root.io.cucumber.messages.SourceReference.toObject(message.source, options);
                    if (message.data != null && message.hasOwnProperty("data"))
                        object.data = message.data;
                    if (message.media != null && message.hasOwnProperty("media"))
                        object.media = $root.io.cucumber.messages.Media.toObject(message.media, options);
                    return object;
                };

                /**
                 * Converts this Attachment to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.Attachment
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Attachment.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Attachment;
            })();

            messages.Pickle = (function() {

                /**
                 * Properties of a Pickle.
                 * @memberof io.cucumber.messages
                 * @interface IPickle
                 * @property {string|null} [id] Pickle id
                 * @property {string|null} [uri] Pickle uri
                 * @property {string|null} [name] Pickle name
                 * @property {string|null} [language] Pickle language
                 * @property {Array.<io.cucumber.messages.Pickle.IPickleStep>|null} [steps] Pickle steps
                 * @property {Array.<io.cucumber.messages.Pickle.IPickleTag>|null} [tags] Pickle tags
                 * @property {Array.<io.cucumber.messages.ILocation>|null} [locations] Pickle locations
                 */

                /**
                 * Constructs a new Pickle.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a Pickle.
                 * @implements IPickle
                 * @constructor
                 * @param {io.cucumber.messages.IPickle=} [properties] Properties to set
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
                 * Pickle id.
                 * @member {string} id
                 * @memberof io.cucumber.messages.Pickle
                 * @instance
                 */
                Pickle.prototype.id = "";

                /**
                 * Pickle uri.
                 * @member {string} uri
                 * @memberof io.cucumber.messages.Pickle
                 * @instance
                 */
                Pickle.prototype.uri = "";

                /**
                 * Pickle name.
                 * @member {string} name
                 * @memberof io.cucumber.messages.Pickle
                 * @instance
                 */
                Pickle.prototype.name = "";

                /**
                 * Pickle language.
                 * @member {string} language
                 * @memberof io.cucumber.messages.Pickle
                 * @instance
                 */
                Pickle.prototype.language = "";

                /**
                 * Pickle steps.
                 * @member {Array.<io.cucumber.messages.Pickle.IPickleStep>} steps
                 * @memberof io.cucumber.messages.Pickle
                 * @instance
                 */
                Pickle.prototype.steps = $util.emptyArray;

                /**
                 * Pickle tags.
                 * @member {Array.<io.cucumber.messages.Pickle.IPickleTag>} tags
                 * @memberof io.cucumber.messages.Pickle
                 * @instance
                 */
                Pickle.prototype.tags = $util.emptyArray;

                /**
                 * Pickle locations.
                 * @member {Array.<io.cucumber.messages.ILocation>} locations
                 * @memberof io.cucumber.messages.Pickle
                 * @instance
                 */
                Pickle.prototype.locations = $util.emptyArray;

                /**
                 * Creates a new Pickle instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.Pickle
                 * @static
                 * @param {io.cucumber.messages.IPickle=} [properties] Properties to set
                 * @returns {io.cucumber.messages.Pickle} Pickle instance
                 */
                Pickle.create = function create(properties) {
                    return new Pickle(properties);
                };

                /**
                 * Encodes the specified Pickle message. Does not implicitly {@link io.cucumber.messages.Pickle.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.Pickle
                 * @static
                 * @param {io.cucumber.messages.IPickle} message Pickle message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Pickle.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && message.hasOwnProperty("id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.uri != null && message.hasOwnProperty("uri"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.uri);
                    if (message.name != null && message.hasOwnProperty("name"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                    if (message.language != null && message.hasOwnProperty("language"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.language);
                    if (message.steps != null && message.steps.length)
                        for (var i = 0; i < message.steps.length; ++i)
                            $root.io.cucumber.messages.Pickle.PickleStep.encode(message.steps[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    if (message.tags != null && message.tags.length)
                        for (var i = 0; i < message.tags.length; ++i)
                            $root.io.cucumber.messages.Pickle.PickleTag.encode(message.tags[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    if (message.locations != null && message.locations.length)
                        for (var i = 0; i < message.locations.length; ++i)
                            $root.io.cucumber.messages.Location.encode(message.locations[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Pickle message, length delimited. Does not implicitly {@link io.cucumber.messages.Pickle.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.Pickle
                 * @static
                 * @param {io.cucumber.messages.IPickle} message Pickle message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Pickle.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Pickle message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.Pickle
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.Pickle} Pickle
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Pickle.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.Pickle();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.id = reader.string();
                            break;
                        case 2:
                            message.uri = reader.string();
                            break;
                        case 3:
                            message.name = reader.string();
                            break;
                        case 4:
                            message.language = reader.string();
                            break;
                        case 5:
                            if (!(message.steps && message.steps.length))
                                message.steps = [];
                            message.steps.push($root.io.cucumber.messages.Pickle.PickleStep.decode(reader, reader.uint32()));
                            break;
                        case 6:
                            if (!(message.tags && message.tags.length))
                                message.tags = [];
                            message.tags.push($root.io.cucumber.messages.Pickle.PickleTag.decode(reader, reader.uint32()));
                            break;
                        case 7:
                            if (!(message.locations && message.locations.length))
                                message.locations = [];
                            message.locations.push($root.io.cucumber.messages.Location.decode(reader, reader.uint32()));
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
                 * @memberof io.cucumber.messages.Pickle
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.Pickle} Pickle
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
                 * @memberof io.cucumber.messages.Pickle
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Pickle.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
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
                            var error = $root.io.cucumber.messages.Pickle.PickleStep.verify(message.steps[i]);
                            if (error)
                                return "steps." + error;
                        }
                    }
                    if (message.tags != null && message.hasOwnProperty("tags")) {
                        if (!Array.isArray(message.tags))
                            return "tags: array expected";
                        for (var i = 0; i < message.tags.length; ++i) {
                            var error = $root.io.cucumber.messages.Pickle.PickleTag.verify(message.tags[i]);
                            if (error)
                                return "tags." + error;
                        }
                    }
                    if (message.locations != null && message.hasOwnProperty("locations")) {
                        if (!Array.isArray(message.locations))
                            return "locations: array expected";
                        for (var i = 0; i < message.locations.length; ++i) {
                            var error = $root.io.cucumber.messages.Location.verify(message.locations[i]);
                            if (error)
                                return "locations." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a Pickle message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.Pickle
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.Pickle} Pickle
                 */
                Pickle.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.Pickle)
                        return object;
                    var message = new $root.io.cucumber.messages.Pickle();
                    if (object.id != null)
                        message.id = String(object.id);
                    if (object.uri != null)
                        message.uri = String(object.uri);
                    if (object.name != null)
                        message.name = String(object.name);
                    if (object.language != null)
                        message.language = String(object.language);
                    if (object.steps) {
                        if (!Array.isArray(object.steps))
                            throw TypeError(".io.cucumber.messages.Pickle.steps: array expected");
                        message.steps = [];
                        for (var i = 0; i < object.steps.length; ++i) {
                            if (typeof object.steps[i] !== "object")
                                throw TypeError(".io.cucumber.messages.Pickle.steps: object expected");
                            message.steps[i] = $root.io.cucumber.messages.Pickle.PickleStep.fromObject(object.steps[i]);
                        }
                    }
                    if (object.tags) {
                        if (!Array.isArray(object.tags))
                            throw TypeError(".io.cucumber.messages.Pickle.tags: array expected");
                        message.tags = [];
                        for (var i = 0; i < object.tags.length; ++i) {
                            if (typeof object.tags[i] !== "object")
                                throw TypeError(".io.cucumber.messages.Pickle.tags: object expected");
                            message.tags[i] = $root.io.cucumber.messages.Pickle.PickleTag.fromObject(object.tags[i]);
                        }
                    }
                    if (object.locations) {
                        if (!Array.isArray(object.locations))
                            throw TypeError(".io.cucumber.messages.Pickle.locations: array expected");
                        message.locations = [];
                        for (var i = 0; i < object.locations.length; ++i) {
                            if (typeof object.locations[i] !== "object")
                                throw TypeError(".io.cucumber.messages.Pickle.locations: object expected");
                            message.locations[i] = $root.io.cucumber.messages.Location.fromObject(object.locations[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Pickle message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.Pickle
                 * @static
                 * @param {io.cucumber.messages.Pickle} message Pickle
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
                        object.id = "";
                        object.uri = "";
                        object.name = "";
                        object.language = "";
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.uri != null && message.hasOwnProperty("uri"))
                        object.uri = message.uri;
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    if (message.language != null && message.hasOwnProperty("language"))
                        object.language = message.language;
                    if (message.steps && message.steps.length) {
                        object.steps = [];
                        for (var j = 0; j < message.steps.length; ++j)
                            object.steps[j] = $root.io.cucumber.messages.Pickle.PickleStep.toObject(message.steps[j], options);
                    }
                    if (message.tags && message.tags.length) {
                        object.tags = [];
                        for (var j = 0; j < message.tags.length; ++j)
                            object.tags[j] = $root.io.cucumber.messages.Pickle.PickleTag.toObject(message.tags[j], options);
                    }
                    if (message.locations && message.locations.length) {
                        object.locations = [];
                        for (var j = 0; j < message.locations.length; ++j)
                            object.locations[j] = $root.io.cucumber.messages.Location.toObject(message.locations[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this Pickle to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.Pickle
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Pickle.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                Pickle.PickleTag = (function() {

                    /**
                     * Properties of a PickleTag.
                     * @memberof io.cucumber.messages.Pickle
                     * @interface IPickleTag
                     * @property {io.cucumber.messages.ILocation|null} [location] PickleTag location
                     * @property {string|null} [name] PickleTag name
                     */

                    /**
                     * Constructs a new PickleTag.
                     * @memberof io.cucumber.messages.Pickle
                     * @classdesc Represents a PickleTag.
                     * @implements IPickleTag
                     * @constructor
                     * @param {io.cucumber.messages.Pickle.IPickleTag=} [properties] Properties to set
                     */
                    function PickleTag(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * PickleTag location.
                     * @member {io.cucumber.messages.ILocation|null|undefined} location
                     * @memberof io.cucumber.messages.Pickle.PickleTag
                     * @instance
                     */
                    PickleTag.prototype.location = null;

                    /**
                     * PickleTag name.
                     * @member {string} name
                     * @memberof io.cucumber.messages.Pickle.PickleTag
                     * @instance
                     */
                    PickleTag.prototype.name = "";

                    /**
                     * Creates a new PickleTag instance using the specified properties.
                     * @function create
                     * @memberof io.cucumber.messages.Pickle.PickleTag
                     * @static
                     * @param {io.cucumber.messages.Pickle.IPickleTag=} [properties] Properties to set
                     * @returns {io.cucumber.messages.Pickle.PickleTag} PickleTag instance
                     */
                    PickleTag.create = function create(properties) {
                        return new PickleTag(properties);
                    };

                    /**
                     * Encodes the specified PickleTag message. Does not implicitly {@link io.cucumber.messages.Pickle.PickleTag.verify|verify} messages.
                     * @function encode
                     * @memberof io.cucumber.messages.Pickle.PickleTag
                     * @static
                     * @param {io.cucumber.messages.Pickle.IPickleTag} message PickleTag message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    PickleTag.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.location != null && message.hasOwnProperty("location"))
                            $root.io.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.name != null && message.hasOwnProperty("name"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                        return writer;
                    };

                    /**
                     * Encodes the specified PickleTag message, length delimited. Does not implicitly {@link io.cucumber.messages.Pickle.PickleTag.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof io.cucumber.messages.Pickle.PickleTag
                     * @static
                     * @param {io.cucumber.messages.Pickle.IPickleTag} message PickleTag message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    PickleTag.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a PickleTag message from the specified reader or buffer.
                     * @function decode
                     * @memberof io.cucumber.messages.Pickle.PickleTag
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {io.cucumber.messages.Pickle.PickleTag} PickleTag
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    PickleTag.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.Pickle.PickleTag();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.location = $root.io.cucumber.messages.Location.decode(reader, reader.uint32());
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
                     * @memberof io.cucumber.messages.Pickle.PickleTag
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {io.cucumber.messages.Pickle.PickleTag} PickleTag
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
                     * @memberof io.cucumber.messages.Pickle.PickleTag
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    PickleTag.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.location != null && message.hasOwnProperty("location")) {
                            var error = $root.io.cucumber.messages.Location.verify(message.location);
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
                     * @memberof io.cucumber.messages.Pickle.PickleTag
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {io.cucumber.messages.Pickle.PickleTag} PickleTag
                     */
                    PickleTag.fromObject = function fromObject(object) {
                        if (object instanceof $root.io.cucumber.messages.Pickle.PickleTag)
                            return object;
                        var message = new $root.io.cucumber.messages.Pickle.PickleTag();
                        if (object.location != null) {
                            if (typeof object.location !== "object")
                                throw TypeError(".io.cucumber.messages.Pickle.PickleTag.location: object expected");
                            message.location = $root.io.cucumber.messages.Location.fromObject(object.location);
                        }
                        if (object.name != null)
                            message.name = String(object.name);
                        return message;
                    };

                    /**
                     * Creates a plain object from a PickleTag message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof io.cucumber.messages.Pickle.PickleTag
                     * @static
                     * @param {io.cucumber.messages.Pickle.PickleTag} message PickleTag
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
                            object.location = $root.io.cucumber.messages.Location.toObject(message.location, options);
                        if (message.name != null && message.hasOwnProperty("name"))
                            object.name = message.name;
                        return object;
                    };

                    /**
                     * Converts this PickleTag to JSON.
                     * @function toJSON
                     * @memberof io.cucumber.messages.Pickle.PickleTag
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    PickleTag.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return PickleTag;
                })();

                Pickle.PickleStep = (function() {

                    /**
                     * Properties of a PickleStep.
                     * @memberof io.cucumber.messages.Pickle
                     * @interface IPickleStep
                     * @property {string|null} [text] PickleStep text
                     * @property {Array.<io.cucumber.messages.ILocation>|null} [locations] PickleStep locations
                     * @property {io.cucumber.messages.IPickleStepArgument|null} [argument] PickleStep argument
                     */

                    /**
                     * Constructs a new PickleStep.
                     * @memberof io.cucumber.messages.Pickle
                     * @classdesc Represents a PickleStep.
                     * @implements IPickleStep
                     * @constructor
                     * @param {io.cucumber.messages.Pickle.IPickleStep=} [properties] Properties to set
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
                     * @memberof io.cucumber.messages.Pickle.PickleStep
                     * @instance
                     */
                    PickleStep.prototype.text = "";

                    /**
                     * PickleStep locations.
                     * @member {Array.<io.cucumber.messages.ILocation>} locations
                     * @memberof io.cucumber.messages.Pickle.PickleStep
                     * @instance
                     */
                    PickleStep.prototype.locations = $util.emptyArray;

                    /**
                     * PickleStep argument.
                     * @member {io.cucumber.messages.IPickleStepArgument|null|undefined} argument
                     * @memberof io.cucumber.messages.Pickle.PickleStep
                     * @instance
                     */
                    PickleStep.prototype.argument = null;

                    /**
                     * Creates a new PickleStep instance using the specified properties.
                     * @function create
                     * @memberof io.cucumber.messages.Pickle.PickleStep
                     * @static
                     * @param {io.cucumber.messages.Pickle.IPickleStep=} [properties] Properties to set
                     * @returns {io.cucumber.messages.Pickle.PickleStep} PickleStep instance
                     */
                    PickleStep.create = function create(properties) {
                        return new PickleStep(properties);
                    };

                    /**
                     * Encodes the specified PickleStep message. Does not implicitly {@link io.cucumber.messages.Pickle.PickleStep.verify|verify} messages.
                     * @function encode
                     * @memberof io.cucumber.messages.Pickle.PickleStep
                     * @static
                     * @param {io.cucumber.messages.Pickle.IPickleStep} message PickleStep message or plain object to encode
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
                                $root.io.cucumber.messages.Location.encode(message.locations[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.argument != null && message.hasOwnProperty("argument"))
                            $root.io.cucumber.messages.PickleStepArgument.encode(message.argument, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified PickleStep message, length delimited. Does not implicitly {@link io.cucumber.messages.Pickle.PickleStep.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof io.cucumber.messages.Pickle.PickleStep
                     * @static
                     * @param {io.cucumber.messages.Pickle.IPickleStep} message PickleStep message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    PickleStep.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a PickleStep message from the specified reader or buffer.
                     * @function decode
                     * @memberof io.cucumber.messages.Pickle.PickleStep
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {io.cucumber.messages.Pickle.PickleStep} PickleStep
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    PickleStep.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.Pickle.PickleStep();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.text = reader.string();
                                break;
                            case 2:
                                if (!(message.locations && message.locations.length))
                                    message.locations = [];
                                message.locations.push($root.io.cucumber.messages.Location.decode(reader, reader.uint32()));
                                break;
                            case 5:
                                message.argument = $root.io.cucumber.messages.PickleStepArgument.decode(reader, reader.uint32());
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
                     * @memberof io.cucumber.messages.Pickle.PickleStep
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {io.cucumber.messages.Pickle.PickleStep} PickleStep
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
                     * @memberof io.cucumber.messages.Pickle.PickleStep
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    PickleStep.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.text != null && message.hasOwnProperty("text"))
                            if (!$util.isString(message.text))
                                return "text: string expected";
                        if (message.locations != null && message.hasOwnProperty("locations")) {
                            if (!Array.isArray(message.locations))
                                return "locations: array expected";
                            for (var i = 0; i < message.locations.length; ++i) {
                                var error = $root.io.cucumber.messages.Location.verify(message.locations[i]);
                                if (error)
                                    return "locations." + error;
                            }
                        }
                        if (message.argument != null && message.hasOwnProperty("argument")) {
                            var error = $root.io.cucumber.messages.PickleStepArgument.verify(message.argument);
                            if (error)
                                return "argument." + error;
                        }
                        return null;
                    };

                    /**
                     * Creates a PickleStep message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof io.cucumber.messages.Pickle.PickleStep
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {io.cucumber.messages.Pickle.PickleStep} PickleStep
                     */
                    PickleStep.fromObject = function fromObject(object) {
                        if (object instanceof $root.io.cucumber.messages.Pickle.PickleStep)
                            return object;
                        var message = new $root.io.cucumber.messages.Pickle.PickleStep();
                        if (object.text != null)
                            message.text = String(object.text);
                        if (object.locations) {
                            if (!Array.isArray(object.locations))
                                throw TypeError(".io.cucumber.messages.Pickle.PickleStep.locations: array expected");
                            message.locations = [];
                            for (var i = 0; i < object.locations.length; ++i) {
                                if (typeof object.locations[i] !== "object")
                                    throw TypeError(".io.cucumber.messages.Pickle.PickleStep.locations: object expected");
                                message.locations[i] = $root.io.cucumber.messages.Location.fromObject(object.locations[i]);
                            }
                        }
                        if (object.argument != null) {
                            if (typeof object.argument !== "object")
                                throw TypeError(".io.cucumber.messages.Pickle.PickleStep.argument: object expected");
                            message.argument = $root.io.cucumber.messages.PickleStepArgument.fromObject(object.argument);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a PickleStep message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof io.cucumber.messages.Pickle.PickleStep
                     * @static
                     * @param {io.cucumber.messages.Pickle.PickleStep} message PickleStep
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    PickleStep.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.locations = [];
                        if (options.defaults) {
                            object.text = "";
                            object.argument = null;
                        }
                        if (message.text != null && message.hasOwnProperty("text"))
                            object.text = message.text;
                        if (message.locations && message.locations.length) {
                            object.locations = [];
                            for (var j = 0; j < message.locations.length; ++j)
                                object.locations[j] = $root.io.cucumber.messages.Location.toObject(message.locations[j], options);
                        }
                        if (message.argument != null && message.hasOwnProperty("argument"))
                            object.argument = $root.io.cucumber.messages.PickleStepArgument.toObject(message.argument, options);
                        return object;
                    };

                    /**
                     * Converts this PickleStep to JSON.
                     * @function toJSON
                     * @memberof io.cucumber.messages.Pickle.PickleStep
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    PickleStep.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return PickleStep;
                })();

                return Pickle;
            })();

            messages.PickleStepArgument = (function() {

                /**
                 * Properties of a PickleStepArgument.
                 * @memberof io.cucumber.messages
                 * @interface IPickleStepArgument
                 * @property {io.cucumber.messages.PickleStepArgument.IPickleDocString|null} [docString] PickleStepArgument docString
                 * @property {io.cucumber.messages.PickleStepArgument.IPickleTable|null} [dataTable] PickleStepArgument dataTable
                 */

                /**
                 * Constructs a new PickleStepArgument.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a PickleStepArgument.
                 * @implements IPickleStepArgument
                 * @constructor
                 * @param {io.cucumber.messages.IPickleStepArgument=} [properties] Properties to set
                 */
                function PickleStepArgument(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * PickleStepArgument docString.
                 * @member {io.cucumber.messages.PickleStepArgument.IPickleDocString|null|undefined} docString
                 * @memberof io.cucumber.messages.PickleStepArgument
                 * @instance
                 */
                PickleStepArgument.prototype.docString = null;

                /**
                 * PickleStepArgument dataTable.
                 * @member {io.cucumber.messages.PickleStepArgument.IPickleTable|null|undefined} dataTable
                 * @memberof io.cucumber.messages.PickleStepArgument
                 * @instance
                 */
                PickleStepArgument.prototype.dataTable = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * PickleStepArgument message.
                 * @member {"docString"|"dataTable"|undefined} message
                 * @memberof io.cucumber.messages.PickleStepArgument
                 * @instance
                 */
                Object.defineProperty(PickleStepArgument.prototype, "message", {
                    get: $util.oneOfGetter($oneOfFields = ["docString", "dataTable"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new PickleStepArgument instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.PickleStepArgument
                 * @static
                 * @param {io.cucumber.messages.IPickleStepArgument=} [properties] Properties to set
                 * @returns {io.cucumber.messages.PickleStepArgument} PickleStepArgument instance
                 */
                PickleStepArgument.create = function create(properties) {
                    return new PickleStepArgument(properties);
                };

                /**
                 * Encodes the specified PickleStepArgument message. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.PickleStepArgument
                 * @static
                 * @param {io.cucumber.messages.IPickleStepArgument} message PickleStepArgument message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PickleStepArgument.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.docString != null && message.hasOwnProperty("docString"))
                        $root.io.cucumber.messages.PickleStepArgument.PickleDocString.encode(message.docString, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.dataTable != null && message.hasOwnProperty("dataTable"))
                        $root.io.cucumber.messages.PickleStepArgument.PickleTable.encode(message.dataTable, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified PickleStepArgument message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.PickleStepArgument
                 * @static
                 * @param {io.cucumber.messages.IPickleStepArgument} message PickleStepArgument message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PickleStepArgument.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a PickleStepArgument message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.PickleStepArgument
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.PickleStepArgument} PickleStepArgument
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PickleStepArgument.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.PickleStepArgument();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.docString = $root.io.cucumber.messages.PickleStepArgument.PickleDocString.decode(reader, reader.uint32());
                            break;
                        case 2:
                            message.dataTable = $root.io.cucumber.messages.PickleStepArgument.PickleTable.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a PickleStepArgument message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.PickleStepArgument
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.PickleStepArgument} PickleStepArgument
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PickleStepArgument.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a PickleStepArgument message.
                 * @function verify
                 * @memberof io.cucumber.messages.PickleStepArgument
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                PickleStepArgument.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.docString != null && message.hasOwnProperty("docString")) {
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.PickleStepArgument.PickleDocString.verify(message.docString);
                            if (error)
                                return "docString." + error;
                        }
                    }
                    if (message.dataTable != null && message.hasOwnProperty("dataTable")) {
                        if (properties.message === 1)
                            return "message: multiple values";
                        properties.message = 1;
                        {
                            var error = $root.io.cucumber.messages.PickleStepArgument.PickleTable.verify(message.dataTable);
                            if (error)
                                return "dataTable." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a PickleStepArgument message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.PickleStepArgument
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.PickleStepArgument} PickleStepArgument
                 */
                PickleStepArgument.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.PickleStepArgument)
                        return object;
                    var message = new $root.io.cucumber.messages.PickleStepArgument();
                    if (object.docString != null) {
                        if (typeof object.docString !== "object")
                            throw TypeError(".io.cucumber.messages.PickleStepArgument.docString: object expected");
                        message.docString = $root.io.cucumber.messages.PickleStepArgument.PickleDocString.fromObject(object.docString);
                    }
                    if (object.dataTable != null) {
                        if (typeof object.dataTable !== "object")
                            throw TypeError(".io.cucumber.messages.PickleStepArgument.dataTable: object expected");
                        message.dataTable = $root.io.cucumber.messages.PickleStepArgument.PickleTable.fromObject(object.dataTable);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a PickleStepArgument message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.PickleStepArgument
                 * @static
                 * @param {io.cucumber.messages.PickleStepArgument} message PickleStepArgument
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                PickleStepArgument.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (message.docString != null && message.hasOwnProperty("docString")) {
                        object.docString = $root.io.cucumber.messages.PickleStepArgument.PickleDocString.toObject(message.docString, options);
                        if (options.oneofs)
                            object.message = "docString";
                    }
                    if (message.dataTable != null && message.hasOwnProperty("dataTable")) {
                        object.dataTable = $root.io.cucumber.messages.PickleStepArgument.PickleTable.toObject(message.dataTable, options);
                        if (options.oneofs)
                            object.message = "dataTable";
                    }
                    return object;
                };

                /**
                 * Converts this PickleStepArgument to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.PickleStepArgument
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                PickleStepArgument.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                PickleStepArgument.PickleDocString = (function() {

                    /**
                     * Properties of a PickleDocString.
                     * @memberof io.cucumber.messages.PickleStepArgument
                     * @interface IPickleDocString
                     * @property {io.cucumber.messages.ILocation|null} [location] PickleDocString location
                     * @property {string|null} [contentType] PickleDocString contentType
                     * @property {string|null} [content] PickleDocString content
                     */

                    /**
                     * Constructs a new PickleDocString.
                     * @memberof io.cucumber.messages.PickleStepArgument
                     * @classdesc Represents a PickleDocString.
                     * @implements IPickleDocString
                     * @constructor
                     * @param {io.cucumber.messages.PickleStepArgument.IPickleDocString=} [properties] Properties to set
                     */
                    function PickleDocString(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * PickleDocString location.
                     * @member {io.cucumber.messages.ILocation|null|undefined} location
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleDocString
                     * @instance
                     */
                    PickleDocString.prototype.location = null;

                    /**
                     * PickleDocString contentType.
                     * @member {string} contentType
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleDocString
                     * @instance
                     */
                    PickleDocString.prototype.contentType = "";

                    /**
                     * PickleDocString content.
                     * @member {string} content
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleDocString
                     * @instance
                     */
                    PickleDocString.prototype.content = "";

                    /**
                     * Creates a new PickleDocString instance using the specified properties.
                     * @function create
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleDocString
                     * @static
                     * @param {io.cucumber.messages.PickleStepArgument.IPickleDocString=} [properties] Properties to set
                     * @returns {io.cucumber.messages.PickleStepArgument.PickleDocString} PickleDocString instance
                     */
                    PickleDocString.create = function create(properties) {
                        return new PickleDocString(properties);
                    };

                    /**
                     * Encodes the specified PickleDocString message. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.PickleDocString.verify|verify} messages.
                     * @function encode
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleDocString
                     * @static
                     * @param {io.cucumber.messages.PickleStepArgument.IPickleDocString} message PickleDocString message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    PickleDocString.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.location != null && message.hasOwnProperty("location"))
                            $root.io.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.contentType != null && message.hasOwnProperty("contentType"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.contentType);
                        if (message.content != null && message.hasOwnProperty("content"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.content);
                        return writer;
                    };

                    /**
                     * Encodes the specified PickleDocString message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.PickleDocString.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleDocString
                     * @static
                     * @param {io.cucumber.messages.PickleStepArgument.IPickleDocString} message PickleDocString message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    PickleDocString.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a PickleDocString message from the specified reader or buffer.
                     * @function decode
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleDocString
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {io.cucumber.messages.PickleStepArgument.PickleDocString} PickleDocString
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    PickleDocString.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.PickleStepArgument.PickleDocString();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.location = $root.io.cucumber.messages.Location.decode(reader, reader.uint32());
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
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleDocString
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {io.cucumber.messages.PickleStepArgument.PickleDocString} PickleDocString
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
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleDocString
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    PickleDocString.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.location != null && message.hasOwnProperty("location")) {
                            var error = $root.io.cucumber.messages.Location.verify(message.location);
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
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleDocString
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {io.cucumber.messages.PickleStepArgument.PickleDocString} PickleDocString
                     */
                    PickleDocString.fromObject = function fromObject(object) {
                        if (object instanceof $root.io.cucumber.messages.PickleStepArgument.PickleDocString)
                            return object;
                        var message = new $root.io.cucumber.messages.PickleStepArgument.PickleDocString();
                        if (object.location != null) {
                            if (typeof object.location !== "object")
                                throw TypeError(".io.cucumber.messages.PickleStepArgument.PickleDocString.location: object expected");
                            message.location = $root.io.cucumber.messages.Location.fromObject(object.location);
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
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleDocString
                     * @static
                     * @param {io.cucumber.messages.PickleStepArgument.PickleDocString} message PickleDocString
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
                            object.location = $root.io.cucumber.messages.Location.toObject(message.location, options);
                        if (message.contentType != null && message.hasOwnProperty("contentType"))
                            object.contentType = message.contentType;
                        if (message.content != null && message.hasOwnProperty("content"))
                            object.content = message.content;
                        return object;
                    };

                    /**
                     * Converts this PickleDocString to JSON.
                     * @function toJSON
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleDocString
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    PickleDocString.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return PickleDocString;
                })();

                PickleStepArgument.PickleTable = (function() {

                    /**
                     * Properties of a PickleTable.
                     * @memberof io.cucumber.messages.PickleStepArgument
                     * @interface IPickleTable
                     * @property {Array.<io.cucumber.messages.PickleStepArgument.PickleTable.IPickleTableRow>|null} [rows] PickleTable rows
                     */

                    /**
                     * Constructs a new PickleTable.
                     * @memberof io.cucumber.messages.PickleStepArgument
                     * @classdesc Represents a PickleTable.
                     * @implements IPickleTable
                     * @constructor
                     * @param {io.cucumber.messages.PickleStepArgument.IPickleTable=} [properties] Properties to set
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
                     * @member {Array.<io.cucumber.messages.PickleStepArgument.PickleTable.IPickleTableRow>} rows
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleTable
                     * @instance
                     */
                    PickleTable.prototype.rows = $util.emptyArray;

                    /**
                     * Creates a new PickleTable instance using the specified properties.
                     * @function create
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleTable
                     * @static
                     * @param {io.cucumber.messages.PickleStepArgument.IPickleTable=} [properties] Properties to set
                     * @returns {io.cucumber.messages.PickleStepArgument.PickleTable} PickleTable instance
                     */
                    PickleTable.create = function create(properties) {
                        return new PickleTable(properties);
                    };

                    /**
                     * Encodes the specified PickleTable message. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.PickleTable.verify|verify} messages.
                     * @function encode
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleTable
                     * @static
                     * @param {io.cucumber.messages.PickleStepArgument.IPickleTable} message PickleTable message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    PickleTable.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.rows != null && message.rows.length)
                            for (var i = 0; i < message.rows.length; ++i)
                                $root.io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.encode(message.rows[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified PickleTable message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.PickleTable.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleTable
                     * @static
                     * @param {io.cucumber.messages.PickleStepArgument.IPickleTable} message PickleTable message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    PickleTable.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a PickleTable message from the specified reader or buffer.
                     * @function decode
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleTable
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {io.cucumber.messages.PickleStepArgument.PickleTable} PickleTable
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    PickleTable.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.PickleStepArgument.PickleTable();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                if (!(message.rows && message.rows.length))
                                    message.rows = [];
                                message.rows.push($root.io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.decode(reader, reader.uint32()));
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
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleTable
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {io.cucumber.messages.PickleStepArgument.PickleTable} PickleTable
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
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleTable
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
                                var error = $root.io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.verify(message.rows[i]);
                                if (error)
                                    return "rows." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a PickleTable message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleTable
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {io.cucumber.messages.PickleStepArgument.PickleTable} PickleTable
                     */
                    PickleTable.fromObject = function fromObject(object) {
                        if (object instanceof $root.io.cucumber.messages.PickleStepArgument.PickleTable)
                            return object;
                        var message = new $root.io.cucumber.messages.PickleStepArgument.PickleTable();
                        if (object.rows) {
                            if (!Array.isArray(object.rows))
                                throw TypeError(".io.cucumber.messages.PickleStepArgument.PickleTable.rows: array expected");
                            message.rows = [];
                            for (var i = 0; i < object.rows.length; ++i) {
                                if (typeof object.rows[i] !== "object")
                                    throw TypeError(".io.cucumber.messages.PickleStepArgument.PickleTable.rows: object expected");
                                message.rows[i] = $root.io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.fromObject(object.rows[i]);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a PickleTable message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleTable
                     * @static
                     * @param {io.cucumber.messages.PickleStepArgument.PickleTable} message PickleTable
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
                                object.rows[j] = $root.io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.toObject(message.rows[j], options);
                        }
                        return object;
                    };

                    /**
                     * Converts this PickleTable to JSON.
                     * @function toJSON
                     * @memberof io.cucumber.messages.PickleStepArgument.PickleTable
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    PickleTable.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    PickleTable.PickleTableRow = (function() {

                        /**
                         * Properties of a PickleTableRow.
                         * @memberof io.cucumber.messages.PickleStepArgument.PickleTable
                         * @interface IPickleTableRow
                         * @property {Array.<io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.IPickleTableCell>|null} [cells] PickleTableRow cells
                         */

                        /**
                         * Constructs a new PickleTableRow.
                         * @memberof io.cucumber.messages.PickleStepArgument.PickleTable
                         * @classdesc Represents a PickleTableRow.
                         * @implements IPickleTableRow
                         * @constructor
                         * @param {io.cucumber.messages.PickleStepArgument.PickleTable.IPickleTableRow=} [properties] Properties to set
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
                         * @member {Array.<io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.IPickleTableCell>} cells
                         * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow
                         * @instance
                         */
                        PickleTableRow.prototype.cells = $util.emptyArray;

                        /**
                         * Creates a new PickleTableRow instance using the specified properties.
                         * @function create
                         * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow
                         * @static
                         * @param {io.cucumber.messages.PickleStepArgument.PickleTable.IPickleTableRow=} [properties] Properties to set
                         * @returns {io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow} PickleTableRow instance
                         */
                        PickleTableRow.create = function create(properties) {
                            return new PickleTableRow(properties);
                        };

                        /**
                         * Encodes the specified PickleTableRow message. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.verify|verify} messages.
                         * @function encode
                         * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow
                         * @static
                         * @param {io.cucumber.messages.PickleStepArgument.PickleTable.IPickleTableRow} message PickleTableRow message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        PickleTableRow.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.cells != null && message.cells.length)
                                for (var i = 0; i < message.cells.length; ++i)
                                    $root.io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell.encode(message.cells[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified PickleTableRow message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow
                         * @static
                         * @param {io.cucumber.messages.PickleStepArgument.PickleTable.IPickleTableRow} message PickleTableRow message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        PickleTableRow.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a PickleTableRow message from the specified reader or buffer.
                         * @function decode
                         * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow} PickleTableRow
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        PickleTableRow.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow();
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1:
                                    if (!(message.cells && message.cells.length))
                                        message.cells = [];
                                    message.cells.push($root.io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell.decode(reader, reader.uint32()));
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
                         * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow} PickleTableRow
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
                         * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow
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
                                    var error = $root.io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell.verify(message.cells[i]);
                                    if (error)
                                        return "cells." + error;
                                }
                            }
                            return null;
                        };

                        /**
                         * Creates a PickleTableRow message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow} PickleTableRow
                         */
                        PickleTableRow.fromObject = function fromObject(object) {
                            if (object instanceof $root.io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow)
                                return object;
                            var message = new $root.io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow();
                            if (object.cells) {
                                if (!Array.isArray(object.cells))
                                    throw TypeError(".io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.cells: array expected");
                                message.cells = [];
                                for (var i = 0; i < object.cells.length; ++i) {
                                    if (typeof object.cells[i] !== "object")
                                        throw TypeError(".io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.cells: object expected");
                                    message.cells[i] = $root.io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell.fromObject(object.cells[i]);
                                }
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a PickleTableRow message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow
                         * @static
                         * @param {io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow} message PickleTableRow
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
                                    object.cells[j] = $root.io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell.toObject(message.cells[j], options);
                            }
                            return object;
                        };

                        /**
                         * Converts this PickleTableRow to JSON.
                         * @function toJSON
                         * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        PickleTableRow.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        PickleTableRow.PickleTableCell = (function() {

                            /**
                             * Properties of a PickleTableCell.
                             * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow
                             * @interface IPickleTableCell
                             * @property {io.cucumber.messages.ILocation|null} [location] PickleTableCell location
                             * @property {string|null} [value] PickleTableCell value
                             */

                            /**
                             * Constructs a new PickleTableCell.
                             * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow
                             * @classdesc Represents a PickleTableCell.
                             * @implements IPickleTableCell
                             * @constructor
                             * @param {io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.IPickleTableCell=} [properties] Properties to set
                             */
                            function PickleTableCell(properties) {
                                if (properties)
                                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * PickleTableCell location.
                             * @member {io.cucumber.messages.ILocation|null|undefined} location
                             * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell
                             * @instance
                             */
                            PickleTableCell.prototype.location = null;

                            /**
                             * PickleTableCell value.
                             * @member {string} value
                             * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell
                             * @instance
                             */
                            PickleTableCell.prototype.value = "";

                            /**
                             * Creates a new PickleTableCell instance using the specified properties.
                             * @function create
                             * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell
                             * @static
                             * @param {io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.IPickleTableCell=} [properties] Properties to set
                             * @returns {io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell} PickleTableCell instance
                             */
                            PickleTableCell.create = function create(properties) {
                                return new PickleTableCell(properties);
                            };

                            /**
                             * Encodes the specified PickleTableCell message. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell.verify|verify} messages.
                             * @function encode
                             * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell
                             * @static
                             * @param {io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.IPickleTableCell} message PickleTableCell message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            PickleTableCell.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.location != null && message.hasOwnProperty("location"))
                                    $root.io.cucumber.messages.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                                if (message.value != null && message.hasOwnProperty("value"))
                                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.value);
                                return writer;
                            };

                            /**
                             * Encodes the specified PickleTableCell message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell
                             * @static
                             * @param {io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.IPickleTableCell} message PickleTableCell message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            PickleTableCell.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a PickleTableCell message from the specified reader or buffer.
                             * @function decode
                             * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell} PickleTableCell
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            PickleTableCell.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell();
                                while (reader.pos < end) {
                                    var tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.location = $root.io.cucumber.messages.Location.decode(reader, reader.uint32());
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
                             * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell} PickleTableCell
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
                             * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            PickleTableCell.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.location != null && message.hasOwnProperty("location")) {
                                    var error = $root.io.cucumber.messages.Location.verify(message.location);
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
                             * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell} PickleTableCell
                             */
                            PickleTableCell.fromObject = function fromObject(object) {
                                if (object instanceof $root.io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell)
                                    return object;
                                var message = new $root.io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell();
                                if (object.location != null) {
                                    if (typeof object.location !== "object")
                                        throw TypeError(".io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell.location: object expected");
                                    message.location = $root.io.cucumber.messages.Location.fromObject(object.location);
                                }
                                if (object.value != null)
                                    message.value = String(object.value);
                                return message;
                            };

                            /**
                             * Creates a plain object from a PickleTableCell message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell
                             * @static
                             * @param {io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell} message PickleTableCell
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
                                    object.location = $root.io.cucumber.messages.Location.toObject(message.location, options);
                                if (message.value != null && message.hasOwnProperty("value"))
                                    object.value = message.value;
                                return object;
                            };

                            /**
                             * Converts this PickleTableCell to JSON.
                             * @function toJSON
                             * @memberof io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            PickleTableCell.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return PickleTableCell;
                        })();

                        return PickleTableRow;
                    })();

                    return PickleTable;
                })();

                return PickleStepArgument;
            })();

            messages.PickleAccepted = (function() {

                /**
                 * Properties of a PickleAccepted.
                 * @memberof io.cucumber.messages
                 * @interface IPickleAccepted
                 * @property {string|null} [pickleId] PickleAccepted pickleId
                 */

                /**
                 * Constructs a new PickleAccepted.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a PickleAccepted.
                 * @implements IPickleAccepted
                 * @constructor
                 * @param {io.cucumber.messages.IPickleAccepted=} [properties] Properties to set
                 */
                function PickleAccepted(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * PickleAccepted pickleId.
                 * @member {string} pickleId
                 * @memberof io.cucumber.messages.PickleAccepted
                 * @instance
                 */
                PickleAccepted.prototype.pickleId = "";

                /**
                 * Creates a new PickleAccepted instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.PickleAccepted
                 * @static
                 * @param {io.cucumber.messages.IPickleAccepted=} [properties] Properties to set
                 * @returns {io.cucumber.messages.PickleAccepted} PickleAccepted instance
                 */
                PickleAccepted.create = function create(properties) {
                    return new PickleAccepted(properties);
                };

                /**
                 * Encodes the specified PickleAccepted message. Does not implicitly {@link io.cucumber.messages.PickleAccepted.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.PickleAccepted
                 * @static
                 * @param {io.cucumber.messages.IPickleAccepted} message PickleAccepted message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PickleAccepted.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.pickleId);
                    return writer;
                };

                /**
                 * Encodes the specified PickleAccepted message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleAccepted.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.PickleAccepted
                 * @static
                 * @param {io.cucumber.messages.IPickleAccepted} message PickleAccepted message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PickleAccepted.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a PickleAccepted message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.PickleAccepted
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.PickleAccepted} PickleAccepted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PickleAccepted.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.PickleAccepted();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.pickleId = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a PickleAccepted message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.PickleAccepted
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.PickleAccepted} PickleAccepted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PickleAccepted.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a PickleAccepted message.
                 * @function verify
                 * @memberof io.cucumber.messages.PickleAccepted
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                PickleAccepted.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        if (!$util.isString(message.pickleId))
                            return "pickleId: string expected";
                    return null;
                };

                /**
                 * Creates a PickleAccepted message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.PickleAccepted
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.PickleAccepted} PickleAccepted
                 */
                PickleAccepted.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.PickleAccepted)
                        return object;
                    var message = new $root.io.cucumber.messages.PickleAccepted();
                    if (object.pickleId != null)
                        message.pickleId = String(object.pickleId);
                    return message;
                };

                /**
                 * Creates a plain object from a PickleAccepted message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.PickleAccepted
                 * @static
                 * @param {io.cucumber.messages.PickleAccepted} message PickleAccepted
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                PickleAccepted.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.pickleId = "";
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        object.pickleId = message.pickleId;
                    return object;
                };

                /**
                 * Converts this PickleAccepted to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.PickleAccepted
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                PickleAccepted.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return PickleAccepted;
            })();

            messages.PickleRejected = (function() {

                /**
                 * Properties of a PickleRejected.
                 * @memberof io.cucumber.messages
                 * @interface IPickleRejected
                 * @property {string|null} [pickleId] PickleRejected pickleId
                 */

                /**
                 * Constructs a new PickleRejected.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a PickleRejected.
                 * @implements IPickleRejected
                 * @constructor
                 * @param {io.cucumber.messages.IPickleRejected=} [properties] Properties to set
                 */
                function PickleRejected(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * PickleRejected pickleId.
                 * @member {string} pickleId
                 * @memberof io.cucumber.messages.PickleRejected
                 * @instance
                 */
                PickleRejected.prototype.pickleId = "";

                /**
                 * Creates a new PickleRejected instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.PickleRejected
                 * @static
                 * @param {io.cucumber.messages.IPickleRejected=} [properties] Properties to set
                 * @returns {io.cucumber.messages.PickleRejected} PickleRejected instance
                 */
                PickleRejected.create = function create(properties) {
                    return new PickleRejected(properties);
                };

                /**
                 * Encodes the specified PickleRejected message. Does not implicitly {@link io.cucumber.messages.PickleRejected.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.PickleRejected
                 * @static
                 * @param {io.cucumber.messages.IPickleRejected} message PickleRejected message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PickleRejected.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.pickleId);
                    return writer;
                };

                /**
                 * Encodes the specified PickleRejected message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleRejected.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.PickleRejected
                 * @static
                 * @param {io.cucumber.messages.IPickleRejected} message PickleRejected message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PickleRejected.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a PickleRejected message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.PickleRejected
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.PickleRejected} PickleRejected
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PickleRejected.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.PickleRejected();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 2:
                            message.pickleId = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a PickleRejected message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.PickleRejected
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.PickleRejected} PickleRejected
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PickleRejected.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a PickleRejected message.
                 * @function verify
                 * @memberof io.cucumber.messages.PickleRejected
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                PickleRejected.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        if (!$util.isString(message.pickleId))
                            return "pickleId: string expected";
                    return null;
                };

                /**
                 * Creates a PickleRejected message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.PickleRejected
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.PickleRejected} PickleRejected
                 */
                PickleRejected.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.PickleRejected)
                        return object;
                    var message = new $root.io.cucumber.messages.PickleRejected();
                    if (object.pickleId != null)
                        message.pickleId = String(object.pickleId);
                    return message;
                };

                /**
                 * Creates a plain object from a PickleRejected message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.PickleRejected
                 * @static
                 * @param {io.cucumber.messages.PickleRejected} message PickleRejected
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                PickleRejected.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.pickleId = "";
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        object.pickleId = message.pickleId;
                    return object;
                };

                /**
                 * Converts this PickleRejected to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.PickleRejected
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                PickleRejected.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return PickleRejected;
            })();

            messages.TestRunStarted = (function() {

                /**
                 * Properties of a TestRunStarted.
                 * @memberof io.cucumber.messages
                 * @interface ITestRunStarted
                 * @property {google.protobuf.ITimestamp|null} [timestamp] TestRunStarted timestamp
                 */

                /**
                 * Constructs a new TestRunStarted.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a TestRunStarted.
                 * @implements ITestRunStarted
                 * @constructor
                 * @param {io.cucumber.messages.ITestRunStarted=} [properties] Properties to set
                 */
                function TestRunStarted(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TestRunStarted timestamp.
                 * @member {google.protobuf.ITimestamp|null|undefined} timestamp
                 * @memberof io.cucumber.messages.TestRunStarted
                 * @instance
                 */
                TestRunStarted.prototype.timestamp = null;

                /**
                 * Creates a new TestRunStarted instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.TestRunStarted
                 * @static
                 * @param {io.cucumber.messages.ITestRunStarted=} [properties] Properties to set
                 * @returns {io.cucumber.messages.TestRunStarted} TestRunStarted instance
                 */
                TestRunStarted.create = function create(properties) {
                    return new TestRunStarted(properties);
                };

                /**
                 * Encodes the specified TestRunStarted message. Does not implicitly {@link io.cucumber.messages.TestRunStarted.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.TestRunStarted
                 * @static
                 * @param {io.cucumber.messages.ITestRunStarted} message TestRunStarted message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestRunStarted.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified TestRunStarted message, length delimited. Does not implicitly {@link io.cucumber.messages.TestRunStarted.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.TestRunStarted
                 * @static
                 * @param {io.cucumber.messages.ITestRunStarted} message TestRunStarted message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestRunStarted.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TestRunStarted message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.TestRunStarted
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.TestRunStarted} TestRunStarted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestRunStarted.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.TestRunStarted();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TestRunStarted message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.TestRunStarted
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.TestRunStarted} TestRunStarted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestRunStarted.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TestRunStarted message.
                 * @function verify
                 * @memberof io.cucumber.messages.TestRunStarted
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TestRunStarted.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                        var error = $root.google.protobuf.Timestamp.verify(message.timestamp);
                        if (error)
                            return "timestamp." + error;
                    }
                    return null;
                };

                /**
                 * Creates a TestRunStarted message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.TestRunStarted
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.TestRunStarted} TestRunStarted
                 */
                TestRunStarted.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.TestRunStarted)
                        return object;
                    var message = new $root.io.cucumber.messages.TestRunStarted();
                    if (object.timestamp != null) {
                        if (typeof object.timestamp !== "object")
                            throw TypeError(".io.cucumber.messages.TestRunStarted.timestamp: object expected");
                        message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a TestRunStarted message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.TestRunStarted
                 * @static
                 * @param {io.cucumber.messages.TestRunStarted} message TestRunStarted
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TestRunStarted.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.timestamp = null;
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
                    return object;
                };

                /**
                 * Converts this TestRunStarted to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.TestRunStarted
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TestRunStarted.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return TestRunStarted;
            })();

            messages.TestCasePreparedStep = (function() {

                /**
                 * Properties of a TestCasePreparedStep.
                 * @memberof io.cucumber.messages
                 * @interface ITestCasePreparedStep
                 * @property {io.cucumber.messages.ISourceReference|null} [sourceLocation] TestCasePreparedStep sourceLocation
                 * @property {io.cucumber.messages.ISourceReference|null} [actionLocation] TestCasePreparedStep actionLocation
                 */

                /**
                 * Constructs a new TestCasePreparedStep.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a TestCasePreparedStep.
                 * @implements ITestCasePreparedStep
                 * @constructor
                 * @param {io.cucumber.messages.ITestCasePreparedStep=} [properties] Properties to set
                 */
                function TestCasePreparedStep(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TestCasePreparedStep sourceLocation.
                 * @member {io.cucumber.messages.ISourceReference|null|undefined} sourceLocation
                 * @memberof io.cucumber.messages.TestCasePreparedStep
                 * @instance
                 */
                TestCasePreparedStep.prototype.sourceLocation = null;

                /**
                 * TestCasePreparedStep actionLocation.
                 * @member {io.cucumber.messages.ISourceReference|null|undefined} actionLocation
                 * @memberof io.cucumber.messages.TestCasePreparedStep
                 * @instance
                 */
                TestCasePreparedStep.prototype.actionLocation = null;

                /**
                 * Creates a new TestCasePreparedStep instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.TestCasePreparedStep
                 * @static
                 * @param {io.cucumber.messages.ITestCasePreparedStep=} [properties] Properties to set
                 * @returns {io.cucumber.messages.TestCasePreparedStep} TestCasePreparedStep instance
                 */
                TestCasePreparedStep.create = function create(properties) {
                    return new TestCasePreparedStep(properties);
                };

                /**
                 * Encodes the specified TestCasePreparedStep message. Does not implicitly {@link io.cucumber.messages.TestCasePreparedStep.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.TestCasePreparedStep
                 * @static
                 * @param {io.cucumber.messages.ITestCasePreparedStep} message TestCasePreparedStep message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestCasePreparedStep.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.sourceLocation != null && message.hasOwnProperty("sourceLocation"))
                        $root.io.cucumber.messages.SourceReference.encode(message.sourceLocation, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.actionLocation != null && message.hasOwnProperty("actionLocation"))
                        $root.io.cucumber.messages.SourceReference.encode(message.actionLocation, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified TestCasePreparedStep message, length delimited. Does not implicitly {@link io.cucumber.messages.TestCasePreparedStep.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.TestCasePreparedStep
                 * @static
                 * @param {io.cucumber.messages.ITestCasePreparedStep} message TestCasePreparedStep message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestCasePreparedStep.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TestCasePreparedStep message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.TestCasePreparedStep
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.TestCasePreparedStep} TestCasePreparedStep
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestCasePreparedStep.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.TestCasePreparedStep();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.sourceLocation = $root.io.cucumber.messages.SourceReference.decode(reader, reader.uint32());
                            break;
                        case 2:
                            message.actionLocation = $root.io.cucumber.messages.SourceReference.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TestCasePreparedStep message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.TestCasePreparedStep
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.TestCasePreparedStep} TestCasePreparedStep
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestCasePreparedStep.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TestCasePreparedStep message.
                 * @function verify
                 * @memberof io.cucumber.messages.TestCasePreparedStep
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TestCasePreparedStep.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.sourceLocation != null && message.hasOwnProperty("sourceLocation")) {
                        var error = $root.io.cucumber.messages.SourceReference.verify(message.sourceLocation);
                        if (error)
                            return "sourceLocation." + error;
                    }
                    if (message.actionLocation != null && message.hasOwnProperty("actionLocation")) {
                        var error = $root.io.cucumber.messages.SourceReference.verify(message.actionLocation);
                        if (error)
                            return "actionLocation." + error;
                    }
                    return null;
                };

                /**
                 * Creates a TestCasePreparedStep message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.TestCasePreparedStep
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.TestCasePreparedStep} TestCasePreparedStep
                 */
                TestCasePreparedStep.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.TestCasePreparedStep)
                        return object;
                    var message = new $root.io.cucumber.messages.TestCasePreparedStep();
                    if (object.sourceLocation != null) {
                        if (typeof object.sourceLocation !== "object")
                            throw TypeError(".io.cucumber.messages.TestCasePreparedStep.sourceLocation: object expected");
                        message.sourceLocation = $root.io.cucumber.messages.SourceReference.fromObject(object.sourceLocation);
                    }
                    if (object.actionLocation != null) {
                        if (typeof object.actionLocation !== "object")
                            throw TypeError(".io.cucumber.messages.TestCasePreparedStep.actionLocation: object expected");
                        message.actionLocation = $root.io.cucumber.messages.SourceReference.fromObject(object.actionLocation);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a TestCasePreparedStep message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.TestCasePreparedStep
                 * @static
                 * @param {io.cucumber.messages.TestCasePreparedStep} message TestCasePreparedStep
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TestCasePreparedStep.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.sourceLocation = null;
                        object.actionLocation = null;
                    }
                    if (message.sourceLocation != null && message.hasOwnProperty("sourceLocation"))
                        object.sourceLocation = $root.io.cucumber.messages.SourceReference.toObject(message.sourceLocation, options);
                    if (message.actionLocation != null && message.hasOwnProperty("actionLocation"))
                        object.actionLocation = $root.io.cucumber.messages.SourceReference.toObject(message.actionLocation, options);
                    return object;
                };

                /**
                 * Converts this TestCasePreparedStep to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.TestCasePreparedStep
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TestCasePreparedStep.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return TestCasePreparedStep;
            })();

            messages.TestCasePrepared = (function() {

                /**
                 * Properties of a TestCasePrepared.
                 * @memberof io.cucumber.messages
                 * @interface ITestCasePrepared
                 * @property {string|null} [pickleId] TestCasePrepared pickleId
                 * @property {Array.<io.cucumber.messages.ITestCasePreparedStep>|null} [steps] TestCasePrepared steps
                 */

                /**
                 * Constructs a new TestCasePrepared.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a TestCasePrepared.
                 * @implements ITestCasePrepared
                 * @constructor
                 * @param {io.cucumber.messages.ITestCasePrepared=} [properties] Properties to set
                 */
                function TestCasePrepared(properties) {
                    this.steps = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TestCasePrepared pickleId.
                 * @member {string} pickleId
                 * @memberof io.cucumber.messages.TestCasePrepared
                 * @instance
                 */
                TestCasePrepared.prototype.pickleId = "";

                /**
                 * TestCasePrepared steps.
                 * @member {Array.<io.cucumber.messages.ITestCasePreparedStep>} steps
                 * @memberof io.cucumber.messages.TestCasePrepared
                 * @instance
                 */
                TestCasePrepared.prototype.steps = $util.emptyArray;

                /**
                 * Creates a new TestCasePrepared instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.TestCasePrepared
                 * @static
                 * @param {io.cucumber.messages.ITestCasePrepared=} [properties] Properties to set
                 * @returns {io.cucumber.messages.TestCasePrepared} TestCasePrepared instance
                 */
                TestCasePrepared.create = function create(properties) {
                    return new TestCasePrepared(properties);
                };

                /**
                 * Encodes the specified TestCasePrepared message. Does not implicitly {@link io.cucumber.messages.TestCasePrepared.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.TestCasePrepared
                 * @static
                 * @param {io.cucumber.messages.ITestCasePrepared} message TestCasePrepared message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestCasePrepared.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.pickleId);
                    if (message.steps != null && message.steps.length)
                        for (var i = 0; i < message.steps.length; ++i)
                            $root.io.cucumber.messages.TestCasePreparedStep.encode(message.steps[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified TestCasePrepared message, length delimited. Does not implicitly {@link io.cucumber.messages.TestCasePrepared.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.TestCasePrepared
                 * @static
                 * @param {io.cucumber.messages.ITestCasePrepared} message TestCasePrepared message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestCasePrepared.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TestCasePrepared message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.TestCasePrepared
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.TestCasePrepared} TestCasePrepared
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestCasePrepared.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.TestCasePrepared();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.pickleId = reader.string();
                            break;
                        case 2:
                            if (!(message.steps && message.steps.length))
                                message.steps = [];
                            message.steps.push($root.io.cucumber.messages.TestCasePreparedStep.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TestCasePrepared message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.TestCasePrepared
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.TestCasePrepared} TestCasePrepared
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestCasePrepared.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TestCasePrepared message.
                 * @function verify
                 * @memberof io.cucumber.messages.TestCasePrepared
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TestCasePrepared.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        if (!$util.isString(message.pickleId))
                            return "pickleId: string expected";
                    if (message.steps != null && message.hasOwnProperty("steps")) {
                        if (!Array.isArray(message.steps))
                            return "steps: array expected";
                        for (var i = 0; i < message.steps.length; ++i) {
                            var error = $root.io.cucumber.messages.TestCasePreparedStep.verify(message.steps[i]);
                            if (error)
                                return "steps." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a TestCasePrepared message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.TestCasePrepared
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.TestCasePrepared} TestCasePrepared
                 */
                TestCasePrepared.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.TestCasePrepared)
                        return object;
                    var message = new $root.io.cucumber.messages.TestCasePrepared();
                    if (object.pickleId != null)
                        message.pickleId = String(object.pickleId);
                    if (object.steps) {
                        if (!Array.isArray(object.steps))
                            throw TypeError(".io.cucumber.messages.TestCasePrepared.steps: array expected");
                        message.steps = [];
                        for (var i = 0; i < object.steps.length; ++i) {
                            if (typeof object.steps[i] !== "object")
                                throw TypeError(".io.cucumber.messages.TestCasePrepared.steps: object expected");
                            message.steps[i] = $root.io.cucumber.messages.TestCasePreparedStep.fromObject(object.steps[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a TestCasePrepared message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.TestCasePrepared
                 * @static
                 * @param {io.cucumber.messages.TestCasePrepared} message TestCasePrepared
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TestCasePrepared.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.steps = [];
                    if (options.defaults)
                        object.pickleId = "";
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        object.pickleId = message.pickleId;
                    if (message.steps && message.steps.length) {
                        object.steps = [];
                        for (var j = 0; j < message.steps.length; ++j)
                            object.steps[j] = $root.io.cucumber.messages.TestCasePreparedStep.toObject(message.steps[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this TestCasePrepared to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.TestCasePrepared
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TestCasePrepared.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return TestCasePrepared;
            })();

            messages.TestCaseStarted = (function() {

                /**
                 * Properties of a TestCaseStarted.
                 * @memberof io.cucumber.messages
                 * @interface ITestCaseStarted
                 * @property {string|null} [pickleId] TestCaseStarted pickleId
                 * @property {google.protobuf.ITimestamp|null} [timestamp] TestCaseStarted timestamp
                 * @property {io.cucumber.messages.TestCaseStarted.IPlatform|null} [platform] TestCaseStarted platform
                 */

                /**
                 * Constructs a new TestCaseStarted.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a TestCaseStarted.
                 * @implements ITestCaseStarted
                 * @constructor
                 * @param {io.cucumber.messages.ITestCaseStarted=} [properties] Properties to set
                 */
                function TestCaseStarted(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TestCaseStarted pickleId.
                 * @member {string} pickleId
                 * @memberof io.cucumber.messages.TestCaseStarted
                 * @instance
                 */
                TestCaseStarted.prototype.pickleId = "";

                /**
                 * TestCaseStarted timestamp.
                 * @member {google.protobuf.ITimestamp|null|undefined} timestamp
                 * @memberof io.cucumber.messages.TestCaseStarted
                 * @instance
                 */
                TestCaseStarted.prototype.timestamp = null;

                /**
                 * TestCaseStarted platform.
                 * @member {io.cucumber.messages.TestCaseStarted.IPlatform|null|undefined} platform
                 * @memberof io.cucumber.messages.TestCaseStarted
                 * @instance
                 */
                TestCaseStarted.prototype.platform = null;

                /**
                 * Creates a new TestCaseStarted instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.TestCaseStarted
                 * @static
                 * @param {io.cucumber.messages.ITestCaseStarted=} [properties] Properties to set
                 * @returns {io.cucumber.messages.TestCaseStarted} TestCaseStarted instance
                 */
                TestCaseStarted.create = function create(properties) {
                    return new TestCaseStarted(properties);
                };

                /**
                 * Encodes the specified TestCaseStarted message. Does not implicitly {@link io.cucumber.messages.TestCaseStarted.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.TestCaseStarted
                 * @static
                 * @param {io.cucumber.messages.ITestCaseStarted} message TestCaseStarted message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestCaseStarted.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.pickleId);
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.platform != null && message.hasOwnProperty("platform"))
                        $root.io.cucumber.messages.TestCaseStarted.Platform.encode(message.platform, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified TestCaseStarted message, length delimited. Does not implicitly {@link io.cucumber.messages.TestCaseStarted.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.TestCaseStarted
                 * @static
                 * @param {io.cucumber.messages.ITestCaseStarted} message TestCaseStarted message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestCaseStarted.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TestCaseStarted message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.TestCaseStarted
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.TestCaseStarted} TestCaseStarted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestCaseStarted.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.TestCaseStarted();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.pickleId = reader.string();
                            break;
                        case 2:
                            message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.platform = $root.io.cucumber.messages.TestCaseStarted.Platform.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TestCaseStarted message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.TestCaseStarted
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.TestCaseStarted} TestCaseStarted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestCaseStarted.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TestCaseStarted message.
                 * @function verify
                 * @memberof io.cucumber.messages.TestCaseStarted
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TestCaseStarted.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        if (!$util.isString(message.pickleId))
                            return "pickleId: string expected";
                    if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                        var error = $root.google.protobuf.Timestamp.verify(message.timestamp);
                        if (error)
                            return "timestamp." + error;
                    }
                    if (message.platform != null && message.hasOwnProperty("platform")) {
                        var error = $root.io.cucumber.messages.TestCaseStarted.Platform.verify(message.platform);
                        if (error)
                            return "platform." + error;
                    }
                    return null;
                };

                /**
                 * Creates a TestCaseStarted message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.TestCaseStarted
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.TestCaseStarted} TestCaseStarted
                 */
                TestCaseStarted.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.TestCaseStarted)
                        return object;
                    var message = new $root.io.cucumber.messages.TestCaseStarted();
                    if (object.pickleId != null)
                        message.pickleId = String(object.pickleId);
                    if (object.timestamp != null) {
                        if (typeof object.timestamp !== "object")
                            throw TypeError(".io.cucumber.messages.TestCaseStarted.timestamp: object expected");
                        message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
                    }
                    if (object.platform != null) {
                        if (typeof object.platform !== "object")
                            throw TypeError(".io.cucumber.messages.TestCaseStarted.platform: object expected");
                        message.platform = $root.io.cucumber.messages.TestCaseStarted.Platform.fromObject(object.platform);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a TestCaseStarted message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.TestCaseStarted
                 * @static
                 * @param {io.cucumber.messages.TestCaseStarted} message TestCaseStarted
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TestCaseStarted.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.pickleId = "";
                        object.timestamp = null;
                        object.platform = null;
                    }
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        object.pickleId = message.pickleId;
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
                    if (message.platform != null && message.hasOwnProperty("platform"))
                        object.platform = $root.io.cucumber.messages.TestCaseStarted.Platform.toObject(message.platform, options);
                    return object;
                };

                /**
                 * Converts this TestCaseStarted to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.TestCaseStarted
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TestCaseStarted.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                TestCaseStarted.Platform = (function() {

                    /**
                     * Properties of a Platform.
                     * @memberof io.cucumber.messages.TestCaseStarted
                     * @interface IPlatform
                     * @property {string|null} [implementation] Platform implementation
                     * @property {string|null} [version] Platform version
                     * @property {string|null} [os] Platform os
                     * @property {string|null} [cpu] Platform cpu
                     */

                    /**
                     * Constructs a new Platform.
                     * @memberof io.cucumber.messages.TestCaseStarted
                     * @classdesc Represents a Platform.
                     * @implements IPlatform
                     * @constructor
                     * @param {io.cucumber.messages.TestCaseStarted.IPlatform=} [properties] Properties to set
                     */
                    function Platform(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Platform implementation.
                     * @member {string} implementation
                     * @memberof io.cucumber.messages.TestCaseStarted.Platform
                     * @instance
                     */
                    Platform.prototype.implementation = "";

                    /**
                     * Platform version.
                     * @member {string} version
                     * @memberof io.cucumber.messages.TestCaseStarted.Platform
                     * @instance
                     */
                    Platform.prototype.version = "";

                    /**
                     * Platform os.
                     * @member {string} os
                     * @memberof io.cucumber.messages.TestCaseStarted.Platform
                     * @instance
                     */
                    Platform.prototype.os = "";

                    /**
                     * Platform cpu.
                     * @member {string} cpu
                     * @memberof io.cucumber.messages.TestCaseStarted.Platform
                     * @instance
                     */
                    Platform.prototype.cpu = "";

                    /**
                     * Creates a new Platform instance using the specified properties.
                     * @function create
                     * @memberof io.cucumber.messages.TestCaseStarted.Platform
                     * @static
                     * @param {io.cucumber.messages.TestCaseStarted.IPlatform=} [properties] Properties to set
                     * @returns {io.cucumber.messages.TestCaseStarted.Platform} Platform instance
                     */
                    Platform.create = function create(properties) {
                        return new Platform(properties);
                    };

                    /**
                     * Encodes the specified Platform message. Does not implicitly {@link io.cucumber.messages.TestCaseStarted.Platform.verify|verify} messages.
                     * @function encode
                     * @memberof io.cucumber.messages.TestCaseStarted.Platform
                     * @static
                     * @param {io.cucumber.messages.TestCaseStarted.IPlatform} message Platform message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Platform.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.implementation != null && message.hasOwnProperty("implementation"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.implementation);
                        if (message.version != null && message.hasOwnProperty("version"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.version);
                        if (message.os != null && message.hasOwnProperty("os"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.os);
                        if (message.cpu != null && message.hasOwnProperty("cpu"))
                            writer.uint32(/* id 4, wireType 2 =*/34).string(message.cpu);
                        return writer;
                    };

                    /**
                     * Encodes the specified Platform message, length delimited. Does not implicitly {@link io.cucumber.messages.TestCaseStarted.Platform.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof io.cucumber.messages.TestCaseStarted.Platform
                     * @static
                     * @param {io.cucumber.messages.TestCaseStarted.IPlatform} message Platform message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Platform.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Platform message from the specified reader or buffer.
                     * @function decode
                     * @memberof io.cucumber.messages.TestCaseStarted.Platform
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {io.cucumber.messages.TestCaseStarted.Platform} Platform
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Platform.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.TestCaseStarted.Platform();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.implementation = reader.string();
                                break;
                            case 2:
                                message.version = reader.string();
                                break;
                            case 3:
                                message.os = reader.string();
                                break;
                            case 4:
                                message.cpu = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Platform message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof io.cucumber.messages.TestCaseStarted.Platform
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {io.cucumber.messages.TestCaseStarted.Platform} Platform
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Platform.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Platform message.
                     * @function verify
                     * @memberof io.cucumber.messages.TestCaseStarted.Platform
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Platform.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.implementation != null && message.hasOwnProperty("implementation"))
                            if (!$util.isString(message.implementation))
                                return "implementation: string expected";
                        if (message.version != null && message.hasOwnProperty("version"))
                            if (!$util.isString(message.version))
                                return "version: string expected";
                        if (message.os != null && message.hasOwnProperty("os"))
                            if (!$util.isString(message.os))
                                return "os: string expected";
                        if (message.cpu != null && message.hasOwnProperty("cpu"))
                            if (!$util.isString(message.cpu))
                                return "cpu: string expected";
                        return null;
                    };

                    /**
                     * Creates a Platform message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof io.cucumber.messages.TestCaseStarted.Platform
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {io.cucumber.messages.TestCaseStarted.Platform} Platform
                     */
                    Platform.fromObject = function fromObject(object) {
                        if (object instanceof $root.io.cucumber.messages.TestCaseStarted.Platform)
                            return object;
                        var message = new $root.io.cucumber.messages.TestCaseStarted.Platform();
                        if (object.implementation != null)
                            message.implementation = String(object.implementation);
                        if (object.version != null)
                            message.version = String(object.version);
                        if (object.os != null)
                            message.os = String(object.os);
                        if (object.cpu != null)
                            message.cpu = String(object.cpu);
                        return message;
                    };

                    /**
                     * Creates a plain object from a Platform message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof io.cucumber.messages.TestCaseStarted.Platform
                     * @static
                     * @param {io.cucumber.messages.TestCaseStarted.Platform} message Platform
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Platform.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.implementation = "";
                            object.version = "";
                            object.os = "";
                            object.cpu = "";
                        }
                        if (message.implementation != null && message.hasOwnProperty("implementation"))
                            object.implementation = message.implementation;
                        if (message.version != null && message.hasOwnProperty("version"))
                            object.version = message.version;
                        if (message.os != null && message.hasOwnProperty("os"))
                            object.os = message.os;
                        if (message.cpu != null && message.hasOwnProperty("cpu"))
                            object.cpu = message.cpu;
                        return object;
                    };

                    /**
                     * Converts this Platform to JSON.
                     * @function toJSON
                     * @memberof io.cucumber.messages.TestCaseStarted.Platform
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Platform.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Platform;
                })();

                return TestCaseStarted;
            })();

            messages.TestCaseFinished = (function() {

                /**
                 * Properties of a TestCaseFinished.
                 * @memberof io.cucumber.messages
                 * @interface ITestCaseFinished
                 * @property {string|null} [pickleId] TestCaseFinished pickleId
                 * @property {google.protobuf.ITimestamp|null} [timestamp] TestCaseFinished timestamp
                 * @property {io.cucumber.messages.ITestResult|null} [testResult] TestCaseFinished testResult
                 */

                /**
                 * Constructs a new TestCaseFinished.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a TestCaseFinished.
                 * @implements ITestCaseFinished
                 * @constructor
                 * @param {io.cucumber.messages.ITestCaseFinished=} [properties] Properties to set
                 */
                function TestCaseFinished(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TestCaseFinished pickleId.
                 * @member {string} pickleId
                 * @memberof io.cucumber.messages.TestCaseFinished
                 * @instance
                 */
                TestCaseFinished.prototype.pickleId = "";

                /**
                 * TestCaseFinished timestamp.
                 * @member {google.protobuf.ITimestamp|null|undefined} timestamp
                 * @memberof io.cucumber.messages.TestCaseFinished
                 * @instance
                 */
                TestCaseFinished.prototype.timestamp = null;

                /**
                 * TestCaseFinished testResult.
                 * @member {io.cucumber.messages.ITestResult|null|undefined} testResult
                 * @memberof io.cucumber.messages.TestCaseFinished
                 * @instance
                 */
                TestCaseFinished.prototype.testResult = null;

                /**
                 * Creates a new TestCaseFinished instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.TestCaseFinished
                 * @static
                 * @param {io.cucumber.messages.ITestCaseFinished=} [properties] Properties to set
                 * @returns {io.cucumber.messages.TestCaseFinished} TestCaseFinished instance
                 */
                TestCaseFinished.create = function create(properties) {
                    return new TestCaseFinished(properties);
                };

                /**
                 * Encodes the specified TestCaseFinished message. Does not implicitly {@link io.cucumber.messages.TestCaseFinished.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.TestCaseFinished
                 * @static
                 * @param {io.cucumber.messages.ITestCaseFinished} message TestCaseFinished message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestCaseFinished.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.pickleId);
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.testResult != null && message.hasOwnProperty("testResult"))
                        $root.io.cucumber.messages.TestResult.encode(message.testResult, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified TestCaseFinished message, length delimited. Does not implicitly {@link io.cucumber.messages.TestCaseFinished.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.TestCaseFinished
                 * @static
                 * @param {io.cucumber.messages.ITestCaseFinished} message TestCaseFinished message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestCaseFinished.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TestCaseFinished message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.TestCaseFinished
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.TestCaseFinished} TestCaseFinished
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestCaseFinished.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.TestCaseFinished();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.pickleId = reader.string();
                            break;
                        case 2:
                            message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.testResult = $root.io.cucumber.messages.TestResult.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TestCaseFinished message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.TestCaseFinished
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.TestCaseFinished} TestCaseFinished
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestCaseFinished.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TestCaseFinished message.
                 * @function verify
                 * @memberof io.cucumber.messages.TestCaseFinished
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TestCaseFinished.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        if (!$util.isString(message.pickleId))
                            return "pickleId: string expected";
                    if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                        var error = $root.google.protobuf.Timestamp.verify(message.timestamp);
                        if (error)
                            return "timestamp." + error;
                    }
                    if (message.testResult != null && message.hasOwnProperty("testResult")) {
                        var error = $root.io.cucumber.messages.TestResult.verify(message.testResult);
                        if (error)
                            return "testResult." + error;
                    }
                    return null;
                };

                /**
                 * Creates a TestCaseFinished message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.TestCaseFinished
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.TestCaseFinished} TestCaseFinished
                 */
                TestCaseFinished.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.TestCaseFinished)
                        return object;
                    var message = new $root.io.cucumber.messages.TestCaseFinished();
                    if (object.pickleId != null)
                        message.pickleId = String(object.pickleId);
                    if (object.timestamp != null) {
                        if (typeof object.timestamp !== "object")
                            throw TypeError(".io.cucumber.messages.TestCaseFinished.timestamp: object expected");
                        message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
                    }
                    if (object.testResult != null) {
                        if (typeof object.testResult !== "object")
                            throw TypeError(".io.cucumber.messages.TestCaseFinished.testResult: object expected");
                        message.testResult = $root.io.cucumber.messages.TestResult.fromObject(object.testResult);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a TestCaseFinished message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.TestCaseFinished
                 * @static
                 * @param {io.cucumber.messages.TestCaseFinished} message TestCaseFinished
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TestCaseFinished.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.pickleId = "";
                        object.timestamp = null;
                        object.testResult = null;
                    }
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        object.pickleId = message.pickleId;
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
                    if (message.testResult != null && message.hasOwnProperty("testResult"))
                        object.testResult = $root.io.cucumber.messages.TestResult.toObject(message.testResult, options);
                    return object;
                };

                /**
                 * Converts this TestCaseFinished to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.TestCaseFinished
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TestCaseFinished.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return TestCaseFinished;
            })();

            messages.TestStepStarted = (function() {

                /**
                 * Properties of a TestStepStarted.
                 * @memberof io.cucumber.messages
                 * @interface ITestStepStarted
                 * @property {string|null} [pickleId] TestStepStarted pickleId
                 * @property {number|null} [index] TestStepStarted index
                 * @property {google.protobuf.ITimestamp|null} [timestamp] TestStepStarted timestamp
                 */

                /**
                 * Constructs a new TestStepStarted.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a TestStepStarted.
                 * @implements ITestStepStarted
                 * @constructor
                 * @param {io.cucumber.messages.ITestStepStarted=} [properties] Properties to set
                 */
                function TestStepStarted(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TestStepStarted pickleId.
                 * @member {string} pickleId
                 * @memberof io.cucumber.messages.TestStepStarted
                 * @instance
                 */
                TestStepStarted.prototype.pickleId = "";

                /**
                 * TestStepStarted index.
                 * @member {number} index
                 * @memberof io.cucumber.messages.TestStepStarted
                 * @instance
                 */
                TestStepStarted.prototype.index = 0;

                /**
                 * TestStepStarted timestamp.
                 * @member {google.protobuf.ITimestamp|null|undefined} timestamp
                 * @memberof io.cucumber.messages.TestStepStarted
                 * @instance
                 */
                TestStepStarted.prototype.timestamp = null;

                /**
                 * Creates a new TestStepStarted instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.TestStepStarted
                 * @static
                 * @param {io.cucumber.messages.ITestStepStarted=} [properties] Properties to set
                 * @returns {io.cucumber.messages.TestStepStarted} TestStepStarted instance
                 */
                TestStepStarted.create = function create(properties) {
                    return new TestStepStarted(properties);
                };

                /**
                 * Encodes the specified TestStepStarted message. Does not implicitly {@link io.cucumber.messages.TestStepStarted.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.TestStepStarted
                 * @static
                 * @param {io.cucumber.messages.ITestStepStarted} message TestStepStarted message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestStepStarted.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.pickleId);
                    if (message.index != null && message.hasOwnProperty("index"))
                        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.index);
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified TestStepStarted message, length delimited. Does not implicitly {@link io.cucumber.messages.TestStepStarted.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.TestStepStarted
                 * @static
                 * @param {io.cucumber.messages.ITestStepStarted} message TestStepStarted message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestStepStarted.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TestStepStarted message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.TestStepStarted
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.TestStepStarted} TestStepStarted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestStepStarted.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.TestStepStarted();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.pickleId = reader.string();
                            break;
                        case 2:
                            message.index = reader.uint32();
                            break;
                        case 3:
                            message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TestStepStarted message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.TestStepStarted
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.TestStepStarted} TestStepStarted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestStepStarted.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TestStepStarted message.
                 * @function verify
                 * @memberof io.cucumber.messages.TestStepStarted
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TestStepStarted.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        if (!$util.isString(message.pickleId))
                            return "pickleId: string expected";
                    if (message.index != null && message.hasOwnProperty("index"))
                        if (!$util.isInteger(message.index))
                            return "index: integer expected";
                    if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                        var error = $root.google.protobuf.Timestamp.verify(message.timestamp);
                        if (error)
                            return "timestamp." + error;
                    }
                    return null;
                };

                /**
                 * Creates a TestStepStarted message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.TestStepStarted
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.TestStepStarted} TestStepStarted
                 */
                TestStepStarted.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.TestStepStarted)
                        return object;
                    var message = new $root.io.cucumber.messages.TestStepStarted();
                    if (object.pickleId != null)
                        message.pickleId = String(object.pickleId);
                    if (object.index != null)
                        message.index = object.index >>> 0;
                    if (object.timestamp != null) {
                        if (typeof object.timestamp !== "object")
                            throw TypeError(".io.cucumber.messages.TestStepStarted.timestamp: object expected");
                        message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a TestStepStarted message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.TestStepStarted
                 * @static
                 * @param {io.cucumber.messages.TestStepStarted} message TestStepStarted
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TestStepStarted.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.pickleId = "";
                        object.index = 0;
                        object.timestamp = null;
                    }
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        object.pickleId = message.pickleId;
                    if (message.index != null && message.hasOwnProperty("index"))
                        object.index = message.index;
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
                    return object;
                };

                /**
                 * Converts this TestStepStarted to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.TestStepStarted
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TestStepStarted.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return TestStepStarted;
            })();

            messages.TestStepFinished = (function() {

                /**
                 * Properties of a TestStepFinished.
                 * @memberof io.cucumber.messages
                 * @interface ITestStepFinished
                 * @property {string|null} [pickleId] TestStepFinished pickleId
                 * @property {number|null} [index] TestStepFinished index
                 * @property {io.cucumber.messages.ITestResult|null} [testResult] TestStepFinished testResult
                 * @property {google.protobuf.ITimestamp|null} [timestamp] TestStepFinished timestamp
                 */

                /**
                 * Constructs a new TestStepFinished.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a TestStepFinished.
                 * @implements ITestStepFinished
                 * @constructor
                 * @param {io.cucumber.messages.ITestStepFinished=} [properties] Properties to set
                 */
                function TestStepFinished(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TestStepFinished pickleId.
                 * @member {string} pickleId
                 * @memberof io.cucumber.messages.TestStepFinished
                 * @instance
                 */
                TestStepFinished.prototype.pickleId = "";

                /**
                 * TestStepFinished index.
                 * @member {number} index
                 * @memberof io.cucumber.messages.TestStepFinished
                 * @instance
                 */
                TestStepFinished.prototype.index = 0;

                /**
                 * TestStepFinished testResult.
                 * @member {io.cucumber.messages.ITestResult|null|undefined} testResult
                 * @memberof io.cucumber.messages.TestStepFinished
                 * @instance
                 */
                TestStepFinished.prototype.testResult = null;

                /**
                 * TestStepFinished timestamp.
                 * @member {google.protobuf.ITimestamp|null|undefined} timestamp
                 * @memberof io.cucumber.messages.TestStepFinished
                 * @instance
                 */
                TestStepFinished.prototype.timestamp = null;

                /**
                 * Creates a new TestStepFinished instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.TestStepFinished
                 * @static
                 * @param {io.cucumber.messages.ITestStepFinished=} [properties] Properties to set
                 * @returns {io.cucumber.messages.TestStepFinished} TestStepFinished instance
                 */
                TestStepFinished.create = function create(properties) {
                    return new TestStepFinished(properties);
                };

                /**
                 * Encodes the specified TestStepFinished message. Does not implicitly {@link io.cucumber.messages.TestStepFinished.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.TestStepFinished
                 * @static
                 * @param {io.cucumber.messages.ITestStepFinished} message TestStepFinished message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestStepFinished.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.pickleId);
                    if (message.index != null && message.hasOwnProperty("index"))
                        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.index);
                    if (message.testResult != null && message.hasOwnProperty("testResult"))
                        $root.io.cucumber.messages.TestResult.encode(message.testResult, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified TestStepFinished message, length delimited. Does not implicitly {@link io.cucumber.messages.TestStepFinished.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.TestStepFinished
                 * @static
                 * @param {io.cucumber.messages.ITestStepFinished} message TestStepFinished message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestStepFinished.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TestStepFinished message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.TestStepFinished
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.TestStepFinished} TestStepFinished
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestStepFinished.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.TestStepFinished();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.pickleId = reader.string();
                            break;
                        case 2:
                            message.index = reader.uint32();
                            break;
                        case 3:
                            message.testResult = $root.io.cucumber.messages.TestResult.decode(reader, reader.uint32());
                            break;
                        case 4:
                            message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TestStepFinished message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.TestStepFinished
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.TestStepFinished} TestStepFinished
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestStepFinished.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TestStepFinished message.
                 * @function verify
                 * @memberof io.cucumber.messages.TestStepFinished
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TestStepFinished.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        if (!$util.isString(message.pickleId))
                            return "pickleId: string expected";
                    if (message.index != null && message.hasOwnProperty("index"))
                        if (!$util.isInteger(message.index))
                            return "index: integer expected";
                    if (message.testResult != null && message.hasOwnProperty("testResult")) {
                        var error = $root.io.cucumber.messages.TestResult.verify(message.testResult);
                        if (error)
                            return "testResult." + error;
                    }
                    if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                        var error = $root.google.protobuf.Timestamp.verify(message.timestamp);
                        if (error)
                            return "timestamp." + error;
                    }
                    return null;
                };

                /**
                 * Creates a TestStepFinished message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.TestStepFinished
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.TestStepFinished} TestStepFinished
                 */
                TestStepFinished.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.TestStepFinished)
                        return object;
                    var message = new $root.io.cucumber.messages.TestStepFinished();
                    if (object.pickleId != null)
                        message.pickleId = String(object.pickleId);
                    if (object.index != null)
                        message.index = object.index >>> 0;
                    if (object.testResult != null) {
                        if (typeof object.testResult !== "object")
                            throw TypeError(".io.cucumber.messages.TestStepFinished.testResult: object expected");
                        message.testResult = $root.io.cucumber.messages.TestResult.fromObject(object.testResult);
                    }
                    if (object.timestamp != null) {
                        if (typeof object.timestamp !== "object")
                            throw TypeError(".io.cucumber.messages.TestStepFinished.timestamp: object expected");
                        message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a TestStepFinished message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.TestStepFinished
                 * @static
                 * @param {io.cucumber.messages.TestStepFinished} message TestStepFinished
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TestStepFinished.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.pickleId = "";
                        object.index = 0;
                        object.testResult = null;
                        object.timestamp = null;
                    }
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        object.pickleId = message.pickleId;
                    if (message.index != null && message.hasOwnProperty("index"))
                        object.index = message.index;
                    if (message.testResult != null && message.hasOwnProperty("testResult"))
                        object.testResult = $root.io.cucumber.messages.TestResult.toObject(message.testResult, options);
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
                    return object;
                };

                /**
                 * Converts this TestStepFinished to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.TestStepFinished
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TestStepFinished.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return TestStepFinished;
            })();

            messages.TestHookStarted = (function() {

                /**
                 * Properties of a TestHookStarted.
                 * @memberof io.cucumber.messages
                 * @interface ITestHookStarted
                 * @property {string|null} [pickleId] TestHookStarted pickleId
                 * @property {google.protobuf.ITimestamp|null} [timestamp] TestHookStarted timestamp
                 */

                /**
                 * Constructs a new TestHookStarted.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a TestHookStarted.
                 * @implements ITestHookStarted
                 * @constructor
                 * @param {io.cucumber.messages.ITestHookStarted=} [properties] Properties to set
                 */
                function TestHookStarted(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TestHookStarted pickleId.
                 * @member {string} pickleId
                 * @memberof io.cucumber.messages.TestHookStarted
                 * @instance
                 */
                TestHookStarted.prototype.pickleId = "";

                /**
                 * TestHookStarted timestamp.
                 * @member {google.protobuf.ITimestamp|null|undefined} timestamp
                 * @memberof io.cucumber.messages.TestHookStarted
                 * @instance
                 */
                TestHookStarted.prototype.timestamp = null;

                /**
                 * Creates a new TestHookStarted instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.TestHookStarted
                 * @static
                 * @param {io.cucumber.messages.ITestHookStarted=} [properties] Properties to set
                 * @returns {io.cucumber.messages.TestHookStarted} TestHookStarted instance
                 */
                TestHookStarted.create = function create(properties) {
                    return new TestHookStarted(properties);
                };

                /**
                 * Encodes the specified TestHookStarted message. Does not implicitly {@link io.cucumber.messages.TestHookStarted.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.TestHookStarted
                 * @static
                 * @param {io.cucumber.messages.ITestHookStarted} message TestHookStarted message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestHookStarted.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.pickleId);
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified TestHookStarted message, length delimited. Does not implicitly {@link io.cucumber.messages.TestHookStarted.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.TestHookStarted
                 * @static
                 * @param {io.cucumber.messages.ITestHookStarted} message TestHookStarted message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestHookStarted.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TestHookStarted message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.TestHookStarted
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.TestHookStarted} TestHookStarted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestHookStarted.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.TestHookStarted();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.pickleId = reader.string();
                            break;
                        case 2:
                            message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TestHookStarted message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.TestHookStarted
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.TestHookStarted} TestHookStarted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestHookStarted.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TestHookStarted message.
                 * @function verify
                 * @memberof io.cucumber.messages.TestHookStarted
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TestHookStarted.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        if (!$util.isString(message.pickleId))
                            return "pickleId: string expected";
                    if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                        var error = $root.google.protobuf.Timestamp.verify(message.timestamp);
                        if (error)
                            return "timestamp." + error;
                    }
                    return null;
                };

                /**
                 * Creates a TestHookStarted message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.TestHookStarted
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.TestHookStarted} TestHookStarted
                 */
                TestHookStarted.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.TestHookStarted)
                        return object;
                    var message = new $root.io.cucumber.messages.TestHookStarted();
                    if (object.pickleId != null)
                        message.pickleId = String(object.pickleId);
                    if (object.timestamp != null) {
                        if (typeof object.timestamp !== "object")
                            throw TypeError(".io.cucumber.messages.TestHookStarted.timestamp: object expected");
                        message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a TestHookStarted message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.TestHookStarted
                 * @static
                 * @param {io.cucumber.messages.TestHookStarted} message TestHookStarted
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TestHookStarted.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.pickleId = "";
                        object.timestamp = null;
                    }
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        object.pickleId = message.pickleId;
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
                    return object;
                };

                /**
                 * Converts this TestHookStarted to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.TestHookStarted
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TestHookStarted.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return TestHookStarted;
            })();

            messages.TestHookFinished = (function() {

                /**
                 * Properties of a TestHookFinished.
                 * @memberof io.cucumber.messages
                 * @interface ITestHookFinished
                 * @property {string|null} [pickleId] TestHookFinished pickleId
                 * @property {io.cucumber.messages.ITestResult|null} [testResult] TestHookFinished testResult
                 * @property {google.protobuf.ITimestamp|null} [timestamp] TestHookFinished timestamp
                 */

                /**
                 * Constructs a new TestHookFinished.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a TestHookFinished.
                 * @implements ITestHookFinished
                 * @constructor
                 * @param {io.cucumber.messages.ITestHookFinished=} [properties] Properties to set
                 */
                function TestHookFinished(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TestHookFinished pickleId.
                 * @member {string} pickleId
                 * @memberof io.cucumber.messages.TestHookFinished
                 * @instance
                 */
                TestHookFinished.prototype.pickleId = "";

                /**
                 * TestHookFinished testResult.
                 * @member {io.cucumber.messages.ITestResult|null|undefined} testResult
                 * @memberof io.cucumber.messages.TestHookFinished
                 * @instance
                 */
                TestHookFinished.prototype.testResult = null;

                /**
                 * TestHookFinished timestamp.
                 * @member {google.protobuf.ITimestamp|null|undefined} timestamp
                 * @memberof io.cucumber.messages.TestHookFinished
                 * @instance
                 */
                TestHookFinished.prototype.timestamp = null;

                /**
                 * Creates a new TestHookFinished instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.TestHookFinished
                 * @static
                 * @param {io.cucumber.messages.ITestHookFinished=} [properties] Properties to set
                 * @returns {io.cucumber.messages.TestHookFinished} TestHookFinished instance
                 */
                TestHookFinished.create = function create(properties) {
                    return new TestHookFinished(properties);
                };

                /**
                 * Encodes the specified TestHookFinished message. Does not implicitly {@link io.cucumber.messages.TestHookFinished.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.TestHookFinished
                 * @static
                 * @param {io.cucumber.messages.ITestHookFinished} message TestHookFinished message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestHookFinished.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.pickleId);
                    if (message.testResult != null && message.hasOwnProperty("testResult"))
                        $root.io.cucumber.messages.TestResult.encode(message.testResult, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified TestHookFinished message, length delimited. Does not implicitly {@link io.cucumber.messages.TestHookFinished.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.TestHookFinished
                 * @static
                 * @param {io.cucumber.messages.ITestHookFinished} message TestHookFinished message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestHookFinished.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TestHookFinished message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.TestHookFinished
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.TestHookFinished} TestHookFinished
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestHookFinished.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.TestHookFinished();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.pickleId = reader.string();
                            break;
                        case 2:
                            message.testResult = $root.io.cucumber.messages.TestResult.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TestHookFinished message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.TestHookFinished
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.TestHookFinished} TestHookFinished
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestHookFinished.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TestHookFinished message.
                 * @function verify
                 * @memberof io.cucumber.messages.TestHookFinished
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TestHookFinished.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        if (!$util.isString(message.pickleId))
                            return "pickleId: string expected";
                    if (message.testResult != null && message.hasOwnProperty("testResult")) {
                        var error = $root.io.cucumber.messages.TestResult.verify(message.testResult);
                        if (error)
                            return "testResult." + error;
                    }
                    if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                        var error = $root.google.protobuf.Timestamp.verify(message.timestamp);
                        if (error)
                            return "timestamp." + error;
                    }
                    return null;
                };

                /**
                 * Creates a TestHookFinished message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.TestHookFinished
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.TestHookFinished} TestHookFinished
                 */
                TestHookFinished.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.TestHookFinished)
                        return object;
                    var message = new $root.io.cucumber.messages.TestHookFinished();
                    if (object.pickleId != null)
                        message.pickleId = String(object.pickleId);
                    if (object.testResult != null) {
                        if (typeof object.testResult !== "object")
                            throw TypeError(".io.cucumber.messages.TestHookFinished.testResult: object expected");
                        message.testResult = $root.io.cucumber.messages.TestResult.fromObject(object.testResult);
                    }
                    if (object.timestamp != null) {
                        if (typeof object.timestamp !== "object")
                            throw TypeError(".io.cucumber.messages.TestHookFinished.timestamp: object expected");
                        message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a TestHookFinished message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.TestHookFinished
                 * @static
                 * @param {io.cucumber.messages.TestHookFinished} message TestHookFinished
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TestHookFinished.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.pickleId = "";
                        object.testResult = null;
                        object.timestamp = null;
                    }
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        object.pickleId = message.pickleId;
                    if (message.testResult != null && message.hasOwnProperty("testResult"))
                        object.testResult = $root.io.cucumber.messages.TestResult.toObject(message.testResult, options);
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
                    return object;
                };

                /**
                 * Converts this TestHookFinished to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.TestHookFinished
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TestHookFinished.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return TestHookFinished;
            })();

            messages.TestResult = (function() {

                /**
                 * Properties of a TestResult.
                 * @memberof io.cucumber.messages
                 * @interface ITestResult
                 * @property {io.cucumber.messages.Status|null} [status] TestResult status
                 * @property {string|null} [message] TestResult message
                 * @property {number|Long|null} [durationNanoseconds] TestResult durationNanoseconds
                 */

                /**
                 * Constructs a new TestResult.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a TestResult.
                 * @implements ITestResult
                 * @constructor
                 * @param {io.cucumber.messages.ITestResult=} [properties] Properties to set
                 */
                function TestResult(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TestResult status.
                 * @member {io.cucumber.messages.Status} status
                 * @memberof io.cucumber.messages.TestResult
                 * @instance
                 */
                TestResult.prototype.status = 0;

                /**
                 * TestResult message.
                 * @member {string} message
                 * @memberof io.cucumber.messages.TestResult
                 * @instance
                 */
                TestResult.prototype.message = "";

                /**
                 * TestResult durationNanoseconds.
                 * @member {number|Long} durationNanoseconds
                 * @memberof io.cucumber.messages.TestResult
                 * @instance
                 */
                TestResult.prototype.durationNanoseconds = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * Creates a new TestResult instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.TestResult
                 * @static
                 * @param {io.cucumber.messages.ITestResult=} [properties] Properties to set
                 * @returns {io.cucumber.messages.TestResult} TestResult instance
                 */
                TestResult.create = function create(properties) {
                    return new TestResult(properties);
                };

                /**
                 * Encodes the specified TestResult message. Does not implicitly {@link io.cucumber.messages.TestResult.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.TestResult
                 * @static
                 * @param {io.cucumber.messages.ITestResult} message TestResult message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestResult.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.status != null && message.hasOwnProperty("status"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
                    if (message.message != null && message.hasOwnProperty("message"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
                    if (message.durationNanoseconds != null && message.hasOwnProperty("durationNanoseconds"))
                        writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.durationNanoseconds);
                    return writer;
                };

                /**
                 * Encodes the specified TestResult message, length delimited. Does not implicitly {@link io.cucumber.messages.TestResult.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.TestResult
                 * @static
                 * @param {io.cucumber.messages.ITestResult} message TestResult message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestResult.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TestResult message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.TestResult
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.TestResult} TestResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestResult.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.TestResult();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.status = reader.int32();
                            break;
                        case 2:
                            message.message = reader.string();
                            break;
                        case 3:
                            message.durationNanoseconds = reader.uint64();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TestResult message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.TestResult
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.TestResult} TestResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestResult.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TestResult message.
                 * @function verify
                 * @memberof io.cucumber.messages.TestResult
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TestResult.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.status != null && message.hasOwnProperty("status"))
                        switch (message.status) {
                        default:
                            return "status: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                            break;
                        }
                    if (message.message != null && message.hasOwnProperty("message"))
                        if (!$util.isString(message.message))
                            return "message: string expected";
                    if (message.durationNanoseconds != null && message.hasOwnProperty("durationNanoseconds"))
                        if (!$util.isInteger(message.durationNanoseconds) && !(message.durationNanoseconds && $util.isInteger(message.durationNanoseconds.low) && $util.isInteger(message.durationNanoseconds.high)))
                            return "durationNanoseconds: integer|Long expected";
                    return null;
                };

                /**
                 * Creates a TestResult message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.TestResult
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.TestResult} TestResult
                 */
                TestResult.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.TestResult)
                        return object;
                    var message = new $root.io.cucumber.messages.TestResult();
                    switch (object.status) {
                    case "AMBIGUOUS":
                    case 0:
                        message.status = 0;
                        break;
                    case "FAILED":
                    case 1:
                        message.status = 1;
                        break;
                    case "PASSED":
                    case 2:
                        message.status = 2;
                        break;
                    case "PENDING":
                    case 3:
                        message.status = 3;
                        break;
                    case "SKIPPED":
                    case 4:
                        message.status = 4;
                        break;
                    case "UNDEFINED":
                    case 5:
                        message.status = 5;
                        break;
                    }
                    if (object.message != null)
                        message.message = String(object.message);
                    if (object.durationNanoseconds != null)
                        if ($util.Long)
                            (message.durationNanoseconds = $util.Long.fromValue(object.durationNanoseconds)).unsigned = true;
                        else if (typeof object.durationNanoseconds === "string")
                            message.durationNanoseconds = parseInt(object.durationNanoseconds, 10);
                        else if (typeof object.durationNanoseconds === "number")
                            message.durationNanoseconds = object.durationNanoseconds;
                        else if (typeof object.durationNanoseconds === "object")
                            message.durationNanoseconds = new $util.LongBits(object.durationNanoseconds.low >>> 0, object.durationNanoseconds.high >>> 0).toNumber(true);
                    return message;
                };

                /**
                 * Creates a plain object from a TestResult message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.TestResult
                 * @static
                 * @param {io.cucumber.messages.TestResult} message TestResult
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TestResult.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.status = options.enums === String ? "AMBIGUOUS" : 0;
                        object.message = "";
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.durationNanoseconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.durationNanoseconds = options.longs === String ? "0" : 0;
                    }
                    if (message.status != null && message.hasOwnProperty("status"))
                        object.status = options.enums === String ? $root.io.cucumber.messages.Status[message.status] : message.status;
                    if (message.message != null && message.hasOwnProperty("message"))
                        object.message = message.message;
                    if (message.durationNanoseconds != null && message.hasOwnProperty("durationNanoseconds"))
                        if (typeof message.durationNanoseconds === "number")
                            object.durationNanoseconds = options.longs === String ? String(message.durationNanoseconds) : message.durationNanoseconds;
                        else
                            object.durationNanoseconds = options.longs === String ? $util.Long.prototype.toString.call(message.durationNanoseconds) : options.longs === Number ? new $util.LongBits(message.durationNanoseconds.low >>> 0, message.durationNanoseconds.high >>> 0).toNumber(true) : message.durationNanoseconds;
                    return object;
                };

                /**
                 * Converts this TestResult to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.TestResult
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TestResult.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return TestResult;
            })();

            /**
             * Status enum.
             * @name io.cucumber.messages.Status
             * @enum {string}
             * @property {number} AMBIGUOUS=0 AMBIGUOUS value
             * @property {number} FAILED=1 FAILED value
             * @property {number} PASSED=2 PASSED value
             * @property {number} PENDING=3 PENDING value
             * @property {number} SKIPPED=4 SKIPPED value
             * @property {number} UNDEFINED=5 UNDEFINED value
             */
            messages.Status = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "AMBIGUOUS"] = 0;
                values[valuesById[1] = "FAILED"] = 1;
                values[valuesById[2] = "PASSED"] = 2;
                values[valuesById[3] = "PENDING"] = 3;
                values[valuesById[4] = "SKIPPED"] = 4;
                values[valuesById[5] = "UNDEFINED"] = 5;
                return values;
            })();

            messages.TestRunFinished = (function() {

                /**
                 * Properties of a TestRunFinished.
                 * @memberof io.cucumber.messages
                 * @interface ITestRunFinished
                 * @property {boolean|null} [success] TestRunFinished success
                 */

                /**
                 * Constructs a new TestRunFinished.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a TestRunFinished.
                 * @implements ITestRunFinished
                 * @constructor
                 * @param {io.cucumber.messages.ITestRunFinished=} [properties] Properties to set
                 */
                function TestRunFinished(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TestRunFinished success.
                 * @member {boolean} success
                 * @memberof io.cucumber.messages.TestRunFinished
                 * @instance
                 */
                TestRunFinished.prototype.success = false;

                /**
                 * Creates a new TestRunFinished instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.TestRunFinished
                 * @static
                 * @param {io.cucumber.messages.ITestRunFinished=} [properties] Properties to set
                 * @returns {io.cucumber.messages.TestRunFinished} TestRunFinished instance
                 */
                TestRunFinished.create = function create(properties) {
                    return new TestRunFinished(properties);
                };

                /**
                 * Encodes the specified TestRunFinished message. Does not implicitly {@link io.cucumber.messages.TestRunFinished.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.TestRunFinished
                 * @static
                 * @param {io.cucumber.messages.ITestRunFinished} message TestRunFinished message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestRunFinished.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.success != null && message.hasOwnProperty("success"))
                        writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
                    return writer;
                };

                /**
                 * Encodes the specified TestRunFinished message, length delimited. Does not implicitly {@link io.cucumber.messages.TestRunFinished.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.TestRunFinished
                 * @static
                 * @param {io.cucumber.messages.ITestRunFinished} message TestRunFinished message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestRunFinished.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TestRunFinished message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.TestRunFinished
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.TestRunFinished} TestRunFinished
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestRunFinished.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.TestRunFinished();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.success = reader.bool();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TestRunFinished message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.TestRunFinished
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.TestRunFinished} TestRunFinished
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestRunFinished.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TestRunFinished message.
                 * @function verify
                 * @memberof io.cucumber.messages.TestRunFinished
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TestRunFinished.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.success != null && message.hasOwnProperty("success"))
                        if (typeof message.success !== "boolean")
                            return "success: boolean expected";
                    return null;
                };

                /**
                 * Creates a TestRunFinished message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.TestRunFinished
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.TestRunFinished} TestRunFinished
                 */
                TestRunFinished.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.TestRunFinished)
                        return object;
                    var message = new $root.io.cucumber.messages.TestRunFinished();
                    if (object.success != null)
                        message.success = Boolean(object.success);
                    return message;
                };

                /**
                 * Creates a plain object from a TestRunFinished message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.TestRunFinished
                 * @static
                 * @param {io.cucumber.messages.TestRunFinished} message TestRunFinished
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TestRunFinished.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.success = false;
                    if (message.success != null && message.hasOwnProperty("success"))
                        object.success = message.success;
                    return object;
                };

                /**
                 * Converts this TestRunFinished to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.TestRunFinished
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TestRunFinished.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return TestRunFinished;
            })();

            messages.CommandStart = (function() {

                /**
                 * Properties of a CommandStart.
                 * @memberof io.cucumber.messages
                 * @interface ICommandStart
                 * @property {string|null} [baseDirectory] CommandStart baseDirectory
                 * @property {io.cucumber.messages.ISourcesConfig|null} [sourcesConfig] CommandStart sourcesConfig
                 * @property {io.cucumber.messages.IRuntimeConfig|null} [runtimeConfig] CommandStart runtimeConfig
                 * @property {io.cucumber.messages.ISupportCodeConfig|null} [supportCodeConfig] CommandStart supportCodeConfig
                 */

                /**
                 * Constructs a new CommandStart.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a CommandStart.
                 * @implements ICommandStart
                 * @constructor
                 * @param {io.cucumber.messages.ICommandStart=} [properties] Properties to set
                 */
                function CommandStart(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * CommandStart baseDirectory.
                 * @member {string} baseDirectory
                 * @memberof io.cucumber.messages.CommandStart
                 * @instance
                 */
                CommandStart.prototype.baseDirectory = "";

                /**
                 * CommandStart sourcesConfig.
                 * @member {io.cucumber.messages.ISourcesConfig|null|undefined} sourcesConfig
                 * @memberof io.cucumber.messages.CommandStart
                 * @instance
                 */
                CommandStart.prototype.sourcesConfig = null;

                /**
                 * CommandStart runtimeConfig.
                 * @member {io.cucumber.messages.IRuntimeConfig|null|undefined} runtimeConfig
                 * @memberof io.cucumber.messages.CommandStart
                 * @instance
                 */
                CommandStart.prototype.runtimeConfig = null;

                /**
                 * CommandStart supportCodeConfig.
                 * @member {io.cucumber.messages.ISupportCodeConfig|null|undefined} supportCodeConfig
                 * @memberof io.cucumber.messages.CommandStart
                 * @instance
                 */
                CommandStart.prototype.supportCodeConfig = null;

                /**
                 * Creates a new CommandStart instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.CommandStart
                 * @static
                 * @param {io.cucumber.messages.ICommandStart=} [properties] Properties to set
                 * @returns {io.cucumber.messages.CommandStart} CommandStart instance
                 */
                CommandStart.create = function create(properties) {
                    return new CommandStart(properties);
                };

                /**
                 * Encodes the specified CommandStart message. Does not implicitly {@link io.cucumber.messages.CommandStart.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.CommandStart
                 * @static
                 * @param {io.cucumber.messages.ICommandStart} message CommandStart message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CommandStart.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.baseDirectory != null && message.hasOwnProperty("baseDirectory"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.baseDirectory);
                    if (message.sourcesConfig != null && message.hasOwnProperty("sourcesConfig"))
                        $root.io.cucumber.messages.SourcesConfig.encode(message.sourcesConfig, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.runtimeConfig != null && message.hasOwnProperty("runtimeConfig"))
                        $root.io.cucumber.messages.RuntimeConfig.encode(message.runtimeConfig, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.supportCodeConfig != null && message.hasOwnProperty("supportCodeConfig"))
                        $root.io.cucumber.messages.SupportCodeConfig.encode(message.supportCodeConfig, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified CommandStart message, length delimited. Does not implicitly {@link io.cucumber.messages.CommandStart.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.CommandStart
                 * @static
                 * @param {io.cucumber.messages.ICommandStart} message CommandStart message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CommandStart.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a CommandStart message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.CommandStart
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.CommandStart} CommandStart
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CommandStart.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.CommandStart();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 2:
                            message.baseDirectory = reader.string();
                            break;
                        case 3:
                            message.sourcesConfig = $root.io.cucumber.messages.SourcesConfig.decode(reader, reader.uint32());
                            break;
                        case 4:
                            message.runtimeConfig = $root.io.cucumber.messages.RuntimeConfig.decode(reader, reader.uint32());
                            break;
                        case 5:
                            message.supportCodeConfig = $root.io.cucumber.messages.SupportCodeConfig.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a CommandStart message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.CommandStart
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.CommandStart} CommandStart
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CommandStart.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a CommandStart message.
                 * @function verify
                 * @memberof io.cucumber.messages.CommandStart
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CommandStart.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.baseDirectory != null && message.hasOwnProperty("baseDirectory"))
                        if (!$util.isString(message.baseDirectory))
                            return "baseDirectory: string expected";
                    if (message.sourcesConfig != null && message.hasOwnProperty("sourcesConfig")) {
                        var error = $root.io.cucumber.messages.SourcesConfig.verify(message.sourcesConfig);
                        if (error)
                            return "sourcesConfig." + error;
                    }
                    if (message.runtimeConfig != null && message.hasOwnProperty("runtimeConfig")) {
                        var error = $root.io.cucumber.messages.RuntimeConfig.verify(message.runtimeConfig);
                        if (error)
                            return "runtimeConfig." + error;
                    }
                    if (message.supportCodeConfig != null && message.hasOwnProperty("supportCodeConfig")) {
                        var error = $root.io.cucumber.messages.SupportCodeConfig.verify(message.supportCodeConfig);
                        if (error)
                            return "supportCodeConfig." + error;
                    }
                    return null;
                };

                /**
                 * Creates a CommandStart message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.CommandStart
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.CommandStart} CommandStart
                 */
                CommandStart.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.CommandStart)
                        return object;
                    var message = new $root.io.cucumber.messages.CommandStart();
                    if (object.baseDirectory != null)
                        message.baseDirectory = String(object.baseDirectory);
                    if (object.sourcesConfig != null) {
                        if (typeof object.sourcesConfig !== "object")
                            throw TypeError(".io.cucumber.messages.CommandStart.sourcesConfig: object expected");
                        message.sourcesConfig = $root.io.cucumber.messages.SourcesConfig.fromObject(object.sourcesConfig);
                    }
                    if (object.runtimeConfig != null) {
                        if (typeof object.runtimeConfig !== "object")
                            throw TypeError(".io.cucumber.messages.CommandStart.runtimeConfig: object expected");
                        message.runtimeConfig = $root.io.cucumber.messages.RuntimeConfig.fromObject(object.runtimeConfig);
                    }
                    if (object.supportCodeConfig != null) {
                        if (typeof object.supportCodeConfig !== "object")
                            throw TypeError(".io.cucumber.messages.CommandStart.supportCodeConfig: object expected");
                        message.supportCodeConfig = $root.io.cucumber.messages.SupportCodeConfig.fromObject(object.supportCodeConfig);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a CommandStart message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.CommandStart
                 * @static
                 * @param {io.cucumber.messages.CommandStart} message CommandStart
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CommandStart.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.baseDirectory = "";
                        object.sourcesConfig = null;
                        object.runtimeConfig = null;
                        object.supportCodeConfig = null;
                    }
                    if (message.baseDirectory != null && message.hasOwnProperty("baseDirectory"))
                        object.baseDirectory = message.baseDirectory;
                    if (message.sourcesConfig != null && message.hasOwnProperty("sourcesConfig"))
                        object.sourcesConfig = $root.io.cucumber.messages.SourcesConfig.toObject(message.sourcesConfig, options);
                    if (message.runtimeConfig != null && message.hasOwnProperty("runtimeConfig"))
                        object.runtimeConfig = $root.io.cucumber.messages.RuntimeConfig.toObject(message.runtimeConfig, options);
                    if (message.supportCodeConfig != null && message.hasOwnProperty("supportCodeConfig"))
                        object.supportCodeConfig = $root.io.cucumber.messages.SupportCodeConfig.toObject(message.supportCodeConfig, options);
                    return object;
                };

                /**
                 * Converts this CommandStart to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.CommandStart
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CommandStart.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return CommandStart;
            })();

            messages.SourcesConfig = (function() {

                /**
                 * Properties of a SourcesConfig.
                 * @memberof io.cucumber.messages
                 * @interface ISourcesConfig
                 * @property {Array.<string>|null} [absolutePaths] SourcesConfig absolutePaths
                 * @property {string|null} [language] SourcesConfig language
                 * @property {io.cucumber.messages.ISourcesFilterConfig|null} [filters] SourcesConfig filters
                 * @property {io.cucumber.messages.ISourcesOrder|null} [order] SourcesConfig order
                 */

                /**
                 * Constructs a new SourcesConfig.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a SourcesConfig.
                 * @implements ISourcesConfig
                 * @constructor
                 * @param {io.cucumber.messages.ISourcesConfig=} [properties] Properties to set
                 */
                function SourcesConfig(properties) {
                    this.absolutePaths = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * SourcesConfig absolutePaths.
                 * @member {Array.<string>} absolutePaths
                 * @memberof io.cucumber.messages.SourcesConfig
                 * @instance
                 */
                SourcesConfig.prototype.absolutePaths = $util.emptyArray;

                /**
                 * SourcesConfig language.
                 * @member {string} language
                 * @memberof io.cucumber.messages.SourcesConfig
                 * @instance
                 */
                SourcesConfig.prototype.language = "";

                /**
                 * SourcesConfig filters.
                 * @member {io.cucumber.messages.ISourcesFilterConfig|null|undefined} filters
                 * @memberof io.cucumber.messages.SourcesConfig
                 * @instance
                 */
                SourcesConfig.prototype.filters = null;

                /**
                 * SourcesConfig order.
                 * @member {io.cucumber.messages.ISourcesOrder|null|undefined} order
                 * @memberof io.cucumber.messages.SourcesConfig
                 * @instance
                 */
                SourcesConfig.prototype.order = null;

                /**
                 * Creates a new SourcesConfig instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.SourcesConfig
                 * @static
                 * @param {io.cucumber.messages.ISourcesConfig=} [properties] Properties to set
                 * @returns {io.cucumber.messages.SourcesConfig} SourcesConfig instance
                 */
                SourcesConfig.create = function create(properties) {
                    return new SourcesConfig(properties);
                };

                /**
                 * Encodes the specified SourcesConfig message. Does not implicitly {@link io.cucumber.messages.SourcesConfig.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.SourcesConfig
                 * @static
                 * @param {io.cucumber.messages.ISourcesConfig} message SourcesConfig message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SourcesConfig.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.absolutePaths != null && message.absolutePaths.length)
                        for (var i = 0; i < message.absolutePaths.length; ++i)
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.absolutePaths[i]);
                    if (message.language != null && message.hasOwnProperty("language"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.language);
                    if (message.filters != null && message.hasOwnProperty("filters"))
                        $root.io.cucumber.messages.SourcesFilterConfig.encode(message.filters, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.order != null && message.hasOwnProperty("order"))
                        $root.io.cucumber.messages.SourcesOrder.encode(message.order, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified SourcesConfig message, length delimited. Does not implicitly {@link io.cucumber.messages.SourcesConfig.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.SourcesConfig
                 * @static
                 * @param {io.cucumber.messages.ISourcesConfig} message SourcesConfig message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SourcesConfig.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a SourcesConfig message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.SourcesConfig
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.SourcesConfig} SourcesConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SourcesConfig.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.SourcesConfig();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.absolutePaths && message.absolutePaths.length))
                                message.absolutePaths = [];
                            message.absolutePaths.push(reader.string());
                            break;
                        case 2:
                            message.language = reader.string();
                            break;
                        case 3:
                            message.filters = $root.io.cucumber.messages.SourcesFilterConfig.decode(reader, reader.uint32());
                            break;
                        case 4:
                            message.order = $root.io.cucumber.messages.SourcesOrder.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a SourcesConfig message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.SourcesConfig
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.SourcesConfig} SourcesConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SourcesConfig.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SourcesConfig message.
                 * @function verify
                 * @memberof io.cucumber.messages.SourcesConfig
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SourcesConfig.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.absolutePaths != null && message.hasOwnProperty("absolutePaths")) {
                        if (!Array.isArray(message.absolutePaths))
                            return "absolutePaths: array expected";
                        for (var i = 0; i < message.absolutePaths.length; ++i)
                            if (!$util.isString(message.absolutePaths[i]))
                                return "absolutePaths: string[] expected";
                    }
                    if (message.language != null && message.hasOwnProperty("language"))
                        if (!$util.isString(message.language))
                            return "language: string expected";
                    if (message.filters != null && message.hasOwnProperty("filters")) {
                        var error = $root.io.cucumber.messages.SourcesFilterConfig.verify(message.filters);
                        if (error)
                            return "filters." + error;
                    }
                    if (message.order != null && message.hasOwnProperty("order")) {
                        var error = $root.io.cucumber.messages.SourcesOrder.verify(message.order);
                        if (error)
                            return "order." + error;
                    }
                    return null;
                };

                /**
                 * Creates a SourcesConfig message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.SourcesConfig
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.SourcesConfig} SourcesConfig
                 */
                SourcesConfig.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.SourcesConfig)
                        return object;
                    var message = new $root.io.cucumber.messages.SourcesConfig();
                    if (object.absolutePaths) {
                        if (!Array.isArray(object.absolutePaths))
                            throw TypeError(".io.cucumber.messages.SourcesConfig.absolutePaths: array expected");
                        message.absolutePaths = [];
                        for (var i = 0; i < object.absolutePaths.length; ++i)
                            message.absolutePaths[i] = String(object.absolutePaths[i]);
                    }
                    if (object.language != null)
                        message.language = String(object.language);
                    if (object.filters != null) {
                        if (typeof object.filters !== "object")
                            throw TypeError(".io.cucumber.messages.SourcesConfig.filters: object expected");
                        message.filters = $root.io.cucumber.messages.SourcesFilterConfig.fromObject(object.filters);
                    }
                    if (object.order != null) {
                        if (typeof object.order !== "object")
                            throw TypeError(".io.cucumber.messages.SourcesConfig.order: object expected");
                        message.order = $root.io.cucumber.messages.SourcesOrder.fromObject(object.order);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a SourcesConfig message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.SourcesConfig
                 * @static
                 * @param {io.cucumber.messages.SourcesConfig} message SourcesConfig
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SourcesConfig.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.absolutePaths = [];
                    if (options.defaults) {
                        object.language = "";
                        object.filters = null;
                        object.order = null;
                    }
                    if (message.absolutePaths && message.absolutePaths.length) {
                        object.absolutePaths = [];
                        for (var j = 0; j < message.absolutePaths.length; ++j)
                            object.absolutePaths[j] = message.absolutePaths[j];
                    }
                    if (message.language != null && message.hasOwnProperty("language"))
                        object.language = message.language;
                    if (message.filters != null && message.hasOwnProperty("filters"))
                        object.filters = $root.io.cucumber.messages.SourcesFilterConfig.toObject(message.filters, options);
                    if (message.order != null && message.hasOwnProperty("order"))
                        object.order = $root.io.cucumber.messages.SourcesOrder.toObject(message.order, options);
                    return object;
                };

                /**
                 * Converts this SourcesConfig to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.SourcesConfig
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SourcesConfig.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return SourcesConfig;
            })();

            messages.SourcesFilterConfig = (function() {

                /**
                 * Properties of a SourcesFilterConfig.
                 * @memberof io.cucumber.messages
                 * @interface ISourcesFilterConfig
                 * @property {string|null} [tagExpression] SourcesFilterConfig tagExpression
                 * @property {Array.<string>|null} [nameRegularExpressions] SourcesFilterConfig nameRegularExpressions
                 * @property {Array.<io.cucumber.messages.IUriToLinesMapping>|null} [uriToLinesMapping] SourcesFilterConfig uriToLinesMapping
                 */

                /**
                 * Constructs a new SourcesFilterConfig.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a SourcesFilterConfig.
                 * @implements ISourcesFilterConfig
                 * @constructor
                 * @param {io.cucumber.messages.ISourcesFilterConfig=} [properties] Properties to set
                 */
                function SourcesFilterConfig(properties) {
                    this.nameRegularExpressions = [];
                    this.uriToLinesMapping = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * SourcesFilterConfig tagExpression.
                 * @member {string} tagExpression
                 * @memberof io.cucumber.messages.SourcesFilterConfig
                 * @instance
                 */
                SourcesFilterConfig.prototype.tagExpression = "";

                /**
                 * SourcesFilterConfig nameRegularExpressions.
                 * @member {Array.<string>} nameRegularExpressions
                 * @memberof io.cucumber.messages.SourcesFilterConfig
                 * @instance
                 */
                SourcesFilterConfig.prototype.nameRegularExpressions = $util.emptyArray;

                /**
                 * SourcesFilterConfig uriToLinesMapping.
                 * @member {Array.<io.cucumber.messages.IUriToLinesMapping>} uriToLinesMapping
                 * @memberof io.cucumber.messages.SourcesFilterConfig
                 * @instance
                 */
                SourcesFilterConfig.prototype.uriToLinesMapping = $util.emptyArray;

                /**
                 * Creates a new SourcesFilterConfig instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.SourcesFilterConfig
                 * @static
                 * @param {io.cucumber.messages.ISourcesFilterConfig=} [properties] Properties to set
                 * @returns {io.cucumber.messages.SourcesFilterConfig} SourcesFilterConfig instance
                 */
                SourcesFilterConfig.create = function create(properties) {
                    return new SourcesFilterConfig(properties);
                };

                /**
                 * Encodes the specified SourcesFilterConfig message. Does not implicitly {@link io.cucumber.messages.SourcesFilterConfig.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.SourcesFilterConfig
                 * @static
                 * @param {io.cucumber.messages.ISourcesFilterConfig} message SourcesFilterConfig message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SourcesFilterConfig.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.tagExpression != null && message.hasOwnProperty("tagExpression"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.tagExpression);
                    if (message.nameRegularExpressions != null && message.nameRegularExpressions.length)
                        for (var i = 0; i < message.nameRegularExpressions.length; ++i)
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.nameRegularExpressions[i]);
                    if (message.uriToLinesMapping != null && message.uriToLinesMapping.length)
                        for (var i = 0; i < message.uriToLinesMapping.length; ++i)
                            $root.io.cucumber.messages.UriToLinesMapping.encode(message.uriToLinesMapping[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified SourcesFilterConfig message, length delimited. Does not implicitly {@link io.cucumber.messages.SourcesFilterConfig.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.SourcesFilterConfig
                 * @static
                 * @param {io.cucumber.messages.ISourcesFilterConfig} message SourcesFilterConfig message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SourcesFilterConfig.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a SourcesFilterConfig message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.SourcesFilterConfig
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.SourcesFilterConfig} SourcesFilterConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SourcesFilterConfig.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.SourcesFilterConfig();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.tagExpression = reader.string();
                            break;
                        case 2:
                            if (!(message.nameRegularExpressions && message.nameRegularExpressions.length))
                                message.nameRegularExpressions = [];
                            message.nameRegularExpressions.push(reader.string());
                            break;
                        case 3:
                            if (!(message.uriToLinesMapping && message.uriToLinesMapping.length))
                                message.uriToLinesMapping = [];
                            message.uriToLinesMapping.push($root.io.cucumber.messages.UriToLinesMapping.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a SourcesFilterConfig message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.SourcesFilterConfig
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.SourcesFilterConfig} SourcesFilterConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SourcesFilterConfig.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SourcesFilterConfig message.
                 * @function verify
                 * @memberof io.cucumber.messages.SourcesFilterConfig
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SourcesFilterConfig.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.tagExpression != null && message.hasOwnProperty("tagExpression"))
                        if (!$util.isString(message.tagExpression))
                            return "tagExpression: string expected";
                    if (message.nameRegularExpressions != null && message.hasOwnProperty("nameRegularExpressions")) {
                        if (!Array.isArray(message.nameRegularExpressions))
                            return "nameRegularExpressions: array expected";
                        for (var i = 0; i < message.nameRegularExpressions.length; ++i)
                            if (!$util.isString(message.nameRegularExpressions[i]))
                                return "nameRegularExpressions: string[] expected";
                    }
                    if (message.uriToLinesMapping != null && message.hasOwnProperty("uriToLinesMapping")) {
                        if (!Array.isArray(message.uriToLinesMapping))
                            return "uriToLinesMapping: array expected";
                        for (var i = 0; i < message.uriToLinesMapping.length; ++i) {
                            var error = $root.io.cucumber.messages.UriToLinesMapping.verify(message.uriToLinesMapping[i]);
                            if (error)
                                return "uriToLinesMapping." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a SourcesFilterConfig message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.SourcesFilterConfig
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.SourcesFilterConfig} SourcesFilterConfig
                 */
                SourcesFilterConfig.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.SourcesFilterConfig)
                        return object;
                    var message = new $root.io.cucumber.messages.SourcesFilterConfig();
                    if (object.tagExpression != null)
                        message.tagExpression = String(object.tagExpression);
                    if (object.nameRegularExpressions) {
                        if (!Array.isArray(object.nameRegularExpressions))
                            throw TypeError(".io.cucumber.messages.SourcesFilterConfig.nameRegularExpressions: array expected");
                        message.nameRegularExpressions = [];
                        for (var i = 0; i < object.nameRegularExpressions.length; ++i)
                            message.nameRegularExpressions[i] = String(object.nameRegularExpressions[i]);
                    }
                    if (object.uriToLinesMapping) {
                        if (!Array.isArray(object.uriToLinesMapping))
                            throw TypeError(".io.cucumber.messages.SourcesFilterConfig.uriToLinesMapping: array expected");
                        message.uriToLinesMapping = [];
                        for (var i = 0; i < object.uriToLinesMapping.length; ++i) {
                            if (typeof object.uriToLinesMapping[i] !== "object")
                                throw TypeError(".io.cucumber.messages.SourcesFilterConfig.uriToLinesMapping: object expected");
                            message.uriToLinesMapping[i] = $root.io.cucumber.messages.UriToLinesMapping.fromObject(object.uriToLinesMapping[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a SourcesFilterConfig message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.SourcesFilterConfig
                 * @static
                 * @param {io.cucumber.messages.SourcesFilterConfig} message SourcesFilterConfig
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SourcesFilterConfig.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults) {
                        object.nameRegularExpressions = [];
                        object.uriToLinesMapping = [];
                    }
                    if (options.defaults)
                        object.tagExpression = "";
                    if (message.tagExpression != null && message.hasOwnProperty("tagExpression"))
                        object.tagExpression = message.tagExpression;
                    if (message.nameRegularExpressions && message.nameRegularExpressions.length) {
                        object.nameRegularExpressions = [];
                        for (var j = 0; j < message.nameRegularExpressions.length; ++j)
                            object.nameRegularExpressions[j] = message.nameRegularExpressions[j];
                    }
                    if (message.uriToLinesMapping && message.uriToLinesMapping.length) {
                        object.uriToLinesMapping = [];
                        for (var j = 0; j < message.uriToLinesMapping.length; ++j)
                            object.uriToLinesMapping[j] = $root.io.cucumber.messages.UriToLinesMapping.toObject(message.uriToLinesMapping[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this SourcesFilterConfig to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.SourcesFilterConfig
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SourcesFilterConfig.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return SourcesFilterConfig;
            })();

            messages.UriToLinesMapping = (function() {

                /**
                 * Properties of an UriToLinesMapping.
                 * @memberof io.cucumber.messages
                 * @interface IUriToLinesMapping
                 * @property {string|null} [absolutePath] UriToLinesMapping absolutePath
                 * @property {Array.<number|Long>|null} [lines] UriToLinesMapping lines
                 */

                /**
                 * Constructs a new UriToLinesMapping.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents an UriToLinesMapping.
                 * @implements IUriToLinesMapping
                 * @constructor
                 * @param {io.cucumber.messages.IUriToLinesMapping=} [properties] Properties to set
                 */
                function UriToLinesMapping(properties) {
                    this.lines = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * UriToLinesMapping absolutePath.
                 * @member {string} absolutePath
                 * @memberof io.cucumber.messages.UriToLinesMapping
                 * @instance
                 */
                UriToLinesMapping.prototype.absolutePath = "";

                /**
                 * UriToLinesMapping lines.
                 * @member {Array.<number|Long>} lines
                 * @memberof io.cucumber.messages.UriToLinesMapping
                 * @instance
                 */
                UriToLinesMapping.prototype.lines = $util.emptyArray;

                /**
                 * Creates a new UriToLinesMapping instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.UriToLinesMapping
                 * @static
                 * @param {io.cucumber.messages.IUriToLinesMapping=} [properties] Properties to set
                 * @returns {io.cucumber.messages.UriToLinesMapping} UriToLinesMapping instance
                 */
                UriToLinesMapping.create = function create(properties) {
                    return new UriToLinesMapping(properties);
                };

                /**
                 * Encodes the specified UriToLinesMapping message. Does not implicitly {@link io.cucumber.messages.UriToLinesMapping.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.UriToLinesMapping
                 * @static
                 * @param {io.cucumber.messages.IUriToLinesMapping} message UriToLinesMapping message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UriToLinesMapping.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.absolutePath != null && message.hasOwnProperty("absolutePath"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.absolutePath);
                    if (message.lines != null && message.lines.length) {
                        writer.uint32(/* id 2, wireType 2 =*/18).fork();
                        for (var i = 0; i < message.lines.length; ++i)
                            writer.uint64(message.lines[i]);
                        writer.ldelim();
                    }
                    return writer;
                };

                /**
                 * Encodes the specified UriToLinesMapping message, length delimited. Does not implicitly {@link io.cucumber.messages.UriToLinesMapping.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.UriToLinesMapping
                 * @static
                 * @param {io.cucumber.messages.IUriToLinesMapping} message UriToLinesMapping message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UriToLinesMapping.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an UriToLinesMapping message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.UriToLinesMapping
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.UriToLinesMapping} UriToLinesMapping
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UriToLinesMapping.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.UriToLinesMapping();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.absolutePath = reader.string();
                            break;
                        case 2:
                            if (!(message.lines && message.lines.length))
                                message.lines = [];
                            if ((tag & 7) === 2) {
                                var end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.lines.push(reader.uint64());
                            } else
                                message.lines.push(reader.uint64());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an UriToLinesMapping message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.UriToLinesMapping
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.UriToLinesMapping} UriToLinesMapping
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UriToLinesMapping.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an UriToLinesMapping message.
                 * @function verify
                 * @memberof io.cucumber.messages.UriToLinesMapping
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                UriToLinesMapping.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.absolutePath != null && message.hasOwnProperty("absolutePath"))
                        if (!$util.isString(message.absolutePath))
                            return "absolutePath: string expected";
                    if (message.lines != null && message.hasOwnProperty("lines")) {
                        if (!Array.isArray(message.lines))
                            return "lines: array expected";
                        for (var i = 0; i < message.lines.length; ++i)
                            if (!$util.isInteger(message.lines[i]) && !(message.lines[i] && $util.isInteger(message.lines[i].low) && $util.isInteger(message.lines[i].high)))
                                return "lines: integer|Long[] expected";
                    }
                    return null;
                };

                /**
                 * Creates an UriToLinesMapping message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.UriToLinesMapping
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.UriToLinesMapping} UriToLinesMapping
                 */
                UriToLinesMapping.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.UriToLinesMapping)
                        return object;
                    var message = new $root.io.cucumber.messages.UriToLinesMapping();
                    if (object.absolutePath != null)
                        message.absolutePath = String(object.absolutePath);
                    if (object.lines) {
                        if (!Array.isArray(object.lines))
                            throw TypeError(".io.cucumber.messages.UriToLinesMapping.lines: array expected");
                        message.lines = [];
                        for (var i = 0; i < object.lines.length; ++i)
                            if ($util.Long)
                                (message.lines[i] = $util.Long.fromValue(object.lines[i])).unsigned = true;
                            else if (typeof object.lines[i] === "string")
                                message.lines[i] = parseInt(object.lines[i], 10);
                            else if (typeof object.lines[i] === "number")
                                message.lines[i] = object.lines[i];
                            else if (typeof object.lines[i] === "object")
                                message.lines[i] = new $util.LongBits(object.lines[i].low >>> 0, object.lines[i].high >>> 0).toNumber(true);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an UriToLinesMapping message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.UriToLinesMapping
                 * @static
                 * @param {io.cucumber.messages.UriToLinesMapping} message UriToLinesMapping
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                UriToLinesMapping.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.lines = [];
                    if (options.defaults)
                        object.absolutePath = "";
                    if (message.absolutePath != null && message.hasOwnProperty("absolutePath"))
                        object.absolutePath = message.absolutePath;
                    if (message.lines && message.lines.length) {
                        object.lines = [];
                        for (var j = 0; j < message.lines.length; ++j)
                            if (typeof message.lines[j] === "number")
                                object.lines[j] = options.longs === String ? String(message.lines[j]) : message.lines[j];
                            else
                                object.lines[j] = options.longs === String ? $util.Long.prototype.toString.call(message.lines[j]) : options.longs === Number ? new $util.LongBits(message.lines[j].low >>> 0, message.lines[j].high >>> 0).toNumber(true) : message.lines[j];
                    }
                    return object;
                };

                /**
                 * Converts this UriToLinesMapping to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.UriToLinesMapping
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                UriToLinesMapping.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return UriToLinesMapping;
            })();

            messages.SourcesOrder = (function() {

                /**
                 * Properties of a SourcesOrder.
                 * @memberof io.cucumber.messages
                 * @interface ISourcesOrder
                 * @property {io.cucumber.messages.SourcesOrderType|null} [type] SourcesOrder type
                 * @property {number|Long|null} [seed] SourcesOrder seed
                 */

                /**
                 * Constructs a new SourcesOrder.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a SourcesOrder.
                 * @implements ISourcesOrder
                 * @constructor
                 * @param {io.cucumber.messages.ISourcesOrder=} [properties] Properties to set
                 */
                function SourcesOrder(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * SourcesOrder type.
                 * @member {io.cucumber.messages.SourcesOrderType} type
                 * @memberof io.cucumber.messages.SourcesOrder
                 * @instance
                 */
                SourcesOrder.prototype.type = 0;

                /**
                 * SourcesOrder seed.
                 * @member {number|Long} seed
                 * @memberof io.cucumber.messages.SourcesOrder
                 * @instance
                 */
                SourcesOrder.prototype.seed = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * Creates a new SourcesOrder instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.SourcesOrder
                 * @static
                 * @param {io.cucumber.messages.ISourcesOrder=} [properties] Properties to set
                 * @returns {io.cucumber.messages.SourcesOrder} SourcesOrder instance
                 */
                SourcesOrder.create = function create(properties) {
                    return new SourcesOrder(properties);
                };

                /**
                 * Encodes the specified SourcesOrder message. Does not implicitly {@link io.cucumber.messages.SourcesOrder.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.SourcesOrder
                 * @static
                 * @param {io.cucumber.messages.ISourcesOrder} message SourcesOrder message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SourcesOrder.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.type != null && message.hasOwnProperty("type"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                    if (message.seed != null && message.hasOwnProperty("seed"))
                        writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.seed);
                    return writer;
                };

                /**
                 * Encodes the specified SourcesOrder message, length delimited. Does not implicitly {@link io.cucumber.messages.SourcesOrder.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.SourcesOrder
                 * @static
                 * @param {io.cucumber.messages.ISourcesOrder} message SourcesOrder message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SourcesOrder.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a SourcesOrder message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.SourcesOrder
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.SourcesOrder} SourcesOrder
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SourcesOrder.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.SourcesOrder();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.type = reader.int32();
                            break;
                        case 2:
                            message.seed = reader.uint64();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a SourcesOrder message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.SourcesOrder
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.SourcesOrder} SourcesOrder
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SourcesOrder.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SourcesOrder message.
                 * @function verify
                 * @memberof io.cucumber.messages.SourcesOrder
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SourcesOrder.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.type != null && message.hasOwnProperty("type"))
                        switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 0:
                        case 1:
                            break;
                        }
                    if (message.seed != null && message.hasOwnProperty("seed"))
                        if (!$util.isInteger(message.seed) && !(message.seed && $util.isInteger(message.seed.low) && $util.isInteger(message.seed.high)))
                            return "seed: integer|Long expected";
                    return null;
                };

                /**
                 * Creates a SourcesOrder message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.SourcesOrder
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.SourcesOrder} SourcesOrder
                 */
                SourcesOrder.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.SourcesOrder)
                        return object;
                    var message = new $root.io.cucumber.messages.SourcesOrder();
                    switch (object.type) {
                    case "ORDER_OF_DEFINITION":
                    case 0:
                        message.type = 0;
                        break;
                    case "RANDOM":
                    case 1:
                        message.type = 1;
                        break;
                    }
                    if (object.seed != null)
                        if ($util.Long)
                            (message.seed = $util.Long.fromValue(object.seed)).unsigned = true;
                        else if (typeof object.seed === "string")
                            message.seed = parseInt(object.seed, 10);
                        else if (typeof object.seed === "number")
                            message.seed = object.seed;
                        else if (typeof object.seed === "object")
                            message.seed = new $util.LongBits(object.seed.low >>> 0, object.seed.high >>> 0).toNumber(true);
                    return message;
                };

                /**
                 * Creates a plain object from a SourcesOrder message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.SourcesOrder
                 * @static
                 * @param {io.cucumber.messages.SourcesOrder} message SourcesOrder
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SourcesOrder.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.type = options.enums === String ? "ORDER_OF_DEFINITION" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.seed = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.seed = options.longs === String ? "0" : 0;
                    }
                    if (message.type != null && message.hasOwnProperty("type"))
                        object.type = options.enums === String ? $root.io.cucumber.messages.SourcesOrderType[message.type] : message.type;
                    if (message.seed != null && message.hasOwnProperty("seed"))
                        if (typeof message.seed === "number")
                            object.seed = options.longs === String ? String(message.seed) : message.seed;
                        else
                            object.seed = options.longs === String ? $util.Long.prototype.toString.call(message.seed) : options.longs === Number ? new $util.LongBits(message.seed.low >>> 0, message.seed.high >>> 0).toNumber(true) : message.seed;
                    return object;
                };

                /**
                 * Converts this SourcesOrder to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.SourcesOrder
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SourcesOrder.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return SourcesOrder;
            })();

            /**
             * SourcesOrderType enum.
             * @name io.cucumber.messages.SourcesOrderType
             * @enum {string}
             * @property {number} ORDER_OF_DEFINITION=0 ORDER_OF_DEFINITION value
             * @property {number} RANDOM=1 RANDOM value
             */
            messages.SourcesOrderType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "ORDER_OF_DEFINITION"] = 0;
                values[valuesById[1] = "RANDOM"] = 1;
                return values;
            })();

            messages.RuntimeConfig = (function() {

                /**
                 * Properties of a RuntimeConfig.
                 * @memberof io.cucumber.messages
                 * @interface IRuntimeConfig
                 * @property {boolean|null} [isFailFast] RuntimeConfig isFailFast
                 * @property {boolean|null} [isDryRun] RuntimeConfig isDryRun
                 * @property {boolean|null} [isStrict] RuntimeConfig isStrict
                 * @property {number|Long|null} [maxParallel] RuntimeConfig maxParallel
                 */

                /**
                 * Constructs a new RuntimeConfig.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a RuntimeConfig.
                 * @implements IRuntimeConfig
                 * @constructor
                 * @param {io.cucumber.messages.IRuntimeConfig=} [properties] Properties to set
                 */
                function RuntimeConfig(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RuntimeConfig isFailFast.
                 * @member {boolean} isFailFast
                 * @memberof io.cucumber.messages.RuntimeConfig
                 * @instance
                 */
                RuntimeConfig.prototype.isFailFast = false;

                /**
                 * RuntimeConfig isDryRun.
                 * @member {boolean} isDryRun
                 * @memberof io.cucumber.messages.RuntimeConfig
                 * @instance
                 */
                RuntimeConfig.prototype.isDryRun = false;

                /**
                 * RuntimeConfig isStrict.
                 * @member {boolean} isStrict
                 * @memberof io.cucumber.messages.RuntimeConfig
                 * @instance
                 */
                RuntimeConfig.prototype.isStrict = false;

                /**
                 * RuntimeConfig maxParallel.
                 * @member {number|Long} maxParallel
                 * @memberof io.cucumber.messages.RuntimeConfig
                 * @instance
                 */
                RuntimeConfig.prototype.maxParallel = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * Creates a new RuntimeConfig instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.RuntimeConfig
                 * @static
                 * @param {io.cucumber.messages.IRuntimeConfig=} [properties] Properties to set
                 * @returns {io.cucumber.messages.RuntimeConfig} RuntimeConfig instance
                 */
                RuntimeConfig.create = function create(properties) {
                    return new RuntimeConfig(properties);
                };

                /**
                 * Encodes the specified RuntimeConfig message. Does not implicitly {@link io.cucumber.messages.RuntimeConfig.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.RuntimeConfig
                 * @static
                 * @param {io.cucumber.messages.IRuntimeConfig} message RuntimeConfig message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RuntimeConfig.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.isFailFast != null && message.hasOwnProperty("isFailFast"))
                        writer.uint32(/* id 1, wireType 0 =*/8).bool(message.isFailFast);
                    if (message.isDryRun != null && message.hasOwnProperty("isDryRun"))
                        writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isDryRun);
                    if (message.isStrict != null && message.hasOwnProperty("isStrict"))
                        writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isStrict);
                    if (message.maxParallel != null && message.hasOwnProperty("maxParallel"))
                        writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.maxParallel);
                    return writer;
                };

                /**
                 * Encodes the specified RuntimeConfig message, length delimited. Does not implicitly {@link io.cucumber.messages.RuntimeConfig.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.RuntimeConfig
                 * @static
                 * @param {io.cucumber.messages.IRuntimeConfig} message RuntimeConfig message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RuntimeConfig.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a RuntimeConfig message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.RuntimeConfig
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.RuntimeConfig} RuntimeConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RuntimeConfig.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.RuntimeConfig();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.isFailFast = reader.bool();
                            break;
                        case 2:
                            message.isDryRun = reader.bool();
                            break;
                        case 3:
                            message.isStrict = reader.bool();
                            break;
                        case 4:
                            message.maxParallel = reader.uint64();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a RuntimeConfig message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.RuntimeConfig
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.RuntimeConfig} RuntimeConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RuntimeConfig.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RuntimeConfig message.
                 * @function verify
                 * @memberof io.cucumber.messages.RuntimeConfig
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RuntimeConfig.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.isFailFast != null && message.hasOwnProperty("isFailFast"))
                        if (typeof message.isFailFast !== "boolean")
                            return "isFailFast: boolean expected";
                    if (message.isDryRun != null && message.hasOwnProperty("isDryRun"))
                        if (typeof message.isDryRun !== "boolean")
                            return "isDryRun: boolean expected";
                    if (message.isStrict != null && message.hasOwnProperty("isStrict"))
                        if (typeof message.isStrict !== "boolean")
                            return "isStrict: boolean expected";
                    if (message.maxParallel != null && message.hasOwnProperty("maxParallel"))
                        if (!$util.isInteger(message.maxParallel) && !(message.maxParallel && $util.isInteger(message.maxParallel.low) && $util.isInteger(message.maxParallel.high)))
                            return "maxParallel: integer|Long expected";
                    return null;
                };

                /**
                 * Creates a RuntimeConfig message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.RuntimeConfig
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.RuntimeConfig} RuntimeConfig
                 */
                RuntimeConfig.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.RuntimeConfig)
                        return object;
                    var message = new $root.io.cucumber.messages.RuntimeConfig();
                    if (object.isFailFast != null)
                        message.isFailFast = Boolean(object.isFailFast);
                    if (object.isDryRun != null)
                        message.isDryRun = Boolean(object.isDryRun);
                    if (object.isStrict != null)
                        message.isStrict = Boolean(object.isStrict);
                    if (object.maxParallel != null)
                        if ($util.Long)
                            (message.maxParallel = $util.Long.fromValue(object.maxParallel)).unsigned = true;
                        else if (typeof object.maxParallel === "string")
                            message.maxParallel = parseInt(object.maxParallel, 10);
                        else if (typeof object.maxParallel === "number")
                            message.maxParallel = object.maxParallel;
                        else if (typeof object.maxParallel === "object")
                            message.maxParallel = new $util.LongBits(object.maxParallel.low >>> 0, object.maxParallel.high >>> 0).toNumber(true);
                    return message;
                };

                /**
                 * Creates a plain object from a RuntimeConfig message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.RuntimeConfig
                 * @static
                 * @param {io.cucumber.messages.RuntimeConfig} message RuntimeConfig
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RuntimeConfig.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.isFailFast = false;
                        object.isDryRun = false;
                        object.isStrict = false;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.maxParallel = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.maxParallel = options.longs === String ? "0" : 0;
                    }
                    if (message.isFailFast != null && message.hasOwnProperty("isFailFast"))
                        object.isFailFast = message.isFailFast;
                    if (message.isDryRun != null && message.hasOwnProperty("isDryRun"))
                        object.isDryRun = message.isDryRun;
                    if (message.isStrict != null && message.hasOwnProperty("isStrict"))
                        object.isStrict = message.isStrict;
                    if (message.maxParallel != null && message.hasOwnProperty("maxParallel"))
                        if (typeof message.maxParallel === "number")
                            object.maxParallel = options.longs === String ? String(message.maxParallel) : message.maxParallel;
                        else
                            object.maxParallel = options.longs === String ? $util.Long.prototype.toString.call(message.maxParallel) : options.longs === Number ? new $util.LongBits(message.maxParallel.low >>> 0, message.maxParallel.high >>> 0).toNumber(true) : message.maxParallel;
                    return object;
                };

                /**
                 * Converts this RuntimeConfig to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.RuntimeConfig
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RuntimeConfig.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return RuntimeConfig;
            })();

            messages.SupportCodeConfig = (function() {

                /**
                 * Properties of a SupportCodeConfig.
                 * @memberof io.cucumber.messages
                 * @interface ISupportCodeConfig
                 * @property {Array.<io.cucumber.messages.ITestCaseHookDefinitionConfig>|null} [beforeTestCaseHookDefinitionConfigs] SupportCodeConfig beforeTestCaseHookDefinitionConfigs
                 * @property {Array.<io.cucumber.messages.ITestCaseHookDefinitionConfig>|null} [afterTestCaseHookDefinitionConfigs] SupportCodeConfig afterTestCaseHookDefinitionConfigs
                 * @property {Array.<io.cucumber.messages.IStepDefinitionConfig>|null} [stepDefinitionConfigs] SupportCodeConfig stepDefinitionConfigs
                 * @property {Array.<io.cucumber.messages.IParameterTypeConfig>|null} [parameterTypeConfigs] SupportCodeConfig parameterTypeConfigs
                 */

                /**
                 * Constructs a new SupportCodeConfig.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a SupportCodeConfig.
                 * @implements ISupportCodeConfig
                 * @constructor
                 * @param {io.cucumber.messages.ISupportCodeConfig=} [properties] Properties to set
                 */
                function SupportCodeConfig(properties) {
                    this.beforeTestCaseHookDefinitionConfigs = [];
                    this.afterTestCaseHookDefinitionConfigs = [];
                    this.stepDefinitionConfigs = [];
                    this.parameterTypeConfigs = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * SupportCodeConfig beforeTestCaseHookDefinitionConfigs.
                 * @member {Array.<io.cucumber.messages.ITestCaseHookDefinitionConfig>} beforeTestCaseHookDefinitionConfigs
                 * @memberof io.cucumber.messages.SupportCodeConfig
                 * @instance
                 */
                SupportCodeConfig.prototype.beforeTestCaseHookDefinitionConfigs = $util.emptyArray;

                /**
                 * SupportCodeConfig afterTestCaseHookDefinitionConfigs.
                 * @member {Array.<io.cucumber.messages.ITestCaseHookDefinitionConfig>} afterTestCaseHookDefinitionConfigs
                 * @memberof io.cucumber.messages.SupportCodeConfig
                 * @instance
                 */
                SupportCodeConfig.prototype.afterTestCaseHookDefinitionConfigs = $util.emptyArray;

                /**
                 * SupportCodeConfig stepDefinitionConfigs.
                 * @member {Array.<io.cucumber.messages.IStepDefinitionConfig>} stepDefinitionConfigs
                 * @memberof io.cucumber.messages.SupportCodeConfig
                 * @instance
                 */
                SupportCodeConfig.prototype.stepDefinitionConfigs = $util.emptyArray;

                /**
                 * SupportCodeConfig parameterTypeConfigs.
                 * @member {Array.<io.cucumber.messages.IParameterTypeConfig>} parameterTypeConfigs
                 * @memberof io.cucumber.messages.SupportCodeConfig
                 * @instance
                 */
                SupportCodeConfig.prototype.parameterTypeConfigs = $util.emptyArray;

                /**
                 * Creates a new SupportCodeConfig instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.SupportCodeConfig
                 * @static
                 * @param {io.cucumber.messages.ISupportCodeConfig=} [properties] Properties to set
                 * @returns {io.cucumber.messages.SupportCodeConfig} SupportCodeConfig instance
                 */
                SupportCodeConfig.create = function create(properties) {
                    return new SupportCodeConfig(properties);
                };

                /**
                 * Encodes the specified SupportCodeConfig message. Does not implicitly {@link io.cucumber.messages.SupportCodeConfig.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.SupportCodeConfig
                 * @static
                 * @param {io.cucumber.messages.ISupportCodeConfig} message SupportCodeConfig message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SupportCodeConfig.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.beforeTestCaseHookDefinitionConfigs != null && message.beforeTestCaseHookDefinitionConfigs.length)
                        for (var i = 0; i < message.beforeTestCaseHookDefinitionConfigs.length; ++i)
                            $root.io.cucumber.messages.TestCaseHookDefinitionConfig.encode(message.beforeTestCaseHookDefinitionConfigs[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.afterTestCaseHookDefinitionConfigs != null && message.afterTestCaseHookDefinitionConfigs.length)
                        for (var i = 0; i < message.afterTestCaseHookDefinitionConfigs.length; ++i)
                            $root.io.cucumber.messages.TestCaseHookDefinitionConfig.encode(message.afterTestCaseHookDefinitionConfigs[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.stepDefinitionConfigs != null && message.stepDefinitionConfigs.length)
                        for (var i = 0; i < message.stepDefinitionConfigs.length; ++i)
                            $root.io.cucumber.messages.StepDefinitionConfig.encode(message.stepDefinitionConfigs[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.parameterTypeConfigs != null && message.parameterTypeConfigs.length)
                        for (var i = 0; i < message.parameterTypeConfigs.length; ++i)
                            $root.io.cucumber.messages.ParameterTypeConfig.encode(message.parameterTypeConfigs[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified SupportCodeConfig message, length delimited. Does not implicitly {@link io.cucumber.messages.SupportCodeConfig.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.SupportCodeConfig
                 * @static
                 * @param {io.cucumber.messages.ISupportCodeConfig} message SupportCodeConfig message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SupportCodeConfig.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a SupportCodeConfig message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.SupportCodeConfig
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.SupportCodeConfig} SupportCodeConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SupportCodeConfig.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.SupportCodeConfig();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.beforeTestCaseHookDefinitionConfigs && message.beforeTestCaseHookDefinitionConfigs.length))
                                message.beforeTestCaseHookDefinitionConfigs = [];
                            message.beforeTestCaseHookDefinitionConfigs.push($root.io.cucumber.messages.TestCaseHookDefinitionConfig.decode(reader, reader.uint32()));
                            break;
                        case 2:
                            if (!(message.afterTestCaseHookDefinitionConfigs && message.afterTestCaseHookDefinitionConfigs.length))
                                message.afterTestCaseHookDefinitionConfigs = [];
                            message.afterTestCaseHookDefinitionConfigs.push($root.io.cucumber.messages.TestCaseHookDefinitionConfig.decode(reader, reader.uint32()));
                            break;
                        case 3:
                            if (!(message.stepDefinitionConfigs && message.stepDefinitionConfigs.length))
                                message.stepDefinitionConfigs = [];
                            message.stepDefinitionConfigs.push($root.io.cucumber.messages.StepDefinitionConfig.decode(reader, reader.uint32()));
                            break;
                        case 4:
                            if (!(message.parameterTypeConfigs && message.parameterTypeConfigs.length))
                                message.parameterTypeConfigs = [];
                            message.parameterTypeConfigs.push($root.io.cucumber.messages.ParameterTypeConfig.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a SupportCodeConfig message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.SupportCodeConfig
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.SupportCodeConfig} SupportCodeConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SupportCodeConfig.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SupportCodeConfig message.
                 * @function verify
                 * @memberof io.cucumber.messages.SupportCodeConfig
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SupportCodeConfig.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.beforeTestCaseHookDefinitionConfigs != null && message.hasOwnProperty("beforeTestCaseHookDefinitionConfigs")) {
                        if (!Array.isArray(message.beforeTestCaseHookDefinitionConfigs))
                            return "beforeTestCaseHookDefinitionConfigs: array expected";
                        for (var i = 0; i < message.beforeTestCaseHookDefinitionConfigs.length; ++i) {
                            var error = $root.io.cucumber.messages.TestCaseHookDefinitionConfig.verify(message.beforeTestCaseHookDefinitionConfigs[i]);
                            if (error)
                                return "beforeTestCaseHookDefinitionConfigs." + error;
                        }
                    }
                    if (message.afterTestCaseHookDefinitionConfigs != null && message.hasOwnProperty("afterTestCaseHookDefinitionConfigs")) {
                        if (!Array.isArray(message.afterTestCaseHookDefinitionConfigs))
                            return "afterTestCaseHookDefinitionConfigs: array expected";
                        for (var i = 0; i < message.afterTestCaseHookDefinitionConfigs.length; ++i) {
                            var error = $root.io.cucumber.messages.TestCaseHookDefinitionConfig.verify(message.afterTestCaseHookDefinitionConfigs[i]);
                            if (error)
                                return "afterTestCaseHookDefinitionConfigs." + error;
                        }
                    }
                    if (message.stepDefinitionConfigs != null && message.hasOwnProperty("stepDefinitionConfigs")) {
                        if (!Array.isArray(message.stepDefinitionConfigs))
                            return "stepDefinitionConfigs: array expected";
                        for (var i = 0; i < message.stepDefinitionConfigs.length; ++i) {
                            var error = $root.io.cucumber.messages.StepDefinitionConfig.verify(message.stepDefinitionConfigs[i]);
                            if (error)
                                return "stepDefinitionConfigs." + error;
                        }
                    }
                    if (message.parameterTypeConfigs != null && message.hasOwnProperty("parameterTypeConfigs")) {
                        if (!Array.isArray(message.parameterTypeConfigs))
                            return "parameterTypeConfigs: array expected";
                        for (var i = 0; i < message.parameterTypeConfigs.length; ++i) {
                            var error = $root.io.cucumber.messages.ParameterTypeConfig.verify(message.parameterTypeConfigs[i]);
                            if (error)
                                return "parameterTypeConfigs." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a SupportCodeConfig message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.SupportCodeConfig
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.SupportCodeConfig} SupportCodeConfig
                 */
                SupportCodeConfig.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.SupportCodeConfig)
                        return object;
                    var message = new $root.io.cucumber.messages.SupportCodeConfig();
                    if (object.beforeTestCaseHookDefinitionConfigs) {
                        if (!Array.isArray(object.beforeTestCaseHookDefinitionConfigs))
                            throw TypeError(".io.cucumber.messages.SupportCodeConfig.beforeTestCaseHookDefinitionConfigs: array expected");
                        message.beforeTestCaseHookDefinitionConfigs = [];
                        for (var i = 0; i < object.beforeTestCaseHookDefinitionConfigs.length; ++i) {
                            if (typeof object.beforeTestCaseHookDefinitionConfigs[i] !== "object")
                                throw TypeError(".io.cucumber.messages.SupportCodeConfig.beforeTestCaseHookDefinitionConfigs: object expected");
                            message.beforeTestCaseHookDefinitionConfigs[i] = $root.io.cucumber.messages.TestCaseHookDefinitionConfig.fromObject(object.beforeTestCaseHookDefinitionConfigs[i]);
                        }
                    }
                    if (object.afterTestCaseHookDefinitionConfigs) {
                        if (!Array.isArray(object.afterTestCaseHookDefinitionConfigs))
                            throw TypeError(".io.cucumber.messages.SupportCodeConfig.afterTestCaseHookDefinitionConfigs: array expected");
                        message.afterTestCaseHookDefinitionConfigs = [];
                        for (var i = 0; i < object.afterTestCaseHookDefinitionConfigs.length; ++i) {
                            if (typeof object.afterTestCaseHookDefinitionConfigs[i] !== "object")
                                throw TypeError(".io.cucumber.messages.SupportCodeConfig.afterTestCaseHookDefinitionConfigs: object expected");
                            message.afterTestCaseHookDefinitionConfigs[i] = $root.io.cucumber.messages.TestCaseHookDefinitionConfig.fromObject(object.afterTestCaseHookDefinitionConfigs[i]);
                        }
                    }
                    if (object.stepDefinitionConfigs) {
                        if (!Array.isArray(object.stepDefinitionConfigs))
                            throw TypeError(".io.cucumber.messages.SupportCodeConfig.stepDefinitionConfigs: array expected");
                        message.stepDefinitionConfigs = [];
                        for (var i = 0; i < object.stepDefinitionConfigs.length; ++i) {
                            if (typeof object.stepDefinitionConfigs[i] !== "object")
                                throw TypeError(".io.cucumber.messages.SupportCodeConfig.stepDefinitionConfigs: object expected");
                            message.stepDefinitionConfigs[i] = $root.io.cucumber.messages.StepDefinitionConfig.fromObject(object.stepDefinitionConfigs[i]);
                        }
                    }
                    if (object.parameterTypeConfigs) {
                        if (!Array.isArray(object.parameterTypeConfigs))
                            throw TypeError(".io.cucumber.messages.SupportCodeConfig.parameterTypeConfigs: array expected");
                        message.parameterTypeConfigs = [];
                        for (var i = 0; i < object.parameterTypeConfigs.length; ++i) {
                            if (typeof object.parameterTypeConfigs[i] !== "object")
                                throw TypeError(".io.cucumber.messages.SupportCodeConfig.parameterTypeConfigs: object expected");
                            message.parameterTypeConfigs[i] = $root.io.cucumber.messages.ParameterTypeConfig.fromObject(object.parameterTypeConfigs[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a SupportCodeConfig message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.SupportCodeConfig
                 * @static
                 * @param {io.cucumber.messages.SupportCodeConfig} message SupportCodeConfig
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SupportCodeConfig.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults) {
                        object.beforeTestCaseHookDefinitionConfigs = [];
                        object.afterTestCaseHookDefinitionConfigs = [];
                        object.stepDefinitionConfigs = [];
                        object.parameterTypeConfigs = [];
                    }
                    if (message.beforeTestCaseHookDefinitionConfigs && message.beforeTestCaseHookDefinitionConfigs.length) {
                        object.beforeTestCaseHookDefinitionConfigs = [];
                        for (var j = 0; j < message.beforeTestCaseHookDefinitionConfigs.length; ++j)
                            object.beforeTestCaseHookDefinitionConfigs[j] = $root.io.cucumber.messages.TestCaseHookDefinitionConfig.toObject(message.beforeTestCaseHookDefinitionConfigs[j], options);
                    }
                    if (message.afterTestCaseHookDefinitionConfigs && message.afterTestCaseHookDefinitionConfigs.length) {
                        object.afterTestCaseHookDefinitionConfigs = [];
                        for (var j = 0; j < message.afterTestCaseHookDefinitionConfigs.length; ++j)
                            object.afterTestCaseHookDefinitionConfigs[j] = $root.io.cucumber.messages.TestCaseHookDefinitionConfig.toObject(message.afterTestCaseHookDefinitionConfigs[j], options);
                    }
                    if (message.stepDefinitionConfigs && message.stepDefinitionConfigs.length) {
                        object.stepDefinitionConfigs = [];
                        for (var j = 0; j < message.stepDefinitionConfigs.length; ++j)
                            object.stepDefinitionConfigs[j] = $root.io.cucumber.messages.StepDefinitionConfig.toObject(message.stepDefinitionConfigs[j], options);
                    }
                    if (message.parameterTypeConfigs && message.parameterTypeConfigs.length) {
                        object.parameterTypeConfigs = [];
                        for (var j = 0; j < message.parameterTypeConfigs.length; ++j)
                            object.parameterTypeConfigs[j] = $root.io.cucumber.messages.ParameterTypeConfig.toObject(message.parameterTypeConfigs[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this SupportCodeConfig to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.SupportCodeConfig
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SupportCodeConfig.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return SupportCodeConfig;
            })();

            messages.TestCaseHookDefinitionConfig = (function() {

                /**
                 * Properties of a TestCaseHookDefinitionConfig.
                 * @memberof io.cucumber.messages
                 * @interface ITestCaseHookDefinitionConfig
                 * @property {string|null} [id] TestCaseHookDefinitionConfig id
                 * @property {string|null} [tagExpression] TestCaseHookDefinitionConfig tagExpression
                 * @property {io.cucumber.messages.ISourceReference|null} [location] TestCaseHookDefinitionConfig location
                 */

                /**
                 * Constructs a new TestCaseHookDefinitionConfig.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a TestCaseHookDefinitionConfig.
                 * @implements ITestCaseHookDefinitionConfig
                 * @constructor
                 * @param {io.cucumber.messages.ITestCaseHookDefinitionConfig=} [properties] Properties to set
                 */
                function TestCaseHookDefinitionConfig(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TestCaseHookDefinitionConfig id.
                 * @member {string} id
                 * @memberof io.cucumber.messages.TestCaseHookDefinitionConfig
                 * @instance
                 */
                TestCaseHookDefinitionConfig.prototype.id = "";

                /**
                 * TestCaseHookDefinitionConfig tagExpression.
                 * @member {string} tagExpression
                 * @memberof io.cucumber.messages.TestCaseHookDefinitionConfig
                 * @instance
                 */
                TestCaseHookDefinitionConfig.prototype.tagExpression = "";

                /**
                 * TestCaseHookDefinitionConfig location.
                 * @member {io.cucumber.messages.ISourceReference|null|undefined} location
                 * @memberof io.cucumber.messages.TestCaseHookDefinitionConfig
                 * @instance
                 */
                TestCaseHookDefinitionConfig.prototype.location = null;

                /**
                 * Creates a new TestCaseHookDefinitionConfig instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.TestCaseHookDefinitionConfig
                 * @static
                 * @param {io.cucumber.messages.ITestCaseHookDefinitionConfig=} [properties] Properties to set
                 * @returns {io.cucumber.messages.TestCaseHookDefinitionConfig} TestCaseHookDefinitionConfig instance
                 */
                TestCaseHookDefinitionConfig.create = function create(properties) {
                    return new TestCaseHookDefinitionConfig(properties);
                };

                /**
                 * Encodes the specified TestCaseHookDefinitionConfig message. Does not implicitly {@link io.cucumber.messages.TestCaseHookDefinitionConfig.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.TestCaseHookDefinitionConfig
                 * @static
                 * @param {io.cucumber.messages.ITestCaseHookDefinitionConfig} message TestCaseHookDefinitionConfig message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestCaseHookDefinitionConfig.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && message.hasOwnProperty("id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.tagExpression != null && message.hasOwnProperty("tagExpression"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.tagExpression);
                    if (message.location != null && message.hasOwnProperty("location"))
                        $root.io.cucumber.messages.SourceReference.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified TestCaseHookDefinitionConfig message, length delimited. Does not implicitly {@link io.cucumber.messages.TestCaseHookDefinitionConfig.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.TestCaseHookDefinitionConfig
                 * @static
                 * @param {io.cucumber.messages.ITestCaseHookDefinitionConfig} message TestCaseHookDefinitionConfig message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TestCaseHookDefinitionConfig.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TestCaseHookDefinitionConfig message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.TestCaseHookDefinitionConfig
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.TestCaseHookDefinitionConfig} TestCaseHookDefinitionConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestCaseHookDefinitionConfig.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.TestCaseHookDefinitionConfig();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.id = reader.string();
                            break;
                        case 2:
                            message.tagExpression = reader.string();
                            break;
                        case 3:
                            message.location = $root.io.cucumber.messages.SourceReference.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TestCaseHookDefinitionConfig message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.TestCaseHookDefinitionConfig
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.TestCaseHookDefinitionConfig} TestCaseHookDefinitionConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TestCaseHookDefinitionConfig.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TestCaseHookDefinitionConfig message.
                 * @function verify
                 * @memberof io.cucumber.messages.TestCaseHookDefinitionConfig
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TestCaseHookDefinitionConfig.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    if (message.tagExpression != null && message.hasOwnProperty("tagExpression"))
                        if (!$util.isString(message.tagExpression))
                            return "tagExpression: string expected";
                    if (message.location != null && message.hasOwnProperty("location")) {
                        var error = $root.io.cucumber.messages.SourceReference.verify(message.location);
                        if (error)
                            return "location." + error;
                    }
                    return null;
                };

                /**
                 * Creates a TestCaseHookDefinitionConfig message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.TestCaseHookDefinitionConfig
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.TestCaseHookDefinitionConfig} TestCaseHookDefinitionConfig
                 */
                TestCaseHookDefinitionConfig.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.TestCaseHookDefinitionConfig)
                        return object;
                    var message = new $root.io.cucumber.messages.TestCaseHookDefinitionConfig();
                    if (object.id != null)
                        message.id = String(object.id);
                    if (object.tagExpression != null)
                        message.tagExpression = String(object.tagExpression);
                    if (object.location != null) {
                        if (typeof object.location !== "object")
                            throw TypeError(".io.cucumber.messages.TestCaseHookDefinitionConfig.location: object expected");
                        message.location = $root.io.cucumber.messages.SourceReference.fromObject(object.location);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a TestCaseHookDefinitionConfig message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.TestCaseHookDefinitionConfig
                 * @static
                 * @param {io.cucumber.messages.TestCaseHookDefinitionConfig} message TestCaseHookDefinitionConfig
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TestCaseHookDefinitionConfig.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.id = "";
                        object.tagExpression = "";
                        object.location = null;
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.tagExpression != null && message.hasOwnProperty("tagExpression"))
                        object.tagExpression = message.tagExpression;
                    if (message.location != null && message.hasOwnProperty("location"))
                        object.location = $root.io.cucumber.messages.SourceReference.toObject(message.location, options);
                    return object;
                };

                /**
                 * Converts this TestCaseHookDefinitionConfig to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.TestCaseHookDefinitionConfig
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TestCaseHookDefinitionConfig.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return TestCaseHookDefinitionConfig;
            })();

            messages.StepDefinitionConfig = (function() {

                /**
                 * Properties of a StepDefinitionConfig.
                 * @memberof io.cucumber.messages
                 * @interface IStepDefinitionConfig
                 * @property {string|null} [id] StepDefinitionConfig id
                 * @property {io.cucumber.messages.IStepDefinitionPattern|null} [pattern] StepDefinitionConfig pattern
                 * @property {io.cucumber.messages.ISourceReference|null} [location] StepDefinitionConfig location
                 */

                /**
                 * Constructs a new StepDefinitionConfig.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a StepDefinitionConfig.
                 * @implements IStepDefinitionConfig
                 * @constructor
                 * @param {io.cucumber.messages.IStepDefinitionConfig=} [properties] Properties to set
                 */
                function StepDefinitionConfig(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * StepDefinitionConfig id.
                 * @member {string} id
                 * @memberof io.cucumber.messages.StepDefinitionConfig
                 * @instance
                 */
                StepDefinitionConfig.prototype.id = "";

                /**
                 * StepDefinitionConfig pattern.
                 * @member {io.cucumber.messages.IStepDefinitionPattern|null|undefined} pattern
                 * @memberof io.cucumber.messages.StepDefinitionConfig
                 * @instance
                 */
                StepDefinitionConfig.prototype.pattern = null;

                /**
                 * StepDefinitionConfig location.
                 * @member {io.cucumber.messages.ISourceReference|null|undefined} location
                 * @memberof io.cucumber.messages.StepDefinitionConfig
                 * @instance
                 */
                StepDefinitionConfig.prototype.location = null;

                /**
                 * Creates a new StepDefinitionConfig instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.StepDefinitionConfig
                 * @static
                 * @param {io.cucumber.messages.IStepDefinitionConfig=} [properties] Properties to set
                 * @returns {io.cucumber.messages.StepDefinitionConfig} StepDefinitionConfig instance
                 */
                StepDefinitionConfig.create = function create(properties) {
                    return new StepDefinitionConfig(properties);
                };

                /**
                 * Encodes the specified StepDefinitionConfig message. Does not implicitly {@link io.cucumber.messages.StepDefinitionConfig.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.StepDefinitionConfig
                 * @static
                 * @param {io.cucumber.messages.IStepDefinitionConfig} message StepDefinitionConfig message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StepDefinitionConfig.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && message.hasOwnProperty("id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.pattern != null && message.hasOwnProperty("pattern"))
                        $root.io.cucumber.messages.StepDefinitionPattern.encode(message.pattern, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.location != null && message.hasOwnProperty("location"))
                        $root.io.cucumber.messages.SourceReference.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified StepDefinitionConfig message, length delimited. Does not implicitly {@link io.cucumber.messages.StepDefinitionConfig.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.StepDefinitionConfig
                 * @static
                 * @param {io.cucumber.messages.IStepDefinitionConfig} message StepDefinitionConfig message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StepDefinitionConfig.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a StepDefinitionConfig message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.StepDefinitionConfig
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.StepDefinitionConfig} StepDefinitionConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StepDefinitionConfig.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.StepDefinitionConfig();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.id = reader.string();
                            break;
                        case 2:
                            message.pattern = $root.io.cucumber.messages.StepDefinitionPattern.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.location = $root.io.cucumber.messages.SourceReference.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a StepDefinitionConfig message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.StepDefinitionConfig
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.StepDefinitionConfig} StepDefinitionConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StepDefinitionConfig.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a StepDefinitionConfig message.
                 * @function verify
                 * @memberof io.cucumber.messages.StepDefinitionConfig
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                StepDefinitionConfig.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    if (message.pattern != null && message.hasOwnProperty("pattern")) {
                        var error = $root.io.cucumber.messages.StepDefinitionPattern.verify(message.pattern);
                        if (error)
                            return "pattern." + error;
                    }
                    if (message.location != null && message.hasOwnProperty("location")) {
                        var error = $root.io.cucumber.messages.SourceReference.verify(message.location);
                        if (error)
                            return "location." + error;
                    }
                    return null;
                };

                /**
                 * Creates a StepDefinitionConfig message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.StepDefinitionConfig
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.StepDefinitionConfig} StepDefinitionConfig
                 */
                StepDefinitionConfig.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.StepDefinitionConfig)
                        return object;
                    var message = new $root.io.cucumber.messages.StepDefinitionConfig();
                    if (object.id != null)
                        message.id = String(object.id);
                    if (object.pattern != null) {
                        if (typeof object.pattern !== "object")
                            throw TypeError(".io.cucumber.messages.StepDefinitionConfig.pattern: object expected");
                        message.pattern = $root.io.cucumber.messages.StepDefinitionPattern.fromObject(object.pattern);
                    }
                    if (object.location != null) {
                        if (typeof object.location !== "object")
                            throw TypeError(".io.cucumber.messages.StepDefinitionConfig.location: object expected");
                        message.location = $root.io.cucumber.messages.SourceReference.fromObject(object.location);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a StepDefinitionConfig message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.StepDefinitionConfig
                 * @static
                 * @param {io.cucumber.messages.StepDefinitionConfig} message StepDefinitionConfig
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                StepDefinitionConfig.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.id = "";
                        object.pattern = null;
                        object.location = null;
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.pattern != null && message.hasOwnProperty("pattern"))
                        object.pattern = $root.io.cucumber.messages.StepDefinitionPattern.toObject(message.pattern, options);
                    if (message.location != null && message.hasOwnProperty("location"))
                        object.location = $root.io.cucumber.messages.SourceReference.toObject(message.location, options);
                    return object;
                };

                /**
                 * Converts this StepDefinitionConfig to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.StepDefinitionConfig
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                StepDefinitionConfig.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return StepDefinitionConfig;
            })();

            messages.StepDefinitionPattern = (function() {

                /**
                 * Properties of a StepDefinitionPattern.
                 * @memberof io.cucumber.messages
                 * @interface IStepDefinitionPattern
                 * @property {string|null} [source] StepDefinitionPattern source
                 * @property {io.cucumber.messages.StepDefinitionPatternType|null} [type] StepDefinitionPattern type
                 */

                /**
                 * Constructs a new StepDefinitionPattern.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a StepDefinitionPattern.
                 * @implements IStepDefinitionPattern
                 * @constructor
                 * @param {io.cucumber.messages.IStepDefinitionPattern=} [properties] Properties to set
                 */
                function StepDefinitionPattern(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * StepDefinitionPattern source.
                 * @member {string} source
                 * @memberof io.cucumber.messages.StepDefinitionPattern
                 * @instance
                 */
                StepDefinitionPattern.prototype.source = "";

                /**
                 * StepDefinitionPattern type.
                 * @member {io.cucumber.messages.StepDefinitionPatternType} type
                 * @memberof io.cucumber.messages.StepDefinitionPattern
                 * @instance
                 */
                StepDefinitionPattern.prototype.type = 0;

                /**
                 * Creates a new StepDefinitionPattern instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.StepDefinitionPattern
                 * @static
                 * @param {io.cucumber.messages.IStepDefinitionPattern=} [properties] Properties to set
                 * @returns {io.cucumber.messages.StepDefinitionPattern} StepDefinitionPattern instance
                 */
                StepDefinitionPattern.create = function create(properties) {
                    return new StepDefinitionPattern(properties);
                };

                /**
                 * Encodes the specified StepDefinitionPattern message. Does not implicitly {@link io.cucumber.messages.StepDefinitionPattern.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.StepDefinitionPattern
                 * @static
                 * @param {io.cucumber.messages.IStepDefinitionPattern} message StepDefinitionPattern message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StepDefinitionPattern.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.source != null && message.hasOwnProperty("source"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.source);
                    if (message.type != null && message.hasOwnProperty("type"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                    return writer;
                };

                /**
                 * Encodes the specified StepDefinitionPattern message, length delimited. Does not implicitly {@link io.cucumber.messages.StepDefinitionPattern.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.StepDefinitionPattern
                 * @static
                 * @param {io.cucumber.messages.IStepDefinitionPattern} message StepDefinitionPattern message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StepDefinitionPattern.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a StepDefinitionPattern message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.StepDefinitionPattern
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.StepDefinitionPattern} StepDefinitionPattern
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StepDefinitionPattern.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.StepDefinitionPattern();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.source = reader.string();
                            break;
                        case 2:
                            message.type = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a StepDefinitionPattern message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.StepDefinitionPattern
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.StepDefinitionPattern} StepDefinitionPattern
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StepDefinitionPattern.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a StepDefinitionPattern message.
                 * @function verify
                 * @memberof io.cucumber.messages.StepDefinitionPattern
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                StepDefinitionPattern.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.source != null && message.hasOwnProperty("source"))
                        if (!$util.isString(message.source))
                            return "source: string expected";
                    if (message.type != null && message.hasOwnProperty("type"))
                        switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 0:
                        case 1:
                            break;
                        }
                    return null;
                };

                /**
                 * Creates a StepDefinitionPattern message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.StepDefinitionPattern
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.StepDefinitionPattern} StepDefinitionPattern
                 */
                StepDefinitionPattern.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.StepDefinitionPattern)
                        return object;
                    var message = new $root.io.cucumber.messages.StepDefinitionPattern();
                    if (object.source != null)
                        message.source = String(object.source);
                    switch (object.type) {
                    case "CUCUMBER_EXPRESSION":
                    case 0:
                        message.type = 0;
                        break;
                    case "REGULAR_EXPRESSION":
                    case 1:
                        message.type = 1;
                        break;
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a StepDefinitionPattern message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.StepDefinitionPattern
                 * @static
                 * @param {io.cucumber.messages.StepDefinitionPattern} message StepDefinitionPattern
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                StepDefinitionPattern.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.source = "";
                        object.type = options.enums === String ? "CUCUMBER_EXPRESSION" : 0;
                    }
                    if (message.source != null && message.hasOwnProperty("source"))
                        object.source = message.source;
                    if (message.type != null && message.hasOwnProperty("type"))
                        object.type = options.enums === String ? $root.io.cucumber.messages.StepDefinitionPatternType[message.type] : message.type;
                    return object;
                };

                /**
                 * Converts this StepDefinitionPattern to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.StepDefinitionPattern
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                StepDefinitionPattern.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return StepDefinitionPattern;
            })();

            /**
             * StepDefinitionPatternType enum.
             * @name io.cucumber.messages.StepDefinitionPatternType
             * @enum {string}
             * @property {number} CUCUMBER_EXPRESSION=0 CUCUMBER_EXPRESSION value
             * @property {number} REGULAR_EXPRESSION=1 REGULAR_EXPRESSION value
             */
            messages.StepDefinitionPatternType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "CUCUMBER_EXPRESSION"] = 0;
                values[valuesById[1] = "REGULAR_EXPRESSION"] = 1;
                return values;
            })();

            messages.ParameterTypeConfig = (function() {

                /**
                 * Properties of a ParameterTypeConfig.
                 * @memberof io.cucumber.messages
                 * @interface IParameterTypeConfig
                 * @property {string|null} [name] ParameterTypeConfig name
                 * @property {Array.<string>|null} [regularExpressions] ParameterTypeConfig regularExpressions
                 * @property {boolean|null} [preferForRegularExpressionMatch] ParameterTypeConfig preferForRegularExpressionMatch
                 * @property {boolean|null} [useForSnippets] ParameterTypeConfig useForSnippets
                 */

                /**
                 * Constructs a new ParameterTypeConfig.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a ParameterTypeConfig.
                 * @implements IParameterTypeConfig
                 * @constructor
                 * @param {io.cucumber.messages.IParameterTypeConfig=} [properties] Properties to set
                 */
                function ParameterTypeConfig(properties) {
                    this.regularExpressions = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ParameterTypeConfig name.
                 * @member {string} name
                 * @memberof io.cucumber.messages.ParameterTypeConfig
                 * @instance
                 */
                ParameterTypeConfig.prototype.name = "";

                /**
                 * ParameterTypeConfig regularExpressions.
                 * @member {Array.<string>} regularExpressions
                 * @memberof io.cucumber.messages.ParameterTypeConfig
                 * @instance
                 */
                ParameterTypeConfig.prototype.regularExpressions = $util.emptyArray;

                /**
                 * ParameterTypeConfig preferForRegularExpressionMatch.
                 * @member {boolean} preferForRegularExpressionMatch
                 * @memberof io.cucumber.messages.ParameterTypeConfig
                 * @instance
                 */
                ParameterTypeConfig.prototype.preferForRegularExpressionMatch = false;

                /**
                 * ParameterTypeConfig useForSnippets.
                 * @member {boolean} useForSnippets
                 * @memberof io.cucumber.messages.ParameterTypeConfig
                 * @instance
                 */
                ParameterTypeConfig.prototype.useForSnippets = false;

                /**
                 * Creates a new ParameterTypeConfig instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.ParameterTypeConfig
                 * @static
                 * @param {io.cucumber.messages.IParameterTypeConfig=} [properties] Properties to set
                 * @returns {io.cucumber.messages.ParameterTypeConfig} ParameterTypeConfig instance
                 */
                ParameterTypeConfig.create = function create(properties) {
                    return new ParameterTypeConfig(properties);
                };

                /**
                 * Encodes the specified ParameterTypeConfig message. Does not implicitly {@link io.cucumber.messages.ParameterTypeConfig.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.ParameterTypeConfig
                 * @static
                 * @param {io.cucumber.messages.IParameterTypeConfig} message ParameterTypeConfig message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ParameterTypeConfig.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.name != null && message.hasOwnProperty("name"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                    if (message.regularExpressions != null && message.regularExpressions.length)
                        for (var i = 0; i < message.regularExpressions.length; ++i)
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.regularExpressions[i]);
                    if (message.preferForRegularExpressionMatch != null && message.hasOwnProperty("preferForRegularExpressionMatch"))
                        writer.uint32(/* id 3, wireType 0 =*/24).bool(message.preferForRegularExpressionMatch);
                    if (message.useForSnippets != null && message.hasOwnProperty("useForSnippets"))
                        writer.uint32(/* id 4, wireType 0 =*/32).bool(message.useForSnippets);
                    return writer;
                };

                /**
                 * Encodes the specified ParameterTypeConfig message, length delimited. Does not implicitly {@link io.cucumber.messages.ParameterTypeConfig.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.ParameterTypeConfig
                 * @static
                 * @param {io.cucumber.messages.IParameterTypeConfig} message ParameterTypeConfig message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ParameterTypeConfig.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ParameterTypeConfig message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.ParameterTypeConfig
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.ParameterTypeConfig} ParameterTypeConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ParameterTypeConfig.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.ParameterTypeConfig();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.name = reader.string();
                            break;
                        case 2:
                            if (!(message.regularExpressions && message.regularExpressions.length))
                                message.regularExpressions = [];
                            message.regularExpressions.push(reader.string());
                            break;
                        case 3:
                            message.preferForRegularExpressionMatch = reader.bool();
                            break;
                        case 4:
                            message.useForSnippets = reader.bool();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ParameterTypeConfig message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.ParameterTypeConfig
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.ParameterTypeConfig} ParameterTypeConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ParameterTypeConfig.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ParameterTypeConfig message.
                 * @function verify
                 * @memberof io.cucumber.messages.ParameterTypeConfig
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ParameterTypeConfig.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.name != null && message.hasOwnProperty("name"))
                        if (!$util.isString(message.name))
                            return "name: string expected";
                    if (message.regularExpressions != null && message.hasOwnProperty("regularExpressions")) {
                        if (!Array.isArray(message.regularExpressions))
                            return "regularExpressions: array expected";
                        for (var i = 0; i < message.regularExpressions.length; ++i)
                            if (!$util.isString(message.regularExpressions[i]))
                                return "regularExpressions: string[] expected";
                    }
                    if (message.preferForRegularExpressionMatch != null && message.hasOwnProperty("preferForRegularExpressionMatch"))
                        if (typeof message.preferForRegularExpressionMatch !== "boolean")
                            return "preferForRegularExpressionMatch: boolean expected";
                    if (message.useForSnippets != null && message.hasOwnProperty("useForSnippets"))
                        if (typeof message.useForSnippets !== "boolean")
                            return "useForSnippets: boolean expected";
                    return null;
                };

                /**
                 * Creates a ParameterTypeConfig message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.ParameterTypeConfig
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.ParameterTypeConfig} ParameterTypeConfig
                 */
                ParameterTypeConfig.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.ParameterTypeConfig)
                        return object;
                    var message = new $root.io.cucumber.messages.ParameterTypeConfig();
                    if (object.name != null)
                        message.name = String(object.name);
                    if (object.regularExpressions) {
                        if (!Array.isArray(object.regularExpressions))
                            throw TypeError(".io.cucumber.messages.ParameterTypeConfig.regularExpressions: array expected");
                        message.regularExpressions = [];
                        for (var i = 0; i < object.regularExpressions.length; ++i)
                            message.regularExpressions[i] = String(object.regularExpressions[i]);
                    }
                    if (object.preferForRegularExpressionMatch != null)
                        message.preferForRegularExpressionMatch = Boolean(object.preferForRegularExpressionMatch);
                    if (object.useForSnippets != null)
                        message.useForSnippets = Boolean(object.useForSnippets);
                    return message;
                };

                /**
                 * Creates a plain object from a ParameterTypeConfig message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.ParameterTypeConfig
                 * @static
                 * @param {io.cucumber.messages.ParameterTypeConfig} message ParameterTypeConfig
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ParameterTypeConfig.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.regularExpressions = [];
                    if (options.defaults) {
                        object.name = "";
                        object.preferForRegularExpressionMatch = false;
                        object.useForSnippets = false;
                    }
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    if (message.regularExpressions && message.regularExpressions.length) {
                        object.regularExpressions = [];
                        for (var j = 0; j < message.regularExpressions.length; ++j)
                            object.regularExpressions[j] = message.regularExpressions[j];
                    }
                    if (message.preferForRegularExpressionMatch != null && message.hasOwnProperty("preferForRegularExpressionMatch"))
                        object.preferForRegularExpressionMatch = message.preferForRegularExpressionMatch;
                    if (message.useForSnippets != null && message.hasOwnProperty("useForSnippets"))
                        object.useForSnippets = message.useForSnippets;
                    return object;
                };

                /**
                 * Converts this ParameterTypeConfig to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.ParameterTypeConfig
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ParameterTypeConfig.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return ParameterTypeConfig;
            })();

            messages.CommandActionComplete = (function() {

                /**
                 * Properties of a CommandActionComplete.
                 * @memberof io.cucumber.messages
                 * @interface ICommandActionComplete
                 * @property {string|null} [completedId] CommandActionComplete completedId
                 * @property {io.cucumber.messages.ITestResult|null} [testResult] CommandActionComplete testResult
                 * @property {string|null} [snippet] CommandActionComplete snippet
                 */

                /**
                 * Constructs a new CommandActionComplete.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a CommandActionComplete.
                 * @implements ICommandActionComplete
                 * @constructor
                 * @param {io.cucumber.messages.ICommandActionComplete=} [properties] Properties to set
                 */
                function CommandActionComplete(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * CommandActionComplete completedId.
                 * @member {string} completedId
                 * @memberof io.cucumber.messages.CommandActionComplete
                 * @instance
                 */
                CommandActionComplete.prototype.completedId = "";

                /**
                 * CommandActionComplete testResult.
                 * @member {io.cucumber.messages.ITestResult|null|undefined} testResult
                 * @memberof io.cucumber.messages.CommandActionComplete
                 * @instance
                 */
                CommandActionComplete.prototype.testResult = null;

                /**
                 * CommandActionComplete snippet.
                 * @member {string} snippet
                 * @memberof io.cucumber.messages.CommandActionComplete
                 * @instance
                 */
                CommandActionComplete.prototype.snippet = "";

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * CommandActionComplete result.
                 * @member {"testResult"|"snippet"|undefined} result
                 * @memberof io.cucumber.messages.CommandActionComplete
                 * @instance
                 */
                Object.defineProperty(CommandActionComplete.prototype, "result", {
                    get: $util.oneOfGetter($oneOfFields = ["testResult", "snippet"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new CommandActionComplete instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.CommandActionComplete
                 * @static
                 * @param {io.cucumber.messages.ICommandActionComplete=} [properties] Properties to set
                 * @returns {io.cucumber.messages.CommandActionComplete} CommandActionComplete instance
                 */
                CommandActionComplete.create = function create(properties) {
                    return new CommandActionComplete(properties);
                };

                /**
                 * Encodes the specified CommandActionComplete message. Does not implicitly {@link io.cucumber.messages.CommandActionComplete.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.CommandActionComplete
                 * @static
                 * @param {io.cucumber.messages.ICommandActionComplete} message CommandActionComplete message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CommandActionComplete.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.completedId != null && message.hasOwnProperty("completedId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.completedId);
                    if (message.testResult != null && message.hasOwnProperty("testResult"))
                        $root.io.cucumber.messages.TestResult.encode(message.testResult, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.snippet != null && message.hasOwnProperty("snippet"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.snippet);
                    return writer;
                };

                /**
                 * Encodes the specified CommandActionComplete message, length delimited. Does not implicitly {@link io.cucumber.messages.CommandActionComplete.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.CommandActionComplete
                 * @static
                 * @param {io.cucumber.messages.ICommandActionComplete} message CommandActionComplete message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CommandActionComplete.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a CommandActionComplete message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.CommandActionComplete
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.CommandActionComplete} CommandActionComplete
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CommandActionComplete.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.CommandActionComplete();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.completedId = reader.string();
                            break;
                        case 2:
                            message.testResult = $root.io.cucumber.messages.TestResult.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.snippet = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a CommandActionComplete message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.CommandActionComplete
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.CommandActionComplete} CommandActionComplete
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CommandActionComplete.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a CommandActionComplete message.
                 * @function verify
                 * @memberof io.cucumber.messages.CommandActionComplete
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CommandActionComplete.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.completedId != null && message.hasOwnProperty("completedId"))
                        if (!$util.isString(message.completedId))
                            return "completedId: string expected";
                    if (message.testResult != null && message.hasOwnProperty("testResult")) {
                        properties.result = 1;
                        {
                            var error = $root.io.cucumber.messages.TestResult.verify(message.testResult);
                            if (error)
                                return "testResult." + error;
                        }
                    }
                    if (message.snippet != null && message.hasOwnProperty("snippet")) {
                        if (properties.result === 1)
                            return "result: multiple values";
                        properties.result = 1;
                        if (!$util.isString(message.snippet))
                            return "snippet: string expected";
                    }
                    return null;
                };

                /**
                 * Creates a CommandActionComplete message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.CommandActionComplete
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.CommandActionComplete} CommandActionComplete
                 */
                CommandActionComplete.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.CommandActionComplete)
                        return object;
                    var message = new $root.io.cucumber.messages.CommandActionComplete();
                    if (object.completedId != null)
                        message.completedId = String(object.completedId);
                    if (object.testResult != null) {
                        if (typeof object.testResult !== "object")
                            throw TypeError(".io.cucumber.messages.CommandActionComplete.testResult: object expected");
                        message.testResult = $root.io.cucumber.messages.TestResult.fromObject(object.testResult);
                    }
                    if (object.snippet != null)
                        message.snippet = String(object.snippet);
                    return message;
                };

                /**
                 * Creates a plain object from a CommandActionComplete message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.CommandActionComplete
                 * @static
                 * @param {io.cucumber.messages.CommandActionComplete} message CommandActionComplete
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CommandActionComplete.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.completedId = "";
                    if (message.completedId != null && message.hasOwnProperty("completedId"))
                        object.completedId = message.completedId;
                    if (message.testResult != null && message.hasOwnProperty("testResult")) {
                        object.testResult = $root.io.cucumber.messages.TestResult.toObject(message.testResult, options);
                        if (options.oneofs)
                            object.result = "testResult";
                    }
                    if (message.snippet != null && message.hasOwnProperty("snippet")) {
                        object.snippet = message.snippet;
                        if (options.oneofs)
                            object.result = "snippet";
                    }
                    return object;
                };

                /**
                 * Converts this CommandActionComplete to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.CommandActionComplete
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CommandActionComplete.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return CommandActionComplete;
            })();

            messages.CommandRunBeforeTestRunHooks = (function() {

                /**
                 * Properties of a CommandRunBeforeTestRunHooks.
                 * @memberof io.cucumber.messages
                 * @interface ICommandRunBeforeTestRunHooks
                 * @property {string|null} [actionId] CommandRunBeforeTestRunHooks actionId
                 */

                /**
                 * Constructs a new CommandRunBeforeTestRunHooks.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a CommandRunBeforeTestRunHooks.
                 * @implements ICommandRunBeforeTestRunHooks
                 * @constructor
                 * @param {io.cucumber.messages.ICommandRunBeforeTestRunHooks=} [properties] Properties to set
                 */
                function CommandRunBeforeTestRunHooks(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * CommandRunBeforeTestRunHooks actionId.
                 * @member {string} actionId
                 * @memberof io.cucumber.messages.CommandRunBeforeTestRunHooks
                 * @instance
                 */
                CommandRunBeforeTestRunHooks.prototype.actionId = "";

                /**
                 * Creates a new CommandRunBeforeTestRunHooks instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.CommandRunBeforeTestRunHooks
                 * @static
                 * @param {io.cucumber.messages.ICommandRunBeforeTestRunHooks=} [properties] Properties to set
                 * @returns {io.cucumber.messages.CommandRunBeforeTestRunHooks} CommandRunBeforeTestRunHooks instance
                 */
                CommandRunBeforeTestRunHooks.create = function create(properties) {
                    return new CommandRunBeforeTestRunHooks(properties);
                };

                /**
                 * Encodes the specified CommandRunBeforeTestRunHooks message. Does not implicitly {@link io.cucumber.messages.CommandRunBeforeTestRunHooks.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.CommandRunBeforeTestRunHooks
                 * @static
                 * @param {io.cucumber.messages.ICommandRunBeforeTestRunHooks} message CommandRunBeforeTestRunHooks message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CommandRunBeforeTestRunHooks.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.actionId);
                    return writer;
                };

                /**
                 * Encodes the specified CommandRunBeforeTestRunHooks message, length delimited. Does not implicitly {@link io.cucumber.messages.CommandRunBeforeTestRunHooks.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.CommandRunBeforeTestRunHooks
                 * @static
                 * @param {io.cucumber.messages.ICommandRunBeforeTestRunHooks} message CommandRunBeforeTestRunHooks message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CommandRunBeforeTestRunHooks.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a CommandRunBeforeTestRunHooks message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.CommandRunBeforeTestRunHooks
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.CommandRunBeforeTestRunHooks} CommandRunBeforeTestRunHooks
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CommandRunBeforeTestRunHooks.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.CommandRunBeforeTestRunHooks();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.actionId = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a CommandRunBeforeTestRunHooks message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.CommandRunBeforeTestRunHooks
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.CommandRunBeforeTestRunHooks} CommandRunBeforeTestRunHooks
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CommandRunBeforeTestRunHooks.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a CommandRunBeforeTestRunHooks message.
                 * @function verify
                 * @memberof io.cucumber.messages.CommandRunBeforeTestRunHooks
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CommandRunBeforeTestRunHooks.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        if (!$util.isString(message.actionId))
                            return "actionId: string expected";
                    return null;
                };

                /**
                 * Creates a CommandRunBeforeTestRunHooks message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.CommandRunBeforeTestRunHooks
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.CommandRunBeforeTestRunHooks} CommandRunBeforeTestRunHooks
                 */
                CommandRunBeforeTestRunHooks.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.CommandRunBeforeTestRunHooks)
                        return object;
                    var message = new $root.io.cucumber.messages.CommandRunBeforeTestRunHooks();
                    if (object.actionId != null)
                        message.actionId = String(object.actionId);
                    return message;
                };

                /**
                 * Creates a plain object from a CommandRunBeforeTestRunHooks message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.CommandRunBeforeTestRunHooks
                 * @static
                 * @param {io.cucumber.messages.CommandRunBeforeTestRunHooks} message CommandRunBeforeTestRunHooks
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CommandRunBeforeTestRunHooks.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.actionId = "";
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        object.actionId = message.actionId;
                    return object;
                };

                /**
                 * Converts this CommandRunBeforeTestRunHooks to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.CommandRunBeforeTestRunHooks
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CommandRunBeforeTestRunHooks.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return CommandRunBeforeTestRunHooks;
            })();

            messages.CommandRunAfterTestRunHooks = (function() {

                /**
                 * Properties of a CommandRunAfterTestRunHooks.
                 * @memberof io.cucumber.messages
                 * @interface ICommandRunAfterTestRunHooks
                 * @property {string|null} [actionId] CommandRunAfterTestRunHooks actionId
                 */

                /**
                 * Constructs a new CommandRunAfterTestRunHooks.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a CommandRunAfterTestRunHooks.
                 * @implements ICommandRunAfterTestRunHooks
                 * @constructor
                 * @param {io.cucumber.messages.ICommandRunAfterTestRunHooks=} [properties] Properties to set
                 */
                function CommandRunAfterTestRunHooks(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * CommandRunAfterTestRunHooks actionId.
                 * @member {string} actionId
                 * @memberof io.cucumber.messages.CommandRunAfterTestRunHooks
                 * @instance
                 */
                CommandRunAfterTestRunHooks.prototype.actionId = "";

                /**
                 * Creates a new CommandRunAfterTestRunHooks instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.CommandRunAfterTestRunHooks
                 * @static
                 * @param {io.cucumber.messages.ICommandRunAfterTestRunHooks=} [properties] Properties to set
                 * @returns {io.cucumber.messages.CommandRunAfterTestRunHooks} CommandRunAfterTestRunHooks instance
                 */
                CommandRunAfterTestRunHooks.create = function create(properties) {
                    return new CommandRunAfterTestRunHooks(properties);
                };

                /**
                 * Encodes the specified CommandRunAfterTestRunHooks message. Does not implicitly {@link io.cucumber.messages.CommandRunAfterTestRunHooks.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.CommandRunAfterTestRunHooks
                 * @static
                 * @param {io.cucumber.messages.ICommandRunAfterTestRunHooks} message CommandRunAfterTestRunHooks message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CommandRunAfterTestRunHooks.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.actionId);
                    return writer;
                };

                /**
                 * Encodes the specified CommandRunAfterTestRunHooks message, length delimited. Does not implicitly {@link io.cucumber.messages.CommandRunAfterTestRunHooks.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.CommandRunAfterTestRunHooks
                 * @static
                 * @param {io.cucumber.messages.ICommandRunAfterTestRunHooks} message CommandRunAfterTestRunHooks message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CommandRunAfterTestRunHooks.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a CommandRunAfterTestRunHooks message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.CommandRunAfterTestRunHooks
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.CommandRunAfterTestRunHooks} CommandRunAfterTestRunHooks
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CommandRunAfterTestRunHooks.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.CommandRunAfterTestRunHooks();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.actionId = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a CommandRunAfterTestRunHooks message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.CommandRunAfterTestRunHooks
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.CommandRunAfterTestRunHooks} CommandRunAfterTestRunHooks
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CommandRunAfterTestRunHooks.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a CommandRunAfterTestRunHooks message.
                 * @function verify
                 * @memberof io.cucumber.messages.CommandRunAfterTestRunHooks
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CommandRunAfterTestRunHooks.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        if (!$util.isString(message.actionId))
                            return "actionId: string expected";
                    return null;
                };

                /**
                 * Creates a CommandRunAfterTestRunHooks message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.CommandRunAfterTestRunHooks
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.CommandRunAfterTestRunHooks} CommandRunAfterTestRunHooks
                 */
                CommandRunAfterTestRunHooks.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.CommandRunAfterTestRunHooks)
                        return object;
                    var message = new $root.io.cucumber.messages.CommandRunAfterTestRunHooks();
                    if (object.actionId != null)
                        message.actionId = String(object.actionId);
                    return message;
                };

                /**
                 * Creates a plain object from a CommandRunAfterTestRunHooks message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.CommandRunAfterTestRunHooks
                 * @static
                 * @param {io.cucumber.messages.CommandRunAfterTestRunHooks} message CommandRunAfterTestRunHooks
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CommandRunAfterTestRunHooks.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.actionId = "";
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        object.actionId = message.actionId;
                    return object;
                };

                /**
                 * Converts this CommandRunAfterTestRunHooks to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.CommandRunAfterTestRunHooks
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CommandRunAfterTestRunHooks.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return CommandRunAfterTestRunHooks;
            })();

            messages.CommandInitializeTestCase = (function() {

                /**
                 * Properties of a CommandInitializeTestCase.
                 * @memberof io.cucumber.messages
                 * @interface ICommandInitializeTestCase
                 * @property {string|null} [actionId] CommandInitializeTestCase actionId
                 * @property {io.cucumber.messages.IPickle|null} [pickle] CommandInitializeTestCase pickle
                 */

                /**
                 * Constructs a new CommandInitializeTestCase.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a CommandInitializeTestCase.
                 * @implements ICommandInitializeTestCase
                 * @constructor
                 * @param {io.cucumber.messages.ICommandInitializeTestCase=} [properties] Properties to set
                 */
                function CommandInitializeTestCase(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * CommandInitializeTestCase actionId.
                 * @member {string} actionId
                 * @memberof io.cucumber.messages.CommandInitializeTestCase
                 * @instance
                 */
                CommandInitializeTestCase.prototype.actionId = "";

                /**
                 * CommandInitializeTestCase pickle.
                 * @member {io.cucumber.messages.IPickle|null|undefined} pickle
                 * @memberof io.cucumber.messages.CommandInitializeTestCase
                 * @instance
                 */
                CommandInitializeTestCase.prototype.pickle = null;

                /**
                 * Creates a new CommandInitializeTestCase instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.CommandInitializeTestCase
                 * @static
                 * @param {io.cucumber.messages.ICommandInitializeTestCase=} [properties] Properties to set
                 * @returns {io.cucumber.messages.CommandInitializeTestCase} CommandInitializeTestCase instance
                 */
                CommandInitializeTestCase.create = function create(properties) {
                    return new CommandInitializeTestCase(properties);
                };

                /**
                 * Encodes the specified CommandInitializeTestCase message. Does not implicitly {@link io.cucumber.messages.CommandInitializeTestCase.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.CommandInitializeTestCase
                 * @static
                 * @param {io.cucumber.messages.ICommandInitializeTestCase} message CommandInitializeTestCase message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CommandInitializeTestCase.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.actionId);
                    if (message.pickle != null && message.hasOwnProperty("pickle"))
                        $root.io.cucumber.messages.Pickle.encode(message.pickle, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified CommandInitializeTestCase message, length delimited. Does not implicitly {@link io.cucumber.messages.CommandInitializeTestCase.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.CommandInitializeTestCase
                 * @static
                 * @param {io.cucumber.messages.ICommandInitializeTestCase} message CommandInitializeTestCase message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CommandInitializeTestCase.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a CommandInitializeTestCase message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.CommandInitializeTestCase
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.CommandInitializeTestCase} CommandInitializeTestCase
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CommandInitializeTestCase.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.CommandInitializeTestCase();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.actionId = reader.string();
                            break;
                        case 3:
                            message.pickle = $root.io.cucumber.messages.Pickle.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a CommandInitializeTestCase message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.CommandInitializeTestCase
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.CommandInitializeTestCase} CommandInitializeTestCase
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CommandInitializeTestCase.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a CommandInitializeTestCase message.
                 * @function verify
                 * @memberof io.cucumber.messages.CommandInitializeTestCase
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CommandInitializeTestCase.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        if (!$util.isString(message.actionId))
                            return "actionId: string expected";
                    if (message.pickle != null && message.hasOwnProperty("pickle")) {
                        var error = $root.io.cucumber.messages.Pickle.verify(message.pickle);
                        if (error)
                            return "pickle." + error;
                    }
                    return null;
                };

                /**
                 * Creates a CommandInitializeTestCase message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.CommandInitializeTestCase
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.CommandInitializeTestCase} CommandInitializeTestCase
                 */
                CommandInitializeTestCase.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.CommandInitializeTestCase)
                        return object;
                    var message = new $root.io.cucumber.messages.CommandInitializeTestCase();
                    if (object.actionId != null)
                        message.actionId = String(object.actionId);
                    if (object.pickle != null) {
                        if (typeof object.pickle !== "object")
                            throw TypeError(".io.cucumber.messages.CommandInitializeTestCase.pickle: object expected");
                        message.pickle = $root.io.cucumber.messages.Pickle.fromObject(object.pickle);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a CommandInitializeTestCase message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.CommandInitializeTestCase
                 * @static
                 * @param {io.cucumber.messages.CommandInitializeTestCase} message CommandInitializeTestCase
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CommandInitializeTestCase.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.actionId = "";
                        object.pickle = null;
                    }
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        object.actionId = message.actionId;
                    if (message.pickle != null && message.hasOwnProperty("pickle"))
                        object.pickle = $root.io.cucumber.messages.Pickle.toObject(message.pickle, options);
                    return object;
                };

                /**
                 * Converts this CommandInitializeTestCase to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.CommandInitializeTestCase
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CommandInitializeTestCase.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return CommandInitializeTestCase;
            })();

            messages.CommandRunBeforeTestCaseHook = (function() {

                /**
                 * Properties of a CommandRunBeforeTestCaseHook.
                 * @memberof io.cucumber.messages
                 * @interface ICommandRunBeforeTestCaseHook
                 * @property {string|null} [actionId] CommandRunBeforeTestCaseHook actionId
                 * @property {string|null} [testCaseHookDefinitionId] CommandRunBeforeTestCaseHook testCaseHookDefinitionId
                 * @property {string|null} [pickleId] CommandRunBeforeTestCaseHook pickleId
                 */

                /**
                 * Constructs a new CommandRunBeforeTestCaseHook.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a CommandRunBeforeTestCaseHook.
                 * @implements ICommandRunBeforeTestCaseHook
                 * @constructor
                 * @param {io.cucumber.messages.ICommandRunBeforeTestCaseHook=} [properties] Properties to set
                 */
                function CommandRunBeforeTestCaseHook(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * CommandRunBeforeTestCaseHook actionId.
                 * @member {string} actionId
                 * @memberof io.cucumber.messages.CommandRunBeforeTestCaseHook
                 * @instance
                 */
                CommandRunBeforeTestCaseHook.prototype.actionId = "";

                /**
                 * CommandRunBeforeTestCaseHook testCaseHookDefinitionId.
                 * @member {string} testCaseHookDefinitionId
                 * @memberof io.cucumber.messages.CommandRunBeforeTestCaseHook
                 * @instance
                 */
                CommandRunBeforeTestCaseHook.prototype.testCaseHookDefinitionId = "";

                /**
                 * CommandRunBeforeTestCaseHook pickleId.
                 * @member {string} pickleId
                 * @memberof io.cucumber.messages.CommandRunBeforeTestCaseHook
                 * @instance
                 */
                CommandRunBeforeTestCaseHook.prototype.pickleId = "";

                /**
                 * Creates a new CommandRunBeforeTestCaseHook instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.CommandRunBeforeTestCaseHook
                 * @static
                 * @param {io.cucumber.messages.ICommandRunBeforeTestCaseHook=} [properties] Properties to set
                 * @returns {io.cucumber.messages.CommandRunBeforeTestCaseHook} CommandRunBeforeTestCaseHook instance
                 */
                CommandRunBeforeTestCaseHook.create = function create(properties) {
                    return new CommandRunBeforeTestCaseHook(properties);
                };

                /**
                 * Encodes the specified CommandRunBeforeTestCaseHook message. Does not implicitly {@link io.cucumber.messages.CommandRunBeforeTestCaseHook.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.CommandRunBeforeTestCaseHook
                 * @static
                 * @param {io.cucumber.messages.ICommandRunBeforeTestCaseHook} message CommandRunBeforeTestCaseHook message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CommandRunBeforeTestCaseHook.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.actionId);
                    if (message.testCaseHookDefinitionId != null && message.hasOwnProperty("testCaseHookDefinitionId"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.testCaseHookDefinitionId);
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.pickleId);
                    return writer;
                };

                /**
                 * Encodes the specified CommandRunBeforeTestCaseHook message, length delimited. Does not implicitly {@link io.cucumber.messages.CommandRunBeforeTestCaseHook.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.CommandRunBeforeTestCaseHook
                 * @static
                 * @param {io.cucumber.messages.ICommandRunBeforeTestCaseHook} message CommandRunBeforeTestCaseHook message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CommandRunBeforeTestCaseHook.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a CommandRunBeforeTestCaseHook message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.CommandRunBeforeTestCaseHook
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.CommandRunBeforeTestCaseHook} CommandRunBeforeTestCaseHook
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CommandRunBeforeTestCaseHook.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.CommandRunBeforeTestCaseHook();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.actionId = reader.string();
                            break;
                        case 3:
                            message.testCaseHookDefinitionId = reader.string();
                            break;
                        case 4:
                            message.pickleId = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a CommandRunBeforeTestCaseHook message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.CommandRunBeforeTestCaseHook
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.CommandRunBeforeTestCaseHook} CommandRunBeforeTestCaseHook
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CommandRunBeforeTestCaseHook.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a CommandRunBeforeTestCaseHook message.
                 * @function verify
                 * @memberof io.cucumber.messages.CommandRunBeforeTestCaseHook
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CommandRunBeforeTestCaseHook.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        if (!$util.isString(message.actionId))
                            return "actionId: string expected";
                    if (message.testCaseHookDefinitionId != null && message.hasOwnProperty("testCaseHookDefinitionId"))
                        if (!$util.isString(message.testCaseHookDefinitionId))
                            return "testCaseHookDefinitionId: string expected";
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        if (!$util.isString(message.pickleId))
                            return "pickleId: string expected";
                    return null;
                };

                /**
                 * Creates a CommandRunBeforeTestCaseHook message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.CommandRunBeforeTestCaseHook
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.CommandRunBeforeTestCaseHook} CommandRunBeforeTestCaseHook
                 */
                CommandRunBeforeTestCaseHook.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.CommandRunBeforeTestCaseHook)
                        return object;
                    var message = new $root.io.cucumber.messages.CommandRunBeforeTestCaseHook();
                    if (object.actionId != null)
                        message.actionId = String(object.actionId);
                    if (object.testCaseHookDefinitionId != null)
                        message.testCaseHookDefinitionId = String(object.testCaseHookDefinitionId);
                    if (object.pickleId != null)
                        message.pickleId = String(object.pickleId);
                    return message;
                };

                /**
                 * Creates a plain object from a CommandRunBeforeTestCaseHook message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.CommandRunBeforeTestCaseHook
                 * @static
                 * @param {io.cucumber.messages.CommandRunBeforeTestCaseHook} message CommandRunBeforeTestCaseHook
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CommandRunBeforeTestCaseHook.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.actionId = "";
                        object.testCaseHookDefinitionId = "";
                        object.pickleId = "";
                    }
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        object.actionId = message.actionId;
                    if (message.testCaseHookDefinitionId != null && message.hasOwnProperty("testCaseHookDefinitionId"))
                        object.testCaseHookDefinitionId = message.testCaseHookDefinitionId;
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        object.pickleId = message.pickleId;
                    return object;
                };

                /**
                 * Converts this CommandRunBeforeTestCaseHook to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.CommandRunBeforeTestCaseHook
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CommandRunBeforeTestCaseHook.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return CommandRunBeforeTestCaseHook;
            })();

            messages.CommandRunAfterTestCaseHook = (function() {

                /**
                 * Properties of a CommandRunAfterTestCaseHook.
                 * @memberof io.cucumber.messages
                 * @interface ICommandRunAfterTestCaseHook
                 * @property {string|null} [actionId] CommandRunAfterTestCaseHook actionId
                 * @property {string|null} [testCaseHookDefinitionId] CommandRunAfterTestCaseHook testCaseHookDefinitionId
                 * @property {string|null} [pickleId] CommandRunAfterTestCaseHook pickleId
                 */

                /**
                 * Constructs a new CommandRunAfterTestCaseHook.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a CommandRunAfterTestCaseHook.
                 * @implements ICommandRunAfterTestCaseHook
                 * @constructor
                 * @param {io.cucumber.messages.ICommandRunAfterTestCaseHook=} [properties] Properties to set
                 */
                function CommandRunAfterTestCaseHook(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * CommandRunAfterTestCaseHook actionId.
                 * @member {string} actionId
                 * @memberof io.cucumber.messages.CommandRunAfterTestCaseHook
                 * @instance
                 */
                CommandRunAfterTestCaseHook.prototype.actionId = "";

                /**
                 * CommandRunAfterTestCaseHook testCaseHookDefinitionId.
                 * @member {string} testCaseHookDefinitionId
                 * @memberof io.cucumber.messages.CommandRunAfterTestCaseHook
                 * @instance
                 */
                CommandRunAfterTestCaseHook.prototype.testCaseHookDefinitionId = "";

                /**
                 * CommandRunAfterTestCaseHook pickleId.
                 * @member {string} pickleId
                 * @memberof io.cucumber.messages.CommandRunAfterTestCaseHook
                 * @instance
                 */
                CommandRunAfterTestCaseHook.prototype.pickleId = "";

                /**
                 * Creates a new CommandRunAfterTestCaseHook instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.CommandRunAfterTestCaseHook
                 * @static
                 * @param {io.cucumber.messages.ICommandRunAfterTestCaseHook=} [properties] Properties to set
                 * @returns {io.cucumber.messages.CommandRunAfterTestCaseHook} CommandRunAfterTestCaseHook instance
                 */
                CommandRunAfterTestCaseHook.create = function create(properties) {
                    return new CommandRunAfterTestCaseHook(properties);
                };

                /**
                 * Encodes the specified CommandRunAfterTestCaseHook message. Does not implicitly {@link io.cucumber.messages.CommandRunAfterTestCaseHook.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.CommandRunAfterTestCaseHook
                 * @static
                 * @param {io.cucumber.messages.ICommandRunAfterTestCaseHook} message CommandRunAfterTestCaseHook message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CommandRunAfterTestCaseHook.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.actionId);
                    if (message.testCaseHookDefinitionId != null && message.hasOwnProperty("testCaseHookDefinitionId"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.testCaseHookDefinitionId);
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.pickleId);
                    return writer;
                };

                /**
                 * Encodes the specified CommandRunAfterTestCaseHook message, length delimited. Does not implicitly {@link io.cucumber.messages.CommandRunAfterTestCaseHook.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.CommandRunAfterTestCaseHook
                 * @static
                 * @param {io.cucumber.messages.ICommandRunAfterTestCaseHook} message CommandRunAfterTestCaseHook message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CommandRunAfterTestCaseHook.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a CommandRunAfterTestCaseHook message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.CommandRunAfterTestCaseHook
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.CommandRunAfterTestCaseHook} CommandRunAfterTestCaseHook
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CommandRunAfterTestCaseHook.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.CommandRunAfterTestCaseHook();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.actionId = reader.string();
                            break;
                        case 3:
                            message.testCaseHookDefinitionId = reader.string();
                            break;
                        case 4:
                            message.pickleId = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a CommandRunAfterTestCaseHook message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.CommandRunAfterTestCaseHook
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.CommandRunAfterTestCaseHook} CommandRunAfterTestCaseHook
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CommandRunAfterTestCaseHook.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a CommandRunAfterTestCaseHook message.
                 * @function verify
                 * @memberof io.cucumber.messages.CommandRunAfterTestCaseHook
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CommandRunAfterTestCaseHook.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        if (!$util.isString(message.actionId))
                            return "actionId: string expected";
                    if (message.testCaseHookDefinitionId != null && message.hasOwnProperty("testCaseHookDefinitionId"))
                        if (!$util.isString(message.testCaseHookDefinitionId))
                            return "testCaseHookDefinitionId: string expected";
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        if (!$util.isString(message.pickleId))
                            return "pickleId: string expected";
                    return null;
                };

                /**
                 * Creates a CommandRunAfterTestCaseHook message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.CommandRunAfterTestCaseHook
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.CommandRunAfterTestCaseHook} CommandRunAfterTestCaseHook
                 */
                CommandRunAfterTestCaseHook.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.CommandRunAfterTestCaseHook)
                        return object;
                    var message = new $root.io.cucumber.messages.CommandRunAfterTestCaseHook();
                    if (object.actionId != null)
                        message.actionId = String(object.actionId);
                    if (object.testCaseHookDefinitionId != null)
                        message.testCaseHookDefinitionId = String(object.testCaseHookDefinitionId);
                    if (object.pickleId != null)
                        message.pickleId = String(object.pickleId);
                    return message;
                };

                /**
                 * Creates a plain object from a CommandRunAfterTestCaseHook message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.CommandRunAfterTestCaseHook
                 * @static
                 * @param {io.cucumber.messages.CommandRunAfterTestCaseHook} message CommandRunAfterTestCaseHook
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CommandRunAfterTestCaseHook.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.actionId = "";
                        object.testCaseHookDefinitionId = "";
                        object.pickleId = "";
                    }
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        object.actionId = message.actionId;
                    if (message.testCaseHookDefinitionId != null && message.hasOwnProperty("testCaseHookDefinitionId"))
                        object.testCaseHookDefinitionId = message.testCaseHookDefinitionId;
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        object.pickleId = message.pickleId;
                    return object;
                };

                /**
                 * Converts this CommandRunAfterTestCaseHook to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.CommandRunAfterTestCaseHook
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CommandRunAfterTestCaseHook.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return CommandRunAfterTestCaseHook;
            })();

            messages.CommandRunTestStep = (function() {

                /**
                 * Properties of a CommandRunTestStep.
                 * @memberof io.cucumber.messages
                 * @interface ICommandRunTestStep
                 * @property {string|null} [actionId] CommandRunTestStep actionId
                 * @property {string|null} [stepDefinitionId] CommandRunTestStep stepDefinitionId
                 * @property {Array.<io.cucumber.messages.IPatternMatch>|null} [patternMatches] CommandRunTestStep patternMatches
                 * @property {string|null} [pickleId] CommandRunTestStep pickleId
                 * @property {io.cucumber.messages.IPickleStepArgument|null} [pickleStepArgument] CommandRunTestStep pickleStepArgument
                 */

                /**
                 * Constructs a new CommandRunTestStep.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a CommandRunTestStep.
                 * @implements ICommandRunTestStep
                 * @constructor
                 * @param {io.cucumber.messages.ICommandRunTestStep=} [properties] Properties to set
                 */
                function CommandRunTestStep(properties) {
                    this.patternMatches = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * CommandRunTestStep actionId.
                 * @member {string} actionId
                 * @memberof io.cucumber.messages.CommandRunTestStep
                 * @instance
                 */
                CommandRunTestStep.prototype.actionId = "";

                /**
                 * CommandRunTestStep stepDefinitionId.
                 * @member {string} stepDefinitionId
                 * @memberof io.cucumber.messages.CommandRunTestStep
                 * @instance
                 */
                CommandRunTestStep.prototype.stepDefinitionId = "";

                /**
                 * CommandRunTestStep patternMatches.
                 * @member {Array.<io.cucumber.messages.IPatternMatch>} patternMatches
                 * @memberof io.cucumber.messages.CommandRunTestStep
                 * @instance
                 */
                CommandRunTestStep.prototype.patternMatches = $util.emptyArray;

                /**
                 * CommandRunTestStep pickleId.
                 * @member {string} pickleId
                 * @memberof io.cucumber.messages.CommandRunTestStep
                 * @instance
                 */
                CommandRunTestStep.prototype.pickleId = "";

                /**
                 * CommandRunTestStep pickleStepArgument.
                 * @member {io.cucumber.messages.IPickleStepArgument|null|undefined} pickleStepArgument
                 * @memberof io.cucumber.messages.CommandRunTestStep
                 * @instance
                 */
                CommandRunTestStep.prototype.pickleStepArgument = null;

                /**
                 * Creates a new CommandRunTestStep instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.CommandRunTestStep
                 * @static
                 * @param {io.cucumber.messages.ICommandRunTestStep=} [properties] Properties to set
                 * @returns {io.cucumber.messages.CommandRunTestStep} CommandRunTestStep instance
                 */
                CommandRunTestStep.create = function create(properties) {
                    return new CommandRunTestStep(properties);
                };

                /**
                 * Encodes the specified CommandRunTestStep message. Does not implicitly {@link io.cucumber.messages.CommandRunTestStep.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.CommandRunTestStep
                 * @static
                 * @param {io.cucumber.messages.ICommandRunTestStep} message CommandRunTestStep message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CommandRunTestStep.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.actionId);
                    if (message.stepDefinitionId != null && message.hasOwnProperty("stepDefinitionId"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.stepDefinitionId);
                    if (message.patternMatches != null && message.patternMatches.length)
                        for (var i = 0; i < message.patternMatches.length; ++i)
                            $root.io.cucumber.messages.PatternMatch.encode(message.patternMatches[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        writer.uint32(/* id 5, wireType 2 =*/42).string(message.pickleId);
                    if (message.pickleStepArgument != null && message.hasOwnProperty("pickleStepArgument"))
                        $root.io.cucumber.messages.PickleStepArgument.encode(message.pickleStepArgument, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified CommandRunTestStep message, length delimited. Does not implicitly {@link io.cucumber.messages.CommandRunTestStep.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.CommandRunTestStep
                 * @static
                 * @param {io.cucumber.messages.ICommandRunTestStep} message CommandRunTestStep message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CommandRunTestStep.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a CommandRunTestStep message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.CommandRunTestStep
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.CommandRunTestStep} CommandRunTestStep
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CommandRunTestStep.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.CommandRunTestStep();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.actionId = reader.string();
                            break;
                        case 3:
                            message.stepDefinitionId = reader.string();
                            break;
                        case 4:
                            if (!(message.patternMatches && message.patternMatches.length))
                                message.patternMatches = [];
                            message.patternMatches.push($root.io.cucumber.messages.PatternMatch.decode(reader, reader.uint32()));
                            break;
                        case 5:
                            message.pickleId = reader.string();
                            break;
                        case 6:
                            message.pickleStepArgument = $root.io.cucumber.messages.PickleStepArgument.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a CommandRunTestStep message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.CommandRunTestStep
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.CommandRunTestStep} CommandRunTestStep
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CommandRunTestStep.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a CommandRunTestStep message.
                 * @function verify
                 * @memberof io.cucumber.messages.CommandRunTestStep
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CommandRunTestStep.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        if (!$util.isString(message.actionId))
                            return "actionId: string expected";
                    if (message.stepDefinitionId != null && message.hasOwnProperty("stepDefinitionId"))
                        if (!$util.isString(message.stepDefinitionId))
                            return "stepDefinitionId: string expected";
                    if (message.patternMatches != null && message.hasOwnProperty("patternMatches")) {
                        if (!Array.isArray(message.patternMatches))
                            return "patternMatches: array expected";
                        for (var i = 0; i < message.patternMatches.length; ++i) {
                            var error = $root.io.cucumber.messages.PatternMatch.verify(message.patternMatches[i]);
                            if (error)
                                return "patternMatches." + error;
                        }
                    }
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        if (!$util.isString(message.pickleId))
                            return "pickleId: string expected";
                    if (message.pickleStepArgument != null && message.hasOwnProperty("pickleStepArgument")) {
                        var error = $root.io.cucumber.messages.PickleStepArgument.verify(message.pickleStepArgument);
                        if (error)
                            return "pickleStepArgument." + error;
                    }
                    return null;
                };

                /**
                 * Creates a CommandRunTestStep message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.CommandRunTestStep
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.CommandRunTestStep} CommandRunTestStep
                 */
                CommandRunTestStep.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.CommandRunTestStep)
                        return object;
                    var message = new $root.io.cucumber.messages.CommandRunTestStep();
                    if (object.actionId != null)
                        message.actionId = String(object.actionId);
                    if (object.stepDefinitionId != null)
                        message.stepDefinitionId = String(object.stepDefinitionId);
                    if (object.patternMatches) {
                        if (!Array.isArray(object.patternMatches))
                            throw TypeError(".io.cucumber.messages.CommandRunTestStep.patternMatches: array expected");
                        message.patternMatches = [];
                        for (var i = 0; i < object.patternMatches.length; ++i) {
                            if (typeof object.patternMatches[i] !== "object")
                                throw TypeError(".io.cucumber.messages.CommandRunTestStep.patternMatches: object expected");
                            message.patternMatches[i] = $root.io.cucumber.messages.PatternMatch.fromObject(object.patternMatches[i]);
                        }
                    }
                    if (object.pickleId != null)
                        message.pickleId = String(object.pickleId);
                    if (object.pickleStepArgument != null) {
                        if (typeof object.pickleStepArgument !== "object")
                            throw TypeError(".io.cucumber.messages.CommandRunTestStep.pickleStepArgument: object expected");
                        message.pickleStepArgument = $root.io.cucumber.messages.PickleStepArgument.fromObject(object.pickleStepArgument);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a CommandRunTestStep message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.CommandRunTestStep
                 * @static
                 * @param {io.cucumber.messages.CommandRunTestStep} message CommandRunTestStep
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CommandRunTestStep.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.patternMatches = [];
                    if (options.defaults) {
                        object.actionId = "";
                        object.stepDefinitionId = "";
                        object.pickleId = "";
                        object.pickleStepArgument = null;
                    }
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        object.actionId = message.actionId;
                    if (message.stepDefinitionId != null && message.hasOwnProperty("stepDefinitionId"))
                        object.stepDefinitionId = message.stepDefinitionId;
                    if (message.patternMatches && message.patternMatches.length) {
                        object.patternMatches = [];
                        for (var j = 0; j < message.patternMatches.length; ++j)
                            object.patternMatches[j] = $root.io.cucumber.messages.PatternMatch.toObject(message.patternMatches[j], options);
                    }
                    if (message.pickleId != null && message.hasOwnProperty("pickleId"))
                        object.pickleId = message.pickleId;
                    if (message.pickleStepArgument != null && message.hasOwnProperty("pickleStepArgument"))
                        object.pickleStepArgument = $root.io.cucumber.messages.PickleStepArgument.toObject(message.pickleStepArgument, options);
                    return object;
                };

                /**
                 * Converts this CommandRunTestStep to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.CommandRunTestStep
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CommandRunTestStep.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return CommandRunTestStep;
            })();

            messages.PatternMatch = (function() {

                /**
                 * Properties of a PatternMatch.
                 * @memberof io.cucumber.messages
                 * @interface IPatternMatch
                 * @property {Array.<string>|null} [captures] PatternMatch captures
                 * @property {string|null} [parameterTypeName] PatternMatch parameterTypeName
                 */

                /**
                 * Constructs a new PatternMatch.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a PatternMatch.
                 * @implements IPatternMatch
                 * @constructor
                 * @param {io.cucumber.messages.IPatternMatch=} [properties] Properties to set
                 */
                function PatternMatch(properties) {
                    this.captures = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * PatternMatch captures.
                 * @member {Array.<string>} captures
                 * @memberof io.cucumber.messages.PatternMatch
                 * @instance
                 */
                PatternMatch.prototype.captures = $util.emptyArray;

                /**
                 * PatternMatch parameterTypeName.
                 * @member {string} parameterTypeName
                 * @memberof io.cucumber.messages.PatternMatch
                 * @instance
                 */
                PatternMatch.prototype.parameterTypeName = "";

                /**
                 * Creates a new PatternMatch instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.PatternMatch
                 * @static
                 * @param {io.cucumber.messages.IPatternMatch=} [properties] Properties to set
                 * @returns {io.cucumber.messages.PatternMatch} PatternMatch instance
                 */
                PatternMatch.create = function create(properties) {
                    return new PatternMatch(properties);
                };

                /**
                 * Encodes the specified PatternMatch message. Does not implicitly {@link io.cucumber.messages.PatternMatch.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.PatternMatch
                 * @static
                 * @param {io.cucumber.messages.IPatternMatch} message PatternMatch message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PatternMatch.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.captures != null && message.captures.length)
                        for (var i = 0; i < message.captures.length; ++i)
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.captures[i]);
                    if (message.parameterTypeName != null && message.hasOwnProperty("parameterTypeName"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.parameterTypeName);
                    return writer;
                };

                /**
                 * Encodes the specified PatternMatch message, length delimited. Does not implicitly {@link io.cucumber.messages.PatternMatch.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.PatternMatch
                 * @static
                 * @param {io.cucumber.messages.IPatternMatch} message PatternMatch message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PatternMatch.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a PatternMatch message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.PatternMatch
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.PatternMatch} PatternMatch
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PatternMatch.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.PatternMatch();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.captures && message.captures.length))
                                message.captures = [];
                            message.captures.push(reader.string());
                            break;
                        case 2:
                            message.parameterTypeName = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a PatternMatch message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.PatternMatch
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.PatternMatch} PatternMatch
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PatternMatch.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a PatternMatch message.
                 * @function verify
                 * @memberof io.cucumber.messages.PatternMatch
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                PatternMatch.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.captures != null && message.hasOwnProperty("captures")) {
                        if (!Array.isArray(message.captures))
                            return "captures: array expected";
                        for (var i = 0; i < message.captures.length; ++i)
                            if (!$util.isString(message.captures[i]))
                                return "captures: string[] expected";
                    }
                    if (message.parameterTypeName != null && message.hasOwnProperty("parameterTypeName"))
                        if (!$util.isString(message.parameterTypeName))
                            return "parameterTypeName: string expected";
                    return null;
                };

                /**
                 * Creates a PatternMatch message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.PatternMatch
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.PatternMatch} PatternMatch
                 */
                PatternMatch.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.PatternMatch)
                        return object;
                    var message = new $root.io.cucumber.messages.PatternMatch();
                    if (object.captures) {
                        if (!Array.isArray(object.captures))
                            throw TypeError(".io.cucumber.messages.PatternMatch.captures: array expected");
                        message.captures = [];
                        for (var i = 0; i < object.captures.length; ++i)
                            message.captures[i] = String(object.captures[i]);
                    }
                    if (object.parameterTypeName != null)
                        message.parameterTypeName = String(object.parameterTypeName);
                    return message;
                };

                /**
                 * Creates a plain object from a PatternMatch message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.PatternMatch
                 * @static
                 * @param {io.cucumber.messages.PatternMatch} message PatternMatch
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                PatternMatch.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.captures = [];
                    if (options.defaults)
                        object.parameterTypeName = "";
                    if (message.captures && message.captures.length) {
                        object.captures = [];
                        for (var j = 0; j < message.captures.length; ++j)
                            object.captures[j] = message.captures[j];
                    }
                    if (message.parameterTypeName != null && message.hasOwnProperty("parameterTypeName"))
                        object.parameterTypeName = message.parameterTypeName;
                    return object;
                };

                /**
                 * Converts this PatternMatch to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.PatternMatch
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                PatternMatch.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return PatternMatch;
            })();

            messages.CommandGenerateSnippet = (function() {

                /**
                 * Properties of a CommandGenerateSnippet.
                 * @memberof io.cucumber.messages
                 * @interface ICommandGenerateSnippet
                 * @property {string|null} [actionId] CommandGenerateSnippet actionId
                 * @property {Array.<io.cucumber.messages.IGeneratedExpression>|null} [generatedExpressions] CommandGenerateSnippet generatedExpressions
                 * @property {io.cucumber.messages.IPickleStepArgument|null} [pickleStepArgument] CommandGenerateSnippet pickleStepArgument
                 */

                /**
                 * Constructs a new CommandGenerateSnippet.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a CommandGenerateSnippet.
                 * @implements ICommandGenerateSnippet
                 * @constructor
                 * @param {io.cucumber.messages.ICommandGenerateSnippet=} [properties] Properties to set
                 */
                function CommandGenerateSnippet(properties) {
                    this.generatedExpressions = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * CommandGenerateSnippet actionId.
                 * @member {string} actionId
                 * @memberof io.cucumber.messages.CommandGenerateSnippet
                 * @instance
                 */
                CommandGenerateSnippet.prototype.actionId = "";

                /**
                 * CommandGenerateSnippet generatedExpressions.
                 * @member {Array.<io.cucumber.messages.IGeneratedExpression>} generatedExpressions
                 * @memberof io.cucumber.messages.CommandGenerateSnippet
                 * @instance
                 */
                CommandGenerateSnippet.prototype.generatedExpressions = $util.emptyArray;

                /**
                 * CommandGenerateSnippet pickleStepArgument.
                 * @member {io.cucumber.messages.IPickleStepArgument|null|undefined} pickleStepArgument
                 * @memberof io.cucumber.messages.CommandGenerateSnippet
                 * @instance
                 */
                CommandGenerateSnippet.prototype.pickleStepArgument = null;

                /**
                 * Creates a new CommandGenerateSnippet instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.CommandGenerateSnippet
                 * @static
                 * @param {io.cucumber.messages.ICommandGenerateSnippet=} [properties] Properties to set
                 * @returns {io.cucumber.messages.CommandGenerateSnippet} CommandGenerateSnippet instance
                 */
                CommandGenerateSnippet.create = function create(properties) {
                    return new CommandGenerateSnippet(properties);
                };

                /**
                 * Encodes the specified CommandGenerateSnippet message. Does not implicitly {@link io.cucumber.messages.CommandGenerateSnippet.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.CommandGenerateSnippet
                 * @static
                 * @param {io.cucumber.messages.ICommandGenerateSnippet} message CommandGenerateSnippet message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CommandGenerateSnippet.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.actionId);
                    if (message.generatedExpressions != null && message.generatedExpressions.length)
                        for (var i = 0; i < message.generatedExpressions.length; ++i)
                            $root.io.cucumber.messages.GeneratedExpression.encode(message.generatedExpressions[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.pickleStepArgument != null && message.hasOwnProperty("pickleStepArgument"))
                        $root.io.cucumber.messages.PickleStepArgument.encode(message.pickleStepArgument, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified CommandGenerateSnippet message, length delimited. Does not implicitly {@link io.cucumber.messages.CommandGenerateSnippet.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.CommandGenerateSnippet
                 * @static
                 * @param {io.cucumber.messages.ICommandGenerateSnippet} message CommandGenerateSnippet message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CommandGenerateSnippet.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a CommandGenerateSnippet message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.CommandGenerateSnippet
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.CommandGenerateSnippet} CommandGenerateSnippet
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CommandGenerateSnippet.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.CommandGenerateSnippet();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.actionId = reader.string();
                            break;
                        case 2:
                            if (!(message.generatedExpressions && message.generatedExpressions.length))
                                message.generatedExpressions = [];
                            message.generatedExpressions.push($root.io.cucumber.messages.GeneratedExpression.decode(reader, reader.uint32()));
                            break;
                        case 5:
                            message.pickleStepArgument = $root.io.cucumber.messages.PickleStepArgument.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a CommandGenerateSnippet message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.CommandGenerateSnippet
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.CommandGenerateSnippet} CommandGenerateSnippet
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CommandGenerateSnippet.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a CommandGenerateSnippet message.
                 * @function verify
                 * @memberof io.cucumber.messages.CommandGenerateSnippet
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CommandGenerateSnippet.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        if (!$util.isString(message.actionId))
                            return "actionId: string expected";
                    if (message.generatedExpressions != null && message.hasOwnProperty("generatedExpressions")) {
                        if (!Array.isArray(message.generatedExpressions))
                            return "generatedExpressions: array expected";
                        for (var i = 0; i < message.generatedExpressions.length; ++i) {
                            var error = $root.io.cucumber.messages.GeneratedExpression.verify(message.generatedExpressions[i]);
                            if (error)
                                return "generatedExpressions." + error;
                        }
                    }
                    if (message.pickleStepArgument != null && message.hasOwnProperty("pickleStepArgument")) {
                        var error = $root.io.cucumber.messages.PickleStepArgument.verify(message.pickleStepArgument);
                        if (error)
                            return "pickleStepArgument." + error;
                    }
                    return null;
                };

                /**
                 * Creates a CommandGenerateSnippet message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.CommandGenerateSnippet
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.CommandGenerateSnippet} CommandGenerateSnippet
                 */
                CommandGenerateSnippet.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.CommandGenerateSnippet)
                        return object;
                    var message = new $root.io.cucumber.messages.CommandGenerateSnippet();
                    if (object.actionId != null)
                        message.actionId = String(object.actionId);
                    if (object.generatedExpressions) {
                        if (!Array.isArray(object.generatedExpressions))
                            throw TypeError(".io.cucumber.messages.CommandGenerateSnippet.generatedExpressions: array expected");
                        message.generatedExpressions = [];
                        for (var i = 0; i < object.generatedExpressions.length; ++i) {
                            if (typeof object.generatedExpressions[i] !== "object")
                                throw TypeError(".io.cucumber.messages.CommandGenerateSnippet.generatedExpressions: object expected");
                            message.generatedExpressions[i] = $root.io.cucumber.messages.GeneratedExpression.fromObject(object.generatedExpressions[i]);
                        }
                    }
                    if (object.pickleStepArgument != null) {
                        if (typeof object.pickleStepArgument !== "object")
                            throw TypeError(".io.cucumber.messages.CommandGenerateSnippet.pickleStepArgument: object expected");
                        message.pickleStepArgument = $root.io.cucumber.messages.PickleStepArgument.fromObject(object.pickleStepArgument);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a CommandGenerateSnippet message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.CommandGenerateSnippet
                 * @static
                 * @param {io.cucumber.messages.CommandGenerateSnippet} message CommandGenerateSnippet
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CommandGenerateSnippet.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.generatedExpressions = [];
                    if (options.defaults) {
                        object.actionId = "";
                        object.pickleStepArgument = null;
                    }
                    if (message.actionId != null && message.hasOwnProperty("actionId"))
                        object.actionId = message.actionId;
                    if (message.generatedExpressions && message.generatedExpressions.length) {
                        object.generatedExpressions = [];
                        for (var j = 0; j < message.generatedExpressions.length; ++j)
                            object.generatedExpressions[j] = $root.io.cucumber.messages.GeneratedExpression.toObject(message.generatedExpressions[j], options);
                    }
                    if (message.pickleStepArgument != null && message.hasOwnProperty("pickleStepArgument"))
                        object.pickleStepArgument = $root.io.cucumber.messages.PickleStepArgument.toObject(message.pickleStepArgument, options);
                    return object;
                };

                /**
                 * Converts this CommandGenerateSnippet to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.CommandGenerateSnippet
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CommandGenerateSnippet.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return CommandGenerateSnippet;
            })();

            messages.GeneratedExpression = (function() {

                /**
                 * Properties of a GeneratedExpression.
                 * @memberof io.cucumber.messages
                 * @interface IGeneratedExpression
                 * @property {string|null} [text] GeneratedExpression text
                 * @property {Array.<string>|null} [parameterTypeNames] GeneratedExpression parameterTypeNames
                 */

                /**
                 * Constructs a new GeneratedExpression.
                 * @memberof io.cucumber.messages
                 * @classdesc Represents a GeneratedExpression.
                 * @implements IGeneratedExpression
                 * @constructor
                 * @param {io.cucumber.messages.IGeneratedExpression=} [properties] Properties to set
                 */
                function GeneratedExpression(properties) {
                    this.parameterTypeNames = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GeneratedExpression text.
                 * @member {string} text
                 * @memberof io.cucumber.messages.GeneratedExpression
                 * @instance
                 */
                GeneratedExpression.prototype.text = "";

                /**
                 * GeneratedExpression parameterTypeNames.
                 * @member {Array.<string>} parameterTypeNames
                 * @memberof io.cucumber.messages.GeneratedExpression
                 * @instance
                 */
                GeneratedExpression.prototype.parameterTypeNames = $util.emptyArray;

                /**
                 * Creates a new GeneratedExpression instance using the specified properties.
                 * @function create
                 * @memberof io.cucumber.messages.GeneratedExpression
                 * @static
                 * @param {io.cucumber.messages.IGeneratedExpression=} [properties] Properties to set
                 * @returns {io.cucumber.messages.GeneratedExpression} GeneratedExpression instance
                 */
                GeneratedExpression.create = function create(properties) {
                    return new GeneratedExpression(properties);
                };

                /**
                 * Encodes the specified GeneratedExpression message. Does not implicitly {@link io.cucumber.messages.GeneratedExpression.verify|verify} messages.
                 * @function encode
                 * @memberof io.cucumber.messages.GeneratedExpression
                 * @static
                 * @param {io.cucumber.messages.IGeneratedExpression} message GeneratedExpression message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GeneratedExpression.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.text != null && message.hasOwnProperty("text"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
                    if (message.parameterTypeNames != null && message.parameterTypeNames.length)
                        for (var i = 0; i < message.parameterTypeNames.length; ++i)
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.parameterTypeNames[i]);
                    return writer;
                };

                /**
                 * Encodes the specified GeneratedExpression message, length delimited. Does not implicitly {@link io.cucumber.messages.GeneratedExpression.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof io.cucumber.messages.GeneratedExpression
                 * @static
                 * @param {io.cucumber.messages.IGeneratedExpression} message GeneratedExpression message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GeneratedExpression.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GeneratedExpression message from the specified reader or buffer.
                 * @function decode
                 * @memberof io.cucumber.messages.GeneratedExpression
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {io.cucumber.messages.GeneratedExpression} GeneratedExpression
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GeneratedExpression.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.io.cucumber.messages.GeneratedExpression();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.text = reader.string();
                            break;
                        case 2:
                            if (!(message.parameterTypeNames && message.parameterTypeNames.length))
                                message.parameterTypeNames = [];
                            message.parameterTypeNames.push(reader.string());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GeneratedExpression message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof io.cucumber.messages.GeneratedExpression
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {io.cucumber.messages.GeneratedExpression} GeneratedExpression
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GeneratedExpression.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GeneratedExpression message.
                 * @function verify
                 * @memberof io.cucumber.messages.GeneratedExpression
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GeneratedExpression.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.text != null && message.hasOwnProperty("text"))
                        if (!$util.isString(message.text))
                            return "text: string expected";
                    if (message.parameterTypeNames != null && message.hasOwnProperty("parameterTypeNames")) {
                        if (!Array.isArray(message.parameterTypeNames))
                            return "parameterTypeNames: array expected";
                        for (var i = 0; i < message.parameterTypeNames.length; ++i)
                            if (!$util.isString(message.parameterTypeNames[i]))
                                return "parameterTypeNames: string[] expected";
                    }
                    return null;
                };

                /**
                 * Creates a GeneratedExpression message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof io.cucumber.messages.GeneratedExpression
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {io.cucumber.messages.GeneratedExpression} GeneratedExpression
                 */
                GeneratedExpression.fromObject = function fromObject(object) {
                    if (object instanceof $root.io.cucumber.messages.GeneratedExpression)
                        return object;
                    var message = new $root.io.cucumber.messages.GeneratedExpression();
                    if (object.text != null)
                        message.text = String(object.text);
                    if (object.parameterTypeNames) {
                        if (!Array.isArray(object.parameterTypeNames))
                            throw TypeError(".io.cucumber.messages.GeneratedExpression.parameterTypeNames: array expected");
                        message.parameterTypeNames = [];
                        for (var i = 0; i < object.parameterTypeNames.length; ++i)
                            message.parameterTypeNames[i] = String(object.parameterTypeNames[i]);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a GeneratedExpression message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof io.cucumber.messages.GeneratedExpression
                 * @static
                 * @param {io.cucumber.messages.GeneratedExpression} message GeneratedExpression
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GeneratedExpression.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.parameterTypeNames = [];
                    if (options.defaults)
                        object.text = "";
                    if (message.text != null && message.hasOwnProperty("text"))
                        object.text = message.text;
                    if (message.parameterTypeNames && message.parameterTypeNames.length) {
                        object.parameterTypeNames = [];
                        for (var j = 0; j < message.parameterTypeNames.length; ++j)
                            object.parameterTypeNames[j] = message.parameterTypeNames[j];
                    }
                    return object;
                };

                /**
                 * Converts this GeneratedExpression to JSON.
                 * @function toJSON
                 * @memberof io.cucumber.messages.GeneratedExpression
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GeneratedExpression.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return GeneratedExpression;
            })();

            return messages;
        })();

        return cucumber;
    })();

    return io;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.seconds = reader.int64();
                        break;
                    case 2:
                        message.nanos = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                var message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Timestamp;
        })();

        return protobuf;
    })();

    return google;
})();

module.exports = $root;
