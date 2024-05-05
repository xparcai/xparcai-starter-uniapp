const fs = require('node:fs')

const filePath = './src/manifest.json'

if (!fs.existsSync(filePath))
  fs.writeFile(filePath, '{}\n', {}, () => {})
