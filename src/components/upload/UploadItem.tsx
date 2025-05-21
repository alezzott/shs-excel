import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { useFetch } from '@/hooks/useFetch'
import { UploadItemFileList } from './UploadItemFileList'
import { UploadDropZone } from './UploadDropZone'
import axios from 'axios'
import { UploadExcelDownload } from './UploadExcelDownload'
import { useDragAndDrop } from '@/hooks/useDragAndDrop'

const UPLOAD_PROGRESS_DURATION_MS = 3000
const UPLOAD_PROGRESS_INTERVAL_MS = 500

export function UploadItem() {
   const inputRef = useRef<HTMLInputElement>(null)
   const timerRef = useRef<NodeJS.Timeout | null>(null)
   const [uploading, setUploading] = useState(false)
   const [selectedFiles, setSelectedFiles] = useState<File[]>([])
   const [progress, setProgress] = useState(0)
   const [uploadCanceled, setUploadCanceled] = useState(false)

   const { refetch } = useFetch(1, 10)
   const { dragActive, handleDrag, handleDrop } = useDragAndDrop({
      onFiles: async (files) => {
         setSelectedFiles(Array.from(files))
         await handleFiles(files)
      },
   })

   function handleGetProgress(
      setProgress: (v: number) => void,
      timerRef: React.MutableRefObject<NodeJS.Timeout | null>
   ) {
      let elapsed = 0
      timerRef.current = setInterval(() => {
         elapsed += UPLOAD_PROGRESS_INTERVAL_MS
         setProgress(
            Math.min(
               100,
               Math.round((elapsed / UPLOAD_PROGRESS_DURATION_MS) * 100)
            )
         )
      }, UPLOAD_PROGRESS_INTERVAL_MS)
   }

   async function handleUploadItems(formData: FormData) {
      return axios.post(
         `${process.env.NEXT_PUBLIC_BASE_URL}/upload`,
         formData,
         {
            headers: { 'Content-Type': 'multipart/form-data' },
         }
      )
   }

   const handleFiles = async (files: FileList) => {
      setUploading(true)
      setProgress(0)
      const formData = new FormData()
      Array.from(files).forEach((file) => formData.append('file', file))
      handleGetProgress(setProgress, timerRef)
      try {
         await new Promise((res) =>
            setTimeout(res, UPLOAD_PROGRESS_DURATION_MS)
         )
         const res = await handleUploadItems(formData)
         if (!res.data?.error) {
            toast.success('Arquivo(s) carregado(s) com sucesso!')
            setSelectedFiles([])
            refetch()
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
      <section
         className="mx-auto my-6 w-full max-w-4xl rounded-lg bg-white p-4 shadow sm:p-6 dark:bg-neutral-900"
         aria-labelledby="upload-section-title"
      >
         <form encType="multipart/form-data">
            <UploadDropZone
               uploading={uploading}
               dragActive={dragActive}
               onDragEnter={handleDrag}
               onDragLeave={handleDrag}
               onDragOver={handleDrag}
               onDrop={handleDrop}
               onChange={handleChange}
               inputRef={inputRef}
            />
            {selectedFiles.length > 0 && (
               <UploadItemFileList
                  files={selectedFiles}
                  uploading={uploading}
                  progress={progress}
                  uploadCanceled={uploadCanceled}
                  onCancel={handleCancel}
               />
            )}
            <UploadExcelDownload />
         </form>
      </section>
   )
}
