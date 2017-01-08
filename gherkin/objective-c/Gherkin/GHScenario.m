#import "GHScenario.h"

#import "GHScenarioDefinition_Private.h"

#import "GHLocation.h"

@implementation GHScenario
@synthesize tags;
- (id)initWithTags:(NSArray<GHTag *> *)theTags location:(GHLocation *)theLocation keyword:(NSString *)theKeyword name:(NSString *)theName description:(NSString *)theDescription steps:(NSArray<GHStep *> *)theSteps
{
    
    self = [super initWithLocation: theLocation keyword: theKeyword name: theName description: theDescription steps: theSteps];
    tags = theTags;
    return self;
}

@end

