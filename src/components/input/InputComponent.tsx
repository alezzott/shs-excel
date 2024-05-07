import { Form, Input } from 'antd'
import React from 'react'
import { Controller } from 'react-hook-form'

interface InputProps {
   control: any
   name: string
   label: string
   placeholder?: string
   defaultValue?: any
   rules?: boolean | any
   error?: any
   min?: number
   style?: React.CSSProperties
   disabled?: boolean
}

export const InputComponent = ({
   control,
   name,
   label,
   placeholder,
   defaultValue,
   rules,
   error,
   min,
   style,
   disabled,
}: InputProps) => {
   return (
      <Form.Item
         label={label}
         name={name}
         rules={rules}
         validateStatus={error ? 'error' : undefined}
         help={error ? error.message : undefined}
         style={style}
      >
         <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field }) => (
               <Input
                  {...field}
                  placeholder={placeholder}
                  min={min}
                  disabled={disabled}
               />
            )}
         />
      </Form.Item>
   )
}
