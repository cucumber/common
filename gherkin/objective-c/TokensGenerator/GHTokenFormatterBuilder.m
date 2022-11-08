#import "GHTokenFormatterBuilder.h"

#import "GHTestTokenFormatter.h"
#import "GHParser.h"

@implementation GHTokenFormatterBuilder
{
    GHTestTokenFormatter * formatter;
    NSMutableString * tokensText;
}

- (id)init
{
    if (self = [super init])
    {
        formatter = [[GHTestTokenFormatter alloc] init];
        tokensText = [[NSMutableString alloc] init];
    }
    return self;
}

- (NSString *)tokensText
{
    return tokensText;
}

- (void)buildWithToken:(GHToken *)theToken
{
    [tokensText appendFormat: @"%@\n", [formatter formatToken: theToken]];
}

- (void)startRuleWithType:(GHRuleType)theRuleType
{
    //nop
}

- (void)endRuleWithType:(GHRuleType)theRuleType
{
    //nop
}

- (id)result
{
    return nil;
}
- (void)reset
{
    //nop
}

@end
