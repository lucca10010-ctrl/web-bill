// jest.config.js
module.exports = {
  // 测试环境
  testEnvironment: 'jsdom',
  
  // 测试文件匹配模式
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'
  ],
  
  // 模块名映射（处理别名）
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 
      '<rootDir>/__mocks__/fileMock.js'
  },
  
  // 覆盖率配置
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.{js,jsx,ts,tsx}',
    '!src/reportWebVitals.{js,jsx,ts,tsx}',
    '!src/setupTests.{js,jsx,ts,tsx}',
  ],
  
  // 覆盖率报告目录
  coverageDirectory: 'coverage',
  
  // 覆盖率报告格式
  coverageReporters: ['html', 'text', 'text-summary', 'lcov', 'clover'],
  
  // 覆盖率阈值（可选的，用于确保最小覆盖率）
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // 测试前需要执行的脚本
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
  // 转换配置
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  
  // 转换 node_modules 中的 ES 模块
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)'
  ],
  
  // 忽略的目录
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  
  // 模块查找目录
  moduleDirectories: ['node_modules', 'src']
}