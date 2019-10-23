require 'rspec'
require 'gherkin/gherkin_line'

describe Gherkin::GherkinLine do
  context '#table_cell' do
    def cells_text(line)
      Gherkin::GherkinLine.new(line, 12).table_cells.map(&:text)
    end

    it 'correctly trims cells content' do
      expect(cells_text("|spaces after   |")).to eq(['spaces after'])
      expect(cells_text("|   \t spaces before|")).to eq(['spaces before'])
      expect(cells_text("|   \t spaces everywhere   \t|")).to eq(['spaces everywhere'])
    end

    it 'does not drop white spaces inside a cell' do
      expect(cells_text("| foo()\n  bar\nbaz |")).to eq(["foo()\n  bar\nbaz"])
    end
  end
end