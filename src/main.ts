import { interval, map } from "rxjs"
import Http from "./Http"
import { switchMap } from "rxjs/internal/operators/switchMap"
import { take } from "rxjs/internal/operators/take"

/**
 * this methodology assumes use ONLY IN THE CORE of the project
 * for easier interaction!
 * 
 * class App acts as component
 * basic component flow is:
 * import $http form 'http'
 * 
 * const list = ref([])
 * 
 * $http.get('/todos').subscribe(requestList => {
 *  list.value.push(...requestList)
 * })
 * 
 * it's like promise, but subscribe can be used again
 * 
 * const list = ref([])
 * const status = ref('LOADING')
 * $http.get('/toods')
 * .then(res => res.json())
 * .then(res => list.value.push(...res))
 * .catch(e => throw new Error(e.message))
 * .finally(() => status.value = 'READY')
 * 
 * 
 * VS
 * 
 * 
 * const list = ref([])
 * const mappedList = ref([])
 * const status = ref('LOADING')
 * const stream$ = $http.get('/todos')
 * stream$.subscribe({
 *  next: res => list.value.push(...res),
 *  error: err => trow new Error(err.message),
 *  complete: () => status.value = 'READY'
 * })
 * 
 * and transorming✨
 * if needed only names with "N" first letter
 * const onlyNames$ = stream$.pipe(
 *  map(res => res.title),
 *  filter(titles => titles[0] === 'N')
 * )
 * 
 * onlyNames$.subscribe({
 *  next: res => mappedList.value.push(...res),
 *  error: err => trow new Error(err.message),
 *  complete: () => status.value = 'READY'
 * })
*/
new class App {
  private app = document.querySelector('#app') as HTMLElement
  private menu = document.createElement('menu') as HTMLMenuElement
  private $http = new Http

  list = []
  constructor() {
    this.app.appendChild(this.menu)
    this.getListAsHTMLLiItems(this.menu)
  }

  
  /**
   * push item every second
   * )
  */
  private getListAsHTMLLiItems(to: HTMLMenuElement) {
    const stream$ = interval(1000).pipe(
      take(20),
      switchMap(index => {
        return this.$http.get('/todos').pipe(
          map(req => (req as {title: string}[])[index]),
          map((item: {title: string}) => {
            const li = document.createElement('li')
            li.textContent = item.title
            return li
          })
        )
      }),
    )
    stream$.subscribe(li => to.appendChild(li))
    /**
     * by vue 
     * stream$.subscribe(li => (list as Ref<string[]>).value.push(..li))
    */
  }
}