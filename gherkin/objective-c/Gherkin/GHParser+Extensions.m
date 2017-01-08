#import "GHParser+Extensions.h"

#import "GHParser.h"
#import "GHTokenScanner.h"
#import "GHGherkinDocument.h"

@implementation GHParser (Extensions)

- (GHGherkinDocument *)parse:(NSString *)theSourceFile
{
    return [self parseWithTokenScanner: [[GHTokenScanner alloc] initWithContentsOfFile: theSourceFile]];
}

@end
