package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.List;

class CombinatorialGeneratedExpressionFactory {
    private final String expressionTemplate;
    private final List<List<ParameterType<?, ?>>> parameterTypeCombinations;

    CombinatorialGeneratedExpressionFactory(
            String expressionTemplate,
            List<List<ParameterType<?, ?>>> parameterTypeCombinations) {

        this.expressionTemplate = expressionTemplate;
        this.parameterTypeCombinations = parameterTypeCombinations;
    }

    List<GeneratedExpression> generateExpressions() {
        List<GeneratedExpression> generatedExpressions = new ArrayList<>();
        generatePermutations(generatedExpressions, 0, new ArrayList<ParameterType<?, ?>>());
        return generatedExpressions;
    }

    private void generatePermutations(
            List<GeneratedExpression> generatedExpressions,
            int depth,
            List<ParameterType<?, ?>> currentParameterTypes
    ) {
        if (depth == parameterTypeCombinations.size()) {
            generatedExpressions.add(new GeneratedExpression(expressionTemplate, currentParameterTypes));
            return;
        }

        for (int i = 0; i < parameterTypeCombinations.get(depth).size(); ++i) {
            List<ParameterType<?, ?>> newCurrentParameterTypes = new ArrayList<>(currentParameterTypes); // clone
            newCurrentParameterTypes.add(parameterTypeCombinations.get(depth).get(i));

            generatePermutations(
                    generatedExpressions,
                    depth + 1,
                    newCurrentParameterTypes
            );
        }
    }
}
