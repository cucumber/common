# encoding: utf-8
require 'rubygems'
require 'bundler'
Bundler::GemHelper.install_tasks

$LOAD_PATH.unshift File.expand_path('../lib', __FILE__)

require 'rspec/core/rake_task'
RSpec::Core::RakeTask.new(:spec) do |t|
  t.ruby_opts = %w(-r./spec/coverage -w)
end

task default: ['spec']
