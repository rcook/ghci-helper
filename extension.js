// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    var terminal = null;

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "ghci-helper" is now active!');

    let ghciHelperStart = vscode.commands.registerCommand("extension.ghciHelperStart", function() {
        if (terminal == null) {
            terminal = vscode.window.createTerminal("GHCi");
            terminal.show();
            terminal.sendText("stack ghci");
        }
        else {
            vscode.window.showInformationMessage("GHCi terminal is already started");
        }
    });

    context.subscriptions.push(ghciHelperStart);

    let ghciHelperReload = vscode.commands.registerCommand("extension.ghciHelperReload", function () {
        if (terminal == null) {
            vscode.window.showInformationMessage("No terminal set: start GHCi with \"startGhci\" command");
        }
        else {
            terminal.show();
            terminal.sendText(":reload");
            terminal.sendText(":main");
            vscode.window.showInformationMessage(":reload and :main sent to terminal");
        }
    });

    context.subscriptions.push(ghciHelperReload);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;