const fs = require("fs");
const path = require("path");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { Storage } = require("@google-cloud/storage"); // Imports the Google Cloud client library
const keyFile = path.join(__dirname + "/linen-marking-256917-803b65235f4c.json");
const storage = new Storage({ keyFilename: keyFile }); // Creates a client
const myBucket = "linen-marking-256917.appspot.com";
const srcFile = "ISSdata.json";
const myFile = path.join(__dirname + "/ISSdata.json");


function download(bucketName = myBucket, srcFilename = srcFile, destFilename = myFile) {
  // [START storage_download_file]
  async function downloadFile() {
    const options = {
      // The path to which the file should be downloaded, e.g. "./file.txt"
      destination: destFilename,
    };
    // Downloads the file
    await storage.bucket(bucketName).file(srcFilename).download(options);
    //console.log(`gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`);
  }
  downloadFile().catch(console.error);
  // [END storage_download_file]
}

module.exports = {
  updateISS: function(){
    download(...process.argv.slice(2));
      setInterval(function(){
        download(...process.argv.slice(2));
      },30 * 1000);
    
  }
}

