const fs = require('fs/promises')
const path = require('path')
const secretFolderName = path.join(__dirname, 'secret-folder')
const options = {withFileTypes: true}

const logInfo = async (folderPath, dirent) => {
  try {
    const filePath = path.join(folderPath, dirent.name)
    const info = []
    info.push(path.basename(filePath, path.extname(filePath)))
    info.push(path.extname(filePath))
    const stat = await fs.stat(filePath)
    info.push(stat.size / 1024 + ' kb')
    console.log(info.join(' - '))
  } catch (error) {
    console.log(error)
  }
}

const getFiles = async (folderPath, options) => {
  try {
    const files = await fs.readdir(folderPath, options)
    files
      .filter((file) => file.isFile())
      .map((file) =>  logInfo(folderPath, file))
  } catch (error) {
    console.log(error)
  }
}

getFiles(secretFolderName, options)