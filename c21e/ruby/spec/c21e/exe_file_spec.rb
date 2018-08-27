require 'rspec'
require 'c21e/exe_file'

module C21e
  describe ExeFile do
    it 'detects macos' do
      exe_file = ExeFile.new(
        '',
        os: 'darwin8.10.3', arch: 'amd64'
      )
      expect(exe_file.os).to eq 'darwin'
      expect(exe_file.arch).to eq 'amd64'
      expect(exe_file.ext).to be_empty
    end

    it 'generates a file name for macos' do
      exe_file = ExeFile.new(
        'test-{{.OS}}-{{.Arch}}{{.Ext}}',
        os: 'darwin8.10.3', arch: 'amd64'
      )
      expect(exe_file.target_file).to eq 'test-darwin-amd64'
    end

    it 'generates a file name for windows' do
      exe_file = ExeFile.new(
        'test-{{.OS}}-{{.Arch}}{{.Ext}}',
        os: 'mingw32', arch: 'i686'
      )
      expect(exe_file.target_file).to eq 'test-windows-386.exe'
    end
  end
end
