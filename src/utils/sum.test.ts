import { sum } from '~/utils/sum'

// Jest runtime đã cung cấp các hàm describe, it, expect, toBe, ...vv
// Describe: Group các test cases liên quan đến hàm sum()
describe('Unit test: sum()', () => {
  // it: Test case
  it('should return the sum of two numbers', () => {
    // expect: Kết quả mong đợi
    // toBe: Matcher
    expect(sum(10, 7)).toBe(17)
  })
})

/* 
  hiểu jest test coverage output:
  %Stmts: tỷ lệ câu lệnh (statements) trong code đã được chạy qua khi test
  %Branch: tỷ lệ nhánh (branches) trong code đã được chạy qua khi test
  %Funcs: tỷ lệ hàm (functions) trong code đã được chạy qua khi test
  %Lines: tỷ lệ dòng code (lines) trong code đã được chạy qua khi test
  Uncovered Line #s: các dòng code không được chạy qua khi test
*/
