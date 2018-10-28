require 'rspec'
require 'c21e/exe_file'

module C21e
  describe ExeFile do
    [
      # os             arch           os           arch        ext
      ['darwin8.10.3', 'amd64',       'darwin',    'amd64',    ''],
      ['mingw32',      'i686',        'windows',   '386',      '.exe'],
      ['mingw32',      'x86_64',      'windows',   'amd64',    '.exe'],
      ['mingw32',      'x64',         'windows',   'amd64',    '.exe'],
    ].each do |os, arch, exe_os, exe_arch, exe_ext|
      it "generates test-#{exe_os}-#{exe_arch}#{exe_ext} for #{os} #{arch}" do
        exe_file = ExeFile.new(
          'test-{{.OS}}-{{.Arch}}{{.Ext}}',
          os: os, arch: arch
        )
        expect(exe_file.target_file).to eq "test-#{exe_os}-#{exe_arch}#{exe_ext}"
      end
    end
  end
end
