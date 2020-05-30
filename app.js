/* eslint-disable
    max-len,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// zevin's config
const envZ = {
  SHARELATEX_MONGO_URL: "mongodb://172.17.0.1/sharelatex",
  MONGO_HOST: '172.17.0.1',
  SHARELATEX_REDIS_HOST: '172.17.0.1',
  REDIS_HOST: '172.17.0.1',
  WEB_HOST: 'localhost',
  TAGS_HOST: '172.17.0.1',
  CLSI_HOST: '172.17.0.1',
  CHAT_HOST: '172.17.0.1',
  DOCSTORE_HOST: '172.17.0.1',
  SPELLING_HOST: '172.17.0.1',
  FILESTORE_HOST: '172.17.0.1',
  DOCUMENT_UPDATER_HOST: '172.17.0.1',
  NOTIFICATIONS_HOST: '172.17.0.1',
  CONTACTS_HOST: '172.17.0.1',
  LISTEN_ADDRESS: '0.0.0.0',
  REALTIME_HOST: '172.17.0.1',
  TRACK_CHANGES_HOST: '172.17.0.1',
  WEB_API_HOST: 'localhost',
  ENABLE_CONVERSIONS: 'true',
  WEB_API_USER: 'sharelatex',
  ENABLED_LINKED_FILE_TYPES: 'url,project_file',
  WEB_API_PASSWORD: 'rAp8aFvtk77m20PG6Kedzt3iOOrWKJ3pL5eiaQsP6s',
  SESSION_SECRET: 'K1pOaUSsFIoXADLUIgtIh4toKBzgoZS1vHRXNySWQc',
  SHARELATEX_SESSION_SECRET: 'K1pOaUSsFIoXADLUIgtIh4toKBzgoZS1vHRXNySWQc',
  SHAREALTEX_CONFIG:__dirname + '/settings.coffee'
}

for (const key in envZ) {
  process.env[key] = envZ[key];
}

// 
const metrics = require('metrics-sharelatex')
metrics.initialize(process.env['METRICS_APP_NAME'] || 'web')
const Settings = require('settings-sharelatex')
const logger = require('logger-sharelatex')
logger.initialize(process.env['METRICS_APP_NAME'] || 'web')
logger.logger.serializers.user = require('./app/src/infrastructure/LoggerSerializers').user
logger.logger.serializers.docs = require('./app/src/infrastructure/LoggerSerializers').docs
logger.logger.serializers.files = require('./app/src/infrastructure/LoggerSerializers').files
logger.logger.serializers.project = require('./app/src/infrastructure/LoggerSerializers').project
if ((Settings.sentry != null ? Settings.sentry.dsn : undefined) != null) {
  logger.initializeErrorReporting(Settings.sentry.dsn)
}

metrics.memory.monitor(logger)
const Server = require('./app/src/infrastructure/Server')

if (Settings.catchErrors) {
  process.removeAllListeners('uncaughtException')
  process.on('uncaughtException', error =>
    logger.error({ err: error }, 'uncaughtException')
  )
}
const port = Settings.port || Settings.internal.web.port || 3000
const host = Settings.internal.web.host || 'localhost'
// if (!module.parent) {
  // Called directly

  // We want to make sure that we provided a password through the environment.
  if (!process.env['WEB_API_USER'] || !process.env['WEB_API_PASSWORD']) {
    throw new Error('No API user and password provided')
  }
  Server.server.listen(port, host, function() {
    logger.info(`web starting up, listening on ${host}:${port}`)
    logger.info(`${require('http').globalAgent.maxSockets} sockets enabled`)
    // wait until the process is ready before monitoring the event loop
    metrics.event_loop.monitor(logger)
  })
// }

// handle SIGTERM for graceful shutdown in kubernetes
process.on('SIGTERM', function(signal) {
  logger.warn({ signal: signal }, 'received signal, shutting down')
  Settings.shuttingDown = true
})

// module.exports = Server.server
exports.main = test

function test(params={}){
  const runmiddlewareFlag = false;
  // const url = params.url || '/project/5e9724266a66f10065ea52ae/compile';
  const url = params.url || '/status';
  // const method = params.__ow_method || 'post';
  const method = params.__ow_method || 'get';

  const { promisify } = require('util')
  const request = require("request")
  const reqPromise = promisify(request[method]);
  return (async () => {
    let result;
    if (runmiddlewareFlag == true) {
      // result = await invoke(url, { method, body: params });
    } else {
      result = await reqPromise({
        // url: `http://${host}:${port}/${url}`,
        url: `http://localhost:3000${url}`,
        json: params
      })
    }
    return {body: result.body}
  })();
}


if (!module.parent) {
  (async () => {
    let result = await test();
    console.log(result);
  })();
}