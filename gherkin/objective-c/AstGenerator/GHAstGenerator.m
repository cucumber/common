#import "GHAstGenerator.h"

#import "GHLineEndingHelper.h"
#import "GHParser+Extensions.h"
#import "NSObject+Dictionary.h"

@implementation GHAstGenerator

+ (NSString *)generateAstFromFile:(NSString *)theFeatureFilePath
{
    GHParser * parser = [[GHParser alloc] init];
    id parsingResult = [parser parse: theFeatureFilePath];
    
    if (!parsingResult)
        @throw [NSException exceptionWithName: NSParseErrorException reason: @"Parser returned null" userInfo: nil];
    
    NSError * error;
    NSData * serializationResult = [NSJSONSerialization dataWithJSONObject: [parsingResult dictionary] options: NSJSONWritingPrettyPrinted error: &error];
    NSString * astText = [[NSString alloc] initWithData: serializationResult encoding: NSUTF8StringEncoding];
    
    return [GHLineEndingHelper normalizeJSonLineEndings: astText];
}

@end
