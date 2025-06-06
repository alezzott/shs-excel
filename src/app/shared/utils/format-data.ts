export function formatDate(date: Date): string {
   const d = new Date(date)
   const pad = (n: number) => n.toString().padStart(2, '0')
   return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} - ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

export function formatItemsDate<
   T extends { created_at: Date; updated_at: Date },
>(items: T[]): T[] {
   return items.map((item) => ({
      ...item,
      created_at: formatDate(item.created_at),
      updated_at: formatDate(item.updated_at),
   }))
}
