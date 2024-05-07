export function formatToBRL(value: number) {
   let formattedValue = value.toString().replace('.', ',')
   formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
   return `R$ ${formattedValue}`
}
