const AWS = require('aws-sdk');
const exdata = JSON.stringify({
   "hello": "whats up",
   "message": "greetings",
   "date": Date()
});

function downloadMsg(parsed) {
   const s3 = new AWS.S3({params: parsed});
   s3.getObject().promise().then((data) => {
      if (data.ContentType != 'application/json') {
         throw Error('only accepting application/json content type');
      }
      parsed = JSON.parse(data.Body.toString());
      if (parsed['message']) {
         console.log(parsed);
      } else {
         throw Error('no message found in JSON');
      }
   }).catch((err) => {
      console.log("oh noe on download: "+err);
   });
}

function uploadMsg(parsed) {
   const s3 = new AWS.S3({params: parsed});
   upload = s3.upload({Body: exdata, ContentType: 'application/json'});
   s3.headBucket().promise().then(() => {
      upload.promise().then(() => {
         console.log("uploaded.");
      }).catch((err) => {
         console.log("oh noe upload failed."+err);
      });
   }).catch((err) => {
      console.log("cant access bucket."+err);
      process.exit(2);
   });
}

function parseS3Uri(uri) {
   // TODO: needs to take single dir s3 urls.
   const s3rex = new RegExp(`^s3://(?<name>[^/]+)/(?<path>.*/(?<file>.*))`);
   const result = s3rex.exec(uri);
   if (result != null) {
      return {
         "Bucket": result.groups.name,
         "Key": result.groups.path
      };
   }
   throw Error('invalid s3 uri');
}

function main() {
   var args = process.argv.slice(2);
   if (!args) {
      downloadMsg(parseS3Uri(args));
   } else {
      if (process.env.MSGCLI_S3_URL) {
         downloadMsg(parseS3Uri(process.env.MSGCLI_S3_URL));
      }
   }
}

//uploadMsg(parseS3Uri(args));
