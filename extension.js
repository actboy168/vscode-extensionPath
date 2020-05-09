const vscode = require('vscode');
const path = require('path');
const os = require('os');
const fs = require('fs');

function dataFolderName() {
    const product = JSON.parse(fs.readFileSync(path.join(vscode.env.appRoot, 'product.json')));
    if (vscode.env.remoteName === undefined) {
        return product.dataFolderName;
    }
    return product.serverDataFolderName;
}

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("extensionPath", () => {
        return path.join(os.homedir(), dataFolderName(), 'extensions', path.sep);
    }));
}

exports.activate = activate;
