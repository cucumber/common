# TODO

- [ ] Make new directory structure
- [ ] Update .circleci/config.yml
- [ ] Generate example JSON documents
  - Use existing `gherkin/testdata/good/*.feature` files
  - `json-formatter/testdata/step_definitions/steps.rb`
  - A Makefile with a testdata target that runs cucumber --format json
- [ ] Generate messages to pipe to the new `cucumber-json-formatter`
  - Improve `fake-cucumber` to accept `--results results.json`. This would
    be a simple key-value document where the key is file:line and value is status
  - Write a custom (small!) formatter for cucumber-ruby that can output the above format
- [ ] Wire it all up together in a test suite that will compare results with `jq` and `diff`
- [ ] Handle Background edge cases
- [ ] Handle Hook edge cases
- [ ] Handle timestamp edge cases
