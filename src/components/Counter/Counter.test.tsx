import { Counter } from '~/components/Counter/Counter'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<Counter />', () => {
  it ('Tăng giảm giá trị (đảm bảo không âm)', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const increaseButton = screen.getByRole('button', { name: '+' })
    const decreaseButton = screen.getByRole('button', { name: '-' })

    // tăng gía trị từ 0 lên 2
    await user.click(increaseButton)
    await user.click(increaseButton)

    // giảm trá trị đi 3 lần nhưng cần đảm bảo value không bị âm
    await user.click(decreaseButton)
    await user.click(decreaseButton)
    await user.click(decreaseButton)

    // kiểm tra giá trị hiển thị là 0
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument()
  })
})