package io.cucumber.cucumberexpressions;

import java.util.List;
import java.util.Objects;
import java.util.StringJoiner;

import static java.util.Arrays.asList;
import static java.util.Objects.requireNonNull;
import static java.util.stream.Collectors.joining;

final class Ast {

    static final class AstNode {

        private final Type type;
        private final List<AstNode> nodes;
        private final String token;
        private final int startIndex;
        private final int endIndex;

        AstNode(Type type, int startIndex, int endIndex, String token) {
            this(type, startIndex, endIndex, null, token);
        }

        AstNode(Type type, int startIndex, int endIndex, AstNode... nodes) {
            this(type, startIndex, endIndex, asList(nodes));
        }

        AstNode(Type type, int startIndex, int endIndex, List<AstNode> nodes) {
            this(type, startIndex, endIndex, nodes, null);
        }

        private AstNode(Type type, int startIndex, int endIndex, List<AstNode> nodes, String token) {
            this.type = requireNonNull(type);
            this.nodes = nodes;
            this.token = token;
            this.startIndex = startIndex;
            this.endIndex = endIndex;

        }

        enum Type {
            TEXT_NODE,
            OPTIONAL_NODE,
            ALTERNATION_NODE,
            ALTERNATIVE_NODE,
            PARAMETER_NODE,
            EXPRESSION_NODE
        }

        int start(){
            return startIndex;
        }
        int end(){
            return endIndex;
        }

        List<AstNode> nodes() {
            return nodes;
        }

        boolean isLeaf() {
            return nodes == null;
        }

        Type type() {
            return type;
        }

        String text() {
            if (isLeaf())
                return token;

            return nodes().stream()
                    .map(AstNode::text)
                    .collect(joining());
        }

        @Override
        public String toString() {
            return toString(0).toString();
        }

        private StringBuilder toString(int depth) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < depth; i++) {
                sb.append("\t");
            }
            sb.append("AstNode{").append(startIndex).append(":").append(endIndex).append(", type=").append(type);

            if (token != null) {
                sb.append(", token=").append(token);
            }

            if (nodes != null) {
                sb.append("\n");
                for (AstNode node : nodes) {
                    sb.append(node.toString(depth + 1));
                    sb.append("\n");
                }
                for (int i = 0; i < depth; i++) {
                    sb.append("\t");
                }
            }

            sb.append('}');
            return sb;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o)
                return true;
            if (o == null || getClass() != o.getClass())
                return false;
            AstNode astNode = (AstNode) o;
            return startIndex == astNode.startIndex &&
                    endIndex == astNode.endIndex &&
                    type == astNode.type &&
                    Objects.equals(nodes, astNode.nodes) &&
                    Objects.equals(token, astNode.token);
        }

        @Override
        public int hashCode() {
            return Objects.hash(type, nodes, token, startIndex, endIndex);
        }

    }

    static final class Token {

        final int startIndex;
        final int endIndex;
        final String text;
        final Token.Type type;

        Token(String text, Token.Type type, int startIndex, int endIndex) {
            this.text = requireNonNull(text);
            this.type = requireNonNull(type);
            this.startIndex = startIndex;
            this.endIndex = endIndex;
        }

        int start(){
            return startIndex;
        }
        int end(){
            return endIndex;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o)
                return true;
            if (o == null || getClass() != o.getClass())
                return false;
            Token token = (Token) o;
            return startIndex == token.startIndex &&
                    endIndex == token.endIndex &&
                    text.equals(token.text) &&
                    type == token.type;
        }

        @Override
        public int hashCode() {
            return Objects.hash(startIndex, endIndex, text, type);
        }

        @Override
        public String toString() {
            return new StringJoiner(", ", Token.class.getSimpleName() + "[", "]")
                    .add("startIndex=" + startIndex)
                    .add("endIndex=" + endIndex)
                    .add("text='" + text + "'")
                    .add("type=" + type)
                    .toString();
        }

        enum Type {
            START_OF_LINE,
            END_OF_LINE,
            WHITE_SPACE,
            BEGIN_OPTIONAL("(", "optional text"),
            END_OPTIONAL(")", "optional text"),
            BEGIN_PARAMETER("{", "a parameter"),
            END_PARAMETER("}", "a parameter"),
            ALTERNATION("/", "alternation"),
            TEXT;

            private final String symbol;
            private final String purpose;

            Type() {
                this(null, null);
            }

            Type(String symbol, String purpose) {
                this.symbol = symbol;
                this.purpose = purpose;
            }

            String purpose() {
                return requireNonNull(purpose, name() + " does not have a purpose");
            }

            String symbol() {
                return requireNonNull(symbol, name() + " does not have a symbol");
            }
        }

    }

}
