const path = require('path');
const UploadPlugin = require('../index.js')
module.exports = {
  entry: {
    index: './index.js',
    file: './file/test.js',
    test: './file/test/test.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new UploadPlugin({
      filterExts: [],
      delayTime: 1000,
      root: './file',
      fileUpload: {
        upload(paths, callback) {
          callback(paths)
        },
        callback(args) {
          console.log(args)
        }
      }
    })
  ]
};