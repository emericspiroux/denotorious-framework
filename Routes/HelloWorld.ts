import { Router } from 'https://deno.land/x/oak/mod.ts'

const router = new Router()

router.get('/', async (context:any) => {
          context.response.body = {
            Installed: "Hello World"
          }
        })

export default router