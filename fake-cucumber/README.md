# Fake Cucumber

Fake Cucumber is a simple reference implementation of Cucumber.
It is primarily used to produce test data (cucumber messages).

## Usage

Using npm:

```
npm install -g fake-cucumber
fake-cucumber [FILES]
```

Alternatively, using docker:

```  
docker run -v $(pwd)/features:/tmp/features cucumber/fake-cucumber:latest [FILES]
```
