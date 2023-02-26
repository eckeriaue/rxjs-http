import { ajax } from 'rxjs/ajax'

abstract class CRUD {
  constructor(
    readonly API: string
  ) {}

  private urlgen(url: string): string {
    return `${this.API}${url}`
  }

  private headersgen(headers: object) {
    return {
      'Content-Type': 'application/json',
      ...headers
    }
  }

  private optionsgen(url: string, method: string, headers?: object, body?: object) {
    return {
      url: this.urlgen(url),
      headers: this.headersgen(headers ?? {}),
      method: method,
      body,
    }
  }

  public get(url: string) {
    return ajax.getJSON(this.urlgen(url))
  }

  public post(url: string, {headers, body}: {[key: string]: object}) {
    return ajax(this.optionsgen(url, 'POST', headers, body))
  }
  public put(url: string, {headers, body}: {[key: string]: object})  {
    return ajax(this.optionsgen(url, 'PUT', headers, body))
  }

  public delete(url: string, {headers, body}: {[key: string]: object})  {
    return ajax(this.optionsgen(url, 'DELETE', headers, body))
  }
}

export default class HttpConnect extends CRUD {
  constructor() {
    super('https://jsonplaceholder.typicode.com')
  }
}