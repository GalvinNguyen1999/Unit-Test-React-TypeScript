import { useCounter } from '~/hooks/useCounter'
import { renderHook, act } from '@testing-library/react'

describe('useCounter() hook:', () => {
  it('Khởi tạo giá trị mặc định là 0', () => {
    const { result } = renderHook(() => useCounter(0))
    expect(result.current.count).toBe(0)
  })

  it ('Khởi tạo giá trị custom', () => {
    const { result } = renderHook(() => useCounter(10))
    expect(result.current.count).toBe(10)
  })

  it ('Tăng giá trị', () => {
    const { result } = renderHook(() => useCounter(0))

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })

  it ('Giảm giá trị đảm bảo không âm', () => {
    const { result } = renderHook(() => useCounter(2))

    act(() => {
      result.current.decrement()
      result.current.decrement()
      result.current.decrement()
    })

    expect(result.current.count).toBe(0)
  })
  

  it ('Reset giá trị', () => {
    const { result } = renderHook(() => useCounter(3))
    act(() => {
      result.current.decrement()
      result.current.reset()
    })
    expect(result.current.count).toBe(3)
  })
})
