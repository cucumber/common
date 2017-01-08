#import <Foundation/Foundation.h>
@interface GHGherkinLineSpan : NSObject

@property (nonatomic, readonly) NSUInteger  column;
@property (nonatomic, readonly) NSString    * text;

- (id)initWithColumn:(NSUInteger)theColumn text:(NSString *)theText;

@end