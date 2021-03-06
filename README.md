# Denotorious Framework
The most notorious framework for DenoJS

This framework will help you to not wasting time to beginning a new DenoJS project.

Easyness, Simpleness and efficiency in a same folder.

## Hello World

First, install DenoJs package : https://deno.land/#installation

Launch `./start.sh` to begin adventure!

Go to `http://localhost:8000` and check if `json` object is displayed _(It content is a secret 🤫)_

## Configuration
Simply modify `.env` file with your configuration:

- DEBUG_LEVEL: Debug log display level. Can be NONE, ERROR, WARN, INFO, DEBUG or ALL (case insensitive)
- VERSION: Your app version (Default: 1.0.0)
- PORT: Port where DenoJS will be launched (Default: 8000)
- MONGO_DB_URL: Mongo Database url (Default:mongodb://localhost:27017)
- MONGO_DB_NAME: Mongo database name (Default: denotorious)

## Add Routes

Denotorious Framework just need a new file into `./Routes` folder and will automatically include it into your project. 

Specify a prefix to choose the url route for this one:

```
const router = new Router({
  prefix: '/todo'
})
```

## Error Handling
Denotorious Framework come with an errors middleware handler simply called ErrorHandler that you can use as following:

```
import { ErrorHandler } from '../Lib/Helpers/ErrorHandler.ts'

throw new ErrorHandler("Succeed to test error", 500)
```

This method permit to display internal errors inside terminal and return handled thrown errors inside response body!

👨‍🎓 We will implement object support soon

## Mongo DB
Worked with version `>=4.2.8`

### Add Models
You can import db at path `import db from '../Lib/Helpers/db.ts'` but simply copy `./Models/Example.ts` exemple and specify your model name:

```
import db from '../Lib/Helpers/db.ts'

export default db.getModel("<Your model name>")
```

Check [`Example/models/todo.ts`](https://github.com/emericspiroux/denotorious-framework/blob/master/Example/Models/Todo.ts) for further inspirations

### How to use a model
You can directly use your model like specified into DenoJS MongoDB module documentation : https://deno.land/x/mongo

```
static async getTodo(ctx:any) {
    const { id } = ctx.params as { id: string };
    let todo = await TodoModel.findOne({ _id: { "$oid": id } })
    if (todo)
      ctx.response.body = todo;
    else
      throw new ErrorHandler("Todo element not found", 404);
}
```

## More DenoJS modules
To get more DenoJS module, you can go to the page https://deno.land/x and looking for any module you want !
