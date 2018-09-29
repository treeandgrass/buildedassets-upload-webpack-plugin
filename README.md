# buildedassets-upload-webpack-plugin
Upload the webpack packaged file to cdn or some other place

### Install

``` npm i -D buildedassets-upload-webpack-plugin```

### Usage

```
plugins: [
    new UploadPlugin({
      fileUpload: {
        upload(paths, callback) {
          /**/
        },
        callback() {
          /**/
        }
      }
    })
  ]
 ````
 
 
 ### Description
 
 **fileUpload** is an object, which contains two methods, one is the **upload** method of the upload file, the other is the **callback** method, the first parameter of the upload is the file path packaged by webpack, and the second parameter is the callback method, the parameter is fileUpload callback method
 
