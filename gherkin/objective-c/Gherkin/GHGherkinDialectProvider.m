#import "GHGherkinDialectProvider.h"

#import "GHGherkinDialect.h"
#import "GHGherkinLanguageSetting.h"
#import "GHLocation.h"
#import "GHParserException.h"

@interface GHGherkinDialectProvider ()

- (GHGherkinDialect *)dialectWithLanguage:(NSString *)theLanguage languageSetting:(GHGherkinLanguageSetting *)theLanguageSetting;
- (GHGherkinDialect *)dialectWithLanguage:(NSString *)theLanguage languagesSetting:(NSDictionary<NSString *, GHGherkinLanguageSetting *> *)theLanguagesSetting location:(GHLocation *)theLocation;
- (NSDictionary<NSString *, GHGherkinLanguageSetting *> *)parseJsonContent:(NSData *)theLanguagesFileContent;
- (NSDictionary<NSString *, GHGherkinLanguageSetting *> *)languagesSetting;

- (NSArray<NSString *> *)parseStepKeywords:(NSArray<NSString *> *)theStepKeywords;
- (NSArray<NSString *> *)parseTitleKeywords:(NSArray<NSString *> *)theKeywords;

@end

@implementation GHGherkinDialectProvider
{
    GHGherkinDialect    * defaultDialect;
    NSString            * language;
}

-  (GHGherkinDialect *)defaultDialect
{
    return [self dialectWithLanguage: language location: nil];
}

- (id)init
{
    return [self initWithLanguage: @"en"];
}

- (id)initWithLanguage:(NSString *)theLanguage
{
    if (self = [super init])
    {
        language = theLanguage;
    }
    
    return self;
}

- (GHGherkinDialect *)dialectWithLanguage:(NSString *)theLanguage location:(GHLocation *)theLocation
{
    NSDictionary<NSString *, GHGherkinLanguageSetting *> * languagesSetting = [self languagesSetting];
    
    return [self dialectWithLanguage: theLanguage languagesSetting: languagesSetting location: theLocation];
}

- (NSDictionary<NSString *, GHGherkinLanguageSetting *> *)languagesSetting
{
    NSBundle * gherkinLanguagesBundle = [NSBundle bundleWithPath: [[NSBundle mainBundle] pathForResource: @"GherkinLanguages" ofType: @"bundle"]];
    if(gherkinLanguagesBundle == nil){
        gherkinLanguagesBundle = [NSBundle bundleForClass:[self class]];
    }
    NSData * languagesFileContent = [NSData dataWithContentsOfFile: [gherkinLanguagesBundle pathForResource: @"gherkin-languages" ofType: @"json"]];
    
    /*TODO: check for error
    if (resourceStream == null)
        throw new InvalidOperationException("Gherkin language resource not found: " + languageFileName);*/
    
    return [self parseJsonContent: languagesFileContent];
}

- (NSDictionary<NSString *, GHGherkinLanguageSetting *> *)parseJsonContent:(NSData *)theLanguagesFileContent
{
    NSError * error;
    NSDictionary<NSString *, GHGherkinLanguageSetting *> * languagesSetting = nil;
    id parsingResult = [NSJSONSerialization JSONObjectWithData: theLanguagesFileContent options: 0 error: &error];
    if (parsingResult)
    {
        NSMutableDictionary<NSString *, GHGherkinLanguageSetting *> * languagesSettingBuffer = [[NSMutableDictionary<NSString *, GHGherkinLanguageSetting *> alloc] initWithCapacity: [parsingResult count]];
        for (NSString * languageKey in parsingResult)
        {
            NSDictionary * languageSettingDictionary = parsingResult[languageKey];
            GHGherkinLanguageSetting * languageSetting = [[GHGherkinLanguageSetting alloc] init];
            [languageSetting setValuesForKeysWithDictionary: languageSettingDictionary];
            
            languagesSettingBuffer[languageKey] = languageSetting;
        }
        languagesSetting = [[NSDictionary<NSString *, GHGherkinLanguageSetting *> alloc] initWithDictionary: languagesSettingBuffer];
    }
    
    return languagesSetting;
}

- (GHGherkinDialect *)dialectWithLanguage:(NSString *)theLanguage languagesSetting:(NSDictionary<NSString *, GHGherkinLanguageSetting *> *)theLanguagesSetting location:(GHLocation *)theLocation
{
    GHGherkinLanguageSetting * languageSetting = nil;
    if ((languageSetting = theLanguagesSetting[theLanguage]) == nil)
        @throw [[GHNoSuchLanguageException alloc] initWithLanguage: theLanguage location: theLocation];

    return [self dialectWithLanguage: theLanguage languageSetting: languageSetting];
}

- (GHGherkinDialect *)dialectWithLanguage:(NSString *)theLanguage languageSetting:(GHGherkinLanguageSetting *)theLanguageSetting
{
    return [[GHGherkinDialect alloc] initWithLanguage: theLanguage
                                      featureKeywords: [self parseTitleKeywords: theLanguageSetting.feature]
                                   backgroundKeywords: [self parseTitleKeywords: theLanguageSetting.background]
                                     scenarioKeywords: [self parseTitleKeywords: theLanguageSetting.scenario]
                              scenarioOutlineKeywords: [self parseTitleKeywords: theLanguageSetting.scenarioOutline]
                                     examplesKeywords: [self parseTitleKeywords: theLanguageSetting.examples]
                                        givenStepKeywords: [self parseStepKeywords: theLanguageSetting.given]
                                         whenStepKeywords: [self parseStepKeywords: theLanguageSetting.when]
                                         thenStepKeywords: [self parseStepKeywords: theLanguageSetting.then]
                                          andStepKeywords: [self parseStepKeywords: theLanguageSetting.and]
                                          butStepKeywords: [self parseStepKeywords: theLanguageSetting.but]];
}

- (NSArray<NSString *> *)parseStepKeywords:(NSArray<NSString *> *)theStepKeywords
{
    return theStepKeywords;
}

- (NSArray<NSString *> *)parseTitleKeywords:(NSArray<NSString *> *)theKeywords
{
    return theKeywords;
}

@end
