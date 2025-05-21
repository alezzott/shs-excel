import { useState } from 'react'
import { usePatch } from '@/hooks/usePatch'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { formatToBRL } from '@/app/api/utils/FormatCurrency'
import { InputComponent } from '../input/InputComponent'
import { InputNumberComponent } from '../input/InputNumberComponent'
import { modalSchema } from '@/validators/ModalSchema'
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

type ModalSchema = z.infer<typeof modalSchema>

interface ModalProps {
   item: Excel
   onUpdateSuccess: () => void
}

export function ModalDetailsItem({ item, onUpdateSuccess }: ModalProps) {
   const [open, setOpen] = useState(false)
   const { mutateAsync: updateMutation, isPending } = usePatch()

   const methods = useForm<ModalSchema>({
      resolver: zodResolver(modalSchema),
   })

   const {
      control,
      handleSubmit,
      formState: { errors, isDirty },
   } = methods

   const handleUpdate = async (data: any) => {
      const updatedItem = {
         id: item.id,
         ...data,
      }

      try {
         await updateMutation(updatedItem)
         onUpdateSuccess()
         toast.success('Atualizado com sucesso !')
      } catch (error) {
         toast.error('Erro ao tentar atualizar o item, tente novamente')
      }
      setOpen(false)
   }

   return (
      <>
         <Dialog open={open} onOpenChange={setOpen} modal={true}>
            <DialogTrigger asChild>
               <Button
                  onClick={() => setOpen(true)}
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
                        <DialogClose asChild>
                           <Button
                              type="button"
                              variant="outline"
                              disabled={isPending}
                              onClick={() => setOpen(false)}
                           >
                              Cancelar
                           </Button>
                        </DialogClose>
                        <Button
                           type="submit"
                           className="flex items-center justify-center bg-green-500 text-white"
                           disabled={!isDirty || isPending}
                        >
                           {isPending && (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                           )}
                           Salvar
                        </Button>
                     </DialogFooter>
                  </form>
               </Form>
            </DialogContent>
         </Dialog>
      </>
   )
}
