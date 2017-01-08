
#import "GHGherkinLineSpan.h"

@interface GHGherkinLineSpan ()

@property (nonatomic, assign) NSUInteger  column;
@property (nonatomic, strong) NSString    * text;

@end

@implementation GHGherkinLineSpan

@synthesize column;
@synthesize text;

- (id)initWithColumn:(NSUInteger)theColumn text:(NSString *)theText
{
    if (self = [super init])
    {
        column = theColumn;
        text = theText;
    }
    return self;
}

@end
