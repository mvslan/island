const Koa = require("koa");
const InitManager = require("./core/init");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const errCatch = require("./middlewares/exception");

require("./app/models/user");

app.use(errCatch);
app.use(bodyParser());

InitManager.initCore(app);

app.listen(3000);
