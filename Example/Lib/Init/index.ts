import routers from './routes.ts'
import { Application } from 'https://deno.land/x/oak/mod.ts'
import '../Helpers/SimpleLog/index.ts'
import NotFoundRequest from './NotFoundRequest.ts'
import { ErrorMiddleware } from '../Helpers/ErrorHandler.ts'

/*
** Adding routes contained inside Routes file into app
** @Param {Application} app Deno Application
*/
const initRoutes = (app: Application) => {
  for (let router of routers) {
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
  // app.use(NotFoundRequest)
}

/*
** Initialize framework
** @Param {Application} app Deno Application
*/
const init = (app: Application) => {
  app.use(ErrorMiddleware)
  initRoutes(app)
}

export default {
  init
}