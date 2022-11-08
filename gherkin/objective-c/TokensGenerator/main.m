#import "GHTokensGenerator.h"

int main(int argc, const char * argv[])
{
    @autoreleasepool {

        if (argc <= 1)
        {
            NSLog(@"Usage: ./TokensGenerator test-feature-file.feature");
            return 100;
        }
        
        for (int i = 1; i < argc; i++)
        {
            @try
            {
                NSString * tokensText = [GHTokensGenerator generateTokensFromFile: [NSString stringWithUTF8String: argv[i]]];
                puts([tokensText UTF8String]);
            }
            @catch (NSException * exception)
            {
                // Ideally we'd use stderr here...
                puts([[exception reason] UTF8String]);
                return 1;
            }
        }
    }
    return 0;
}
