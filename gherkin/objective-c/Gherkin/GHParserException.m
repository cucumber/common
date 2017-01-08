#import "GHParserException.h"

#import "GHLocation.h"
#import "GHToken.h"

@interface GHParserException ()

@property (nonatomic, strong) GHLocation    * location;

- (id)initWithMessage:(NSString *)theMessage location:(GHLocation *)theLocation;

@end

@implementation GHParserException

@synthesize location;

- (id)initWithMessage:(NSString *)theMessage
{
    return [super initWithName: NSParseErrorException reason: theMessage userInfo: nil];
}

- (id)initWithMessage:(NSString *)theMessage location:(GHLocation *)theLocation
{
    NSAssert(theLocation != nil, @"Location should not be nil");
    
    if (self = [super initWithName: NSParseErrorException reason: [[self class] message: theMessage withLocation: theLocation] userInfo: nil])
    {
        location = theLocation;
    }
    
    return self;
}

+ (NSString *)message:(NSString *)theMessage withLocation:(GHLocation *)theLocation
{
    NSAssert(theLocation != nil, @"Location should not be nil");
    
    return [NSString stringWithFormat: @"(%d:%d): %@", (int)[theLocation line], (int)[theLocation column], theMessage];
}

@end

@implementation GHAstBuilderException

- (id)initWithMessage:(NSString *)theMessage
{
    NSAssert(theMessage != nil, @"Message should not be nil");
    
    return [super initWithMessage: theMessage];
}

- (id)initWithMessage:(NSString *)theMessage location:(GHLocation *)theLocation
{
    NSAssert(theLocation != nil, @"Location should not be nil");
    NSAssert(theMessage != nil, @"Location should not be nil");
    
    return [super initWithMessage: theMessage location: theLocation];
}

@end

@implementation GHNoSuchLanguageException

- (id)initWithLanguage:(NSString *)theLanguage location:(GHLocation *)theLocation
{
    return [super initWithMessage: [@"Language not supported: " stringByAppendingString: theLanguage] location: theLocation];
}

@end

@implementation GHTokenParserException

- (id)initWithMessage:(NSString *)theMessage token:(GHToken *)theToken
{
    return [super initWithMessage: theMessage location: [[self class] locationWithToken: theToken]];
}

+ (GHLocation *)locationWithToken:(GHToken *)theReceivedToken
{
    return [theReceivedToken isEOF] || [[theReceivedToken location] column] > 1
 ? [theReceivedToken location]
    : [[GHLocation alloc] initWithLine: [[theReceivedToken location] line] column: [[theReceivedToken line] indent] + 1];
}

@end

@interface GHUnexpectedTokenException ()

@property (nonatomic, strong) NSString              * stateComment;
@property (nonatomic, strong) GHToken               * receivedToken;
@property (nonatomic, strong) NSArray<NSString *>   * expectedTokenTypes;

@end

@implementation GHUnexpectedTokenException

@synthesize stateComment;
@synthesize receivedToken;
@synthesize expectedTokenTypes;

- (id)initWithToken:(GHToken *)theReceivedToken expectedTokenTypes:(NSArray<NSString *> *)theExpectedTokenTypes stateComment:(NSString *)theStateComment
{
    NSAssert(theReceivedToken != nil, @"receivedToken should not be nil");
    NSAssert(theExpectedTokenTypes != nil, @"expectedTokenTypes should not be nil");
    
    if (self = [super initWithMessage: [[self class] messageWithToken: theReceivedToken expectedTokenTypes: theExpectedTokenTypes] token: theReceivedToken])
    {
        receivedToken = theReceivedToken;
        expectedTokenTypes = theExpectedTokenTypes;
        stateComment = theStateComment;
    }
    
    return self;
}

+ (NSString *)messageWithToken:(GHToken *)theReceivedToken expectedTokenTypes:(NSArray<NSString *> *)theExpectedTokenTypes
{
    NSAssert(theReceivedToken != nil, @"receivedToken");
    NSAssert(theExpectedTokenTypes != nil, @"expectedTokenTypes");

    return [NSString stringWithFormat: @"expected: %@, got '%@'", [theExpectedTokenTypes componentsJoinedByString: @", "], [[theReceivedToken tokenValue] stringByTrimmingCharactersInSet: [NSCharacterSet whitespaceAndNewlineCharacterSet]]];
}

@end

@interface GHUnexpectedEOFException ()

@property (nonatomic, strong) NSString              * stateComment;
@property (nonatomic, strong) NSArray<NSString *>   * expectedTokenTypes;

@end

@implementation GHUnexpectedEOFException

@synthesize stateComment;
@synthesize expectedTokenTypes;

- (id)initWithToken:(GHToken *)theReceivedToken expectedTokenTypes:(NSArray<NSString *> *)theExpectedTokenTypes stateComment:(NSString *)theStateComment
{
    NSAssert(theExpectedTokenTypes != nil, @"expectedTokenTypes should not be nil");
    
    if (self = [super initWithMessage: [[self class] messageWithExpectedTokenTypes: theExpectedTokenTypes] token: theReceivedToken])
    {
        expectedTokenTypes = theExpectedTokenTypes;
        stateComment = theStateComment;
    }
    
    return self;
}

+ (NSString *)messageWithExpectedTokenTypes:(NSArray<NSString *> *)theExpectedTokenTypes
{
    NSAssert(theExpectedTokenTypes != nil, @"expectedTokenTypes should not be nil");

    return [NSString stringWithFormat: @"unexpected end of file, expected: %@", [theExpectedTokenTypes componentsJoinedByString: @", "]];
}
     
@end


@interface GHCompositeParserException ()

@property (nonatomic, strong) NSArray<GHParserException *>  * errors;

@end

@implementation GHCompositeParserException

@synthesize errors;

- (id)initWithErrors:(NSArray<GHParserException *> *)theErrors
{
    NSAssert([theErrors count] != 0, @"Errors list should not be nil or empty");
    
    if (self = [super initWithMessage: [[self class] messageWithErrors: theErrors]])
    {
        errors = theErrors;
    }
    
    return self;
}

+ (NSString *)messageWithErrors:(NSArray<GHParserException *> *)theErrors
{
    if (!theErrors)
        @throw [NSException exceptionWithName: NSInvalidArgumentException reason: @"errors list should not be null" userInfo: nil];
    
    return [@"Parser errors:\n" stringByAppendingString: [[theErrors valueForKey: @"reason"] componentsJoinedByString: @"\n"]];
}

@end