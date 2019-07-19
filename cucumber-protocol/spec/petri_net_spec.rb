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

    it 'does not allow pickle loading after execution starts' do
      @pn.fire("CommandStoreStepDefinition")
      @pn.fire("CommandLoadFeatureFiles")
      @pn.fire("CommandStorePickle")
      @pn.fire("CommandExecutePickles")
      @pn.fire("1 match")
      @pn.fire("execute")
      expect do
        @pn.fire("CommandStorePickle")
      end.to raise_error('Cannot fire: CommandStorePickle')
    end

    it 'does not allow step def loading after execution started' do
      @pn.fire('CommandStoreStepDefinition')
      @pn.fire('CommandStoreStepDefinition')
      @pn.fire('CommandLoadFeatureFiles')
      @pn.fire('CommandStorePickle')
      @pn.fire('CommandStorePickle')
      @pn.fire('CommandExecutePickles')

      expect { @pn.fire('CommandStoreStepDefinition') }.to raise_error('Cannot fire: CommandStoreStepDefinition')
    end
  end
end
