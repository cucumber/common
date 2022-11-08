#import "GHGherkinDocument.h"

#import "GHFeature.h"
#import "GHComment.h"

@interface GHGherkinDocument ()

@property (nonatomic, strong) GHFeature             * feature;
@property (nonatomic, strong) NSArray<GHComment *>  * comments;

@end

@implementation GHGherkinDocument

@synthesize feature;
@synthesize comments;

- (id)init:(GHFeature *)theFeature comments:(NSArray<GHComment *> *)theComments
{
    if (self = [super init])
    {
        feature = theFeature;
        comments = theComments;
    }

    return self;
}

@end
