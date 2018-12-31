[![Build Status](https://travis-ci.org/cucumber/gherkin-c.svg?branch=master)](https://travis-ci.org/cucumber/gherkin-c)

<h2>Build instruction:</h2>

From the source directory run

```
cmake -Bbuild -H.
cmake --build build
```
to build, then optionally run the tests via
```
cmake --build build --target test
```
and finally install via
```
cmake --build build --target install
```

![](https://raw.githubusercontent.com/Pwera/gherkin-c/master/gherkin.gif)

You can use this library in your project like this<br>
```
cmake_minimum_required(VERSION 3.0)
project(gherkincsample)
list(APPEND CMAKE_PREFIX_PATH "INSTALLATION_DIRECTORY")
set(CMAKE_CXX_STANDARD 11)
find_package(gherkin REQUIRED)
add_executable(gherkincsample main.cpp)
target_link_libraries(gherkincsample gherkin::gherkin)
```

[The docs are here](https://cucumber.io/docs/).
