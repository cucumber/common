# -*- encoding: utf-8 -*-

version = File.read(File.expand_path("VERSION", __dir__)).strip

Gem::Specification.new do |s|
  s.name        = 'cucumber-messages'
  s.version     = version
  s.authors     = ["Aslak Hellesøy"]
  s.description = "Protocol Buffer messages for Cucumber's inter-process communication"
  s.summary     = "cucumber-messages-#{s.version}"
  s.email       = 'cukes@googlegroups.com'
  s.homepage    = "https://github.com/cucumber/messages-ruby#readme"
  s.platform    = Gem::Platform::RUBY
  s.license     = "MIT"
  s.required_ruby_version = ">= 2.3"

  s.metadata    = {
                    'bug_tracker_uri'   => 'https://github.com/cucumber/cucumber/issues',
                    'changelog_uri'     => 'https://github.com/cucumber/common/blob/main/messages/CHANGELOG.md',
                    'documentation_uri' => 'https://www.rubydoc.info/github/cucumber/messages-ruby',
                    'mailing_list_uri'  => 'https://groups.google.com/forum/#!forum/cukes',
                    'source_code_uri'   => 'https://github.com/cucumber/common/blob/main/messages/ruby',
                  }

  s.add_development_dependency 'rake', '~> 13.0', '>= 13.0.3'
  s.add_development_dependency 'rspec', '~> 3.10', '>= 3.10.0'

  s.rubygems_version = ">= 1.6.1"
  s.files            = Dir[
    'README.md',
    'LICENSE',
    'VERSION',
    'lib/**/*'
  ]
  s.test_files       = Dir['spec/**/*']
  s.rdoc_options     = ["--charset=UTF-8"]
  s.require_path     = "lib"
end
