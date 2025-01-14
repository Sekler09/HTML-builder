const fsPr = require('fs/promises')
const fs = require('fs')
const path = require('path')
const { get } = require('http')
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
    const files = await getFiles(dir, options)
    if (!ex) await createDir(copyDir)
    else {
      const oldFiles = await getFiles(copyDir, options)
      oldFiles.map(file =>{
        const filePath = path.join(copyDir, file.name)
        fs.unlink(filePath, (err) => {
          if (err) throw err
        })
      } )
    }
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
    let files = await fsPr.readdir(folderPath, options)
    files = files.filter((file) => file.isFile())
    return files
  } catch (error) {
    console.log(error)
  }
}

copyDir(folder)
