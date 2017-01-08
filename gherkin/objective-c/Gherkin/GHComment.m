#import "GHComment.h"

@interface GHComment ()

@property (nonatomic, strong) GHLocation    * location;
@property (nonatomic, strong) NSString      * text;

@end

@implementation GHComment

@synthesize location;
@synthesize text;

- (id)initWithLocation:(GHLocation *)theLocation text:(NSString *)theText
{
    if (self = [super init])
    {
        location = theLocation;
        text = theText;
        
    }
    
    return self;
}

@end
