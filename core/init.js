const Directory = require("require-directory");
const Router = require("koa-router");
const path = require("path");
const errs = require("./http-exception");
const config = require("../config/config");

class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.initLoadRoutes();
    InitManager.loadHttpException();
    InitManager.loadConfig();
  }

  // load方式做一下调整
  static initLoadRoutes() {
    function loadModule(module) {
      if (module instanceof Router) {
        InitManager.app.use(module.routes());
      }
    }
    const modules = Directory(
      module,
      path.resolve(process.cwd(), "./app/api/v1"),
      {
        visit: loadModule,
      }
    );
  }

  static loadHttpException() {
    global.errs = errs;
  }

  static loadConfig() {
    global.config = config;
  }
}

module.exports = InitManager;
