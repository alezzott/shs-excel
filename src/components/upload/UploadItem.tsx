import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Button, Upload, message } from 'antd'
import styles from './Upload.module.scss'
import { DownloadOutlined } from '@ant-design/icons'

export function UploadItem() {
   const { Dragger } = Upload

   const props: UploadProps = {
      name: 'file',
      multiple: true,
      maxCount: 2,
      progress: {
         strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
         },
      },
      action: `${process.env.NEXT_PUBLIC_BASE_URL}/upload`,
      onChange(info) {
         const { status } = info.file
         if (status === 'done') {
            message.success(
               `O Arquivo ${info.file.name} foi carregado com sucesso`
            )
         } else if (status === 'error') {
            message.error(`Falha ao carregar o arquivo ${info.file.name}.`)
         }
      },
   }

   return (
      <section className={styles['upload-item']}>
         <form encType="multipart/form-data">
            <Dragger {...props}>
               <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ color: '#22c55e' }} />
               </p>
               <p className="ant-upload-text">
                  Selecione ou Arraste os arquivos para cá.
               </p>
               <p className="ant-upload-hint" style={{ fontWeight: 600 }}>
                  Importe um ou mais arquivos.{' '}
                  <span style={{ color: '#be1522', fontWeight: 600 }}>
                     Apenas arquivos em formato do excel (.xls e/ou .xlsx) são
                     aceitos.
                  </span>
               </p>
            </Dragger>
            <p className={styles['download-item']}>
               Caso tem problemas ao importar o arquivo. Por favor, baixe o{' '}
               <span style={{ color: '#22c55e', marginLeft: '5px' }}>
                  {' '}
                  Arquivo modelo
               </span>
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
               <Button
                  type="primary"
                  shape="default"
                  icon={<DownloadOutlined />}
                  size={'large'}
                  download="arquivo-modelo.xlsx"
                  href="/assets/excel/arquivo-modelo.xls"
                  style={{ backgroundColor: '#22c55e', fontSize: '18px' }}
               >
                  Baixe o arquivo
               </Button>
            </div>
         </form>
      </section>
   )
}
