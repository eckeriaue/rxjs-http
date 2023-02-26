import { ajax } from 'rxjs/ajax'

abstract class HttpConnect {
  constructor(
    protected API: string
  ) {}

  private urlgen(url: string): string {
    return `${this.API}${url}`
  }

  public get(url: string) {
    return ajax.getJSON(this.urlgen(url))
  }

  public post(url: string, {headers, body}: {[key: string]: object}) {
    headers = {
      'Content-Type': 'application/json',
      ...headers
    }
    ajax({
      url: this.urlgen(url),
      method: 'POST',
      headers,
      body,
    })
  }
  public put() {}
  public delete() {}
}

export default class Http extends HttpConnect {
  constructor() {
    super('https://jsonplaceholder.typicode.com')
  }
}