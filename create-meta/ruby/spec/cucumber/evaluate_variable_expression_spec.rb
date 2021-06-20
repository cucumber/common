require 'cucumber/create_meta'

describe 'Cucumber::CreateMeta::VariableExpression.evaluate' do
  include Cucumber::CreateMeta::VariableExpression

  it 'returns nil when a variable is undefined' do
    expression = "hello-${SOME_VAR}";
    result = evaluate(expression, {});
    expect(result).to eq(nil)
  end

  it 'gets a value without replacement' do
    expression = "${SOME_VAR}";
    result = evaluate(expression, {'SOME_VAR' => 'some_value'});
    expect(result).to eq('some_value')
  end

  it 'captures a group' do
    expression = "${SOME_REF/refs\/heads\/(.*)/\\1}";
    result = evaluate(expression, {'SOME_REF' => 'refs/heads/main'});
    expect(result).to eq('main')
  end

  it 'works with star wildcard in var' do
    expression = "${GO_SCM_*_PR_BRANCH/.*:(.*)/\\1}";
    result = evaluate(expression, {'GO_SCM_MY_MATERIAL_PR_BRANCH' => 'ashwankthkumar:feature-1'});
    expect(result).to eq('feature-1')
  end

  it 'evaluates a complex expression' do
    expression = "hello-${VAR1}-${VAR2/(.*) (.*)/\\2-\\1}-world";
    result = evaluate(expression, {
      'VAR1' => 'amazing',
      'VAR2' => 'gorgeous beautiful'
    })
    expect(result).to eq('hello-amazing-beautiful-gorgeous-world')
  end
end
