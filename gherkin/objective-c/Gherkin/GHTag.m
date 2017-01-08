#import "GHTag.h"

#import "GHLocation.h"

@interface GHTag ()

@property (nonatomic, strong) GHLocation    * location;
@property (nonatomic, strong) NSString      * name;

@end

@implementation GHTag

@synthesize location;
@synthesize name;

- (id)initWithLocation:(GHLocation *)theLocation name:(NSString *)theName
{
    if (self = [super init])
    {
        location = theLocation;
        name = theName;
    }
    
    return self;
}

@end