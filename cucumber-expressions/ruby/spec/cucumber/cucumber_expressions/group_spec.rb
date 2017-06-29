require 'cucumber/cucumber_expressions/group'

module Cucumber
  module CucumberExpressions
    describe Group do
      it 'matches optional group' do
        regexp = /^Something( with an optional argument)?/
        string = 'Something'
        matches = regexp.match(string)
        group = Group.new(matches, string)

        expect(group.children[0].value).to eq(nil)
      end

      it 'matches nested groups' do
        regexp = /^A (\d+) thick line from ((\d+),\s*(\d+),\s*(\d+)) to ((\d+),\s*(\d+),\s*(\d+))?/
        string = 'A 5 thick line from 10,20,30 to 40,50,60'

        matches = regexp.match(string)
        group = Group.new(matches, string)

        expect(group.children[0].value).to eq('5')
        expect(group.children[1].value).to eq('10,20,30')
        expect(group.children[1].children[0].value).to eq('10')
        expect(group.children[1].children[1].value).to eq('20')
        expect(group.children[1].children[2].value).to eq('30')
        expect(group.children[2].value).to eq('40,50,60')
        expect(group.children[2].children[0].value).to eq('40')
        expect(group.children[2].children[1].value).to eq('50')
        expect(group.children[2].children[2].value).to eq('60')
      end
    end
  end
end