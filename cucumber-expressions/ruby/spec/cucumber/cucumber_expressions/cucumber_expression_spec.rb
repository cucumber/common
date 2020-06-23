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
        expect(args[0].value(nil)).to eq(7)
        ### [capture-match-arguments]
      end

      it "matches word" do
        expect(match("three {word} mice", "three blind mice")).to eq(['blind'])
      end

      it('matches double quoted string') do
        expect(match('three {string} mice', 'three "blind" mice')).to eq(['blind'])
      end

      it('matches multiple double quoted strings') do
        expect(match('three {string} and {string} mice', 'three "blind" and "crippled" mice')).to eq(['blind', 'crippled'])
      end

      it('matches single quoted string') do
        expect(match('three {string} mice', "three 'blind' mice")).to eq(['blind'])
      end

      it('matches multiple single quoted strings') do
        expect(match('three {string} and {string} mice', "three 'blind' and 'crippled' mice")).to eq(['blind', 'crippled'])
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

      it('matches single quoted empty string as empty string') do
        expect(match('three {string} mice', "three '' mice")).to eq([''])
      end

      it('matches double quoted empty string as empty string') do
        expect(match('three {string} mice', 'three "" mice')).to eq([''])
      end

      it('matches single quoted empty string as empty string, along with other strings') do
        expect(match('three {string} and {string} mice', "three '' and 'handsome' mice")).to eq(['', 'handsome'])
      end

      it('matches double quoted empty string as empty string, along with other strings') do
        expect(match('three {string} and {string} mice', 'three "" and "handsome" mice')).to eq(['', 'handsome'])
      end

      it 'matches escaped parentheses' do
        expect(match('three \\(exceptionally) {string} mice', 'three (exceptionally) "blind" mice')).to eq(['blind'])
      end

      it "matches escaped slash" do
        expect(match("12\\/2020", "12/2020")).to eq([])
      end

      it "matches int" do
        expect(match("{int}", "22")).to eq([22])
      end

      it "doesn't match float as int" do
        expect(match("{int}", "1.22")).to be_nil
      end

      it "matches int as float" do
        expect(match("{float}", "0")).to eq([0.0])
      end

      it "matches float" do
        expect(match("{float}", "")).to eq(nil)
        expect(match("{float}", ".")).to eq(nil)
        expect(match("{float}", ",")).to eq(nil)
        expect(match("{float}", "-")).to eq(nil)
        expect(match("{float}", "E")).to eq(nil)
        expect(match("{float}", "1,")).to eq(nil)
        expect(match("{float}", ",1")).to eq(nil)
        expect(match("{float}", "1.")).to eq(nil)

        expect(match("{float}", "1")).to eq([1])
        expect(match("{float}", "-1")).to eq([-1])
        expect(match("{float}", "1.1")).to eq([1.1])
        expect(match("{float}", "1,000")).to eq(nil)
        expect(match("{float}", "1,000,0")).to eq(nil)
        expect(match("{float}", "1,000.1")).to eq(nil)
        expect(match("{float}", "1,000,10")).to eq(nil)
        expect(match("{float}", "1,0.1")).to eq(nil)
        expect(match("{float}", "1,000,000.1")).to eq(nil)
        expect(match("{float}", "-1.1")).to eq([-1.1])

        expect(match("{float}", ".1")).to eq([0.1])
        expect(match("{float}", "-.1")).to eq([-0.1])
        expect(match("{float}", "-.1000001")).to eq([-0.1000001])
        expect(match("{float}", "1E1")).to eq([10.0])
        expect(match("{float}", ".1E1")).to eq([1])
        expect(match("{float}", "E1")).to eq(nil)
        expect(match("{float}", "-.1E-1")).to eq([-0.01])
        expect(match("{float}", "-.1E-2")).to eq([-0.001])
        expect(match("{float}", "-.1E+1")).to eq([-1])
        expect(match("{float}", "-.1E+2")).to eq([-10])
        expect(match("{float}", "-.1E1")).to eq([-1])
        expect(match("{float}", "-.1E2")).to eq([-10])
      end

      it "matches anonymous" do
        expect(match("{}", "0.22")).to eq(["0.22"])
      end

      '[]()$.|?*+'.split('').each do |char|
        it "does not allow parameter type with #{char}" do
          expect {match("{#{char}string}", "something")}.to raise_error("Illegal character '#{char}' in parameter name {#{char}string}")
        end
      end

      it "throws unknown parameter type" do
        expect {match("{unknown}", "something")}.to raise_error('Undefined parameter type {unknown}')
      end

      it "does not allow optional parameter types" do
        expect {match("({int})", "3")}.to raise_error('Parameter types cannot be optional: ({int})')
      end

      it "does allow escaped optional parameter types" do
        expect(match("\\({int})", "(3)")).to eq([3])
      end

      it "does not allow text/parameter type alternation" do
        expect {match("x/{int}", "3")}.to raise_error('Parameter types cannot be alternative: x/{int}')
      end

      it "does not allow parameter type/text alternation" do
        expect {match("{int}/x", "3")}.to raise_error('Parameter types cannot be alternative: {int}/x')
      end

      it "exposes source" do
        expr = "I have {int} cuke(s)"
        expect(CucumberExpression.new(expr, ParameterTypeRegistry.new).source).to eq(expr)
      end

      it "delegates transform to custom object" do
        parameter_type_registry = ParameterTypeRegistry.new
        parameter_type_registry.define_parameter_type(
          ParameterType.new(
                  'widget',
                  /\w+/,
                  Object,
                  -> (s) {
                    self.create_widget(s)
                  },
                  false,
                  true
              )
        )
        expression = CucumberExpression.new(
          'I have a {widget}',
          parameter_type_registry
        )

        class World
          def create_widget(s)
            "widget:#{s}"
          end
        end

        args = expression.match("I have a bolt")
        expect(args[0].value(World.new)).to eq('widget:bolt')
      end

      describe "escapes special characters" do
        %w(\\ [ ] ^ $ . | ? * +).each do |character|
          it "escapes #{character}" do
            expr = "I have {int} cuke(s) and #{character}"
            expression = CucumberExpression.new(expr, ParameterTypeRegistry.new)
            arg1 = expression.match("I have 800 cukes and #{character}")[0]
            expect(arg1.value(nil)).to eq(800)
          end
        end
      end


      it "unmatched optional groups have undefined values" do
        parameter_type_registry = ParameterTypeRegistry.new
        parameter_type_registry.define_parameter_type(
            ParameterType.new(
                'textAndOrNumber',
                /([A-Z]+)?(?: )?([0-9]+)?/,
                Object,
                -> (s1, s2) {
                  [s1, s2]
                },
                false,
                true
            )
        )
        expression = CucumberExpression.new(
            '{textAndOrNumber}',
            parameter_type_registry
        )

        class World
        end

        expect(expression.match("TLA")[0].value(World.new)).to eq(["TLA", nil])
        expect(expression.match("123")[0].value(World.new)).to eq([nil, "123"])
      end

      def match(expression, text)
        cucumber_expression = CucumberExpression.new(expression, ParameterTypeRegistry.new)
        args = cucumber_expression.match(text)
        return nil if args.nil?
        args.map {|arg| arg.value(nil)}
      end
    end
  end
end
