# Cucumber Config

This is a general purpose library for building simple configuration objects from 
several sources:

* YAML file
* JSON file
* Java Annotations (Java only)
* System properties (JVM only)
* Environment variables
* Command line arguments

You provide a configuration object, which is a simple object with default
field values. The library overrides those values from the sources above.

Field values can be of the following types:

* boolean
* string
* array of strings
* RegExp/Pattern
* enum (Java only)

Field values are overridden in the order of the sources above.
Fields of string array type are either appended to or replaced, depending on the source.

* Appending sources: YAML, JSON, Java Annotations, System properties
* Replacing sources: Environment variables and Command line arguments 

## How it works

First you define your own configuration object with default values: 

```java
public class MyConfig {
    public boolean somebool = false;
    public int meaning = 12;
    public String message = "nothing";
    public List<String> stringlist = new ArrayList<>();
}
```

Then you create a `ConfigBuilder` object. Its constructor takes 
several arguments where you can specify the base name of the YAML/JSON file, a 
pattern for environment variables, the command line arguments etc.

```java
ConfigBuilder configBuilder = new ConfigBuilder(...);
```

Next, you ask the `configBuilder` to `configure` your configuration object:

```java
MyConfig config = configBuilder.build(new MyConfig());
```

The fields of the returned `config` object contain values from the various 
configuration sources.

Below are some examples of how to define configuration:

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
    "message": "hello",
    "stringlist": [
      "one",
      "two"
    ]
  }
}
```

### Command line options

```shell
--somebool --meaning 42 --message hello --stringlist one --stringlist two
```

The *surplus* arguments can be assigned to `stringlist` (see the `ConfigBuilder`
constructor for details on how to do this).

```shell
--somebool --meaning 42 --message hello one two
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
--somebool --meaning 42 --message hello --stringlist one --stringlist two
-s -m 42 -e hello -l one -l two
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
