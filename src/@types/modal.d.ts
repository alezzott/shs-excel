interface ModalProps {
   item: Excel
   onUpdateSuccess: () => void
}

interface BatchEditModalProps {
   items: Excel[]
   open: boolean
   index: number
   onClose: () => void
   onNext: () => void
   onPrevious: () => void
   onFinish: () => void
}
