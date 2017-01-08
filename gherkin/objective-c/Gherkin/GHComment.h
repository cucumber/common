#import <Foundation/Foundation.h>
#import "GHHasLocationProtocol.h"

@interface GHComment : NSObject <GHHasLocationProtocol>

@property (nonatomic, readonly) GHLocation  * location;
@property (nonatomic, readonly) NSString    * text;

- (id)initWithLocation:(GHLocation *)theLocation text:(NSString *)theText;

@end