require 'cucumber/create_meta'

describe 'create_meta' do
  it 'generates a Meta message with platform information' do
    meta = Cucumber::CreateMeta.create_meta('cucumba-ruby', 'X.Y.Z', [])

    expect(meta.protocol_version).to match(/\d+\.\d+\.\d+/)
    expect(meta.implementation.name).to eq('cucumba-ruby')
    expect(meta.implementation.version).to eq('X.Y.Z')
    expect(meta.runtime.name).to match(/(jruby|ruby)/)
    expect(meta.runtime.version).to eq(RUBY_VERSION)
    expect(meta.os.name).to match(/.+/)
    expect(meta.os.version).to match(/.+/)
    expect(meta.cpu.name).to match(/.+/)
    expect(meta.ci).to be_nil
  end

  it 'generates a Meta message with CI information' do
    env = {
      'BUILD_URL' => 'url of the build',
      'BUILD_NUMBER' => '42',
      'GIT_URL' => 'url of git',
      'GIT_COMMIT' => 'git_sha1',
      'GIT_LOCAL_BRANCH' => 'main'
    }

    meta = Cucumber::CreateMeta.create_meta('cucumba-ruby', 'X.Y.Z', env)

    expect(meta.ci).not_to be_nil
    expect(meta.ci.url).to eq env['BUILD_URL']
    expect(meta.ci.build_number).to eq env['BUILD_NUMBER']
    expect(meta.ci.git.remote).to eq env['GIT_URL']
    expect(meta.ci.git.revision).to eq env['GIT_COMMIT']
    expect(meta.ci.git.branch).to eq env['GIT_LOCAL_BRANCH']
  end
end
