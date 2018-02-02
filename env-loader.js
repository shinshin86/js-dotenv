const fs = require('fs')
const join = require('path').join
const readline = require('readline')

const loadEnv = (filepath) => {
  return new Promise((resolve, reject) => {
    obj = {}
    const stream = fs.createReadStream(join(__dirname, filepath), 'utf-8')
    const rl = readline.createInterface({input:stream})

    rl.on('line', (line) => {
      let val = line.split('=')[1]
      if (val.indexOf('#') !== -1) {
        val = val.substring(0, val.indexOf('#')).trim()
      }
      obj[line.split('=')[0]] = val
    })

    rl.on('close', () => {
      resolve(obj)
    })
  })
}

// example
env = {}
loadEnv('./env')
  .then((res) => {
    // get env object
    env = res
    console.log(env)
  })
  .catch((err) => {
    console.log(err)
  })
