# -*- encoding: utf-8 -*-
Gem::Specification.new do |s|
  s.name        = 'cucumber-tag_expressions'
  s.version     = '1.0.0'
  s.authors     = ['Andrea Nodari']
  s.description = 'Cucumber tag expressions for ruby'
  s.summary     = "cucumber-tag_expressions-#{s.version}"
  s.email       = 'cukes@googlegroups.com'
  s.homepage    = 'https://cucumber.io/'
  s.platform    = Gem::Platform::RUBY
  s.license     = 'MIT'
  s.required_ruby_version = '>= 1.9.3'

  s.add_development_dependency 'bundler', '>= 1.12.5'
  s.add_development_dependency 'rake',    '>= 10.5.0'
  s.add_development_dependency 'rspec',   '~> 3.5'

  # For coverage reports
  s.add_development_dependency 'coveralls', '~> 0.7'

  s.rubygems_version = '>= 1.6.1'
  s.files            = `git ls-files`.split("\n").reject { |path| path =~ /\.gitignore$/ }
  s.test_files       = `git ls-files -- spec/*`.split("\n")
  s.rdoc_options     = ['--charset=UTF-8']
  s.require_path     = 'lib'
end
