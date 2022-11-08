#import "GHTokensGenerator.h"

#import "GHTokenFormatterBuilder.h"
#import "GHTokenScanner.h"
#import "GHLineEndingHelper.h"
#import "GHParser.h"

@implementation GHTokensGenerator

+ (NSString *)generateTokensFromFile:(NSString *)theFeatureFilePath
{
    GHTokenFormatterBuilder * tokenFormatterBuilder = [[GHTokenFormatterBuilder alloc] init];
    id parser = [[GHParser alloc] initWithAstBuilder: tokenFormatterBuilder];
    [parser parseWithTokenScanner: [[GHTokenScanner alloc] initWithContentsOfFile: theFeatureFilePath] tokenMatcher: [[GHTokenMatcher alloc] init]];
    
    NSString * tokensText = [tokenFormatterBuilder tokensText];
    
    return [GHLineEndingHelper normalizeLineEndings: tokensText];
}

@end
