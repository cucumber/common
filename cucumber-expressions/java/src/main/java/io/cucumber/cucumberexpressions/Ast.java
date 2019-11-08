package io.cucumber.cucumberexpressions;

import java.util.List;
import java.util.Objects;

import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.ALTERNATIVE_NODE;
import static io.cucumber.cucumberexpressions.Ast.Token.ALTERNATION;
import static java.util.Arrays.asList;

final class Ast {
    // Marker. This way we don't need to model the
    // the tail end of alternation in the AST:
    //
    // alternation := alternative* + ( '/' + alternative* )+
    static final AstNode ALTERNATIVE_SEPARATOR = new AstNode(ALTERNATIVE_NODE, ALTERNATION);

    static final class AstNode {

        private final Type type;
        private final List<AstNode> nodes;
        private final Token token;

        AstNode(Type type, Token token) {
            this(type, null, token);
        }

        AstNode(Type type, AstNode... nodes) {
            this(type, asList(nodes));
        }

        AstNode(Type type, List<AstNode> nodes) {
            this(type, nodes, null);
        }

        private AstNode(Type type, List<AstNode> nodes, Token token) {
            this.type = type;
            this.nodes = nodes;
            this.token = token;
        }


        enum Type {
            TEXT_NODE,
            OPTIONAL_NODE,
            ALTERNATION_NODE,
            ALTERNATIVE_NODE,
            PARAMETER_NODE,
            EXPRESSION_NODE
        }

        List<AstNode> getNodes() {
            return nodes;
        }

        Type getType() {
            return type;
        }

        String getText() {
            return token.text;
        }

        @Override
        public String toString() {
            return "AstNode{" +
                    "type=" + type +
                    ", nodes=" + nodes +
                    ", token=" + token +
                    '}';
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            AstNode astNode = (AstNode) o;
            return type == astNode.type &&
                    Objects.equals(nodes, astNode.nodes) &&
                    Objects.equals(token, astNode.token);
        }

        @Override
        public int hashCode() {
            return Objects.hash(type, nodes, token);
        }
    }


    static final class Token {

        static final Token BEGIN_PARAMETER = new Token("{", Token.Type.BEGIN_PARAMETER);
        static final Token END_PARAMETER = new Token("}", Token.Type.END_PARAMETER);
        static final Token BEGIN_OPTIONAL = new Token("(", Token.Type.BEGIN_OPTIONAL);
        static final Token END_OPTIONAL = new Token(")", Token.Type.END_OPTIONAL);
        static final Token ESCAPE = new Token("\\", Token.Type.ESCAPE);
        static final Token ALTERNATION = new Token("/", Token.Type.ALTERNATION);

        final String text;
        final Token.Type type;

        Token(String text, Token.Type type) {
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
