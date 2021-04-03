const Koa = require('koa');
const json = require('koa-json');
const logger = require('koa-morgan');
const router = require('./routes/index');
const createError = require('http-errors');

const app = new Koa();

app
  .use(logger('dev'))
  .use(json())
  .use(router.routes())
  .use(router.allowedMethods());

app.use(ctx => {
  ctx.body = {
    success: true,
    data: ctx.data,
  };
});

app.on('error', (err, ctx) => {
  ctx.body = createError(500, 'Unknown thing happened. Try to restart your application');
  ctx.body.success = false;
  console.error(err);
});

module.exports = app;
