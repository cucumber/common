#import "GHFeature.h"

#import "GHTag.h"
#import "GHLocation.h"
#import "GHBackground.h"
#import "GHScenarioDefinition.h"

@interface GHFeature ()

@property (nonatomic, strong) NSArray<GHTag *>                  * tags;
@property (nonatomic, strong) GHLocation                        * location;
@property (nonatomic, strong) NSString                          * language;
@property (nonatomic, strong) NSString                          * keyword;
@property (nonatomic, strong) NSString                          * name;
@property (nonatomic, strong) NSString                          * desc;
@property (nonatomic, strong) NSArray<GHScenarioDefinition *>   * children;

@end

@implementation GHFeature

@synthesize tags;
@synthesize location;
@synthesize language;
@synthesize keyword;
@synthesize name;
@synthesize desc;
@synthesize children;

- (id)initWithTags:(NSArray<GHTag *> *)theTags location:(GHLocation *)theLocation language:(NSString *)theLanguage keyword:(NSString *)theKeyword name:(NSString *)theName description:(NSString *)theDescription children:(NSArray<GHScenarioDefinition *> *)theChildren
{
    if (self = [super init])
    {
        tags = theTags;
        location = theLocation;
        language = theLanguage;
        keyword = theKeyword;
        name = theName;
        desc = theDescription;
        children = theChildren;
    }

    return self;
}

@end
