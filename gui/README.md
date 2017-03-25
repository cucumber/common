# Cucumber GUI (spike / prototype)

A prototype Graphical User Interface for Cucumber, the BDD and testing tool.

## The vision

This is just a prototype, used to flush out the protocol we need for broadcasting events about test runs and results from Cucumber. Once this protocol is agreed and starts being implemented in the various Cucumbers, we will develop this project into an amazing front-end for Cucumber, letting you visualise tests as they happen, re-run them automatically, analyse results, and many other things, all from the comfort of your desktop.

## Contributing

We need help with this project. We need people who either have, or would like to develop, these skills:

- HTML / CSS / JavaScript
- UX design
- Data visualisation

Cucumber has hundreds of thousands of users, so even if you don't use Cucumber yourself, this project is an oppotunity to build something amazing for a large audience.

We're committed to tackling the problem of diversity in open-source, and if you're from a minority who's generally under-represented in OSS projects, you'll find we're a welcoming and supportive bunch of people to work with.

## Code of Conduct

Everyone interacting in this codebase and issue tracker is expected to follow the Cucumber community [code of conduct](https://github.com/cucumber/cucumber/blob/master/CODE_OF_CONDUCT.md).

## How to use

Start it with `yarn start`

Stream events using the `event-stream-3` branch of Cucumber-Ruby, using this command:

    cucumber --format Cucumber::Formatter::EventStream,port=9000 --out dev/null --format progress

## Demo

[![Preview video](https://embed-ssl.wistia.com/deliveries/7bfcf5b0af9056385d1bf961194b17a9dee35580.jpg?image_crop_resized=400x225&image_play_button=true&image_play_button_color=D5D5D5CC)](https://cucumber.wistia.com/medias/hpf9qboi31)

## Features

- displays each test-case and steps before test run
- live progress bar as results come in
- current scenario and step
- annotate each scenario and step with result, and duration

## TODO / Ideas for future

Here are some thoughts about the plan for moving this project from a prototype into prodution use.

- [ ] add tests
- [ ] rewrite using react / redux for rendering
- [ ] replace bootstrap / jquery with something lighter
- [ ] display image / video attachments
- [ ] display unused step definitions (needs a new event)
- [ ] display project name and command used to run the tests
- [ ] button to re-run the same test again
- [ ] auto re-run
- [ ] display other test metadata (filters, profile etc)
