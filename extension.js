const vscode = require("vscode");

function def(value, defaultValue) {
    return value === null || value === undefined
        ? defaultValue
        : value;
}

function activate(context) {
    const config = vscode.workspace.getConfiguration("ghciHelper");
    const stackPath = def(config.get("stackPath"), "stack");

    let terminal = null;

    function sendToGhci(command) {
        if (terminal == null) {
            vscode.window.showInformationMessage("No terminal set: start GHCi with \"ghciHelper.start\" command");
        }
        else {
            terminal.sendText(command);
        }
    }

    context.subscriptions.push(vscode.commands.registerCommand("ghciHelper.start", function() {
        if (terminal == null) {
            terminal = vscode.window.createTerminal("GHCi");
            terminal.show();

            const workspaceDir = vscode.workspace.rootPath;
            if (typeof workspaceDir != "undefined") {
                const cdCommand = `cd "${workspaceDir}"`;
                terminal.sendText(cdCommand);
            }

            const stackGhciCommand = `${stackPath} ghci`;
            terminal.sendText(stackGhciCommand);
        }
        else {
            vscode.window.showInformationMessage("GHCi terminal has already been started");
        }
    }));

    context.subscriptions.push(vscode.commands.registerCommand("ghciHelper.reload", function () {
        sendToGhci(":reload");
    }));

    context.subscriptions.push(vscode.commands.registerCommand("ghciHelper.main", function () {
        sendToGhci(":main");
    }));
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;
