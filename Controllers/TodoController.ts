import Todo from '../Types/Todo.ts'
import { UpdateResult } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import TodoModel from '../Models/Todo.ts'

interface TodoController {
  getTodos(): Promise<Todo[]>,
  getTodo(_id:string):Promise<Todo>,
  addTodo(todo: Todo):Promise<Todo>,
  updateTodo(todo:Todo):Promise<UpdateResult>,
  deleteTodo(_id: string):Promise<number>
}

class TodoController {

  static async getTodos():Promise<Todo[]> {
    return await TodoModel.find()
  }

  static async getTodo(_id: string):Promise<Todo> {
    return await TodoModel.findOne({_id})
  }

  static async addTodo(todo: Todo):Promise<Todo> {
    return await TodoModel.insertOne(todo)
  }

  static async updateTodo(todo: Todo):Promise<UpdateResult> {
    return await TodoModel.updateOne(
      { _id: todo._id },
      { $set: todo },
    )
  }

  static async deleteTodo(_id: string):Promise<number> {
    return await TodoModel.deleteOne({_id})
  }
}

export default TodoController