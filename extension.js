const vscode = require("vscode");

function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        throw message;
    }
}

function def(value, defaultValue) {
    return value === null || value === undefined
        ? defaultValue
        : value;
}

function getBaseName(fileName) {
    return fileName.replace(/\.[^/.]+$/, "");
}

function getExecutableFileName(fileName) {
    const baseName = getBaseName(fileName);
    switch (process.platform) {
        case "win32": return baseName + ".exe";
        default: return baseName;
    }
}

function emptyLines() {
    return [];
}

function lines(x) {
    assert(typeof x == "object", "Must be object");
    return x;
}

function error(x) {
    assert(typeof x == "string", "Must be string");
    return x;
}

function activate(context) {
    const config = vscode.workspace.getConfiguration("ghciHelper");
    const stackPath = def(config.get("stackPath"), "stack");

    const startCAndCpp = function(workspaceDir, fileName) { return emptyLines(); };
    const reloadCAndCpp = function(workspaceDir, fileName) {
        if (typeof workspaceDir == "undefined") {
            return error("Must have valid workspace");
        }

        return lines([`cd "${workspaceDir}"`, "make"]);
    };
    const mainCAndCpp = function(workspaceDir, fileName) {
        if (typeof workspaceDir == "undefined") {
            return error("Must have valid workspace");
        }

        const executableFileName = getExecutableFileName(fileName);
        return lines([`cd "${workspaceDir}"`, executableFileName]);
    };

    const startCommandGenerators = {
        "c": startCAndCpp,
        "cpp": startCAndCpp,
        "haskell": function(workspaceDir, fileName) {
            if (typeof workspaceDir == "undefined") {
                return error("Must have valid workspace");
            }

            return lines([`cd "${workspaceDir}"`, `${stackPath} ghci`]);
        },
        "perl": function(workspaceDir, fileName) { return emptyLines(); }
    };

    const reloadCommandGenerators = {
        "c": reloadCAndCpp,
        "cpp": reloadCAndCpp,
        "haskell": function(workspaceDir, fileName) { return lines([":reload"]); },
        "perl": function(workspaceDir, fileName) { return lines([`perl "${fileName}"`]); }
    };

    const mainCommandGenerators = {
        "c": mainCAndCpp,
        "cpp": mainCAndCpp,
        "haskell": function(workspaceDir, fileName) { return lines([":main"]); }
    };

    let terminal = null;

    function runCommands(generators, openTerminal) {
        const languageId = vscode.window.activeTextEditor.document.languageId;
        const generator = generators[languageId];
        if (typeof generator == "undefined") {
            vscode.window.showInformationMessage(`ghci-helper: No handler for this action defined for language "${languageId}"`);
            return;
        }

        if (openTerminal) {
            if (terminal != null) {
                vscode.window.showInformationMessage("ghci-helper: Terminal has already been opened");
                return;
            }

            terminal = vscode.window.createTerminal("ghci-helper");
            terminal.show();
        }
        else {
            if (terminal == null) {
                vscode.window.showInformationMessage("ghci-helper: No terminal has been opened");
                return;
            }
        }

        const workspaceDir = vscode.workspace.rootPath;
        const fileName = vscode.window.activeTextEditor.document.fileName;
        const linesOrError = generator(workspaceDir, fileName);

        if (typeof linesOrError == "string") {
            vscode.window.showInformationMessage(`ghci-helper: Failed to run command: ${linesOrError}`);
            return;
        }
        else {
            for (let i in linesOrError) {
                const line = linesOrError[i];
                terminal.sendText(line);
            }
        }
    }

    context.subscriptions.push(vscode.commands.registerCommand("ghciHelper.start", function() {
        runCommands(startCommandGenerators, /*openTerminal=*/true);
    }));

    context.subscriptions.push(vscode.commands.registerCommand("ghciHelper.reload", function () {
        runCommands(reloadCommandGenerators, /*openTerminal=*/false);
    }));

    context.subscriptions.push(vscode.commands.registerCommand("ghciHelper.main", function () {
        runCommands(mainCommandGenerators, /*openTerminal=*/false);
    }));
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;
