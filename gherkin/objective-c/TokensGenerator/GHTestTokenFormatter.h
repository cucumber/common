#import <Foundation/Foundation.h>

@class GHToken;

@interface GHTestTokenFormatter : NSObject

- (NSString *)formatToken:(GHToken *)theToken;

@end
