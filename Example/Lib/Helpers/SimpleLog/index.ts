const { inspect } = Deno;

interface Dictionary {
  [key: string]: number;
}

interface SimpleLog {
  levels: Dictionary,
  level: number,
  debugLevel: boolean,
  format(...args: any[]): string,
  debug(...args: any[]): void,
  custom(name: string, ...args:any[]): void
}

class SimpleLog {

  constructor() {
    let debugLevelEnv = Deno.env.get('DEBUG_LEVEL')
    this.levels = {
      none: 0,
      error: 1,
      warn: 2,
      info: 3,
      debug: 4,
      all: 4
    }
    this.level = debugLevelEnv ? this.levels[debugLevelEnv.toLowerCase()] : 0 
  }

  get isDebug() {
    return this.debugLevel
  }

  set setDebug(value:boolean) {
    this.debugLevel = value
  }

  format(...args:any[]) {
    let result = [];
    for (let arg of arguments) {
      switch (typeof arg) {
        case "string":
          result.push(arg);break
        case "function":
          result.push(arg.toString());break
        default:
          result.push(inspect(arg));break
      }
    }
    return result.join(' ');
  }

  custom(name: string, ...args:any[]) {
    console.log(`[${new Date()}][${name}]`, this.format(...args))
  }

  debug(...args:any[]) {
    if (this.level >= this.levels.error)
      this.custom("DEBUG", ...args)
  }

  error(...args:any[]) {
    this.custom("ERROR", ...args)
  }
}

const log = new SimpleLog()

export default log