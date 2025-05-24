export function formatDate(date: Date): string {
   const formatter = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
   })
   return formatter.format(date)
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
