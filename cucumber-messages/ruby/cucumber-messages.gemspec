# -*- encoding: utf-8 -*-
Gem::Specification.new do |s|
  s.name        = 'cucumber-messages'
  s.version     = '2.1.1'
  s.authors     = ["Aslak Hellesøy"]
  s.description = "Protocol Buffer messages for Cucumber's inter-process communication"
  s.summary     = "cucumber-messages-#{s.version}"
  s.email       = 'cukes@googlegroups.com'
  s.homepage    = "https://github.com/cucumber/cucumber-messages-ruby#readme"
  s.platform    = Gem::Platform::RUBY
  s.license     = "MIT"
  s.required_ruby_version = ">= 1.9.3"

  s.metadata    = {
                    'bug_tracker_uri'   => 'https://github.com/cucumber/cucumber/issues',
                    'changelog_uri'     => 'https://github.com/cucumber/cucumber/blob/master/cucumber-messages/CHANGELOG.md',
                    'documentation_uri' => 'https://www.rubydoc.info/github/cucumber/cucumber-messages-ruby',
                    'mailing_list_uri'  => 'https://groups.google.com/forum/#!forum/cukes',
                    'source_code_uri'   => 'https://github.com/cucumber/cucumber/blob/master/cucumber-messages/ruby',
                  }

  # As of this writing (28 June 2018), the latest version is
  # 3.6.0, which doesn't works with JRuby. 
  # See https://github.com/google/protobuf/issues/1594 
  # 3.1.0 works with JRuby, but fails with MRI 2.4.4 and above.
  #
  # There doesn't seem to be a version that works with all rubies,
  # so we're specifying a loose dependency here on purpose so end users can
  # pick the appropriate one in their bundle.
  #
  # Users of JRuby would probably install 3.2.0, while users of MRI would use
  # 3.6.0.
  s.add_dependency 'google-protobuf', '~> 3.2'

  s.add_development_dependency 'bundler'
  s.add_development_dependency 'rake',      '~> 12.3'
  s.add_development_dependency 'rspec',     '~> 3.7'

  # For coverage reports
  s.add_development_dependency 'coveralls'

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
