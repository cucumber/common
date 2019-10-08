# frozen_string_literal: true
source "https://rubygems.org"

gem 'cucumber-messages', :path => File.dirname(__FILE__) + '/../../cucumber-messages/ruby'

# Use an older protobuf on JRuby and MRI < 2.5
if ((RbConfig::CONFIG['MAJOR'].to_i == 2 && RbConfig::CONFIG['MINOR'].to_i < 5) || RUBY_PLATFORM == "java")
  gem 'google-protobuf', '~> 3.2.0.2'
end

gemspec
