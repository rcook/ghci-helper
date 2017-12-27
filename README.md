# ghci-helper by Richard Cook

Miscellaneous GHCi-related helpers to speed up Haskell development

## Features

This extension adds the following two commands:

* `ghciHelper.start`: Creates a terminal and runs `stack ghci` in it
* `ghciHelper.reload`: Sends `:reload` command to the terminal opened with the `ghciHelper.start` command
* `ghciHelper.main`: Sends `:main` command to the terminal opened with the `ghciHelperStart` command

This enables a very specific rapid development cycle:

* Edit file in Visual Studio Code
* Incrementally reload and execute in integrated terminal

In typical usage, I bind `ghciHelper.reload` and `ghciHelper.main` to the `F8` and `F8` keys respectively so I can rapidly reload and run my `main` function. Here are my typical GHCi-related keyboard bindings:

```json
[
    {
        "key": "f6",
        "command": "workbench.action.terminal.focus"
    },
    {
        "key": "f7",
        "command": "ghciHelper.start"
    },
    {
        "key": "f8",
        "command": "ghciHelper.reload"
    },
    {
        "key": "f9",
        "command": "ghciHelper.main"
    }
]
```

The path to the Stack executable can optionally be configured via the `ghciHelper.stackPath` configuration setting.

That's it!

## Release notes

[View change log][change-log]

## Licence

Released under [MIT License][licence]

[change-log]: CHANGELOG.md
[licence]: LICENSE
