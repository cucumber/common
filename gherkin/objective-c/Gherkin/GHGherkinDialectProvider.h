#import <Foundation/Foundation.h>

#import "GHGherkinDialectProviderProtocol.h"

@interface GHGherkinDialectProvider : NSObject <GHGherkinDialectProviderProtocol>

- (id)initWithLanguage:(NSString *)theLanguage;

@end
