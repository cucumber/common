#!/usr/bin/env bash
#
# Formats all the .json files
#
for f in $(find . -name "*.json"); do
	(cat "$f" | jq '.' >> "$f".pretty && mv "$f".pretty "$f") || exit 1;
done
