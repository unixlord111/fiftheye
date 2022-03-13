const AWS = require('aws-sdk');

function downloadMsg(parsed) {
   const s3 = new AWS.S3({params: parsed});
   s3.getObject().promise().then((data) => {
      if (data.ContentType != 'application/json') {
         throw Error('only accepting application/json content type');
      }
      parsed = JSON.parse(data.Body.toString());
      if (parsed['message']) {
         console.log(parsed['message']);
      } else {
         throw Error('no message found in JSON');
      }
   }).catch((err) => {
      console.log("oh noe on download: "+err);
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

function main() {
   if (process.env.MSGCLI_S3_URL) {
      downloadMsg(parseS3Uri(process.env.MSGCLI_S3_URL));
   } else {
      var args = process.argv.slice(2);
      if (args[0]) {
         downloadMsg(parseS3Uri(args));
      } else {
         console.log("no idea where you want me to put this");
      }
   }
}

main();
