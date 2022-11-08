#import <Foundation/Foundation.h>
#import <Foundation/Foundation.h>
#import "GHHasLocationProtocol.h"
#import "GHHasDescriptionProtocol.h"
#import "GHHasRowsProtocol.h"
#import "GHHasTagsProtocol.h"

@class GHTag;
@class GHTableRow;

@interface GHExamples : NSObject <GHHasLocationProtocol, GHHasDescriptionProtocol, GHHasRowsProtocol, GHHasTagsProtocol>

@property (nonatomic, readonly) NSArray<GHTag *>        * tags;
@property (nonatomic, readonly) GHLocation              * location;
@property (nonatomic, readonly) NSString                * keyword;
@property (nonatomic, readonly) NSString                * name;
@property (nonatomic, readonly) NSString                * desc;
@property (nonatomic, readonly) GHTableRow              * tableHeader;
@property (nonatomic, readonly) NSArray<GHTableRow *>   * tableBody;

- (id)initWithTags:(NSArray<GHTag *> *)theTags location:(GHLocation *)theLocation keyword:(NSString *)theKeyword name:(NSString *)theName description:(NSString *)theDescription header:(GHTableRow *)theHeader body:(NSArray<GHTableRow *> *)theBody;


@end