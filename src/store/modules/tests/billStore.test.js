// billStore.test.js
import { configureStore } from '@reduxjs/toolkit'
import reducer, { addBill, setBillList, getBillList } from '../billStore'
import { fetchBillList123 } from '../../../api/index'

// Mock API 模块
jest.mock('../../../api/index', () => ({
  fetchBillList123: jest.fn()
}))

describe('billStore 同步 actions', () => {
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: reducer
    })
  })

  test('初始状态应该为空数组', () => {
    expect(store.getState().billList).toEqual([])
  })

  test('addBill action 应该能添加账单', () => {
    const mockBill = {
      id: 1,
      amount: 100,
      category: 'food',
      date: '2024-01-15'
    }

    store.dispatch(addBill(mockBill))
    
    expect(store.getState().billList).toHaveLength(1)
    expect(store.getState().billList[0]).toEqual(mockBill)
  })

  test('addBill 应该可以添加多个账单', () => {
    const bill1 = { id: 1, amount: 100 }
    const bill2 = { id: 2, amount: 200 }

    store.dispatch(addBill(bill1))
    store.dispatch(addBill(bill2))
    
    expect(store.getState().billList).toHaveLength(2)
    expect(store.getState().billList).toEqual([bill1, bill2])
  })

  test('setBillList action 应该能设置整个账单列表', () => {
    const mockBillList = [
      { id: 1, amount: 100 },
      { id: 2, amount: 200 },
      { id: 3, amount: 300 }
    ]

    store.dispatch(setBillList(mockBillList))
    
    expect(store.getState().billList).toEqual(mockBillList)
    expect(store.getState().billList).toHaveLength(3)
  })

  test('setBillList 应该能替换现有的账单列表', () => {
    // 先添加一些数据
    store.dispatch(addBill({ id: 1, amount: 100 }))
    
    const newBillList = [
      { id: 2, amount: 200 },
      { id: 3, amount: 300 }
    ]
    
    store.dispatch(setBillList(newBillList))
    
    expect(store.getState().billList).toEqual(newBillList)
    expect(store.getState().billList).toHaveLength(2)
  })
})

describe('getBillList 异步 thunk', () => {
  let store
  let dispatch
  let getState

  beforeEach(() => {
    store = configureStore({
      reducer: reducer
    })
    dispatch = jest.fn()
    getState = jest.fn()
    
    // 清除所有 mock 调用记录
    jest.clearAllMocks()
  })

  test('成功获取账单列表应该 dispatch setBillList', async () => {
    const mockBillList = [
      { id: 1, amount: 100, category: 'food' },
      { id: 2, amount: 200, category: 'transport' }
    ]

    // 模拟 API 调用返回成功
    fetchBillList123.mockResolvedValueOnce(mockBillList)

    // 执行 thunk
    const thunk = getBillList()
    await thunk(dispatch, getState, undefined)

    // 验证 API 被调用
    expect(fetchBillList123).toHaveBeenCalledTimes(1)
    
    // 验证 dispatch 被调用
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(setBillList(mockBillList))
  })

  test('API 调用返回的数据格式应该正确传递给 setBillList', async () => {
    const mockResponse = [
      {
        id: 1,
        amount: 150,
        category: 'entertainment',
        date: '2024-01-15',
        description: 'Movie tickets'
      }
    ]

    fetchBillList123.mockResolvedValueOnce(mockResponse)

    const thunk = getBillList()
    await thunk(dispatch, getState, undefined)

    expect(dispatch).toHaveBeenCalledWith(
      setBillList(mockResponse)
    )
  })

  test('API 调用失败时应该正确处理错误', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    const errorMessage = 'Network Error'
    fetchBillList123.mockRejectedValueOnce(new Error(errorMessage))

    const thunk = getBillList()
    
    // 对于 reject 的情况，我们需要捕获错误
    await expect(thunk(dispatch, getState, undefined))
      .rejects.toThrow(errorMessage)

    // 验证 dispatch 没有被调用
    expect(dispatch).not.toHaveBeenCalled()
    
    consoleSpy.mockRestore()
  })

  test('API 返回空数组应该正确处理', async () => {
    fetchBillList123.mockResolvedValueOnce([])

    const thunk = getBillList()
    await thunk(dispatch, getState, undefined)

    expect(dispatch).toHaveBeenCalledWith(setBillList([]))
  })

  test('thunk 应该能够与真实的 Redux store 一起工作', async () => {
    const realStore = configureStore({
      reducer: reducer
    })

    const mockBillList = [
      { id: 1, amount: 100 }
    ]

    fetchBillList123.mockResolvedValueOnce(mockBillList)

    // 使用真实的 store 执行 thunk
    await realStore.dispatch(getBillList())

    // 验证 store 状态被正确更新
    expect(realStore.getState().billList).toEqual(mockBillList)
  })

  test('多次调用应该正常工作', async () => {
    const firstCall = [{ id: 1, amount: 100 }]
    const secondCall = [{ id: 2, amount: 200 }, { id: 3, amount: 300 }]

    fetchBillList123
      .mockResolvedValueOnce(firstCall)
      .mockResolvedValueOnce(secondCall)

    const thunk1 = getBillList()
    await thunk1(dispatch, getState, undefined)

    expect(dispatch).toHaveBeenNthCalledWith(1, setBillList(firstCall))

    // 清除 dispatch 的调用记录
    dispatch.mockClear()

    const thunk2 = getBillList()
    await thunk2(dispatch, getState, undefined)

    expect(dispatch).toHaveBeenNthCalledWith(1, setBillList(secondCall))
  })
})

// 额外的边缘情况测试
describe('边缘情况', () => {
  test('addBill 处理 undefined 或 null 值', () => {
    const store = configureStore({
      reducer: reducer
    })

    // 重置状态
    store.dispatch(setBillList([]))

    // 添加 undefined（虽然不应该发生）
    store.dispatch(addBill(undefined))
    
    // Redux Toolkit 会处理，账单列表会增加一项
    expect(store.getState().billList).toHaveLength(1)
    expect(store.getState().billList[0]).toBeUndefined()
  })

  test('setBillList 设置为空数组', () => {
    const store = configureStore({
      reducer: reducer
    })

    // 先添加一些数据
    store.dispatch(addBill({ id: 1, amount: 100 }))
    store.dispatch(addBill({ id: 2, amount: 200 }))

    // 设置为空数组
    store.dispatch(setBillList([]))

    expect(store.getState().billList).toEqual([])
    expect(store.getState().billList).toHaveLength(0)
  })

  test('setBillList 设置为 null 或 undefined', () => {
    const store = configureStore({
      reducer: reducer
    })

    // Redux Toolkit 的 Immer 会允许设置 null/undefined
    store.dispatch(setBillList(null))
    expect(store.getState().billList).toBeNull()

    store.dispatch(setBillList(undefined))
    expect(store.getState().billList).toBeUndefined()
  })
})