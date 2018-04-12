# Cucumber Config

This library can create configuration objects from several sources:

* YAML file
* JSON file
* Environment variables
* System properties (JVM only)
* Java Annotations (Java only)

The purpose is to provide a consistent way to configure Cucumber.
(The library is independent of Cucumber and can be used by other programs).

## How it works

The library sets fields on an object. This object should have default values set.
We'll illustrate with an example:

```java
public class Testing {
    public boolean somebool = false;
    public int meaning = 12;
    public String message = "nothing";
    public List<String> stringlist = new ArrayList<>();
    public List<String> extra = new ArrayList<>();
}
```

These fields can be modified from several sources.

### YAML file

```yaml
testing:
  somebool: true
  meaning: 42
  message: hello
  stringlist:
    - one
    - two
```

### JSON

```json
{
  "testing": {
    "somebool": true,
    "meaning": 42,
    "stringlist": [
      "one",
      "two"
    ]
  }
}
```

### Command line options

```shell
--somebool --meaning 42 --message hello --stringlist one --stringlist one
```

Or, if we specify that *surplus* arguments should be assigned to `stringlist`

```shell
--somebool --meaning 42 --message hello one one
```

Boolean options (options that don't take an argument) can be set to `false`
by prepending `--no-`:

```shell
--no-somebool
```

This is useful for overriding options that default to true.

It's also possible to define *shortopt* aliases for the *longopt* options, making
the following equivalent:

```shell
--somebool --meaning 42 --message hello --stringlist one --stringlist one
-s -m 42 -e hello -l one -l one
```

### Environment variables

```shell
# Linux / OS X
export TESTING_SOMEBOOL=true
export TESTING_MEANING=42
export TESTING_MESSAGE=hello
export TESTING_STRINGLIST=one,two
```

(On Windows, use `SET` instead of `export`).

### Java System properties (JVM only)

```shell
-Dtesting.somebool=true
-Dtesting.meaning=42
-Dtesting.message=hello
-Dtesting.stringlist=one,two
```

### Java Annotations (JVM only)

```java
@TestingOptions(
  somebool=true, 
  meaning=42,
  message="pretty",
  stringlist={"one", "two"}
)
```
