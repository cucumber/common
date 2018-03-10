# Data Table for Java

For general information about data tables please refer to the [polyglot project](../) 
for specific information the [DataTable javadoc](datatable/src/main/java/io/cucumber/datatable/DataTable.java).  

## Comparing data tables

The matchers module contains [Hamcrest matchers](http://hamcrest.org/) 
to compare data tables. These can be used in most common test frameworks and
produce pretty error messages.


Add the `datatable-matchers` dependency to your pom.

```
<dependencies>
  [...]
    <dependency>
        <groupId>io.cucumber</groupId>
        <artifactId>datatable-matchers</artifactId>
        <version>${cucumber-datatable.version}</version>
        <scope>test</scope>
    </dependency>
  [...]
</dependencies>
```

Use the matcher in your step definition.

```java
import static io.cucumber.datatable.DataTableHasTheSameRowsAs.hasTheSameRowsAs;

[...]

private final DataTable expected = DataTable.create(
    asList(
        asList("Annie M. G.", "Schmidt"),
        asList("Roald", "Dahl"),
));
    
@Then("these authors have registered:")
public void these_authors_have_registered(DataTable registeredAuthors){
    assertThat(registeredAuthors, hasTheSameRowsAs(expected).inOrder());
    
    // java.lang.AssertionError: 
    // Expected: a datable with the same rows
    // but: the tables were different
    // - | Annie M. G. | Schmidt  |
    //   | Roald       | Dahl     |
    // + | Astrid      | Lindgren |
} 
```

## Build ##

Not building? IntelliJ IDEA doesn't know how to handle the shaded pom

0. `mvn install`
1. Open the 'Maven Projects' tool window. 
2. Choose "Shaded DataTable Dependencies" -> "Ignore Project". 
3. Select the top level `pom.xml` and choose "Maven" -> "Reimport".