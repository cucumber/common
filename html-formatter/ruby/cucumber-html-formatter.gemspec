# encoding: utf-8

version = File.read(File.expand_path("VERSION", __dir__)).strip

Gem::Specification.new do |s|
  s.name        = 'cucumber-html-formatter'
  s.version     = version
  s.authors     = ["Vincent Prêtre"]
  s.description = 'HTML formatter for Cucumber'
  s.summary     = "#{s.name}-#{s.version}"
  s.email       = 'cukes@googlegroups.com'
  s.homepage    = "https://github.com/cucumber/html-formatter-ruby"
  s.platform    = Gem::Platform::RUBY
  s.license     = "MIT"
  s.required_ruby_version = ">= 2.3"

  s.metadata    = {
                    'bug_tracker_uri'   => 'https://github.com/cucumber/cucumber/issues',
                    'changelog_uri'     => 'https://github.com/cucumber/common/blob/main/html-formatter/CHANGELOG.md',
                    'documentation_uri' => 'https://cucumber.io/docs/gherkin/',
                    'homepage_uri'      => s.homepage,
                    'mailing_list_uri'  => 'https://groups.google.com/forum/#!forum/cukes',
                    'source_code_uri'   => 'https://github.com/cucumber/common/tree/main/html-formatter/ruby'
                  }

  s.add_dependency 'cucumber-messages', '~> 17.1', '>= 17.1.0'

  s.add_development_dependency 'rake', '~> 13.0', '>= 13.0.6'
  s.add_development_dependency 'rspec', '~> 3.10', '>= 3.10.0'

  s.executables      = ['cucumber-html-formatter']
  s.rubygems_version = ">= 1.6.1", '~> 0.8'
  s.files            = Dir[
    'README.md',
    'LICENSE',
    'lib/**/*',
    'assets/*'
  ]
  s.test_files       = Dir['spec/**/*']
  s.rdoc_options     = ["--charset=UTF-8"]
  s.require_path     = "lib"
end
