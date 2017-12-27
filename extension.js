const vscode = require("vscode");

function activate(context) {
    var terminal = null;

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
            terminal.sendText("stack ghci");
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
