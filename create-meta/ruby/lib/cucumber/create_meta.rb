require 'cucumber/messages'
require 'sys/uname'

module Cucumber
  def create_meta(toolName, toolVersion)
    Cucumber::Messages::Meta.new(
      protocol_version: Cucumber::Messages::VERSION,
      implementation: Cucumber::Messages::Meta::Product.new(
        name: toolName,
        version: toolVersion
      ),
      runtime: Cucumber::Messages::Meta::Product.new(
        name: RUBY_ENGINE,
        version: RUBY_VERSION
      ),
      os: Cucumber::Messages::Meta::Product.new(
        name: RbConfig::CONFIG['target_os'],
        version: Sys::Uname.uname.version
      ),
      cpu: Cucumber::Messages::Meta::Product.new(
        name: RbConfig::CONFIG['target_cpu']
      )
    )
  end

  module_function :create_meta
end
