#import "GHScenarioDefinition.h"

#import "GHScenarioDefinition_Private.h"

#import "GHTag.h"
#import "GHStep.h"

@interface GHScenarioDefinition ()

@property (nonatomic, strong) NSArray<GHTag *>  * tags;
@property (nonatomic, strong) GHLocation        * location;
@property (nonatomic, strong) NSString          * keyword;
@property (nonatomic, strong) NSString          * name;
@property (nonatomic, strong) NSString          * desc;
@property (nonatomic, strong) NSArray<GHStep *> * steps;

@end

@implementation GHScenarioDefinition

@synthesize location;
@synthesize keyword;
@synthesize name;
@synthesize desc;
@synthesize steps;

- (id)initWithLocation:(GHLocation *)theLocation keyword:(NSString *)theKeyword name:(NSString *)theName description:(NSString *)theDescription steps:(NSArray<GHStep *> *)theSteps
{
    if (self = [super init])
    {
        location = theLocation;
        keyword = theKeyword;
        name = theName;
        desc = theDescription;
        steps = theSteps;
    }
    
    return self;
}

@end
