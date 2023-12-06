/* eslint-disable @typescript-eslint/no-unused-vars */

export default class FakeFS {
  private fileContents: { [path: string]: string } = {};

  readFileSync(path: string, encoding: string): string {
    return this.fileContents[path] || '';
  }

  setFileContent(path: string, content: string): void {
    this.fileContents[path] = content;
  }

  clear(): void {
    this.fileContents = {};
  }
}
