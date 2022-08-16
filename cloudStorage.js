const { Storage } = require("@google-cloud/storage");

const cloudStorage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: "./credentials.json",
});

async function generateV4ReadSignedUrl(bucketName, fileName) {
  // These options will allow temporary read access to the file
  const options = {
    version: "v4",
    action: "read",
    expires: Date.now() + 1 * 60 * 1000, // 1 minutes
  };

  // Get a v4 signed URL for reading the file
  const [url] = await cloudStorage
    .bucket(bucketName)
    .file(fileName)
    .getSignedUrl(options);

//   console.log("Generated GET signed URL:");
//   console.log(url);
  return url;
}

module.exports = { generateV4ReadSignedUrl };
