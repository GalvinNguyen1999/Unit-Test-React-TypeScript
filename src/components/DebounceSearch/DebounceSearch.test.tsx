import { DebounceSearch } from "~/components/DebounceSearch/DebounceSearch";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("DebounceSearch", () => {
  it("Should fetch users after debounce", async () => {
    jest.spyOn(globalThis, 'fetch').mockImplementation(async (url: any) => {
      if (url.includes('trungquandev')) {
        return {
          json: async () => [{ id: 1, name: '123123' }]
        }
      }

      return { json: async () => [] } as any
    })

    render(<DebounceSearch />)

    expect(globalThis.fetch).toHaveBeenCalledTimes(1)
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('users?q=')
    )

    await userEvent.type(screen.getByPlaceholderText('Search'), 'trungquandev')

    expect(globalThis.fetch).toHaveBeenCalledTimes(1)
    expect(await screen.findByText(/123123/i)).toBeInTheDocument()
  });

  it('Should display "No result!" when network error', async () => {
    jest.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'))

    render(<DebounceSearch />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    expect(await screen.findByText(/no result/i)).toBeInTheDocument()
  })
});
