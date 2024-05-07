import { Button, Form, Modal, message } from 'antd'
import { EditTwoTone } from '@ant-design/icons'
import { useState } from 'react'
import { usePatch } from '@/hooks/usePatch'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { formatToBRL } from '@/app/api/utils/FormatCurrency'
import { InputComponent } from '../input/InputComponent'
import { InputNumberComponent } from '../input/InputNumberComponent'
import { modalSchema } from '@/validators/ModalSchema'
import styles from './Modal.module.scss'

type ModalSchema = z.infer<typeof modalSchema>

export function ModalDetailsItem({ item, onUpdateSuccess }: any) {
   const [open, setOpen] = useState(false)
   const [messageApi, contextHolder] = message.useMessage()
   const { mutateAsync: updateMutation, isLoading } = usePatch()
   const {
      control,

      handleSubmit,
      formState: { errors },
   } = useForm<ModalSchema>({
      resolver: zodResolver(modalSchema),
   })

   const handleUpdate = async (data: any) => {
      const updatedItem = {
         id: item.id,
         ...data,
      }

      try {
         await updateMutation(updatedItem)
         onUpdateSuccess()
         messageApi.open({
            type: 'success',
            content: 'Sucesso !',
         })
      } catch (error) {
         messageApi.open({
            type: 'error',
            content: 'Erro ao atualizar o item',
         })
      }

      setOpen(false)
   }

   return (
      <>
         <Button
            onClick={() => setOpen(true)}
            style={{ border: '1px solid #22c55e' }}
         >
            <EditTwoTone twoToneColor="#22c55e" />
         </Button>
         <Modal
            title="Detalhes do Item"
            open={open}
            onOk={handleSubmit(handleUpdate)}
            confirmLoading={isLoading}
            onCancel={() => setOpen(false)}
         >
            <Form
               scrollToFirstError
               layout="vertical"
               autoComplete="off"
               variant="outlined"
            >
               {contextHolder}

               <div className={styles['input-align']}>
                  <InputComponent
                     control={control}
                     name="id"
                     label="ID do Item"
                     placeholder="ID do Item"
                     defaultValue={item.id}
                     disabled={true}
                     style={{ width: '100%' }}
                  />

                  <InputComponent
                     control={control}
                     name="description"
                     label="Descrição"
                     placeholder="Descrição"
                     defaultValue={item.description}
                     disabled={true}
                     style={{ width: '100%' }}
                  />
               </div>

               <InputComponent
                  control={control}
                  name="description"
                  label="Descrição"
                  placeholder="Descrição"
                  defaultValue={item.description}
                  rules={[{ required: true }]}
                  error={errors.description}
               />

               <div className={styles['input-align']}>
                  <InputNumberComponent
                     control={control}
                     name="quantity"
                     label="Quantidade"
                     placeholder="Quantidade"
                     defaultValue={item.quantity || 0}
                     error={errors.quantity}
                     style={{ width: '100%' }}
                     disabled={false}
                     status={errors.quantity && 'error'}
                  />

                  <InputNumberComponent
                     control={control}
                     name="price"
                     label="Price"
                     placeholder="Price"
                     defaultValue={formatToBRL(item.price || 0)}
                     error={errors.price}
                     style={{ width: '100%' }}
                     disabled={false}
                     status={errors.price && 'error'}
                  />

                  <InputComponent
                     control={control}
                     name="total_price"
                     label="Preço Total"
                     placeholder="Preço Total"
                     defaultValue={formatToBRL(item.total_price)}
                     disabled={true}
                  />
               </div>

               <div className={styles['input-align']}>
                  <InputComponent
                     control={control}
                     name="created_at"
                     label="Data de criação"
                     placeholder="Data de criação"
                     defaultValue={item.created_at}
                     disabled={true}
                     style={{ width: '100%' }}
                  />

                  <InputComponent
                     control={control}
                     name="updated_at"
                     label="Data de atualização"
                     placeholder="Data de atualização"
                     defaultValue={item.updated_at}
                     disabled={true}
                     style={{ width: '100%' }}
                  />
               </div>
            </Form>
         </Modal>
      </>
   )
}
