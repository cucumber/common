#import "GHDataTable.h"

#import "GHTableRow.h"

@interface GHDataTable ()

@property (nonatomic, strong) GHLocation            * location;
@property (nonatomic, strong) NSArray<GHTableRow *> * rows;

@end

@implementation GHDataTable

@synthesize location;
@synthesize rows;

- (id)initWithTableRows:(NSArray<GHTableRow *> *)theRows
{
    NSAssert([theRows count], @"Rows argument cannot not be nil or empty");
    
    if (self = [super init])
    {
        rows = theRows;
        location = [[rows firstObject] location];
    }

    return self;
}

@end
