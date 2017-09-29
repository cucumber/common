# Installation

Cucumber exists for different platforms such as Java, JavaScript, Ruby etc. Cucumber is a command-line tool, and how you install it depends on your platform.

## Ruby {#ruby}

### Gem {#gem}

Cucumber for Ruby is a ruby gem, and can be installed from the command line. After you have installed Ruby and RubyGems, install Cucumber with the following command:

``` shell
$ gem install cucumber
```
### Ruby on Rails {#rails}

Before you can use the generator, add the gem to your project's Gemfile as follows:

``` ruby
    group :test do
      gem 'cucumber-rails', :require => false
      # database_cleaner is not required, but highly recommended
      gem 'database_cleaner'
    end
```
Then install it by running:

``` shell
    bundle install
```

Learn about the various options:

``` shell
    rails generate cucumber:install --help
```

Finally, bootstrap your Rails app, for example:

``` shell
    rails generate cucumber:install
```

## Java {#java}
Cucumber is published as several jar files in the central Maven repository. Installation is simply a matter of adding a dependency in your build file:

### Maven {#maven}

Add these dependencies to your project:
``` java
    <dependency>
        <groupId>info.cukes</groupId>
        <artifactId>cucumber-java</artifactId>
        <version>1.2.5</version>
        <scope>test</scope>
    </dependency>
    
    <dependency>
        <groupId>info.cukes</groupId>
        <artifactId>cucumber-junit</artifactId>
        <version>1.2.5</version>
        <scope>test</scope>
    </dependency>
```

### Gradle {#gradle}

## JavaScript {#javascript}

Cucumber.js is available as an npm module.

``` shell
$ npm install cucumber
```

## PHP {#php}

[Behat](http://docs.behat.org/) is an official Cucumber implementation available as a Composer package.

``` shell
$ composer require behat/behat
```
