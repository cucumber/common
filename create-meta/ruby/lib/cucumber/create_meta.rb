require 'uri'
require 'sys/uname'
require 'json'
require 'cucumber/messages'
require 'cucumber/create_meta/variable_expression'

module Cucumber
  module CreateMeta
    extend Cucumber::CreateMeta::VariableExpression
    CI_DICT = JSON.parse(IO.read(File.join(File.dirname(__FILE__), "ciDict.json")))

    def create_meta(tool_name, tool_version, env = ENV)
      Cucumber::Messages::Meta.new(
        protocol_version: Cucumber::Messages::VERSION,
        implementation: Cucumber::Messages::Product.new(
            name: tool_name,
            version: tool_version
        ),
        runtime: Cucumber::Messages::Product.new(
            name: RUBY_ENGINE,
            version: RUBY_VERSION
        ),
        os: Cucumber::Messages::Product.new(
            name: RbConfig::CONFIG['target_os'],
            version: Sys::Uname.uname.version
        ),
        cpu: Cucumber::Messages::Product.new(
            name: RbConfig::CONFIG['target_cpu']
        ),
        ci: detect_ci(env)
      )
    end

    def detect_ci(env)
      detected = CI_DICT.map do |ci_name, ci_system|
        create_ci(ci_name, ci_system, env)
      end.compact

      detected.length == 1 ? detected[0] : nil
    end

    def create_ci(ci_name, ci_system, env)
      url = evaluate(ci_system['url'], env)
      return nil if url.nil?

      Cucumber::Messages::Ci.new(
        url: url,
        name: ci_name,
        build_number: evaluate(ci_system['buildNumber'], env),
        git: Cucumber::Messages::Git.new(
          remote: remove_userinfo_from_url(evaluate(ci_system['git']['remote'], env)),
          revision: evaluate(ci_system['git']['revision'], env),
          branch: evaluate(ci_system['git']['branch'], env),
          tag: evaluate(ci_system['git']['tag'], env),
        )
      )
    end

    def remove_userinfo_from_url(value)
      return nil if value.nil?
      begin
        uri = URI(value)
        uri.userinfo = ''
        uri.to_s
      rescue
        value
      end
    end

    module_function :create_meta, :detect_ci, :create_ci, :remove_userinfo_from_url
  end
end
