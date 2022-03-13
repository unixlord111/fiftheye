const AWS = require('aws-sdk');
const exdata = JSON.stringify({
   "hello": "whats up",
   "message": "greetings",
   "date": Date()
});


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
   const s3rex = new RegExp(`^s3://(?<name>[^/]+)/(?<path>.*)`);
   const result = s3rex.exec(uri);
   if (result != null) {
      return {
         "Bucket": result.groups.name,
         "Key": result.groups.path
      };
   }
   throw Error('invalid s3 uri');
}

var args = process.argv.slice(2);
uploadMsg(parseS3Uri(args));
