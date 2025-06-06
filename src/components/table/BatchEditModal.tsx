import { useCallback, useEffect, useState } from 'react'
import { usePatch } from '@/hooks/usePatch'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatToBRL } from '@/app/shared/utils/format-currency'
import { InputComponent } from '../input/InputComponent'
import { InputNumberComponent } from '../input/InputNumberComponent'
import { ModalPatchInput, modalPatchSchema } from '@/validators/modal-schema'
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '../ui/dialog'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Edit, Loader2 } from 'lucide-react'
import { Form } from '../ui/form'
import {
   filterFields,
   handleUpdateItemAtIndex,
} from '@/app/shared/utils/allowed-fields'

export function BatchEditModal({
   items,
   open,
   index,
   onClose,
   onNext,
   onPrevious,
   onFinish,
}: BatchEditModalProps) {
   const item = items[index]
   const isFirst = index === 0
   const isLast = index === items.length - 1

   const [editedItems, setEditedItems] = useState(items)
   const { mutateAsync: updateMutation, isPending } = usePatch()

   const methods = useForm<ModalPatchInput>({
      resolver: zodResolver(modalPatchSchema),
   })

   const {
      control,
      handleSubmit,
      formState: { errors, isDirty },
   } = methods

   useEffect(() => {
      methods.reset({
         id: item.id,
         description: item.description,
         quantity: item.quantity as number,
         price: item.price as number,
      })
   }, [item, methods])

   const handleLocaleSave = useCallback(() => {
      const data = methods.getValues()
      setEditedItems((prev) => handleUpdateItemAtIndex(prev, index, data))
   }, [index, methods])

   const handleNavigateItem = async (navigate: () => void) => {
      const valid = await methods.trigger()
      if (!valid) return
      handleLocaleSave()
      navigate()
   }

   const handleUpdate = async () => {
      const valid = await methods.trigger()
      if (!valid) return

      const data = methods.getValues()
      const updatedItems = handleUpdateItemAtIndex(editedItems, index, data)
      const itemsToSend = updatedItems.map(filterFields)

      try {
         await Promise.all(itemsToSend.map((item) => updateMutation(item)))
         toast.success('Todos os itens atualizados com sucesso!')
         onFinish()
      } catch {
         toast.error('Erro ao atualizar os itens.')
      }
   }

   return (
      <>
         <Dialog open={open} onOpenChange={(v) => !v && onClose()} modal>
            <DialogTrigger asChild>
               <Button
                  variant="outline"
                  className="group border-green-500 text-green-600 hover:bg-green-500"
                  type="button"
                  size="icon"
               >
                  <Edit className="h-4 w-4 transition-colors group-hover:text-green-100" />
               </Button>
            </DialogTrigger>
            <DialogContent
               onPointerDownOutside={(e) => e.preventDefault()}
               className="max-h-[80vh] min-h-[400px] overflow-y-auto max-lg:max-w-xl lg:max-w-4xl"
            >
               <DialogHeader>
                  <DialogTitle>Detalhes do Item</DialogTitle>
               </DialogHeader>
               <Form {...methods}>
                  <form
                     onSubmit={handleSubmit(handleUpdate)}
                     className="space-y-4"
                     autoComplete="off"
                  >
                     <section className="flex items-start gap-4">
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
                     </section>
                     <InputComponent
                        control={control}
                        name="description"
                        label="Descrição"
                        placeholder="Descrição"
                        defaultValue={item.description}
                        error={errors.description}
                     />
                     <section className="flex items-start gap-4">
                        <InputNumberComponent
                           control={control}
                           name="quantity"
                           label="Quantidade"
                           placeholder="Quantidade"
                           defaultValue={item.quantity || 0}
                           error={errors.quantity}
                           style={{ width: '100%' }}
                           disabled={false}
                           min={1}
                        />
                        <InputNumberComponent
                           control={control}
                           name="price"
                           label="Preço"
                           placeholder="Preço"
                           defaultValue={item.price}
                           error={errors.price}
                           style={{ width: '100%' }}
                           formatBRL={true}
                        />
                        <InputComponent
                           control={control}
                           name="total_price"
                           label="Preço Total"
                           placeholder="Preço Total"
                           defaultValue={formatToBRL(item.total_price || 0)}
                           disabled={true}
                           style={{ width: '100%' }}
                        />
                     </section>
                     <section className="flex items-start gap-4">
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
                     </section>
                     <DialogFooter>
                        {!isFirst && (
                           <Button
                              type="button"
                              variant="outline"
                              onClick={() => handleNavigateItem(onPrevious)}
                              disabled={isPending}
                           >
                              Anterior
                           </Button>
                        )}
                        {!isLast ? (
                           <Button
                              type="button"
                              className="flex items-center justify-center bg-green-500 text-white hover:bg-green-600"
                              onClick={() => handleNavigateItem(onNext)}
                              disabled={isPending || !isDirty}
                           >
                              Próximo
                           </Button>
                        ) : (
                           <Button
                              type="submit"
                              className="flex items-center justify-center bg-green-500 text-white hover:bg-green-600"
                              onClick={handleUpdate}
                              disabled={isPending || !isDirty}
                           >
                              {isPending && (
                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              )}
                              Finalizar
                           </Button>
                        )}
                        <DialogClose asChild>
                           <Button
                              type="button"
                              variant="outline"
                              disabled={isPending}
                              onClick={onClose}
                           >
                              Cancelar
                           </Button>
                        </DialogClose>
                     </DialogFooter>
                  </form>
               </Form>
            </DialogContent>
         </Dialog>
      </>
   )
}
