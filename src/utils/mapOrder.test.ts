import { mapOrder } from '~/utils/mapOrder'

/* 
  1. toEqual: là matcher để so sánh giá trị của 2 đối tượng
*/
describe('Unit test: mapOrder()', () => {
  it ('should return [] if originalArray is null or undefined', () => {
    expect(mapOrder(null as any, [1, 2, 3], 'id')).toEqual([])
  })

  it ('should return [] if orderArray is null or undefined', () => {
    expect(mapOrder([1, 2, 3], null as any, 'id')).toEqual([])
  })

  it ('should return [] if key is falsy', () => {
    expect(mapOrder([1, 2, 3], [1, 2, 3], '')).toEqual([])
  })

  it ('should sort array by given order', () => {
    const originalArray = [
      { id: 1, name: 'John' },
      { id: 3, name: 'Jane' },
      { id: 2, name: 'Jim' },
    ]
    const orderArray = [1, 2, 3]

    const result = mapOrder(originalArray, orderArray, 'id')

    expect(result.map((item) => item.id)).toEqual([1, 2, 3])
  })
  
  it ('should push items not in orderArray to the end of the array', () => {
    const originalArray = [
      { id: 1, name: 'John' },
      { id: 3, name: 'Jane' },
      { id: 2, name: 'Jim' },
      { id: 4, name: 'Jill' },
      { id: 100, name: 'Jone' },
      { id: 99, name: 'Jack' },
    ]
    const orderArray = [1, 2, 3]

    const result = mapOrder(originalArray, orderArray, 'id')

    expect(result.map((item) => item.id)).toEqual([1, 2, 3, 4, 100, 99])
  })

  it ('Should handle when all items are not in orderArray', () => {
    const originalArray = [
      { id: 10 },
      { id: 20 },
      { id: 30 },
    ]
    const orderArray = [] as any[]

    const result = mapOrder(originalArray, orderArray, 'id')

    expect(result.map((item) => item.id)).toEqual([10, 20, 30])
  })

  it ('Should work with custom key', () => {
    const originalArray = [
      { id: 30, name: 'Jim' },
      { id: 20, name: 'Jane' },
      { id: 10, name: 'John' },
    ]
    const orderArray = ['Jim', 'Jane', 'John']

    const result = mapOrder(originalArray, orderArray, 'name')

    expect(result.map((item) => item.name)).toEqual(['Jim', 'Jane', 'John'])
  })
})
