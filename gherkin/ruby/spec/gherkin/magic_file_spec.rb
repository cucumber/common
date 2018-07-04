require 'rspec'
require 'gherkin/magic_file'

module Gherkin
  describe MagicFile do
    it 'detects osx' do
      magic_file = MagicFile.new(
        '',
        'name' => 'Mac OS X', 'arch' => 'x86_64-darwin16'
      )
      expect(magic_file.os).to eq 'darwin'
      expect(magic_file.arch).to eq 'amd64'
      expect(magic_file.ext).to be_empty
    end

    it 'generates a file name for macos' do
      magic_file = MagicFile.new(
        'gherkin-{{.OS}}-{{.Arch}}{{.Ext}}',
        'name' => 'Mac OS X', 'arch' => 'x86_64'
      )
      expect(magic_file.file_name).to eq 'gherkin-darwin-amd64'
    end

    it 'generates a file name for macos' do
      magic_file = MagicFile.new(
        'gherkin-{{.OS}}-{{.Arch}}{{.Ext}}',
        'name' => 'Windows 10', 'arch' => 'x86_32'
      )
      expect(magic_file.file_name).to eq 'gherkin-windows-386.exe'
    end

    it 'extracts the file from the file system' do
      skip()
    end
  end
end
