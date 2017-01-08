#import <Foundation/Foundation.h>

@interface GHTokensGenerator : NSObject

+ (NSString *)generateTokensFromFile:(NSString *)theFeatureFilePath;

@end
