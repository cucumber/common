require 'json'
require 'set'

ciDict = JSON.parse(File.read(File.dirname(__FILE__) + '/ciDict.json'))

def collect_vars(ob, env_vars)
  ob.each do |key, val|
    if val.is_a?(String)
      # RegExp copied from ruby/lib/cucumber/create_meta/variable_expression
      # Collect all variables
      val.scan(/\${(.*?)(?:(?<!\\)\/(.*)\/(.*))?}/) do |match|
        env_vars.add(match[0])
      end
    elsif val
      collect_vars(val, env_vars)
    end
  end
end

ciDict.each do |name, ci|
  filename = "testdata/#{name.gsub(/\s/, '')}.txt"
  puts "--- #{filename}"
  txt_file_env_vars = []
  if File.exist?(filename)
    File.read(filename).each_line do |line|
      txt_file_env_vars.push(line.strip.split('='))
    end
  end
  used_env_vars = Set.new
  collect_vars(ci, used_env_vars)
  used_env_vars.to_a.sort.each do |used_env_var|
    exists = txt_file_env_vars.detect { |pair| pair[0] == used_env_var}
    if !exists
      txt_file_env_vars.push([used_env_var, '???'])
    end
  end
  File.open(filename, "w:UTF-8") do |io|
    txt = txt_file_env_vars.map do |pair|
      pair.join('=')
    end.join("\n") + "\n"
    io.write(txt)
  end
end
