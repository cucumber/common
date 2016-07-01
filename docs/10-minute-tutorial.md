# 10 Minute Tutorial

This is a very quick introduction to Cucumber. It assumed you already know how to:

* write code
* use a build tool
* use a command line
* use a text editor

Just follow the steps below to get an idea what it's like to work with Cucumber.
You'll probably have lots of questions after that - don't worry, the rest of the
documentation goes into more detail.

## Install Cucumber

Add Cucumber to your project:

{% codetabs name="Maven", type="xml" -%}
<dependency>
    <groupId>info.cukes</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>${cucumber.version}</version>
    <scope>test</scope>
</dependency>

<dependency>
    <groupId>info.cukes</groupId>
    <artifactId>cucumber-junit</artifactId>
    <version>1.2.4</version>
    <scope>test</scope>
</dependency>
{%- language name="Node.js", type="json" -%}
{
  "devDependencies": {
    "cucumber": "^1.2.0"
  }
}
{%- language name="Ruby", type="ruby" -%}
group :test do
  gem 'cucumber', '~> 2.4.0'
end
{%- endcodetabs %}

Download Cucumber

{% codetabs name="Maven", type="bash" -%}
# Nothing to do at this step
{%- language name="Node.js", type="bash" -%}
npm install
{%- language name="Ruby", type="bash" -%}
bundle install
{%- endcodetabs %}

Well done - you're ready to create some files

## Create a simple directory structure

{% codetabs name="Maven" -%}
.
├── pom.xml
└── src
    ├── main
    │   └── java
    │       └── io
    │           └── cucumber
    │               └── tutorial
    │                   └── FizzBuzz.java
    └── test
        ├── java
        │   └── io
        │       └── cucumber
        │           └── tutorial
        │               └── RunCucumberTest.java
        └── resources
            └── io
                └── cucumber
                    └── tutorial
                        └── FizzBuzz.feature
{%- language name="Node.js" -%}
TODO
{%- language name="Ruby" -%}
.
bundle exec cucumber --init
{%- endcodetabs %}
