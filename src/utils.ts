"use strict"

import * as fs from "fs"
import * as path from "path"
import { ViewColumn, window, workspace } from "vscode"

export function  dirExists(dir) {
  const rootPath = workspace.rootPath

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

export function prompt(msg, choices, cb) {
  const options = { placeHolder: msg }

  window
    .showQuickPick(choices, options)
    .then((answer) => cb(answer))
}

export function openFile(fileName) {
  workspace
    .openTextDocument(fileName)
    .then(window.showTextDocument)
}
