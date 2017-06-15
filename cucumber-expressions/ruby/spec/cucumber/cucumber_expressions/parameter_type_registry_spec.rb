require 'cucumber/cucumber_expressions/parameter_type_registry'
require 'cucumber/cucumber_expressions/parameter_type'
require 'cucumber/cucumber_expressions/errors'

module Cucumber
  module CucumberExpressions

    CAPITALISED_WORD = /[A-Z]+\w+/

    class Name
    end

    class Person
    end

    class Place
    end

    describe ParameterTypeRegistry do
      before do
        @registry = ParameterTypeRegistry.new
      end

      it 'looks up parameter type by type' do
        parameter_type = @registry.lookup_by_type(Integer)
        expect(parameter_type.transform("22")).to eq(22)
      end

      it 'does not allow more than one preferential parameter type for each regexp' do
        @registry.define_parameter_type(ParameterType.new("name", Name, CAPITALISED_WORD, true, lambda {|s| Name.new}))
        @registry.define_parameter_type(ParameterType.new("person", Person, CAPITALISED_WORD, false, lambda {|s| Person.new}))
        expect do
          @registry.define_parameter_type(ParameterType.new("place", Place, CAPITALISED_WORD, true, lambda {|s| Place.new}))
        end.to raise_error(
                   CucumberExpressionError,
                   "There can only be one preferential parameter type per regexp. The regexp /[A-Z]+\\w+/ is used for two preferential parameter types, {name} and {place}"
               )
      end

      it 'looks up preferential parameter type by regexp' do
        name = ParameterType.new("name", Name, CAPITALISED_WORD, false, lambda {|s| Name.new})
        person = ParameterType.new("person", Person, CAPITALISED_WORD, true, lambda {|s| Person.new})
        place = ParameterType.new("place", Place, CAPITALISED_WORD, false, lambda {|s| Place.new})

        @registry.define_parameter_type(name)
        @registry.define_parameter_type(person)
        @registry.define_parameter_type(place)

        expect(@registry.lookup_by_regexp(CAPITALISED_WORD.source, /([A-Z]+\w+) and ([A-Z]+\w+)/, "Lisa and Bob")).to eq(person)
      end

      it 'throws ambiguous exception when no parameter types are preferential' do
        name = ParameterType.new("name", Name, CAPITALISED_WORD, false, lambda {|s| Name.new})
        person = ParameterType.new("person", Person, CAPITALISED_WORD, false, lambda {|s| Person.new})
        place = ParameterType.new("place", Place, CAPITALISED_WORD, false, lambda {|s| Place.new})

        @registry.define_parameter_type(name)
        @registry.define_parameter_type(person)
        @registry.define_parameter_type(place)

        expect do
          expect(@registry.lookup_by_regexp(CAPITALISED_WORD.source, /([A-Z]+\w+) and ([A-Z]+\w+)/, "Lisa and Bob")).to eq(person)
        end.to raise_error(
                   CucumberExpressionError,
                   "Your Regular Expression /([A-Z]+\\w+) and ([A-Z]+\\w+)/\n" +
                       "matches multiple parameter types with regexp /[A-Z]+\\w+/:\n" +
                       "   {name}\n" +
                       "   {person}\n" +
                       "   {place}\n" +
                       "\n" +
                       "I couldn't decide which one to use. You have two options:\n" +
                       "\n" +
                       "1) Use a Cucumber Expression instead of a Regular Expression. Try one of these:\n" +
                       "   {name} and {name}\n" +
                       "   {name} and {person}\n" +
                       "   {name} and {place}\n" +
                       "   {person} and {name}\n" +
                       "   {person} and {person}\n" +
                       "   {person} and {place}\n" +
                       "   {place} and {name}\n" +
                       "   {place} and {person}\n" +
                       "   {place} and {place}\n" +
                       "\n" +
                       "2) Make one of the parameter types preferential and continue to use a Regular Expression.\n" +
                       "\n"
               )
      end
    end
  end
end

