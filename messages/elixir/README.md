# CucumberMessages

## Updating the generated files

If you want to update the generated files, execute this command while in the elixir messages folder:

```bash
MIX_ENV=prod mix protox.generate --multiple-files --output-path=lib/cucumber_messages/generated messages.proto
```

The `--multiple-files` option is necessary if we want to support parallel compiling of modules. For more information, you can check the [protox](https://github.com/ahamez/protox) library.

_Note: You do need to have `protoc` installed on your system._

## Credits

This library is originally funded by [UCLL](https://www.ucll.be) its "First Time Right" research project.
