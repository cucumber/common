# -*- encoding: utf-8 -*-
Gem::Specification.new do |s|
  s.name        = 'cucumber-messages'
  s.version     = '11.0.1'
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
                    'changelog_uri'     => 'https://github.com/cucumber/cucumber/blob/master/messages/CHANGELOG.md',
                    'documentation_uri' => 'https://www.rubydoc.info/github/cucumber/messages-ruby',
                    'mailing_list_uri'  => 'https://groups.google.com/forum/#!forum/cukes',
                    'source_code_uri'   => 'https://github.com/cucumber/cucumber/blob/master/messages/ruby',
                  }

  # TODO: Switch back to 'protobuf' when these PRs are merged and released:
  # https://github.com/ruby-protobuf/protobuf/pull/411
  # https://github.com/ruby-protobuf/protobuf/pull/415
  s.add_dependency 'protobuf-cucumber', '~> 3.10', '>= 3.10.8'

  s.add_development_dependency 'rake', '~> 13.0', '>= 13.0.1'
  s.add_development_dependency 'rspec', '~> 3.9', '>= 3.9.0'

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
