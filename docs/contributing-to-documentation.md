# Contributing to Documentation

The Cucumber documentation is open source and anyone is welcome to contribute.

> **Note:** Do not update documentation in *this* repo. We are busy adding old documentation to a new repository [docs.cucumber.io](https://github.com/cucumber/docs.cucumber.io) to replace the current documentation on cucumber.io.
Please make **ALL** contributions to the documentation [here](https://github.com/cucumber/docs.cucumber.io).

## Process

First-time **contributors** will have to send a pull request.

Once your first pull request has been accepted you will be promoted to a **committer** and
gain write access to the [GitHub](https://github.com/cucumber/cucumber) repository.
As a **committer** you should still use pull requests.

Each pull request should only modify/add a single topic. Don't lump many unrelated document changes into the same pull request.

The title of documentation pull requests should be prefixed `[docs] `.
The title should explain what docs you are modifying/creating.
For example `[docs] Add tags.md` or `[docs] Modify tags.md to explain boolean expressions`.

The more general contribution process is described in the [Cucumber Community Contributing Guide](../CONTRIBUTING.md).

## Discuss the documentation

It's great to get feedback on your writing. Start out with small changes, then wait for feedback from other contributors and committers in the pull request.

Discussions about docs that are already published can be done in [GitBook comments](https://www.gitbook.com/blog/features/discussions) - check the [discussion page](https://www.gitbook.com/book/cucumber/cucumber/discussions) regularly to see if there are open discussions.

Sometimes it might be quicker to hop into the Cucumber [Slack](https://cucumber.io/support#slack) or [Gitter](https://cucumber.io/support#gitter) chat rooms to discuss in real time, if the people you want to talk to are online. 

And finally - there is always the friendly [Cucumber Google group](mailto:cukes-devs@googlegroups.com)

## What to contribute

The [SUMMARY.md](../SUMMARY.md) file is the table of contents. As you see,
several of the links point to non-existent files. This is what we need help with.

Documentation that isn't [reference](#reference-style) documentation for a particular library (the
majority of the documentation) lives under the `/docs` directory.

Some [reference](#reference-style) documentation lives
in `README` files inside standard libraries, such as
`/cucumber-expressions/README.md` and `/tag-expressions/README.md`.

A great way to start contributing is to answer a
[mailing list](https://groups.google.com/group/cukes) question by improving
the docs, and then reply on the mailing list with a link to your contribution.

If you are contributing for the first time we recommend you start by contributing to the [Reference](#reference-style) documentation. Once you get a hang of that you
can start contributing to [Learning](#learning-style) and [Tutorial](#tutorial-style) documentation.

## Toolchain

We use [GitBook](https://gitbook.com) to write and host the documentation. If
you want to contribute you should sign up for a GitBook account and link your GitHub account.

The documentation is written in [Markdown](http://toolchain.gitbook.com/syntax/markdown.html)
(simple markup) and [AsciiDoc](http://toolchain.gitbook.com/syntax/asciidoc.html) (richer markup).

The documentation is stored in [the cucumber/cucumber GitHub repository](https://github.com/cucumber/cucumber).

Install the [GitBook command-line](https://toolchain.gitbook.com/setup.html) tool:

    npm install gitbook-cli -g

When you have the toolchain installed, you can view the documentation locally:

    # Install plugins defined in book.json
    gitbook install

    # Spin up a local web server serving the docs
    gitbook serve

Every time you save an edit to one of the Markdown files, the gitbook server
will rebuild the docs.

You may also want to try the [GitBook Editor](https://www.gitbook.com/editor)
for local editing.

## Different styles of documentation

This documentation has three different styles of documentation:

* Tutorial (step by step guides)
* Learning (book-style chapters)
* Reference (the dry, technical style)

In general, it should be brief and to the point.

> Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away - Antoine de Saint Exupéry

### General writing style

* Every page should start with an informational/motivational paragraph
* Paragraphs should be short enough to be readable, but long enough to develop an idea.
* Every page should start with a `h1` heading. Sections use `h2`. Subsections use `h3`
* Break long lines. Insert a new line at around column 80. This is important because review comments can only be added to a line.
* Write in present tense
* Use unemotional language, but try to make it a little entertaining (this is hard)
* Write in a platform-neutral way as much as possible
  * Cucumber is implemented in several languages, and the docs should not assume a particular platform
  * Some good examples of cross-platform/language docs are [Stripe](https://stripe.com/docs/api) and [.NET](https://msdn.microsoft.com/en-us/library/system.array(v=vs.110).aspx)
* Use [codetabs](https://github.com/GitbookIO/plugin-codetabs) for all code examples (except Gherkin)
  * If you're only familiar with one programming language - just add a single tab - someone
    else will fill the gaps for the other languages!
* All documents should use [British English](https://en.wikipedia.org/wiki/British_English)
  * Contributions in [American English](https://en.wikipedia.org/wiki/American_English) is fine - editors will do the translation.
* Use links to external sites sparingly
* Do not use copyrighted material (images, text or other)
* Illustrations are great, but please use lo-fi drawings. Cucumber's design team will recreate illustrations according to Cucumber's [brand guidelines](https://github.com/cucumber-ltd/brand).

### Tutorial writing style {#tutorial-style}

* Assume the reader has little or no knowledge of the topic
* Use a conversational style
* Don't go too deep - refer to Learning and Reference docs for depth

### Learning writing style {#learning-style}

* Go deeper than tutorials
* Investigate why and how, pros and cons

### Reference writing style {#reference-style}

* Use a `h2` section for every major feature.
* Append `(platform-consistent)` or `(platform-inconsistent)` to each header
  * `(platform-consistent)` means this works the same on all platforms, like Gherkin
  * `(platform-inconsistent)` means this currently works differently across platforms, like formatter outputs
    * (The Cucumber team is working to make the implementations more consistent, but this takes time)
