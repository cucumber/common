import 'package:gherkin/exceptions.dart';
import 'package:gherkin/language.dart';
import 'package:test/test.dart';

void main()
{
    final line = 12;
    
    test('Finds tags', () {
        var gherkinLine = GherkinLine('@this @is @a @tag', line);
        var gherkinLineSpans = gherkinLine.tags;

        expect(
            [
                GherkinLineSpan(1, '@this')
                , GherkinLineSpan(7, '@is')
                , GherkinLineSpan(11, '@a')
                , GherkinLineSpan(14, '@tag')
            ]
            , gherkinLineSpans);
    } );

    test('Throws on tags with spaces', () {
        var gherkinLine = GherkinLine('@this @is @a space separated @tag', line);
        expect(() => gherkinLine.tags
            , throwsA(const TypeMatcher<ParserException>()));
    } );

    test('Throws on tags with leading spaces', () {
        var gherkinLine = GherkinLine('@ leadingSpace', line);
        expect(() => gherkinLine.tags
            , throwsA(const TypeMatcher<ParserException>()));
    } );

    test('Ignores empty tag', () {
        var gherkinLine = GherkinLine('@', line);
        var gherkinLineSpans = gherkinLine.tags;
        expect([], gherkinLineSpans);
    } );

    test('Ignores empty tags', () {
        var gherkinLine = GherkinLine('@@', line);
        var gherkinLineSpans = gherkinLine.tags;
        expect([], gherkinLineSpans);
    } );
    
    test('Finds tags trim whitespace', () {
        var gherkinLine = GherkinLine('    @this @is  @a @tag  ', line);
        var gherkinLineSpans = gherkinLine.tags;
        expect([GherkinLineSpan(5, '@this'),
                GherkinLineSpan(11, '@is'),
                GherkinLineSpan(16, '@a'),
                GherkinLineSpan(19, '@tag')], gherkinLineSpans);
    } );

    test('Finds tags comment inside tag', () {
        var gherkinLine = GherkinLine('@this @is #acomment  ', line);
        var gherkinLineSpans = gherkinLine.tags;

        expect([GherkinLineSpan(1, '@this'), GherkinLineSpan(7, '@is')]
            , gherkinLineSpans);
    } );

    test('Finds tags commented before tag', () {
        var gherkinLine = GherkinLine('@this @is #@a commented tag', line);
        var gherkinLineSpans = gherkinLine.tags;

        expect([GherkinLineSpan(1, '@this'),GherkinLineSpan(7, '@is')]
            , gherkinLineSpans);
    } );

    test('Finds tags commented multiple tags', () {
        var gherkinLine = GherkinLine('@this @is #@a @commented @sequence of tags', line);
        var gherkinLineSpans = gherkinLine.tags;

        expect([GherkinLineSpan(1, '@this'), GherkinLineSpan(7, '@is')]
            , gherkinLineSpans);
    } );

    test('finds_table_cells', () {
        // The cells below has the following whitespace characters on each side:
        // - U+00A0 (non-breaking space)
        // - U+0020 (space)
        // - U+0009 (tab)
        // This is generated with `ruby -e 'STDOUT.write "\u00A0\u0020\u0009".encode("utf-8")' | pbcopy`
        // and pasted.
        var gherkinLine = GherkinLine('      |  \tred  \t|  \tblue  \t|  \t\uD83E\uDD52\uD83E\uDD52\uD83E\uDD52  \t|  \tgreen  \t|', line);
        var redSpan = gherkinLine.tableCells.first;
        var blueSpan = gherkinLine.tableCells.elementAt(1);
        var emojiSpan = gherkinLine.tableCells.elementAt(2);
        var greenSpan = gherkinLine.tableCells.elementAt(3);

        expect('red', redSpan.text);
        expect(11, redSpan.column);

        expect('blue', blueSpan.text);
        expect(21, blueSpan.column);

        expect('\uD83E\uDD52\uD83E\uDD52\uD83E\uDD52', emojiSpan.text);
        expect(32, emojiSpan.column);

        expect('green', greenSpan.text);
        expect(42, greenSpan.column);
    } );

    test('finds_escaped_table_cells', () {
        var gherkinLine = GherkinLine('      | \\|æ\\\\n     | \\o\\no\\  | \\\\\\|a\\\\\\\\n | ø\\\\\\nø\\\\|', line);

        var texts = gherkinLine.tableCells.map((span) => span.text)
            .toList();
        expect(['|æ\\n', '\\o\no\\', '\\|a\\\\n', 'ø\\\nø\\'], texts);
    } );

    test('preserve_escaped_new_lines_at_start_and_end', () {
        var gherkinLine = GherkinLine('      |  \nraindrops--\nher last kiss\ngoodbye.\n  |', line);
        var texts = gherkinLine.tableCells.map((span) =>span.text)
            .toList();
        expect(['\nraindrops--\nher last kiss\ngoodbye.\n'], texts);
    } );

    test('escapes_backslash', () {
        var gherkinLine = GherkinLine('|\\\\o\\no\\||', line);
        var texts = gherkinLine.tableCells.map((span) => span.text)
            .toList();
        expect(['\\o\no|'], texts);
    } );

    test('throws_on_illegal_escapes_backslash', () {
        var gherkinLine = GherkinLine('|\\o\\no\\||', line);
        var texts = gherkinLine.tableCells.map((span) => span.text)
            .toList();
        expect(['\\o\no|'], texts);
    } );
}
