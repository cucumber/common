#import "GHGherkinLine.h"

#import "GHGherkinLanguageConstants.h"
#import "GHGherkinLineSpan.h"

#import "NSString+Trim.h"

@interface GHGherkinLine ()

@property (nonatomic, strong) NSString    * lineText;
@property (nonatomic, assign) NSUInteger    lineNumber;

- (NSMutableArray<NSArray<NSObject *> *> *)splitCellsFromRow:(NSString *)theRow;
- (NSString *)trim:(NSString *)theString trimmedCharsCount:(NSUInteger *)theTrimmedCharsCount;
+ (BOOL)startsWithFrom:(NSString *)theText index:(NSInteger)theTextIndex value:(NSString *)theValue;

@end

@implementation GHGherkinLine
{
    NSString    * trimmedLineText;
}

@synthesize lineText;
@synthesize lineNumber;

- (id)initWithLine:(NSString *)theLine lineNumber:(NSUInteger)theLineNumber
{
    if (self = [super init])
    {
        lineNumber = theLineNumber;
        lineText = theLine;
        trimmedLineText = [theLine stringByTrimmingStartWithCharactersInSet: [NSCharacterSet whitespaceAndNewlineCharacterSet]];
    }

    return self;
}

- (void)detach
{
    //nop
}

- (NSUInteger)indent
{
    return [lineText length] - [trimmedLineText length];
}

- (BOOL)empty
{
    return trimmedLineText && ![trimmedLineText length];
}

- (BOOL)hasPrefix:(NSString *)theText
{
    return [trimmedLineText hasPrefix: theText];
}

- (BOOL)hasTitleKeywordPrefix:(NSString *)theText
{
    NSUInteger textLength = [theText length];
    return [trimmedLineText length] > textLength && [trimmedLineText hasPrefix: theText] &&
    [GHGherkinLine startsWithFrom: trimmedLineText index: textLength value: GHTitleKeywordSeparator];
}

+ (BOOL)startsWithFrom:(NSString *)theText index:(NSInteger)theTextIndex value:(NSString *)theValue
{
    NSUInteger valueLength = [theValue length];
    NSString * textSubstring = [theText substringWithRange: NSMakeRange(theTextIndex, valueLength)];
    NSString * valueSubstring = [theValue substringWithRange: NSMakeRange(0, valueLength)];

    return [textSubstring compare: valueSubstring options: NSLiteralSearch] == NSOrderedSame;
}

- (NSString *)lineTextByRemovingIndent:(NSInteger)theIndentToRemove
{
    if (theIndentToRemove < 0 || theIndentToRemove > [self indent])
        return trimmedLineText;

    return [lineText substringFromIndex: theIndentToRemove];
}

- (NSString *)trimmedRest:(NSUInteger)theLength
{
    return [[trimmedLineText substringFromIndex: theLength] stringByTrimmingCharactersInSet: [NSCharacterSet whitespaceAndNewlineCharacterSet]];
}

- (NSArray<GHGherkinLineSpan *> *)tags
{
    NSInteger position = [self indent];
    NSMutableArray * tags = [[NSMutableArray alloc] init];

    for (NSString * item in [trimmedLineText componentsSeparatedByCharactersInSet: [NSCharacterSet whitespaceAndNewlineCharacterSet]])
    {
        if ([item length])
        {
            [tags addObject: [[GHGherkinLineSpan alloc] initWithColumn: position + 1 text: item]];
            position += [item length];
        }
        position++; // separator
    }

    return [[NSArray alloc] initWithArray: tags];
}

- (NSArray<GHGherkinLineSpan *> *)tableCells
{
    NSMutableArray<NSArray<NSObject *> *> * items = [self splitCellsFromRow: trimmedLineText];
    [items removeLastObject];

    NSMutableArray * tableCells = [[NSMutableArray alloc] init];
    BOOL isBeforeFirst = YES;
    for (NSArray * item in items)
    {
        if (!isBeforeFirst)
        {
            NSUInteger trimmedStart = 0;
            NSString * cellText = [self trim: [item firstObject] trimmedCharsCount: &trimmedStart];
            NSUInteger cellPosition = [[item lastObject] integerValue] + trimmedStart;

            if (![cellText length])
                cellPosition = [[item lastObject] integerValue];

            [tableCells addObject: [[GHGherkinLineSpan alloc] initWithColumn: [self indent] + cellPosition + 1 text: cellText]];
        }

        isBeforeFirst = NO;
    }

    return tableCells;
}

- (NSMutableArray<NSArray<NSObject *> *> *)splitCellsFromRow:(NSString *)theRow
{
    NSMutableString * cell = [[NSMutableString alloc] init];
    NSInteger startPos = 0;
    NSMutableArray<NSArray<NSObject *> *> * items = [[NSMutableArray alloc] init];
    NSUInteger rowLength = [theRow length];
    for (NSUInteger i = 0; i < rowLength; i++)
    {
        NSString * stringCharacter = [theRow substringWithRange: NSMakeRange(i, 1)];
        if ([stringCharacter isEqualToString: GHTableCellSeparator])
        {
            [items addObject: @[ cell, @(startPos)]];
            cell = [[NSMutableString alloc] init];
            startPos = i + 1;
        }
        else if ([stringCharacter isEqualToString: GHTableCellEscape])
        {
            stringCharacter = i + 1 < rowLength ? [theRow substringWithRange: NSMakeRange(++i, 1)] : nil;
            if ([stringCharacter isEqualToString: GHTableCellNewlineEscape])
                [cell appendString: @"\n"];
            else
            {
                if (![stringCharacter isEqualToString: GHTableCellSeparator] && ![stringCharacter isEqualToString: GHTableCellEscape])
                    [cell appendString: GHTableCellEscape];
                [cell appendString: stringCharacter];
            }
        }
        else
            [cell appendString: stringCharacter];
    }
    [items addObject: @[ cell, @(startPos)]];

    return items;
}

- (NSString *)trim:(NSString *)theString trimmedCharsCount:(NSUInteger *)theTrimmedCharsCount
{
    NSUInteger trimmedCharsCount = 0;
    NSCharacterSet * whitespaceAndNewLineCharacterSet = [NSCharacterSet whitespaceAndNewlineCharacterSet];
    while (trimmedCharsCount < [theString length] && [whitespaceAndNewLineCharacterSet characterIsMember: [theString characterAtIndex: trimmedCharsCount]])
        trimmedCharsCount++;

    *theTrimmedCharsCount = trimmedCharsCount;
    return [theString stringByTrimmingCharactersInSet: whitespaceAndNewLineCharacterSet];
}

@end
