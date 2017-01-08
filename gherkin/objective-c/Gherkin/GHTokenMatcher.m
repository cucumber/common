#import "GHTokenMatcher.h"

#import "GHGherkinDialectProvider.h"
#import "GHGherkinLineSpan.h"
#import "GHToken.h"
#import "GHAstNode.h"
#import "GHGherkinDialect.h"
#import "GHGherkinLanguageConstants.h"
#import "GHLocation.h"

#import "GHParser.h"

@interface GHTokenMatcher ()

- (NSString *)unescapeDocString:(NSString *)theText;
- (BOOL)matchDocStringSeparatorWithToken:(GHToken *)theToken separator:(NSString *)theSeparator open:(BOOL)isOpen;
- (BOOL)matchTitleLineWithToken:(GHToken *)theToken tokenType:(GHTokenType)theTokenType keywords:(NSArray<NSString *> *)theKeywords;
- (GHParserException *)matcherExceptionWithToken:(GHToken *)theToken message:(NSString *)theMessage;

- (void)setTokenMatched:(GHToken *)theToken tokenType:(GHTokenType)theMatchedType text:(NSString *)theText keyword:(NSString *)theKeyword indent:(NSNumber *)theIndent items:(NSArray<GHGherkinLineSpan *> *)theItems;

@end

@implementation GHTokenMatcher
{
    id<GHGherkinDialectProviderProtocol>    dialectProvider;
    GHGherkinDialect                        * currentDialect;
    NSString                                * activeDocStringSeparator;
    NSInteger                               indentToRemove;
}

- (GHGherkinDialect *)currentDialect
{
    if (!currentDialect)
        currentDialect = [dialectProvider defaultDialect];

    return currentDialect;
}

- (id)init
{
    if (self = [super init])
    {
        dialectProvider = [[GHGherkinDialectProvider alloc] init];
    }
    
    return self;
}

- (id)initWithDialectProvider:(id<GHGherkinDialectProviderProtocol>)theDialectProvider
{
    if (self = [super init])
    {
        dialectProvider = theDialectProvider;
    }
    
    return self;
}

- (id)initWithLanguage:(NSString *)theLanguage
{
    return [self initWithDialectProvider: [[GHGherkinDialectProvider alloc] initWithLanguage: theLanguage]];
}

- (void)reset
{
    activeDocStringSeparator = nil;
    indentToRemove = 0;
    if (currentDialect != [dialectProvider defaultDialect])
        currentDialect = [dialectProvider defaultDialect];
}

- (void)setTokenMatched:(GHToken *)theToken tokenType:(GHTokenType)theMatchedType text:(NSString *)theText keyword:(NSString *)theKeyword indent:(NSNumber *)theIndent items:(NSArray<GHGherkinLineSpan *> *)theItems
{
    [theToken setMatchedType: theMatchedType];
    [theToken setMatchedKeyword: theKeyword];
    [theToken setMatchedText: theText];
    [theToken setMatchedItems: theItems];
    [theToken setMatchedGherkinDialect: currentDialect];
    [theToken setMatchedIndent: theIndent ? [theIndent integerValue] : [theToken line] ? [[theToken line] indent] : 0];
    
    [theToken setLocation: [[GHLocation alloc] initWithLine: [[theToken location] line] column: [theToken matchedIndent] + 1]];
}

- (BOOL)matchEOFWithToken:(GHToken *)theToken
{
    if ([theToken isEOF])
    {
        [self setTokenMatched: theToken tokenType: GHTokenTypeEOF text: nil keyword: nil indent: nil items: nil];
        
        return YES;
    }
    
    return NO;
}

- (BOOL)matchOtherWithToken:(GHToken *)theToken
{
    NSString * text = [[theToken line] lineTextByRemovingIndent: indentToRemove]; //take the entire line, except removing DocString indents
    [self setTokenMatched: theToken tokenType: GHTokenTypeOther text: [self unescapeDocString: text] keyword: nil indent: @(0) items: nil];
    
    return YES;
}

- (BOOL)matchEmptyWithToken:(GHToken *)theToken
{
    if ([[theToken line] empty])
    {
        [self setTokenMatched: theToken tokenType: GHTokenTypeEmpty text: nil keyword: nil indent: nil items: nil];
        
        return YES;
    }
    
    return NO;
}

- (BOOL)matchCommentWithToken:(GHToken *)theToken
{
    if ([[theToken line] hasPrefix: GHCommentPrefix])
    {
        NSString * text = [[theToken line] lineTextByRemovingIndent: 0]; //take the entire line
        [self setTokenMatched: theToken tokenType: GHTokenTypeComment text: text keyword: nil indent: @(0) items: nil];
        
        return YES;
    }
    return NO;
}

- (GHParserException *)matcherExceptionWithToken:(GHToken *)theToken message:(NSString *)theMessage
{
    GHLocation * exceptionLocation = [[GHLocation alloc] initWithLine: [[theToken location] line] column: [[theToken line] indent] + 1];
    return [[GHAstBuilderException alloc] initWithMessage: theMessage location: exceptionLocation];
}

- (BOOL)matchLanguageWithToken:(GHToken *)theToken
{
    NSRegularExpression * regularExpression = [NSRegularExpression regularExpressionWithPattern: @"^\\s*#\\s*language\\s*:\\s*([a-zA-Z\\-_]+)\\s*$" options: 0 error: nil];
    NSString * lineText = [[theToken line] lineTextByRemovingIndent: 0];
    NSArray<NSTextCheckingResult *> * matches = [regularExpression matchesInString: lineText options: 0 range: NSMakeRange(0, [lineText length])];
    if ([matches count])
    {
        NSRange range = [[matches firstObject] rangeAtIndex: 1];
        if (range.location != NSNotFound)
        {
            NSString * language = [lineText substringWithRange: range];
            [self setTokenMatched: theToken tokenType: GHTokenTypeLanguage text: language keyword: nil indent: nil items: nil];

            //@try
            //{
                currentDialect = [dialectProvider dialectWithLanguage: language location: [theToken location]];
            //}
            //@catch (NSException * exception)
            //{
            //    @throw [self matcherExceptionWithToken: theToken message: [exception reason]];
            //}

            return YES;
        }
    }
    return NO;
}

- (BOOL)matchTagLineWithToken:(GHToken *)theToken
{
    if ([[theToken line] hasPrefix: GHTagPrefix])
    {
        [self setTokenMatched: theToken tokenType: GHTokenTypeTagLine text: nil keyword: nil indent: nil items: [[theToken line] tags]];
        
        return YES;
    }
    return NO;
}

- (BOOL)matchFeatureLineWithToken:(GHToken *)theToken
{
    return [self matchTitleLineWithToken: theToken tokenType: GHTokenTypeFeatureLine keywords: [currentDialect featureKeywords]];
}

- (BOOL)matchBackgroundLineWithToken:(GHToken *)theToken
{
    return [self matchTitleLineWithToken: theToken tokenType: GHTokenTypeBackgroundLine keywords: [currentDialect backgroundKeywords]];
}

- (BOOL)matchScenarioLineWithToken:(GHToken *)theToken
{
    return [self matchTitleLineWithToken: theToken tokenType: GHTokenTypeScenarioLine keywords: [currentDialect scenarioKeywords]];
}

- (BOOL)matchScenarioOutlineLineWithToken:(GHToken *)theToken
{
    return [self matchTitleLineWithToken: theToken tokenType: GHTokenTypeScenarioOutlineLine keywords: [currentDialect scenarioOutlineKeywords]];
}

- (BOOL)matchExamplesLineWithToken:(GHToken *)theToken
{
    return [self matchTitleLineWithToken: theToken tokenType: GHTokenTypeExamplesLine keywords: [currentDialect examplesKeywords]];
}

- (BOOL)matchTitleLineWithToken:(GHToken *)theToken tokenType:(GHTokenType)theTokenType keywords:(NSArray<NSString *> *)theKeywords
{
    for (NSString * keyword in theKeywords)
    {
        if ([[theToken line] hasTitleKeywordPrefix: keyword])
        {
            NSString * title = [[theToken line] trimmedRest: ([keyword length] + [GHTitleKeywordSeparator length])];
            [self setTokenMatched: theToken tokenType: theTokenType text: title keyword: keyword indent: nil items: nil];
            
            return YES;
        }
    }
    return NO;
}

- (BOOL)matchDocStringSeparatorWithToken:(GHToken *)theToken
{
    return activeDocStringSeparator == nil
        // open
    ? ([self matchDocStringSeparatorWithToken: theToken separator: GHDocStringSeparator open: YES] ||
    [self matchDocStringSeparatorWithToken: theToken separator: GHDocStringAlternativeSeparator open: YES])
        // close
    : [self matchDocStringSeparatorWithToken: theToken separator: activeDocStringSeparator open: NO];
}

- (BOOL)matchDocStringSeparatorWithToken:(GHToken *)theToken separator:(NSString *)theSeparator open:(BOOL)isOpen
{
    if ([[theToken line] hasPrefix: theSeparator])
    {
        NSString * contentType = nil;
        if (isOpen)
        {
            contentType = [[theToken line] trimmedRest: [theSeparator length]];
            activeDocStringSeparator = theSeparator;
            indentToRemove = [[theToken line] indent];
        }
        else
        {
            activeDocStringSeparator = nil;
            indentToRemove = 0;
        }

        [self setTokenMatched: theToken tokenType: GHTokenTypeDocStringSeparator text: contentType keyword: nil indent: nil items: nil];
        
        return YES;
    }
    return NO;
}


- (BOOL)matchStepLineWithToken:(GHToken *)theToken
{
    NSArray<NSString *> * keywords = [currentDialect stepKeywords];
    for (NSString * keyword in keywords)
    {
        if ([[theToken line] hasPrefix: keyword])
        {
            NSString * stepText = [[theToken line] trimmedRest: [keyword length]];
            [self setTokenMatched: theToken tokenType: GHTokenTypeStepLine text: stepText keyword: keyword indent: nil items: nil];
            
            return YES;
        }
    }
    
    return NO;
}

- (BOOL)matchTableRowWithToken:(GHToken *)theToken
{
    if ([[theToken line] hasPrefix: GHTableCellSeparator])
    {
        [self setTokenMatched: theToken tokenType: GHTokenTypeTableRow text: nil keyword: nil indent: nil items: [[theToken line] tableCells]];
        
        return YES;
    }
    
    return NO;
}

- (NSString *)unescapeDocString:(NSString *)theText
{
  return activeDocStringSeparator != nil ? [theText stringByReplacingOccurrencesOfString: @"\\\"\\\"\\\"" withString: @"\"\"\""] : theText;
}

@end
