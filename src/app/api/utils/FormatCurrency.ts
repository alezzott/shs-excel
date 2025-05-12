export function formatToBRL(value: any) {
   const numberValue = parseFloat(value.replace(',', '.'))
   let formattedValue = numberValue.toFixed(2).replace('.', ',')
   formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
   return `R$ ${formattedValue}`
}
export function maskFormatBRL(value: number | string) {
   if (value === '' || value === null || value === undefined) return ''
   const number =
      typeof value === 'number'
         ? value
         : Number(value.toString().replace(/\D/g, '')) / 100
   return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function parseBRLValue(value: string) {
   const onlyNums = value.replace(/\D/g, '')
   return onlyNums ? Number(onlyNums) / 100 : 0
}
