#import <Foundation/Foundation.h>
@interface GHGherkinLanguageSetting : NSObject

@property (nonatomic, strong) NSString            * name;
@property (nonatomic, strong) NSString            * native;
@property (nonatomic, strong) NSArray<NSString *> * feature;
@property (nonatomic, strong) NSArray<NSString *> * background;
@property (nonatomic, strong) NSArray<NSString *> * scenario;
@property (nonatomic, strong) NSArray<NSString *> * scenarioOutline;
@property (nonatomic, strong) NSArray<NSString *> * examples;
@property (nonatomic, strong) NSArray<NSString *> * given;
@property (nonatomic, strong) NSArray<NSString *> * when;
@property (nonatomic, strong) NSArray<NSString *> * then;
@property (nonatomic, strong) NSArray<NSString *> * and;
@property (nonatomic, strong) NSArray<NSString *> * but;

@end
