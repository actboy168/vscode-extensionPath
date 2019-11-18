const vscode = require('vscode');
const path = require("path");
const os = require('os');
const fs = require('fs');

function dataFolderName() {
    let product = JSON.parse(fs.readFileSync(path.join(vscode.env.appRoot, 'product.json')));
    if (vscode.env.remoteName === undefined) {
        return product.dataFolderName;
    }
    return product.serverDataFolderName;
}

function extensionPath() {
    return path.join(os.homedir(), dataFolderName() + '/extensions/')
}

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("extensionPath", () => {
        return extensionPath()
    }));
}

function deactivate() {
}

exports.activate = activate;
exports.deactivate = deactivate;
