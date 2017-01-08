#import <Foundation/Foundation.h>
#import "GHParser.h"

@class GHToken;
@class GHGherkinDialect;
@class GHGherkinDialectProvider;

@interface GHTokenMatcher : NSObject <GHTokenMatcherProtocol>

- (GHGherkinDialect *)currentDialect;
- (id)initWithDialectProvider:(GHGherkinDialectProvider *)theDialectProvider;
- (id)initWithLanguage:(NSString *)theLanguage;
- (void)reset;
- (BOOL)matchEOFWithToken:(GHToken *)theToken;
- (BOOL)matchOtherWithToken:(GHToken *)theToken;
- (BOOL)matchEmptyWithToken:(GHToken *)theToken;
- (BOOL)matchCommentWithToken:(GHToken *)theToken;
- (BOOL)matchLanguageWithToken:(GHToken *)theToken;
- (BOOL)matchTagLineWithToken:(GHToken *)theToken;
- (BOOL)matchFeatureLineWithToken:(GHToken *)theToken;
- (BOOL)matchBackgroundLineWithToken:(GHToken *)theToken;
- (BOOL)matchScenarioLineWithToken:(GHToken *)theToken;
- (BOOL)matchScenarioOutlineLineWithToken:(GHToken *)theToken;
- (BOOL)matchExamplesLineWithToken:(GHToken *)theToken;
- (BOOL)matchDocStringSeparatorWithToken:(GHToken *)theToken;
- (BOOL)matchStepLineWithToken:(GHToken *)theToken;
- (BOOL)matchTableRowWithToken:(GHToken *)theToken;

@end