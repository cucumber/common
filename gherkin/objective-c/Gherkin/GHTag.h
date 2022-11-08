#import <Foundation/Foundation.h>
@class GHLocation;

#import "GHHasLocationProtocol.h"

@interface GHTag : NSObject <GHHasLocationProtocol>

@property (nonatomic, readonly) GHLocation  * location;
@property (nonatomic, readonly) NSString    * name;

- (id)initWithLocation:(GHLocation *)theLocation name:(NSString *)theName;

@end