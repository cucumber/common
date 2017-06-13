package gherkin;

import java.util.regex.Pattern;

public interface GherkinLanguageConstants {
    String TAG_PREFIX = "@";
    String COMMENT_PREFIX = "#";
    String TITLE_KEYWORD_SEPARATOR = ":";
    Pattern TITLE_KEYWORD_SEPARATOR2 = Pattern.compile(":|：");
    String TABLE_CELL_SEPARATOR = "|";
    String DOCSTRING_SEPARATOR = "\"\"\"";
    String DOCSTRING_ALTERNATIVE_SEPARATOR = "```";


}
