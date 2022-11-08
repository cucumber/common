#import <Foundation/Foundation.h>
#import "GHHasLocationProtocol.h"

@class GHLocation;

@interface GHTableCell : NSObject <GHHasLocationProtocol>

@property (nonatomic, readonly) GHLocation  * location;
@property (nonatomic, readonly) NSString    * value;

- (id)initWithLocation:(GHLocation *)theLocation value:(NSString *)theValue;

@end
