require 'cucumber/messages_pb'
require 'json'

module Cucumber
  module Messages
    describe Messages do
      it "builds a pickle doc string" do
        location = Location.new(line: 10, column: 20)
        pds = PickleDocString.new(
          location: location, 
          contentType: 'text/plain', 
          content: 'some\ncontent\n'
        )
        expect(pds.location.line).to(eq(10))
        expect(pds.location.column).to(eq(20))
        expect(pds.contentType).to(eq('text/plain'))
        expect(pds.content).to(eq('some\ncontent\n'))
      end
    end
  end
end