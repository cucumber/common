require 'cucumber/messages_pb'

module Cucumber
  module Messages
    describe Messages do
      it "builds a pickle doc string" do
        location = Location.new(line: 10, column: 20)
        pickle_doc_tring = PickleDocString.new(
          location: location, 
          contentType: 'text/plain', 
          content: 'some\ncontent\n'
        )
        expect(JSON.parse(PickleDocString.encode_json(pickle_doc_tring)))
          .to(eq(
            'location' => { 'line' => 10, 'column' => 20 },
            'contentType' => 'text/plain',
            'content' => 'some\ncontent\n' 
          ))
      end
    end
  end
end