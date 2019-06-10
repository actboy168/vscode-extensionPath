const vscode = require('vscode');
const path = require("path");
const os = require('os');

function vscodeType(context) {
    let insiders = vscode.env.appName == "Visual Studio Code - Insiders"
        ? "-insiders"
        : "";
    if (vscode.ExtensionExecutionContext == undefined) {
        return ".vscode" + insiders;
    }
    if (context.executionContext == vscode.ExtensionExecutionContext.Local) {
        return ".vscode" + insiders;
    }
    return ".vscode-server" + insiders;
}

function homeDirectory() {
    if (os.platform() != 'win32') {
        return process.env.HOME
    }
    return process.env.USERPROFILE
}

function extensionPath(context) {
    return path.join(homeDirectory(), vscodeType(context) + '/extensions/')
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
