import Koa from 'koa';
import koaBody from 'koa-body';
import routes from './routes/routes.js';
import routesView from './routes/productViewRoutes.js';
const views = require('koa-views');
const path = require('path')
const app = new Koa();

app.use(
    views(path.join(__dirname, "views"), {
        extension: "ejs",
    })
)
app.use(koaBody());
app.use(routes.routes());
app.use(routesView.routes())
app.use(routes.allowedMethods());

app.listen(3000);
