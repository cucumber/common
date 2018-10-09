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
