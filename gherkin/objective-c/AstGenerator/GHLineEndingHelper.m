#import "GHLineEndingHelper.h"

#import "NSString+Trim.h"

@implementation GHLineEndingHelper

+ (NSString *)normalizeLineEndings:(NSString *)theText
{
    return [[theText stringByReplacingOccurrencesOfString: @"\r\n" withString: @"\n"] stringByTrimmingEndWithCharactersInSet: [NSCharacterSet characterSetWithCharactersInString: @"\n"]];
}

+ (NSString *)normalizeJSonLineEndings:(NSString *)theText
{
    return [theText stringByReplacingOccurrencesOfString: @"\\r\\n" withString: @"\\n"];
}

@end
