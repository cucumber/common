require 'rspec'
require 'gherkin/exe_file'

module Gherkin
  describe ExeFile do
    it 'detects macos' do
      exe_file = ExeFile.new(
        '',
        'name' => 'Mac OS X', 'arch' => 'x86_64-darwin16'
      )
      expect(exe_file.os).to eq 'darwin'
      expect(exe_file.arch).to eq 'amd64'
      expect(exe_file.ext).to be_empty
    end

    it 'generates a file name for macos' do
      exe_file = ExeFile.new(
        'gherkin-{{.OS}}-{{.Arch}}{{.Ext}}',
        'name' => 'Mac OS X', 'arch' => 'x86_64'
      )
      expect(exe_file.file_name).to eq 'gherkin-darwin-amd64'
    end

    it 'generates a file name for macos' do
      exe_file = ExeFile.new(
        'gherkin-{{.OS}}-{{.Arch}}{{.Ext}}',
        'name' => 'Windows 10', 'arch' => 'x86_32'
      )
      expect(exe_file.file_name).to eq 'gherkin-windows-386.exe'
    end
  end
end
