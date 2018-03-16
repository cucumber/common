# Cucumber Config

Cucumber can be configured in several different ways.
We'll illustrate with an example:

* Tell Cucumber to run with tags `@smoke`
* Tell Cucumber to be verbose
* Specify two formatter plugins, `pretty` and `rerun`

## YAML (`cucumber.yml`)

```yaml
cucumber:
  tags: @smoke
  verbose: true
  plugins:
    - pretty
    - rerun
```

## JSON (`cucumber.json`)

```json
{
  "cucumber": {
    "tags": "@smoke",
    "verbose": true,
    "plugins": [
      "pretty",
      "rerun"
    ]
  }
}
```

## Command line options

```shell
--tags @smoke --verbose --plugin pretty --plugin rerun
```

Boolean options (options that don't take an argument) can be set to `false`
by prepending `--no-`:

```shell
--tags @smoke --no-verbose --plugin pretty --plugin rerun
```

This is useful for overriding options that default to true.

## Environment variables

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

## Java System properties (JVM only)

```shell
-Dcucumber.tags=@smoke
-Dcucumber.verbose=true
-Dcucumber.plugin=pretty,rerun
```

### Java Annotations (JVM only)

```java
@CucumberOptions(tags="@smoke", verbose=true, plugin={"pretty", "rerun"})
```


