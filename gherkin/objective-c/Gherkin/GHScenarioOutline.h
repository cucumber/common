#import <Foundation/Foundation.h>
#import "GHScenarioDefinition.h"

@class GHExamples;

@interface GHScenarioOutline : GHScenarioDefinition

@property (nonatomic, readonly) NSArray<GHExamples *> * examples;

@property (nonatomic, readonly) NSArray<GHTag *>    * tags;


- (id)initWithTags:(NSArray<GHTag *> *)theTags location:(GHLocation *)theLocation keyword:(NSString *)theKeyword name:(NSString *)theName description:(NSString *)theDescription steps:(NSArray<GHStep *> *)theSteps examples:(NSArray<GHExamples *> *)theExamples;

@end