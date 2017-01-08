#import "GHToken.h"

#import "GHGherkinLineProtocol.h"

#import "GHParser.h"

@implementation GHToken

@synthesize eof;
@synthesize line;
@synthesize matchedType;
@synthesize matchedKeyword;
@synthesize matchedText;
@synthesize matchedItems;
@synthesize matchedIndent;
@synthesize matchedGherkinDialect;
@synthesize location;

- (id)initWithGherkinLine:(id<GHGherkinLineProtocol>)theGherkinLine location:(GHLocation *)theLocation
{
    if (self = [super init])
    {
        line = theGherkinLine;
        location = theLocation;
    }
    
    return self;
}

- (void)detach
{
    [line detach];
}

- (BOOL)isEOF
{
    return line == nil;
}

- (NSString *)tokenValue
{
    return [self isEOF] ? @"EOF" : [line lineTextByRemovingIndent: -1];
}

- (NSString *)description
{
    return [NSString stringWithFormat: @"%d: %@/%@", matchedType, matchedKeyword, matchedText];
}

@end
