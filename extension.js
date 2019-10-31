const vscode = require('vscode');
const path = require("path");
const os = require('os');
const fs = require('fs');

function dataFolderName(context) {
    let product = JSON.parse(fs.readFileSync(path.join(vscode.env.appRoot, 'product.json')));
    if (vscode.ExtensionExecutionContext === undefined) {
        return product.dataFolderName;
    }
    if (vscode.ExtensionExecutionContext.Local === context.executionContext) {
        return product.dataFolderName;
    }
    return product.serverDataFolderName;
}

function extensionPath(context) {
    return path.join(os.homedir(), dataFolderName(context) + '/extensions/')
}

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("extensionPath", () => {
        return extensionPath(context)
    }));
}

function deactivate() {
}

exports.activate = activate;
exports.deactivate = deactivate;
