export function formatToBRL(value: any) {
   const numberValue = parseFloat(value.replace(',', '.'))
   let formattedValue = numberValue.toFixed(2).replace('.', ',')
   formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
   return `R$ ${formattedValue}`
}
