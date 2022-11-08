#import <Foundation/Foundation.h>

@interface GHGherkinDialect : NSObject

@property (nonatomic, readonly) NSString            * language;
@property (nonatomic, readonly) NSArray<NSString *> * featureKeywords;
@property (nonatomic, readonly) NSArray<NSString *> * backgroundKeywords;
@property (nonatomic, readonly) NSArray<NSString *> * scenarioKeywords;
@property (nonatomic, readonly) NSArray<NSString *> * scenarioOutlineKeywords;
@property (nonatomic, readonly) NSArray<NSString *> * examplesKeywords;
@property (nonatomic, readonly) NSArray<NSString *> * givenStepKeywords;
@property (nonatomic, readonly) NSArray<NSString *> * whenStepKeywords;
@property (nonatomic, readonly) NSArray<NSString *> * thenStepKeywords;
@property (nonatomic, readonly) NSArray<NSString *> * andStepKeywords;
@property (nonatomic, readonly) NSArray<NSString *> * butStepKeywords;
@property (nonatomic, readonly) NSArray<NSString *> * stepKeywords;

- (id)initWithLanguage:(NSString *)theLanguage featureKeywords:(NSArray<NSString *> *)theFeatureKeywords
    backgroundKeywords:(NSArray<NSString *> *)theBackgroundKeywords scenarioKeywords:(NSArray<NSString *> *)theScenarioKeywords
scenarioOutlineKeywords:(NSArray<NSString *> *)theScenarioOutlineKeywords examplesKeywords:(NSArray<NSString *> *)theExamplesKeywords
     givenStepKeywords:(NSArray<NSString *> *)theGivenStepKeywords whenStepKeywords:(NSArray<NSString *> *)theWhenStepKeywords
      thenStepKeywords:(NSArray<NSString *> *)theThenStepKeywords andStepKeywords:(NSArray<NSString *> *)theAndStepKeywords
       butStepKeywords:(NSArray<NSString *> *)theButStepKeywords;

@end