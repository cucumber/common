defprotocol CucumberGherkin.ParserException do
  @moduledoc false
  def get_message(error)
  def generate_message(error)
  def get_location(error)
end
