import { Button } from '~/components/Button/Button'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<Button />', () => {
  it ('Should render and click to button', async () => {
    // tạo 1 cái user instance
    const user = userEvent.setup()

    // tạo mock function onClick bằng Jest
    const onClick = jest.fn()

    // Mount component Button vào DOM ảo trong môi trường test
    render(<Button content="Click Me" onClick={onClick} />)

    // dùng object screen để tìm button trong DOM ảo và click vào nó
    // getByRole: tìm button trong DOM ảo bằng role button và name là "Click Me"
    // /click me/i: là regex để tìm "Click Me" hoặc "click me" hoặc "Click me" hoặc "click Me"
    // i: là option để tìm kiếm không phân biệt hoa thường
    const button = screen.getByRole('button', { name: /click me/i })

    // mô phỏng click vào button
    await user.click(button)

    // kiểm tra button vẫn đang nằm trong document (không bị unmount)
    expect(button).toBeInTheDocument()

    // kiểm tra xem function onClick đã được gọi 1 lần hay chưa
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})