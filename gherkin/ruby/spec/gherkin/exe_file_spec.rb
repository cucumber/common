require 'rspec'
require 'gherkin/exe_file'

module Gherkin
  describe ExeFile do
    it 'detects macos' do
      path_pattern = "#{File.dirname(__FILE__)}/../../../gherkin-go/gherkin-{{.OS}}-{{.Arch}}{{.Ext}}"
      exe_file = ExeFile.new(File.expand_path(path_pattern))
      expect(exe_file.os).to eq 'darwin'
      expect(exe_file.arch).to eq 'amd64'
      expect(exe_file.ext).to be_empty
    end
  end
end
