# Change log

## v0.0.9

* Add rudimentary support for languages other than Haskell
* Change default prefix key to Alt+Z instead of Alt+Q

## v0.0.8

* Always `cd` into workspace root directory if available before running `stack ghci`

## v0.0.7

* Change default prefix key to Alt+Q instead of Alt+G

## v0.0.6

* Add Haskell logo
* Add key bindings for all three commands

## v0.0.5

* Fix names of commands so they're under `ghciHelper` instead of `extension`
* Some internal refactoring
* Introduce `ghciHelper.stackPath` configuration setting

## v0.0.4

* Reduce VSCode version bound to 1.18.0

## v0.0.3

* No longer set focus to terminal when running `:reload` or `:main`
* No longer display informational message when running `:reload` or `:main`

## v0.0.2

* Separate `:reload` and `:main` into two commands

## v0.0.1

* Initial release
* Adds `ghciHelperStart`
* Adds `ghciHelperReload`
