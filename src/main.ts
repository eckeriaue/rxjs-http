import { map } from "rxjs"
import Http from "./Http"
import liHTML from './html-menuitem-template'
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

  $http = new Http

  constructor() {
    this.app.appendChild(this.menu)
    Object.assign(this.menu.style, {
      maxWidth: '685px',
      margin: '0 auto'
    })
    this.menu.classList.add('menu')
    this.$http.GET_TODOS.pipe(
      // transofrm request
      map(todo => liHTML(todo))
    ).subscribe({
      next: todoItem => this.menu.appendChild(todoItem),
      error: e => console.error(e),
      complete: () => this.menu.appendChild(document.createTextNode('todos done'))
    })
  }
}