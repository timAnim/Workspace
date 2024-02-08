
let {convertWordFiles} = require('convert-multiple-files-ul')
let path = require('path')

async function test() {
  // Return promise => convertWordFiles(path of the file to be converted, convertTo, outputDir)
  const pathOutput = await convertWordFiles(path.resolve(__dirname, 'test.docx'), 'doc', path.resolve(__dirname));
  console.log(pathOutput);
}

test();