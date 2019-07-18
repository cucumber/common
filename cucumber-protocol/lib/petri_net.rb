# A very simple Petri Net simulator that validates whether or
# not a sequence of transitions can be fired.
#
class PetriNet
  def self.build(&proc)
    builder = Builder.new
    builder.instance_exec(&proc)
    builder.net
  end

  def initialize(transitions)
    @transitions = transitions
  end

  def fire(transition_name)
    transition = @transitions[transition_name]
    transition.fire
  end

  class Transition
    def initialize(name, ins, outs)
      @name, @ins, @outs = name, ins, outs
    end
    
    def fire
      check
      @ins.each do |place|
        place.tokens -= 1
      end
      @outs.each do |place|
        place.tokens += 1
      end
    end

  private

    def check
      @ins.each do |place|
        if place.tokens < 1
          raise "Cannot fire #{@name}"
        end
      end
    end
  end

  class Place
    attr_accessor :tokens
    
    def initialize
      @tokens = 0
    end
  end

  class Builder
    def initialize
      @place = true
      @places = Hash.new {|h,k| h[k] = Place.new}
      @transitions = Hash.new
    end
    
    def transition(transition_name, arcs)
      ins = [arcs[:in]].flatten.map do |place_name|
        @places[place_name]
      end
      outs = [arcs[:out]].flatten.map do |place_name|
        @places[place_name]
      end

      @transitions[transition_name] = Transition.new(transition_name, ins, outs)
    end

    def token(place_name, count)
      @places[place_name].tokens = count
    end
    
    def net
      PetriNet.new(@transitions)
    end
  end
end