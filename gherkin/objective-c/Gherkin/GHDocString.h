#import <Foundation/Foundation.h>
#import "GHStepArgument.h"

#import "GHHasLocationProtocol.h"
        
@interface GHDocString : GHStepArgument <GHHasLocationProtocol>

@property (nonatomic, readonly) GHLocation    * location;
@property (nonatomic, readonly) NSString      * contentType;
@property (nonatomic, readonly) NSString      * content;

- (id)initWithLocation:(GHLocation *)theLocation contentType:(NSString *)theContentType content:(NSString *)theContent;

@end