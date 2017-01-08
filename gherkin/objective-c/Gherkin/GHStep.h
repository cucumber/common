#import <Foundation/Foundation.h>
#import "GHHasLocationProtocol.h"

@class GHLocation;
@class GHStepArgument;

@interface GHStep : NSObject <GHHasLocationProtocol>

@property (nonatomic, readonly) GHLocation      * location;
@property (nonatomic, readonly) NSString        * keyword;
@property (nonatomic, readonly) NSString        * text;
@property (nonatomic, readonly) GHStepArgument  * argument;

- (id)initWithLocation:(GHLocation *)theLocation keyword:(NSString *)theKeyword text:(NSString *)theText stepArgument:(GHStepArgument *)theStepArgument;

@end
