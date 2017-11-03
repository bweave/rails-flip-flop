import * as fs from "fs"
import * as path from "path"
import AppFileType from "./app-file-type"

export default class FlipFlop {
  private fileName: string
  private specType: string

  constructor(fileName: string, specType: string) {
    this.fileName = fileName
    this.specType = specType
  }

  getRelatedFilePath() {
    if (this.isTestFile()) return this.flipToCodePath()
    return this.flopToTestPath()
  }

  private isTestFile() {
    return this.fileName.includes("_test.rb") || this.fileName.includes("_spec.rb")
  }

  private flipToCodePath() {
    switch (this.getFileType()) {
      case "view":
        return this.viewFilePath()
      case "lib":
        return this.libFilePath()
      default:
        return this.appFilePath()
    }
  }

  private getFileType() {
    return new AppFileType(this.fileName).call()
  }

  private viewFilePath() {
    return this.fileName
      .replace(`/${this.specType}`, "/app")
      .replace(`_${this.specType}.rb`, "")
  }

  private libFilePath() {
    return this.fileName
      .replace(`/${this.specType}/lib`, "/lib")
      .replace(`_${this.specType}`, "")
  }

  private appFilePath() {
    return this.fileName
      .replace(`/${this.specType}`, "/app")
      .replace(`_${this.specType}`, "")
  }

  private flopToTestPath() {
    return "TODO"
  }
}
