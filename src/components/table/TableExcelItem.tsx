'use client'
import {
   Button,
   Pagination,
   Space,
   Spin,
   Table,
   TableProps,
   message,
} from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'
import { useFetch } from '@/hooks/useFetch'
import { ModalDetailsItem } from '../modal/ModalDetailsItem'
import { useState } from 'react'
import { formatToBRL } from '@/app/api/utils/FormatCurrency'
import { useDelete } from '@/hooks/useDelete'
import { LoadingOutlined } from '@ant-design/icons'
import styles from './Table.module.scss'

export function TableExcelItem() {
   const [currentPage, setCurrentPage] = useState(1)
   const [pageSize, setPageSize] = useState(10)
   const [messageApi, contextHolder] = message.useMessage()

   const { data: upload, isLoading, refetch } = useFetch(currentPage, pageSize)
   const deleteItemMutation = useDelete()

   const handleUpdateSuccess = () => {
      refetch()
   }

   const handleDeleteItem = (id: number) => {
      deleteItemMutation.mutate(id)
      messageApi.open({
         type: 'success',
         content: 'Sucesso !',
      })
   }

   if (isLoading) {
      return (
         <>
            <Spin
               style={{
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: '50px',
               }}
               indicator={
                  <LoadingOutlined
                     style={{ fontSize: 72, color: '#22c55e' }}
                     spin
                  />
               }
            />
         </>
      )
   }

   const columns: TableProps<Excel>['columns'] = [
      {
         title: 'id',
         dataIndex: 'id',
         key: 'id',
         sortDirections: ['descend'],
         sorter: {
            compare: (a, b) => a.id - b.id,
            multiple: 10,
         },
      },
      {
         title: 'Cód.',
         dataIndex: 'code',
         key: 'code',
      },
      {
         title: 'Descrição',
         dataIndex: 'description',
         key: 'description',
      },
      {
         title: 'Quantidade',
         dataIndex: 'quantity',
         key: 'quantity',
      },
      {
         title: 'Preço',
         dataIndex: 'price',
         key: 'price',
         render: (text, record) => formatToBRL(record.price),
      },
      {
         title: 'Preço total',
         dataIndex: 'total_price',
         key: 'total_price',
         render: (text, record) => formatToBRL(record.total_price),
      },
      {
         title: 'Data de criação',
         dataIndex: 'created_at',
         key: 'created_at',
      },
      {
         title: 'Data de Atualização',
         dataIndex: 'updated_at',
         key: 'updated_at',
      },
      {
         title: 'Opções',
         key: 'action',
         render: (text, excel) => (
            <Space size="middle">
               <ModalDetailsItem
                  item={excel}
                  onUpdateSuccess={handleUpdateSuccess}
               />
               <Button
                  onClick={() => handleDeleteItem(excel.id)}
                  style={{ border: '1px solid #22c55e' }}
               >
                  <DeleteTwoTone twoToneColor="#22c55e" />
               </Button>
            </Space>
         ),
      },
   ]

   return (
      <>
         {contextHolder}
         <Table
            className={styles['table-content']}
            columns={columns}
            dataSource={upload?.items}
            pagination={false}
            scroll={{ x: 'max-content' }}
            footer={() => (
               <Pagination
                  responsive={true}
                  current={currentPage}
                  pageSize={pageSize}
                  total={upload?.totalItems || 0}
                  onChange={(page, size) => {
                     setCurrentPage(page)
                     setPageSize(size)
                  }}
               />
            )}
         />
      </>
   )
}
