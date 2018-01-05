# ghci-helper by Richard Cook

Miscellaneous GHCi-related helpers to speed up Haskell development

## Features

This extension adds the following three commands and associated key bindings:

* `ghciHelper.start` (`Alt+Z 7`): Creates a terminal and runs `stack ghci` in it
* `ghciHelper.reload` (`Alt+Z 8`): Sends `:reload` command to the terminal opened with the `ghciHelper.start` command
* `ghciHelper.main` (`Alt+Z 9`): Sends `:main` command to the terminal opened with the `ghciHelperStart` command

This enables a very specific rapid development cycle:

* Edit file in Visual Studio Code
* Incrementally reload and execute in integrated terminal

The path to the Stack executable can optionally be configured via the `ghciHelper.stackPath` configuration setting.

That's it!

## Release notes

[View change log][change-log]

## Licence

Released under [MIT License][licence]

[change-log]: CHANGELOG.md
[licence]: LICENSE
