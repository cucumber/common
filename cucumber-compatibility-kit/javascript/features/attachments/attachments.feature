Feature: Attachments
  It is sometimes useful to take a screenshot while a scenario runs.
  Or capture some logs.
  
  Cucumber lets you `attach` arbitrary files during execution, and you can
  specify a content type for the contents.
  
  Formatters can then render these attachments in reports.
  
  Rule: Attachments must have a body and a content type

    Scenario: Attach text
      When the string "hello" is attached as "text/plain"

    Scenario: Attach screenshot
      When a pixel is attached as "image/png"
