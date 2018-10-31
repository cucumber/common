# encoding: utf-8
Gem::Specification.new do |s|
  s.name        = 'cucumber-formatter-dots'
  s.version     = '1.1.1'
  s.authors     = ["Matt Wynne", "Aslak Hellesøy"]
  s.description = 'Dots formatter for cucumber'
  s.summary     = "#{s.name}-#{s.version}"
  s.email       = 'cukes@googlegroups.com'
  s.homepage    = "https://github.com/cucumber/dots-formatter-ruby"
  s.platform    = Gem::Platform::RUBY
  s.license     = "MIT"
  s.required_ruby_version = ">= 1.9.3"

  s.metadata    = {
                    'bug_tracker_uri'   => 'https://github.com/cucumber/cucumber/issues',
                    'documentation_uri' => 'https://www.rubydoc.info/github/cucumber/dots-formatter-ruby',
                    'mailing_list_uri'  => 'https://groups.google.com/forum/#!forum/cukes',
                    'source_code_uri'   => 'https://github.com/cucumber/cucumber/blob/master/dots-formatter/ruby',
                  }

  s.add_dependency 'c21e', '~> 1.1.8'
  s.add_dependency 'cucumber-messages', '~> 2.0.0'

  s.add_development_dependency 'bundler'
  s.add_development_dependency 'rake',      '~> 10.5'
  s.add_development_dependency 'rspec',     '~> 3.7'

  s.rubygems_version = ">= 1.6.1"
  s.files            = Dir[
    'README.md',
    'LICENSE',
    'lib/**/*',
    'dots-formatter-go/*'
  ]
  s.test_files       = Dir['spec/**/*']
  s.rdoc_options     = ["--charset=UTF-8"]
  s.require_path     = "lib"
end
