# What's this?

Drop message ndjson files in this directory (with `.ndjson` extension).
They will be picked up by `../messageTests.tsx` which will try to render them.

This is useful whenever we come across a message stream that causes a runtime error
in HTML Reporter or any other tool depending on `@cucumber/react` so we can diagnose
and fix any issues.

The `.ndjson` files are gitignores since they tend to be big, and may contain confidential
information (if they come from users).