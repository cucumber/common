#import <Foundation/Foundation.h>
@interface NSString (Trim)

- (NSString *)stringByTrimmingStartWithCharactersInSet:(NSCharacterSet *)theCharacterSet;
- (NSString *)stringByTrimmingEndWithCharactersInSet:(NSCharacterSet *)theCharacterSet;

@end
