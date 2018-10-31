# encoding: utf-8
Gem::Specification.new do |s|
  s.name        = 'gherkin'
  s.version     = '6.0.15'
  s.authors     = ["Gáspár Nagy", "Aslak Hellesøy", "Steve Tooke"]
  s.description = 'Gherkin parser'
  s.summary     = "#{s.name}-#{s.version}"
  s.email       = 'cukes@googlegroups.com'
  s.homepage    = "https://github.com/cucumber/gherkin-ruby"
  s.platform    = Gem::Platform::RUBY
  s.license     = "MIT"
  s.required_ruby_version = ">= 1.9.3"

  s.metadata    = {
                    'bug_tracker_uri'   => 'https://github.com/cucumber/cucumber/issues',
                    'changelog_uri'     => 'https://github.com/cucumber/cucumber/blob/master/gherkin/CHANGELOG.md',
                    'documentation_uri' => 'https://docs.cucumber.io/gherkin/',
                    'mailing_list_uri'  => 'https://groups.google.com/forum/#!forum/cukes',
                    'source_code_uri'   => 'https://github.com/cucumber/cucumber/blob/master/gherkin/ruby',
                  }

  s.add_dependency 'c21e', '~> 1.1.8'
  s.add_dependency 'cucumber-messages', '~> 2.0.0'

  s.add_development_dependency 'bundler', '~> 1.16'
  s.add_development_dependency 'rake',  '~> 10.5'
  s.add_development_dependency 'rspec', '~> 3.7'

  # For coverage reports
  s.add_development_dependency 'coveralls'

  s.executables      = ["gherkin-ruby", "gherkin"]
  s.rubygems_version = ">= 1.6.1", '~> 0.8'
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
