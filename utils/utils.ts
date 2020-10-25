import path from 'path'
import fs from 'fs'
import process from 'process'

const appDirectory = fs.realpathSync(process.cwd())

const indexFile = (
  filePathTemplate: string,
  fileExtensions: string[]
): string => {
  const extension = fileExtensions.find((extension) =>
    fs.existsSync(
      path.resolve(appDirectory, `${filePathTemplate}.${extension}`)
    )
  )
  if (extension) {
    return path.resolve(appDirectory, `${filePathTemplate}.${extension}`)
  }
  return path.resolve(appDirectory, `${filePathTemplate}.js`)
}

export { appDirectory, indexFile }
