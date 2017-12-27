# ghci-helper by Richard Cook

Miscellaneous GHCi-related helpers to speed up Haskell development

## Features

This extension adds the following two commands:

* `ghciHelperStart`: Creates a terminal and runs `stack ghci` in it
* `ghciHelperReload`: Sends `:reload` command to the terminal opened with the `ghciHelperStart` command
* `ghciHelperMain`: Sends `:main` command to the terminal opened with the `ghciHelperStart` command

This enables a very specific rapid development cycle:

* Edit file in Visual Studio Code
* Incrementally reload and execute in integrated terminal

In typical usage, I bind `ghciHelperReload` and `ghciHelperMain` to the `F8` and `F8` keys respectively so I can rapidly reload and run my `main` function. Here are my typical GHCi-related keyboard bindings:

```json
[
    {
        "key": "f6",
        "command": "workbench.action.terminal.focus"
    },
    {
        "key": "f7",
        "command": "extension.ghciHelperStart"
    },
    {
        "key": "f8",
        "command": "extension.ghciHelperReload"
    },
    {
        "key": "f9",
        "command": "extension.ghciHelperMain"
    }
]
```

That's it!

## Release notes

[View change log][change-log]

## Licence

Released under [MIT License][licence]

[change-log]: CHANGELOG.md
[licence]: LICENSE
