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

    it 'does not allow PickleStep after Execute' do
      @pn.fire("Start")
      @pn.fire("GlueCode")
      @pn.fire("PickleStep")
      @pn.fire("PickleStep")
      @pn.fire("Execute")
      expect do
        @pn.fire("PickleStep")
      end.to raise_error('Cannot fire: PickleStep')
    end

    it 'does not allow GlueCode twice' do
      @pn.fire("Start")
      @pn.fire("GlueCode")

      expect do 
        @pn.fire('GlueCode')
      end.to raise_error('Cannot fire: GlueCode')
    end
  end
end
