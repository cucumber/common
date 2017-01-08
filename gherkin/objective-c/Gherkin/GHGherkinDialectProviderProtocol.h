#import <Foundation/Foundation.h>
@class GHGherkinDialect;
@class GHLocation;

@protocol GHGherkinDialectProviderProtocol <NSObject>

@property (nonatomic, readonly) GHGherkinDialect    * defaultDialect;
- (GHGherkinDialect *)dialectWithLanguage:(NSString *)theLanguage location:(GHLocation *)theLocation;

@end
