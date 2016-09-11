import mongoose from 'mongoose';

const rxAddrNotFound = /getaddrinfo.*ENOTFOUND/;

export default function validateMongoose(uri) {
  return new Promise((resolve, reject) => {
    const mongo = mongoose.createConnection(uri);
    mongo.on('error', error => {
      mongo.close();
      if (rxAddrNotFound.test(error.message)) {
        reject(new Error('Could not connect to MongoDB at that URI.'));
      } else {
        reject(error);
      }
    });
    mongo.on('open', () => {
      mongo.close();
      resolve();
    });
  });
}
