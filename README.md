# ghci-helper by Richard Cook

Miscellaneous GHCi-related helpers to speed up Haskell development

## Features

This extension adds the following two commands:

* `ghciHelperStart`: Creates a terminal and runs `stack ghci` in it
* `ghciHelperReload`: Sends `:reload` and `:main` commands to the terminal opened with the `ghciHelperStart` command

This enables a very specific rapid development cycle:

* Edit file in Visual Studio Code
* Incrementally reload and execute in integrated terminal

In typical usage, I bind `ghciHelperReload` to the `F7` key so I can rapidly reload and run my `main` function.

That's it!

## Licence

Released under [MIT License][licence]

[licence]: LICENSE
