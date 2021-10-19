module CCK
  class KeysChecker
    def self.compare(found, expected)
      KeysChecker.new.compare(found, expected)
    end

    def compare(found, expected)
      errors = []

      found_keys = found.to_h(reject_nil_values: true).keys
      expected_keys = expected.to_h(reject_nil_values: true).keys

      return errors if found_keys.sort == expected_keys.sort

      missing_keys = (expected_keys - found_keys)

      extra_keys = (found_keys - expected_keys).reject { |key|
        ENV['CI'] && found.class == Cucumber::Messages::Meta && key == :ci
      }

      errors << "Found extra keys in message #{found.class.name}: #{extra_keys}" unless extra_keys.empty?
      errors << "Missing keys in message #{found.class.name}: #{missing_keys}" unless missing_keys.empty?
      errors
    rescue StandardError => e
      ["Unexpected error: #{e.message}"]
    end
  end
end
