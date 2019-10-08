package io.cucumber.cucumberexpressions;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

final class CombinatorialGeneratedExpressionFactory {
    // 256 generated expressions ought to be enough for anybody
    private static final int MAX_EXPRESSIONS = 256;
    private final String expressionTemplate;
    private final List<List<ParameterType<?>>> parameterTypeCombinations;

    CombinatorialGeneratedExpressionFactory(
            String expressionTemplate,
            List<List<ParameterType<?>>> parameterTypeCombinations) {

        this.expressionTemplate = expressionTemplate;
        this.parameterTypeCombinations = parameterTypeCombinations;
    }

    List<GeneratedExpression> generateExpressions() {
        List<GeneratedExpression> generatedExpressions = new ArrayList<>();
        ArrayDeque<ParameterType<?>> permutation = new ArrayDeque<>(parameterTypeCombinations.size());
        generatePermutations(generatedExpressions, permutation);
        return generatedExpressions;
    }

    private void generatePermutations(
            List<GeneratedExpression> generatedExpressions,
            Deque<ParameterType<?>> permutation
    ) {
        if (generatedExpressions.size() >= MAX_EXPRESSIONS) {
            return;
        }

        if (permutation.size() == parameterTypeCombinations.size()) {
            ArrayList<ParameterType<?>> permutationCopy = new ArrayList<>(permutation);
            generatedExpressions.add(new GeneratedExpression(expressionTemplate, permutationCopy));
            return;
        }

        List<ParameterType<?>> parameterTypes = parameterTypeCombinations.get(permutation.size());
        for (ParameterType<?> parameterType : parameterTypes) {
            // Avoid recursion if no elements can be added.
            if (generatedExpressions.size() >= MAX_EXPRESSIONS) {
                return;
            }
            permutation.addLast(parameterType);
            generatePermutations(generatedExpressions, permutation);
            permutation.removeLast();
        }
    }
}
