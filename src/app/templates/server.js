import * as fs from 'fs';
import * as path from 'path';
import compression from 'compression';
import express from 'express';
import uwave from 'u-wave-core';
import createWebApi from 'u-wave-api-v1';
import createWebClient from 'u-wave-web';
import mediaSources from './sources';
<% if (useReCaptcha) { %>import recaptcha from '../config/recaptcha.json';<% } %>

const app = express();
const server = app.listen(process.env.PORT || 6041);

const uw = uwave({
  redis: '<%= redis %>',
  mongo: '<%= mongo %>',
});

uw.use(mediaSources);

const api = createWebApi(uw, {
  server,
  secret: fs.readFileSync(
    path.join(__dirname, '../config/api-v1-secret.dat')
  ),
<% if (useReCaptcha) { %>  recaptcha: { secret: recaptcha.secret },
<% } -%>
});

const client = createWebClient(uw, {
  apiUrl: '/v1',
  pluginsScriptFile: path.join(__dirname, './webPlugins.js'),
  pluginsStyleFile: path.join(__dirname, './webPlugins.css'),
<% if (useReCaptcha) { %>  recaptcha: { key: recaptcha.key },
<% } -%>
});

app.use(compression());

app.use('/v1', api);
app.use('/', client);
