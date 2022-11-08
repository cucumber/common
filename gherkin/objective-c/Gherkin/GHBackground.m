#import "GHBackground.h"

#import "GHLocation.h"

@interface GHBackground ()


@end

@implementation GHBackground

- (id)initWithLocation:(GHLocation *)theLocation keyword:(NSString *)theKeyword name:(NSString *)theName description:(NSString *)theDescription steps:(NSArray *)theSteps
{
    self = [super initWithLocation:theLocation keyword:theKeyword name:theName description:theDescription steps:theSteps];
    return self;
}

@end