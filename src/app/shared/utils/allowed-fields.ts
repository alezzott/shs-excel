const ALLOWED_FIELDS = ['id', 'description', 'quantity', 'price']

export function filterFields(item: any) {
   const filtered: any = {}
   ALLOWED_FIELDS.forEach((field) => {
      filtered[field] =
         field === 'quantity' || field === 'price'
            ? Number(item[field])
            : item[field]
   })
   return filtered
}

export function handleUpdateItemAtIndex<T>(
   array: T[],
   index: number,
   newItem: Partial<T>
): T[] {
   return array.map((item, idx) =>
      idx === index ? { ...item, ...newItem } : item
   )
}
