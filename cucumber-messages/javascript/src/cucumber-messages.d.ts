import * as $protobuf from "protobufjs";
/** Namespace io. */
export namespace io {

    /** Namespace cucumber. */
    namespace cucumber {

        /** Namespace messages. */
        namespace messages {

            /** Properties of a Wrapper. */
            interface IWrapper {

                /** Wrapper source */
                source?: (io.cucumber.messages.ISource|null);

                /** Wrapper gherkinDocument */
                gherkinDocument?: (io.cucumber.messages.IGherkinDocument|null);

                /** Wrapper pickle */
                pickle?: (io.cucumber.messages.IPickle|null);

                /** Wrapper attachment */
                attachment?: (io.cucumber.messages.IAttachment|null);

                /** Wrapper testCaseStarted */
                testCaseStarted?: (io.cucumber.messages.ITestCaseStarted|null);

                /** Wrapper testStepStarted */
                testStepStarted?: (io.cucumber.messages.ITestStepStarted|null);

                /** Wrapper testStepFinished */
                testStepFinished?: (io.cucumber.messages.ITestStepFinished|null);

                /** Wrapper testCaseFinished */
                testCaseFinished?: (io.cucumber.messages.ITestCaseFinished|null);

                /** Wrapper testHookStarted */
                testHookStarted?: (io.cucumber.messages.ITestHookStarted|null);

                /** Wrapper testHookFinished */
                testHookFinished?: (io.cucumber.messages.ITestHookFinished|null);
            }

            /** Represents a Wrapper. */
            class Wrapper implements IWrapper {

                /**
                 * Constructs a new Wrapper.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IWrapper);

                /** Wrapper source. */
                public source?: (io.cucumber.messages.ISource|null);

                /** Wrapper gherkinDocument. */
                public gherkinDocument?: (io.cucumber.messages.IGherkinDocument|null);

                /** Wrapper pickle. */
                public pickle?: (io.cucumber.messages.IPickle|null);

                /** Wrapper attachment. */
                public attachment?: (io.cucumber.messages.IAttachment|null);

                /** Wrapper testCaseStarted. */
                public testCaseStarted?: (io.cucumber.messages.ITestCaseStarted|null);

                /** Wrapper testStepStarted. */
                public testStepStarted?: (io.cucumber.messages.ITestStepStarted|null);

                /** Wrapper testStepFinished. */
                public testStepFinished?: (io.cucumber.messages.ITestStepFinished|null);

                /** Wrapper testCaseFinished. */
                public testCaseFinished?: (io.cucumber.messages.ITestCaseFinished|null);

                /** Wrapper testHookStarted. */
                public testHookStarted?: (io.cucumber.messages.ITestHookStarted|null);

                /** Wrapper testHookFinished. */
                public testHookFinished?: (io.cucumber.messages.ITestHookFinished|null);

                /** Wrapper message. */
                public message?: ("source"|"gherkinDocument"|"pickle"|"attachment"|"testCaseStarted"|"testStepStarted"|"testStepFinished"|"testCaseFinished"|"testHookStarted"|"testHookFinished");

                /**
                 * Creates a new Wrapper instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Wrapper instance
                 */
                public static create(properties?: io.cucumber.messages.IWrapper): io.cucumber.messages.Wrapper;

                /**
                 * Encodes the specified Wrapper message. Does not implicitly {@link io.cucumber.messages.Wrapper.verify|verify} messages.
                 * @param message Wrapper message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IWrapper, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Wrapper message, length delimited. Does not implicitly {@link io.cucumber.messages.Wrapper.verify|verify} messages.
                 * @param message Wrapper message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IWrapper, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Wrapper message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Wrapper
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Wrapper;

                /**
                 * Decodes a Wrapper message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Wrapper
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Wrapper;

                /**
                 * Verifies a Wrapper message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Wrapper message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Wrapper
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Wrapper;

                /**
                 * Creates a plain object from a Wrapper message. Also converts values to other types if specified.
                 * @param message Wrapper
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.Wrapper, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Wrapper to JSON.
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

            /** Represents a SourceReference. */
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

            /** Properties of a Location. */
            interface ILocation {

                /** Location line */
                line?: (number|null);

                /** Location column */
                column?: (number|null);
            }

            /** Represents a Location. */
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

            /** Properties of an Attachment. */
            interface IAttachment {

                /** Attachment source */
                source?: (io.cucumber.messages.ISourceReference|null);

                /** Attachment data */
                data?: (string|null);

                /** Attachment media */
                media?: (io.cucumber.messages.IMedia|null);
            }

            /** Represents an Attachment. */
            class Attachment implements IAttachment {

                /**
                 * Constructs a new Attachment.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IAttachment);

                /** Attachment source. */
                public source?: (io.cucumber.messages.ISourceReference|null);

                /** Attachment data. */
                public data: string;

                /** Attachment media. */
                public media?: (io.cucumber.messages.IMedia|null);

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

            /** Properties of a Media. */
            interface IMedia {

                /** Media encoding */
                encoding?: (string|null);

                /** Media contentType */
                contentType?: (string|null);
            }

            /** Represents a Media. */
            class Media implements IMedia {

                /**
                 * Constructs a new Media.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IMedia);

                /** Media encoding. */
                public encoding: string;

                /** Media contentType. */
                public contentType: string;

                /**
                 * Creates a new Media instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Media instance
                 */
                public static create(properties?: io.cucumber.messages.IMedia): io.cucumber.messages.Media;

                /**
                 * Encodes the specified Media message. Does not implicitly {@link io.cucumber.messages.Media.verify|verify} messages.
                 * @param message Media message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IMedia, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Media message, length delimited. Does not implicitly {@link io.cucumber.messages.Media.verify|verify} messages.
                 * @param message Media message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IMedia, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Media message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Media
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Media;

                /**
                 * Decodes a Media message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Media
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Media;

                /**
                 * Verifies a Media message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Media message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Media
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Media;

                /**
                 * Creates a plain object from a Media message. Also converts values to other types if specified.
                 * @param message Media
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.Media, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Media to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Source. */
            interface ISource {

                /** Source uri */
                uri?: (string|null);

                /** Source data */
                data?: (string|null);

                /** Source media */
                media?: (io.cucumber.messages.IMedia|null);
            }

            /** Represents a Source. */
            class Source implements ISource {

                /**
                 * Constructs a new Source.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ISource);

                /** Source uri. */
                public uri: string;

                /** Source data. */
                public data: string;

                /** Source media. */
                public media?: (io.cucumber.messages.IMedia|null);

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

                /** GherkinDocument uri */
                uri?: (string|null);

                /** GherkinDocument feature */
                feature?: (io.cucumber.messages.IFeature|null);

                /** GherkinDocument comments */
                comments?: (io.cucumber.messages.IComment[]|null);
            }

            /** Represents a GherkinDocument. */
            class GherkinDocument implements IGherkinDocument {

                /**
                 * Constructs a new GherkinDocument.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IGherkinDocument);

                /** GherkinDocument uri. */
                public uri: string;

                /** GherkinDocument feature. */
                public feature?: (io.cucumber.messages.IFeature|null);

                /** GherkinDocument comments. */
                public comments: io.cucumber.messages.IComment[];

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

            /** Properties of a Feature. */
            interface IFeature {

                /** Feature location */
                location?: (io.cucumber.messages.ILocation|null);

                /** Feature tags */
                tags?: (io.cucumber.messages.ITag[]|null);

                /** Feature language */
                language?: (string|null);

                /** Feature keyword */
                keyword?: (string|null);

                /** Feature name */
                name?: (string|null);

                /** Feature description */
                description?: (string|null);

                /** Feature children */
                children?: (io.cucumber.messages.IFeatureChild[]|null);
            }

            /** Represents a Feature. */
            class Feature implements IFeature {

                /**
                 * Constructs a new Feature.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IFeature);

                /** Feature location. */
                public location?: (io.cucumber.messages.ILocation|null);

                /** Feature tags. */
                public tags: io.cucumber.messages.ITag[];

                /** Feature language. */
                public language: string;

                /** Feature keyword. */
                public keyword: string;

                /** Feature name. */
                public name: string;

                /** Feature description. */
                public description: string;

                /** Feature children. */
                public children: io.cucumber.messages.IFeatureChild[];

                /**
                 * Creates a new Feature instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Feature instance
                 */
                public static create(properties?: io.cucumber.messages.IFeature): io.cucumber.messages.Feature;

                /**
                 * Encodes the specified Feature message. Does not implicitly {@link io.cucumber.messages.Feature.verify|verify} messages.
                 * @param message Feature message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IFeature, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Feature message, length delimited. Does not implicitly {@link io.cucumber.messages.Feature.verify|verify} messages.
                 * @param message Feature message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IFeature, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Feature message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Feature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Feature;

                /**
                 * Decodes a Feature message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Feature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Feature;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Feature;

                /**
                 * Creates a plain object from a Feature message. Also converts values to other types if specified.
                 * @param message Feature
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.Feature, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Feature to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a FeatureChild. */
            interface IFeatureChild {

                /** FeatureChild rule */
                rule?: (io.cucumber.messages.IRule|null);

                /** FeatureChild background */
                background?: (io.cucumber.messages.IBackground|null);

                /** FeatureChild scenario */
                scenario?: (io.cucumber.messages.IScenario|null);
            }

            /** Represents a FeatureChild. */
            class FeatureChild implements IFeatureChild {

                /**
                 * Constructs a new FeatureChild.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IFeatureChild);

                /** FeatureChild rule. */
                public rule?: (io.cucumber.messages.IRule|null);

                /** FeatureChild background. */
                public background?: (io.cucumber.messages.IBackground|null);

                /** FeatureChild scenario. */
                public scenario?: (io.cucumber.messages.IScenario|null);

                /** FeatureChild value. */
                public value?: ("rule"|"background"|"scenario");

                /**
                 * Creates a new FeatureChild instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns FeatureChild instance
                 */
                public static create(properties?: io.cucumber.messages.IFeatureChild): io.cucumber.messages.FeatureChild;

                /**
                 * Encodes the specified FeatureChild message. Does not implicitly {@link io.cucumber.messages.FeatureChild.verify|verify} messages.
                 * @param message FeatureChild message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IFeatureChild, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified FeatureChild message, length delimited. Does not implicitly {@link io.cucumber.messages.FeatureChild.verify|verify} messages.
                 * @param message FeatureChild message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IFeatureChild, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a FeatureChild message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns FeatureChild
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.FeatureChild;

                /**
                 * Decodes a FeatureChild message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns FeatureChild
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.FeatureChild;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.FeatureChild;

                /**
                 * Creates a plain object from a FeatureChild message. Also converts values to other types if specified.
                 * @param message FeatureChild
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.FeatureChild, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this FeatureChild to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

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
                children?: (io.cucumber.messages.IRuleChild[]|null);
            }

            /** Represents a Rule. */
            class Rule implements IRule {

                /**
                 * Constructs a new Rule.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IRule);

                /** Rule location. */
                public location?: (io.cucumber.messages.ILocation|null);

                /** Rule keyword. */
                public keyword: string;

                /** Rule name. */
                public name: string;

                /** Rule description. */
                public description: string;

                /** Rule children. */
                public children: io.cucumber.messages.IRuleChild[];

                /**
                 * Creates a new Rule instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Rule instance
                 */
                public static create(properties?: io.cucumber.messages.IRule): io.cucumber.messages.Rule;

                /**
                 * Encodes the specified Rule message. Does not implicitly {@link io.cucumber.messages.Rule.verify|verify} messages.
                 * @param message Rule message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IRule, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Rule message, length delimited. Does not implicitly {@link io.cucumber.messages.Rule.verify|verify} messages.
                 * @param message Rule message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IRule, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Rule message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Rule
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Rule;

                /**
                 * Decodes a Rule message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Rule
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Rule;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Rule;

                /**
                 * Creates a plain object from a Rule message. Also converts values to other types if specified.
                 * @param message Rule
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.Rule, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Rule to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a RuleChild. */
            interface IRuleChild {

                /** RuleChild background */
                background?: (io.cucumber.messages.IBackground|null);

                /** RuleChild scenario */
                scenario?: (io.cucumber.messages.IScenario|null);
            }

            /** Represents a RuleChild. */
            class RuleChild implements IRuleChild {

                /**
                 * Constructs a new RuleChild.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IRuleChild);

                /** RuleChild background. */
                public background?: (io.cucumber.messages.IBackground|null);

                /** RuleChild scenario. */
                public scenario?: (io.cucumber.messages.IScenario|null);

                /** RuleChild value. */
                public value?: ("background"|"scenario");

                /**
                 * Creates a new RuleChild instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RuleChild instance
                 */
                public static create(properties?: io.cucumber.messages.IRuleChild): io.cucumber.messages.RuleChild;

                /**
                 * Encodes the specified RuleChild message. Does not implicitly {@link io.cucumber.messages.RuleChild.verify|verify} messages.
                 * @param message RuleChild message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IRuleChild, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RuleChild message, length delimited. Does not implicitly {@link io.cucumber.messages.RuleChild.verify|verify} messages.
                 * @param message RuleChild message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IRuleChild, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RuleChild message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RuleChild
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.RuleChild;

                /**
                 * Decodes a RuleChild message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RuleChild
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.RuleChild;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.RuleChild;

                /**
                 * Creates a plain object from a RuleChild message. Also converts values to other types if specified.
                 * @param message RuleChild
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.RuleChild, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RuleChild to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
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
                steps?: (io.cucumber.messages.IStep[]|null);
            }

            /** Represents a Background. */
            class Background implements IBackground {

                /**
                 * Constructs a new Background.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IBackground);

                /** Background location. */
                public location?: (io.cucumber.messages.ILocation|null);

                /** Background keyword. */
                public keyword: string;

                /** Background name. */
                public name: string;

                /** Background description. */
                public description: string;

                /** Background steps. */
                public steps: io.cucumber.messages.IStep[];

                /**
                 * Creates a new Background instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Background instance
                 */
                public static create(properties?: io.cucumber.messages.IBackground): io.cucumber.messages.Background;

                /**
                 * Encodes the specified Background message. Does not implicitly {@link io.cucumber.messages.Background.verify|verify} messages.
                 * @param message Background message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IBackground, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Background message, length delimited. Does not implicitly {@link io.cucumber.messages.Background.verify|verify} messages.
                 * @param message Background message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IBackground, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Background message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Background
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Background;

                /**
                 * Decodes a Background message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Background
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Background;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Background;

                /**
                 * Creates a plain object from a Background message. Also converts values to other types if specified.
                 * @param message Background
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.Background, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
                tags?: (io.cucumber.messages.ITag[]|null);

                /** Scenario keyword */
                keyword?: (string|null);

                /** Scenario name */
                name?: (string|null);

                /** Scenario description */
                description?: (string|null);

                /** Scenario steps */
                steps?: (io.cucumber.messages.IStep[]|null);

                /** Scenario examples */
                examples?: (io.cucumber.messages.IExamples[]|null);
            }

            /** Represents a Scenario. */
            class Scenario implements IScenario {

                /**
                 * Constructs a new Scenario.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IScenario);

                /** Scenario location. */
                public location?: (io.cucumber.messages.ILocation|null);

                /** Scenario tags. */
                public tags: io.cucumber.messages.ITag[];

                /** Scenario keyword. */
                public keyword: string;

                /** Scenario name. */
                public name: string;

                /** Scenario description. */
                public description: string;

                /** Scenario steps. */
                public steps: io.cucumber.messages.IStep[];

                /** Scenario examples. */
                public examples: io.cucumber.messages.IExamples[];

                /**
                 * Creates a new Scenario instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Scenario instance
                 */
                public static create(properties?: io.cucumber.messages.IScenario): io.cucumber.messages.Scenario;

                /**
                 * Encodes the specified Scenario message. Does not implicitly {@link io.cucumber.messages.Scenario.verify|verify} messages.
                 * @param message Scenario message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IScenario, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Scenario message, length delimited. Does not implicitly {@link io.cucumber.messages.Scenario.verify|verify} messages.
                 * @param message Scenario message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IScenario, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Scenario message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Scenario
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Scenario;

                /**
                 * Decodes a Scenario message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Scenario
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Scenario;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Scenario;

                /**
                 * Creates a plain object from a Scenario message. Also converts values to other types if specified.
                 * @param message Scenario
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.Scenario, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Scenario to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Comment. */
            interface IComment {

                /** Comment location */
                location?: (io.cucumber.messages.ILocation|null);

                /** Comment text */
                text?: (string|null);
            }

            /** Represents a Comment. */
            class Comment implements IComment {

                /**
                 * Constructs a new Comment.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IComment);

                /** Comment location. */
                public location?: (io.cucumber.messages.ILocation|null);

                /** Comment text. */
                public text: string;

                /**
                 * Creates a new Comment instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Comment instance
                 */
                public static create(properties?: io.cucumber.messages.IComment): io.cucumber.messages.Comment;

                /**
                 * Encodes the specified Comment message. Does not implicitly {@link io.cucumber.messages.Comment.verify|verify} messages.
                 * @param message Comment message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IComment, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Comment message, length delimited. Does not implicitly {@link io.cucumber.messages.Comment.verify|verify} messages.
                 * @param message Comment message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IComment, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Comment message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Comment
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Comment;

                /**
                 * Decodes a Comment message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Comment
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Comment;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Comment;

                /**
                 * Creates a plain object from a Comment message. Also converts values to other types if specified.
                 * @param message Comment
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.Comment, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Comment to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a DataTable. */
            interface IDataTable {

                /** DataTable location */
                location?: (io.cucumber.messages.ILocation|null);

                /** DataTable rows */
                rows?: (io.cucumber.messages.ITableRow[]|null);
            }

            /** Represents a DataTable. */
            class DataTable implements IDataTable {

                /**
                 * Constructs a new DataTable.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IDataTable);

                /** DataTable location. */
                public location?: (io.cucumber.messages.ILocation|null);

                /** DataTable rows. */
                public rows: io.cucumber.messages.ITableRow[];

                /**
                 * Creates a new DataTable instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DataTable instance
                 */
                public static create(properties?: io.cucumber.messages.IDataTable): io.cucumber.messages.DataTable;

                /**
                 * Encodes the specified DataTable message. Does not implicitly {@link io.cucumber.messages.DataTable.verify|verify} messages.
                 * @param message DataTable message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IDataTable, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DataTable message, length delimited. Does not implicitly {@link io.cucumber.messages.DataTable.verify|verify} messages.
                 * @param message DataTable message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IDataTable, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DataTable message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DataTable
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.DataTable;

                /**
                 * Decodes a DataTable message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DataTable
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.DataTable;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.DataTable;

                /**
                 * Creates a plain object from a DataTable message. Also converts values to other types if specified.
                 * @param message DataTable
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.DataTable, options?: $protobuf.IConversionOptions): { [k: string]: any };

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

                /** DocString contentType */
                contentType?: (string|null);

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
                constructor(properties?: io.cucumber.messages.IDocString);

                /** DocString location. */
                public location?: (io.cucumber.messages.ILocation|null);

                /** DocString contentType. */
                public contentType: string;

                /** DocString content. */
                public content: string;

                /** DocString delimiter. */
                public delimiter: string;

                /**
                 * Creates a new DocString instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DocString instance
                 */
                public static create(properties?: io.cucumber.messages.IDocString): io.cucumber.messages.DocString;

                /**
                 * Encodes the specified DocString message. Does not implicitly {@link io.cucumber.messages.DocString.verify|verify} messages.
                 * @param message DocString message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IDocString, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DocString message, length delimited. Does not implicitly {@link io.cucumber.messages.DocString.verify|verify} messages.
                 * @param message DocString message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IDocString, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DocString message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DocString
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.DocString;

                /**
                 * Decodes a DocString message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DocString
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.DocString;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.DocString;

                /**
                 * Creates a plain object from a DocString message. Also converts values to other types if specified.
                 * @param message DocString
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.DocString, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DocString to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of an Examples. */
            interface IExamples {

                /** Examples location */
                location?: (io.cucumber.messages.ILocation|null);

                /** Examples tags */
                tags?: (io.cucumber.messages.ITag[]|null);

                /** Examples keyword */
                keyword?: (string|null);

                /** Examples name */
                name?: (string|null);

                /** Examples description */
                description?: (string|null);

                /** Examples tableHeader */
                tableHeader?: (io.cucumber.messages.ITableRow|null);

                /** Examples tableBody */
                tableBody?: (io.cucumber.messages.ITableRow[]|null);
            }

            /** Represents an Examples. */
            class Examples implements IExamples {

                /**
                 * Constructs a new Examples.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IExamples);

                /** Examples location. */
                public location?: (io.cucumber.messages.ILocation|null);

                /** Examples tags. */
                public tags: io.cucumber.messages.ITag[];

                /** Examples keyword. */
                public keyword: string;

                /** Examples name. */
                public name: string;

                /** Examples description. */
                public description: string;

                /** Examples tableHeader. */
                public tableHeader?: (io.cucumber.messages.ITableRow|null);

                /** Examples tableBody. */
                public tableBody: io.cucumber.messages.ITableRow[];

                /**
                 * Creates a new Examples instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Examples instance
                 */
                public static create(properties?: io.cucumber.messages.IExamples): io.cucumber.messages.Examples;

                /**
                 * Encodes the specified Examples message. Does not implicitly {@link io.cucumber.messages.Examples.verify|verify} messages.
                 * @param message Examples message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IExamples, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Examples message, length delimited. Does not implicitly {@link io.cucumber.messages.Examples.verify|verify} messages.
                 * @param message Examples message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IExamples, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an Examples message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Examples
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Examples;

                /**
                 * Decodes an Examples message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Examples
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Examples;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Examples;

                /**
                 * Creates a plain object from an Examples message. Also converts values to other types if specified.
                 * @param message Examples
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.Examples, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Examples to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
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
                docString?: (io.cucumber.messages.IDocString|null);

                /** Step dataTable */
                dataTable?: (io.cucumber.messages.IDataTable|null);
            }

            /** Represents a Step. */
            class Step implements IStep {

                /**
                 * Constructs a new Step.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IStep);

                /** Step location. */
                public location?: (io.cucumber.messages.ILocation|null);

                /** Step keyword. */
                public keyword: string;

                /** Step text. */
                public text: string;

                /** Step docString. */
                public docString?: (io.cucumber.messages.IDocString|null);

                /** Step dataTable. */
                public dataTable?: (io.cucumber.messages.IDataTable|null);

                /** Step argument. */
                public argument?: ("docString"|"dataTable");

                /**
                 * Creates a new Step instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Step instance
                 */
                public static create(properties?: io.cucumber.messages.IStep): io.cucumber.messages.Step;

                /**
                 * Encodes the specified Step message. Does not implicitly {@link io.cucumber.messages.Step.verify|verify} messages.
                 * @param message Step message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IStep, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Step message, length delimited. Does not implicitly {@link io.cucumber.messages.Step.verify|verify} messages.
                 * @param message Step message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IStep, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Step message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Step
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Step;

                /**
                 * Decodes a Step message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Step
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Step;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Step;

                /**
                 * Creates a plain object from a Step message. Also converts values to other types if specified.
                 * @param message Step
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.Step, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Step to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

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
                constructor(properties?: io.cucumber.messages.ITableCell);

                /** TableCell location. */
                public location?: (io.cucumber.messages.ILocation|null);

                /** TableCell value. */
                public value: string;

                /**
                 * Creates a new TableCell instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TableCell instance
                 */
                public static create(properties?: io.cucumber.messages.ITableCell): io.cucumber.messages.TableCell;

                /**
                 * Encodes the specified TableCell message. Does not implicitly {@link io.cucumber.messages.TableCell.verify|verify} messages.
                 * @param message TableCell message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ITableCell, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TableCell message, length delimited. Does not implicitly {@link io.cucumber.messages.TableCell.verify|verify} messages.
                 * @param message TableCell message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ITableCell, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TableCell message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TableCell
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.TableCell;

                /**
                 * Decodes a TableCell message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TableCell
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.TableCell;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.TableCell;

                /**
                 * Creates a plain object from a TableCell message. Also converts values to other types if specified.
                 * @param message TableCell
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.TableCell, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TableCell to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a TableRow. */
            interface ITableRow {

                /** TableRow location */
                location?: (io.cucumber.messages.ILocation|null);

                /** TableRow cells */
                cells?: (io.cucumber.messages.ITableCell[]|null);
            }

            /** Represents a TableRow. */
            class TableRow implements ITableRow {

                /**
                 * Constructs a new TableRow.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITableRow);

                /** TableRow location. */
                public location?: (io.cucumber.messages.ILocation|null);

                /** TableRow cells. */
                public cells: io.cucumber.messages.ITableCell[];

                /**
                 * Creates a new TableRow instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TableRow instance
                 */
                public static create(properties?: io.cucumber.messages.ITableRow): io.cucumber.messages.TableRow;

                /**
                 * Encodes the specified TableRow message. Does not implicitly {@link io.cucumber.messages.TableRow.verify|verify} messages.
                 * @param message TableRow message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ITableRow, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TableRow message, length delimited. Does not implicitly {@link io.cucumber.messages.TableRow.verify|verify} messages.
                 * @param message TableRow message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ITableRow, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TableRow message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TableRow
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.TableRow;

                /**
                 * Decodes a TableRow message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TableRow
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.TableRow;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.TableRow;

                /**
                 * Creates a plain object from a TableRow message. Also converts values to other types if specified.
                 * @param message TableRow
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.TableRow, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TableRow to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Tag. */
            interface ITag {

                /** Tag location */
                location?: (io.cucumber.messages.ILocation|null);

                /** Tag name */
                name?: (string|null);
            }

            /** Represents a Tag. */
            class Tag implements ITag {

                /**
                 * Constructs a new Tag.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITag);

                /** Tag location. */
                public location?: (io.cucumber.messages.ILocation|null);

                /** Tag name. */
                public name: string;

                /**
                 * Creates a new Tag instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Tag instance
                 */
                public static create(properties?: io.cucumber.messages.ITag): io.cucumber.messages.Tag;

                /**
                 * Encodes the specified Tag message. Does not implicitly {@link io.cucumber.messages.Tag.verify|verify} messages.
                 * @param message Tag message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ITag, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Tag message, length delimited. Does not implicitly {@link io.cucumber.messages.Tag.verify|verify} messages.
                 * @param message Tag message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ITag, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Tag message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Tag
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.Tag;

                /**
                 * Decodes a Tag message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Tag
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.Tag;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.Tag;

                /**
                 * Creates a plain object from a Tag message. Also converts values to other types if specified.
                 * @param message Tag
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.Tag, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Tag to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Pickle. */
            interface IPickle {

                /** Pickle id */
                id?: (string|null);

                /** Pickle uri */
                uri?: (string|null);

                /** Pickle name */
                name?: (string|null);

                /** Pickle language */
                language?: (string|null);

                /** Pickle steps */
                steps?: (io.cucumber.messages.IPickleStep[]|null);

                /** Pickle tags */
                tags?: (io.cucumber.messages.IPickleTag[]|null);

                /** Pickle locations */
                locations?: (io.cucumber.messages.ILocation[]|null);
            }

            /** Represents a Pickle. */
            class Pickle implements IPickle {

                /**
                 * Constructs a new Pickle.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IPickle);

                /** Pickle id. */
                public id: string;

                /** Pickle uri. */
                public uri: string;

                /** Pickle name. */
                public name: string;

                /** Pickle language. */
                public language: string;

                /** Pickle steps. */
                public steps: io.cucumber.messages.IPickleStep[];

                /** Pickle tags. */
                public tags: io.cucumber.messages.IPickleTag[];

                /** Pickle locations. */
                public locations: io.cucumber.messages.ILocation[];

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

            /** Properties of a PickleStep. */
            interface IPickleStep {

                /** PickleStep text */
                text?: (string|null);

                /** PickleStep locations */
                locations?: (io.cucumber.messages.ILocation[]|null);

                /** PickleStep docString */
                docString?: (io.cucumber.messages.IPickleDocString|null);

                /** PickleStep dataTable */
                dataTable?: (io.cucumber.messages.IPickleTable|null);
            }

            /** Represents a PickleStep. */
            class PickleStep implements IPickleStep {

                /**
                 * Constructs a new PickleStep.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IPickleStep);

                /** PickleStep text. */
                public text: string;

                /** PickleStep locations. */
                public locations: io.cucumber.messages.ILocation[];

                /** PickleStep docString. */
                public docString?: (io.cucumber.messages.IPickleDocString|null);

                /** PickleStep dataTable. */
                public dataTable?: (io.cucumber.messages.IPickleTable|null);

                /** PickleStep argument. */
                public argument?: ("docString"|"dataTable");

                /**
                 * Creates a new PickleStep instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PickleStep instance
                 */
                public static create(properties?: io.cucumber.messages.IPickleStep): io.cucumber.messages.PickleStep;

                /**
                 * Encodes the specified PickleStep message. Does not implicitly {@link io.cucumber.messages.PickleStep.verify|verify} messages.
                 * @param message PickleStep message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IPickleStep, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PickleStep message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleStep.verify|verify} messages.
                 * @param message PickleStep message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IPickleStep, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PickleStep message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PickleStep
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.PickleStep;

                /**
                 * Decodes a PickleStep message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PickleStep
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.PickleStep;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.PickleStep;

                /**
                 * Creates a plain object from a PickleStep message. Also converts values to other types if specified.
                 * @param message PickleStep
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.PickleStep, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PickleStep to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a PickleDocString. */
            interface IPickleDocString {

                /** PickleDocString location */
                location?: (io.cucumber.messages.ILocation|null);

                /** PickleDocString contentType */
                contentType?: (string|null);

                /** PickleDocString content */
                content?: (string|null);
            }

            /** Represents a PickleDocString. */
            class PickleDocString implements IPickleDocString {

                /**
                 * Constructs a new PickleDocString.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IPickleDocString);

                /** PickleDocString location. */
                public location?: (io.cucumber.messages.ILocation|null);

                /** PickleDocString contentType. */
                public contentType: string;

                /** PickleDocString content. */
                public content: string;

                /**
                 * Creates a new PickleDocString instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PickleDocString instance
                 */
                public static create(properties?: io.cucumber.messages.IPickleDocString): io.cucumber.messages.PickleDocString;

                /**
                 * Encodes the specified PickleDocString message. Does not implicitly {@link io.cucumber.messages.PickleDocString.verify|verify} messages.
                 * @param message PickleDocString message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IPickleDocString, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PickleDocString message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleDocString.verify|verify} messages.
                 * @param message PickleDocString message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IPickleDocString, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PickleDocString message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PickleDocString
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.PickleDocString;

                /**
                 * Decodes a PickleDocString message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PickleDocString
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.PickleDocString;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.PickleDocString;

                /**
                 * Creates a plain object from a PickleDocString message. Also converts values to other types if specified.
                 * @param message PickleDocString
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.PickleDocString, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PickleDocString to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a PickleTable. */
            interface IPickleTable {

                /** PickleTable rows */
                rows?: (io.cucumber.messages.IPickleTableRow[]|null);
            }

            /** Represents a PickleTable. */
            class PickleTable implements IPickleTable {

                /**
                 * Constructs a new PickleTable.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IPickleTable);

                /** PickleTable rows. */
                public rows: io.cucumber.messages.IPickleTableRow[];

                /**
                 * Creates a new PickleTable instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PickleTable instance
                 */
                public static create(properties?: io.cucumber.messages.IPickleTable): io.cucumber.messages.PickleTable;

                /**
                 * Encodes the specified PickleTable message. Does not implicitly {@link io.cucumber.messages.PickleTable.verify|verify} messages.
                 * @param message PickleTable message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IPickleTable, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PickleTable message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleTable.verify|verify} messages.
                 * @param message PickleTable message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IPickleTable, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PickleTable message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PickleTable
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.PickleTable;

                /**
                 * Decodes a PickleTable message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PickleTable
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.PickleTable;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.PickleTable;

                /**
                 * Creates a plain object from a PickleTable message. Also converts values to other types if specified.
                 * @param message PickleTable
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.PickleTable, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PickleTable to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a PickleTableCell. */
            interface IPickleTableCell {

                /** PickleTableCell location */
                location?: (io.cucumber.messages.ILocation|null);

                /** PickleTableCell value */
                value?: (string|null);
            }

            /** Represents a PickleTableCell. */
            class PickleTableCell implements IPickleTableCell {

                /**
                 * Constructs a new PickleTableCell.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IPickleTableCell);

                /** PickleTableCell location. */
                public location?: (io.cucumber.messages.ILocation|null);

                /** PickleTableCell value. */
                public value: string;

                /**
                 * Creates a new PickleTableCell instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PickleTableCell instance
                 */
                public static create(properties?: io.cucumber.messages.IPickleTableCell): io.cucumber.messages.PickleTableCell;

                /**
                 * Encodes the specified PickleTableCell message. Does not implicitly {@link io.cucumber.messages.PickleTableCell.verify|verify} messages.
                 * @param message PickleTableCell message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IPickleTableCell, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PickleTableCell message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleTableCell.verify|verify} messages.
                 * @param message PickleTableCell message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IPickleTableCell, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PickleTableCell message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PickleTableCell
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.PickleTableCell;

                /**
                 * Decodes a PickleTableCell message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PickleTableCell
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.PickleTableCell;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.PickleTableCell;

                /**
                 * Creates a plain object from a PickleTableCell message. Also converts values to other types if specified.
                 * @param message PickleTableCell
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.PickleTableCell, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PickleTableCell to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a PickleTableRow. */
            interface IPickleTableRow {

                /** PickleTableRow cells */
                cells?: (io.cucumber.messages.IPickleTableCell[]|null);
            }

            /** Represents a PickleTableRow. */
            class PickleTableRow implements IPickleTableRow {

                /**
                 * Constructs a new PickleTableRow.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IPickleTableRow);

                /** PickleTableRow cells. */
                public cells: io.cucumber.messages.IPickleTableCell[];

                /**
                 * Creates a new PickleTableRow instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PickleTableRow instance
                 */
                public static create(properties?: io.cucumber.messages.IPickleTableRow): io.cucumber.messages.PickleTableRow;

                /**
                 * Encodes the specified PickleTableRow message. Does not implicitly {@link io.cucumber.messages.PickleTableRow.verify|verify} messages.
                 * @param message PickleTableRow message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IPickleTableRow, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PickleTableRow message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleTableRow.verify|verify} messages.
                 * @param message PickleTableRow message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IPickleTableRow, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PickleTableRow message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PickleTableRow
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.PickleTableRow;

                /**
                 * Decodes a PickleTableRow message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PickleTableRow
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.PickleTableRow;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.PickleTableRow;

                /**
                 * Creates a plain object from a PickleTableRow message. Also converts values to other types if specified.
                 * @param message PickleTableRow
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.PickleTableRow, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PickleTableRow to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a PickleTag. */
            interface IPickleTag {

                /** PickleTag location */
                location?: (io.cucumber.messages.ILocation|null);

                /** PickleTag name */
                name?: (string|null);
            }

            /** Represents a PickleTag. */
            class PickleTag implements IPickleTag {

                /**
                 * Constructs a new PickleTag.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.IPickleTag);

                /** PickleTag location. */
                public location?: (io.cucumber.messages.ILocation|null);

                /** PickleTag name. */
                public name: string;

                /**
                 * Creates a new PickleTag instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PickleTag instance
                 */
                public static create(properties?: io.cucumber.messages.IPickleTag): io.cucumber.messages.PickleTag;

                /**
                 * Encodes the specified PickleTag message. Does not implicitly {@link io.cucumber.messages.PickleTag.verify|verify} messages.
                 * @param message PickleTag message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.IPickleTag, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PickleTag message, length delimited. Does not implicitly {@link io.cucumber.messages.PickleTag.verify|verify} messages.
                 * @param message PickleTag message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.IPickleTag, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PickleTag message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PickleTag
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.PickleTag;

                /**
                 * Decodes a PickleTag message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PickleTag
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.PickleTag;

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
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.PickleTag;

                /**
                 * Creates a plain object from a PickleTag message. Also converts values to other types if specified.
                 * @param message PickleTag
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.PickleTag, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PickleTag to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a TestCaseStarted. */
            interface ITestCaseStarted {

                /** TestCaseStarted pickleId */
                pickleId?: (string|null);

                /** TestCaseStarted timestamp */
                timestamp?: (google.protobuf.ITimestamp|null);
            }

            /** Represents a TestCaseStarted. */
            class TestCaseStarted implements ITestCaseStarted {

                /**
                 * Constructs a new TestCaseStarted.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITestCaseStarted);

                /** TestCaseStarted pickleId. */
                public pickleId: string;

                /** TestCaseStarted timestamp. */
                public timestamp?: (google.protobuf.ITimestamp|null);

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

            /** Properties of a TestCaseFinished. */
            interface ITestCaseFinished {

                /** TestCaseFinished pickleId */
                pickleId?: (string|null);

                /** TestCaseFinished timestamp */
                timestamp?: (google.protobuf.ITimestamp|null);
            }

            /** Represents a TestCaseFinished. */
            class TestCaseFinished implements ITestCaseFinished {

                /**
                 * Constructs a new TestCaseFinished.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITestCaseFinished);

                /** TestCaseFinished pickleId. */
                public pickleId: string;

                /** TestCaseFinished timestamp. */
                public timestamp?: (google.protobuf.ITimestamp|null);

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

                /** TestStepStarted pickleId */
                pickleId?: (string|null);

                /** TestStepStarted index */
                index?: (number|null);

                /** TestStepStarted timestamp */
                timestamp?: (google.protobuf.ITimestamp|null);
            }

            /** Represents a TestStepStarted. */
            class TestStepStarted implements ITestStepStarted {

                /**
                 * Constructs a new TestStepStarted.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITestStepStarted);

                /** TestStepStarted pickleId. */
                public pickleId: string;

                /** TestStepStarted index. */
                public index: number;

                /** TestStepStarted timestamp. */
                public timestamp?: (google.protobuf.ITimestamp|null);

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

                /** TestStepFinished pickleId */
                pickleId?: (string|null);

                /** TestStepFinished index */
                index?: (number|null);

                /** TestStepFinished testResult */
                testResult?: (io.cucumber.messages.ITestResult|null);

                /** TestStepFinished timestamp */
                timestamp?: (google.protobuf.ITimestamp|null);
            }

            /** Represents a TestStepFinished. */
            class TestStepFinished implements ITestStepFinished {

                /**
                 * Constructs a new TestStepFinished.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITestStepFinished);

                /** TestStepFinished pickleId. */
                public pickleId: string;

                /** TestStepFinished index. */
                public index: number;

                /** TestStepFinished testResult. */
                public testResult?: (io.cucumber.messages.ITestResult|null);

                /** TestStepFinished timestamp. */
                public timestamp?: (google.protobuf.ITimestamp|null);

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

            /** Properties of a TestHookStarted. */
            interface ITestHookStarted {

                /** TestHookStarted pickleId */
                pickleId?: (string|null);

                /** TestHookStarted timestamp */
                timestamp?: (google.protobuf.ITimestamp|null);
            }

            /** Represents a TestHookStarted. */
            class TestHookStarted implements ITestHookStarted {

                /**
                 * Constructs a new TestHookStarted.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITestHookStarted);

                /** TestHookStarted pickleId. */
                public pickleId: string;

                /** TestHookStarted timestamp. */
                public timestamp?: (google.protobuf.ITimestamp|null);

                /**
                 * Creates a new TestHookStarted instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TestHookStarted instance
                 */
                public static create(properties?: io.cucumber.messages.ITestHookStarted): io.cucumber.messages.TestHookStarted;

                /**
                 * Encodes the specified TestHookStarted message. Does not implicitly {@link io.cucumber.messages.TestHookStarted.verify|verify} messages.
                 * @param message TestHookStarted message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ITestHookStarted, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TestHookStarted message, length delimited. Does not implicitly {@link io.cucumber.messages.TestHookStarted.verify|verify} messages.
                 * @param message TestHookStarted message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ITestHookStarted, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TestHookStarted message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TestHookStarted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.TestHookStarted;

                /**
                 * Decodes a TestHookStarted message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TestHookStarted
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.TestHookStarted;

                /**
                 * Verifies a TestHookStarted message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TestHookStarted message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TestHookStarted
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.TestHookStarted;

                /**
                 * Creates a plain object from a TestHookStarted message. Also converts values to other types if specified.
                 * @param message TestHookStarted
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.TestHookStarted, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TestHookStarted to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a TestHookFinished. */
            interface ITestHookFinished {

                /** TestHookFinished pickleId */
                pickleId?: (string|null);

                /** TestHookFinished testResult */
                testResult?: (io.cucumber.messages.ITestResult|null);

                /** TestHookFinished timestamp */
                timestamp?: (google.protobuf.ITimestamp|null);
            }

            /** Represents a TestHookFinished. */
            class TestHookFinished implements ITestHookFinished {

                /**
                 * Constructs a new TestHookFinished.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITestHookFinished);

                /** TestHookFinished pickleId. */
                public pickleId: string;

                /** TestHookFinished testResult. */
                public testResult?: (io.cucumber.messages.ITestResult|null);

                /** TestHookFinished timestamp. */
                public timestamp?: (google.protobuf.ITimestamp|null);

                /**
                 * Creates a new TestHookFinished instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TestHookFinished instance
                 */
                public static create(properties?: io.cucumber.messages.ITestHookFinished): io.cucumber.messages.TestHookFinished;

                /**
                 * Encodes the specified TestHookFinished message. Does not implicitly {@link io.cucumber.messages.TestHookFinished.verify|verify} messages.
                 * @param message TestHookFinished message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: io.cucumber.messages.ITestHookFinished, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TestHookFinished message, length delimited. Does not implicitly {@link io.cucumber.messages.TestHookFinished.verify|verify} messages.
                 * @param message TestHookFinished message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: io.cucumber.messages.ITestHookFinished, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TestHookFinished message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TestHookFinished
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): io.cucumber.messages.TestHookFinished;

                /**
                 * Decodes a TestHookFinished message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TestHookFinished
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): io.cucumber.messages.TestHookFinished;

                /**
                 * Verifies a TestHookFinished message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TestHookFinished message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TestHookFinished
                 */
                public static fromObject(object: { [k: string]: any }): io.cucumber.messages.TestHookFinished;

                /**
                 * Creates a plain object from a TestHookFinished message. Also converts values to other types if specified.
                 * @param message TestHookFinished
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: io.cucumber.messages.TestHookFinished, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TestHookFinished to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a TestResult. */
            interface ITestResult {

                /** TestResult status */
                status?: (io.cucumber.messages.Status|null);

                /** TestResult message */
                message?: (string|null);
            }

            /** Represents a TestResult. */
            class TestResult implements ITestResult {

                /**
                 * Constructs a new TestResult.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: io.cucumber.messages.ITestResult);

                /** TestResult status. */
                public status: io.cucumber.messages.Status;

                /** TestResult message. */
                public message: string;

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

            /** Status enum. */
            enum Status {
                AMBIGUOUS = 0,
                FAILED = 1,
                PASSED = 2,
                PENDING = 3,
                SKIPPED = 4,
                UNDEFINED = 5
            }
        }
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

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
            constructor(properties?: google.protobuf.ITimestamp);

            /** Timestamp seconds. */
            public seconds: (number|Long);

            /** Timestamp nanos. */
            public nanos: number;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Timestamp instance
             */
            public static create(properties?: google.protobuf.ITimestamp): google.protobuf.Timestamp;

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Timestamp;

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Timestamp;

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
            public static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @param message Timestamp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Timestamp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
