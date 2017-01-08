#import "GHTableRow.h"

#import "GHLocation.h"
#import "GHStepArgument.h"

@interface GHTableRow ()

@property (nonatomic, strong) GHLocation                * location;
@property (nonatomic, strong) NSArray<GHTableCell *>    * cells;

@end

@implementation GHTableRow

@synthesize location;
@synthesize cells;

- (id)initWithLocation:(GHLocation *)theLocation cells:(NSArray<GHTableCell *> *)theCells
{
    if (self = [super init])
    {
        location = theLocation;
        cells = theCells;
    }
    
    return self;
}

@end