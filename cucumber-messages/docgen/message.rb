# A Message object represents meta information about a message
class Message
  # Returns a Hash where each key is a message name, and the value is
  # a Message object
  def self.all(messages_hash)
    messages = {}
    messages_hash['files'].each do |file|
      file['messages'].each do |message|
        long_name = message['longName']
        messages[long_name] = message
      end
    end
    messages
  end
  
  def initialize(long_name, messages)
    @long_name = long_name
    @messages = messages
  end
  
  def example
    m = @messages[@long_name]
    raise "No such message: #{@long_name}" unless m
    e = {}
    m['fields'].each do |field|
      field_name = field['name']
      long_type = field['longType']
      repeated = field['label'] == 'repeated'
      field_examples = []
      different_type = long_type != @long_name
      if @messages[long_type] && different_type # Avoid infinite recursion for Group
        field = Message.new(long_type, @messages)
        field_examples.push(field.example)
      else
        description = field['description']
        description.split(/\n/).each do |line|
          if /^\s*Example:\s*(.*)/ =~ line
            field_examples.push(JSON.parse($1))
          end
        end
      end
      e[field_name] = repeated ? field_examples : field_examples[0]
    end
    e
  end
end