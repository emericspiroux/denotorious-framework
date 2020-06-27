import "../Helpers/db.ts"
import "https://deno.land/x/dotenv/load.ts";
import getFiles from "https://deno.land/x/getfiles/mod.ts"
import log from '../Helpers/SimpleLog/index.ts'


async function findRoutesFiles() {
  let importedRoutes:any[] = []

  const files = getFiles({
    root:"./Routes",
    ignore: ["./Routes/index.ts"]
  })

  if (!(files.length > 0))
    throw Error("No routes detected")

  for (let file of files) {
    try {
      const route = await import(`${Deno.env.get("PWD")}/Routes/${file.name}`)
      importedRoutes.push(route.default)
    } catch (err) {log.error(err)}
  }

  log.debug("Included routes :", files.map(e=>e.name).join(" "))

  if (!(importedRoutes.length > 0)) throw Error("Error on routes")
  return importedRoutes
}

let routes =  await findRoutesFiles()

export default routes