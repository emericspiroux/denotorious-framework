import { Router } from 'https://deno.land/x/oak/mod.ts'
import TodoController from '../Controllers/TodoController.ts'

const router = new Router({
  prefix: '/todo'
})

router.get('/', async (context:any) => {
          context.response.body = await TodoController.getTodos()
        })
      .get('/test', async (context:any) => {
        context.response.body = await TodoController.getTodos()
      })

export default router