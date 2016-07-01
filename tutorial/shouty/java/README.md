# Shouty

Shouty is a social networking application for short physical distances.
When someone shouts, only people within 1000m can hear it.

Shouty doesn't exist yet - you will implement it yourself!

That is, if you're attending a BDD/Cucumber course.

## You will need

1. A Java IDE (e.g. Eclipse or IntelliJ IDEA)
2. Java 1.8 JDK
3. Maven
4. Cucumber support for your IDE ([IntelliJ](https://plugins.jetbrains.com/plugin/7212?pr=), [Eclipse](https://cucumber.io/cucumber-eclipse/))

## Get the code

Git:

    git clone https://github.com/cucumber-ltd/shouty.java.git
    cd shouty.java

Subversion:

    svn checkout https://github.com/cucumber-ltd/shouty.java/branches/master shouty.java
    cd shouty.java

Or simply [download](https://github.com/cucumber-ltd/shouty.java/releases) a zip and expand it into a directory on your computer.

## Import the project

In Eclipse:

`File > Import > Existing Maven Project`

Then browse to the directory where you downloaded shouty.java and you should see the project start importing.

In IntelliJ

`File > Import project`

Then browse to the `pom.xml` file in the directory where you downloaded `shouty.java` and open the pom file. The project should now load.

## Run the tests

In Eclipse:

Right-click the project > Run as > Maven test

In IntelliJ

Right-click the project > Run > All tests

You should expect to see a couple of tests failing. If so, you're ready to roll!
