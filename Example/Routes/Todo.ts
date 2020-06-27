import { Router } from 'https://deno.land/x/oak/mod.ts'
import TodoController from '../Controllers/TodoController.ts'

const router = new Router({
  prefix: '/todo'
})

router.get('/', TodoController.getTodos)
      .get('/:id', TodoController.getTodo)
      .post('/', TodoController.addTodo)
      .patch('/:id', TodoController.updateTodo)
      .delete('/', TodoController.deleteAllTodo)
      .delete('/:id', TodoController.deleteTodo)

export default router