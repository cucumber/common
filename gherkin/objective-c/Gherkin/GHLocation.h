#import <Foundation/Foundation.h>
@interface GHLocation : NSObject

@property (nonatomic, readonly) NSUInteger  line;
@property (nonatomic, readonly) NSUInteger  column;

- (id)init;
- (id)initWithLine:(NSUInteger)theLine;
- (id)initWithColumn:(NSUInteger)theColumn;
- (id)initWithLine:(NSUInteger)theLine column:(NSUInteger)theColumn;

@end