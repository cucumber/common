# frozen_string_literal: true
source "https://rubygems.org"
gemspec

local_cucumber_messages = File.dirname(__FILE__) + '/../../messages/ruby'
if File.directory?(local_cucumber_messages)
  gem 'cucumber-messages', :path => local_cucumber_messages
else
  gem 'cucumber-messages', :git => 'https://github.com/cucumber/cucumber-messages-ruby'
end
