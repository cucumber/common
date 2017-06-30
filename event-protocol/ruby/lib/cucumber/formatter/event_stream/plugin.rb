require 'socket'

module Cucumber
  module Formatter
    module EventStream

      class Plugin
        def initialize(config, options)
          io = config.out_stream

          EventEmitter.new(config).call do |event|
            io.puts event.to_json
          end
        end
      end

      class EventEmitter
        attr_reader :config

        def initialize(config)
          @config = config
          @working_dir = Pathname.new(Dir.pwd)
        end

        def call
          current_test_case = nil

          config.on_event :gherkin_source_read, -> (event) {
            yield \
            type: "source",
            uri: uri(event.path),
            data: event.body,
            media: {
              encoding: 'utf-8',
              type: 'text/vnd.cucumber.gherkin+plain'
            }
          }

          config.on_event :test_run_starting, -> (event) {
            yield \
            type: "test-run-started",
            workingDirectory: working_dir,
            timestamp: Time.now.to_i

            event.test_cases.each { |test_case|
              yield \
                type: "test-case-prepared",
                sourceLocation: location_to_json(test_case.location),
                steps: test_case.test_steps.map { |test_step|
                  test_step_to_json(test_case, test_step)
                }
            }
          }

          config.on_event :test_case_starting, -> (event) {
            current_test_case = event.test_case # TODO: add this to the core step events so we don't have to cache it here
            yield \
              type: "test-case-started",
              sourceLocation: location_to_json(event.test_case.location)
          }

          config.on_event :test_step_starting, -> (event) {
            yield \
            type: "test-step-started",
            testCase: { sourceLocation: location_to_json(current_test_case.location) },
            index: current_test_case.test_steps.index(event.test_step)
          }

          config.on_event :test_step_finished, -> (event) {
            yield \
            type: "test-step-finished",
            testCase: { sourceLocation: location_to_json(current_test_case.location) },
            index: current_test_case.test_steps.index(event.test_step),
            result: result_to_json(event.result)
          }

          config.on_event :test_case_finished, -> (event) {
            yield \
            type: "test-case-finished",
            sourceLocation: location_to_json(event.test_case.location),
            result: result_to_json(event.result)
          }

        end

        private

        attr_reader :working_dir

        def result_to_json(result)
          data = { status: result.to_sym.to_s }
          result.duration.tap do |duration|
            data["duration"] = duration.nanoseconds
          end
          if result.respond_to?(:exception)
            data[:exception] = {
              message: result.exception.message,
              type: result.exception.class,
              stackTrace: result.exception.backtrace || []
            }
          end
          data
        end

        def test_step_to_json(test_case, test_step)
          result = {}
          unless undefined?(test_step)
            result['actionLocation'] = location_to_json(test_step.action_location)
          end
          unless hook?(test_step)
            result['sourceLocation'] = location_to_json(test_step.source.last.location)
          end
          result
        end

        def undefined?(test_step)
          test_step.action_location.file.match(/\.feature$/)
        end

        def hook?(test_step)
          test_step.action_location.file.match(/\.rb$/) && 
          test_step.source.last.location == test_step.action_location
        end

        def location_to_json(location)
          {
            uri: uri(location.file),
            line: location.line
          }
        end

        def uri(path)
          Pathname.new(File.expand_path(path)).relative_path_from(working_dir)
        end
      end
    end
  end

end
