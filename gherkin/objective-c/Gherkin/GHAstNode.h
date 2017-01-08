#import <Foundation/Foundation.h>
@class GHToken;

typedef enum GHRuleType GHRuleType;
typedef enum GHTokenType GHTokenType;

@interface GHAstNode<ObjectType> : NSObject

@property (nonatomic, readonly) GHRuleType  ruleType;

- (id)initWithRuleType:(GHRuleType)theRuleType;
- (GHToken *)tokenWithType:(GHTokenType)theTokenType;
- (NSArray<GHToken *> *)tokensWithType:(GHTokenType)theTokenType;
- (id)singleWithRuleType:(GHRuleType)theRuleType;
- (NSArray<NSObject *> *)itemsWithRuleType:(GHRuleType)theRuleType;
- (void)setSingleWithRuleType:(GHRuleType)theRuleType value:(ObjectType)theValue;
- (void)addRange:(GHRuleType)theRuleType values:(NSArray<NSObject *> *)theValues;
- (void)addObject:(NSObject *)theObject withRuleType:(GHRuleType)theRuleType;

@end
