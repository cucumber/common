package io.cucumber.cucumberexpressions;

import java.util.List;
import java.util.Objects;

import static java.util.stream.Collectors.joining;

abstract class AstNode {

    static final class Expression extends AstNode {

        private final List<AstNode> nodes;

        Expression(List<AstNode> nodes) {
            this.nodes = nodes;
        }

        List<AstNode> getNodes() {
            return nodes;
        }
    }

    static final class Text extends AstNode {

        private final Token token;

        Text(Token token) {
            this.token = token;
        }

        @Override
        public String toString() {
            return getText();
        }

        String getText() {
            return token.text;
        }
    }

    static final class Optional extends AstNode {

        private final List<AstNode> optional;

        Optional(List<AstNode> optional) {
            this.optional = optional;
        }

        List<AstNode> getOptional() {
            return optional;
        }

        @Override
        public String toString() {
            return optional.stream()
                    .map(Object::toString)
                    .collect(joining());
        }
    }

    static final class Parameter extends AstNode {

        private final List<AstNode> nodes;

        Parameter(List<AstNode> nodes) {
            this.nodes = nodes;
        }

        @Override
        public String toString() {
            return getParameterName();
        }

        String getParameterName() {
            return nodes.stream()
                    .map(Text.class::cast)
                    .map(Text::getText)
                    .collect(joining());
        }
    }

    static final class Alternation extends AstNode {

        private final List<List<AstNode>> alternatives;

        Alternation(List<List<AstNode>> alternatives) {
            this.alternatives = alternatives;
        }

        List<List<AstNode>> getAlternatives() {
            return alternatives;
        }

        @Override
        public String toString() {
            return getAlternatives().stream()
                    .map(nodes -> nodes.stream()
                            .map(Objects::toString)
                            .collect(joining()))
                    .collect(joining(" - "));
        }
    }

    static final class Token extends AstNode {

        static final Token BEGIN_PARAMETER = new Token("{", Type.BEGIN_PARAMETER);
        static final Token END_PARAMETER = new Token("}", Type.END_PARAMETER);
        static final Token BEGIN_OPTIONAL = new Token("(", Type.BEGIN_OPTIONAL);
        static final Token END_OPTIONAL = new Token(")", Type.END_OPTIONAL);
        static final Token ESCAPE = new Token("\\", Type.ESCAPE);
        static final Token ALTERNATION = new Token("/", Type.ALTERNATION);

        final String text;
        final Type type;

        Token(String text, Type type) {
            this.text = text;
            this.type = type;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Token token = (Token) o;
            return text.equals(token.text) &&
                    type == token.type;
        }

        @Override
        public int hashCode() {
            return Objects.hash(text, type);
        }

        @Override
        public String toString() {
            return "Token{" +
                    "text='" + text + '\'' +
                    ", type=" + type +
                    '}';
        }

        enum Type {
            START_OF_LINE,
            END_OF_LINE,
            // In order of precedence
            WHITE_SPACE_ESCAPED,
            WHITE_SPACE,
            BEGIN_OPTIONAL_ESCAPED,
            BEGIN_OPTIONAL,
            END_OPTIONAL_ESCAPED,
            END_OPTIONAL,
            BEGIN_PARAMETER_ESCAPED,
            BEGIN_PARAMETER,
            END_PARAMETER_ESCAPED,
            END_PARAMETER,
            ALTERNATION_ESCAPED,
            ALTERNATION,
            ESCAPE_ESCAPED,
            ESCAPE,
            TEXT;
        }
    }
}
