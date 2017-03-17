# Building the `gin/gherkin` binary

## Build with gcc:

    make cli

## Build with clang

    make CC=clang cli

## Build Windows binaries with mingw

Install the toolchain (OS X)

    brew install mingw-w64
    # Run `brew info mingw-w64` to verify the path before next command
    export PATH=/usr/local/Cellar/mingw-w64/5.0.1/bin:$PATH
    # Install wine - for testing
    brew cask install xquartz
    brew install wine

Build:

    make CC=i686-w64-mingw32-gcc cli

## Build with other compilers

Edit `src/Makefile` and set CC, CC_FLAGS, AR, AR_FLAGS, LD, LD_FLAGS appropriately, then run `make cli`
