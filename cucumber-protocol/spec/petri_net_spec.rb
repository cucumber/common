require 'petri_net'

describe PetriNet do
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
    end.to raise_error('Cannot fire yay')
  end

end