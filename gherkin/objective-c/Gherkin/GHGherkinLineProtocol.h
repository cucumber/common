#import <Foundation/Foundation.h>
@class GHGherkinLineSpan;

@protocol GHGherkinLineProtocol <NSObject>

@property (nonatomic, readonly) NSString    * lineText;
@property (nonatomic, readonly) NSUInteger  lineNumber;
@property (nonatomic, readonly) NSUInteger  indent;

/// <summary>
/// Called by the parser to indicate non-streamed reading (e.g. during look-ahead).
/// </summary>
/// <remarks>
/// If the implementation depends on streamed reading behavior, with this method, it can clone itself, so that it will be detached.
/// </remarks>
- (void)detach;

/// <summary>
/// Gets if the line is empty or contains whitespaces only.
/// </summary>
/// <returns>YES, if empty or contains whitespaces only; otherwise, NO.</returns>
- (BOOL)empty;

/// <summary>
/// Determines whether the beginning of the line (wihtout whitespaces) matches a specified string.
/// </summary>
/// <param name="theText">The string to compare. </param>
/// <returns>YES if text matches the beginning of this line; otherwise, NO.</returns>
- (BOOL)hasPrefix:(NSString *)theText;

/// <summary>
/// Determines whether the beginning of the line (wihtout whitespaces) matches a specified title keyword (ie. a keyword followed by a ':' character).
/// </summary>
/// <param name="theKeyword">The keyword to compare. </param>
/// <returns>YES if keyword matches the beginning of this line and followed by a ':' character; otherwise, NO.</returns>
- (BOOL)hasTitleKeywordPrefix:(NSString *)theKeyword;

/// <summary>
/// Returns the line text
/// </summary>
/// <param name="theIndentToRemove">The maximum number of whitespace characters to remove. -1 removes all leading whitespaces.</param>
/// <returns>The line text.</returns>
- (NSString *)lineTextByRemovingIndent:(NSInteger)theIndentToRemove;

/// <summary>
/// Returns the remaining part of the line.
/// </summary>
/// <param name="theLength"></param>
/// <returns></returns>
- (NSString *)trimmedRest:(NSUInteger)theLength;

/// <summary>
/// Tries parsing the line as a tag list, and returns the tags wihtout the leading '@' characters.
/// </summary>
/// <returns>(position,text) pairs, position is 0-based index</returns>
- (NSArray<GHGherkinLineSpan *> *)tags;

/// <summary>
/// Tries parsing the line as table row and returns the trimmed cell values.
/// </summary>
/// <returns>(position,text) pairs, position is 0-based index</returns>
- (NSArray<GHGherkinLineSpan *> *)tableCells;

@end
