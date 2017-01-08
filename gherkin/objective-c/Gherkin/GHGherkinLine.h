#import <Foundation/Foundation.h>

#import "GHGherkinLineProtocol.h"

@interface GHGherkinLine : NSObject <GHGherkinLineProtocol>

@property (nonatomic, readonly) NSString    * lineText;
@property (nonatomic, readonly) NSUInteger  lineNumber;

- (id)initWithLine:(NSString *)theLine lineNumber:(NSUInteger)theLineNumber;

@end
