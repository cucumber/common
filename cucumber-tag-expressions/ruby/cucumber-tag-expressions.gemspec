# -*- encoding: utf-8 -*-
Gem::Specification.new do |s|
  s.name        = 'cucumber-tag-expressions'
  s.version     = '2.0.3'
  s.authors     = ['Andrea Nodari', "Aslak Hellesøy"]
  s.description = 'Cucumber tag expressions for ruby'
  s.summary     = "#{s.name}-#{s.version}"
  s.email       = 'cukes@googlegroups.com'
  s.homepage    = 'https://cucumber.io/docs/cucumber/api/#tag-expressions'
  s.platform    = Gem::Platform::RUBY
  s.license     = 'MIT'
  s.required_ruby_version = '>= 1.9.3'

  s.metadata    = {
                    'bug_tracker_uri'   => 'https://github.com/cucumber/cucumber/issues',
                    'changelog_uri'     => 'https://github.com/cucumber/cucumber/blob/master/tag-expressions/CHANGELOG.md',
                    'documentation_uri' => 'https://cucumber.io/docs/cucumber/api/#tag-expressions',
                    'mailing_list_uri'  => 'https://groups.google.com/forum/#!forum/cukes',
                    'source_code_uri'   => 'https://github.com/cucumber/cucumber/blob/master/tag-expressions/ruby',
                  }

  s.add_development_dependency 'rake', '~> 13.0', '>= 13.0.1'
  s.add_development_dependency 'rspec', '~> 3.9', '>= 3.9.0'

  # For coverage reports
  s.add_development_dependency 'coveralls', '~> 0.8', '>= 0.8.23'

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
