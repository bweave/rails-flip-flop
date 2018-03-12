"use strict"

import * as fs from "fs"
import * as path from "path"
import * as vscode from "vscode"
import * as utils from "./utils"
import FlipFlop from "./flip-flop"

export default class Bootstrap {
  private relatedFilePath: string

  constructor(editor) {
    const fileName = editor.document.fileName
    this.getSpecType().then(specType => {
      const flipFlop = new FlipFlop(fileName, specType)
      this.relatedFilePath = flipFlop.getRelatedFilePath()
      if (this.relatedPathExists()) {
        utils.openFile(this.relatedFilePath)
      } else {
        this.createTest()
      }
    })
  }

  call() {
    if (this.relatedPathExists()) {
      vscode.workspace.openTextDocument(this.relatedFilePath).then(function(TextDocument){
        vscode.window.showTextDocument(TextDocument, vscode.ViewColumn.Two, true)
      })
    } else {
      this.createTest()
    }
  }

  private getSpecType() {
    if (utils.dirExists("spec")) return Promise.resolve("spec")
    if (utils.dirExists("test")) return Promise.resolve("test")
    return this.createTestDir().then(specType => specType)
  }

  private relatedPathExists() {
    return fs.existsSync(this.relatedFilePath)
  }

  private createTest() {
    const { relatedFilePath } = this
    const msg = `Create ${vscode.workspace.asRelativePath(this.relatedFilePath)}?`

    utils.prompt(msg, ["Yes", "No"], (answer) => {
      if (answer === "No") return
      fs.mkdirSync(path.dirname(relatedFilePath))
      fs.closeSync(fs.openSync(relatedFilePath, 'w'))
      utils.openFile(relatedFilePath)
    })
  }

  private createTestDir() {
    const msg = "No testing directory exists. Which would you like to create?"
    return utils.prompt(msg, ["spec", "test"], (answer) => {
      fs.mkdirSync(`${vscode.workspace.rootPath}/${answer}`)
      return answer
    })
  }
}
