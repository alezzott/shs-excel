import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
   dir: './',
})

const config: Config = {
   testEnvironment: 'jsdom',
   coverageProvider: 'v8',
   setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
   moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
   },
}

export default createJestConfig(config)
