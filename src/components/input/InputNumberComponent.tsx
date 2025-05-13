import {
   Control,
   Controller,
   FieldError,
   FieldValues,
   Path,
} from 'react-hook-form'
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { maskFormatBRL, parseBRLValue } from '@/app/api/utils/FormatCurrency'

interface InputNumberProps<T extends FieldValues = FieldValues> {
   control: Control<T>
   name: Path<T>
   label: string
   placeholder?: string
   defaultValue?: any
   error?: FieldError
   min?: number
   style?: React.CSSProperties
   disabled?: boolean
   formatBRL?: boolean
}

export function InputNumberComponent<T extends FieldValues = FieldValues>({
   control,
   name,
   label,
   placeholder,
   defaultValue,
   error,
   min,
   style,
   disabled,
   formatBRL = false,
}: InputNumberProps<T>) {
   return (
      <FormItem style={style}>
         <FormLabel>{label}</FormLabel>
         <FormControl>
            <Controller
               control={control}
               name={name}
               defaultValue={defaultValue}
               render={({ field }) =>
                  formatBRL ? (
                     <Input
                        {...field}
                        type="text"
                        inputMode="numeric"
                        placeholder={placeholder}
                        disabled={disabled}
                        value={maskFormatBRL(field.value)}
                        onChange={(e) => {
                           const parsed = parseBRLValue(e.target.value)
                           field.onChange(parsed)
                        }}
                        className={
                           error
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                              : ''
                        }
                     />
                  ) : (
                     <Input
                        {...field}
                        type="number"
                        placeholder={placeholder}
                        min={min}
                        disabled={disabled}
                        step="any"
                        className={
                           error
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                              : ''
                        }
                     />
                  )
               }
            />
         </FormControl>
         <FormMessage className="block min-h-[1.25rem] text-xs">
            {error?.message}
         </FormMessage>
      </FormItem>
   )
}
