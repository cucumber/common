require 'json'

module Cucumber
  module Messages
    module WriteNdjson
      def write_ndjson_to(io)
        json = self.class.encode_json(self)
        ob = JSON.parse(json)
        remove_empties(ob)
        io.puts(JSON.generate(ob))
      end

      def remove_empties(ob)
        if Hash === ob
          ob.each do |key, value|
            if value == []
              ob.delete(key)
            else
              remove_empties(value)
            end
          end
        elsif Array === ob
          ob.each do |value|
            remove_empties(value)
          end
        end
      end
    end
  end
end