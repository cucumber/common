#import <Foundation/Foundation.h>
@class GHTag;

@protocol GHHasTagsProtocol <NSObject>

@property (nonatomic, readonly) NSArray<GHTag *>   * tags;

@end