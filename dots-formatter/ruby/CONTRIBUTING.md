Release Process
===============

* Bump the version number in the gemspec
* Now release it:

```
bundle update
bundle exec rake
git commit -m "Release X.Y.Z"
# Make sure you run gem signin as the cukebot@cucumber.io user before running the following step. Credentials can be found in 1Password
rake release
```
