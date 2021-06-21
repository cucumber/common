package io.cucumber.gherkin;

public class TokensGenerator
{
	public static String generateTokens(String featureContent
		, Parser.ITokenMatcher tokenMatcher)
	{
		TokenFormatterBuilder tokenFormatterBuilder = new TokenFormatterBuilder();
		Parser<String> parser = new Parser<>(tokenFormatterBuilder);
		return parser.parse(featureContent, tokenMatcher);
	}
}
