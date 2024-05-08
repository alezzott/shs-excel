import { Form, InputNumber } from 'antd'
import { Rule } from 'antd/es/form'
import { Controller, FieldError } from 'react-hook-form'

interface InputNumberProps {
   control?: any
   name: string
   label: string
   placeholder?: string
   defaultValue?: any
   rules?: Rule[]
   error?: FieldError
   min?: number
   style?: React.CSSProperties
   disabled?: boolean
}

export const InputNumberComponent = ({
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
}: InputNumberProps) => {
   const validateStatus = error ? 'error' : undefined

   return (
      <Form.Item
         label={label}
         name={name}
         rules={rules}
         validateStatus={validateStatus}
         help={error ? error.message : undefined}
      >
         <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field }) => (
               <InputNumber
                  {...field}
                  placeholder={placeholder}
                  min={min}
                  style={style}
                  disabled={disabled}
               />
            )}
         />
      </Form.Item>
   )
}
