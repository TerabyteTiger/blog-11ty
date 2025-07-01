---
title: Some notes on Regex
layout: libdoc_page.liquid
published: true
date: "2025-05-07"
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
description: "Notes for myself on Regex"
tags:
    - Regex
---

Notes taken while working through [https://regexone.com/](https://regexone.com/)

## Special Chars

```
.
|- Wildcard character
|- Need to \. escape to exact match . chars

^
|- "Not" character while in a grouping
|- [^abc] will match any char that isn't a, b, or c
|- "Starts with" character outside groupings
|- ^ok will match any string that starts with "ok"

$
|- "Ends with" character
|- end$ will match any string ending with "end"

\w
|- Alphanumeric Characters
|- Shorthand for [A-Za-z0-9_]

\d
|- Digits
|- Shorthand for [0-9]

\D
|- Non-Digit Character

\S
|- Non-Whitespace Character

\W
|- Non-alphanumeric Character

\0, \1, \2
|- Combine with Capture Groups to re-reference grouping

*
|- Zero or more repetitions
|- \d* matches any number of digits, including 0

+
|- One or more repetitions
|- \d+ matches any number of digits, but requires 1

?
|- Optional Character
|- ab?c will match either "abc" or "ac"

|
|- OR conditional Character
|- (milk|bread) matches "milk" OR "bread"
```

_Everything in a pattern is a char to match!!_

`abc` will match exactly "abc"

## Groups

```
[] - Match exactly 1 of the inner characters

() - Capture Group
|- Returns only captured grouping instead of full string
|- Useful for returning results
|- Can be nested to return multiple groups
|- Returned from outer -> inner, left -> right

{} - Quanity to match
|- a{3} - matches exactly "aaa"
|- a{1,3} - matches any of "a", "aa", or "aaa"
|- .{2-6} - matches any string of 2-6 chars

```

## Whitespaces

```
_ = Space

\t = tab

\n = new line

\r = carriage return (Windows 😉)

\s = any whitespace character
```
