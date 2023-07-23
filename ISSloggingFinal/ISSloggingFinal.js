const fs = require("fs");
const path = require("path");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const cwd = path.join(__dirname, "..");
const { Storage } = require("@google-cloud/storage"); // Imports the Google Cloud client library
const keyFile = path.join(__dirname + "/secret.json");
const storage = new Storage({ keyFilename: keyFile }); // Creates a client
const myBucket = "secret.appspot.com";
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

function upload(bucketName = myBucket, filename = myFile) {
  // [START storage_upload_file]

  async function uploadFile() {
    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: "public, max-age=31536000",
      },
    });

    //console.log(`${filename} uploaded to ${bucketName}.`);
  }

  uploadFile().catch(console.error);
  // [END storage_upload_file]
}



function loadISSlatlngs() {
  ajax("http://api.open-notify.org/iss-now.json", function (response) {
    //console.log("response: " + response);
    //create a json object
    let json = JSON.parse(response);
    let latlng = [json.iss_position.latitude, json.iss_position.longitude];
    let rawdata = fs.readFileSync(myFile);
    // If error occurs and JSON file is empty
    if(rawdata == ""){
      console.log("EMPTY JSON FILE");
      return;
    }
    let ISSlatlngs = JSON.parse(rawdata);
    console.log(ISSlatlngs.latlngs.length);

    ISSlatlngs.latlngs.unshift(latlng);
    // If latlng points exceed 2880 (every 30 seconds for 24 hours), remove the last one
    if(ISSlatlngs.latlngs.length > 2880){
      ISSlatlngs.latlngs.splice(-1,1);
    }
    let data = JSON.stringify(ISSlatlngs, null, 2);

    fs.writeFileSync(myFile, data);
    upload(...process.argv.slice(2));
  });
}

// Ajax function for handling the local .json file
function ajax(url, fn) {
  try {
    var req = new XMLHttpRequest();
  } catch (e) {
    console.log(e);
  }
  req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
      fn(req.responseText);
    }
  };
  req.open("GET", url, true);
  req.send();
}

// Download ISSdata.json from Google bucket, load current ISS latlngs
// add them into array and into local ISSdata.json, upload into Google bucket
function updateISS() {
  download(...process.argv.slice(2));
  loadISSlatlngs();
}


setInterval(updateISS, 30000);
