const vscode = require('vscode');
const path = require("path");
const os = require('os');
const fs = require('fs');

function dataFolderName(context) {
    let product = JSON.parse(fs.readFileSync(path.join(vscode.env.appRoot, 'product.json')));
    if (vscode.ExtensionExecutionContext == undefined) {
        return product.dataFolderName;
    }
    if (context.executionContext == vscode.ExtensionExecutionContext.Local) {
        return product.dataFolderName;
    }
    return product.serverDataFolderName;
}

function homeDirectory() {
    if (os.platform() != 'win32') {
        return process.env.HOME
    }
    return process.env.USERPROFILE
}

function extensionPath(context) {
    return path.join(homeDirectory(), dataFolderName(context) + '/extensions/')
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
