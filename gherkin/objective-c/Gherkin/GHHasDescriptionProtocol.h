#import <Foundation/Foundation.h>
@protocol GHHasDescriptionProtocol <NSObject>

@property (nonatomic, readonly) NSString    * keyword;
@property (nonatomic, readonly) NSString    * name;
@property (nonatomic, readonly) NSString    * desc;

@end