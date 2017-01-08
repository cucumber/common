@class GHFeature;
@class GHComment;

@interface GHGherkinDocument : NSObject

@property (nonatomic, readonly) GHFeature             * feature;
@property (nonatomic, readonly) NSArray<GHComment *>  * comments;

- (id)init:(GHFeature *)theFeature comments:(NSArray<GHComment *> *)theComments;

@end
