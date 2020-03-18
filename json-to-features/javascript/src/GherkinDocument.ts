import ExportFile from './ExportFile'
import Feature from './Feature'

export default class GherkinDocument {
  constructor(
    private readonly uri: string,
    private readonly feature?: Feature
  ) {}

  public toFile(): ExportFile {
    const content = this.feature ? this.feature.toString() : ''
    return new ExportFile(this.uri, content)
  }
}
