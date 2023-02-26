export default function ({title, id, completed}: {title: string, id: number, completed: boolean}): HTMLLIElement {
  const content = /*html*/`
    <div class="flex justify-between">
      <div class="flex items-center gap-x-2">
        <b>${id}.</b>
        <span class="truncate ${completed && 'line-through'}" style="max-width: 320px">${title}</span>
      </div>
      <span class="${completed && 'alert-success'} p-2 rounded">${completed ? 'done' : 'await complete'}</span>
    </div>
  `
  const li = document.createElement('li')
  li.innerHTML = content
  return li
}