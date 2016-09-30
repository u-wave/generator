import Redis from 'ioredis';

const rxAddrNotFound = /getaddrinfo.*ENOTFOUND/;

export default function validateRedis(url) {
  return new Promise((resolve) => {
    const redis = new Redis(url);
    redis.on('ready', () => {
      redis.disconnect();
      resolve(true);
    });
    redis.on('error', error => {
      redis.disconnect();
      if (rxAddrNotFound.test(error.message)) {
        resolve('Could not connect to Redis at that URI.');
      } else {
        resolve(error.message);
      }
    });
  })
}
