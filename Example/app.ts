import { Application } from 'https://deno.land/x/oak/mod.ts'
import DenotoriousInit from './Lib/Init/index.ts'

const app = new Application()

DenotoriousInit.init(app)

const port = Number(Deno.env.get("PORT")) || 8000

console.log(`Application ${Deno.env.get('VERSION') || "1.0.0"} running on port ${port}`)
await app.listen({ port })