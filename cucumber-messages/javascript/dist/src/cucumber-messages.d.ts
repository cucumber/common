import * as $protobuf from "protobufjs";
/** Namespace io. */
export namespace io {

    /** Namespace cucumber. */
    namespace cucumber {

        /** Namespace messages. */
        namespace messages {

            /** Properties of a Timestamp. */
            interface ITimestamp {

                /** Timestamp seconds */
                seconds?: (number|Long|null);

                /** Timestamp nanos */
                nanos?: (number|null);
            }

            /** Represents a Timestamp. */
            class Timestamp implements ITimestamp {

                /**
                 * Constructs a new Timestamp.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITimestamp);

                /** Timestamp seconds. */
                public seconds: (number|Long);

                /** Timestamp nanos. */
                public nanos: number;

                /**
                 * Creates a new Timestamp instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Timestamp instance
                 */
                public static create(properties?: io.cucumber.messages.ITimestamp): io.cucumber.messages.Timestamp;

                /**
                 * Encodes the specified Timestamp message. Does not implicitly {@link io.cucumber.messages.Timestamp.verify|verify} messages.
                 * @param message Timestamp message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link io.cucumber.messages.Timestamp.verify|verify} messages.
                 * @param message Timestamp message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Timestamp message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Timestamp
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Timestamp;

                /**
                 * Decodes a Timestamp message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Timestamp
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Timestamp;

                /**
                 * Verifies a Timestamp message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Timestamp
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Timestamp;

                /**
                 * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
                 * @param message Timestamp
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Timestamp to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Duration. */
            interface IDuration {

                /** Duration seconds */
                seconds?: (number|Long|null);

                /** Duration nanos */
                nanos?: (number|null);
            }

            /** Represents a Duration. */
            class Duration implements IDuration {

                /**
                 * Constructs a new Duration.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IDuration);

                /** Duration seconds. */
                public seconds: (number|Long);

                /** Duration nanos. */
                public nanos: number;

                /**
                 * Creates a new Duration instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Duration instance
                 */
                public static create(properties?: io.cucumber.messages.IDuration): io.cucumber.messages.Duration;

                /**
                 * Encodes the specified Duration message. Does not implicitly {@link io.cucumber.messages.Duration.verify|verify} messages.
                 * @param message Duration message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IDuration, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Duration message, length delimited. Does not implicitly {@link io.cucumber.messages.Duration.verify|verify} messages.
                 * @param message Duration message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IDuration, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Duration message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Duration
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Duration;

                /**
                 * Decodes a Duration message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Duration
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Duration;

                /**
                 * Verifies a Duration message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Duration message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Duration
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Duration;

                /**
                 * Creates a plain object from a Duration message. Also converts values to other types if specified.
                 * @param message Duration
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.Duration, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Duration to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of an Envelope. */
            interface IEnvelope {

                /** Envelope source */
                source?: (io.cucumber.messages.ISource|null);

                /** Envelope gherkinDocument */
                gherkinDocument?: (io.cucumber.messages.IGherkinDocument|null);

                /** Envelope pickle */
                pickle?: (io.cucumber.messages.IPickle|null);

                /** Envelope attachment */
                attachment?: (io.cucumber.messages.IAttachment|null);

                /** Envelope testCaseStarted */
                testCaseStarted?: (io.cucumber.messages.ITestCaseStarted|null);

                /** Envelope testStepStarted */
                testStepStarted?: (io.cucumber.messages.ITestStepStarted|null);

                /** Envelope testStepFinished */
                testStepFinished?: (io.cucumber.messages.ITestStepFinished|null);

                /** Envelope testCaseFinished */
                testCaseFinished?: (io.cucumber.messages.ITestCaseFinished|null);

                /** Envelope pickleAccepted */
                pickleAccepted?: (io.cucumber.messages.IPickleAccepted|null);

                /** Envelope pickleRejected */
                pickleRejected?: (io.cucumber.messages.IPickleRejected|null);

                /** Envelope testCasePrepared */
                testCasePrepared?: (io.cucumber.messages.ITestCasePrepared|null);

                /** Envelope testRunStarted */
                testRunStarted?: (io.cucumber.messages.ITestRunStarted|null);

                /** Envelope testRunFinished */
                testRunFinished?: (io.cucumber.messages.ITestRunFinished|null);

                /** Envelope commandStart */
                commandStart?: (io.cucumber.messages.ICommandStart|null);

                /** Envelope commandActionComplete */
                commandActionComplete?: (io.cucumber.messages.ICommandActionComplete|null);

                /** Envelope commandRunBeforeTestRunHooks */
                commandRunBeforeTestRunHooks?: (io.cucumber.messages.ICommandRunBeforeTestRunHooks|null);

                /** Envelope commandInitializeTestCase */
                commandInitializeTestCase?: (io.cucumber.messages.ICommandInitializeTestCase|null);

                /** Envelope commandRunBeforeTestCaseHook */
                commandRunBeforeTestCaseHook?: (io.cucumber.messages.ICommandRunBeforeTestCaseHook|null);

                /** Envelope commandRunTestStep */
                commandRunTestStep?: (io.cucumber.messages.ICommandRunTestStep|null);

                /** Envelope commandRunAfterTestCaseHook */
                commandRunAfterTestCaseHook?: (io.cucumber.messages.ICommandRunAfterTestCaseHook|null);

                /** Envelope commandRunAfterTestRunHooks */
                commandRunAfterTestRunHooks?: (io.cucumber.messages.ICommandRunAfterTestRunHooks|null);

                /** Envelope commandGenerateSnippet */
                commandGenerateSnippet?: (io.cucumber.messages.ICommandGenerateSnippet|null);

                /** Envelope commandError */
                commandError?: (string|null);

                /** Envelope testCase */
                testCase?: (io.cucumber.messages.ITestCase|null);

                /** Envelope stepDefinition */
                stepDefinition?: (io.cucumber.messages.IStepDefinition|null);

                /** Envelope hook */
                hook?: (io.cucumber.messages.IHook|null);
            }

            /**
             * All the messages that are passed between different components/processes are Envelope
             * messages.
             */
            class Envelope implements IEnvelope {

                /**
                 * Constructs a new Envelope.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IEnvelope);

                /** Envelope source. */
                public source?: (io.cucumber.messages.ISource|null);

                /** Envelope gherkinDocument. */
                public gherkinDocument?: (io.cucumber.messages.IGherkinDocument|null);

                /** Envelope pickle. */
                public pickle?: (io.cucumber.messages.IPickle|null);

                /** Envelope attachment. */
                public attachment?: (io.cucumber.messages.IAttachment|null);

                /** Envelope testCaseStarted. */
                public testCaseStarted?: (io.cucumber.messages.ITestCaseStarted|null);

                /** Envelope testStepStarted. */
                public testStepStarted?: (io.cucumber.messages.ITestStepStarted|null);

                /** Envelope testStepFinished. */
                public testStepFinished?: (io.cucumber.messages.ITestStepFinished|null);

                /** Envelope testCaseFinished. */
                public testCaseFinished?: (io.cucumber.messages.ITestCaseFinished|null);

                /** Envelope pickleAccepted. */
                public pickleAccepted?: (io.cucumber.messages.IPickleAccepted|null);

                /** Envelope pickleRejected. */
                public pickleRejected?: (io.cucumber.messages.IPickleRejected|null);

                /** Envelope testCasePrepared. */
                public testCasePrepared?: (io.cucumber.messages.ITestCasePrepared|null);

                /** Envelope testRunStarted. */
                public testRunStarted?: (io.cucumber.messages.ITestRunStarted|null);

                /** Envelope testRunFinished. */
                public testRunFinished?: (io.cucumber.messages.ITestRunFinished|null);

                /** Envelope commandStart. */
                public commandStart?: (io.cucumber.messages.ICommandStart|null);

                /** Envelope commandActionComplete. */
                public commandActionComplete?: (io.cucumber.messages.ICommandActionComplete|null);

                /** Envelope commandRunBeforeTestRunHooks. */
                public commandRunBeforeTestRunHooks?: (io.cucumber.messages.ICommandRunBeforeTestRunHooks|null);

                /** Envelope commandInitializeTestCase. */
                public commandInitializeTestCase?: (io.cucumber.messages.ICommandInitializeTestCase|null);

                /** Envelope commandRunBeforeTestCaseHook. */
                public commandRunBeforeTestCaseHook?: (io.cucumber.messages.ICommandRunBeforeTestCaseHook|null);

                /** Envelope commandRunTestStep. */
                public commandRunTestStep?: (io.cucumber.messages.ICommandRunTestStep|null);

                /** Envelope commandRunAfterTestCaseHook. */
                public commandRunAfterTestCaseHook?: (io.cucumber.messages.ICommandRunAfterTestCaseHook|null);

                /** Envelope commandRunAfterTestRunHooks. */
                public commandRunAfterTestRunHooks?: (io.cucumber.messages.ICommandRunAfterTestRunHooks|null);

                /** Envelope commandGenerateSnippet. */
                public commandGenerateSnippet?: (io.cucumber.messages.ICommandGenerateSnippet|null);

                /** Envelope commandError. */
                public commandError: string;

                /** Envelope testCase. */
                public testCase?: (io.cucumber.messages.ITestCase|null);

                /** Envelope stepDefinition. */
                public stepDefinition?: (io.cucumber.messages.IStepDefinition|null);

                /** Envelope hook. */
                public hook?: (io.cucumber.messages.IHook|null);

                /** Envelope message. */
                public message?: ("source"|"gherkinDocument"|"pickle"|"attachment"|"testCaseStarted"|"testStepStarted"|"testStepFinished"|"testCaseFinished"|"pickleAccepted"|"pickleRejected"|"testCasePrepared"|"testRunStarted"|"testRunFinished"|"commandStart"|"commandActionComplete"|"commandRunBeforeTestRunHooks"|"commandInitializeTestCase"|"commandRunBeforeTestCaseHook"|"commandRunTestStep"|"commandRunAfterTestCaseHook"|"commandRunAfterTestRunHooks"|"commandGenerateSnippet"|"commandError"|"testCase"|"stepDefinition"|"hook");

                /**
                 * Creates a new Envelope instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Envelope instance
                 */
                public static create(properties?: io.cucumber.messages.IEnvelope): io.cucumber.messages.Envelope;

                /**
                 * Encodes the specified Envelope message. Does not implicitly {@link io.cucumber.messages.Envelope.verify|verify} messages.
                 * @param message Envelope message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IEnvelope, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Envelope message, length delimited. Does not implicitly {@link io.cucumber.messages.Envelope.verify|verify} messages.
                 * @param message Envelope message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IEnvelope, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an Envelope message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Envelope
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Envelope;

                /**
                 * Decodes an Envelope message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Envelope
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Envelope;

                /**
                 * Verifies an Envelope message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an Envelope message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Envelope
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Envelope;

                /**
                 * Creates a plain object from an Envelope message. Also converts values to other types if specified.
                 * @param message Envelope
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.Envelope, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Envelope to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Location. */
            interface ILocation {

                /** Location line */
                line?: (number|null);

                /** Location column */
                column?: (number|null);
            }

            /** Points to a line and a column in a text file */
            class Location implements ILocation {

                /**
                 * Constructs a new Location.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ILocation);

                /** Location line. */
                public line: number;

                /** Location column. */
                public column: number;

                /**
                 * Creates a new Location instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Location instance
                 */
                public static create(properties?: io.cucumber.messages.ILocation): io.cucumber.messages.Location;

                /**
                 * Encodes the specified Location message. Does not implicitly {@link io.cucumber.messages.Location.verify|verify} messages.
                 * @param message Location message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ILocation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Location message, length delimited. Does not implicitly {@link io.cucumber.messages.Location.verify|verify} messages.
                 * @param message Location message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ILocation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Location message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Location
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Location;

                /**
                 * Decodes a Location message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Location
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Location;

                /**
                 * Verifies a Location message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Location message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Location
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Location;

                /**
                 * Creates a plain object from a Location message. Also converts values to other types if specified.
                 * @param message Location
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.Location, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Location to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a SourceReference. */
            interface ISourceReference {

                /** SourceReference uri */
                uri?: (string|null);

                /** SourceReference location */
                location?: (io.cucumber.messages.ILocation|null);
            }

            /**
             * Points to a [Source](#io.cucumber.messages.Source) identified by `uri` and a
             * [Location](#io.cucumber.messages.Location) within that file.
             */
            class SourceReference implements ISourceReference {

                /**
                 * Constructs a new SourceReference.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ISourceReference);

                /** SourceReference uri. */
                public uri: string;

                /** SourceReference location. */
                public location?: (io.cucumber.messages.ILocation|null);

                /**
                 * Creates a new SourceReference instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SourceReference instance
                 */
                public static create(properties?: io.cucumber.messages.ISourceReference): io.cucumber.messages.SourceReference;

                /**
                 * Encodes the specified SourceReference message. Does not implicitly {@link io.cucumber.messages.SourceReference.verify|verify} messages.
                 * @param message SourceReference message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ISourceReference, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SourceReference message, length delimited. Does not implicitly {@link io.cucumber.messages.SourceReference.verify|verify} messages.
                 * @param message SourceReference message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ISourceReference, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SourceReference message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SourceReference
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.SourceReference;

                /**
                 * Decodes a SourceReference message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SourceReference
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.SourceReference;

                /**
                 * Verifies a SourceReference message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SourceReference message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SourceReference
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.SourceReference;

                /**
                 * Creates a plain object from a SourceReference message. Also converts values to other types if specified.
                 * @param message SourceReference
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.SourceReference, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SourceReference to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Source. */
            interface ISource {

                /**
                 * The [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier)
                 * of the source, typically a file path relative to the root directory
                 */
                uri?: (string|null);

                /** Source data */
                data?: (string|null);

                /** Source mediaType */
                mediaType?: (string|null);
            }

            /** A source file, typically a Gherkin document */
            class Source implements ISource {

                /**
                 * Constructs a new Source.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ISource);

                /**
                 * The [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier)
                 * of the source, typically a file path relative to the root directory
                 */
                public uri: string;

                /** Source data. */
                public data: string;

                /** Source mediaType. */
                public mediaType: string;

                /**
                 * Creates a new Source instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Source instance
                 */
                public static create(properties?: io.cucumber.messages.ISource): io.cucumber.messages.Source;

                /**
                 * Encodes the specified Source message. Does not implicitly {@link io.cucumber.messages.Source.verify|verify} messages.
                 * @param message Source message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ISource, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Source message, length delimited. Does not implicitly {@link io.cucumber.messages.Source.verify|verify} messages.
                 * @param message Source message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ISource, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Source message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Source
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Source;

                /**
                 * Decodes a Source message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Source
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Source;

                /**
                 * Verifies a Source message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Source message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Source
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Source;

                /**
                 * Creates a plain object from a Source message. Also converts values to other types if specified.
                 * @param message Source
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.Source, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Source to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GherkinDocument. */
            interface IGherkinDocument {

                /**
                 * The [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier)
                 * of the source, typically a file path relative to the root directory
                 */
                uri?: (string|null);

                /** GherkinDocument feature */
                feature?: (io.cucumber.messages.GherkinDocument.IFeature|null);

                /** GherkinDocument comments */
                comments?: (io.cucumber.messages.GherkinDocument.IComment[]|null);
            }

            /**
             * The [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) of a Gherkin document.
             * Cucumber implementations should *not* depend on `GherkinDocument` or any of its
             * children for execution - use [Pickle](#io.cucumber.messages.Pickle) instead.
             *
             * The only consumers of `GherkinDocument` should only be formatters that produce
             * "rich" output, resembling the original Gherkin document.
             */
            class GherkinDocument implements IGherkinDocument {

                /**
                 * Constructs a new GherkinDocument.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IGherkinDocument);

                /**
                 * The [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier)
                 * of the source, typically a file path relative to the root directory
                 */
                public uri: string;

                /** GherkinDocument feature. */
                public feature?: (io.cucumber.messages.GherkinDocument.IFeature|null);

                /** GherkinDocument comments. */
                public comments: io.cucumber.messages.GherkinDocument.IComment[];

                /**
                 * Creates a new GherkinDocument instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GherkinDocument instance
                 */
                public static create(properties?: io.cucumber.messages.IGherkinDocument): io.cucumber.messages.GherkinDocument;

                /**
                 * Encodes the specified GherkinDocument message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.verify|verify} messages.
                 * @param message GherkinDocument message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IGherkinDocument, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GherkinDocument message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.verify|verify} messages.
                 * @param message GherkinDocument message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IGherkinDocument, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GherkinDocument message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GherkinDocument
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.GherkinDocument;

                /**
                 * Decodes a GherkinDocument message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GherkinDocument
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.GherkinDocument;

                /**
                 * Verifies a GherkinDocument message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GherkinDocument message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GherkinDocument
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.GherkinDocument;

                /**
                 * Creates a plain object from a GherkinDocument message. Also converts values to other types if specified.
                 * @param message GherkinDocument
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.GherkinDocument, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GherkinDocument to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace GherkinDocument {

                /** Properties of a Comment. */
                interface IComment {

                    /** Comment location */
                    location?: (io.cucumber.messages.ILocation|null);

                    /** Comment text */
                    text?: (string|null);
                }

                /** A comment in a Gherkin document */
                class Comment implements IComment {

                    /**
                     * Constructs a new Comment.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: io.cucumber.messages.GherkinDocument.IComment);

                    /** Comment location. */
                    public location?: (io.cucumber.messages.ILocation|null);

                    /** Comment text. */
                    public text: string;

                    /**
                     * Creates a new Comment instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Comment instance
                     */
                    public static create(properties?: io.cucumber.messages.GherkinDocument.IComment): io.cucumber.messages.GherkinDocument.Comment;

                    /**
                     * Encodes the specified Comment message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Comment.verify|verify} messages.
                     * @param message Comment message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: io.cucumber.messages.GherkinDocument.IComment, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Comment message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Comment.verify|verify} messages.
                     * @param message Comment message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: io.cucumber.messages.GherkinDocument.IComment, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Comment message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Comment
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.GherkinDocument.Comment;

                    /**
                     * Decodes a Comment message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Comment
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.GherkinDocument.Comment;

                    /**
                     * Verifies a Comment message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Comment message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Comment
                     */
                    public static fromObject(object: { [k: string]: any }): io.cucumber.messages.GherkinDocument.Comment;

                    /**
                     * Creates a plain object from a Comment message. Also converts values to other types if specified.
                     * @param message Comment
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: io.cucumber.messages.GherkinDocument.Comment, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Comment to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a Feature. */
                interface IFeature {

                    /** Feature location */
                    location?: (io.cucumber.messages.ILocation|null);

                    /** Feature tags */
                    tags?: (io.cucumber.messages.GherkinDocument.Feature.ITag[]|null);

                    /** Feature language */
                    language?: (string|null);

                    /** Feature keyword */
                    keyword?: (string|null);

                    /** Feature name */
                    name?: (string|null);

                    /** Feature description */
                    description?: (string|null);

                    /** Feature children */
                    children?: (io.cucumber.messages.GherkinDocument.Feature.IFeatureChild[]|null);
                }

                /** The top level node in the AST */
                class Feature implements IFeature {

                    /**
                     * Constructs a new Feature.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: io.cucumber.messages.GherkinDocument.IFeature);

                    /** Feature location. */
                    public location?: (io.cucumber.messages.ILocation|null);

                    /** Feature tags. */
                    public tags: io.cucumber.messages.GherkinDocument.Feature.ITag[];

                    /** Feature language. */
                    public language: string;

                    /** Feature keyword. */
                    public keyword: string;

                    /** Feature name. */
                    public name: string;

                    /** Feature description. */
                    public description: string;

                    /** Feature children. */
                    public children: io.cucumber.messages.GherkinDocument.Feature.IFeatureChild[];

                    /**
                     * Creates a new Feature instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Feature instance
                     */
                    public static create(properties?: io.cucumber.messages.GherkinDocument.IFeature): io.cucumber.messages.GherkinDocument.Feature;

                    /**
                     * Encodes the specified Feature message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.verify|verify} messages.
                     * @param message Feature message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: io.cucumber.messages.GherkinDocument.IFeature, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Feature message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.verify|verify} messages.
                     * @param message Feature message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: io.cucumber.messages.GherkinDocument.IFeature, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Feature message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Feature
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.GherkinDocument.Feature;

                    /**
                     * Decodes a Feature message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Feature
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.GherkinDocument.Feature;

                    /**
                     * Verifies a Feature message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Feature message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Feature
                     */
                    public static fromObject(object: { [k: string]: any }): io.cucumber.messages.GherkinDocument.Feature;

                    /**
                     * Creates a plain object from a Feature message. Also converts values to other types if specified.
                     * @param message Feature
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: io.cucumber.messages.GherkinDocument.Feature, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Feature to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace Feature {

                    /** Properties of a Tag. */
                    interface ITag {

                        /** Tag location */
                        location?: (io.cucumber.messages.ILocation|null);

                        /** Tag name */
                        name?: (string|null);

                        /** Tag id */
                        id?: (string|null);
                    }

                    /** A tag */
                    class Tag implements ITag {

                        /**
                         * Constructs a new Tag.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: io.cucumber.messages.GherkinDocument.Feature.ITag);

                        /** Tag location. */
                        public location?: (io.cucumber.messages.ILocation|null);

                        /** Tag name. */
                        public name: string;

                        /** Tag id. */
                        public id: string;

                        /**
                         * Creates a new Tag instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Tag instance
                         */
                        public static create(properties?: io.cucumber.messages.GherkinDocument.Feature.ITag): io.cucumber.messages.GherkinDocument.Feature.Tag;

                        /**
                         * Encodes the specified Tag message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Tag.verify|verify} messages.
                         * @param message Tag message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: io.cucumber.messages.GherkinDocument.Feature.ITag, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified Tag message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Tag.verify|verify} messages.
                         * @param message Tag message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: io.cucumber.messages.GherkinDocument.Feature.ITag, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Tag message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Tag
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.GherkinDocument.Feature.Tag;

                        /**
                         * Decodes a Tag message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns Tag
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.GherkinDocument.Feature.Tag;

                        /**
                         * Verifies a Tag message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a Tag message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns Tag
                         */
                        public static fromObject(object: { [k: string]: any }): io.cucumber.messages.GherkinDocument.Feature.Tag;

                        /**
                         * Creates a plain object from a Tag message. Also converts values to other types if specified.
                         * @param message Tag
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: io.cucumber.messages.GherkinDocument.Feature.Tag, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this Tag to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a FeatureChild. */
                    interface IFeatureChild {

                        /** FeatureChild rule */
                        rule?: (io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRule|null);

                        /** FeatureChild background */
                        background?: (io.cucumber.messages.GherkinDocument.Feature.IBackground|null);

                        /** FeatureChild scenario */
                        scenario?: (io.cucumber.messages.GherkinDocument.Feature.IScenario|null);
                    }

                    /** A child node of a `Feature` node */
                    class FeatureChild implements IFeatureChild {

                        /**
                         * Constructs a new FeatureChild.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: io.cucumber.messages.GherkinDocument.Feature.IFeatureChild);

                        /** FeatureChild rule. */
                        public rule?: (io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRule|null);

                        /** FeatureChild background. */
                        public background?: (io.cucumber.messages.GherkinDocument.Feature.IBackground|null);

                        /** FeatureChild scenario. */
                        public scenario?: (io.cucumber.messages.GherkinDocument.Feature.IScenario|null);

                        /** FeatureChild value. */
                        public value?: ("rule"|"background"|"scenario");

                        /**
                         * Creates a new FeatureChild instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns FeatureChild instance
                         */
                        public static create(properties?: io.cucumber.messages.GherkinDocument.Feature.IFeatureChild): io.cucumber.messages.GherkinDocument.Feature.FeatureChild;

                        /**
                         * Encodes the specified FeatureChild message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.FeatureChild.verify|verify} messages.
                         * @param message FeatureChild message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: io.cucumber.messages.GherkinDocument.Feature.IFeatureChild, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified FeatureChild message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.FeatureChild.verify|verify} messages.
                         * @param message FeatureChild message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: io.cucumber.messages.GherkinDocument.Feature.IFeatureChild, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a FeatureChild message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns FeatureChild
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.GherkinDocument.Feature.FeatureChild;

                        /**
                         * Decodes a FeatureChild message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns FeatureChild
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.GherkinDocument.Feature.FeatureChild;

                        /**
                         * Verifies a FeatureChild message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a FeatureChild message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns FeatureChild
                         */
                        public static fromObject(object: { [k: string]: any }): io.cucumber.messages.GherkinDocument.Feature.FeatureChild;

                        /**
                         * Creates a plain object from a FeatureChild message. Also converts values to other types if specified.
                         * @param message FeatureChild
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: io.cucumber.messages.GherkinDocument.Feature.FeatureChild, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this FeatureChild to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    namespace FeatureChild {

                        /** Properties of a Rule. */
                        interface IRule {

                            /** Rule location */
                            location?: (io.cucumber.messages.ILocation|null);

                            /** Rule keyword */
                            keyword?: (string|null);

                            /** Rule name */
                            name?: (string|null);

                            /** Rule description */
                            description?: (string|null);

                            /** Rule children */
                            children?: (io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRuleChild[]|null);
                        }

                        /** A `Rule` node */
                        class Rule implements IRule {

                            /**
                             * Constructs a new Rule.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRule);

                            /** Rule location. */
                            public location?: (io.cucumber.messages.ILocation|null);

                            /** Rule keyword. */
                            public keyword: string;

                            /** Rule name. */
                            public name: string;

                            /** Rule description. */
                            public description: string;

                            /** Rule children. */
                            public children: io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRuleChild[];

                            /**
                             * Creates a new Rule instance using the specified properties.
                             * @param [properties] Properties to set
                             * @returns Rule instance
                             */
                            public static create(properties?: io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRule): io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule;

                            /**
                             * Encodes the specified Rule message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule.verify|verify} messages.
                             * @param message Rule message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encode(message: io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRule, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Encodes the specified Rule message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule.verify|verify} messages.
                             * @param message Rule message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encodeDelimited(message: io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRule, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Decodes a Rule message from the specified reader or buffer.
                             * @param reader Reader or buffer to decode from
                             * @param [length] Message length if known beforehand
                             * @returns Rule
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule;

                            /**
                             * Decodes a Rule message from the specified reader or buffer, length delimited.
                             * @param reader Reader or buffer to decode from
                             * @returns Rule
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule;

                            /**
                             * Verifies a Rule message.
                             * @param message Plain object to verify
                             * @returns `null` if valid, otherwise the reason why it is not
                             */
                            public static verify(message: { [k: string]: any }): (string|null);

                            /**
                             * Creates a Rule message from a plain object. Also converts values to their respective internal types.
                             * @param object Plain object
                             * @returns Rule
                             */
                            public static fromObject(object: { [k: string]: any }): io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule;

                            /**
                             * Creates a plain object from a Rule message. Also converts values to other types if specified.
                             * @param message Rule
                             * @param [options] Conversion options
                             * @returns Plain object
                             */
                            public static toObject(message: io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule, options?: $protobuf.IConversionOptions): { [k: string]: any };

                            /**
                             * Converts this Rule to JSON.
                             * @returns JSON object
                             */
                            public toJSON(): { [k: string]: any };
                        }

                        /** Properties of a RuleChild. */
                        interface IRuleChild {

                            /** RuleChild background */
                            background?: (io.cucumber.messages.GherkinDocument.Feature.IBackground|null);

                            /** RuleChild scenario */
                            scenario?: (io.cucumber.messages.GherkinDocument.Feature.IScenario|null);
                        }

                        /** Represents a RuleChild. */
                        class RuleChild implements IRuleChild {

                            /**
                             * Constructs a new RuleChild.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRuleChild);

                            /** RuleChild background. */
                            public background?: (io.cucumber.messages.GherkinDocument.Feature.IBackground|null);

                            /** RuleChild scenario. */
                            public scenario?: (io.cucumber.messages.GherkinDocument.Feature.IScenario|null);

                            /** RuleChild value. */
                            public value?: ("background"|"scenario");

                            /**
                             * Creates a new RuleChild instance using the specified properties.
                             * @param [properties] Properties to set
                             * @returns RuleChild instance
                             */
                            public static create(properties?: io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRuleChild): io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild;

                            /**
                             * Encodes the specified RuleChild message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild.verify|verify} messages.
                             * @param message RuleChild message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encode(message: io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRuleChild, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Encodes the specified RuleChild message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild.verify|verify} messages.
                             * @param message RuleChild message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encodeDelimited(message: io.cucumber.messages.GherkinDocument.Feature.FeatureChild.IRuleChild, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Decodes a RuleChild message from the specified reader or buffer.
                             * @param reader Reader or buffer to decode from
                             * @param [length] Message length if known beforehand
                             * @returns RuleChild
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild;

                            /**
                             * Decodes a RuleChild message from the specified reader or buffer, length delimited.
                             * @param reader Reader or buffer to decode from
                             * @returns RuleChild
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild;

                            /**
                             * Verifies a RuleChild message.
                             * @param message Plain object to verify
                             * @returns `null` if valid, otherwise the reason why it is not
                             */
                            public static verify(message: { [k: string]: any }): (string|null);

                            /**
                             * Creates a RuleChild message from a plain object. Also converts values to their respective internal types.
                             * @param object Plain object
                             * @returns RuleChild
                             */
                            public static fromObject(object: { [k: string]: any }): io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild;

                            /**
                             * Creates a plain object from a RuleChild message. Also converts values to other types if specified.
                             * @param message RuleChild
                             * @param [options] Conversion options
                             * @returns Plain object
                             */
                            public static toObject(message: io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild, options?: $protobuf.IConversionOptions): { [k: string]: any };

                            /**
                             * Converts this RuleChild to JSON.
                             * @returns JSON object
                             */
                            public toJSON(): { [k: string]: any };
                        }
                    }

                    /** Properties of a Background. */
                    interface IBackground {

                        /** Background location */
                        location?: (io.cucumber.messages.ILocation|null);

                        /** Background keyword */
                        keyword?: (string|null);

                        /** Background name */
                        name?: (string|null);

                        /** Background description */
                        description?: (string|null);

                        /** Background steps */
                        steps?: (io.cucumber.messages.GherkinDocument.Feature.IStep[]|null);
                    }

                    /** Represents a Background. */
                    class Background implements IBackground {

                        /**
                         * Constructs a new Background.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: io.cucumber.messages.GherkinDocument.Feature.IBackground);

                        /** Background location. */
                        public location?: (io.cucumber.messages.ILocation|null);

                        /** Background keyword. */
                        public keyword: string;

                        /** Background name. */
                        public name: string;

                        /** Background description. */
                        public description: string;

                        /** Background steps. */
                        public steps: io.cucumber.messages.GherkinDocument.Feature.IStep[];

                        /**
                         * Creates a new Background instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Background instance
                         */
                        public static create(properties?: io.cucumber.messages.GherkinDocument.Feature.IBackground): io.cucumber.messages.GherkinDocument.Feature.Background;

                        /**
                         * Encodes the specified Background message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Background.verify|verify} messages.
                         * @param message Background message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: io.cucumber.messages.GherkinDocument.Feature.IBackground, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified Background message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Background.verify|verify} messages.
                         * @param message Background message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: io.cucumber.messages.GherkinDocument.Feature.IBackground, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Background message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Background
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.GherkinDocument.Feature.Background;

                        /**
                         * Decodes a Background message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns Background
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.GherkinDocument.Feature.Background;

                        /**
                         * Verifies a Background message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a Background message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns Background
                         */
                        public static fromObject(object: { [k: string]: any }): io.cucumber.messages.GherkinDocument.Feature.Background;

                        /**
                         * Creates a plain object from a Background message. Also converts values to other types if specified.
                         * @param message Background
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: io.cucumber.messages.GherkinDocument.Feature.Background, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this Background to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a Scenario. */
                    interface IScenario {

                        /** Scenario location */
                        location?: (io.cucumber.messages.ILocation|null);

                        /** Scenario tags */
                        tags?: (io.cucumber.messages.GherkinDocument.Feature.ITag[]|null);

                        /** Scenario keyword */
                        keyword?: (string|null);

                        /** Scenario name */
                        name?: (string|null);

                        /** Scenario description */
                        description?: (string|null);

                        /** Scenario steps */
                        steps?: (io.cucumber.messages.GherkinDocument.Feature.IStep[]|null);

                        /** Scenario examples */
                        examples?: (io.cucumber.messages.GherkinDocument.Feature.Scenario.IExamples[]|null);

                        /** Scenario id */
                        id?: (string|null);
                    }

                    /** Represents a Scenario. */
                    class Scenario implements IScenario {

                        /**
                         * Constructs a new Scenario.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: io.cucumber.messages.GherkinDocument.Feature.IScenario);

                        /** Scenario location. */
                        public location?: (io.cucumber.messages.ILocation|null);

                        /** Scenario tags. */
                        public tags: io.cucumber.messages.GherkinDocument.Feature.ITag[];

                        /** Scenario keyword. */
                        public keyword: string;

                        /** Scenario name. */
                        public name: string;

                        /** Scenario description. */
                        public description: string;

                        /** Scenario steps. */
                        public steps: io.cucumber.messages.GherkinDocument.Feature.IStep[];

                        /** Scenario examples. */
                        public examples: io.cucumber.messages.GherkinDocument.Feature.Scenario.IExamples[];

                        /** Scenario id. */
                        public id: string;

                        /**
                         * Creates a new Scenario instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Scenario instance
                         */
                        public static create(properties?: io.cucumber.messages.GherkinDocument.Feature.IScenario): io.cucumber.messages.GherkinDocument.Feature.Scenario;

                        /**
                         * Encodes the specified Scenario message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Scenario.verify|verify} messages.
                         * @param message Scenario message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: io.cucumber.messages.GherkinDocument.Feature.IScenario, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified Scenario message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Scenario.verify|verify} messages.
                         * @param message Scenario message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: io.cucumber.messages.GherkinDocument.Feature.IScenario, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Scenario message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Scenario
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.GherkinDocument.Feature.Scenario;

                        /**
                         * Decodes a Scenario message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns Scenario
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.GherkinDocument.Feature.Scenario;

                        /**
                         * Verifies a Scenario message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a Scenario message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns Scenario
                         */
                        public static fromObject(object: { [k: string]: any }): io.cucumber.messages.GherkinDocument.Feature.Scenario;

                        /**
                         * Creates a plain object from a Scenario message. Also converts values to other types if specified.
                         * @param message Scenario
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: io.cucumber.messages.GherkinDocument.Feature.Scenario, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this Scenario to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    namespace Scenario {

                        /** Properties of an Examples. */
                        interface IExamples {

                            /** Examples location */
                            location?: (io.cucumber.messages.ILocation|null);

                            /** Examples tags */
                            tags?: (io.cucumber.messages.GherkinDocument.Feature.ITag[]|null);

                            /** Examples keyword */
                            keyword?: (string|null);

                            /** Examples name */
                            name?: (string|null);

                            /** Examples description */
                            description?: (string|null);

                            /** Examples tableHeader */
                            tableHeader?: (io.cucumber.messages.GherkinDocument.Feature.ITableRow|null);

                            /** Examples tableBody */
                            tableBody?: (io.cucumber.messages.GherkinDocument.Feature.ITableRow[]|null);
                        }

                        /** Represents an Examples. */
                        class Examples implements IExamples {

                            /**
                             * Constructs a new Examples.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: io.cucumber.messages.GherkinDocument.Feature.Scenario.IExamples);

                            /** Examples location. */
                            public location?: (io.cucumber.messages.ILocation|null);

                            /** Examples tags. */
                            public tags: io.cucumber.messages.GherkinDocument.Feature.ITag[];

                            /** Examples keyword. */
                            public keyword: string;

                            /** Examples name. */
                            public name: string;

                            /** Examples description. */
                            public description: string;

                            /** Examples tableHeader. */
                            public tableHeader?: (io.cucumber.messages.GherkinDocument.Feature.ITableRow|null);

                            /** Examples tableBody. */
                            public tableBody: io.cucumber.messages.GherkinDocument.Feature.ITableRow[];

                            /**
                             * Creates a new Examples instance using the specified properties.
                             * @param [properties] Properties to set
                             * @returns Examples instance
                             */
                            public static create(properties?: io.cucumber.messages.GherkinDocument.Feature.Scenario.IExamples): io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples;

                            /**
                             * Encodes the specified Examples message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples.verify|verify} messages.
                             * @param message Examples message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encode(message: io.cucumber.messages.GherkinDocument.Feature.Scenario.IExamples, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Encodes the specified Examples message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples.verify|verify} messages.
                             * @param message Examples message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encodeDelimited(message: io.cucumber.messages.GherkinDocument.Feature.Scenario.IExamples, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Decodes an Examples message from the specified reader or buffer.
                             * @param reader Reader or buffer to decode from
                             * @param [length] Message length if known beforehand
                             * @returns Examples
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples;

                            /**
                             * Decodes an Examples message from the specified reader or buffer, length delimited.
                             * @param reader Reader or buffer to decode from
                             * @returns Examples
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples;

                            /**
                             * Verifies an Examples message.
                             * @param message Plain object to verify
                             * @returns `null` if valid, otherwise the reason why it is not
                             */
                            public static verify(message: { [k: string]: any }): (string|null);

                            /**
                             * Creates an Examples message from a plain object. Also converts values to their respective internal types.
                             * @param object Plain object
                             * @returns Examples
                             */
                            public static fromObject(object: { [k: string]: any }): io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples;

                            /**
                             * Creates a plain object from an Examples message. Also converts values to other types if specified.
                             * @param message Examples
                             * @param [options] Conversion options
                             * @returns Plain object
                             */
                            public static toObject(message: io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples, options?: $protobuf.IConversionOptions): { [k: string]: any };

                            /**
                             * Converts this Examples to JSON.
                             * @returns JSON object
                             */
                            public toJSON(): { [k: string]: any };
                        }
                    }

                    /** Properties of a TableRow. */
                    interface ITableRow {

                        /** TableRow location */
                        location?: (io.cucumber.messages.ILocation|null);

                        /** TableRow cells */
                        cells?: (io.cucumber.messages.GherkinDocument.Feature.TableRow.ITableCell[]|null);

                        /** TableRow id */
                        id?: (string|null);
                    }

                    /** Represents a TableRow. */
                    class TableRow implements ITableRow {

                        /**
                         * Constructs a new TableRow.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: io.cucumber.messages.GherkinDocument.Feature.ITableRow);

                        /** TableRow location. */
                        public location?: (io.cucumber.messages.ILocation|null);

                        /** TableRow cells. */
                        public cells: io.cucumber.messages.GherkinDocument.Feature.TableRow.ITableCell[];

                        /** TableRow id. */
                        public id: string;

                        /**
                         * Creates a new TableRow instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns TableRow instance
                         */
                        public static create(properties?: io.cucumber.messages.GherkinDocument.Feature.ITableRow): io.cucumber.messages.GherkinDocument.Feature.TableRow;

                        /**
                         * Encodes the specified TableRow message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.TableRow.verify|verify} messages.
                         * @param message TableRow message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: io.cucumber.messages.GherkinDocument.Feature.ITableRow, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified TableRow message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.TableRow.verify|verify} messages.
                         * @param message TableRow message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: io.cucumber.messages.GherkinDocument.Feature.ITableRow, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a TableRow message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns TableRow
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.GherkinDocument.Feature.TableRow;

                        /**
                         * Decodes a TableRow message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns TableRow
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.GherkinDocument.Feature.TableRow;

                        /**
                         * Verifies a TableRow message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a TableRow message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns TableRow
                         */
                        public static fromObject(object: { [k: string]: any }): io.cucumber.messages.GherkinDocument.Feature.TableRow;

                        /**
                         * Creates a plain object from a TableRow message. Also converts values to other types if specified.
                         * @param message TableRow
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: io.cucumber.messages.GherkinDocument.Feature.TableRow, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this TableRow to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    namespace TableRow {

                        /** Properties of a TableCell. */
                        interface ITableCell {

                            /** TableCell location */
                            location?: (io.cucumber.messages.ILocation|null);

                            /** TableCell value */
                            value?: (string|null);
                        }

                        /** Represents a TableCell. */
                        class TableCell implements ITableCell {

                            /**
                             * Constructs a new TableCell.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: io.cucumber.messages.GherkinDocument.Feature.TableRow.ITableCell);

                            /** TableCell location. */
                            public location?: (io.cucumber.messages.ILocation|null);

                            /** TableCell value. */
                            public value: string;

                            /**
                             * Creates a new TableCell instance using the specified properties.
                             * @param [properties] Properties to set
                             * @returns TableCell instance
                             */
                            public static create(properties?: io.cucumber.messages.GherkinDocument.Feature.TableRow.ITableCell): io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell;

                            /**
                             * Encodes the specified TableCell message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell.verify|verify} messages.
                             * @param message TableCell message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encode(message: io.cucumber.messages.GherkinDocument.Feature.TableRow.ITableCell, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Encodes the specified TableCell message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell.verify|verify} messages.
                             * @param message TableCell message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encodeDelimited(message: io.cucumber.messages.GherkinDocument.Feature.TableRow.ITableCell, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Decodes a TableCell message from the specified reader or buffer.
                             * @param reader Reader or buffer to decode from
                             * @param [length] Message length if known beforehand
                             * @returns TableCell
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell;

                            /**
                             * Decodes a TableCell message from the specified reader or buffer, length delimited.
                             * @param reader Reader or buffer to decode from
                             * @returns TableCell
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell;

                            /**
                             * Verifies a TableCell message.
                             * @param message Plain object to verify
                             * @returns `null` if valid, otherwise the reason why it is not
                             */
                            public static verify(message: { [k: string]: any }): (string|null);

                            /**
                             * Creates a TableCell message from a plain object. Also converts values to their respective internal types.
                             * @param object Plain object
                             * @returns TableCell
                             */
                            public static fromObject(object: { [k: string]: any }): io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell;

                            /**
                             * Creates a plain object from a TableCell message. Also converts values to other types if specified.
                             * @param message TableCell
                             * @param [options] Conversion options
                             * @returns Plain object
                             */
                            public static toObject(message: io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell, options?: $protobuf.IConversionOptions): { [k: string]: any };

                            /**
                             * Converts this TableCell to JSON.
                             * @returns JSON object
                             */
                            public toJSON(): { [k: string]: any };
                        }
                    }

                    /** Properties of a Step. */
                    interface IStep {

                        /** Step location */
                        location?: (io.cucumber.messages.ILocation|null);

                        /** Step keyword */
                        keyword?: (string|null);

                        /** Step text */
                        text?: (string|null);

                        /** Step docString */
                        docString?: (io.cucumber.messages.GherkinDocument.Feature.Step.IDocString|null);

                        /** Step dataTable */
                        dataTable?: (io.cucumber.messages.GherkinDocument.Feature.Step.IDataTable|null);

                        /** Step id */
                        id?: (string|null);
                    }

                    /** Represents a Step. */
                    class Step implements IStep {

                        /**
                         * Constructs a new Step.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: io.cucumber.messages.GherkinDocument.Feature.IStep);

                        /** Step location. */
                        public location?: (io.cucumber.messages.ILocation|null);

                        /** Step keyword. */
                        public keyword: string;

                        /** Step text. */
                        public text: string;

                        /** Step docString. */
                        public docString?: (io.cucumber.messages.GherkinDocument.Feature.Step.IDocString|null);

                        /** Step dataTable. */
                        public dataTable?: (io.cucumber.messages.GherkinDocument.Feature.Step.IDataTable|null);

                        /** Step id. */
                        public id: string;

                        /** Step argument. */
                        public argument?: ("docString"|"dataTable");

                        /**
                         * Creates a new Step instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Step instance
                         */
                        public static create(properties?: io.cucumber.messages.GherkinDocument.Feature.IStep): io.cucumber.messages.GherkinDocument.Feature.Step;

                        /**
                         * Encodes the specified Step message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Step.verify|verify} messages.
                         * @param message Step message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: io.cucumber.messages.GherkinDocument.Feature.IStep, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified Step message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Step.verify|verify} messages.
                         * @param message Step message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: io.cucumber.messages.GherkinDocument.Feature.IStep, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Step message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Step
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.GherkinDocument.Feature.Step;

                        /**
                         * Decodes a Step message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns Step
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.GherkinDocument.Feature.Step;

                        /**
                         * Verifies a Step message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a Step message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns Step
                         */
                        public static fromObject(object: { [k: string]: any }): io.cucumber.messages.GherkinDocument.Feature.Step;

                        /**
                         * Creates a plain object from a Step message. Also converts values to other types if specified.
                         * @param message Step
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: io.cucumber.messages.GherkinDocument.Feature.Step, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this Step to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    namespace Step {

                        /** Properties of a DataTable. */
                        interface IDataTable {

                            /** DataTable location */
                            location?: (io.cucumber.messages.ILocation|null);

                            /** DataTable rows */
                            rows?: (io.cucumber.messages.GherkinDocument.Feature.ITableRow[]|null);
                        }

                        /** Represents a DataTable. */
                        class DataTable implements IDataTable {

                            /**
                             * Constructs a new DataTable.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: io.cucumber.messages.GherkinDocument.Feature.Step.IDataTable);

                            /** DataTable location. */
                            public location?: (io.cucumber.messages.ILocation|null);

                            /** DataTable rows. */
                            public rows: io.cucumber.messages.GherkinDocument.Feature.ITableRow[];

                            /**
                             * Creates a new DataTable instance using the specified properties.
                             * @param [properties] Properties to set
                             * @returns DataTable instance
                             */
                            public static create(properties?: io.cucumber.messages.GherkinDocument.Feature.Step.IDataTable): io.cucumber.messages.GherkinDocument.Feature.Step.DataTable;

                            /**
                             * Encodes the specified DataTable message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Step.DataTable.verify|verify} messages.
                             * @param message DataTable message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encode(message: io.cucumber.messages.GherkinDocument.Feature.Step.IDataTable, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Encodes the specified DataTable message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Step.DataTable.verify|verify} messages.
                             * @param message DataTable message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encodeDelimited(message: io.cucumber.messages.GherkinDocument.Feature.Step.IDataTable, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Decodes a DataTable message from the specified reader or buffer.
                             * @param reader Reader or buffer to decode from
                             * @param [length] Message length if known beforehand
                             * @returns DataTable
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.GherkinDocument.Feature.Step.DataTable;

                            /**
                             * Decodes a DataTable message from the specified reader or buffer, length delimited.
                             * @param reader Reader or buffer to decode from
                             * @returns DataTable
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.GherkinDocument.Feature.Step.DataTable;

                            /**
                             * Verifies a DataTable message.
                             * @param message Plain object to verify
                             * @returns `null` if valid, otherwise the reason why it is not
                             */
                            public static verify(message: { [k: string]: any }): (string|null);

                            /**
                             * Creates a DataTable message from a plain object. Also converts values to their respective internal types.
                             * @param object Plain object
                             * @returns DataTable
                             */
                            public static fromObject(object: { [k: string]: any }): io.cucumber.messages.GherkinDocument.Feature.Step.DataTable;

                            /**
                             * Creates a plain object from a DataTable message. Also converts values to other types if specified.
                             * @param message DataTable
                             * @param [options] Conversion options
                             * @returns Plain object
                             */
                            public static toObject(message: io.cucumber.messages.GherkinDocument.Feature.Step.DataTable, options?: $protobuf.IConversionOptions): { [k: string]: any };

                            /**
                             * Converts this DataTable to JSON.
                             * @returns JSON object
                             */
                            public toJSON(): { [k: string]: any };
                        }

                        /** Properties of a DocString. */
                        interface IDocString {

                            /** DocString location */
                            location?: (io.cucumber.messages.ILocation|null);

                            /** DocString mediaType */
                            mediaType?: (string|null);

                            /** DocString content */
                            content?: (string|null);

                            /** DocString delimiter */
                            delimiter?: (string|null);
                        }

                        /** Represents a DocString. */
                        class DocString implements IDocString {

                            /**
                             * Constructs a new DocString.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: io.cucumber.messages.GherkinDocument.Feature.Step.IDocString);

                            /** DocString location. */
                            public location?: (io.cucumber.messages.ILocation|null);

                            /** DocString mediaType. */
                            public mediaType: string;

                            /** DocString content. */
                            public content: string;

                            /** DocString delimiter. */
                            public delimiter: string;

                            /**
                             * Creates a new DocString instance using the specified properties.
                             * @param [properties] Properties to set
                             * @returns DocString instance
                             */
                            public static create(properties?: io.cucumber.messages.GherkinDocument.Feature.Step.IDocString): io.cucumber.messages.GherkinDocument.Feature.Step.DocString;

                            /**
                             * Encodes the specified DocString message. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Step.DocString.verify|verify} messages.
                             * @param message DocString message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encode(message: io.cucumber.messages.GherkinDocument.Feature.Step.IDocString, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Encodes the specified DocString message, length delimited. Does not implicitly {@link io.cucumber.messages.GherkinDocument.Feature.Step.DocString.verify|verify} messages.
                             * @param message DocString message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encodeDelimited(message: io.cucumber.messages.GherkinDocument.Feature.Step.IDocString, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Decodes a DocString message from the specified reader or buffer.
                             * @param reader Reader or buffer to decode from
                             * @param [length] Message length if known beforehand
                             * @returns DocString
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.GherkinDocument.Feature.Step.DocString;

                            /**
                             * Decodes a DocString message from the specified reader or buffer, length delimited.
                             * @param reader Reader or buffer to decode from
                             * @returns DocString
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.GherkinDocument.Feature.Step.DocString;

                            /**
                             * Verifies a DocString message.
                             * @param message Plain object to verify
                             * @returns `null` if valid, otherwise the reason why it is not
                             */
                            public static verify(message: { [k: string]: any }): (string|null);

                            /**
                             * Creates a DocString message from a plain object. Also converts values to their respective internal types.
                             * @param object Plain object
                             * @returns DocString
                             */
                            public static fromObject(object: { [k: string]: any }): io.cucumber.messages.GherkinDocument.Feature.Step.DocString;

                            /**
                             * Creates a plain object from a DocString message. Also converts values to other types if specified.
                             * @param message DocString
                             * @param [options] Conversion options
                             * @returns Plain object
                             */
                            public static toObject(message: io.cucumber.messages.GherkinDocument.Feature.Step.DocString, options?: $protobuf.IConversionOptions): { [k: string]: any };

                            /**
                             * Converts this DocString to JSON.
                             * @returns JSON object
                             */
                            public toJSON(): { [k: string]: any };
                        }
                    }
                }
            }

            /** Properties of an Attachment. */
            interface IAttachment {

                /** Attachment source */
                source?: (io.cucumber.messages.ISourceReference|null);

                /** Attachment testStepId */
                testStepId?: (string|null);

                /** Attachment testCaseStartedId */
                testCaseStartedId?: (string|null);

                /** Attachment text */
                text?: (string|null);

                /** Attachment binary */
                binary?: (Uint8Array|null);

                /**
                 * The media type of the data. This can be any valid
                 * [IANA Media Type](https://www.iana.org/assignments/media-types/media-types.xhtml)
                 * as well as Cucumber-specific media types such as `text/x.cucumber.gherkin+plain`
                 * and `text/x.cucumber.stacktrace+plain`
                 */
                mediaType?: (string|null);
            }

            /**
             * An attachment represents any kind of data associated with a line in a
             * [Source](#io.cucumber.messages.Source) file. It can be used for:
             *
             * * Syntax errors during parse time
             * * Screenshots captured and attached during execution
             * * Logs captured and attached during execution
             *
             * It is not to be used for runtime errors raised/thrown during execution. This
             * is captured in `TestResult`.
             */
            class Attachment implements IAttachment {

                /**
                 * Constructs a new Attachment.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IAttachment);

                /** Attachment source. */
                public source?: (io.cucumber.messages.ISourceReference|null);

                /** Attachment testStepId. */
                public testStepId: string;

                /** Attachment testCaseStartedId. */
                public testCaseStartedId: string;

                /** Attachment text. */
                public text: string;

                /** Attachment binary. */
                public binary: Uint8Array;

                /**
                 * The media type of the data. This can be any valid
                 * [IANA Media Type](https://www.iana.org/assignments/media-types/media-types.xhtml)
                 * as well as Cucumber-specific media types such as `text/x.cucumber.gherkin+plain`
                 * and `text/x.cucumber.stacktrace+plain`
                 */
                public mediaType: string;

                /** Attachment body. */
                public body?: ("text"|"binary");

                /**
                 * Creates a new Attachment instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Attachment instance
                 */
                public static create(properties?: io.cucumber.messages.IAttachment): io.cucumber.messages.Attachment;

                /**
                 * Encodes the specified Attachment message. Does not implicitly {@link io.cucumber.messages.Attachment.verify|verify} messages.
                 * @param message Attachment message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IAttachment, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Attachment message, length delimited. Does not implicitly {@link io.cucumber.messages.Attachment.verify|verify} messages.
                 * @param message Attachment message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IAttachment, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an Attachment message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Attachment
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Attachment;

                /**
                 * Decodes an Attachment message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Attachment
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Attachment;

                /**
                 * Verifies an Attachment message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an Attachment message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Attachment
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Attachment;

                /**
                 * Creates a plain object from an Attachment message. Also converts values to other types if specified.
                 * @param message Attachment
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.Attachment, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Attachment to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Pickle. */
            interface IPickle {

                /**
                 * A unique id for the pickle. This is a [SHA1](https://en.wikipedia.org/wiki/SHA-1) hash
                 * from the source data and the `locations` of the pickle.
                 * This ID will change if source the file is modified.
                 */
                id?: (string|null);

                /** Pickle uri */
                uri?: (string|null);

                /** Pickle name */
                name?: (string|null);

                /** Pickle language */
                language?: (string|null);

                /** Pickle steps */
                steps?: (io.cucumber.messages.Pickle.IPickleStep[]|null);

                /**
                 * One or more tags. If this pickle is constructed from a Gherkin document,
                 * It includes inherited tags from the `Feature` as well.
                 */
                tags?: (io.cucumber.messages.Pickle.IPickleTag[]|null);

                /**
                 * Points to the AST node locations of the pickle. The last one represents the unique
                 * id of the pickle. A pickle constructed from `Examples` will have the first
                 * id originating from the `Scenario` AST node, and the second from the `TableRow` AST node.
                 */
                astNodeIds?: (string[]|null);
            }

            /**
             * A `Pickle` represents a template for a `TestCase`. It is typically derived
             * from another format, such as [GherkinDocument](#io.cucumber.messages.GherkinDocument).
             * In the future a `Pickle` may be derived from other formats such as Markdown or
             * Excel files.
             *
             * By making `Pickle` the main data structure Cucumber uses for execution, the
             * implementation of Cucumber itself becomes simpler, as it doesn't have to deal
             * with the complex structure of a [GherkinDocument](#io.cucumber.messages.GherkinDocument).
             *
             * Each `PickleStep` of a `Pickle` is matched with a `StepDefinition` to create a `TestCase`
             */
            class Pickle implements IPickle {

                /**
                 * Constructs a new Pickle.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IPickle);

                /**
                 * A unique id for the pickle. This is a [SHA1](https://en.wikipedia.org/wiki/SHA-1) hash
                 * from the source data and the `locations` of the pickle.
                 * This ID will change if source the file is modified.
                 */
                public id: string;

                /** Pickle uri. */
                public uri: string;

                /** Pickle name. */
                public name: string;

                /** Pickle language. */
                public language: string;

                /** Pickle steps. */
                public steps: io.cucumber.messages.Pickle.IPickleStep[];

                /**
                 * One or more tags. If this pickle is constructed from a Gherkin document,
                 * It includes inherited tags from the `Feature` as well.
                 */
                public tags: io.cucumber.messages.Pickle.IPickleTag[];

                /**
                 * Points to the AST node locations of the pickle. The last one represents the unique
                 * id of the pickle. A pickle constructed from `Examples` will have the first
                 * id originating from the `Scenario` AST node, and the second from the `TableRow` AST node.
                 */
                public astNodeIds: string[];

                /**
                 * Creates a new Pickle instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Pickle instance
                 */
                public static create(properties?: io.cucumber.messages.IPickle): io.cucumber.messages.Pickle;

                /**
                 * Encodes the specified Pickle message. Does not implicitly {@link io.cucumber.messages.Pickle.verify|verify} messages.
                 * @param message Pickle message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IPickle, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Pickle message, length delimited. Does not implicitly {@link io.cucumber.messages.Pickle.verify|verify} messages.
                 * @param message Pickle message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IPickle, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Pickle message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Pickle
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Pickle;

                /**
                 * Decodes a Pickle message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Pickle
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Pickle;

                /**
                 * Verifies a Pickle message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Pickle message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Pickle
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Pickle;

                /**
                 * Creates a plain object from a Pickle message. Also converts values to other types if specified.
                 * @param message Pickle
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.Pickle, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Pickle to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace Pickle {

                /** Properties of a PickleTag. */
                interface IPickleTag {

                    /** PickleTag name */
                    name?: (string|null);

                    /** PickleTag astNodeId */
                    astNodeId?: (string|null);
                }

                /** A tag */
                class PickleTag implements IPickleTag {

                    /**
                     * Constructs a new PickleTag.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: io.cucumber.messages.Pickle.IPickleTag);

                    /** PickleTag name. */
                    public name: string;

                    /** PickleTag astNodeId. */
                    public astNodeId: string;

                    /**
                     * Creates a new PickleTag instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns PickleTag instance
                     */
                    public static create(properties?: io.cucumber.messages.Pickle.IPickleTag): io.cucumber.messages.Pickle.PickleTag;

                    /**
                     * Encodes the specified PickleTag message. Does not implicitly {@link io.cucumber.messages.Pickle.PickleTag.verify|verify} messages.
                     * @param message PickleTag message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: io.cucumber.messages.Pickle.IPickleTag, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified PickleTag message, length delimited. Does not implicitly {@link io.cucumber.messages.Pickle.PickleTag.verify|verify} messages.
                     * @param message PickleTag message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: io.cucumber.messages.Pickle.IPickleTag, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a PickleTag message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns PickleTag
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Pickle.PickleTag;

                    /**
                     * Decodes a PickleTag message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns PickleTag
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Pickle.PickleTag;

                    /**
                     * Verifies a PickleTag message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a PickleTag message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns PickleTag
                     */
                    public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Pickle.PickleTag;

                    /**
                     * Creates a plain object from a PickleTag message. Also converts values to other types if specified.
                     * @param message PickleTag
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: io.cucumber.messages.Pickle.PickleTag, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this PickleTag to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a PickleStep. */
                interface IPickleStep {

                    /** PickleStep text */
                    text?: (string|null);

                    /** PickleStep argument */
                    argument?: (io.cucumber.messages.IPickleStepArgument|null);

                    /** PickleStep id */
                    id?: (string|null);

                    /** PickleStep astNodeIds */
                    astNodeIds?: (string[]|null);
                }

                /** An executable step */
                class PickleStep implements IPickleStep {

                    /**
                     * Constructs a new PickleStep.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: io.cucumber.messages.Pickle.IPickleStep);

                    /** PickleStep text. */
                    public text: string;

                    /** PickleStep argument. */
                    public argument?: (io.cucumber.messages.IPickleStepArgument|null);

                    /** PickleStep id. */
                    public id: string;

                    /** PickleStep astNodeIds. */
                    public astNodeIds: string[];

                    /**
                     * Creates a new PickleStep instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns PickleStep instance
                     */
                    public static create(properties?: io.cucumber.messages.Pickle.IPickleStep): io.cucumber.messages.Pickle.PickleStep;

                    /**
                     * Encodes the specified PickleStep message. Does not implicitly {@link io.cucumber.messages.Pickle.PickleStep.verify|verify} messages.
                     * @param message PickleStep message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: io.cucumber.messages.Pickle.IPickleStep, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified PickleStep message, length delimited. Does not implicitly {@link io.cucumber.messages.Pickle.PickleStep.verify|verify} messages.
                     * @param message PickleStep message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: io.cucumber.messages.Pickle.IPickleStep, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a PickleStep message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns PickleStep
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Pickle.PickleStep;

                    /**
                     * Decodes a PickleStep message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns PickleStep
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Pickle.PickleStep;

                    /**
                     * Verifies a PickleStep message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a PickleStep message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns PickleStep
                     */
                    public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Pickle.PickleStep;

                    /**
                     * Creates a plain object from a PickleStep message. Also converts values to other types if specified.
                     * @param message PickleStep
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: io.cucumber.messages.Pickle.PickleStep, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this PickleStep to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** Properties of a PickleStepArgument. */
            interface IPickleStepArgument {

                /** PickleStepArgument docString */
                docString?: (io.cucumber.messages.PickleStepArgument.IPickleDocString|null);

                /** PickleStepArgument dataTable */
                dataTable?: (io.cucumber.messages.PickleStepArgument.IPickleTable|null);
            }

            /** A wrapper for either a doc string or a table. */
            class PickleStepArgument implements IPickleStepArgument {

                /**
                 * Constructs a new PickleStepArgument.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IPickleStepArgument);

                /** PickleStepArgument docString. */
                public docString?: (io.cucumber.messages.PickleStepArgument.IPickleDocString|null);

                /** PickleStepArgument dataTable. */
                public dataTable?: (io.cucumber.messages.PickleStepArgument.IPickleTable|null);

                /** PickleStepArgument message. */
                public message?: ("docString"|"dataTable");

                /**
                 * Creates a new PickleStepArgument instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PickleStepArgument instance
                 */
                public static create(properties?: io.cucumber.messages.IPickleStepArgument): io.cucumber.messages.PickleStepArgument;

                /**
                 * Encodes the specified PickleStepArgument message. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.verify|verify} messages.
                 * @param message PickleStepArgument message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IPickleStepArgument, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PickleStepArgument message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.verify|verify} messages.
                 * @param message PickleStepArgument message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IPickleStepArgument, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PickleStepArgument message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PickleStepArgument
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.PickleStepArgument;

                /**
                 * Decodes a PickleStepArgument message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PickleStepArgument
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.PickleStepArgument;

                /**
                 * Verifies a PickleStepArgument message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PickleStepArgument message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PickleStepArgument
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.PickleStepArgument;

                /**
                 * Creates a plain object from a PickleStepArgument message. Also converts values to other types if specified.
                 * @param message PickleStepArgument
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.PickleStepArgument, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PickleStepArgument to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace PickleStepArgument {

                /** Properties of a PickleDocString. */
                interface IPickleDocString {

                    /** PickleDocString mediaType */
                    mediaType?: (string|null);

                    /** PickleDocString content */
                    content?: (string|null);
                }

                /** Represents a PickleDocString. */
                class PickleDocString implements IPickleDocString {

                    /**
                     * Constructs a new PickleDocString.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: io.cucumber.messages.PickleStepArgument.IPickleDocString);

                    /** PickleDocString mediaType. */
                    public mediaType: string;

                    /** PickleDocString content. */
                    public content: string;

                    /**
                     * Creates a new PickleDocString instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns PickleDocString instance
                     */
                    public static create(properties?: io.cucumber.messages.PickleStepArgument.IPickleDocString): io.cucumber.messages.PickleStepArgument.PickleDocString;

                    /**
                     * Encodes the specified PickleDocString message. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.PickleDocString.verify|verify} messages.
                     * @param message PickleDocString message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: io.cucumber.messages.PickleStepArgument.IPickleDocString, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified PickleDocString message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.PickleDocString.verify|verify} messages.
                     * @param message PickleDocString message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: io.cucumber.messages.PickleStepArgument.IPickleDocString, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a PickleDocString message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns PickleDocString
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.PickleStepArgument.PickleDocString;

                    /**
                     * Decodes a PickleDocString message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns PickleDocString
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.PickleStepArgument.PickleDocString;

                    /**
                     * Verifies a PickleDocString message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a PickleDocString message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns PickleDocString
                     */
                    public static fromObject(object: { [k: string]: any }): io.cucumber.messages.PickleStepArgument.PickleDocString;

                    /**
                     * Creates a plain object from a PickleDocString message. Also converts values to other types if specified.
                     * @param message PickleDocString
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: io.cucumber.messages.PickleStepArgument.PickleDocString, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this PickleDocString to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a PickleTable. */
                interface IPickleTable {

                    /** PickleTable rows */
                    rows?: (io.cucumber.messages.PickleStepArgument.PickleTable.IPickleTableRow[]|null);
                }

                /** Represents a PickleTable. */
                class PickleTable implements IPickleTable {

                    /**
                     * Constructs a new PickleTable.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: io.cucumber.messages.PickleStepArgument.IPickleTable);

                    /** PickleTable rows. */
                    public rows: io.cucumber.messages.PickleStepArgument.PickleTable.IPickleTableRow[];

                    /**
                     * Creates a new PickleTable instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns PickleTable instance
                     */
                    public static create(properties?: io.cucumber.messages.PickleStepArgument.IPickleTable): io.cucumber.messages.PickleStepArgument.PickleTable;

                    /**
                     * Encodes the specified PickleTable message. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.PickleTable.verify|verify} messages.
                     * @param message PickleTable message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: io.cucumber.messages.PickleStepArgument.IPickleTable, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified PickleTable message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.PickleTable.verify|verify} messages.
                     * @param message PickleTable message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: io.cucumber.messages.PickleStepArgument.IPickleTable, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a PickleTable message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns PickleTable
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.PickleStepArgument.PickleTable;

                    /**
                     * Decodes a PickleTable message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns PickleTable
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.PickleStepArgument.PickleTable;

                    /**
                     * Verifies a PickleTable message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a PickleTable message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns PickleTable
                     */
                    public static fromObject(object: { [k: string]: any }): io.cucumber.messages.PickleStepArgument.PickleTable;

                    /**
                     * Creates a plain object from a PickleTable message. Also converts values to other types if specified.
                     * @param message PickleTable
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: io.cucumber.messages.PickleStepArgument.PickleTable, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this PickleTable to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace PickleTable {

                    /** Properties of a PickleTableRow. */
                    interface IPickleTableRow {

                        /** PickleTableRow cells */
                        cells?: (io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.IPickleTableCell[]|null);
                    }

                    /** Represents a PickleTableRow. */
                    class PickleTableRow implements IPickleTableRow {

                        /**
                         * Constructs a new PickleTableRow.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: io.cucumber.messages.PickleStepArgument.PickleTable.IPickleTableRow);

                        /** PickleTableRow cells. */
                        public cells: io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.IPickleTableCell[];

                        /**
                         * Creates a new PickleTableRow instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns PickleTableRow instance
                         */
                        public static create(properties?: io.cucumber.messages.PickleStepArgument.PickleTable.IPickleTableRow): io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow;

                        /**
                         * Encodes the specified PickleTableRow message. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.verify|verify} messages.
                         * @param message PickleTableRow message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: io.cucumber.messages.PickleStepArgument.PickleTable.IPickleTableRow, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified PickleTableRow message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.verify|verify} messages.
                         * @param message PickleTableRow message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: io.cucumber.messages.PickleStepArgument.PickleTable.IPickleTableRow, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a PickleTableRow message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns PickleTableRow
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow;

                        /**
                         * Decodes a PickleTableRow message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns PickleTableRow
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow;

                        /**
                         * Verifies a PickleTableRow message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a PickleTableRow message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns PickleTableRow
                         */
                        public static fromObject(object: { [k: string]: any }): io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow;

                        /**
                         * Creates a plain object from a PickleTableRow message. Also converts values to other types if specified.
                         * @param message PickleTableRow
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this PickleTableRow to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    namespace PickleTableRow {

                        /** Properties of a PickleTableCell. */
                        interface IPickleTableCell {

                            /** PickleTableCell value */
                            value?: (string|null);
                        }

                        /** Represents a PickleTableCell. */
                        class PickleTableCell implements IPickleTableCell {

                            /**
                             * Constructs a new PickleTableCell.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.IPickleTableCell);

                            /** PickleTableCell value. */
                            public value: string;

                            /**
                             * Creates a new PickleTableCell instance using the specified properties.
                             * @param [properties] Properties to set
                             * @returns PickleTableCell instance
                             */
                            public static create(properties?: io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.IPickleTableCell): io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell;

                            /**
                             * Encodes the specified PickleTableCell message. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell.verify|verify} messages.
                             * @param message PickleTableCell message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encode(message: io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.IPickleTableCell, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Encodes the specified PickleTableCell message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell.verify|verify} messages.
                             * @param message PickleTableCell message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encodeDelimited(message: io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.IPickleTableCell, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Decodes a PickleTableCell message from the specified reader or buffer.
                             * @param reader Reader or buffer to decode from
                             * @param [length] Message length if known beforehand
                             * @returns PickleTableCell
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell;

                            /**
                             * Decodes a PickleTableCell message from the specified reader or buffer, length delimited.
                             * @param reader Reader or buffer to decode from
                             * @returns PickleTableCell
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell;

                            /**
                             * Verifies a PickleTableCell message.
                             * @param message Plain object to verify
                             * @returns `null` if valid, otherwise the reason why it is not
                             */
                            public static verify(message: { [k: string]: any }): (string|null);

                            /**
                             * Creates a PickleTableCell message from a plain object. Also converts values to their respective internal types.
                             * @param object Plain object
                             * @returns PickleTableCell
                             */
                            public static fromObject(object: { [k: string]: any }): io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell;

                            /**
                             * Creates a plain object from a PickleTableCell message. Also converts values to other types if specified.
                             * @param message PickleTableCell
                             * @param [options] Conversion options
                             * @returns Plain object
                             */
                            public static toObject(message: io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell, options?: $protobuf.IConversionOptions): { [k: string]: any };

                            /**
                             * Converts this PickleTableCell to JSON.
                             * @returns JSON object
                             */
                            public toJSON(): { [k: string]: any };
                        }
                    }
                }
            }

            /** Properties of a TestCase. */
            interface ITestCase {

                /** TestCase id */
                id?: (string|null);

                /** TestCase pickleId */
                pickleId?: (string|null);

                /** TestCase testSteps */
                testSteps?: (io.cucumber.messages.TestCase.ITestStep[]|null);
            }

            /** A `TestCase` contains a sequence of `TestStep`s. */
            class TestCase implements ITestCase {

                /**
                 * Constructs a new TestCase.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITestCase);

                /** TestCase id. */
                public id: string;

                /** TestCase pickleId. */
                public pickleId: string;

                /** TestCase testSteps. */
                public testSteps: io.cucumber.messages.TestCase.ITestStep[];

                /**
                 * Creates a new TestCase instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TestCase instance
                 */
                public static create(properties?: io.cucumber.messages.ITestCase): io.cucumber.messages.TestCase;

                /**
                 * Encodes the specified TestCase message. Does not implicitly {@link io.cucumber.messages.TestCase.verify|verify} messages.
                 * @param message TestCase message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ITestCase, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TestCase message, length delimited. Does not implicitly {@link io.cucumber.messages.TestCase.verify|verify} messages.
                 * @param message TestCase message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ITestCase, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TestCase message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TestCase
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.TestCase;

                /**
                 * Decodes a TestCase message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TestCase
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.TestCase;

                /**
                 * Verifies a TestCase message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TestCase message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TestCase
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.TestCase;

                /**
                 * Creates a plain object from a TestCase message. Also converts values to other types if specified.
                 * @param message TestCase
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.TestCase, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TestCase to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace TestCase {

                /** Properties of a TestStep. */
                interface ITestStep {

                    /** TestStep id */
                    id?: (string|null);

                    /** TestStep pickleStepId */
                    pickleStepId?: (string|null);

                    /** TestStep stepDefinitionIds */
                    stepDefinitionIds?: (string[]|null);

                    /** TestStep stepMatchArgumentsLists */
                    stepMatchArgumentsLists?: (io.cucumber.messages.TestCase.TestStep.IStepMatchArgumentsList[]|null);

                    /** TestStep hookId */
                    hookId?: (string|null);
                }

                /**
                 * A `TestStep` is derived from either a `PickleStep`
                 * combined with a `StepDefinition`, or from a `Hook`.
                 */
                class TestStep implements ITestStep {

                    /**
                     * Constructs a new TestStep.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: io.cucumber.messages.TestCase.ITestStep);

                    /** TestStep id. */
                    public id: string;

                    /** TestStep pickleStepId. */
                    public pickleStepId: string;

                    /** TestStep stepDefinitionIds. */
                    public stepDefinitionIds: string[];

                    /** TestStep stepMatchArgumentsLists. */
                    public stepMatchArgumentsLists: io.cucumber.messages.TestCase.TestStep.IStepMatchArgumentsList[];

                    /** TestStep hookId. */
                    public hookId: string;

                    /**
                     * Creates a new TestStep instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns TestStep instance
                     */
                    public static create(properties?: io.cucumber.messages.TestCase.ITestStep): io.cucumber.messages.TestCase.TestStep;

                    /**
                     * Encodes the specified TestStep message. Does not implicitly {@link io.cucumber.messages.TestCase.TestStep.verify|verify} messages.
                     * @param message TestStep message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: io.cucumber.messages.TestCase.ITestStep, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified TestStep message, length delimited. Does not implicitly {@link io.cucumber.messages.TestCase.TestStep.verify|verify} messages.
                     * @param message TestStep message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: io.cucumber.messages.TestCase.ITestStep, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a TestStep message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns TestStep
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.TestCase.TestStep;

                    /**
                     * Decodes a TestStep message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns TestStep
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.TestCase.TestStep;

                    /**
                     * Verifies a TestStep message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a TestStep message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns TestStep
                     */
                    public static fromObject(object: { [k: string]: any }): io.cucumber.messages.TestCase.TestStep;

                    /**
                     * Creates a plain object from a TestStep message. Also converts values to other types if specified.
                     * @param message TestStep
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: io.cucumber.messages.TestCase.TestStep, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this TestStep to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace TestStep {

                    /** Properties of a StepMatchArgumentsList. */
                    interface IStepMatchArgumentsList {

                        /** StepMatchArgumentsList stepMatchArguments */
                        stepMatchArguments?: (io.cucumber.messages.IStepMatchArgument[]|null);
                    }

                    /** Represents a StepMatchArgumentsList. */
                    class StepMatchArgumentsList implements IStepMatchArgumentsList {

                        /**
                         * Constructs a new StepMatchArgumentsList.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: io.cucumber.messages.TestCase.TestStep.IStepMatchArgumentsList);

                        /** StepMatchArgumentsList stepMatchArguments. */
                        public stepMatchArguments: io.cucumber.messages.IStepMatchArgument[];

                        /**
                         * Creates a new StepMatchArgumentsList instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns StepMatchArgumentsList instance
                         */
                        public static create(properties?: io.cucumber.messages.TestCase.TestStep.IStepMatchArgumentsList): io.cucumber.messages.TestCase.TestStep.StepMatchArgumentsList;

                        /**
                         * Encodes the specified StepMatchArgumentsList message. Does not implicitly {@link io.cucumber.messages.TestCase.TestStep.StepMatchArgumentsList.verify|verify} messages.
                         * @param message StepMatchArgumentsList message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: io.cucumber.messages.TestCase.TestStep.IStepMatchArgumentsList, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified StepMatchArgumentsList message, length delimited. Does not implicitly {@link io.cucumber.messages.TestCase.TestStep.StepMatchArgumentsList.verify|verify} messages.
                         * @param message StepMatchArgumentsList message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: io.cucumber.messages.TestCase.TestStep.IStepMatchArgumentsList, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a StepMatchArgumentsList message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns StepMatchArgumentsList
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.TestCase.TestStep.StepMatchArgumentsList;

                        /**
                         * Decodes a StepMatchArgumentsList message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns StepMatchArgumentsList
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.TestCase.TestStep.StepMatchArgumentsList;

                        /**
                         * Verifies a StepMatchArgumentsList message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a StepMatchArgumentsList message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns StepMatchArgumentsList
                         */
                        public static fromObject(object: { [k: string]: any }): io.cucumber.messages.TestCase.TestStep.StepMatchArgumentsList;

                        /**
                         * Creates a plain object from a StepMatchArgumentsList message. Also converts values to other types if specified.
                         * @param message StepMatchArgumentsList
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: io.cucumber.messages.TestCase.TestStep.StepMatchArgumentsList, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this StepMatchArgumentsList to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }
            }

            /** Properties of a PickleAccepted. */
            interface IPickleAccepted {

                /** PickleAccepted pickleId */
                pickleId?: (string|null);
            }

            /** Represents a PickleAccepted. */
            class PickleAccepted implements IPickleAccepted {

                /**
                 * Constructs a new PickleAccepted.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IPickleAccepted);

                /** PickleAccepted pickleId. */
                public pickleId: string;

                /**
                 * Creates a new PickleAccepted instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PickleAccepted instance
                 */
                public static create(properties?: io.cucumber.messages.IPickleAccepted): io.cucumber.messages.PickleAccepted;

                /**
                 * Encodes the specified PickleAccepted message. Does not implicitly {@link io.cucumber.messages.PickleAccepted.verify|verify} messages.
                 * @param message PickleAccepted message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IPickleAccepted, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PickleAccepted message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleAccepted.verify|verify} messages.
                 * @param message PickleAccepted message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IPickleAccepted, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PickleAccepted message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PickleAccepted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.PickleAccepted;

                /**
                 * Decodes a PickleAccepted message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PickleAccepted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.PickleAccepted;

                /**
                 * Verifies a PickleAccepted message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PickleAccepted message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PickleAccepted
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.PickleAccepted;

                /**
                 * Creates a plain object from a PickleAccepted message. Also converts values to other types if specified.
                 * @param message PickleAccepted
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.PickleAccepted, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PickleAccepted to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a PickleRejected. */
            interface IPickleRejected {

                /** PickleRejected pickleId */
                pickleId?: (string|null);
            }

            /** Represents a PickleRejected. */
            class PickleRejected implements IPickleRejected {

                /**
                 * Constructs a new PickleRejected.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IPickleRejected);

                /** PickleRejected pickleId. */
                public pickleId: string;

                /**
                 * Creates a new PickleRejected instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PickleRejected instance
                 */
                public static create(properties?: io.cucumber.messages.IPickleRejected): io.cucumber.messages.PickleRejected;

                /**
                 * Encodes the specified PickleRejected message. Does not implicitly {@link io.cucumber.messages.PickleRejected.verify|verify} messages.
                 * @param message PickleRejected message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IPickleRejected, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PickleRejected message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleRejected.verify|verify} messages.
                 * @param message PickleRejected message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IPickleRejected, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PickleRejected message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PickleRejected
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.PickleRejected;

                /**
                 * Decodes a PickleRejected message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PickleRejected
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.PickleRejected;

                /**
                 * Verifies a PickleRejected message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PickleRejected message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PickleRejected
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.PickleRejected;

                /**
                 * Creates a plain object from a PickleRejected message. Also converts values to other types if specified.
                 * @param message PickleRejected
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.PickleRejected, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PickleRejected to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a TestRunStarted. */
            interface ITestRunStarted {

                /** TestRunStarted timestamp */
                timestamp?: (io.cucumber.messages.ITimestamp|null);
            }

            /** Represents a TestRunStarted. */
            class TestRunStarted implements ITestRunStarted {

                /**
                 * Constructs a new TestRunStarted.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITestRunStarted);

                /** TestRunStarted timestamp. */
                public timestamp?: (io.cucumber.messages.ITimestamp|null);

                /**
                 * Creates a new TestRunStarted instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TestRunStarted instance
                 */
                public static create(properties?: io.cucumber.messages.ITestRunStarted): io.cucumber.messages.TestRunStarted;

                /**
                 * Encodes the specified TestRunStarted message. Does not implicitly {@link io.cucumber.messages.TestRunStarted.verify|verify} messages.
                 * @param message TestRunStarted message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ITestRunStarted, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TestRunStarted message, length delimited. Does not implicitly {@link io.cucumber.messages.TestRunStarted.verify|verify} messages.
                 * @param message TestRunStarted message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ITestRunStarted, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TestRunStarted message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TestRunStarted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.TestRunStarted;

                /**
                 * Decodes a TestRunStarted message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TestRunStarted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.TestRunStarted;

                /**
                 * Verifies a TestRunStarted message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TestRunStarted message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TestRunStarted
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.TestRunStarted;

                /**
                 * Creates a plain object from a TestRunStarted message. Also converts values to other types if specified.
                 * @param message TestRunStarted
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.TestRunStarted, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TestRunStarted to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a TestCasePreparedStep. */
            interface ITestCasePreparedStep {

                /** TestCasePreparedStep sourceLocation */
                sourceLocation?: (io.cucumber.messages.ISourceReference|null);

                /** TestCasePreparedStep actionLocation */
                actionLocation?: (io.cucumber.messages.ISourceReference|null);
            }

            /** Represents a TestCasePreparedStep. */
            class TestCasePreparedStep implements ITestCasePreparedStep {

                /**
                 * Constructs a new TestCasePreparedStep.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITestCasePreparedStep);

                /** TestCasePreparedStep sourceLocation. */
                public sourceLocation?: (io.cucumber.messages.ISourceReference|null);

                /** TestCasePreparedStep actionLocation. */
                public actionLocation?: (io.cucumber.messages.ISourceReference|null);

                /**
                 * Creates a new TestCasePreparedStep instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TestCasePreparedStep instance
                 */
                public static create(properties?: io.cucumber.messages.ITestCasePreparedStep): io.cucumber.messages.TestCasePreparedStep;

                /**
                 * Encodes the specified TestCasePreparedStep message. Does not implicitly {@link io.cucumber.messages.TestCasePreparedStep.verify|verify} messages.
                 * @param message TestCasePreparedStep message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ITestCasePreparedStep, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TestCasePreparedStep message, length delimited. Does not implicitly {@link io.cucumber.messages.TestCasePreparedStep.verify|verify} messages.
                 * @param message TestCasePreparedStep message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ITestCasePreparedStep, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TestCasePreparedStep message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TestCasePreparedStep
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.TestCasePreparedStep;

                /**
                 * Decodes a TestCasePreparedStep message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TestCasePreparedStep
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.TestCasePreparedStep;

                /**
                 * Verifies a TestCasePreparedStep message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TestCasePreparedStep message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TestCasePreparedStep
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.TestCasePreparedStep;

                /**
                 * Creates a plain object from a TestCasePreparedStep message. Also converts values to other types if specified.
                 * @param message TestCasePreparedStep
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.TestCasePreparedStep, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TestCasePreparedStep to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a TestCasePrepared. */
            interface ITestCasePrepared {

                /** TestCasePrepared pickleId */
                pickleId?: (string|null);

                /** TestCasePrepared steps */
                steps?: (io.cucumber.messages.ITestCasePreparedStep[]|null);
            }

            /** Represents a TestCasePrepared. */
            class TestCasePrepared implements ITestCasePrepared {

                /**
                 * Constructs a new TestCasePrepared.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITestCasePrepared);

                /** TestCasePrepared pickleId. */
                public pickleId: string;

                /** TestCasePrepared steps. */
                public steps: io.cucumber.messages.ITestCasePreparedStep[];

                /**
                 * Creates a new TestCasePrepared instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TestCasePrepared instance
                 */
                public static create(properties?: io.cucumber.messages.ITestCasePrepared): io.cucumber.messages.TestCasePrepared;

                /**
                 * Encodes the specified TestCasePrepared message. Does not implicitly {@link io.cucumber.messages.TestCasePrepared.verify|verify} messages.
                 * @param message TestCasePrepared message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ITestCasePrepared, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TestCasePrepared message, length delimited. Does not implicitly {@link io.cucumber.messages.TestCasePrepared.verify|verify} messages.
                 * @param message TestCasePrepared message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ITestCasePrepared, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TestCasePrepared message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TestCasePrepared
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.TestCasePrepared;

                /**
                 * Decodes a TestCasePrepared message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TestCasePrepared
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.TestCasePrepared;

                /**
                 * Verifies a TestCasePrepared message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TestCasePrepared message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TestCasePrepared
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.TestCasePrepared;

                /**
                 * Creates a plain object from a TestCasePrepared message. Also converts values to other types if specified.
                 * @param message TestCasePrepared
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.TestCasePrepared, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TestCasePrepared to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a TestCaseStarted. */
            interface ITestCaseStarted {

                /** TestCaseStarted timestamp */
                timestamp?: (io.cucumber.messages.ITimestamp|null);

                /** TestCaseStarted platform */
                platform?: (io.cucumber.messages.TestCaseStarted.IPlatform|null);

                /**
                 * The first attempt should have value 0, and for each retry the value
                 * should increase by 1.
                 */
                attempt?: (number|null);

                /** TestCaseStarted testCaseId */
                testCaseId?: (string|null);

                /**
                 * Because a `TestCase` can be run multiple times (in case of a retry),
                 * we use this field to group messages relating to the same attempt.
                 */
                id?: (string|null);
            }

            /** Represents a TestCaseStarted. */
            class TestCaseStarted implements ITestCaseStarted {

                /**
                 * Constructs a new TestCaseStarted.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITestCaseStarted);

                /** TestCaseStarted timestamp. */
                public timestamp?: (io.cucumber.messages.ITimestamp|null);

                /** TestCaseStarted platform. */
                public platform?: (io.cucumber.messages.TestCaseStarted.IPlatform|null);

                /**
                 * The first attempt should have value 0, and for each retry the value
                 * should increase by 1.
                 */
                public attempt: number;

                /** TestCaseStarted testCaseId. */
                public testCaseId: string;

                /**
                 * Because a `TestCase` can be run multiple times (in case of a retry),
                 * we use this field to group messages relating to the same attempt.
                 */
                public id: string;

                /**
                 * Creates a new TestCaseStarted instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TestCaseStarted instance
                 */
                public static create(properties?: io.cucumber.messages.ITestCaseStarted): io.cucumber.messages.TestCaseStarted;

                /**
                 * Encodes the specified TestCaseStarted message. Does not implicitly {@link io.cucumber.messages.TestCaseStarted.verify|verify} messages.
                 * @param message TestCaseStarted message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ITestCaseStarted, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TestCaseStarted message, length delimited. Does not implicitly {@link io.cucumber.messages.TestCaseStarted.verify|verify} messages.
                 * @param message TestCaseStarted message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ITestCaseStarted, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TestCaseStarted message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TestCaseStarted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.TestCaseStarted;

                /**
                 * Decodes a TestCaseStarted message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TestCaseStarted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.TestCaseStarted;

                /**
                 * Verifies a TestCaseStarted message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TestCaseStarted message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TestCaseStarted
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.TestCaseStarted;

                /**
                 * Creates a plain object from a TestCaseStarted message. Also converts values to other types if specified.
                 * @param message TestCaseStarted
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.TestCaseStarted, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TestCaseStarted to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace TestCaseStarted {

                /** Properties of a Platform. */
                interface IPlatform {

                    /** Platform implementation */
                    implementation?: (string|null);

                    /** Platform version */
                    version?: (string|null);

                    /** Platform os */
                    os?: (string|null);

                    /** Platform cpu */
                    cpu?: (string|null);
                }

                /** Represents a Platform. */
                class Platform implements IPlatform {

                    /**
                     * Constructs a new Platform.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: io.cucumber.messages.TestCaseStarted.IPlatform);

                    /** Platform implementation. */
                    public implementation: string;

                    /** Platform version. */
                    public version: string;

                    /** Platform os. */
                    public os: string;

                    /** Platform cpu. */
                    public cpu: string;

                    /**
                     * Creates a new Platform instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Platform instance
                     */
                    public static create(properties?: io.cucumber.messages.TestCaseStarted.IPlatform): io.cucumber.messages.TestCaseStarted.Platform;

                    /**
                     * Encodes the specified Platform message. Does not implicitly {@link io.cucumber.messages.TestCaseStarted.Platform.verify|verify} messages.
                     * @param message Platform message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: io.cucumber.messages.TestCaseStarted.IPlatform, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Platform message, length delimited. Does not implicitly {@link io.cucumber.messages.TestCaseStarted.Platform.verify|verify} messages.
                     * @param message Platform message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: io.cucumber.messages.TestCaseStarted.IPlatform, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Platform message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Platform
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.TestCaseStarted.Platform;

                    /**
                     * Decodes a Platform message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Platform
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.TestCaseStarted.Platform;

                    /**
                     * Verifies a Platform message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Platform message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Platform
                     */
                    public static fromObject(object: { [k: string]: any }): io.cucumber.messages.TestCaseStarted.Platform;

                    /**
                     * Creates a plain object from a Platform message. Also converts values to other types if specified.
                     * @param message Platform
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: io.cucumber.messages.TestCaseStarted.Platform, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Platform to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** Properties of a TestCaseFinished. */
            interface ITestCaseFinished {

                /** TestCaseFinished timestamp */
                timestamp?: (io.cucumber.messages.ITimestamp|null);

                /** TestCaseFinished testCaseStartedId */
                testCaseStartedId?: (string|null);
            }

            /** Represents a TestCaseFinished. */
            class TestCaseFinished implements ITestCaseFinished {

                /**
                 * Constructs a new TestCaseFinished.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITestCaseFinished);

                /** TestCaseFinished timestamp. */
                public timestamp?: (io.cucumber.messages.ITimestamp|null);

                /** TestCaseFinished testCaseStartedId. */
                public testCaseStartedId: string;

                /**
                 * Creates a new TestCaseFinished instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TestCaseFinished instance
                 */
                public static create(properties?: io.cucumber.messages.ITestCaseFinished): io.cucumber.messages.TestCaseFinished;

                /**
                 * Encodes the specified TestCaseFinished message. Does not implicitly {@link io.cucumber.messages.TestCaseFinished.verify|verify} messages.
                 * @param message TestCaseFinished message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ITestCaseFinished, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TestCaseFinished message, length delimited. Does not implicitly {@link io.cucumber.messages.TestCaseFinished.verify|verify} messages.
                 * @param message TestCaseFinished message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ITestCaseFinished, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TestCaseFinished message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TestCaseFinished
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.TestCaseFinished;

                /**
                 * Decodes a TestCaseFinished message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TestCaseFinished
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.TestCaseFinished;

                /**
                 * Verifies a TestCaseFinished message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TestCaseFinished message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TestCaseFinished
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.TestCaseFinished;

                /**
                 * Creates a plain object from a TestCaseFinished message. Also converts values to other types if specified.
                 * @param message TestCaseFinished
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.TestCaseFinished, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TestCaseFinished to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a TestStepStarted. */
            interface ITestStepStarted {

                /** TestStepStarted timestamp */
                timestamp?: (io.cucumber.messages.ITimestamp|null);

                /** TestStepStarted testStepId */
                testStepId?: (string|null);

                /** TestStepStarted testCaseStartedId */
                testCaseStartedId?: (string|null);
            }

            /** Represents a TestStepStarted. */
            class TestStepStarted implements ITestStepStarted {

                /**
                 * Constructs a new TestStepStarted.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITestStepStarted);

                /** TestStepStarted timestamp. */
                public timestamp?: (io.cucumber.messages.ITimestamp|null);

                /** TestStepStarted testStepId. */
                public testStepId: string;

                /** TestStepStarted testCaseStartedId. */
                public testCaseStartedId: string;

                /**
                 * Creates a new TestStepStarted instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TestStepStarted instance
                 */
                public static create(properties?: io.cucumber.messages.ITestStepStarted): io.cucumber.messages.TestStepStarted;

                /**
                 * Encodes the specified TestStepStarted message. Does not implicitly {@link io.cucumber.messages.TestStepStarted.verify|verify} messages.
                 * @param message TestStepStarted message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ITestStepStarted, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TestStepStarted message, length delimited. Does not implicitly {@link io.cucumber.messages.TestStepStarted.verify|verify} messages.
                 * @param message TestStepStarted message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ITestStepStarted, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TestStepStarted message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TestStepStarted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.TestStepStarted;

                /**
                 * Decodes a TestStepStarted message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TestStepStarted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.TestStepStarted;

                /**
                 * Verifies a TestStepStarted message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TestStepStarted message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TestStepStarted
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.TestStepStarted;

                /**
                 * Creates a plain object from a TestStepStarted message. Also converts values to other types if specified.
                 * @param message TestStepStarted
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.TestStepStarted, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TestStepStarted to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a TestStepFinished. */
            interface ITestStepFinished {

                /** TestStepFinished testResult */
                testResult?: (io.cucumber.messages.ITestResult|null);

                /** TestStepFinished timestamp */
                timestamp?: (io.cucumber.messages.ITimestamp|null);

                /** TestStepFinished testStepId */
                testStepId?: (string|null);

                /** TestStepFinished testCaseStartedId */
                testCaseStartedId?: (string|null);
            }

            /** Represents a TestStepFinished. */
            class TestStepFinished implements ITestStepFinished {

                /**
                 * Constructs a new TestStepFinished.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITestStepFinished);

                /** TestStepFinished testResult. */
                public testResult?: (io.cucumber.messages.ITestResult|null);

                /** TestStepFinished timestamp. */
                public timestamp?: (io.cucumber.messages.ITimestamp|null);

                /** TestStepFinished testStepId. */
                public testStepId: string;

                /** TestStepFinished testCaseStartedId. */
                public testCaseStartedId: string;

                /**
                 * Creates a new TestStepFinished instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TestStepFinished instance
                 */
                public static create(properties?: io.cucumber.messages.ITestStepFinished): io.cucumber.messages.TestStepFinished;

                /**
                 * Encodes the specified TestStepFinished message. Does not implicitly {@link io.cucumber.messages.TestStepFinished.verify|verify} messages.
                 * @param message TestStepFinished message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ITestStepFinished, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TestStepFinished message, length delimited. Does not implicitly {@link io.cucumber.messages.TestStepFinished.verify|verify} messages.
                 * @param message TestStepFinished message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ITestStepFinished, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TestStepFinished message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TestStepFinished
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.TestStepFinished;

                /**
                 * Decodes a TestStepFinished message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TestStepFinished
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.TestStepFinished;

                /**
                 * Verifies a TestStepFinished message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TestStepFinished message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TestStepFinished
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.TestStepFinished;

                /**
                 * Creates a plain object from a TestStepFinished message. Also converts values to other types if specified.
                 * @param message TestStepFinished
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.TestStepFinished, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TestStepFinished to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a TestResult. */
            interface ITestResult {

                /** TestResult status */
                status?: (io.cucumber.messages.TestResult.Status|null);

                /** TestResult message */
                message?: (string|null);

                /** TestResult duration */
                duration?: (io.cucumber.messages.IDuration|null);

                /** TestResult willBeRetried */
                willBeRetried?: (boolean|null);
            }

            /** Represents a TestResult. */
            class TestResult implements ITestResult {

                /**
                 * Constructs a new TestResult.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITestResult);

                /** TestResult status. */
                public status: io.cucumber.messages.TestResult.Status;

                /** TestResult message. */
                public message: string;

                /** TestResult duration. */
                public duration?: (io.cucumber.messages.IDuration|null);

                /** TestResult willBeRetried. */
                public willBeRetried: boolean;

                /**
                 * Creates a new TestResult instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TestResult instance
                 */
                public static create(properties?: io.cucumber.messages.ITestResult): io.cucumber.messages.TestResult;

                /**
                 * Encodes the specified TestResult message. Does not implicitly {@link io.cucumber.messages.TestResult.verify|verify} messages.
                 * @param message TestResult message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ITestResult, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TestResult message, length delimited. Does not implicitly {@link io.cucumber.messages.TestResult.verify|verify} messages.
                 * @param message TestResult message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ITestResult, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TestResult message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TestResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.TestResult;

                /**
                 * Decodes a TestResult message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TestResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.TestResult;

                /**
                 * Verifies a TestResult message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TestResult message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TestResult
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.TestResult;

                /**
                 * Creates a plain object from a TestResult message. Also converts values to other types if specified.
                 * @param message TestResult
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.TestResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TestResult to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace TestResult {

                /**
                 * Status of a `PickleStep`.
                 *
                 * A `Pickle` message does not carry its own `TestResult`, but this can be accessed
                 * using `CucumberQuery#getTestResult(testCase)`
                 *
                 * The ordinal values of statuses are significant. The status of a Pickle
                 * is determined by the union of statuses of its steps. The
                 * status of the Pickle is the status with the highest ordinal
                 * in the enum.
                 *
                 * For example, if a pickle has steps with statuses passed, undefined and skipped,
                 * then the pickle's status is undefined.
                 */
                enum Status {
                    UNKNOWN = 0,
                    PASSED = 1,
                    SKIPPED = 2,
                    PENDING = 3,
                    UNDEFINED = 4,
                    AMBIGUOUS = 5,
                    FAILED = 6
                }
            }

            /** Properties of a TestRunFinished. */
            interface ITestRunFinished {

                /** TestRunFinished success */
                success?: (boolean|null);

                /** TestRunFinished timestamp */
                timestamp?: (io.cucumber.messages.ITimestamp|null);
            }

            /** Represents a TestRunFinished. */
            class TestRunFinished implements ITestRunFinished {

                /**
                 * Constructs a new TestRunFinished.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITestRunFinished);

                /** TestRunFinished success. */
                public success: boolean;

                /** TestRunFinished timestamp. */
                public timestamp?: (io.cucumber.messages.ITimestamp|null);

                /**
                 * Creates a new TestRunFinished instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TestRunFinished instance
                 */
                public static create(properties?: io.cucumber.messages.ITestRunFinished): io.cucumber.messages.TestRunFinished;

                /**
                 * Encodes the specified TestRunFinished message. Does not implicitly {@link io.cucumber.messages.TestRunFinished.verify|verify} messages.
                 * @param message TestRunFinished message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ITestRunFinished, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TestRunFinished message, length delimited. Does not implicitly {@link io.cucumber.messages.TestRunFinished.verify|verify} messages.
                 * @param message TestRunFinished message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ITestRunFinished, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TestRunFinished message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TestRunFinished
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.TestRunFinished;

                /**
                 * Decodes a TestRunFinished message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TestRunFinished
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.TestRunFinished;

                /**
                 * Verifies a TestRunFinished message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TestRunFinished message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TestRunFinished
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.TestRunFinished;

                /**
                 * Creates a plain object from a TestRunFinished message. Also converts values to other types if specified.
                 * @param message TestRunFinished
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.TestRunFinished, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TestRunFinished to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CommandStart. */
            interface ICommandStart {

                /** CommandStart baseDirectory */
                baseDirectory?: (string|null);

                /** CommandStart sourcesConfig */
                sourcesConfig?: (io.cucumber.messages.ISourcesConfig|null);

                /** CommandStart runtimeConfig */
                runtimeConfig?: (io.cucumber.messages.IRuntimeConfig|null);

                /** CommandStart supportCodeConfig */
                supportCodeConfig?: (io.cucumber.messages.ISupportCodeConfig|null);
            }

            /** Represents a CommandStart. */
            class CommandStart implements ICommandStart {

                /**
                 * Constructs a new CommandStart.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ICommandStart);

                /** CommandStart baseDirectory. */
                public baseDirectory: string;

                /** CommandStart sourcesConfig. */
                public sourcesConfig?: (io.cucumber.messages.ISourcesConfig|null);

                /** CommandStart runtimeConfig. */
                public runtimeConfig?: (io.cucumber.messages.IRuntimeConfig|null);

                /** CommandStart supportCodeConfig. */
                public supportCodeConfig?: (io.cucumber.messages.ISupportCodeConfig|null);

                /**
                 * Creates a new CommandStart instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CommandStart instance
                 */
                public static create(properties?: io.cucumber.messages.ICommandStart): io.cucumber.messages.CommandStart;

                /**
                 * Encodes the specified CommandStart message. Does not implicitly {@link io.cucumber.messages.CommandStart.verify|verify} messages.
                 * @param message CommandStart message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ICommandStart, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CommandStart message, length delimited. Does not implicitly {@link io.cucumber.messages.CommandStart.verify|verify} messages.
                 * @param message CommandStart message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ICommandStart, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CommandStart message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CommandStart
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.CommandStart;

                /**
                 * Decodes a CommandStart message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CommandStart
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.CommandStart;

                /**
                 * Verifies a CommandStart message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CommandStart message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CommandStart
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.CommandStart;

                /**
                 * Creates a plain object from a CommandStart message. Also converts values to other types if specified.
                 * @param message CommandStart
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.CommandStart, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CommandStart to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a SourcesConfig. */
            interface ISourcesConfig {

                /** SourcesConfig absolutePaths */
                absolutePaths?: (string[]|null);

                /** SourcesConfig language */
                language?: (string|null);

                /** SourcesConfig filters */
                filters?: (io.cucumber.messages.ISourcesFilterConfig|null);

                /** SourcesConfig order */
                order?: (io.cucumber.messages.ISourcesOrder|null);
            }

            /** Represents a SourcesConfig. */
            class SourcesConfig implements ISourcesConfig {

                /**
                 * Constructs a new SourcesConfig.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ISourcesConfig);

                /** SourcesConfig absolutePaths. */
                public absolutePaths: string[];

                /** SourcesConfig language. */
                public language: string;

                /** SourcesConfig filters. */
                public filters?: (io.cucumber.messages.ISourcesFilterConfig|null);

                /** SourcesConfig order. */
                public order?: (io.cucumber.messages.ISourcesOrder|null);

                /**
                 * Creates a new SourcesConfig instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SourcesConfig instance
                 */
                public static create(properties?: io.cucumber.messages.ISourcesConfig): io.cucumber.messages.SourcesConfig;

                /**
                 * Encodes the specified SourcesConfig message. Does not implicitly {@link io.cucumber.messages.SourcesConfig.verify|verify} messages.
                 * @param message SourcesConfig message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ISourcesConfig, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SourcesConfig message, length delimited. Does not implicitly {@link io.cucumber.messages.SourcesConfig.verify|verify} messages.
                 * @param message SourcesConfig message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ISourcesConfig, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SourcesConfig message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SourcesConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.SourcesConfig;

                /**
                 * Decodes a SourcesConfig message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SourcesConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.SourcesConfig;

                /**
                 * Verifies a SourcesConfig message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SourcesConfig message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SourcesConfig
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.SourcesConfig;

                /**
                 * Creates a plain object from a SourcesConfig message. Also converts values to other types if specified.
                 * @param message SourcesConfig
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.SourcesConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SourcesConfig to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a SourcesFilterConfig. */
            interface ISourcesFilterConfig {

                /** SourcesFilterConfig tagExpression */
                tagExpression?: (string|null);

                /** SourcesFilterConfig nameRegularExpressions */
                nameRegularExpressions?: (string[]|null);

                /** SourcesFilterConfig uriToLinesMapping */
                uriToLinesMapping?: (io.cucumber.messages.IUriToLinesMapping[]|null);
            }

            /** Represents a SourcesFilterConfig. */
            class SourcesFilterConfig implements ISourcesFilterConfig {

                /**
                 * Constructs a new SourcesFilterConfig.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ISourcesFilterConfig);

                /** SourcesFilterConfig tagExpression. */
                public tagExpression: string;

                /** SourcesFilterConfig nameRegularExpressions. */
                public nameRegularExpressions: string[];

                /** SourcesFilterConfig uriToLinesMapping. */
                public uriToLinesMapping: io.cucumber.messages.IUriToLinesMapping[];

                /**
                 * Creates a new SourcesFilterConfig instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SourcesFilterConfig instance
                 */
                public static create(properties?: io.cucumber.messages.ISourcesFilterConfig): io.cucumber.messages.SourcesFilterConfig;

                /**
                 * Encodes the specified SourcesFilterConfig message. Does not implicitly {@link io.cucumber.messages.SourcesFilterConfig.verify|verify} messages.
                 * @param message SourcesFilterConfig message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ISourcesFilterConfig, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SourcesFilterConfig message, length delimited. Does not implicitly {@link io.cucumber.messages.SourcesFilterConfig.verify|verify} messages.
                 * @param message SourcesFilterConfig message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ISourcesFilterConfig, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SourcesFilterConfig message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SourcesFilterConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.SourcesFilterConfig;

                /**
                 * Decodes a SourcesFilterConfig message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SourcesFilterConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.SourcesFilterConfig;

                /**
                 * Verifies a SourcesFilterConfig message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SourcesFilterConfig message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SourcesFilterConfig
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.SourcesFilterConfig;

                /**
                 * Creates a plain object from a SourcesFilterConfig message. Also converts values to other types if specified.
                 * @param message SourcesFilterConfig
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.SourcesFilterConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SourcesFilterConfig to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of an UriToLinesMapping. */
            interface IUriToLinesMapping {

                /** UriToLinesMapping absolutePath */
                absolutePath?: (string|null);

                /** UriToLinesMapping lines */
                lines?: ((number|Long)[]|null);
            }

            /** Represents an UriToLinesMapping. */
            class UriToLinesMapping implements IUriToLinesMapping {

                /**
                 * Constructs a new UriToLinesMapping.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IUriToLinesMapping);

                /** UriToLinesMapping absolutePath. */
                public absolutePath: string;

                /** UriToLinesMapping lines. */
                public lines: (number|Long)[];

                /**
                 * Creates a new UriToLinesMapping instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns UriToLinesMapping instance
                 */
                public static create(properties?: io.cucumber.messages.IUriToLinesMapping): io.cucumber.messages.UriToLinesMapping;

                /**
                 * Encodes the specified UriToLinesMapping message. Does not implicitly {@link io.cucumber.messages.UriToLinesMapping.verify|verify} messages.
                 * @param message UriToLinesMapping message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IUriToLinesMapping, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified UriToLinesMapping message, length delimited. Does not implicitly {@link io.cucumber.messages.UriToLinesMapping.verify|verify} messages.
                 * @param message UriToLinesMapping message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IUriToLinesMapping, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an UriToLinesMapping message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns UriToLinesMapping
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.UriToLinesMapping;

                /**
                 * Decodes an UriToLinesMapping message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns UriToLinesMapping
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.UriToLinesMapping;

                /**
                 * Verifies an UriToLinesMapping message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an UriToLinesMapping message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns UriToLinesMapping
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.UriToLinesMapping;

                /**
                 * Creates a plain object from an UriToLinesMapping message. Also converts values to other types if specified.
                 * @param message UriToLinesMapping
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.UriToLinesMapping, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this UriToLinesMapping to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a SourcesOrder. */
            interface ISourcesOrder {

                /** SourcesOrder type */
                type?: (io.cucumber.messages.SourcesOrderType|null);

                /** SourcesOrder seed */
                seed?: (number|Long|null);
            }

            /** Represents a SourcesOrder. */
            class SourcesOrder implements ISourcesOrder {

                /**
                 * Constructs a new SourcesOrder.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ISourcesOrder);

                /** SourcesOrder type. */
                public type: io.cucumber.messages.SourcesOrderType;

                /** SourcesOrder seed. */
                public seed: (number|Long);

                /**
                 * Creates a new SourcesOrder instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SourcesOrder instance
                 */
                public static create(properties?: io.cucumber.messages.ISourcesOrder): io.cucumber.messages.SourcesOrder;

                /**
                 * Encodes the specified SourcesOrder message. Does not implicitly {@link io.cucumber.messages.SourcesOrder.verify|verify} messages.
                 * @param message SourcesOrder message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ISourcesOrder, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SourcesOrder message, length delimited. Does not implicitly {@link io.cucumber.messages.SourcesOrder.verify|verify} messages.
                 * @param message SourcesOrder message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ISourcesOrder, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SourcesOrder message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SourcesOrder
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.SourcesOrder;

                /**
                 * Decodes a SourcesOrder message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SourcesOrder
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.SourcesOrder;

                /**
                 * Verifies a SourcesOrder message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SourcesOrder message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SourcesOrder
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.SourcesOrder;

                /**
                 * Creates a plain object from a SourcesOrder message. Also converts values to other types if specified.
                 * @param message SourcesOrder
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.SourcesOrder, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SourcesOrder to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** SourcesOrderType enum. */
            enum SourcesOrderType {
                ORDER_OF_DEFINITION = 0,
                RANDOM = 1
            }

            /** Properties of a RuntimeConfig. */
            interface IRuntimeConfig {

                /** RuntimeConfig isFailFast */
                isFailFast?: (boolean|null);

                /** RuntimeConfig isDryRun */
                isDryRun?: (boolean|null);

                /** RuntimeConfig isStrict */
                isStrict?: (boolean|null);

                /** RuntimeConfig maxParallel */
                maxParallel?: (number|Long|null);
            }

            /** Represents a RuntimeConfig. */
            class RuntimeConfig implements IRuntimeConfig {

                /**
                 * Constructs a new RuntimeConfig.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IRuntimeConfig);

                /** RuntimeConfig isFailFast. */
                public isFailFast: boolean;

                /** RuntimeConfig isDryRun. */
                public isDryRun: boolean;

                /** RuntimeConfig isStrict. */
                public isStrict: boolean;

                /** RuntimeConfig maxParallel. */
                public maxParallel: (number|Long);

                /**
                 * Creates a new RuntimeConfig instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RuntimeConfig instance
                 */
                public static create(properties?: io.cucumber.messages.IRuntimeConfig): io.cucumber.messages.RuntimeConfig;

                /**
                 * Encodes the specified RuntimeConfig message. Does not implicitly {@link io.cucumber.messages.RuntimeConfig.verify|verify} messages.
                 * @param message RuntimeConfig message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IRuntimeConfig, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RuntimeConfig message, length delimited. Does not implicitly {@link io.cucumber.messages.RuntimeConfig.verify|verify} messages.
                 * @param message RuntimeConfig message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IRuntimeConfig, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RuntimeConfig message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RuntimeConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.RuntimeConfig;

                /**
                 * Decodes a RuntimeConfig message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RuntimeConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.RuntimeConfig;

                /**
                 * Verifies a RuntimeConfig message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RuntimeConfig message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RuntimeConfig
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.RuntimeConfig;

                /**
                 * Creates a plain object from a RuntimeConfig message. Also converts values to other types if specified.
                 * @param message RuntimeConfig
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.RuntimeConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RuntimeConfig to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a SupportCodeConfig. */
            interface ISupportCodeConfig {

                /** SupportCodeConfig beforeTestCaseHooks */
                beforeTestCaseHooks?: (io.cucumber.messages.IHook[]|null);

                /** SupportCodeConfig afterTestCaseHooks */
                afterTestCaseHooks?: (io.cucumber.messages.IHook[]|null);

                /** SupportCodeConfig stepDefinitions */
                stepDefinitions?: (io.cucumber.messages.IStepDefinition[]|null);

                /** SupportCodeConfig parameterTypes */
                parameterTypes?: (io.cucumber.messages.IParameterType[]|null);
            }

            /** Represents a SupportCodeConfig. */
            class SupportCodeConfig implements ISupportCodeConfig {

                /**
                 * Constructs a new SupportCodeConfig.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ISupportCodeConfig);

                /** SupportCodeConfig beforeTestCaseHooks. */
                public beforeTestCaseHooks: io.cucumber.messages.IHook[];

                /** SupportCodeConfig afterTestCaseHooks. */
                public afterTestCaseHooks: io.cucumber.messages.IHook[];

                /** SupportCodeConfig stepDefinitions. */
                public stepDefinitions: io.cucumber.messages.IStepDefinition[];

                /** SupportCodeConfig parameterTypes. */
                public parameterTypes: io.cucumber.messages.IParameterType[];

                /**
                 * Creates a new SupportCodeConfig instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SupportCodeConfig instance
                 */
                public static create(properties?: io.cucumber.messages.ISupportCodeConfig): io.cucumber.messages.SupportCodeConfig;

                /**
                 * Encodes the specified SupportCodeConfig message. Does not implicitly {@link io.cucumber.messages.SupportCodeConfig.verify|verify} messages.
                 * @param message SupportCodeConfig message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ISupportCodeConfig, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SupportCodeConfig message, length delimited. Does not implicitly {@link io.cucumber.messages.SupportCodeConfig.verify|verify} messages.
                 * @param message SupportCodeConfig message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ISupportCodeConfig, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SupportCodeConfig message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SupportCodeConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.SupportCodeConfig;

                /**
                 * Decodes a SupportCodeConfig message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SupportCodeConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.SupportCodeConfig;

                /**
                 * Verifies a SupportCodeConfig message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SupportCodeConfig message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SupportCodeConfig
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.SupportCodeConfig;

                /**
                 * Creates a plain object from a SupportCodeConfig message. Also converts values to other types if specified.
                 * @param message SupportCodeConfig
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.SupportCodeConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SupportCodeConfig to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Hook. */
            interface IHook {

                /** Hook id */
                id?: (string|null);

                /** Hook tagExpression */
                tagExpression?: (string|null);

                /** Hook sourceReference */
                sourceReference?: (io.cucumber.messages.ISourceReference|null);
            }

            /** Represents a Hook. */
            class Hook implements IHook {

                /**
                 * Constructs a new Hook.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IHook);

                /** Hook id. */
                public id: string;

                /** Hook tagExpression. */
                public tagExpression: string;

                /** Hook sourceReference. */
                public sourceReference?: (io.cucumber.messages.ISourceReference|null);

                /**
                 * Creates a new Hook instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Hook instance
                 */
                public static create(properties?: io.cucumber.messages.IHook): io.cucumber.messages.Hook;

                /**
                 * Encodes the specified Hook message. Does not implicitly {@link io.cucumber.messages.Hook.verify|verify} messages.
                 * @param message Hook message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IHook, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Hook message, length delimited. Does not implicitly {@link io.cucumber.messages.Hook.verify|verify} messages.
                 * @param message Hook message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IHook, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Hook message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Hook
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Hook;

                /**
                 * Decodes a Hook message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Hook
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Hook;

                /**
                 * Verifies a Hook message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Hook message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Hook
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Hook;

                /**
                 * Creates a plain object from a Hook message. Also converts values to other types if specified.
                 * @param message Hook
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.Hook, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Hook to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a StepDefinition. */
            interface IStepDefinition {

                /** StepDefinition id */
                id?: (string|null);

                /** StepDefinition pattern */
                pattern?: (io.cucumber.messages.IStepDefinitionPattern|null);

                /** StepDefinition sourceReference */
                sourceReference?: (io.cucumber.messages.ISourceReference|null);
            }

            /** Represents a StepDefinition. */
            class StepDefinition implements IStepDefinition {

                /**
                 * Constructs a new StepDefinition.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IStepDefinition);

                /** StepDefinition id. */
                public id: string;

                /** StepDefinition pattern. */
                public pattern?: (io.cucumber.messages.IStepDefinitionPattern|null);

                /** StepDefinition sourceReference. */
                public sourceReference?: (io.cucumber.messages.ISourceReference|null);

                /**
                 * Creates a new StepDefinition instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns StepDefinition instance
                 */
                public static create(properties?: io.cucumber.messages.IStepDefinition): io.cucumber.messages.StepDefinition;

                /**
                 * Encodes the specified StepDefinition message. Does not implicitly {@link io.cucumber.messages.StepDefinition.verify|verify} messages.
                 * @param message StepDefinition message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IStepDefinition, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified StepDefinition message, length delimited. Does not implicitly {@link io.cucumber.messages.StepDefinition.verify|verify} messages.
                 * @param message StepDefinition message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IStepDefinition, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a StepDefinition message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns StepDefinition
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.StepDefinition;

                /**
                 * Decodes a StepDefinition message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns StepDefinition
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.StepDefinition;

                /**
                 * Verifies a StepDefinition message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a StepDefinition message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns StepDefinition
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.StepDefinition;

                /**
                 * Creates a plain object from a StepDefinition message. Also converts values to other types if specified.
                 * @param message StepDefinition
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.StepDefinition, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this StepDefinition to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a StepDefinitionPattern. */
            interface IStepDefinitionPattern {

                /** StepDefinitionPattern source */
                source?: (string|null);

                /** StepDefinitionPattern type */
                type?: (io.cucumber.messages.StepDefinitionPatternType|null);
            }

            /** Represents a StepDefinitionPattern. */
            class StepDefinitionPattern implements IStepDefinitionPattern {

                /**
                 * Constructs a new StepDefinitionPattern.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IStepDefinitionPattern);

                /** StepDefinitionPattern source. */
                public source: string;

                /** StepDefinitionPattern type. */
                public type: io.cucumber.messages.StepDefinitionPatternType;

                /**
                 * Creates a new StepDefinitionPattern instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns StepDefinitionPattern instance
                 */
                public static create(properties?: io.cucumber.messages.IStepDefinitionPattern): io.cucumber.messages.StepDefinitionPattern;

                /**
                 * Encodes the specified StepDefinitionPattern message. Does not implicitly {@link io.cucumber.messages.StepDefinitionPattern.verify|verify} messages.
                 * @param message StepDefinitionPattern message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IStepDefinitionPattern, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified StepDefinitionPattern message, length delimited. Does not implicitly {@link io.cucumber.messages.StepDefinitionPattern.verify|verify} messages.
                 * @param message StepDefinitionPattern message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IStepDefinitionPattern, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a StepDefinitionPattern message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns StepDefinitionPattern
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.StepDefinitionPattern;

                /**
                 * Decodes a StepDefinitionPattern message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns StepDefinitionPattern
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.StepDefinitionPattern;

                /**
                 * Verifies a StepDefinitionPattern message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a StepDefinitionPattern message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns StepDefinitionPattern
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.StepDefinitionPattern;

                /**
                 * Creates a plain object from a StepDefinitionPattern message. Also converts values to other types if specified.
                 * @param message StepDefinitionPattern
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.StepDefinitionPattern, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this StepDefinitionPattern to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** StepDefinitionPatternType enum. */
            enum StepDefinitionPatternType {
                CUCUMBER_EXPRESSION = 0,
                REGULAR_EXPRESSION = 1
            }

            /** Properties of a ParameterType. */
            interface IParameterType {

                /** ParameterType name */
                name?: (string|null);

                /** ParameterType regularExpressions */
                regularExpressions?: (string[]|null);

                /** ParameterType preferForRegularExpressionMatch */
                preferForRegularExpressionMatch?: (boolean|null);

                /** ParameterType useForSnippets */
                useForSnippets?: (boolean|null);
            }

            /** Represents a ParameterType. */
            class ParameterType implements IParameterType {

                /**
                 * Constructs a new ParameterType.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IParameterType);

                /** ParameterType name. */
                public name: string;

                /** ParameterType regularExpressions. */
                public regularExpressions: string[];

                /** ParameterType preferForRegularExpressionMatch. */
                public preferForRegularExpressionMatch: boolean;

                /** ParameterType useForSnippets. */
                public useForSnippets: boolean;

                /**
                 * Creates a new ParameterType instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ParameterType instance
                 */
                public static create(properties?: io.cucumber.messages.IParameterType): io.cucumber.messages.ParameterType;

                /**
                 * Encodes the specified ParameterType message. Does not implicitly {@link io.cucumber.messages.ParameterType.verify|verify} messages.
                 * @param message ParameterType message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IParameterType, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ParameterType message, length delimited. Does not implicitly {@link io.cucumber.messages.ParameterType.verify|verify} messages.
                 * @param message ParameterType message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IParameterType, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ParameterType message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ParameterType
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.ParameterType;

                /**
                 * Decodes a ParameterType message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ParameterType
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.ParameterType;

                /**
                 * Verifies a ParameterType message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ParameterType message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ParameterType
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.ParameterType;

                /**
                 * Creates a plain object from a ParameterType message. Also converts values to other types if specified.
                 * @param message ParameterType
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.ParameterType, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ParameterType to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CommandActionComplete. */
            interface ICommandActionComplete {

                /** CommandActionComplete completedId */
                completedId?: (string|null);

                /** CommandActionComplete testResult */
                testResult?: (io.cucumber.messages.ITestResult|null);

                /** CommandActionComplete snippet */
                snippet?: (string|null);
            }

            /** Represents a CommandActionComplete. */
            class CommandActionComplete implements ICommandActionComplete {

                /**
                 * Constructs a new CommandActionComplete.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ICommandActionComplete);

                /** CommandActionComplete completedId. */
                public completedId: string;

                /** CommandActionComplete testResult. */
                public testResult?: (io.cucumber.messages.ITestResult|null);

                /** CommandActionComplete snippet. */
                public snippet: string;

                /** CommandActionComplete result. */
                public result?: ("testResult"|"snippet");

                /**
                 * Creates a new CommandActionComplete instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CommandActionComplete instance
                 */
                public static create(properties?: io.cucumber.messages.ICommandActionComplete): io.cucumber.messages.CommandActionComplete;

                /**
                 * Encodes the specified CommandActionComplete message. Does not implicitly {@link io.cucumber.messages.CommandActionComplete.verify|verify} messages.
                 * @param message CommandActionComplete message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ICommandActionComplete, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CommandActionComplete message, length delimited. Does not implicitly {@link io.cucumber.messages.CommandActionComplete.verify|verify} messages.
                 * @param message CommandActionComplete message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ICommandActionComplete, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CommandActionComplete message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CommandActionComplete
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.CommandActionComplete;

                /**
                 * Decodes a CommandActionComplete message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CommandActionComplete
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.CommandActionComplete;

                /**
                 * Verifies a CommandActionComplete message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CommandActionComplete message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CommandActionComplete
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.CommandActionComplete;

                /**
                 * Creates a plain object from a CommandActionComplete message. Also converts values to other types if specified.
                 * @param message CommandActionComplete
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.CommandActionComplete, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CommandActionComplete to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CommandRunBeforeTestRunHooks. */
            interface ICommandRunBeforeTestRunHooks {

                /** CommandRunBeforeTestRunHooks actionId */
                actionId?: (string|null);
            }

            /** Represents a CommandRunBeforeTestRunHooks. */
            class CommandRunBeforeTestRunHooks implements ICommandRunBeforeTestRunHooks {

                /**
                 * Constructs a new CommandRunBeforeTestRunHooks.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ICommandRunBeforeTestRunHooks);

                /** CommandRunBeforeTestRunHooks actionId. */
                public actionId: string;

                /**
                 * Creates a new CommandRunBeforeTestRunHooks instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CommandRunBeforeTestRunHooks instance
                 */
                public static create(properties?: io.cucumber.messages.ICommandRunBeforeTestRunHooks): io.cucumber.messages.CommandRunBeforeTestRunHooks;

                /**
                 * Encodes the specified CommandRunBeforeTestRunHooks message. Does not implicitly {@link io.cucumber.messages.CommandRunBeforeTestRunHooks.verify|verify} messages.
                 * @param message CommandRunBeforeTestRunHooks message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ICommandRunBeforeTestRunHooks, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CommandRunBeforeTestRunHooks message, length delimited. Does not implicitly {@link io.cucumber.messages.CommandRunBeforeTestRunHooks.verify|verify} messages.
                 * @param message CommandRunBeforeTestRunHooks message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ICommandRunBeforeTestRunHooks, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CommandRunBeforeTestRunHooks message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CommandRunBeforeTestRunHooks
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.CommandRunBeforeTestRunHooks;

                /**
                 * Decodes a CommandRunBeforeTestRunHooks message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CommandRunBeforeTestRunHooks
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.CommandRunBeforeTestRunHooks;

                /**
                 * Verifies a CommandRunBeforeTestRunHooks message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CommandRunBeforeTestRunHooks message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CommandRunBeforeTestRunHooks
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.CommandRunBeforeTestRunHooks;

                /**
                 * Creates a plain object from a CommandRunBeforeTestRunHooks message. Also converts values to other types if specified.
                 * @param message CommandRunBeforeTestRunHooks
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.CommandRunBeforeTestRunHooks, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CommandRunBeforeTestRunHooks to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CommandRunAfterTestRunHooks. */
            interface ICommandRunAfterTestRunHooks {

                /** CommandRunAfterTestRunHooks actionId */
                actionId?: (string|null);
            }

            /** Represents a CommandRunAfterTestRunHooks. */
            class CommandRunAfterTestRunHooks implements ICommandRunAfterTestRunHooks {

                /**
                 * Constructs a new CommandRunAfterTestRunHooks.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ICommandRunAfterTestRunHooks);

                /** CommandRunAfterTestRunHooks actionId. */
                public actionId: string;

                /**
                 * Creates a new CommandRunAfterTestRunHooks instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CommandRunAfterTestRunHooks instance
                 */
                public static create(properties?: io.cucumber.messages.ICommandRunAfterTestRunHooks): io.cucumber.messages.CommandRunAfterTestRunHooks;

                /**
                 * Encodes the specified CommandRunAfterTestRunHooks message. Does not implicitly {@link io.cucumber.messages.CommandRunAfterTestRunHooks.verify|verify} messages.
                 * @param message CommandRunAfterTestRunHooks message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ICommandRunAfterTestRunHooks, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CommandRunAfterTestRunHooks message, length delimited. Does not implicitly {@link io.cucumber.messages.CommandRunAfterTestRunHooks.verify|verify} messages.
                 * @param message CommandRunAfterTestRunHooks message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ICommandRunAfterTestRunHooks, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CommandRunAfterTestRunHooks message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CommandRunAfterTestRunHooks
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.CommandRunAfterTestRunHooks;

                /**
                 * Decodes a CommandRunAfterTestRunHooks message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CommandRunAfterTestRunHooks
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.CommandRunAfterTestRunHooks;

                /**
                 * Verifies a CommandRunAfterTestRunHooks message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CommandRunAfterTestRunHooks message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CommandRunAfterTestRunHooks
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.CommandRunAfterTestRunHooks;

                /**
                 * Creates a plain object from a CommandRunAfterTestRunHooks message. Also converts values to other types if specified.
                 * @param message CommandRunAfterTestRunHooks
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.CommandRunAfterTestRunHooks, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CommandRunAfterTestRunHooks to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CommandInitializeTestCase. */
            interface ICommandInitializeTestCase {

                /** CommandInitializeTestCase actionId */
                actionId?: (string|null);

                /** CommandInitializeTestCase pickle */
                pickle?: (io.cucumber.messages.IPickle|null);
            }

            /** Represents a CommandInitializeTestCase. */
            class CommandInitializeTestCase implements ICommandInitializeTestCase {

                /**
                 * Constructs a new CommandInitializeTestCase.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ICommandInitializeTestCase);

                /** CommandInitializeTestCase actionId. */
                public actionId: string;

                /** CommandInitializeTestCase pickle. */
                public pickle?: (io.cucumber.messages.IPickle|null);

                /**
                 * Creates a new CommandInitializeTestCase instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CommandInitializeTestCase instance
                 */
                public static create(properties?: io.cucumber.messages.ICommandInitializeTestCase): io.cucumber.messages.CommandInitializeTestCase;

                /**
                 * Encodes the specified CommandInitializeTestCase message. Does not implicitly {@link io.cucumber.messages.CommandInitializeTestCase.verify|verify} messages.
                 * @param message CommandInitializeTestCase message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ICommandInitializeTestCase, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CommandInitializeTestCase message, length delimited. Does not implicitly {@link io.cucumber.messages.CommandInitializeTestCase.verify|verify} messages.
                 * @param message CommandInitializeTestCase message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ICommandInitializeTestCase, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CommandInitializeTestCase message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CommandInitializeTestCase
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.CommandInitializeTestCase;

                /**
                 * Decodes a CommandInitializeTestCase message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CommandInitializeTestCase
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.CommandInitializeTestCase;

                /**
                 * Verifies a CommandInitializeTestCase message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CommandInitializeTestCase message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CommandInitializeTestCase
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.CommandInitializeTestCase;

                /**
                 * Creates a plain object from a CommandInitializeTestCase message. Also converts values to other types if specified.
                 * @param message CommandInitializeTestCase
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.CommandInitializeTestCase, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CommandInitializeTestCase to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CommandRunBeforeTestCaseHook. */
            interface ICommandRunBeforeTestCaseHook {

                /** CommandRunBeforeTestCaseHook actionId */
                actionId?: (string|null);

                /** CommandRunBeforeTestCaseHook hookId */
                hookId?: (string|null);

                /** CommandRunBeforeTestCaseHook testCaseId */
                testCaseId?: (string|null);
            }

            /** Represents a CommandRunBeforeTestCaseHook. */
            class CommandRunBeforeTestCaseHook implements ICommandRunBeforeTestCaseHook {

                /**
                 * Constructs a new CommandRunBeforeTestCaseHook.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ICommandRunBeforeTestCaseHook);

                /** CommandRunBeforeTestCaseHook actionId. */
                public actionId: string;

                /** CommandRunBeforeTestCaseHook hookId. */
                public hookId: string;

                /** CommandRunBeforeTestCaseHook testCaseId. */
                public testCaseId: string;

                /**
                 * Creates a new CommandRunBeforeTestCaseHook instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CommandRunBeforeTestCaseHook instance
                 */
                public static create(properties?: io.cucumber.messages.ICommandRunBeforeTestCaseHook): io.cucumber.messages.CommandRunBeforeTestCaseHook;

                /**
                 * Encodes the specified CommandRunBeforeTestCaseHook message. Does not implicitly {@link io.cucumber.messages.CommandRunBeforeTestCaseHook.verify|verify} messages.
                 * @param message CommandRunBeforeTestCaseHook message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ICommandRunBeforeTestCaseHook, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CommandRunBeforeTestCaseHook message, length delimited. Does not implicitly {@link io.cucumber.messages.CommandRunBeforeTestCaseHook.verify|verify} messages.
                 * @param message CommandRunBeforeTestCaseHook message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ICommandRunBeforeTestCaseHook, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CommandRunBeforeTestCaseHook message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CommandRunBeforeTestCaseHook
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.CommandRunBeforeTestCaseHook;

                /**
                 * Decodes a CommandRunBeforeTestCaseHook message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CommandRunBeforeTestCaseHook
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.CommandRunBeforeTestCaseHook;

                /**
                 * Verifies a CommandRunBeforeTestCaseHook message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CommandRunBeforeTestCaseHook message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CommandRunBeforeTestCaseHook
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.CommandRunBeforeTestCaseHook;

                /**
                 * Creates a plain object from a CommandRunBeforeTestCaseHook message. Also converts values to other types if specified.
                 * @param message CommandRunBeforeTestCaseHook
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.CommandRunBeforeTestCaseHook, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CommandRunBeforeTestCaseHook to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CommandRunAfterTestCaseHook. */
            interface ICommandRunAfterTestCaseHook {

                /** CommandRunAfterTestCaseHook actionId */
                actionId?: (string|null);

                /** CommandRunAfterTestCaseHook hookId */
                hookId?: (string|null);

                /** CommandRunAfterTestCaseHook testCaseId */
                testCaseId?: (string|null);
            }

            /** Represents a CommandRunAfterTestCaseHook. */
            class CommandRunAfterTestCaseHook implements ICommandRunAfterTestCaseHook {

                /**
                 * Constructs a new CommandRunAfterTestCaseHook.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ICommandRunAfterTestCaseHook);

                /** CommandRunAfterTestCaseHook actionId. */
                public actionId: string;

                /** CommandRunAfterTestCaseHook hookId. */
                public hookId: string;

                /** CommandRunAfterTestCaseHook testCaseId. */
                public testCaseId: string;

                /**
                 * Creates a new CommandRunAfterTestCaseHook instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CommandRunAfterTestCaseHook instance
                 */
                public static create(properties?: io.cucumber.messages.ICommandRunAfterTestCaseHook): io.cucumber.messages.CommandRunAfterTestCaseHook;

                /**
                 * Encodes the specified CommandRunAfterTestCaseHook message. Does not implicitly {@link io.cucumber.messages.CommandRunAfterTestCaseHook.verify|verify} messages.
                 * @param message CommandRunAfterTestCaseHook message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ICommandRunAfterTestCaseHook, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CommandRunAfterTestCaseHook message, length delimited. Does not implicitly {@link io.cucumber.messages.CommandRunAfterTestCaseHook.verify|verify} messages.
                 * @param message CommandRunAfterTestCaseHook message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ICommandRunAfterTestCaseHook, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CommandRunAfterTestCaseHook message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CommandRunAfterTestCaseHook
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.CommandRunAfterTestCaseHook;

                /**
                 * Decodes a CommandRunAfterTestCaseHook message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CommandRunAfterTestCaseHook
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.CommandRunAfterTestCaseHook;

                /**
                 * Verifies a CommandRunAfterTestCaseHook message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CommandRunAfterTestCaseHook message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CommandRunAfterTestCaseHook
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.CommandRunAfterTestCaseHook;

                /**
                 * Creates a plain object from a CommandRunAfterTestCaseHook message. Also converts values to other types if specified.
                 * @param message CommandRunAfterTestCaseHook
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.CommandRunAfterTestCaseHook, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CommandRunAfterTestCaseHook to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CommandRunTestStep. */
            interface ICommandRunTestStep {

                /** CommandRunTestStep actionId */
                actionId?: (string|null);

                /** CommandRunTestStep stepDefinitionId */
                stepDefinitionId?: (string|null);

                /** CommandRunTestStep stepMatchArguments */
                stepMatchArguments?: (io.cucumber.messages.IStepMatchArgument[]|null);

                /** CommandRunTestStep pickleStepArgument */
                pickleStepArgument?: (io.cucumber.messages.IPickleStepArgument|null);

                /** CommandRunTestStep testCaseId */
                testCaseId?: (string|null);
            }

            /** Represents a CommandRunTestStep. */
            class CommandRunTestStep implements ICommandRunTestStep {

                /**
                 * Constructs a new CommandRunTestStep.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ICommandRunTestStep);

                /** CommandRunTestStep actionId. */
                public actionId: string;

                /** CommandRunTestStep stepDefinitionId. */
                public stepDefinitionId: string;

                /** CommandRunTestStep stepMatchArguments. */
                public stepMatchArguments: io.cucumber.messages.IStepMatchArgument[];

                /** CommandRunTestStep pickleStepArgument. */
                public pickleStepArgument?: (io.cucumber.messages.IPickleStepArgument|null);

                /** CommandRunTestStep testCaseId. */
                public testCaseId: string;

                /**
                 * Creates a new CommandRunTestStep instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CommandRunTestStep instance
                 */
                public static create(properties?: io.cucumber.messages.ICommandRunTestStep): io.cucumber.messages.CommandRunTestStep;

                /**
                 * Encodes the specified CommandRunTestStep message. Does not implicitly {@link io.cucumber.messages.CommandRunTestStep.verify|verify} messages.
                 * @param message CommandRunTestStep message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ICommandRunTestStep, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CommandRunTestStep message, length delimited. Does not implicitly {@link io.cucumber.messages.CommandRunTestStep.verify|verify} messages.
                 * @param message CommandRunTestStep message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ICommandRunTestStep, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CommandRunTestStep message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CommandRunTestStep
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.CommandRunTestStep;

                /**
                 * Decodes a CommandRunTestStep message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CommandRunTestStep
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.CommandRunTestStep;

                /**
                 * Verifies a CommandRunTestStep message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CommandRunTestStep message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CommandRunTestStep
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.CommandRunTestStep;

                /**
                 * Creates a plain object from a CommandRunTestStep message. Also converts values to other types if specified.
                 * @param message CommandRunTestStep
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.CommandRunTestStep, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CommandRunTestStep to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a StepMatchArgument. */
            interface IStepMatchArgument {

                /** StepMatchArgument parameterTypeName */
                parameterTypeName?: (string|null);

                /**
                 * Represents the outermost capture group of an argument. This message closely matches the
                 * `Group` class in the `cucumber-expressions` library.
                 */
                group?: (io.cucumber.messages.StepMatchArgument.IGroup|null);
            }

            /**
             * Represents a single argument extracted from a step match and passed to a step definition.
             * This is used for the following purposes:
             * - Construct an argument to pass to a step definition (possibly through a parameter type transform)
             * - Highlight the matched parameter in rich formatters such as the HTML formatter
             *
             * This message closely matches the `Argument` class in the `cucumber-expressions` library.
             */
            class StepMatchArgument implements IStepMatchArgument {

                /**
                 * Constructs a new StepMatchArgument.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IStepMatchArgument);

                /** StepMatchArgument parameterTypeName. */
                public parameterTypeName: string;

                /**
                 * Represents the outermost capture group of an argument. This message closely matches the
                 * `Group` class in the `cucumber-expressions` library.
                 */
                public group?: (io.cucumber.messages.StepMatchArgument.IGroup|null);

                /**
                 * Creates a new StepMatchArgument instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns StepMatchArgument instance
                 */
                public static create(properties?: io.cucumber.messages.IStepMatchArgument): io.cucumber.messages.StepMatchArgument;

                /**
                 * Encodes the specified StepMatchArgument message. Does not implicitly {@link io.cucumber.messages.StepMatchArgument.verify|verify} messages.
                 * @param message StepMatchArgument message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IStepMatchArgument, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified StepMatchArgument message, length delimited. Does not implicitly {@link io.cucumber.messages.StepMatchArgument.verify|verify} messages.
                 * @param message StepMatchArgument message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IStepMatchArgument, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a StepMatchArgument message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns StepMatchArgument
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.StepMatchArgument;

                /**
                 * Decodes a StepMatchArgument message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns StepMatchArgument
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.StepMatchArgument;

                /**
                 * Verifies a StepMatchArgument message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a StepMatchArgument message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns StepMatchArgument
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.StepMatchArgument;

                /**
                 * Creates a plain object from a StepMatchArgument message. Also converts values to other types if specified.
                 * @param message StepMatchArgument
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.StepMatchArgument, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this StepMatchArgument to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace StepMatchArgument {

                /** Properties of a Group. */
                interface IGroup {

                    /** Group start */
                    start?: (number|null);

                    /** Group value */
                    value?: (string|null);

                    /** Group children */
                    children?: (io.cucumber.messages.StepMatchArgument.IGroup[]|null);
                }

                /** Represents a Group. */
                class Group implements IGroup {

                    /**
                     * Constructs a new Group.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: io.cucumber.messages.StepMatchArgument.IGroup);

                    /** Group start. */
                    public start: number;

                    /** Group value. */
                    public value: string;

                    /** Group children. */
                    public children: io.cucumber.messages.StepMatchArgument.IGroup[];

                    /**
                     * Creates a new Group instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Group instance
                     */
                    public static create(properties?: io.cucumber.messages.StepMatchArgument.IGroup): io.cucumber.messages.StepMatchArgument.Group;

                    /**
                     * Encodes the specified Group message. Does not implicitly {@link io.cucumber.messages.StepMatchArgument.Group.verify|verify} messages.
                     * @param message Group message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: io.cucumber.messages.StepMatchArgument.IGroup, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Group message, length delimited. Does not implicitly {@link io.cucumber.messages.StepMatchArgument.Group.verify|verify} messages.
                     * @param message Group message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: io.cucumber.messages.StepMatchArgument.IGroup, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Group message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Group
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.StepMatchArgument.Group;

                    /**
                     * Decodes a Group message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Group
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.StepMatchArgument.Group;

                    /**
                     * Verifies a Group message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Group message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Group
                     */
                    public static fromObject(object: { [k: string]: any }): io.cucumber.messages.StepMatchArgument.Group;

                    /**
                     * Creates a plain object from a Group message. Also converts values to other types if specified.
                     * @param message Group
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: io.cucumber.messages.StepMatchArgument.Group, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Group to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** Properties of a CommandGenerateSnippet. */
            interface ICommandGenerateSnippet {

                /** CommandGenerateSnippet actionId */
                actionId?: (string|null);

                /** CommandGenerateSnippet generatedExpressions */
                generatedExpressions?: (io.cucumber.messages.IGeneratedExpression[]|null);

                /** CommandGenerateSnippet pickleStepArgument */
                pickleStepArgument?: (io.cucumber.messages.IPickleStepArgument|null);
            }

            /** Represents a CommandGenerateSnippet. */
            class CommandGenerateSnippet implements ICommandGenerateSnippet {

                /**
                 * Constructs a new CommandGenerateSnippet.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ICommandGenerateSnippet);

                /** CommandGenerateSnippet actionId. */
                public actionId: string;

                /** CommandGenerateSnippet generatedExpressions. */
                public generatedExpressions: io.cucumber.messages.IGeneratedExpression[];

                /** CommandGenerateSnippet pickleStepArgument. */
                public pickleStepArgument?: (io.cucumber.messages.IPickleStepArgument|null);

                /**
                 * Creates a new CommandGenerateSnippet instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CommandGenerateSnippet instance
                 */
                public static create(properties?: io.cucumber.messages.ICommandGenerateSnippet): io.cucumber.messages.CommandGenerateSnippet;

                /**
                 * Encodes the specified CommandGenerateSnippet message. Does not implicitly {@link io.cucumber.messages.CommandGenerateSnippet.verify|verify} messages.
                 * @param message CommandGenerateSnippet message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ICommandGenerateSnippet, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CommandGenerateSnippet message, length delimited. Does not implicitly {@link io.cucumber.messages.CommandGenerateSnippet.verify|verify} messages.
                 * @param message CommandGenerateSnippet message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ICommandGenerateSnippet, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CommandGenerateSnippet message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CommandGenerateSnippet
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.CommandGenerateSnippet;

                /**
                 * Decodes a CommandGenerateSnippet message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CommandGenerateSnippet
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.CommandGenerateSnippet;

                /**
                 * Verifies a CommandGenerateSnippet message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CommandGenerateSnippet message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CommandGenerateSnippet
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.CommandGenerateSnippet;

                /**
                 * Creates a plain object from a CommandGenerateSnippet message. Also converts values to other types if specified.
                 * @param message CommandGenerateSnippet
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.CommandGenerateSnippet, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CommandGenerateSnippet to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GeneratedExpression. */
            interface IGeneratedExpression {

                /** GeneratedExpression text */
                text?: (string|null);

                /** GeneratedExpression parameterTypeNames */
                parameterTypeNames?: (string[]|null);
            }

            /** Represents a GeneratedExpression. */
            class GeneratedExpression implements IGeneratedExpression {

                /**
                 * Constructs a new GeneratedExpression.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IGeneratedExpression);

                /** GeneratedExpression text. */
                public text: string;

                /** GeneratedExpression parameterTypeNames. */
                public parameterTypeNames: string[];

                /**
                 * Creates a new GeneratedExpression instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GeneratedExpression instance
                 */
                public static create(properties?: io.cucumber.messages.IGeneratedExpression): io.cucumber.messages.GeneratedExpression;

                /**
                 * Encodes the specified GeneratedExpression message. Does not implicitly {@link io.cucumber.messages.GeneratedExpression.verify|verify} messages.
                 * @param message GeneratedExpression message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IGeneratedExpression, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GeneratedExpression message, length delimited. Does not implicitly {@link io.cucumber.messages.GeneratedExpression.verify|verify} messages.
                 * @param message GeneratedExpression message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IGeneratedExpression, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GeneratedExpression message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GeneratedExpression
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.GeneratedExpression;

                /**
                 * Decodes a GeneratedExpression message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GeneratedExpression
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.GeneratedExpression;

                /**
                 * Verifies a GeneratedExpression message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GeneratedExpression message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GeneratedExpression
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.GeneratedExpression;

                /**
                 * Creates a plain object from a GeneratedExpression message. Also converts values to other types if specified.
                 * @param message GeneratedExpression
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.GeneratedExpression, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GeneratedExpression to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }
}
