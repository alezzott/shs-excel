import { Button, Input, Modal } from 'antd'
import { EditTwoTone } from '@ant-design/icons'
import { useState } from 'react'
import { usePatch } from '@/hooks/usePatch'
import { z } from 'zod'
import { ModalSchema } from '@/validators/ModalSchema'
import dayjs from 'dayjs'

export function ModalDetailsItem({ item, onUpdateSuccess }: any) {
   const [open, setOpen] = useState(false)
   const [validationErrors, setValidationErrors] = useState<any>({})
   const [itemData, setItemData] = useState({
      id: item.id,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
   })

   const { mutateAsync: updateMutation, isLoading } = usePatch()

   const handleUpdate = async () => {
      isLoading
      await updateMutation(itemData)
      onUpdateSuccess()
      setOpen(false)
   }

   const handleInputChange = (event: any) => {
      const { name, value } = event.target
      const convertedValue =
         name === 'quantity' || 'price' ? parseInt(value, 10) : value

      setItemData((prevState) => ({
         ...prevState,
         [name]: convertedValue || value,
      }))
      const updatedItemData = {
         ...itemData,
         [name]: convertedValue || value,
      }

      try {
         ModalSchema.parse(updatedItemData)

         setValidationErrors({})
      } catch (error) {
         if (error instanceof z.ZodError) {
            setValidationErrors((prevErrors: any) => ({
               ...prevErrors,
               [name]: error.errors[0].message,
            }))
         }
      }
   }

   return (
      <>
         <Button onClick={() => setOpen(true)}>
            <EditTwoTone />
         </Button>
         <Modal
            title="Detalhes do Item"
            open={open}
            onOk={handleUpdate}
            confirmLoading={isLoading}
            onCancel={() => setOpen(false)}
         >
            <label>ID</label>
            <Input
               variant="outlined"
               disabled
               value={item.id}
               style={{
                  marginBottom: '10px',
               }}
            />

            <label>Cód.</label>
            <Input
               variant="outlined"
               disabled
               type="text"
               placeholder="Cod."
               value={item.code}
               onChange={handleInputChange}
               name="code"
               style={{
                  marginBottom: '10px',
               }}
            />

            <label>Descrição</label>
            <Input
               variant="outlined"
               type="text"
               placeholder="Descrição"
               value={itemData.description}
               onChange={handleInputChange}
               name="description"
               style={{
                  marginBottom: '10px',
                  borderColor: validationErrors.description ? 'red' : '',
               }}
            />
            {validationErrors.description && (
               <div style={{ color: 'red' }}>
                  {validationErrors.description}
               </div>
            )}

            <label>Quantidade</label>
            <Input
               variant="outlined"
               type="number"
               placeholder="Quantidade"
               value={itemData.quantity}
               onChange={handleInputChange}
               name="quantity"
               style={{
                  marginBottom: '10px',
                  borderColor: validationErrors.quantity && 'red',
               }}
            />

            {validationErrors.quantity && (
               <div style={{ color: 'red' }}>{validationErrors.quantity}</div>
            )}

            <label>Preço</label>
            <Input
               variant="outlined"
               type="number"
               placeholder="Preço"
               value={itemData.price}
               onChange={handleInputChange}
               name="price"
               style={{
                  marginBottom: '10px',
                  borderColor: validationErrors.price ? 'red' : '',
               }}
            />
            {validationErrors.price && (
               <div style={{ color: 'red' }}>{validationErrors.price}</div>
            )}

            <label>Preço Total</label>
            <Input
               variant="outlined"
               type="text"
               disabled
               placeholder="Preço Total"
               value={item.total_price}
               onChange={handleInputChange}
               name="total_price"
               style={{
                  marginBottom: '10px',
                  borderColor: validationErrors.total_price ? 'red' : '',
               }}
            />

            <label>Data de Criação</label>
            <Input
               variant="outlined"
               type="text"
               disabled
               placeholder="Data de criação"
               value={item.created_at}
               onChange={handleInputChange}
               name="price"
               style={{
                  marginBottom: '10px',
                  borderColor: validationErrors.created_at ? 'red' : '',
               }}
            />

            <label>Data de Atualização</label>
            <Input
               variant="outlined"
               type="text"
               disabled
               placeholder="Data de Atualização"
               value={dayjs(item.updated_at).format('DD/MM/YYYY HH:mm')}
               onChange={handleInputChange}
               name="price"
               style={{
                  marginBottom: '10px',
                  borderColor: validationErrors.updated_at ? 'red' : '',
               }}
            />
         </Modal>
      </>
   )
}
