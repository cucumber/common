#import <Foundation/Foundation.h>
#import "GHHasLocationProtocol.h"

@class GHTableCell;

@interface GHTableRow : NSObject <GHHasLocationProtocol>

@property (nonatomic, readonly) GHLocation              * location;
@property (nonatomic, readonly) NSArray<GHTableCell *>  * cells;

- (id)initWithLocation:(GHLocation *)theLocation cells:(NSArray<GHTableCell *> *)theCells;

@end