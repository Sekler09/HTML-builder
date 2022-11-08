const fs = require('fs')
const {stdin, stdout} = require('process')
const path = require('path')
const txtPath = path.join(path.dirname(__filename) , '/text.txt')
const writeStream = fs.createWriteStream(txtPath)
const readline = require('readline').createInterface(stdin, stdout)

console.log('Введите информацию для записи в файл')
readline.on('line', (line) => {
  if(line.toLowerCase().includes('exit')) {
    writeStream.close()
    console.log('Ввод звершен, пока')
    readline.close()
    }
  else {
    writeStream.write(line)
    console.log('Вводим дальше')}
})

readline.on('SIGINT', () => {
  console.log('Ввод завершен, пока')
  writeStream.close()
  readline.close()
})