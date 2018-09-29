// default config parameters
const path = require('path')
const fs = require('fs')
const Upload  = require('./upload.js')

// judge is windows system
// reference https://github.com/jonschlinkert/is-windows/blob/master/index.js
let isWindows = () => {
  return process && (process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE));
}

// judge is absolute path
// reference https://github.com/jonschlinkert/is-unc-path/blob/master/index.js
let isRelative = (path) => {
  return path && /^[\\\/]{2,}[^\\\/]+[\\\/]+[^\\\/]+/.test(path)
}

// reference https://github.com/jonschlinkert/is-absolute/blob/master/index.js
let isAbsolute = (path) => {
  if (isWindows()) {
    if (/[a-z]/i.test(fp.charAt(0)) && fp.charAt(1) === ':' && fp.charAt(2) === '\\') {
      return true;
    }
    if (fp.slice(0, 2) === '\\\\') {
      return true;
    }
    return !isRelative(fp);
  } else {
    return path.charAt(0) === '/'
  }
}

// Recursive traversal directory
let walkFile = (_dir, filterExts) => {
  let dirs = []
  
  if (typeof _dir === 'string') {
    // Relative to the root directory
    if (isRelative(_dir)) {
      _dir = path.join(__dirname, _dir)
    }

    const stat = fs.statSync(_dir)
    if (stat.isFile()) {
      const extname = path.extname(_dir)
      if (filterExts.indexOf(extname) > -1) {
        dirs.push(_dir)
      }
    } else if (stat.isDirectory()) {
      let paths = fs.readdirSync(_dir)
      paths = paths.map(l => path.join(_dir, l))
      dirs = dirs.concat(walkFile(paths, filterExts))
    }
  } else if (Array.isArray(_dir)) {
    _dir.forEach(l => {
      dirs = dirs.concat(walkFile(l, filterExts))
    })
  } else {
    Object.keys(_dir).forEach(key => {
      dirs = dirs.concat(walkFile(_dir[key], filterExts))
    })
  }
  return dirs
}


module.exports = class UploadFilePlugins {
  constructor(options) {
    this.options = options
    this.options.delayTime = options.delayTime || 0  // delay time
    this.options.root = options.root || ''
    this.fileUpload = options.fileUpload
    if (!this.fileUpload) {
      this.fileUpload = new Upload(options) // file upload object
    }
    if (options.filterExts) { // filter file by extname
      if (Array.isArray(options.filterExts)) {
        this.options.filterExts = options.filterExts
      } else {
        throw new Error('filterExts must be a array')
      }
    } else {
      this.options.filterExts = []
    }
    
  }

  apply(compiler) {
    if (compiler.hooks) {
      compiler.hooks.done.tapAsync('UploadFilePlugin', (compilation, callback) => {
        this.execute(compiler, callback)
      })
    } else {
      compiler.plugin('done', () => {
        this.execute(compiler)
      })
    }
  }
  // exeute command
  execute(compiler, callback) {
    callback&&callback()
    setTimeout(() => {
      const outputPath = this.options.root || compiler.options.output.path
      const paths = walkFile(outputPath, this.options.filterExts)
      this.fileUpload.upload(paths, this.fileUpload.callback)
    }, this.options.delayTime)
  }
}