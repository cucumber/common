#import "GHExamples.h"

#import "GHTag.h"
#import "GHTableRow.h"

@interface GHExamples ()

@property (nonatomic, strong) NSArray<GHTag *>        * tags;
@property (nonatomic, strong) GHLocation              * location;
@property (nonatomic, strong) NSString                * keyword;
@property (nonatomic, strong) NSString                * name;
@property (nonatomic, strong) NSString                * desc;
@property (nonatomic, strong) GHTableRow              * tableHeader;
@property (nonatomic, strong) NSArray<GHTableRow *>   * tableBody;

@end

@implementation GHExamples

@synthesize tags;
@synthesize location;
@synthesize keyword;
@synthesize name;
@synthesize desc;
@synthesize tableHeader;
@synthesize tableBody;

- (id)initWithTags:(NSArray<GHTag *> *)theTags location:(GHLocation *)theLocation keyword:(NSString *)theKeyword name:(NSString *)theName description:(NSString *)theDescription header:(GHTableRow *)theHeader body:(NSArray<GHTableRow *> *)theBody
{
    if (self = [super init])
    {
        tags = theTags;
        location = theLocation;
        keyword = theKeyword;
        name = theName;
        desc = theDescription;
        tableHeader = theHeader;
        tableBody = theBody;
    }
    
    return self;
}

- (NSArray<GHTableRow *> *)rows
{
    return [@[ tableHeader ] arrayByAddingObjectsFromArray: tableBody];
}

@end