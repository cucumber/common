#import <Foundation/Foundation.h>
@class GHLocation;

@protocol GHHasLocationProtocol <NSObject>

@property (nonatomic, readonly) GHLocation  * location;

@end