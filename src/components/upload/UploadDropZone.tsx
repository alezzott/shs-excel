import { Inbox } from 'lucide-react'

interface UploadDropZoneProps {
   uploading: boolean
   dragActive: boolean
   onDragEnter: React.DragEventHandler<HTMLLabelElement>
   onDragLeave: React.DragEventHandler<HTMLLabelElement>
   onDragOver: React.DragEventHandler<HTMLLabelElement>
   onDrop: React.DragEventHandler<HTMLLabelElement>
   onChange: React.ChangeEventHandler<HTMLInputElement>
   inputRef: React.RefObject<HTMLInputElement>
}

export function UploadDropZone({
   uploading,
   dragActive,
   onDragEnter,
   onDragLeave,
   onDragOver,
   onDrop,
   onChange,
   inputRef,
}: UploadDropZoneProps) {
   return (
      <label
         htmlFor="upload-input"
         aria-disabled={uploading}
         className={`flex min-h-[220px] flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${dragActive ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-gray-300 bg-gray-50 dark:bg-neutral-800'} ${uploading ? 'cursor-not-allowed border-gray-300 bg-gray-100 opacity-60 dark:border-neutral-700 dark:bg-neutral-900' : 'cursor-pointer'} focus:ring-2 focus:ring-green-500 focus:outline-none`}
         onDragEnter={onDragEnter}
         onDragLeave={onDragLeave}
         onDragOver={onDragOver}
         onDrop={onDrop}
         aria-label="Área para selecionar ou arrastar arquivos do Excel"
      >
         <Inbox className="mb-2 h-12 w-12 text-green-500" aria-hidden="true" />
         <h1 id="upload-section-title" className="sr-only">
            Upload de Arquivos Excel
         </h1>
         <p className="mt-4 text-center font-medium text-gray-700 dark:text-gray-200">
            Selecione ou arraste os arquivos para cá.
         </p>
         <p className="mt-2 text-center font-semibold text-gray-600 dark:text-gray-300">
            Importe um ou mais arquivos.{' '}
            <span className="font-bold text-red-700 dark:text-red-400">
               Apenas arquivos em formato do excel (.xls e/ou .xlsx) são
               aceitos.
            </span>
         </p>
         <input
            id="upload-input"
            ref={inputRef}
            type="file"
            name="file"
            accept=".xls,.xlsx"
            multiple
            className="hidden"
            onChange={onChange}
            disabled={uploading}
            aria-disabled={uploading}
            aria-label="Selecionar arquivos para upload"
         />
      </label>
   )
}
