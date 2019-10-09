package gherkin;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static gherkin.Parser.RuleType;
import static gherkin.Parser.TokenType;

public class AstNode {
    private final Map<RuleType, List<Object>> subItems = new HashMap<RuleType, List<Object>>();
    public final RuleType ruleType;

    public AstNode(RuleType ruleType) {
        this.ruleType = ruleType;
    }

    public void add(RuleType ruleType, Object obj) {
        List<Object> items = subItems.get(ruleType);
        if (items == null) {
            items = new ArrayList<Object>();
            subItems.put(ruleType, items);
        }
        items.add(obj);
    }

    public <T> T getSingle(RuleType ruleType, T defaultResult) {
        List<Object> items = getItems(ruleType);
        return (T) (items.isEmpty() ? defaultResult : items.get(0));
    }

    public <T> List<T> getItems(RuleType ruleType) {
        List<T> items = (List<T>) subItems.get(ruleType);
        if (items == null) {
            return Collections.emptyList();
        }
        return items;
    }

    public Token getToken(TokenType tokenType) {
        RuleType ruleType = RuleType.cast(tokenType);
        return getSingle(ruleType, new Token(null, null));
    }

    public List<Token> getTokens(TokenType tokenType) {
        return getItems(RuleType.cast(tokenType));
    }
}
