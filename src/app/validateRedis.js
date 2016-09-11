import Redis from 'ioredis';

const rxAddrNotFound = /getaddrinfo.*ENOTFOUND/;

export default function validateRedis(url) {
  return new Promise((resolve, reject) => {
    const redis = new Redis(url);
    redis.on('ready', () => {
      redis.disconnect();
      resolve();
    });
    redis.on('error', error => {
      redis.disconnect();
      if (rxAddrNotFound.test(error.message)) {
        reject(new Error('Could not connect to Redis at that URI.'));
      } else {
        reject(error);
      }
    });
  })
}
