import db from '../Lib/Helpers/db.ts'
import { ErrorHandler } from '../Lib/Helpers/ErrorHandler.ts'

const TodoModel = db.getModel("todo")
export default TodoModel

export interface Todo {
  id: string,
  title: string,
  createdAt: Date,
  updatedAt: Date
}


export class Todo {

  constructor(mongoTodo:any) {
    this.setMongoObject(mongoTodo)
  }

  setMongoObject(mongoTodo:any) {
    if (!mongoTodo) return
    if (mongoTodo.id) {
      this.id = mongoTodo.id
      return
    }
    if (mongoTodo["$oid"]) {
      this.id = mongoTodo["$oid"]
      return
    }
    if (!mongoTodo._id) return
    const { _id: { $oid }, title, createdAt, updatedAt } = mongoTodo;
    this.id = $oid
    this.title = title
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  toObject() {
    return {
      id:this.id,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

  async fill() {
    if (!this.id) throw Error("No id specified for fill Todo model")
    let mongoTodo = await TodoModel.findOne({ _id: { "$oid": this.id } })
    if (!mongoTodo) throw new ErrorHandler(`Unable to find ${this.id} todo`, 404)
    this.setMongoObject(mongoTodo)
  }

  static fromMongo(mongoTodo:any) {
    let todo = new Todo(mongoTodo)
    return todo
  } 
}