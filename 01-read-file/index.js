const fs = require('fs')
const path = require('path')
const txtPath = path.join(path.dirname(__filename) + '/text.txt')

const readStream = fs.createReadStream(txtPath, "utf8")
readStream.on('data', (chunk, error) =>{
  if(error) throw error
  console.log(chunk)
})

readStream.on('end', () => 0 )