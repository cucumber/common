#import <XCTest/XCTest.h>

#import "GHTokenMatcher.h"
#import "GHTokenScanner.h"
#import "GHLineEndingHelper.h"
#import "GHParser+Extensions.h"

@interface GHGherkinTokenizationTest : XCTestCase

@end

@implementation GHGherkinTokenizationTest

- (void)testSuccessfulParsing
{
    GHParser * parser = [[GHParser alloc] init];
    id parsingResult = [parser parse: theTestFeatureFile];
    XCTAssertNotNil(parsingResult);
}


- (void)testMultipleFeatures
{
    GHTokenMatcher * tokenMatcher = [[GHTokenMatcher alloc] init];
    GHParser * parser = [[GHParser alloc] initWithAstBuilder: [[GHAstBuilder alloc] init]];
    
    id parsingResult1 = [parser parseWithTokenScanner: [[GHTokenScanner alloc] initWithText: @"Feature: Test"] tokenMatcher: tokenMatcher];
    id serializationResult1 = [NSJSONSerialization dataWithJSONObject: [parsingResult1 dictionary] options: NSJSONWritingPrettyPrinted error: NULL];
    id astText1 = [GHLineEndingHelper normalizeLineEndings: [[NSString alloc] initWithData: serializationResult1 encoding: NSUTF8StringEncoding]];
    
    id parsingResult2 = [parser parseWithTokenScanner: [[GHTokenScanner alloc] initWithText: @"Feature: Test"] tokenMatcher: tokenMatcher];
    id serializationResult2 = [NSJSONSerialization dataWithJSONObject: [parsingResult2 dictionary] options: NSJSONWritingPrettyPrinted error: NULL];
    id astText2 = [GHLineEndingHelper normalizeLineEndings: [[NSString alloc] initWithData: serializationResult2 encoding: NSUTF8StringEncoding]];
    
    NSString * expected1 = [GHLineEndingHelper normalizeLineEndings: @"{\
                            \"Tags\": [],\
                                                             \"Location\": {\
                                                                 \"Line\": 1,\
                                                                 \"Column\": 1\
                                                             },\
                                                             \"Language\": \"en\",\
                                                             \"Keyword\": \"Feature\",\
                                                             \"Name\": \"Test\",\
                                                             \"ScenarioDefinitions\": [],\
                                                             \"Comments\": []\
                                                             }"];
    NSString * expected2 = [GHLineEndingHelper normalizeLineEndings: @"{\
                                                                    \"Tags\": [],\
                                                                  \"Location\": {\
                                                                      \"Line\": 1,\
                                                                      \"Column\": 1\
                                                                  },\
                                                                  \"Language\": \"en\",\
                                                                  \"Keyword\": \"Feature\",\
                                                                  \"Name\": \"Test2\",\
                                                                  \"ScenarioDefinitions\": [],\
                                                                  \"Comments\": []\
                                                                  }"];
    XCTAssertEqualObjects(expected1, astText1);
    XCTAssertEqualObjects(expected2, astText2);
}
                                                                                                                      

- (void)testChangeDefaultLanguage
{
    GHTokenMatcher * tokenMatcher = [[GHTokenMatcher alloc] initWithLanguage: @"no"];
    GHParser * parser = [[GHParser alloc] initWithAstBuilder: [[GHAstBuilder alloc] init]];

    id parsingResult = [parser parseWithTokenScanner: [[GHTokenScanner alloc] initWithText: @"Egenskap: i18n support"] tokenMatcher: tokenMatcher];
    id serializationResult = [NSJSONSerialization dataWithJSONObject: [parsingResult dictionary] options: NSJSONWritingPrettyPrinted error: NULL];
    id astText = [GHLineEndingHelper normalizeLineEndings: [[NSString alloc] initWithData: serializationResult encoding: NSUTF8StringEncoding]];
    
    NSString * expected = [GHLineEndingHelper normalizeLineEndings: @"{\
                           \"Tags\": [],\
                           \"Location\": {\
                                \"Line\": 1,\
                                \"Column\": 1\
                           },\
                           \"Language\": \"no\",\
                           \"Keyword\": \"Egenskap\",\
                           \"Name\": \"i18n support\",\
                           \"ScenarioDefinitions\": [],\
                           \"Comments\": []\
                           }"];
    
    XCTAssertEqualObjects(expected, astText);    
}

@end
