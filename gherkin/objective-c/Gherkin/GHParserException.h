#import <Foundation/Foundation.h>
@class GHLocation;
@class GHToken;

@interface GHParserException : NSException

@property (nonatomic, readonly) GHLocation  * location;

@end

@interface GHAstBuilderException : GHParserException

- (id)initWithMessage:(NSString *)theMessage;
- (id)initWithMessage:(NSString *)theMessage location:(GHLocation *)theLocation;

@end

@interface GHNoSuchLanguageException : GHParserException

- (id)initWithLanguage:(NSString *)theLanguage location:(GHLocation *)theLocation;

@end

@interface GHTokenParserException : GHParserException

- (id)initWithMessage:(NSString *)theMessage token:(GHToken *)theToken;

@end

@interface GHUnexpectedTokenException : GHTokenParserException

@property (nonatomic, readonly) NSString            * stateComment;
@property (nonatomic, readonly) GHToken             * receivedToken;
@property (nonatomic, readonly) NSArray<NSString *> * expectedTokenTypes;

- (id)initWithToken:(GHToken *)theReceivedToken expectedTokenTypes:(NSArray<NSString *> *)theExpectedTokenTypes stateComment:(NSString *)theStateComment;

@end

@interface GHUnexpectedEOFException : GHTokenParserException

@property (nonatomic, readonly) NSString            * stateComment;
@property (nonatomic, readonly) NSArray<NSString *> * expectedTokenTypes;

- (id)initWithToken:(GHToken *)theReceivedToken expectedTokenTypes:(NSArray<NSString *> *)theExpectedTokenTypes stateComment:(NSString *)theStateComment;

@end

@interface GHCompositeParserException : GHParserException

@property (nonatomic, readonly) NSArray<GHParserException *>    * errors;

- (id)initWithErrors:(NSArray<GHParserException *> *)theErrors;

@end