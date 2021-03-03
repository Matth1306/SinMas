require('dotenv').config()


let glob = require('glob')
glob.sync('*.js', {cwd:'src', nodir:true})
    .sort()
    .forEach((f) => {
        if (f==='lib.js') return

        Object.assign(exports, require('./src/' + f))
    })


let { initCwd } = require('lib')
exports.default = (cb) => {
    console.log('called from', initCwd)
    console.log('nothing to do')
    cb()
}