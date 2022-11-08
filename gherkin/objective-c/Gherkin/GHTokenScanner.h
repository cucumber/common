#import <Foundation/Foundation.h>
#import "GHParser.h"

@class GHToken;

@interface GHTokenScanner : NSObject <GHTokenScannerProtocol>

- (id)initWithText:(NSString *)theFileContent;
- (id)initWithContentsOfFile:(NSString *)theFilePath;
- (GHToken *)read;
        
@end
