import { Paperclip, X } from 'lucide-react'
import { Progress } from '../ui/progress'
import { Button } from '@/components/ui/button'

interface FileListProps {
   files: File[]
   uploading: boolean
   progress: number
   uploadCanceled: boolean
   onCancel: () => void
}

export function UploadItemFileList({
   files,
   uploading,
   progress,
   uploadCanceled,
   onCancel,
}: FileListProps) {
   return (
      <section className="mt-8" role="status" aria-live="polite">
         <p className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
            Arquivos selecionados:
         </p>
         <ul className="my-5">
            {files.map((file, idx) => (
               <li key={idx} className="flex items-center justify-between">
                  <article className="flex flex-row gap-3">
                     <Paperclip
                        className="h-5 w-5 text-green-500"
                        aria-hidden="true"
                     />
                     <span
                        className={`truncate ${uploadCanceled ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-100'}`}
                     >
                        {file.name}
                        {uploadCanceled && (
                           <span className="ml-2 text-xs font-semibold text-red-600 dark:text-red-400">
                              (Upload cancelado)
                           </span>
                        )}
                     </span>
                  </article>
                  {uploading && (
                     <aside className="flex flex-row items-center gap-5">
                        <Progress
                           className="w-80"
                           value={progress}
                           aria-label="Progresso do upload"
                        />
                        <Button
                           size="icon"
                           variant="outline"
                           onClick={onCancel}
                           disabled={!uploading}
                           title="Cancelar upload"
                           aria-label="Cancelar upload"
                           className="hover:cursor-pointer focus:ring-2 focus:ring-red-500 focus:outline-none"
                        >
                           <X
                              className="h-5 w-5 text-red-500"
                              aria-hidden="true"
                           />
                        </Button>
                     </aside>
                  )}
               </li>
            ))}
         </ul>
      </section>
   )
}
