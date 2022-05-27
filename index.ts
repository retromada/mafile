import { readdir, readFile } from 'fs/promises'

class MaFile {
  private path: string

  constructor (path: string) {
    this.path = path
  }

  /**
   * Get all maFile files from a directory
   * @returns Returned promise
   */
  private files () {
    return readdir(this.path).then((files) => {
      const maFiles = files.filter((file) => /\.maFile/i.test(file))

      if (!maFiles.length) {
        throw new Error('No files were found')
      }

      return maFiles
    })
  }

  /**
   * Reader all maFile files from a directory
   * @returns Returned promise
   */
  read () {
    return this.files().then(async (files) => {
      const maFiles = {}

      await Promise.all(
        files.map((file) =>
          readFile(`${this.path}/${file}`, 'utf-8').then(
            (data) => (maFiles[file.replace(/\.[^.]*$/, '')] = JSON.parse(data))
          )
        )
      )

      return maFiles
    })
  }
}

export = MaFile
