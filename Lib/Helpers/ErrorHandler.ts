import { MiddlewareFunc } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import log from "./SimpleLog/index.ts";
export class ErrorHandler extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
export const ErrorMiddleware = async (c:any, next:Function) =>{
  try {
    await next(c);
  } catch (err) {
    if (err instanceof ErrorHandler) {
      const error = err as ErrorHandler;
      c.response.status = error.status || 500;
      c.response.body = {code: error.status, message: error.message};
    } else {
      log.error("Internal Error :", err)
      c.response.body = {code: 500, message: "Internal error"};
    }
  }
};