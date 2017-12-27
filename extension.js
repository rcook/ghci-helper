// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
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

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "ghci-helper" is now active!');

    let startCommand = vscode.commands.registerCommand("ghciHelper.start", function() {
        if (terminal == null) {
            terminal = vscode.window.createTerminal("GHCi");
            terminal.show();
            terminal.sendText("stack ghci");
        }
        else {
            vscode.window.showInformationMessage("GHCi terminal has already been started");
        }
    });

    context.subscriptions.push(startCommand);

    let reloadCommand = vscode.commands.registerCommand("ghciHelper.reload", function () {
        sendToGhci(":reload");
    });

    context.subscriptions.push(reloadCommand);

    let mainCommand = vscode.commands.registerCommand("ghciHelper.main", function () {
        sendToGhci(":main");
    });

    context.subscriptions.push(mainCommand);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;