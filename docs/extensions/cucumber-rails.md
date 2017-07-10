# cucumber-rails

[cucumber-rails](https://github.com/cucumber/cucumber-rails) is a RubyGem which
brings Ruby on Rails Generators for Cucumber with special support for Capybara
and DatabaseCleaner.

The `cucumber:install` generator sets up Cucumber in your Rails project. It
generates the necessary files in the `features/` directory. After
running this generator you will also get a new rake task called `cucumber`.

For more details, see `rails generate cucumber:install --help`.

By default, `cucumber-rails` runs `DatabaseCleaner.start` and
`DatabaseCleaner.clean` before and after your Cucumber scenarios. This default
behavior can be disabled. See the README for details.

To learn more of the tools being integrated and assisted by `cucumber-rails`,
see the READMEs of
[DatabaseCleaner](https://github.com/DatabaseCleaner/database_cleaner) and
[Capybara](https://github.com/teamcapybara/capybara).
