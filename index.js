const vision = require("@google-cloud/vision");
/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.checkImageOnUpload = async (event, context) => {
  const file = event;

  const client = new vision.ImageAnnotatorClient();

  const [result] = await client.safeSearchDetection(
    `gs://${file.bucket}/${file.name}`
  );

  const detections = result.safeSearchAnnotation;
  console.log(`File: ${file.name}`);
  console.log(`Adult: ${detections.adult}`);
  console.log(`Spoof: ${detections.spoof}`);
  console.log(`Medical: ${detections.medical}`);
  console.log(`Violence: ${detections.violence}`);
};
