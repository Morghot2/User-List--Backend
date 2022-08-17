const { Storage } = require("@google-cloud/storage");

const cloudStorage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: "./GCP/credentials.json",
});

async function generateV4ReadSignedUrl(bucketName, fileName) {
  const options = {
    version: "v4",
    action: "read",
    expires: Date.now() + 1 * 60 * 1000,
  };

  const [url] = await cloudStorage
    .bucket(bucketName)
    .file(fileName)
    .getSignedUrl(options);

  return url;
}
const createBucket = async (bucketName) => {
  const [bucket] = await cloudStorage.createBucket(bucketName);
  console.log(`Bucket ${bucket.name} created.`);
};

module.exports = { generateV4ReadSignedUrl, createBucket };
