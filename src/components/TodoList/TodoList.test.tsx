import { TodoList } from '~/components/TodoList/TodoList'
import { render, screen } from '@testing-library/react'

const mockTodos = [
  { id: 1, todo: 'Todo 1', completed: false, userId: 1 },
  { id: 2, todo: 'Todo 2', completed: true, userId: 2   },
  { id: 3, todo: 'Todo 3', completed: false, userId: 3 },
]

describe('<TodoList />', () => {
  it ('Fetch and display Todo List', async () => {
    // globalThis.fetch là global object của browser, nên chúng ta cần mock nó
    // jest.spyOn: mock function fetch toàn bộ
    // jest.fn là để tạo mock function có thể gọi được đến những function khác
    jest.spyOn(globalThis, 'fetch').mockResolvedValueOnce({ json: async () => ({ todos: mockTodos }) } as any)

    render(<TodoList />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    for (const t of mockTodos) {
      expect(await screen.findByText(t.todo)).toBeInTheDocument()
    }
  })

  it('Should display "No result!" when no todos', async () => {
    jest.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('No todos'))

    render(<TodoList />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    expect(await screen.findByText(/no result/i)).toBeInTheDocument()
  })
})