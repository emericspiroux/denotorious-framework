import {Response, Request, RouteParams} from 'https://deno.land/x/oak/mod.ts'
import TodoModel, {Todo} from '../Models/Todo.ts'
import {ErrorHandler} from '../Lib/Helpers/ErrorHandler.ts'

class TodoController {

  static async getTodos(ctx:any) {
    let todoElements = await TodoModel.find()
    let todoObjects = []
    for (let todoElement of todoElements) {
      let newTodoObject = new Todo(todoElement)
      todoObjects.push(newTodoObject.toObject())
    }
    ctx.response.body = todoObjects
  }

  static async getTodo(ctx:any) {
      const { id } = ctx.params as { id: string };
      let todo = Todo.fromMongo(await TodoModel.findOne({ _id: { "$oid": id } }))
      if (todo.id)
        ctx.response.body = todo.toObject();
      else
        throw new ErrorHandler("Todo element not found", 404);
  }

  static async addTodo({request, response} : {request:Request, response:Response}) {
    let body = (await request.body()).value
    let todo = Todo.fromMongo(await TodoModel.insertOne({
      title: body.title,
      createdAt: new Date()
    }))
    await todo.fill()
    response.body = todo.toObject()
  }

  static async updateTodo({params, request, response} : {params:RouteParams, request:Request, response:Response}) {
    let body = (await request.body()).value
    const { id } = params as { id: string };
    await TodoModel.updateOne(
      { _id: { "$oid": id } },
      { $set: {
        title: body.title,
        updatedAt: new Date()
      } },
    )
    let todo = new Todo({
      id: id
    })
    await todo.fill()
    response.body = todo.toObject()
  }

  static async deleteTodo({params, response} : {params:RouteParams, response:Response}) {
    const { id } = params as { id: string };
    response.body = {success: !!await TodoModel.deleteOne({ _id: { "$oid": id } })}
  }

  static async deleteAllTodo({params, response} : {params:RouteParams, response:Response}) {
    const { id } = params as { id: string };
    let count = await TodoModel.deleteMany({})
    response.body = {success: !!count, count}
  }
}

export default TodoController