#import "GHAstBuilder.h"

#import "GHTag.h"
#import "GHToken.h"
#import "GHComment.h"
#import "GHTableRow.h"
#import "GHStep.h"
#import "GHDataTable.h"
#import "GHDocString.h"
#import "GHBackground.h"
#import "GHScenario.h"
#import "GHScenarioOutline.h"
#import "GHExamples.h"
#import "GHGherkinDialect.h"
#import "GHGherkinDocument.h"
#import "GHFeature.h"
#import "GHLocation.h"
#import "GHGherkinLanguageConstants.h"
#import "GHTableCell.h"
#import "GHGherkinLineSpan.h"

#import "GHParser.h"

@interface GHAstBuilder ()

+ (NSString *)descriptionForScenarioDefinitionNode:(GHAstNode *)theScenarioDefinitionNode;
+ (NSArray<GHStep *> *)stepsWithScenarioDefinitionNode:(GHAstNode *)theScenarioDefinitionNode;
- (NSArray<GHTableCell *> *)cellsWithToken:(GHToken *)theTableRowToken;
- (NSArray<GHTableRow *> *)tableRowsForNode:(GHAstNode *)theNode;
- (NSArray<GHTag *> *)tagsForNode:(GHAstNode *)theNode;
- (GHLocation *)locationForToken:(GHToken *)theToken column:(NSUInteger)column;
- (GHLocation *)locationForToken:(GHToken *)theToken;

@end

@implementation GHAstBuilder
{
    NSMutableArray<GHAstNode *> * stack;
    NSMutableArray<GHComment *> * comments;
}

- (id)init
{
    if (self = [super init])
    {
        [self reset];
    }

    return self;
}

- (void)reset
{
    stack = [[NSMutableArray alloc] init];
    [stack addObject: [[GHAstNode alloc] initWithRuleType: GHRuleTypeNone]];
    comments = [[NSMutableArray alloc] init];
}

- (void)buildWithToken:(GHToken *)theToken
{
    if ([theToken matchedType] == GHTokenTypeComment)
    {
        [comments addObject: [[GHComment alloc] initWithLocation: [theToken location] text: [theToken matchedText]]];
    }
    else
    {
        [[stack lastObject] addObject: theToken withRuleType: (GHRuleType)[theToken matchedType]];
    }
}

- (void)startRuleWithType:(GHRuleType)theRuleType
{
    [stack addObject: [[GHAstNode alloc] initWithRuleType: theRuleType]];
}

- (void)endRuleWithType:(GHRuleType)theRuleType
{
    GHAstNode * node = [stack lastObject];
    [stack removeLastObject];
    id transformedNode = [self transformNode: node];

    [[stack lastObject] addObject: transformedNode withRuleType: [node ruleType]];
}

- (id)result
{
    return [[stack lastObject] singleWithRuleType: GHRuleTypeGherkinDocument];
}

- (id)transformNode:(GHAstNode *)theNode
{
    switch ([theNode ruleType])
    {
        case GHRuleTypeStep:
        {
            GHToken * stepLine = [theNode tokenWithType: GHTokenTypeStepLine];
            GHStepArgument * dataTableStepArgument = [theNode singleWithRuleType: GHRuleTypeDataTable];
            GHStepArgument * stepArg = nil;
            if (dataTableStepArgument)
                stepArg = dataTableStepArgument;
            else
                stepArg = [theNode singleWithRuleType: GHRuleTypeDocString];

            return [[GHStep alloc] initWithLocation: [stepLine location] keyword: [stepLine matchedKeyword] text: [stepLine matchedText] stepArgument:stepArg];
        }
        case GHRuleTypeDocString:
        {
            GHToken * separatorToken = [[theNode tokensWithType: GHTokenTypeDocStringSeparator] firstObject];
            NSString * contentType = [[separatorToken matchedText] length] == 0 ? nil : [separatorToken matchedText];
            NSArray<GHToken *> * lineTokens = [theNode tokensWithType: GHTokenTypeOther];

            NSString * content = [[lineTokens valueForKey: @"matchedText"] componentsJoinedByString: @"\n"];

            return [[GHDocString alloc] initWithLocation: [separatorToken location] contentType: contentType content: content];
        }
        case GHRuleTypeDataTable:
        {
            NSArray<GHTableRow *> * rows = [self tableRowsForNode: theNode];

            return [[GHDataTable alloc] initWithTableRows: rows];
        }
        case GHRuleTypeBackground:
        {
            GHToken * backgroundLine = [theNode tokenWithType: GHTokenTypeBackgroundLine];
            NSString * description = [GHAstBuilder descriptionForScenarioDefinitionNode: theNode];
            NSArray<GHStep *> * steps = [GHAstBuilder stepsWithScenarioDefinitionNode: theNode];

            return [[GHBackground alloc] initWithLocation: [backgroundLine location] keyword: [backgroundLine matchedKeyword] name: [backgroundLine matchedText] description: description steps: steps];
        }
        case GHRuleTypeScenario_Definition:
        {
            NSArray<GHTag *> * tags = [self tagsForNode: theNode];

            id scenarioNode = [theNode singleWithRuleType: GHRuleTypeScenario];
            if (scenarioNode != nil)
            {
                GHToken * scenarioLine = [scenarioNode tokenWithType: GHTokenTypeScenarioLine];

                NSString * description = [GHAstBuilder descriptionForScenarioDefinitionNode: scenarioNode];
                NSArray<GHStep *> * steps = [GHAstBuilder stepsWithScenarioDefinitionNode: scenarioNode];

                return [[GHScenario alloc] initWithTags: tags location: [scenarioLine location] keyword: [scenarioLine matchedKeyword] name: [scenarioLine matchedText] description: description steps: steps];
            }
            else
            {
                id scenarioOutlineNode = [theNode singleWithRuleType: GHRuleTypeScenarioOutline];
                if (scenarioOutlineNode == nil)
                    @throw [NSException exceptionWithName: NSParseErrorException reason: @"Internal gramar error" userInfo: nil];

                GHToken * scenarioOutlineLine = [scenarioOutlineNode tokenWithType: GHTokenTypeScenarioOutlineLine];

                NSString * description = [GHAstBuilder descriptionForScenarioDefinitionNode: scenarioOutlineNode];
                NSArray<GHStep *> * steps = [GHAstBuilder stepsWithScenarioDefinitionNode: scenarioOutlineNode];
                NSArray<GHExamples *> * examples = (NSArray<GHExamples *> *)[scenarioOutlineNode itemsWithRuleType: GHRuleTypeExamples_Definition];

                return [[GHScenarioOutline alloc] initWithTags: tags location: [scenarioOutlineLine location] keyword: [scenarioOutlineLine matchedKeyword] name: [scenarioOutlineLine matchedText] description: description steps: steps examples: examples];
            }
        }
        case GHRuleTypeExamples_Definition:
        {
            NSArray<GHTag *> * tags = [self tagsForNode: theNode];
            id examplesNode = [theNode singleWithRuleType: GHRuleTypeExamples];

            GHToken * examplesLine = [examplesNode tokenWithType: GHTokenTypeExamplesLine];
            NSString * description = [GHAstBuilder descriptionForScenarioDefinitionNode: examplesNode];

            NSArray<GHTableRow *> * allRows = [examplesNode singleWithRuleType: GHRuleTypeExamples_Table];

            GHTableRow * header = nil;
            NSArray<GHTableRow *> * rows = nil;
            if (allRows)
            {
                header = [allRows firstObject];
                NSMutableArray<GHTableRow *> * allRowsBuffer = [allRows mutableCopy];
                [allRowsBuffer removeObject: header];
                rows = [[NSArray<GHTableRow *> alloc] initWithArray: allRowsBuffer];
            }

            return [[GHExamples alloc] initWithTags: tags location: [examplesLine location] keyword: [examplesLine matchedKeyword] name: [examplesLine matchedText] description: description header: header body: rows];
        }
        case GHRuleTypeExamples_Table:
        {
            NSArray<GHTableRow *> * allRows = [self tableRowsForNode: theNode];

            return allRows;
        }
        case GHRuleTypeDescription:
        {
            NSArray<GHToken *> * lineTokens = (NSArray<GHToken *> *)[theNode tokensWithType: GHTokenTypeOther];

            NSMutableArray<GHToken *> * lineTokensBuffer = [lineTokens mutableCopy];
            NSEnumerator * reverseObjectEnumerator = [lineTokens reverseObjectEnumerator];
            for (GHToken * lineToken in reverseObjectEnumerator)
            {
                if (![[[lineToken matchedText] stringByTrimmingCharactersInSet: [NSCharacterSet whitespaceAndNewlineCharacterSet]] length])
                    [lineTokensBuffer removeObject: lineToken];
                else
                    break;
            }
            return [[lineTokensBuffer valueForKey: @"matchedText"] componentsJoinedByString: @"\n"];
        }
        case GHRuleTypeFeature:
        {
            id header = [theNode singleWithRuleType: GHRuleTypeFeature_Header];
            if (!header)
                return nil;

            NSArray<GHTag *> * tags = [self tagsForNode: header];
            GHToken * featureLine = [header tokenWithType: GHTokenTypeFeatureLine];
            if (featureLine == nil)
                return nil;

            GHBackground * background = [theNode singleWithRuleType: GHRuleTypeBackground];
            NSMutableArray<GHScenarioDefinition *> * children = [(NSArray<GHScenarioDefinition *> *)[theNode itemsWithRuleType: GHRuleTypeScenario_Definition] mutableCopy];
            if(background != nil){
                [children insertObject:background atIndex:0];
            }
            NSString * description = [GHAstBuilder descriptionForScenarioDefinitionNode: header];

            if ([featureLine matchedGherkinDialect] == nil)
                return nil;

            NSString * language = [[featureLine matchedGherkinDialect] language];

            return [[GHFeature alloc] initWithTags: tags location: [featureLine location] language: language keyword: [featureLine matchedKeyword] name: [featureLine matchedText] description: description children: children];
        }
        case GHRuleTypeGherkinDocument:
        {
          GHFeature * feature = [theNode singleWithRuleType: GHRuleTypeFeature];

          return [[GHGherkinDocument alloc] init: feature comments: comments];
        }
        default:
            return theNode;
    }
}

- (GHLocation *)locationForToken:(GHToken *)theToken
{
    return [self locationForToken: theToken column: 0];
}

- (GHLocation *)locationForToken:(GHToken *)theToken column:(NSUInteger)column
{
    return column == 0 ? [theToken location] : [[GHLocation alloc] initWithLine: [[theToken location] line] column: column];
}

- (NSArray<GHTag *> *)tagsForNode:(GHAstNode *)theNode
{
    GHAstNode * tagsNode = [theNode singleWithRuleType: GHRuleTypeTags];
    if (tagsNode == nil)
        return [[NSArray<GHTag *> alloc] init];


    NSArray<GHToken *> * tokens = [tagsNode tokensWithType: GHTokenTypeTagLine];

    NSMutableArray<GHTag *> * tagsBuffer = [[NSMutableArray<GHTag *> alloc] init];
    for (GHToken * token in tokens)
    {
        for (GHGherkinLineSpan * lineSpan in [token matchedItems])
        {
            [tagsBuffer addObject: [[GHTag alloc] initWithLocation: [self locationForToken: token column: [lineSpan column]] name: [lineSpan text]]];
        }
    }
    return [[NSArray<GHTag *> alloc] initWithArray: tagsBuffer];
}

- (NSArray<GHTableRow *> *)tableRowsForNode:(GHAstNode *)theNode
{
    NSArray<GHToken *> * tokens = [theNode tokensWithType: GHTokenTypeTableRow];
    NSMutableArray<GHTableRow *> * tableRowsBuffer = [[NSMutableArray<GHTableRow *> alloc] initWithCapacity: [tokens count]];
    for (GHToken * token in tokens)
    {
        [tableRowsBuffer addObject: [[GHTableRow alloc] initWithLocation: [self locationForToken: token] cells: [self cellsWithToken: token]]];
    }
    NSArray<GHTableRow *> * tableRows = [[NSArray<GHTableRow *> alloc] initWithArray: tableRowsBuffer];

    [self ensureCellCountForRows: tableRows];

    return tableRows;
}

- (void)ensureCellCountForRows:(NSArray<GHTableRow *> *)theRows
{
    if ([theRows count])
    {
        NSUInteger cellCount = [[theRows[0] cells] count];
        for (GHTableRow * row in theRows)
        {
            if ([[row cells] count] != cellCount)
            {
                @throw [[GHAstBuilderException alloc] initWithMessage: @"inconsistent cell count within the table" location: [row location]];
            }
        }
    }
}

- (NSArray<GHTableCell *> *)cellsWithToken:(GHToken *)theTableRowToken
{
    NSArray<GHGherkinLineSpan *> * matchedItems = [theTableRowToken matchedItems];
    NSMutableArray<GHTableCell *> * cellsBuffer = [[NSMutableArray<GHTableCell *> alloc] initWithCapacity: [matchedItems count]];
    for (GHGherkinLineSpan * matchedItem in matchedItems)
    {
        [cellsBuffer addObject: [[GHTableCell alloc] initWithLocation: [self locationForToken: theTableRowToken column: [matchedItem column]] value: [matchedItem text]]];
    }
    return [[NSArray<GHTableCell *> alloc] initWithArray: cellsBuffer];
}

+ (NSArray<GHStep *> *)stepsWithScenarioDefinitionNode:(GHAstNode *)theScenarioDefinitionNode
{
    return (NSArray<GHStep *> *)[theScenarioDefinitionNode itemsWithRuleType: GHRuleTypeStep];
}

+ (NSString *)descriptionForScenarioDefinitionNode:(GHAstNode *)theScenarioDefinitionNode
{
    return [theScenarioDefinitionNode singleWithRuleType: GHRuleTypeDescription];
}

@end
