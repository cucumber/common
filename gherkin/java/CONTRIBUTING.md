Please read [CONTRIBUTING](https://github.com/cucumber/cucumber/blob/master/CONTRIBUTING.md) first.
You should clone the [cucumber/cucumber](https://github.com/cucumber/cucumber) repo if you want
to contribute.

## Run tests

### Using make

Just run `make` from this directory.

### Using just Maven

Just run `mvn clean test` from this directory.

Keep in mind that this will only run unit tests. The acceptance tests are only
run when you build with `make`.

## Make a release

    # Verify that version in `pom.xml` has the right SNAPSHOT release. Commit it.
    mvn release:clean
  	mvn --batch-mode -P release-sign-artifacts release:prepare -DdevelopmentVersion=X.Y.Z+1-SNAPSHOT
  	mvn --batch-mode -P release-sign-artifacts release:perform

Log in to https://oss.sonatype.org/, close and release the project. 

