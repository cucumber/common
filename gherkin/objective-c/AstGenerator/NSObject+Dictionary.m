#import "NSObject+Dictionary.h"

#import "GHHasLocationProtocol.h"
#import "GHGherkinDocument.h"

#import <objc/runtime.h>

@implementation NSObject (Dictionary)

static NSDateFormatter * dateFormatter;

+ (NSDateFormatter *)dateFormatter
{
    if (!dateFormatter)
    {
        dateFormatter = [[NSDateFormatter alloc] init];
        [dateFormatter setDateFormat: @"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"];
        [dateFormatter setLocale: [[NSLocale alloc] initWithLocaleIdentifier: @"en_US_POSIX"]];
    }
    return dateFormatter;
}

- (NSDictionary *)dictionary
{
    NSMutableDictionary * dictionary = [[NSMutableDictionary alloc] init];
    
    unsigned int count;
    Class currentClass = [self class];
    while (currentClass != [NSObject class])
    {
        Ivar * ivars = class_copyIvarList(currentClass, &count);
    
        for (int i = 0; i < count; i++)
        {
            NSString * propertyName = [NSString stringWithUTF8String:ivar_getName(ivars[i])];
            id object = [self valueForKey: propertyName];
            
            // Ugly fix to replace "desc" properties by "description" because the ToString() method is named "description" in ObjC...
            if ([propertyName isEqualToString: @"desc"])
                propertyName = @"description";
            
            if (object)
            {
                if ([object isKindOfClass:[NSArray class]] || [object isKindOfClass:[NSSet class]])
                {
                    NSMutableArray * subObjectsBuffer = [[NSMutableArray alloc] init];
                    for (NSObject * subObject in object)
                    {
                        [subObjectsBuffer addObject: [subObject dictionary]];
                    }
                    dictionary[propertyName] = [[NSArray alloc] initWithArray: subObjectsBuffer];
                }
                else if ([object isKindOfClass:[NSDictionary class]])
                {
                    NSMutableDictionary * subObjectsBuffer = [[NSMutableDictionary alloc] init];
                    for (id key in object)
                    {
                        NSObject * subObject = [object objectForKey: key];
                        [subObjectsBuffer setObject: [subObject dictionary] forKey: key];
                    }
                    dictionary[propertyName] = [[NSDictionary alloc] initWithDictionary: subObjectsBuffer];
                }
                else if ([object isKindOfClass:[NSString class]] || [object isKindOfClass:[NSNumber class]])
                    dictionary[propertyName] = object;
                else if ([object isKindOfClass:[NSDate class]])
                    dictionary[propertyName] = [[NSObject dateFormatter] stringFromDate:(NSDate *) object];
                else if ([object isKindOfClass: [NSObject class]])
                    dictionary[propertyName] = [object dictionary];
            }
            
        }
        
        free(ivars);
        currentClass = class_getSuperclass(currentClass);
    }
    
    // Add type based on class name to the dictionary
    if ([[self class] conformsToProtocol: @protocol(GHHasLocationProtocol)])
        [dictionary setObject: [NSStringFromClass([self class]) stringByReplacingOccurrencesOfString: @"GH" withString: @""] forKey: @"type"];

    if ([self isKindOfClass:[GHGherkinDocument class]])
        [dictionary setObject: @"GherkinDocument" forKey: @"type"];

    return dictionary;
}

@end
