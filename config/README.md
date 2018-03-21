# Cucumber Config

Cucumber has several configuration options. Each option has a default value
which can be overridden in different ways.

## Overriding configuration options

We'll illustrate with an example:

* Feature files in `features/billing`
* Run only tags `@smoke`
* Be verbose
* Use `pretty` and `rerun` formatter plugins

### YAML (`cucumber.yml`)

```yaml
cucumber:
  tags: @smoke
  verbose: true
  plugin:
    - pretty
    - rerun
  features:
    - features/billing
```

### JSON (`cucumber.json`)

```json
{
  "cucumber": {
    "tags": "@smoke",
    "verbose": true,
    "plugin": [
      "pretty",
      "rerun"
    ],
    "features": [
      "features/billing"
    ]
  }
}
```

### Command line options

```shell
--tags @smoke --verbose --plugin pretty --plugin rerun features/billing
```

The last argument (`features/billing`) is an *argument* and not an option,
but it gets assigned to the `cucumber.features` list.

Boolean options (options that don't take an argument) can be set to `false`
by prepending `--no-`:

```shell
--tags @smoke --no-verbose --plugin pretty --plugin rerun features/billing
```

This is useful for overriding options that default to true.

Some command line options also have a short option:

```shell
-t @smoke -p pretty -p rerun features/billing
```

### Environment variables

```shell
# Linux / OS X
export CUCUMBER_TAGS=@smoke
export CUCUMBER_VERBOSE=true
export CUCUMBER_PLUGIN=pretty,rerun
export CUCUMBER_FEATURES=features/billing
```

```shell
# Windows
SET CUCUMBER_TAGS=@smoke
SET CUCUMBER_VERBOSE=true
SET CUCUMBER_PLUGIN=pretty,rerun
SET CUCUMBER_FEATURES=features/billing
```

### Java System properties (JVM only)

```shell
-Dcucumber.tags=@smoke
-Dcucumber.verbose=true
-Dcucumber.plugin=pretty,rerun
-Dcucumber.features=features/billing
```

### Java Annotations (JVM only)

```java
@CucumberOptions(
  tags="@smoke", 
  verbose=true, 
  plugin={"pretty", "rerun"},
  features={"features/billing"}
})
```

## Displaying configuration options

Because configuration options can be specified in different ways, Cucumber can print out
the current configuration along with the source of each configuration. To do this,
specify the `--verbose` option (in any of the ways explained above).

This will print something like the following:

```yaml
cucumber:
  # --tags (command line option)
  tags: @smoke
  # cucumber.yml (YAML file)
  verbose: true
  plugin:
    # CUCUMBER_PLUGIN (environment variable)
    - pretty
    # --plugin (command line option)
    - rerun
  features:
    # command line argument
    - features/billing
```


