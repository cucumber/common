#import "GHTableCell.h"

#import "GHLocation.h"

@interface GHTableCell ()

@property (nonatomic, strong) GHLocation  * location;
@property (nonatomic, strong) NSString    * value;

@end

@implementation GHTableCell

@synthesize location;
@synthesize value;

- (id)initWithLocation:(GHLocation *)theLocation value:(NSString *)theValue
{
    if (self = [super init])
    {
        location = theLocation;
        value = theValue;
    }
    
    return self;
}

@end