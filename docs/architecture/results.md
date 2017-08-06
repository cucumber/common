# Results

Every Cucumber implementation MUST provide a PLUGIN to capture results in the
the METADATA format.

In addition to this format, a Cucumber implementation MAY provide additional plugins
for other result formats:

* `json` - METADATA format
* `progress` - PROGRESS format
* `pretty` - PRETTY format
* `tap` - TAP format

## Specifying formats

Cucumber can be instructed to write results in a particular format using the
`--plugin FORMAT:DESTINATION`.

### Destination

The `DESTINATION` can be a file path or a URL. Every Cucumber implementation
MUST be able to write results to a file. If the parent directory does not
exist, Cucumber MUST fail with the error message: 

    Directory X does not exist. Please create it first.

A Cucumber implementation SHOULD be able to write results to a `http` or `https` URL
using `POST`. The body of the post MUST be an array of metadata. 

It is possible to stream/batch metadata in multiple requests, and if this is done, 
the `X-Cucumber-Run` header must be set to the same value for each request.

### Omitting destination

If no `DESTINATION` is specified, output will be written to `STDOUT`.

If more than one plugin is using `STDOUT`, Cucumber MUST fail immediately with the message: 

    Only one plugin can write to STDOUT

### File names for parallel execution

When Cucumber is run in parallel (either in multithreaded mode, or by forking
multiple Cucumber processes), it is essential that each thread/process write
results to a different file, to prevent clobbering one another's results.

In order to avoid this, make sure to include a `%` sign in the `DESTINATION`
path. Cucumber MUST replace this token with a unique ID for each thread/process.

## Summary of Results

At the end of a run, Cucumber MUST report a summary of the results in the
following format:

```
[FAILURE]*

N scenarios [(N passed|failed|undefined|pending)]*
N steps [(N passed|failed|undefined|pending)]*
NmN.NNNs
```

The summary should start with 0 or more `FAILURE` sections, in the following
format:

```
CUCUMBER PATH:LINE # SCENARIO TITLE
  STACK_TRACE

```

This may repeat some information printed by formatter plugins (such as
the `pretty` formatter). Nevertheless, it should be re-printed anyway, since it is much
easier for users to rerun failed scenarios when they are printed at the bottom
of the screen.

```
cucumber features/hello.feature:2 # Scenario: a
  features/steps.rb:2:in `/^b$/'
  features/hello.feature:3:in `Given b'
```

The summary MUST must be output independently of formatter plugins, and always
to `STDOUT`.
