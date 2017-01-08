#import "GHLocation.h"

@interface GHLocation ()

@property (nonatomic, assign) NSUInteger    line;
@property (nonatomic, assign) NSUInteger    column;

@end

@implementation GHLocation

@synthesize line;
@synthesize column;

- (id)init
{
    return [self initWithLine: 0 column: 0];
}

- (id)initWithLine:(NSUInteger)theLine
{
    return [self initWithLine: theLine column: 0];
}

- (id)initWithColumn:(NSUInteger)theColumn
{
    return [self initWithLine: 0 column: theColumn];
}

- (id)initWithLine:(NSUInteger)theLine column:(NSUInteger)theColumn
{
    if (self = [super init])
    {
        line = theLine;
        column = theColumn;
    }
    
    return self;
}

@end