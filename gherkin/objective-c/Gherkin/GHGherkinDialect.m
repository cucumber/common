#import "GHGherkinDialect.h"

@interface GHGherkinDialect ()

@property (nonatomic, strong) NSString              * language;
@property (nonatomic, strong) NSArray<NSString *>   * featureKeywords;
@property (nonatomic, strong) NSArray<NSString *>   * backgroundKeywords;
@property (nonatomic, strong) NSArray<NSString *>   * scenarioKeywords;
@property (nonatomic, strong) NSArray<NSString *>   * scenarioOutlineKeywords;
@property (nonatomic, strong) NSArray<NSString *>   * examplesKeywords;
@property (nonatomic, strong) NSArray<NSString *>   * givenStepKeywords;
@property (nonatomic, strong) NSArray<NSString *>   * whenStepKeywords;
@property (nonatomic, strong) NSArray<NSString *>   * thenStepKeywords;
@property (nonatomic, strong) NSArray<NSString *>   * andStepKeywords;
@property (nonatomic, strong) NSArray<NSString *>   * butStepKeywords;
@property (nonatomic, strong) NSArray<NSString *>   * stepKeywords;

@end

@implementation GHGherkinDialect

@synthesize language;
@synthesize featureKeywords;
@synthesize backgroundKeywords;
@synthesize scenarioKeywords;
@synthesize scenarioOutlineKeywords;
@synthesize examplesKeywords;
@synthesize givenStepKeywords;
@synthesize whenStepKeywords;
@synthesize thenStepKeywords;
@synthesize andStepKeywords;
@synthesize butStepKeywords;
@synthesize stepKeywords;

- (id)initWithLanguage:(NSString *)theLanguage featureKeywords:(NSArray<NSString *> *)theFeatureKeywords
    backgroundKeywords:(NSArray<NSString *> *)theBackgroundKeywords scenarioKeywords:(NSArray<NSString *> *)theScenarioKeywords
scenarioOutlineKeywords:(NSArray<NSString *> *)theScenarioOutlineKeywords examplesKeywords:(NSArray<NSString *> *)theExamplesKeywords
     givenStepKeywords:(NSArray<NSString *> *)theGivenStepKeywords whenStepKeywords:(NSArray<NSString *> *)theWhenStepKeywords
       thenStepKeywords:(NSArray<NSString *> *)theThenStepKeywords andStepKeywords:(NSArray<NSString *> *)theAndStepKeywords
       butStepKeywords:(NSArray<NSString *> *)theButStepKeywords
{
    if (self = [super init])
    {
        language = theLanguage;
        featureKeywords = theFeatureKeywords;
        backgroundKeywords = theBackgroundKeywords;
        scenarioKeywords = theScenarioKeywords;
        scenarioOutlineKeywords = theScenarioOutlineKeywords;
        examplesKeywords = theExamplesKeywords;
        givenStepKeywords = theGivenStepKeywords;
        whenStepKeywords = theWhenStepKeywords;
        thenStepKeywords = theThenStepKeywords;
        andStepKeywords = theAndStepKeywords;
        butStepKeywords = theButStepKeywords;
        
        stepKeywords = [[[[givenStepKeywords arrayByAddingObjectsFromArray: whenStepKeywords] arrayByAddingObjectsFromArray: thenStepKeywords] arrayByAddingObjectsFromArray: andStepKeywords] arrayByAddingObjectsFromArray: butStepKeywords];
        // Distinct using an NSOrderedSet
        stepKeywords = [[[NSOrderedSet alloc] initWithArray: stepKeywords] array];        
    }
    
    return self;
}

@end