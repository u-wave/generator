import mongoose from 'mongoose';

const rxAddrNotFound = /getaddrinfo.*ENOTFOUND/;

export default function validateMongoose(uri) {
  return new Promise((resolve) => {
    const mongo = mongoose.createConnection(uri);
    mongo.on('error', error => {
      mongo.close();
      if (rxAddrNotFound.test(error.message)) {
        resolve('Could not connect to MongoDB at that URI.');
      } else {
        resolve(error.message);
      }
    });
    mongo.on('open', () => {
      mongo.close();
      resolve(true);
    });
  });
}
