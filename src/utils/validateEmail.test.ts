import { validateEmail } from '~/utils/validateEmail'

describe('Unit test: validateEmail()', () => {
  // cases: là một mảng chứa các giá trị khác nhau để chạy test case
  const cases: [string, boolean][] = [
    ['test@example.com', true],
    ['test@', false],
    ['@test.com', false],
  ]

  // it.each: là matcher để chạy test case lặp lại với các giá trị khác nhau
  // %p: là placeholder kiểu pretty format để hiển thị giá trị của email và expected
  // (email, expected): là các giá trị khác nhau để chạy test case
  // %p => %p: là message để hiển thị kết quả của test case
  it.each(cases)('%p => %p', (email, expected) => {
    expect(validateEmail(email)).toBe(expected)
  })
})