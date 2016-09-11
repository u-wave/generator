import * as fs from 'fs';
import * as path from 'path';
import express from 'express';
import uwave from 'u-wave-core';
import createWebApi from 'u-wave-api-v1';
import createWebClient from 'u-wave-web';

const app = express();
const server = app.listen(process.env.PORT || 6041);

const uw = uwave({
  redis: '<%= redis %>',
  mongo: '<%= mongo %>',
});

const api = createWebApi(uw, {
  server,
  secret: fs.readFileSync(
    path.join(__dirname, './config/api-v1-secret.dat')
  ),
});

const client = createWebClient(uw, {
  apiUrl: '/v1',
});

app.use('/v1', api);
app.use('/', client);
