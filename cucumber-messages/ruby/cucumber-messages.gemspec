# -*- encoding: utf-8 -*-
Gem::Specification.new do |s|
  s.name        = 'cucumber-messages'
  s.version     = '4.0.0'
  s.authors     = ["Aslak Hellesøy"]
  s.description = "Protocol Buffer messages for Cucumber's inter-process communication"
  s.summary     = "cucumber-messages-#{s.version}"
  s.email       = 'cukes@googlegroups.com'
  s.homepage    = "https://github.com/cucumber/cucumber-messages-ruby#readme"
  s.platform    = Gem::Platform::RUBY
  s.license     = "MIT"
  s.required_ruby_version = ">= 2.3"

  s.metadata    = {
                    'bug_tracker_uri'   => 'https://github.com/cucumber/cucumber/issues',
                    'changelog_uri'     => 'https://github.com/cucumber/cucumber/blob/master/cucumber-messages/CHANGELOG.md',
                    'documentation_uri' => 'https://www.rubydoc.info/github/cucumber/cucumber-messages-ruby',
                    'mailing_list_uri'  => 'https://groups.google.com/forum/#!forum/cukes',
                    'source_code_uri'   => 'https://github.com/cucumber/cucumber/blob/master/cucumber-messages/ruby',
                  }

  # Users of JRuby should use google-protobuf 3.2.0.2 (later versions don't work)
  s.add_dependency('google-protobuf', ['>= 3.2', '<= 3.8'])
  s.add_development_dependency 'bundler', '~> 1.16', '>= 1.16.2'
  s.add_development_dependency 'rake', '~> 12.3', '>= 12.3.3'
  s.add_development_dependency 'rspec', '~> 3.8', '>= 3.8.0'

  # For coverage reports
  s.add_development_dependency 'coveralls', '~> 0.8', '>= 0.8.23'

  s.rubygems_version = ">= 1.6.1"
  s.files            = Dir[
    'README.md',
    'LICENSE',
    'lib/**/*'
  ]
  s.test_files       = Dir['spec/**/*']
  s.rdoc_options     = ["--charset=UTF-8"]
  s.require_path     = "lib"
end
