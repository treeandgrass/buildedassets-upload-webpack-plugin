# buildedassets-upload-webpack-plugin
Upload the webpack packaged file to cdn or some other place

### Install

``` npm i -D buildedassets-upload-webpack-plugin```

### Usage

```
plugins: [
    new UploadPlugin({
      filterExts: ['.js'],
      delayTime: 1000,
      fileUpload: {
        upload(paths, callback) {
          /* callback(paths) */
        },
        callback(args) {
          /* console.log(args)*/
        }
      }
    })
  ]
````
 **!important** If you do not pass the fileUpload object, default use netease nos sdk to upload the file to nos.
 You need to refer to the following [document](https://www.163yun.com/help/documents/15677636352917504) configuration
 
 ```
 new UploadPlugin({
      filterExts: ['.js'],
      delayTime: 1000,
      accessId: 'id',
      secretKey: '',
      endpoint: '',
      port: 80,
      bucket: 'bucket'
})
 ```
 
 ### Description
 
 **fileUpload** is an object, which contains two methods, one is the **upload** method of the upload file, the other is the **callback** method, the first parameter of the upload is the file path packaged by webpack, and the second parameter is the callback method, the parameter is fileUpload callback method
 
