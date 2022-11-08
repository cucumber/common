#import <Foundation/Foundation.h>
#import "GHScenarioDefinition.h"

@class GHTag;
@class GHLocation;
@class GHStep;

@interface GHScenario : GHScenarioDefinition

@property (nonatomic, readonly) NSArray<GHTag *>    * tags;

- (id)initWithTags:(NSArray<GHTag *> *)theTags location:(GHLocation *)theLocation keyword:(NSString *)theKeyword name:(NSString *)theName description:(NSString *)theDescription steps:(NSArray<GHStep *> *)theSteps;

@end