# -*- encoding: utf-8 -*-
Gem::Specification.new do |s|
  s.name        = 'cucumber-tag_expressions'
  s.version     = '1.1.1'
  s.authors     = ['Andrea Nodari', "Aslak Hellesøy"]
  s.description = 'Cucumber tag expressions for ruby'
  s.summary     = "#{s.name}-#{s.version}"
  s.email       = 'cukes@googlegroups.com'
  s.homepage    = 'https://docs.cucumber.io/tag-expressions/'
  s.platform    = Gem::Platform::RUBY
  s.license     = 'MIT'
  s.required_ruby_version = '>= 1.9.3'

  s.add_development_dependency 'bundler'
  s.add_development_dependency 'rake',      '~> 10.5'
  s.add_development_dependency 'rspec',     '~> 3.7'

  # For coverage reports
  s.add_development_dependency 'coveralls'

  s.executables      = ["cucumber-tag-expressions"]
  s.rubygems_version = '>= 1.6.1'
  s.files            = Dir[
    'README.md',
    'LICENSE',
    'lib/**/*'
  ]
  s.test_files       = Dir['spec/**/*']
  s.rdoc_options     = ['--charset=UTF-8']
  s.require_path     = 'lib'
end
