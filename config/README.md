# Cucumber Config

Cucumber has several configuration options. Each option has a default value
which can be overridden in different ways.

## Overriding configuration options

We'll illustrate with an example:

* Tell Cucumber to run with tags `@smoke`
* Tell Cucumber to be verbose
* Specify two formatter plugins, `pretty` and `rerun`

### YAML (`cucumber.yml`)

```yaml
cucumber:
  tags: @smoke
  verbose: true
  plugin:
    - pretty
    - rerun
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
    ]
  }
}
```

### Command line options

```shell
--tags @smoke --verbose --plugin pretty --plugin rerun
```

Boolean options (options that don't take an argument) can be set to `false`
by prepending `--no-`:

```shell
--tags @smoke --no-verbose --plugin pretty --plugin rerun
```

This is useful for overriding options that default to true.

Some command line options also have a short option:

```shell
-t @smoke -p pretty -p rerun
```

### Environment variables

```shell
# Linux / OS X
export CUCUMBER_TAGS=@smoke
export CUCUMBER_VERBOSE=true
export CUCUMBER_PLUGIN=pretty,rerun
```

```shell
# Windows
SET CUCUMBER_TAGS=@smoke
SET CUCUMBER_VERBOSE=true
SET CUCUMBER_PLUGIN=pretty,rerun
```

### Java System properties (JVM only)

```shell
-Dcucumber.tags=@smoke
-Dcucumber.verbose=true
-Dcucumber.plugin=pretty,rerun
```

### Java Annotations (JVM only)

```java
@CucumberOptions(tags="@smoke", verbose=true, plugin={"pretty", "rerun"})
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
```


