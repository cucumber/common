import ExportFile from './ExportFile'

export default class GherkinDocument {
  constructor(private readonly uri: string) {}

  public toFile(): ExportFile {
    return new ExportFile(this.uri, '')
  }
}
