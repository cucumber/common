package io.cucumber.gherkin;

public class TokenFormatterBuilder implements Parser.Builder<String> {
    private final TokenFormatter formatter = new TokenFormatter();
    private final StringBuilder tokensTextBuilder = new StringBuilder();

    @Override
    public void build(Token token) {
        tokensTextBuilder.append(formatter.formatToken(token)).append("\n");
    }

    @Override
    public void startRule(Parser.RuleType ruleType) {
    }

    @Override
    public void endRule(Parser.RuleType ruleType) {
    }

    @Override
    public String getResult() {
        return tokensTextBuilder.toString();
    }

    @Override
    public void reset() {
    }
}
