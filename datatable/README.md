# DataTable

DataTable is a simple data structure that allows the use and transformation 
of Gherkin data tables in in cucumber.

This intended to support:
 * manual conversion in step definitions
 * automatic conversion by cucumber

## Introduction

The introduction will describe how data tables are mapped to certain data 
structures. It will not describe how to do this.

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
the first row has to be discarded. So instead we can transform we transform 
this table into a list of maps.

`java type: List<Map<String, String>`

```json
[
  { "firstName": "Annie M.G", "lastName": "Schmidt", "birthDate": "1911-03-20" }, 
  { "firstName": "Roald", "lastName": "Dahl", "birthDate": "1916-09-13" }, 
  { "firstName": "Astrid", "lastName": "Lindgren", "birthDate": "1907-11-14" } 
]
```  

Sometimes a data table has its the keys are in the first column. 

```gherkin
| KMSY | Louis Armstrong New Orleans International Airport |
| KSFO | San Francisco International Airport               |
| KSEA | Seattle–Tacoma International Airport              |
| KJFK | John F. Kennedy International Airport             |
```

We can transform the data table into a single map.

`java type: Map<String, String>`
```json
{
  "KMSY": "Louis Armstrong New Orleans International Airport",
  "KSFO": "San Francisco International Airport",
  "KSEA": "Seattle–Tacoma International Airport",
  "KJFK":  "John F. Kennedy International Airport"
}
```

However sometimes a data table has multiple columns values per key. 

```gherkin
| KMSY | 29.993333 | -90.258056  |
| KSFO | 37.618889 | -122.375    |
| KSEA | 47.448889 | -122.309444 |
| KJFK | 40.639722 | -73.778889  |
```

This can be represented by a map that uses a lists as its value.

`java type: Map<String, List<String>>`
```json
{
  "KMSY": ["29.993333", "-90.258056"],
  "KSFO": ["37.618889", "-122.375"],
  "KSEA": ["47.448889", "-122.309444"],
  "KJFK": ["40.639722", "-73.778889"]
}
```

However representing latitude and longitude as an array might lead to 
confusion. This can be avoided by adding a header to the table.

```gherkin
|      | latt      | long        |
| KMSY | 29.993333 | -90.258056  |
| KSFO | 37.618889 | -122.375    |
| KSEA | 47.448889 | -122.309444 |
| KJFK | 40.639722 | -73.778889  |
```

The first cell has been left blank. This tells the data table that this is
a map with primitive keys and maps as values.

`java type: Map<String, Map<String, String>>`
```json
{
  "KMSY": { "latt": "29.993333", "long": "-90.258056" },
  "KSFO": { "latt": "37.618889", "long": "-122.375" },
  "KSEA": { "latt": "47.448889", "long": "-122.309444" },
  "KJFK": { "latt": "40.639722", "long": "-73.778889" }
}
```

Using a string representation for a number is not very useful. Fortunately
type conversions are build in.

`java type: Map<String, Map<String, Double>>`
```json
{
  "KMSY": { "latt": 29.993333, "long": -90.258056 },
  "KSFO": { "latt": 37.618889, "long": -122.375 },
  "KSEA": { "latt": 47.448889, "long": -122.309444 },
  "KJFK": { "latt": 40.639722, "long": -73.778889 }
}
```

It is also possible to define custom type transformations.

`java type: Map<AirPort, Coordinate>`
```js
{
  KMSY: Coordinate(latt = 29.993333, long = -90.258056 ),
  KSFO: Coordinate(latt = 37.618889, long = -122.375 ),
  KSEA: Coordinate(latt = 47.448889, long = -122.309444 ),
  KJFK: Coordinate(latt = 40.639722, long = -73.778889 )
}
``````

Custom type conversions can transform a table into a single object. 

```gherkin
|   | A | B | C | 
| 1 | ♘ |   | ♝ | 
| 2 |   |   |   | 
| 3 |   | ♝ |   | 
```

`java type: ChessBoard`
```
[A chess board with one white knight and two black bishops]
```

## Parameter types

### Custom parameter types {#custom-parameter-types}

### Preferential parameter types

## For contributors

## Acknowledgements

