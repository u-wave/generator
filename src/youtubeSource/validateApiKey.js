import got from 'got';

const YT_CHECK_URL = 'https://www.googleapis.com/youtube/v3/videos?part=id&id=PB1k7CDVWVk';
export default async function validateApiKey(key) {
  try {
    await got(`${YT_CHECK_URL}&key=${key}`, { json: true });
  } catch (error) {
    const ytError = error.response.body.error;
    const firstError = ytError.errors[0];
    if (firstError.reason === 'keyInvalid') {
      throw new Error('That API key is invalid.');
    }
    throw new Error(
      ytError.errors
        .map(({ message, reason }) => `${message}, reason: ${reason}`)
        .join('; ')
    );
  }
}
