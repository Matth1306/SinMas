
// command line arguments ex: dev [cmd] --foo --bar=123
// argv = ['--foo', '--bar=123']
// Argv = {foo:true, bar:123}
let yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
exports.argv = (() => {
    let arr = hideBin(process.argv)

    let n = arr.findIndex(function (t) {
        if (this.skipNext) {
            this.skipNext = false
            return false
        }
        let isFlag = t[0]=='-'
        let hasValue = t.indexOf('=')>=0
        this.skipNext = isFlag && !hasValue
        return !isFlag
    }, {
        skipNext:false
    })
    return arr.slice(n+1)
})();
exports.Argv = yargs(exports.argv).parse()

// caller dir, /foo> .../dev  -> '/foo'
exports.initCwd = process.env.INIT_CWD

let path = require('path')
exports.rootCwd = path.join(__dirname, '..', '..')

// packs "a \n b \n c" to "a b c"
let packWords = (s) => s.replace(/\s+/g, ' ').trim()


let execSync = require('child_process').execSync
exports.exec = (s, opt={}) => {
    let o = Object.assign({}, {
        cwd: exports.initCwd,
        stdio:'inherit',
        encoding:'utf8',
    }, opt, {
        env: Object.assign(process.env, opt.env)
    })

    execSync(packWords(s),o)
}
