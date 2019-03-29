# frozen_string_literal: true
source "https://rubygems.org"
gemspec

local_cucumber_messages = File.dirname(__FILE__) + '/../../cucumber-messages/ruby'
if File.directory?(local_cucumber_messages)
  gem 'cucumber-messages', :path => local_cucumber_messages
else
  gem 'cucumber-messages', :git => 'https://github.com/cucumber/cucumber-messages-ruby'
end

local_c21e = File.dirname(__FILE__) + '/../../c21e/ruby'
if File.directory?(local_c21e)
  gem 'c21e', :path => local_c21e
else
  gem 'c21e', :git => 'https://github.com/cucumber/c21e-ruby'
end

# Use an older protobuf on JRuby and MRI < 2.5
if ((RbConfig::CONFIG['MAJOR'].to_i == 2 && RbConfig::CONFIG['MINOR'].to_i < 5) || RUBY_PLATFORM == "java")
  gem 'google-protobuf', '~> 3.2.0.2'
end