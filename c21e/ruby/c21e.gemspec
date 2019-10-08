# -*- encoding: utf-8 -*-
Gem::Specification.new do |s|
  s.name        = 'c21e'
  s.version     = '2.0.0'
  s.authors     = ["Aslak Hellesøy"]
  s.description = 'Run cross-platform executables'
  s.summary     = "#{s.name}-#{s.version}"
  s.email       = 'cukes@googlegroups.com'
  s.homepage    = "https://github.com/cucumber/cucumber-expressions-ruby#readme"
  s.platform    = Gem::Platform::RUBY
  s.license     = "MIT"
  s.required_ruby_version = ">= 2.3"

  s.metadata    = {
                    'bug_tracker_uri'   => 'https://github.com/cucumber/cucumber/issues',
                    'documentation_uri' => 'https://www.rubydoc.info/github/cucumber/c21e-ruby',
                    'mailing_list_uri'  => 'https://groups.google.com/forum/#!forum/cukes',
                    'source_code_uri'   => 'https://github.com/cucumber/cucumber/blob/master/c21e/ruby',
                  }

  s.add_development_dependency 'rake', '~> 13.0', '>= 13.0.0'
  s.add_development_dependency 'rspec', '~> 3.8', '>= 3.8.0'

  # For coverage reports
  s.add_development_dependency 'coveralls', '~> 0.8', '>= 0.8.23'

  s.rubygems_version = ">= 1.6.1"
  s.files            = Dir[
    'README.md',
    'LICENSE',
    'lib/**/*',
  ]
  s.test_files       = Dir['spec/**/*']
  s.rdoc_options     = ["--charset=UTF-8"]
  s.require_path     = "lib"
end
