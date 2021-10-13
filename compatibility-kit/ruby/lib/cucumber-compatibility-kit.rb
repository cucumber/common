require 'shared_examples'

module Cucumber::CompatibilityKit
  class << self
    def getExamplePath(example)
      "#{File.expand_path(File.dirname(__FILE__))}/../features/#{example}"
    end
  end
end
