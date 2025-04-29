import { Fragment, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Inbox, Download, Paperclip, X } from 'lucide-react'
import { toast } from 'sonner'
import { Progress } from '../ui/progress'

export function UploadItem() {
   const inputRef = useRef<HTMLInputElement>(null)
   const timerRef = useRef<NodeJS.Timeout | null>(null)
   const [dragActive, setDragActive] = useState(false)
   const [uploading, setUploading] = useState(false)
   const [selectedFiles, setSelectedFiles] = useState<File[]>([])
   const [progress, setProgress] = useState(0)
   const [uploadCanceled, setUploadCanceled] = useState(false)

   const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
      if (e.type === 'dragleave') setDragActive(false)
   }

   const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
         setSelectedFiles(Array.from(e.dataTransfer.files))
         await handleFiles(e.dataTransfer.files)
      }
   }

   const handleFiles = async (files: FileList) => {
      setUploading(true)
      const formData = new FormData()
      Array.from(files).forEach((file) => formData.append('file', file))

      const DURATION_PROGRESS = 100000 // 60s
      const INTERVAL_PROGRESS = 500 // Atualiza a cada 0.5s
      let elapsed = 0

      const TIMER = setInterval(() => {
         elapsed += INTERVAL_PROGRESS
         setProgress(
            Math.min(100, Math.round((elapsed / DURATION_PROGRESS) * 100))
         )
      }, INTERVAL_PROGRESS)

      try {
         await new Promise((res) => setTimeout(res, DURATION_PROGRESS))

         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/upload`, {
            method: 'POST',
            body: formData,
         })
         if (res.ok) {
            toast.success('Arquivo(s) carregado(s) com sucesso!')
            setSelectedFiles([])
         } else {
            toast.error(
               'Falha ao carregar o arquivo. Apenas arquivos em formato do excel (.xls e/ou .xlsx) são aceitos.'
            )
         }
      } catch {
         toast.error('Erro ao enviar arquivo.')
      } finally {
         if (timerRef.current) clearInterval(timerRef.current)
         setProgress(100)
         setUploading(false)
      }
   }

   const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         setSelectedFiles(Array.from(e.target.files))
         await handleFiles(e.target.files)
      }
   }

   const handleCancel = () => {
      if (timerRef.current) clearInterval(timerRef.current)
      setUploading(false)
      setProgress(0)
      setUploadCanceled(true)
      toast.error('Upload cancelado.')
   }

   return (
      <section className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
         <form encType="multipart/form-data">
            <label
               htmlFor="upload-input"
               className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors min-h-[220px] ${dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'} `}
               onDragEnter={handleDrag}
               onDragLeave={handleDrag}
               onDragOver={handleDrag}
               onDrop={handleDrop}
            >
               <Inbox className="w-12 h-12 text-green-500 mb-2" />
               <p className="font-medium text-gray-700">
                  Selecione ou arraste os arquivos para cá.
               </p>
               <p className="font-semibold text-gray-600 mt-2">
                  Importe um ou mais arquivos.{' '}
                  <span className="text-red-700 font-bold">
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
                  onChange={handleChange}
                  disabled={uploading}
               />
            </label>
            {selectedFiles.length > 0 && (
               <div className="mt-4">
                  <p className="font-semibold text-gray-700 mb-2">
                     Arquivos selecionados:
                  </p>
                  <ul className="my-5">
                     {selectedFiles.map((file, idx) => (
                        <li
                           key={idx}
                           className="flex items-center justify-between"
                        >
                           <article className="flex flex-row gap-3">
                              <Paperclip className="w-5 h-5 text-green-500" />
                              <span
                                 className={`truncate ${uploadCanceled ? 'text-red-600' : 'text-gray-800'}`}
                              >
                                 {file.name}
                              </span>
                           </article>
                           <article>
                              {uploading && (
                                 <section className="flex flex-row items-center gap-5">
                                    <Progress
                                       className="w-80"
                                       value={progress}
                                    />
                                    <Button
                                       size="icon"
                                       variant="outline"
                                       onClick={handleCancel}
                                       disabled={!uploading}
                                       title="Cancelar upload"
                                       className="hover:cursor-pointer"
                                    >
                                       <X className="w-5 h-5 text-red-500" />
                                    </Button>
                                 </section>
                              )}
                           </article>
                        </li>
                     ))}
                  </ul>
               </div>
            )}

            <p className="text-center mt-4 text-gray-700">
               Caso tenha problemas ao importar o arquivo, por favor, baixe o
               <span className="text-green-600 font-semibold ml-1">
                  Arquivo modelo
               </span>
            </p>
            <div className="flex justify-center mt-2">
               <Button
                  asChild
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white text-lg"
               >
                  <a
                     download="arquivo-modelo.xlsx"
                     href="/assets/excel/arquivo-modelo.xls"
                  >
                     <Download className="mr-2 h-5 w-5" />
                     Baixe o arquivo
                  </a>
               </Button>
            </div>
         </form>
      </section>
   )
}
