const fsPr = require('fs/promises')
const fs = require('fs')
const path = require('path')
const options = {withFileTypes: true}
const styles = path.join(path.dirname(__filename), 'styles')
const projectDist = path.join(path.dirname(__filename), 'project-dist')
const bundle = path.join(projectDist, 'bundle.css')

const fillBundle = async (folderPath, cssFiles) => {
  try {
    cssFiles.map((file) => {
      const readStream = fs.createReadStream(
        path.join(folderPath, file.name),
        'utf8'
      )
      readStream.on('data', (chunk, error) => {
        if (error) throw error
        fs.appendFile(bundle, chunk, (err) => {
          if (err) throw err
        })
      })
      readStream.on('end', () => {})
    })
  } catch (error) {
    console.log(error)
  }
}

const getCssFiles = async (folderPath, options) => {
  try {
    let files = await fsPr.readdir(folderPath, options)
    files = files.filter(
      (file) => file.isFile() && path.extname(file.name) === '.css'
    )
    return files
  } catch (error) {
    console.log(error)
  }
}

const createBundle = async () => {
  const cssFiles = await getCssFiles(styles, options)
  fillBundle(styles, cssFiles)
}

createBundle()
