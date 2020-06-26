import routers from './routes.ts'
import { Application } from 'https://deno.land/x/oak/mod.ts'
import '../Helpers/SimpleLog/index.ts'

/*
** Adding routes contained inside Routes file into app
** @Param {Application} app Deno Application
*/
const initRoutes = (app: Application) => {
  for (let router of routers) {
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}

/*
** Initialize framework
** @Param {Application} app Deno Application
*/
const init = (app: Application) => {
  initRoutes(app)
}

export default {
  init
}