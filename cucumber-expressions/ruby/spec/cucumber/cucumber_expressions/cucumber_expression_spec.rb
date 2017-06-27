require 'cucumber/cucumber_expressions/cucumber_expression'
require 'cucumber/cucumber_expressions/parameter_type_registry'

module Cucumber
  module CucumberExpressions
    describe CucumberExpression do
      it "documents match arguments" do
        parameter_registry = ParameterTypeRegistry.new

        ### [capture-match-arguments]
        expr = "I have {int} cuke(s)"
        expression = CucumberExpression.new(expr, parameter_registry)
        args = expression.match("I have 7 cukes")
        expect(args[0].value).to eq(7)
        ### [capture-match-arguments]
      end

      it "matches word" do
        expect(match("three {word} mice", "three blind mice")).to eq(['blind'])
      end

      it('matches double quoted string') do
        expect(match('three {string} mice', 'three "blind" mice')).to eq(['blind'])
      end

      it('matches single quoted string') do
        expect(match('three {string} mice', "three 'blind' mice")).to eq(['blind'])
      end

      it('does not match misquoted string') do
        expect(match('three {string} mice', 'three "blind\' mice')).to eq(nil)
      end

      it('matches single quoted string with double quotes') do
        expect(match('three {string} mice', 'three \'"blind"\' mice')).to eq(['"blind"'])
      end

      it('matches double quoted string with single quotes') do
        expect(match('three {string} mice', 'three "\'blind\'" mice')).to eq(["'blind'"])
      end

      it('matches double quoted string with escaped double quote') do
        expect(match('three {string} mice', 'three "bl\\"nd" mice')).to eq(['bl"nd'])
      end

      it('matches single quoted string with escaped single quote') do
        expect(match('three {string} mice', "three 'bl\\'nd' mice")).to eq(["bl'nd"])
      end

      it "matches int" do
        expect(match("{int}", "22")).to eq([22])
      end

      it "doesn't match float as int" do
        expect(match("{int}", "1.22")).to be_nil
      end

      it "matches float" do
        expect(match("{float}", "0.22")).to eq([0.22])
        expect(match("{float}", ".22")).to eq([0.22])
      end

      it "throws unknown parameter type" do
        expect {match("{unknown}", "something")}.to raise_error('Undefined parameter type {unknown}')
      end

      it "exposes source" do
        expr = "I have {int} cuke(s)"
        expect(CucumberExpression.new(expr, ParameterTypeRegistry.new).source).to eq(expr)
      end

      describe "escapes special characters" do
        %w(\\ [ ] ^ $ . | ? * +).each do |character|
          it "escapes #{character}" do
            expr = "I have {int} cuke(s) and #{character}"
            expression = CucumberExpression.new(expr, ParameterTypeRegistry.new)
            arg1 = expression.match("I have 800 cukes and #{character}")[0]
            expect(arg1.value).to eq(800)
          end
        end
      end

      def match(expression, text)
        cucumber_expression = CucumberExpression.new(expression, ParameterTypeRegistry.new)
        args = cucumber_expression.match(text)
        return nil if args.nil?
        args.map {|arg| arg.value}
      end
    end
  end
end
