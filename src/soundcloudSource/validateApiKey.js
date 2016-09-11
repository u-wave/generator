import got from 'got';

const SC_CHECK_URL = 'http://api.soundcloud.com/tracks/13158665';
export default async function validateApiKey(key) {
  try {
    await got(`${SC_CHECK_URL}?client_id=${key}`);
  } catch (error) {
    const { errors } = error.response.body;
    if (!errors || /401 - Unauthorized/.test(errors[0].error_message)) {
      throw new Error('That API key is invalid.');
    }
    throw new Error(
      errors.map(scError => scError.error_message).join('; ')
    );
  }
}
