"use strict"

export default class FileType {
  private fileName: string
  private viewRegex: RegExp = /((erb$|haml$|slim$)|(.erb|.haml|.slim)(_spec|_test)?(\.rb)$)/
  private libRegex: RegExp = /^\/((test|spec)\/)?(lib)/

  constructor(fileName: string) {
    this.fileName = fileName
  }

  call() {
    if (this.fileName.match(this.viewRegex)) return "view"
    if (this.fileName.match(this.libRegex)) return "lib"
    return "app"
  }
}
