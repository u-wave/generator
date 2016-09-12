import got from 'got';

const invalid = 'Invalid secret. You can find your site secret at ' +
  'https://www.google.com/recaptcha/admin under "Server side integration".';

export default async function validateSecret(secret) {
  const { body } = await got('https://www.google.com/recaptcha/api/siteverify', {
    method: 'post',
    body: { secret },
    json: true,
  });
  const errors = body['error-codes'];
  if (errors) {
    if (errors.indexOf('missing-input-secret') !== -1 ||
        errors.indexOf('invalid-input-secret') !== -1) {
      throw new Error(invalid);
    }
  }
}
