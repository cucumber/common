require 'pry-byebug'
require 'rspec'
require 'gherkin/magic_file'

module Gherkin
  describe MagicFile do
    it 'detects osx' do
      magic_file = MagicFile.new(
        '',
        'name' => 'darwin16', 'arch' => 'x86_64-darwin16'
      )
      expect(magic_file.os).to eq 'darwin'
      expect(magic_file.arch).to eq 'amd64'
      expect(magic_file.ext).to be_empty
    end
  end
end
