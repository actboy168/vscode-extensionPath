const vscode = require('vscode');
const path = require('path');

function activate(context) {
    const extensionPath = path.dirname(context.extensionPath);
    context.subscriptions.push(vscode.commands.registerCommand("extensionPath", () => {
        return extensionPath;
    }));
}

exports.activate = activate;
