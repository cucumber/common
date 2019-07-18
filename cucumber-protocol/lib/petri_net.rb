# A very simple Petri Net simulator that validates whether or
# not a sequence of transitions can be fired.
#
require 'nokogiri'

class PetriNet
  def self.build(&proc)
    builder = Builder.new
    builder.instance_exec(&proc)
    builder.net
  end

  def self.from_pnml(xml)
    doc = Nokogiri::XML(xml)
    
    transitions = Hash.new {|h, k| h[k] = {in: Set.new, out: Set.new}}
    markings = Hash.new
    
    doc.xpath('//place').each do |place|
      place_name = place[:id].to_sym
      initial_marking = place.xpath('initialMarking/value/text()')[0].text.split(',')[1].to_i
      markings[place_name] = initial_marking
    end

    doc.xpath('//transition').each do |transition|
      transition_name = transition[:id].to_sym
      transitions[transition_name]
    end

    doc.xpath('//arc').each do |arc|
      source_name = arc[:source].to_sym
      target_name = arc[:target].to_sym
      
      if transitions.has_key?(source_name)
        transition_name = source_name
        place_name = target_name
        transitions[transition_name][:out] << place_name
      elsif transitions.has_key?(target_name)
        transition_name = target_name
        place_name = source_name
        transitions[transition_name][:in] << place_name
      else
        raise "Unknown transition name in one of: #{source_name} -> #{target_name}"
      end
    end
    
    self.build do
      transitions.each do |transition_name, places|
        transition(transition_name, in: places[:in].to_a, out: places[:out].to_a)
      end
      markings.each do |place_name, initial_marking|
        token(place_name, initial_marking)
      end
    end
  end

  def initialize(transitions)
    @transitions = transitions
  end

  def fire(transition_name)
    transition = @transitions[transition_name]
    raise "No such transition: #{transition_name}" unless transition
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
          raise "Cannot fire: #{@name}"
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