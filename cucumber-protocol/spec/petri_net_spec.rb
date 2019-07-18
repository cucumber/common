require 'petri_net'

describe PetriNet do
  describe 'voting' do
    before do
      @pn = PetriNet.build do
        transition(:convert, in: :negative, out: :affirmative)
        transition(:dissent, in: :affirmative, out: :negative)
        transition(:yay, in: :vote, out: :affirmative)
        transition(:nay, in: :vote, out: :negative)
        token(:vote, 1)
      end
    end
    
    it "allows a transition" do
      @pn.fire(:yay)
    end

    it "does not allow a transition" do
      @pn.fire(:yay)
      expect do
        @pn.fire(:yay)
      end.to raise_error('Cannot fire: yay')
    end
  end

  describe 'cucumber protocol' do
    before do
      @pn = PetriNet.from_pnml(IO.read(File.dirname(__FILE__) + '/../src/cucumber-protocol.xml'))
    end

    it 'only allows "load stepdefs" once' do
      @pn.fire("load stepdefs".to_sym)
      expect do
        @pn.fire("load stepdefs".to_sym)
      end.to raise_error('Cannot fire: load stepdefs')
    end
    
    it 'allows execution of 5 with 2 executors' do
      @pn.fire("load pickle".to_sym)
      @pn.fire("load pickle".to_sym)
      @pn.fire("load pickle".to_sym)
      @pn.fire("load pickle".to_sym)
      @pn.fire("load pickle".to_sym)
      @pn.fire("load stepdefs".to_sym)
      @pn.fire("1 match".to_sym)
      @pn.fire("0 matches".to_sym) # TODO: Fails here. Bug in Petri Net definition!
      @pn.fire("2+ matches".to_sym)
      @pn.fire("1 match".to_sym)
      @pn.fire("1 match".to_sym)
      @pn.fire("execute".to_sym)
      @pn.fire("execute".to_sym)
      @pn.fire("no errors".to_sym)
      @pn.fire("execute".to_sym)
      @pn.fire("no errors".to_sym)
      @pn.fire("no errors".to_sym)
    end
  end
end