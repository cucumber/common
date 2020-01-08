# frozen_string_literal: true

require 'simplecov'
formatters = [SimpleCov::Formatter::HTMLFormatter]

SimpleCov.formatter = SimpleCov::Formatter::MultiFormatter.new(*formatters)
SimpleCov.add_filter 'spec/'
SimpleCov.start
