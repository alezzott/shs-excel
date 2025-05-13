import React from 'react'
import {
   Control,
   Controller,
   FieldError,
   FieldValues,
   Path,
} from 'react-hook-form'
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

interface InputProps<T extends FieldValues = FieldValues> {
   control?: Control<T>
   name: Path<T> | 'created_at' | 'updated_at' | 'total_price' | 'id'
   label: string
   placeholder?: string
   defaultValue?: any
   error?: FieldError
   min?: number
   style?: React.CSSProperties
   disabled?: boolean
}

export const InputComponent = <T extends FieldValues = FieldValues>({
   control,
   name,
   label,
   placeholder,
   defaultValue,
   error,
   min,
   style,
   disabled,
}: InputProps<T>) => {
   return (
      <FormItem style={style}>
         <FormLabel>{label}</FormLabel>
         <FormControl>
            <Controller
               control={control}
               name={name as Path<T>}
               defaultValue={defaultValue}
               render={({ field }) => (
                  <Input
                     {...field}
                     placeholder={placeholder}
                     min={min}
                     disabled={disabled}
                     className={
                        error
                           ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                           : ''
                     }
                  />
               )}
            />
         </FormControl>
         <FormMessage className="block min-h-[1.25rem] text-xs">
            {error?.message}
         </FormMessage>
      </FormItem>
   )
}
