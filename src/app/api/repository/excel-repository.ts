import client from '../lib/prisma/client'

export interface ExcelRepository {
   findById(id: number): Promise<any | null>
   update(id: number, data: Partial<any>): Promise<any>
   createMany(data: any[]): Promise<any>
}

export const prismaExcelRepository: ExcelRepository = {
   findById: (id) => client.excel_items.findUnique({ where: { id } }),
   update: (id, data) => client.excel_items.update({ where: { id }, data }),
   createMany: (data) => client.excel_items.createMany({ data }),
}
