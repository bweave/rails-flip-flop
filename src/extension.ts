"use strict";
import * as vscode from "vscode"
import * as fs from "fs"
import * as path from "path"
import * as mkdirp from "mkdirp"
import FlipFlop from "./flip-flop"

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand("extension.railsFlipFlop", () => {
    const editor = vscode.window.activeTextEditor
    if (!editor) return

    const fileName: string = editor.document.fileName
    const specType: string = getSpecType()
    const flipFlop: FlipFlop = new FlipFlop(fileName, specType)
    const relatedFilePath: string = flipFlop.getRelatedFilePath()

    if (fs.existsSync(relatedFilePath)) {
      openFile(relatedFilePath)
    } else {
      prompt(vscode.workspace.asRelativePath(relatedFilePath), function() {
        mkdirp.sync(path.dirname(relatedFilePath))
        fs.closeSync(fs.openSync(relatedFilePath, 'w'))
        openFile(relatedFilePath)
      })
    }
  })

  context.subscriptions.push(disposable)
}

export function deactivate() {
}


function getSpecType() {
  if (dirExists("spec")) return "spec"
  if (dirExists("test")) return "test"
  // TODO: handle no testing dir exists at all
}

function dirExists(dir) {
  const rootPath = vscode.workspace.rootPath

  try {
    return fs.statSync(path.resolve(`${rootPath}/${dir}`)).isDirectory()
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false
    } else {
      throw e
    }
  }
}

function openFile(fileName) {
	vscode.workspace
		.openTextDocument(fileName)
		.then(vscode.window.showTextDocument)
}

function prompt(fileName, cb) {
	const options = { placeHolder: `Create ${fileName}?` }
  vscode.window
    .showQuickPick(["Yes", "No"], options)
    .then(function(answer) {
      if (answer === "Yes") cb()
    })
}
