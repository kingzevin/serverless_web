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
process.env["WEB_API_HOST"] = 'localhost';
process.env["WEB_HOST"] = 'localhost';
process.env["SHARELATEX_MONGO_URL"] = "mongodb://172.17.0.1/sharelatex";
process.env["MONGO_HOST"] = '172.17.0.1';
process.env["SHARELATEX_REDIS_HOST"] = '172.17.0.1';
process.env["REDIS_HOST"] = '172.17.0.1';
process.env["TAGS_HOST"] = '172.17.0.1';
process.env["CLSI_HOST"] = '172.17.0.1';
process.env["CHAT_HOST"] = '172.17.0.1';
process.env["DOCSTORE_HOST"] = '172.17.0.1';
process.env["SPELLING_HOST"] = '172.17.0.1';
process.env["FILESTORE_HOST"] = '172.17.0.1';
process.env["DOCUMENT_UPDATER_HOST"] = '172.17.0.1';
process.env["NOTIFICATIONS_HOST"] = '172.17.0.1';
process.env["CONTACTS_HOST"] = '172.17.0.1';
process.env["LISTEN_ADDRESS"] = '0.0.0.0';
process.env["REALTIME_HOST"] = '172.17.0.1';
process.env["TRACK_CHANGES_HOST"] = '172.17.0.1';
process.env["ENABLE_CONVERSIONS"] = 'true';
process.env["WEB_API_USER"] = 'sharelatex';
process.env["ENABLED_LINKED_FILE_TYPES"] = 'url;project_file';
process.env["SHARELATEX_APP_NAME"] = 'Overleaf Community Edition';
process.env["APP_NAME"] = 'Overleaf Community Edition';
process.env["WEB_API_PASSWORD"] = 'rAp8aFvtk77m20PG6Kedzt3iOOrWKJ3pL5eiaQsP6s';
process.env["SESSION_SECRET"] = 'K1pOaUSsFIoXADLUIgtIh4toKBzgoZS1vHRXNySWQc';
process.env["SHARELATEX_SESSION_SECRET"] = 'K1pOaUSsFIoXADLUIgtIh4toKBzgoZS1vHRXNySWQc';
process.env["SHAREALTEX_CONFIG"] = __dirname + '/settings.coffee';
// process.env["SHARELATEX_ALLOW_PUBLIC_ACCESS"] = 'true';
// process.env["SHARELATEX_ALLOW_ANONYMOUS_READ_AND_WRITE_SHARING"] = 'true';

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
  // const url = params.url || '/project/5ec7b4125cfe83006755763e/compile';
  const url = params.__ow_path || '/favicon.ico';
  // const method = params.__ow_method || 'post';
  const method = params.__ow_method || 'get';
  const headers = params.__ow_headers || {
    'Connection': 'keep-alive',
    'Accept': 'application/json, text/plain, */*',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
    'Content-Type': 'application/json;charset=UTF-8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7,fr;q=0.6',
    'Cookie': 'sharelatex.sid=s%3AVVk1PqK4VnJLoGBMSFYwsoLT4W0yulti.JR4Yj544rl6yg%2BaOoLzky5ke8lS51jrYiYnpLN4MzU4'
  };

  const { promisify } = require('util')
  const request = require("request")
  const reqPromise = promisify(request[method]);
  return (async () => {
    let result;
    if (runmiddlewareFlag == true) {
      // result = await invoke(url, { method, body: params });
    } else {
      result = await reqPromise({
        url: `http://localhost:3000${url}`,
        json: params,
        headers: headers
      })
    }
    var response = JSON.parse(JSON.stringify(result));

    const type = response.headers["content-type"];
    delete response.request
    // if (type.includes("image")) {
    //   // const prefix = "data:" + type + ";base64,";
    //   const prefix = "";
    //   // const base64 = response.body;
    //   const base64 = response.body.toString('base64');
    //   const data = prefix + base64;
    //   // response.setEncoding('binary');
    //   response.body = data
    //   // response["data"] = data
    //   // delete response.body
    // }
    // console.log(response.body)
    return response
  })();
}
// unsupported types:
// woff2, svg, png, ico, woff, .js > 1MB

if (!module.parent) {
  (async () => {
    let result = await test();
    console.log(result);
  })();
}