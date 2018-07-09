# encoding: utf-8
Gem::Specification.new do |s|
  s.name        = 'cucumber-formatter'
  s.version     = '1.0.0'
  s.authors     = ["Matt Wynne", "Aslak Hellesøy"]
  s.description = 'Standard cucumber formatters'
  s.summary     = "#{s.name}-#{s.version}"
  s.email       = 'cukes@googlegroups.com'
  s.homepage    = "https://github.com/cucumber/cucumber-formatter-ruby"
  s.platform    = Gem::Platform::RUBY
  s.license     = "MIT"
  s.required_ruby_version = ">= 1.9.3"

  s.add_development_dependency 'bundler'
  s.add_development_dependency 'rake',      '~> 10.5'
  s.add_development_dependency 'rspec',     '~> 3.7'

  s.rubygems_version = ">= 1.6.1"
  s.files            = Dir[
    'README.md',
    'LICENSE',
    'lib/**/*',
    'cucumber-formatter-go/**/*'
  ]
  s.test_files       = Dir['spec/**/*']
  s.rdoc_options     = ["--charset=UTF-8"]
  s.require_path     = "lib"
end
