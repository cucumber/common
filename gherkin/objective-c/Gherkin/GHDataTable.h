#import <Foundation/Foundation.h>
#import "GHStepArgument.h"

#import "GHHasRowsProtocol.h"
#import "GHHasLocationProtocol.h"

@interface GHDataTable : GHStepArgument <GHHasLocationProtocol, GHHasLocationProtocol>

@property (nonatomic, readonly) GHLocation              * location;
@property (nonatomic, readonly) NSArray<GHTableRow *>   * rows;

- (id)initWithTableRows:(NSArray<GHTableRow *> *)theRows;

@end