module Gherkin
  EXE_FILE_PATH = File.expand_path("#{File.dirname(__FILE__)}/../../executables/gherkin-{{.OS}}-{{.Arch}}{{.Ext}}")
end
