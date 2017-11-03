"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode"
import * as fs from "fs"
import * as path from "path"
import * as mkdirp from "mkdirp"
import FlipFlop from "./flip-flop"

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log("Congratulations, your extension 'rails-flip-flop' is now active!")

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("extension.railsFlipFlop", () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage("We gonna flip 'dem flops!")

    let editor = vscode.window.activeTextEditor
    if (!editor) return

    let document = editor.document
    let fileName: string = document.fileName
    let specType: string = getSpecType()
    let flipFlop: FlipFlop = new FlipFlop(fileName, specType)
    let relatedFilePath: string = flipFlop.getRelatedFilePath()
  });

  context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {
}


function getSpecType() {
  if (dirExists("spec")) return "spec"
  if (dirExists("test")) return "test"
  // TODO: handle no testing dir exists at all
}

function dirExists(dir) {
  let rootPath = vscode.workspace.rootPath

  try {
    fs.statSync(path.resolve(`${rootPath}/${dir}`)).isDirectory()
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false
    } else {
      throw e
    }
  }
}
