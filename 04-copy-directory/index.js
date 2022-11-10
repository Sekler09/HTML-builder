const fsPr = require('fs/promises')
const fs = require('fs')
const path = require('path')
const options = {withFileTypes: true}
const folder = path.join(path.dirname(__filename), 'files')

const createDir = async (dir) => {
  const newDir = await fsPr.mkdir(dir, {recursive: true})
  return newDir ? newDir : dir
}

const copyDir = async (dir) => {
  try {
    const copyDir = dir + '-copy'
    let ex
    await fsPr
      .access(copyDir, fs.constants.F_OK)
      .then(() => (ex = true))
      .catch(() => (ex = false))
    if (!ex) await createDir(copyDir)
    const files = await getFiles(dir, options)
    files.map(async (file) => {
      const filePath = path.join(dir, file.name)
      const copyFilePath = path.join(copyDir, file.name)
      await fsPr.copyFile(filePath, copyFilePath)
    })
  } catch (error) {
    console.log(error)
  }
}

const getFiles = async (folderPath, options) => {
  try {
    const files = await fsPr.readdir(folderPath, options)
    files.filter((file) => file.isFile()).map((file) => file.name)
    return files
  } catch (error) {
    console.log(error)
  }
}


copyDir(folder)