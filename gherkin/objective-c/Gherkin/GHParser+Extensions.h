#import <Foundation/Foundation.h>
#import "GHParser.h"

@class GHGherkinDocument;

@interface GHParser (Extensions)

- (GHGherkinDocument *)parse:(NSString *)theSourceFile;

@end
