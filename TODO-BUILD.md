* [ ] Use released dependencies in gherkin.gemspec for c21e and cucumber-messages-ruby
  * [ ] Set up automated releases for these projects
  * [x] Fix the travis build (deploy stage) in gherkin-{java,javascript,ruby}. See gherkin-go
* [x] Set up build triggering for tagged builds
  * [x] Use script similar to: https://hiddentao.com/archives/2016/08/29/triggering-travis-ci-build-from-another-projects-build/
    * Also see API: https://docs.travis-ci.com/user/triggering-builds
  * [x] Regular tagged build does not deploy
  * [x] Triggered tagged build deploys
  * [x] Trigger module (go) knows what to trigger
* [x] Ruby
  * [x] Fix rubygems access control: https://travis-ci.org/cucumber/gherkin-ruby/jobs/430763146
  * [x] Pin gem versions for bundler and coveralls