export default class AppFileType {
  private fileName: string
  private viewRegex: RegExp = /(.erb|.haml|.slim)_(spec|test).rb$/
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
