const Koa = require('koa');
const KoaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new KoaRouter();


// Replace with db
const things = [
  'My Family',
  'Programming',
  'Music'
]

// BodyParser Midleware
app.use(bodyParser());

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
})

// Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);
// Index
async function index(ctx) {
  await ctx.render('index', {
    title: 'Things I Love:',
    things: things
  });
}
// Show Add Page
async function showAdd(ctx) {
  await ctx.render('add');
}
// Add thing
async function add(ctx) {
  const body = ctx.request.body;
  things.push(body.thing);
  ctx.redirect('/');
}

// Test
router.get('/test', ctx => (ctx.body = 'Hello World!'));


// Router Midleware
app.use(router.routes()).use(router.allowedMethods());


app.listen(3000, () => console.log('Server Started on Port: 3000'));