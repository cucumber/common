class String
  # colorization
  def colorize(color_code)
    "\e[#{color_code}m#{self}\e[0m"
  end

  def red
    colorize(31)
  end

  def green
    colorize(32)
  end

  def yellow
    colorize(33)
  end

  def blue
    colorize(34)
  end

  def pink
    colorize(35)
  end

  def light_blue
    colorize(36)
  end
end

n = 40
n.times do |i|
  puts "Given #{i}".light_blue
end

sleep 1
puts "\033[#{n+1}A"

n.times do |i|
  puts "Given #{i}".colorize(31 + i % 4)
end
