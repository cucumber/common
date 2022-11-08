Please read [CONTRIBUTING](https://github.com/cucumber/gherkin/blob/master/CONTRIBUTING.md) first.
You should clone the [cucumber/gherkin](https://github.com/cucumber/gherkin) repo if you want
to contribute.

## Run tests

### MacOS/Linux

Install [.NET 5](https://github.com/dotnet/core/blob/master/release-notes/download-archives/2.0.7-download.md)

Just run `make` from this directory.

### Windows

Open `Gherkin.DotNet.sln` from this directory in Visual Studio 2019 and build.

Alternatively, run `dotnet build` and `dotnet test` from this directory.

The `dotnet test` command will run the unit tests and the .NET-transformed acceptance tests. This is good as a first pass check and for debugging.
For a complete verification, run the `make` command as well (or let the PR build run it for you), so that the standard version of the acceptance tests are also executed.

## Make a release

The 'make' command is now prepared to make NuGet package releases as well, ie the `make update-version` command will update the version number in the project file. For the general release procedure, check [CONTRIBUTING](https://github.com/cucumber/common/blob/main/gherkin/CONTRIBUTING.md).

    # prepare new version
    echo "X.Y.Z" > VERSION
    make update-version
    git commit -m "Release X.Y.Z"
    git tag -a -m "Version X.Y.Z" vX.Y.Z

    # verify and publish
    make publish

    # push
    git push
    git push --tags
