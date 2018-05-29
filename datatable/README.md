# DataTable

DataTable is a simple data structure that allows the use and transformation 
of Gherkin data tables in Cucumber.

This intended to support:
 * manual conversion in step definitions
 * automatic conversion by Cucumber

## Introduction

The introduction will describe how data tables are mapped to certain data
structures. This conversion can be done either by Cucumber or manually.

Let's write a simple data table and see how we might use it. 

```gherkin
| firstName   | lastName | birthDate  |
| Annie M. G. | Schmidt  | 1911-03-20 |
| Roald       | Dahl     | 1916-09-13 |
| Astrid      | Lindgren | 1907-11-14 |
```

As this is a table the natural representation would be a list of a 
list of strings. 

`java type: List<List<String>>`

```json
[ 
  [ "firstName", "lastName", "birthDate" ],
  [ "Annie M.G", "Schmidt", "1911-03-20" ], 
  [ "Roald", "Dahl", "1916-09-13" ], 
  [ "Astrid", "Lindgren", "1907-11-14" ] 
]
```  

This representation is not very useful. The fields are no longer labeled and
the first row has to be discarded. So instead we can convert this table 
into a list of maps.

`java type: List<Map<String, String>`

```json
[
  { "firstName": "Annie M.G", "lastName": "Schmidt",  "birthDate": "1911-03-20" }, 
  { "firstName": "Roald",     "lastName": "Dahl",     "birthDate": "1916-09-13" }, 
  { "firstName": "Astrid",    "lastName": "Lindgren", "birthDate": "1907-11-14" } 
]
```  

Sometimes a table's keys are in the first column:

```gherkin
| KMSY | Louis Armstrong New Orleans International Airport |
| KSFO | San Francisco International Airport               |
| KSEA | Seattle–Tacoma International Airport              |
| KJFK | John F. Kennedy International Airport             |
```

We can convert the table into a single map.

`java type: Map<String, String>`
```json
{
  "KMSY": "Louis Armstrong New Orleans International Airport",
  "KSFO": "San Francisco International Airport",
  "KSEA": "Seattle–Tacoma International Airport",
  "KJFK": "John F. Kennedy International Airport"
}
```

In the previous example the table only had a single column value for each key. A 
table might have multiple column values per key.

For example a table of airport codes and their coordinates expressed in 
latitude and longitude.

```gherkin
| KMSY | 29.993333 |  -90.258056 |
| KSFO | 37.618889 | -122.375000 |
| KSEA | 47.448889 | -122.309444 |
| KJFK | 40.639722 |  -73.778889 |
```

These can be represented by a map that uses a list as its value. 

`java type: Map<String, List<String>>`
```json
{
  "KMSY": ["29.993333", "-90.258056"],
  "KSFO": ["37.618889", "-122.375000"],
  "KSEA": ["47.448889", "-122.309444"],
  "KJFK": ["40.639722", "-73.778889"]
}
```

Storing latitude and longitude as a list might lead to confusion if the columns
are swapped. This can be avoided by adding a header to the table:

```gherkin
|      |       lat |         lon |
| KMSY | 29.993333 |  -90.258056 |
| KSFO | 37.618889 | -122.375000 |
| KSEA | 47.448889 | -122.309444 |
| KJFK | 40.639722 |  -73.778889 |
```

Note that the first cell has been left blank. This tells the table that the
map's keys should be created from the first column rather than the header.

`java type: Map<String, Map<String, Double>>`

```json
{
  "KMSY": { "lat": "29.993333", "lon": "-90.258056" },
  "KSFO": { "lat": "37.618889", "lon": "-122.375000" },
  "KSEA": { "lat": "47.448889", "lon": "-122.309444" },
  "KJFK": { "lat": "40.639722", "lon": "-73.778889" }
}
```

## Table Types

So far we have transformed a table to various collections of strings. As a
string representation for a number is not very useful. A data table can
transform individual cells to a different type. 

`java type: Map<String, Map<String, Double>>`

```json
{
  "KMSY": { "lat": 29.993333, "lon": -90.258056 },
  "KSFO": { "lat": 37.618889, "lon": -122.375 },
  "KSEA": { "lat": 47.448889, "lon": -122.309444 },
  "KJFK": { "lat": 40.639722, "lon": -73.778889 }
}
```

The built-in transformations support:

* Integers, for example `71` or `-19`
* Floats, for example `3.6`, `.8` or `-9.2`
* Strings, for example `bangers` or `mash`.

On the JVM, there is additional support for `BigInteger`, `BigDecimal`,
`Byte`, `Short`, `Long` and `Double`.

### Custom Table Types

You can define custom data table types to represent tables from your own 
domain. Doing this has the following benefits:

1. Automatic conversion to custom types
2. Document and evolve your ubiquitous domain language
3. Enforce certain patterns

A custom table type can be registered as follows:

```java
registry.defineDataTableType(
  new DataTableType(
    LocalDate.class,                            // type
    new TableCellTransformer<LocalDate>() {     // transformer
  
      @Override
      public LocalDate transform(String cell) {
          return new LocalDate.parse(cell);
      }
    }, 
  )
```

The parameters are as follows:

* `type`
* `transformer` - a function that transforms either a cell, table entry, table
   row or table.  

There are four ways to transform a table:

1. Transform the cells. Each cell represents an object.
2. Transform the rows. Each row represents an object.
3. Transform the entries. The entries of row paired with its corresponding
   header represent an object.
4. Transform the table. The table as a whole is transformed into a single
   object.  

When combined these four transforms are sufficient to convert a table to any
other reasonable type. 

#### Example

Previously we transformed the geolocation of airports to a map of Doubles. The
domain however uses a `Geolocation(latitude:Double, longitude:Double)` object to
represent geolocations. Airports are represented by `Airport(code:String)`.

```gherkin
|      |       lat |         lon |
| KMSY | 29.993333 |  -90.258056 |
| KSFO | 37.618889 | -122.375000 |
| KSEA | 47.448889 | -122.309444 |
| KJFK | 40.639722 |  -73.778889 |
```

By registering two table types:

```java
registry.defineDataTableType(
    new DataTableType(
        "airport",
        Airport.class,
        new TableCellTransformer<Airport>() {
            @Override
            public Airport transform(String cell) {
                return new Airport(cell);
            }
        }
    )
);

registry.defineDataTableType(
    new DataTableType(
        Geolocation.class,
        new TableEntryTransformer<Geolocation>() {
            @Override
            public Geolocation transform(Map<String, String> entry) {
                return new Geolocation(
                    parseDouble(entry.get("lat")),
                    parseDouble(entry.get("lon"))
                );
            }
        }
    )
);
```

The table can be transformed to a map of airports to geolocations. 

`java type: Map<Airport, Geolocation>`

```js
{
  Airport(code = "KMSY"): Geolocation(lat = 29.993333, lon = -90.258056 ),
  Airport(code = "KSFO"): Geolocation(lat = 37.618889, lon = -122.375 ),
  Airport(code = "KSEA"): Geolocation(lat = 47.448889, lon = -122.309444 ),
  Airport(code = "KJFK"): Geolocation(lat = 40.639722, lon = -73.778889 )
}
```

If the table does not include a header row, then a `TableRowTransformer` must be used.
As both the the table row and entry transformer create a list of `Geolocation`
it is recommended that you pick one representation only.

```gherkin
| KMSY | 29.993333 | -90.258056  |
| KSFO | 37.618889 | -122.375    |
| KSEA | 47.448889 | -122.309444 |
| KJFK | 40.639722 | -73.778889  |
```

```java
registry.defineDataTableType(
    new DataTableType(
        Geolocation.class,
        new TableRowTransformer<Geolocation>() {
            @Override
            public Geolocation transform(List<String> tableRow) {
                return new Geolocation(
                    Double.parseDouble(tableRow.get(0)),
                    Double.parseDouble(tableRow.get(1))
                );
            }
        }
    )
);
```

Custom transformation can also transform a table into a single object.

```gherkin
|   | A | B | C | 
| 3 | ♘ |   | ♝ | 
| 2 |   |   |   | 
| 1 |   | ♝ |   | 
```

```java
registry.defineDataTableType(new DataTableType(
  ChessBoard.class,
  new TableTransformer<ChessBoard>() {
    @Override
    public ChessBoard transform(DataTable table) {
        return new ChessBoard(table.subTable(1, 1).asList());
    }
  })
);

```

`java type: ChessBoard`

```
[A chess board with one black knight and two white bishops]
```

## Diffing

Two tables can be compared using the `diff` or `unorderedDiff` methods.
This is useful for comparing a table with data from another system,
such as a UI or a database:

```java
DataTable actualTable = DataTable.create(listOfListOfString) // From DOM, DB or other source
expectedTable.diff(actualTable) // Throws an exception if they are not equal
```

You can also use [Hamcrest](http://hamcrest.org/) matchers from the `io.cucumber:datatable-matchers` module:

```java
assertThat(actualTable, hasTheSameRowsAs(expectedTable).inOrder());
assertThat(actualTable, hasTheSameRowsAs(expectedTable));
```

## DataTable object

An m-by-n immutable table of string values. A table is either empty or contains 
one or more cells. As such if a table has zero height it must have zero width and
vice versa.

The first row of the the table may be referred to as the table header. The 
remaining cells as the table body.

A table provides the following operations:

* `diff` throws an exception if the two tables are different. 
* `unorderedDiff` throws an exception if the two tables are different, allowing a difference in ordering. 
* `isEmpty` returns true if the table has no cells. 
* `transpose` returns a transposed table
* `height` returns the height of the table
* `width` returns the width of the table
* `cells` returns the cells of the table as a list of lists of strings
* `row(index)` returns a single row
* `rows(fromRow, toRow)`` returns table containing the rows between `fromRow`
  (inclusive) to `toRow` (exclusive).
* `column(index)` returns a single column
* `columns(fromColumn, toColumn)`` returns table containing the columns 
  between `fromColumn` (inclusive) to `toColumn` (exclusive).
* `subTable(fromRow, fromColumn, toRow, toColumn)` returns a tablw containing the 
  cells between `fromRow` and `fromColumn` (inclusive) to `toRow` and `toColumn` (exclusive).

Additionally it provides methods to conveniently convert the table into
other data structures using the the transformers from the previous section.

* `asList|Lists(type)` converts a table to list or list of a given type.
* `asMap|Maps(keyType, valueType)` converts a table to map of key to value types.
* `convert(type)` converts a table to an object of an arbitrary type.    

## For contributors

If you're contributing to Cucumber, you might be interested in how to use
DataTable programmatically. Here are some pointers:

### Transformation in detail.

As described earlier there are four primitive table types. These can be used to transform a table into a 
list of lists, a list of maps, a map a list or a single object. These transformations follow a number of 
simple algorithms.

**TableCellTransformer => list of lists of objects**

1. Determine the type the object.  
2. If no type could be determined assume it to be string.
3. Lookup the TableCellTransformer for that type. 
4. Apply the transformer to each cell. 

**TableEntryTransformer => a list of maps of keys to values**

1. Split the header from the body of the table. Both are still tables.  

```gherkin
Header: | firstName   | lastName | birthDate  |

  Body: | Annie M. G. | Schmidt  | 1911-03-20 |
        | Roald       | Dahl     | 1916-09-13 |
        | Astrid      | Lindgren | 1907-11-14 |
```
   
2. Transform the header to a list of lists take the first element
3. Transform the body to a list of lists.
4. For each row pair the elements of header with the elements of that row.

**TableRowTransformer => a list of objects**

1. Determine the type the object.  
2. If no type could be determined assume it to be string.
3. Lookup the TableRowTransformer for that type. 
4. Apply the transformer to each row.
 
**TableTransformer => an object**

1. Determine the type the object.  
2. Lookup the TableTransformer for that type. 
4. Apply the transformer to the table.

**Combined  => a map of keys and values**

Maps can be created combining the previous transformers.

1. Split the keys from the values in the table. Both are still tables.  

```gherkin
         Keys:              Values:
Header: | firstName   |    | lastName | birthDate  |  

  Body: | Annie M. G. |    | Schmidt  | 1911-03-20 |
        | Roald       | => | Dahl     | 1916-09-13 |
        | Astrid      |    | Lindgren | 1907-11-14 
```

   
2a. If the first table cell is blank use the TableCellTransformer to convert the other cells in the column.  
2b. Otherwise use the TableEntryTransformer.

3a. If the first table cell is blank use the TableEntryTransformer to convert the body values.  
3b. Otherwise use the TableRowTransformer on all values.

4. Pair up the keys and values from steps 2 and 3. 
