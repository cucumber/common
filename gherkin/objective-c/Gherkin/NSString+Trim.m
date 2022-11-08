#import "NSString+Trim.h"

@implementation NSString (Trim)

- (NSString *)stringByTrimmingStartWithCharactersInSet:(NSCharacterSet *)theCharacterSet
{
    NSUInteger i = 0;
    NSUInteger length = [self length];
    while (i < length && [theCharacterSet characterIsMember: [self characterAtIndex: i]])
    {
        i++;
    }
    
    return i ? [self substringFromIndex: i] : self;
}

- (NSString *)stringByTrimmingEndWithCharactersInSet:(NSCharacterSet *)theCharacterSet
{
    NSInteger length = [self length] - 1;
    while (length > 0 && [theCharacterSet characterIsMember: [self characterAtIndex: length]])
    {
        length--;
    }
    
    return length > 0 ? [self substringToIndex: length + 1] : self;
}

@end
