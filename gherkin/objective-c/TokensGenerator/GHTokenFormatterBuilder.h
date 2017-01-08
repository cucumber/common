#import <Foundation/Foundation.h>

#import "GHParser.h"

@interface GHTokenFormatterBuilder : NSObject <GHAstBuilderProtocol>

- (NSString *)tokensText;

@end
