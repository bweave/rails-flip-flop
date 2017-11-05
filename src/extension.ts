"use strict"

import * as vscode from "vscode"
import Bootstrap from "./bootstrap"

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand("extension.railsFlipFlop", () => {
    const editor = vscode.window.activeTextEditor
    if (!editor) return

    const bootstrap = new Bootstrap(editor)
    bootstrap.call()
  })

  context.subscriptions.push(disposable)
}

export function deactivate() {
}
