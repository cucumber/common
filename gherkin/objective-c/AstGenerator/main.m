#import "GHAstGenerator.h"

int main(int argc, const char * argv[])
{
    @autoreleasepool {

        if (argc <= 1)
        {
            NSLog(@"Usage: ./AstGenerator test-feature-file.feature");
            return 100;
        }
        
        NSDate * startDate = [NSDate date];
        for (int i = 1; i < argc; i++)
        {
            @try
            {
                NSString * astText = [GHAstGenerator generateAstFromFile: [NSString stringWithUTF8String: argv[i]]];
                puts([astText UTF8String]);
            }
            @catch (NSException * exception)
            {
                // Ideally we'd use Console.Error here, but we can't because
                // 2> doesn't seem to work properly - at least not on Mono on OS X.
                puts([[exception reason] UTF8String]);
                return 1;
            }
        }

        if (getenv("GHERKIN_PERF") != NULL)
        {
            NSLog(@"%f", [[NSDate date] timeIntervalSinceDate: startDate]);
        }
    }
    return 0;
}
