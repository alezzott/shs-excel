import { useState, useCallback } from 'react'

type UseDragAndDropProps = {
   onFiles: (files: FileList) => Promise<void>
}

export function useDragAndDrop({ onFiles }: UseDragAndDropProps) {
   const [dragActive, setDragActive] = useState(false)

   const handleDrag = useCallback((e: React.DragEvent<HTMLElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
      if (e.type === 'dragleave') setDragActive(false)
   }, [])

   const handleDrop = useCallback(
      async (e: React.DragEvent<HTMLElement>) => {
         e.preventDefault()
         e.stopPropagation()
         setDragActive(false)
         if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            try {
               await onFiles(e.dataTransfer.files)
            } catch (error) {
               throw new Error('Erro ao obter arquivo')
            }
         }
      },
      [onFiles]
   )

   return { dragActive, handleDrag, handleDrop }
}
