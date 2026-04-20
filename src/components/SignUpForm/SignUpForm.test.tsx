import { SignUpForm } from '~/components/SignUpForm/SignUpForm'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<SignUpForm />', () => {
  it('Should fill inputs with default values initially', async () => {
    render(
      <SignUpForm
        onSubmit={jest.fn()}
        defaultValues={{ email: "test@example.com", password: "123456" }}
      />
    )

    expect(screen.getByPlaceholderText(/enter email/i)).toHaveValue("test@example.com")
    expect(screen.getByPlaceholderText(/enter password/i)).toHaveValue("123456")
  })

  it('Should show required error messages when inputs are empty', async () => {
    const mockOnSubmit = jest.fn()

    render(<SignUpForm onSubmit={mockOnSubmit} />)

    // user click submit button
    await userEvent.click(screen.getByText(/submit/i))

    // should show required error messages
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('Should show pattern error messages when email is not valid', async () => {
    const mockOnSubmit = jest.fn()
    const user = userEvent.setup()

    render(<SignUpForm onSubmit={mockOnSubmit} />)

    await user.type(screen.getByPlaceholderText(/enter email/i), 'invalid-email')
    await user.click(screen.getByText(/submit/i))

    expect(await screen.findByText(/email is not valid/i)).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('Should show minLength error messages when password is not valid', async () => {
    const mockOnSubmit = jest.fn()
    const user = userEvent.setup()

    render(<SignUpForm onSubmit={mockOnSubmit} />)

    await user.type(screen.getByPlaceholderText(/enter password/i), '123')
    await user.click(screen.getByText(/submit/i))

    expect(await screen.findByText(/password must be at least 6 characters/i)).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('Should submit form successfully when inputs are valid', async () => {
    const mockOnSubmit = jest.fn()
    const user = userEvent.setup()

    render(<SignUpForm onSubmit={mockOnSubmit} />)

    await user.type(screen.getByPlaceholderText(/enter email/i), 'test@example.com')
    await user.type(screen.getByPlaceholderText(/enter password/i), '123456')
    await user.click(screen.getByText(/submit/i))

    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    expect(mockOnSubmit).toHaveBeenCalledWith({ email: 'test@example.com', password: '123456' })

    expect(screen.getByPlaceholderText(/enter email/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/enter password/i)).toHaveValue('')
  })
})
