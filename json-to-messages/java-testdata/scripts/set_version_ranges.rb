require 'nokogiri'

pom = File.open("pom.xml") { |f| Nokogiri::XML(f) }

versions = pom.xpath("//xmlns:dependency/xmlns:version[../xmlns:groupId/text() = 'io.cucumber']")
versions.each do |version|
  return version if version.content =~ /^\[/
  major, minor, patch = version.content.split('.').map {|i| i.to_i}
  version.content = "[#{major}.#{minor}.#{patch},#{major+1}.0.0)"
end

File.open("pom.xml", "w:UTF-8") { |f| f.write(pom.to_xml) }
