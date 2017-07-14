require 'cucumber/cucumber_expressions/tree_regexp'

module Cucumber
  module CucumberExpressions
    describe TreeRegexp do
      it 'builds tree' do
        tr = TreeRegexp.new(/(a(?:b)?)(c)/)
        group = tr.match('ac')
        expect(group.value).to eq('ac')
        expect(group.children[0].value).to eq('a')
        expect(group.children[0].children).to eq([])
        expect(group.children[1].value).to eq('c')
      end

      it 'ignores non-capturing groups' do
        tr = TreeRegexp.new(/(a(?:b)?)(c)/)
        group = tr.match('ac')
        expect(group.value).to eq('ac')
        expect(group.children[0].value).to eq('a')
        expect(group.children[0].children).to eq([])
        expect(group.children[1].value).to eq('c')
      end

      it 'matches optional group' do
        tr = TreeRegexp.new(/^Something( with an optional argument)?/)
        group = tr.match('Something')
        expect(group.children[0].value).to eq(nil)
      end

      it 'matches nested groups' do
        tr = TreeRegexp.new(/^A (\d+) thick line from ((\d+),\s*(\d+),\s*(\d+)) to ((\d+),\s*(\d+),\s*(\d+))/)
        group = tr.match('A 5 thick line from 10,20,30 to 40,50,60')

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

      it 'detects multiple non capturing groups' do
        tr = TreeRegexp.new(/(?:a)(:b)(\?c)(d)/)
        group = tr.match("a:b?cd")
        expect(group.children.length).to eq(3)
      end

      it 'captures non capturing groups with capturing groups inside' do
        tr = TreeRegexp.new("the stdout(?: from \"(.*?)\")?")
        group = tr.match("the stdout")
        expect(group.value).to eq("the stdout")
        expect(group.children[0].value).to eq(nil)
        expect(group.children.length).to eq(1)
      end
    end
  end
end