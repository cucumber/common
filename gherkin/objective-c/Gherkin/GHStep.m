#import "GHStep.h"

#import "GHLocation.h"
#import "GHStepArgument.h"

@interface GHStep ()

@property (nonatomic, strong) GHLocation        * location;
@property (nonatomic, strong) NSString          * keyword;
@property (nonatomic, strong) NSString          * text;
@property (nonatomic, strong) GHStepArgument    * argument;

@end

@implementation GHStep

@synthesize location;
@synthesize keyword;
@synthesize text;
@synthesize argument;

- (id)initWithLocation:(GHLocation *)theLocation keyword:(NSString *)theKeyword text:(NSString *)theText stepArgument:(GHStepArgument *)theArgument
{
    if (self = [super init])
    {
        location = theLocation;
        keyword = theKeyword;
        text = theText;
        argument = theArgument;
    }
    
    return self;
}

@end