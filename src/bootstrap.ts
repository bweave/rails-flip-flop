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
    const specType = this.getSpecType()
    const flipFlop = new FlipFlop(fileName, specType)
    this.relatedFilePath = flipFlop.getRelatedFilePath()
  }

  call() {
    if (this.relatedPathExists()) {
      utils.openFile(this.relatedFilePath)
    } else {
      this.createTest()
    }
  }

  private getSpecType() {
    if (utils.dirExists("spec")) return "spec"
    if (utils.dirExists("test")) return "test"
    this.createTestDir()
  }

  private relatedPathExists() {
    return fs.existsSync(this.relatedFilePath)
  }

  private createTest() {
    const msg = `Create ${vscode.workspace.asRelativePath(this.relatedFilePath)}?`

    utils.prompt(msg, ["Yes", "No"], (answer) => {
      if (answer === "No") return
      fs.mkdirSync(path.dirname(this.relatedFilePath))
      fs.closeSync(fs.openSync(this.relatedFilePath, 'w'))
      utils.openFile(this.relatedFilePath)
    })
  }

  private createTestDir() {
    const msg = "No testing directory exists. Which would you like to create?"
    utils.prompt(msg, ["spec", "test"], (answer) => {
      fs.mkdirSync(`${vscode.workspace.rootPath}/${answer}`)
    })
  }
}
