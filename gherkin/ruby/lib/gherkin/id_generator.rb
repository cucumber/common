require 'securerandom'

module Gherkin
  class IdGenerator
    @@use_incrementing ||= false

    def self.new_id()
      generator = @@use_incrementing ? Incrementing : UUID
      generator.new_id
    end

    def self.use_incrementing
      @@use_incrementing = true
    end
  end

  class Incrementing
    @@index ||= -1

    def self.new_id
      @@index += 1
      @@index.to_s
    end

    def self.reset
      @@index = -1
    end
  end

  class UUID
    def self.new_id
      SecureRandom.uuid
    end
  end
end