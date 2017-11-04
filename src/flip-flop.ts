import * as fs from "fs"
import * as path from "path"
import FileType from "./file-type"

export default class FlipFlop {
  private fileName: string
  private specType: string

  constructor(fileName: string, specType: string) {
    this.fileName = fileName
    this.specType = specType
  }

  getRelatedFilePath() {
    if (this.isTest()) return this.flipToCodePath()
    return this.flopToTestPath()
  }

  private isTest() {
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

  private flopToTestPath() {
    switch (this.getFileType()) {
      case "view":
        return this.viewTestPath()
      case "lib":
        return this.libTestPath()
      default:
        return this.appTestPath()
    }
  }

  private getFileType() {
    return new FileType(this.fileName).call()
  }

  private viewFilePath() {
    return this.fileName
      .replace(`/${this.specType}`, "/app")
      .replace(`_${this.specType}.rb`, "")
  }

  private viewTestPath() {
    return this.fileName
      .replace('/app/', `/${this.specType}/`)
      .replace('.haml', `.haml_${this.specType}.rb`)
      .replace('.erb', `.erb_${this.specType}.rb`)
      .replace('.slim', `.slim_${this.specType}.rb`)
  }

  private libFilePath() {
    return this.fileName
      .replace(`/${this.specType}/lib`, "/lib")
      .replace(`_${this.specType}`, "")
  }

  private libTestPath() {
    return this.fileName
      .replace("/lib", `/${this.specType}/lib`)
      .replace(".rb", `_${this.specType}.rb`)
  }

  private appFilePath() {
    return this.fileName
      .replace(`/${this.specType}`, "/app")
      .replace(`_${this.specType}`, "")
  }

  private appTestPath() {
    return this.fileName
      .replace('/app', `/${this.specType}`)
      .replace(".rb", `_${this.specType}.rb`)
  }
}
