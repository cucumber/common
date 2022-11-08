#import "GHAstNode.h"

#import "GHToken.h"
#import "GHParser.h"

@interface GHAstNode ()

@property (nonatomic, assign) GHRuleType    ruleType;

@end

@implementation GHAstNode
{
    NSMutableDictionary<NSNumber *, NSMutableArray<NSObject *> *> * subitems;
}

@synthesize ruleType;

- (id)initWithRuleType:(GHRuleType)theRuleType
{
    if (self = [super init])
    {
        ruleType = theRuleType;
        subitems = [[NSMutableDictionary<NSNumber *, NSMutableArray<NSObject *> *> alloc] init];
    }
    return self;
}

- (GHToken *)tokenWithType:(GHTokenType)theTokenType
{
    return [self singleWithRuleType: (GHRuleType)theTokenType];
}

- (NSArray<GHToken *> *)tokensWithType:(GHTokenType)theTokenType
{
    return (NSArray<GHToken *> *)[self itemsWithRuleType: (GHRuleType)theTokenType];
}

- (id)singleWithRuleType:(GHRuleType)theRuleType
{
    return [[self itemsWithRuleType: theRuleType] firstObject];
}

- (NSArray<NSObject *> *)itemsWithRuleType:(GHRuleType)theRuleType
{
    NSArray<NSObject *> * items = subitems[@(theRuleType)];
    if (items)
        return items;
    
    return [[NSArray<NSObject *> alloc] init];
}

- (void)setSingleWithRuleType:(GHRuleType)theRuleType value:(NSObject *)theValue
{
    NSMutableArray<NSObject *> * valueArray = [[NSMutableArray<NSObject *> alloc] initWithObjects: theValue ? theValue : [NSNull null], nil];
    
    subitems[@(theRuleType)] = valueArray;
}

- (void)addRange:(GHRuleType)theRuleType values:(NSArray<NSObject *> *)theValues
{
    for (id value in theValues)
    {
        [self addObject: value withRuleType: theRuleType];
    }
}

- (void)addObject:(NSObject *)theObject withRuleType:(GHRuleType)theRuleType
{
    NSMutableArray<NSObject *> * items = subitems[@(theRuleType)];
    if (!items)
    {
        items = [[NSMutableArray<NSObject *> alloc] init];
        subitems[@(theRuleType)] = items;
    }
    [items addObject: theObject ? theObject : [NSNull null]];
}

@end
