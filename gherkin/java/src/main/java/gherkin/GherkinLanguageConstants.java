package gherkin;

import java.util.regex.Pattern;

public interface GherkinLanguageConstants {
    String TAG_PREFIX = "@";
    String COMMENT_PREFIX = "#";
    Pattern TITLE_KEYWORD_SEPARATOR = Pattern.compile(":|：");
    String TABLE_CELL_SEPARATOR = "|";
    String DOCSTRING_SEPARATOR = "\"\"\"";
    String DOCSTRING_ALTERNATIVE_SEPARATOR = "```";


}
