export default function ({userId, title, completed}: {userId: number, title: string, completed: boolean}) {
  return /*html*/`
  <div class="flex justify-between">
    <div class="flex items-center gap-x-2">
      <span>${userId}</span>
      <span class="truncate" style="max-width: 320px">${title}</span>
    </div>
    <span>${completed ? 'done' : 'await complete'}</span>
  </div>
`
}