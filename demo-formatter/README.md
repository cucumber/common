# Cucumber Demo Formatter

Examples of standalone formatters that produce output from `protobuf` formatters
or [fake-cucumber](../fake-cucumber)

If you are writing a new formatter, copy this code as a starting point.

## Usage

You'll need a `cucumber-messages.bin` file with messages that your formatter can process.
The simplest way to generate one of these is to run [fake-cucumber](../fake-cucumber)
over the `.feature` files used as test data in [gherkin](../gherkin/testdata/good):

```
npm install -g fake-cucumber
cd ../gherkin
fake-cucumber --results=random testdata/good/*.feature > ../demo-formatter/cucumber-messages.bin
cd ../demo-formatter
ls -al
```

You now have a `cucumber-messages.bin` file. Let's process it with our formatter:

### Ruby

```
cat cucumber-messages.bin | ruby/bin/cucumber-demo-formatter
```
