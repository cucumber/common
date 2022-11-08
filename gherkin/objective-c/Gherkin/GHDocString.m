#import "GHDocString.h"

@interface GHDocString ()

@property (nonatomic, strong) GHLocation    * location;
@property (nonatomic, strong) NSString      * contentType;
@property (nonatomic, strong) NSString      * content;

@end

@implementation GHDocString

@synthesize location;
@synthesize contentType;
@synthesize content;

- (id)initWithLocation:(GHLocation *)theLocation contentType:(NSString *)theContentType content:(NSString *)theContent
{
    if (self = [super init])
    {
        location = theLocation;
        contentType = theContentType;
        content = theContent;
    }
    
    return self;
}

@end