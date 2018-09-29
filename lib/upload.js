// reference liuzhixia
const NosClient = require('nos-node-sdk');
const path = require('path')

module.exports = class Upload {
  constructor(options) {
    this.options = options
    this.nosclient = new NosClient();
    this.nosclient.setAccessId(this.options.accessId);
    this.nosclient.setSecretKey(this.options.secretKey);
    this.nosclient.setEndpoint(this.options.endpoint);
    this.nosclient.setPort(this.options.port);
  }

  // upload file
  upload(paths, cb) {
    paths.forEach( filePath => {
      const basename = path.basename(filePath)
      const map = new Object(null)
      map.bucket = this.options.bucket
      map.filepath = filePath
      map.key = basename

      // start upload
      this.startUpload(map)
    })
    // execute callback
    // cb && cb()
  }

  startUpload(map, cb) {
    cb = cb ||  function (error, result) {
      console.log(error, result);
    }

    try {
      this.nosclient.put_file(map, cb);
    }
    catch (err) {
      console.log(err);
    }
  }

  // list file in bucket
  getList() {
    var map = {
      bucket: this.options.bucket // bucket name
    };
    var cb = function (error, result) {
      // get file object list
      const objectlist = result['bucketInfo']['objectlist'];
      for (var i = 0; i < objectlist.length; i++) {
        // log all file info
        console.log(objectlist[i]['key']);
        console.log(objectlist[i]['lastmodified']);
        console.log(objectlist[i]['etag']);
        console.log(objectlist[i]['size']);
      }
    }

    try {
      nosclient.list_objects(map, cb);
    }
    catch (err) {
      console.log("Failed with code:" + err.code);
    }
  }
  callback() {
    this.getList()
  }
}
