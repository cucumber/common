#import "GHTestTokenFormatter.h"

#import "GHParser.h"
#import "GHToken.h"
#import "GHLocation.h"
#import "GHGherkinLineSpan.h"

@implementation GHTestTokenFormatter

- (NSString *)formatToken:(GHToken *)theToken
{
    if ([theToken isEOF])
        return @"EOF";
    
    NSMutableArray<NSString *> * matchedItems = [[NSMutableArray<NSString *> alloc] init];
    for (GHGherkinLineSpan * lineSpan in [theToken matchedItems])
    {
        [matchedItems addObject: [NSString stringWithFormat: @"%ld:%@", [lineSpan column], [lineSpan text]]];
    }
    
    return [NSString stringWithFormat: @"(%ld:%ld)%@:%@/%@/%@", [[theToken location] line], [[theToken location] column],
            NSStringFromTokenType([theToken matchedType]),
            ([theToken matchedKeyword] ? [theToken matchedKeyword] : @""),
            ([theToken matchedText] ? [theToken matchedText] : @""),
            ([theToken matchedItems] ? [matchedItems componentsJoinedByString: @","] : @"")];
}

NSString * NSStringFromTokenType(GHTokenType tokenType)
{
    switch (tokenType)
    {
        case GHTokenTypeNone:
            return @"None";
        case GHTokenTypeEOF:
            return @"EOF";
        case GHTokenTypeEmpty:
            return @"Empty";
        case GHTokenTypeComment:
            return @"Comment";
        case GHTokenTypeTagLine:
            return @"TagLine";
        case GHTokenTypeFeatureLine:
            return @"FeatureLine";
        case GHTokenTypeBackgroundLine:
            return @"BackgroundLine";
        case GHTokenTypeScenarioLine:
            return @"ScenarioLine";
        case GHTokenTypeScenarioOutlineLine:
            return @"ScenarioOutlineLine";
        case GHTokenTypeExamplesLine:
            return @"ExamplesLine";
        case GHTokenTypeStepLine:
            return @"StepLine";
        case GHTokenTypeDocStringSeparator:
            return @"DocStringSeparator";
        case GHTokenTypeTableRow:
            return @"TableRow";
        case GHTokenTypeLanguage:
            return @"Language";
        case GHTokenTypeOther:
            return @"Other";
    }
    return @"";
}

@end
