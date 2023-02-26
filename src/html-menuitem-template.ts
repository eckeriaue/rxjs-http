export default function ({ title, id, completed}: { title: string, id: number, completed: boolean}) {
  return /*html*/`
  <div class="flex justify-between">
    <div class="flex items-center gap-x-2">
      <span>${id}</span>
      <span class="truncate ${completed && 'line-through'}" style="max-width: 320px">${title}</span>
    </div>
    <span class="${completed && 'alert-success'}">${completed ? 'done' : 'await complete'}</span>
  </div>
`
}