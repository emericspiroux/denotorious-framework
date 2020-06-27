import { Router } from 'https://deno.land/x/oak/mod.ts'
import { ErrorHandler } from '../Lib/Helpers/ErrorHandler.ts'

const router = new Router()

router.get('/', async (context:any) => {
          context.response.body = {
            Installed: true,
            youAreAwesome:true,
            text:"Hello World"
          }
        })
      .get('/test/error', async (context:any) => {
        throw new ErrorHandler("Succeed to test error", 500)
      })

export default router