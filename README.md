# Denotorious Framework
The most notorious framework for DenoJS

## Hello World
Launch `./start.sh` to begin adventure !

Go to `http://localhost:8080` and check if `{"Installed":"Hello World"}` is displayed

## Configuration
Simply modify `.env` file with your configuration :

- DEBUG_LEVEL: Debug log display level. Can be NONE, ERROR, WARN, INFO, DEBUG or ALL (case insensitive)
- VERSION: Your app version (Default: 1.0.0)
- PORT: Port where DenoJS will be launched (Default: 8000)
- MONGO_DB_URL: Mongo Database url (Default:mongodb://localhost:27017)
- MONGO_DB_NAME: Mongo database name (Default: denotorious)

## Add Routes

Denotorious Framework just need a new file into `./Routes` folder and will automatically include it into your project. 

Specify a prefix to choose the url route for this one :

```
const router = new Router({
  prefix: '/todo'
})
```

## Mongo DB
⚠️ Don't work yet ! We are waiting for a new realease of the mongoDB denoJS library, stay tuned ! ⚠️

### Add Models
You can can db at path `import db from '../Lib/Helpers/db.ts'` but simply copy `./Models/Example.ts` exemple and specify your model name :

```
import db from '../Lib/Helpers/db.ts'

export default db.getModel("<Your model name>")
```
