require 'cucumber/create_meta'

describe 'clean_sensitive_information' do
  it 'leaves the data intact when no sensitive information is detected' do
    expect(Cucumber::CreateMeta.clean_sensitive_information('pretty safe')).to eq('pretty safe')
  end

  context 'with URLs' do
    it 'leaves intact when no password is found' do
      expect(Cucumber::CreateMeta.clean_sensitive_information('https://example.com/git/repo.git')).to eq('https://example.com/git/repo.git')
    end

    it 'removes credentials when found' do
      expect(Cucumber::CreateMeta.clean_sensitive_information('http://login@example.com/git/repo.git')).to eq('http://example.com/git/repo.git')
    end

    it 'removes credentials and passwords when found' do
      expect(Cucumber::CreateMeta.clean_sensitive_information('ssh://login:password@example.com/git/repo.git')).to eq('ssh://example.com/git/repo.git')
    end
  end
end