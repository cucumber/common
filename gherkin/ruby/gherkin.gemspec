# encoding: utf-8
Gem::Specification.new do |s|
  s.name        = 'gherkin'
  s.version     = '5.1.0'
  s.authors     = ["Gáspár Nagy", "Aslak Hellesøy", "Steve Tooke"]
  s.description = 'Gherkin parser'
  s.summary     = "#{s.name}-#{s.version}"
  s.email       = 'cukes@googlegroups.com'
  s.homepage    = "https://github.com/cucumber/gherkin-ruby"
  s.platform    = Gem::Platform::RUBY
  s.license     = "MIT"
  s.required_ruby_version = ">= 1.9.3"

  # TODO: Add this dependency before making a release
  # s.add_dependency 'cucumber-messages', SOME_VERSION

  s.add_development_dependency 'bundler'
  s.add_development_dependency 'os',    '~> 1.0'
  s.add_development_dependency 'rake',  '~> 10.5'
  s.add_development_dependency 'rspec', '~> 3.7'

  # For coverage reports
  s.add_development_dependency 'coveralls'

  s.executables      = ["gherkin-ruby", "gherkin"]
  s.rubygems_version = ">= 1.6.1"
  s.files            = Dir[
    'README.md',
    'LICENSE',
    'lib/**/*',
    'gherkin-go/*'
  ]
  s.test_files       = Dir['spec/**/*']
  s.rdoc_options     = ["--charset=UTF-8"]
  s.require_path     = "lib"
end
