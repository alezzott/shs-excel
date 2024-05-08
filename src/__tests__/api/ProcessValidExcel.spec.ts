import { describe, expect, it } from 'vitest'

function isValidExcelFile(fileExtension: string | undefined): boolean {
   if (!fileExtension) return false
   return fileExtension === 'xls' || fileExtension === 'xlsx'
}

describe('isValidExcelFile', () => {
   it('should return true for .xls and .xlsx files', () => {
      expect(isValidExcelFile('xls')).toBe(true)
      expect(isValidExcelFile('xlsx')).toBe(true)
   })

   it('should return false for other file types', () => {
      expect(isValidExcelFile('csv')).toBe(false)
      expect(isValidExcelFile('ods')).toBe(false)
      expect(isValidExcelFile('txt')).toBe(false)
      expect(isValidExcelFile('')).toBe(false)
      expect(isValidExcelFile(undefined)).toBe(false)
   })
})
