import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import mockServer from '../services/mockService'
import { Server } from 'miragejs'

let server: Server

describe('Todo app test', () => {
  beforeEach(() => {
    server = mockServer()
    server.logging = false
  })

  afterEach(() => {
    server.shutdown()
  })

  it('should show the title', () => {
    render(<App />)
    const todoTitle = screen.getByText('My Todos')
    expect(todoTitle).toBeInTheDocument()
  })

  // TODO: add other frontend test

  it('should show default todo in todoList', async () => {
    render(<App />)
    const item0 = await screen.findByText('item0')
    expect(item0).toBeInTheDocument()
  })

  test('Add button is disabled on default', async () => {
    render(<App />)
    const addButton = await screen.findByText('Add Todo')
    expect(addButton).toBeDisabled()
  })

  test('Add button is enabled when name and description are not empty', async () => {
    render(<App />)

    const nameInput = await screen.findByTestId('name')
    const descriptionInput = await screen.findByTestId('description')
    await userEvent.type(nameInput, 'Prepare slide')
    await userEvent.type(descriptionInput, 'slider for javascript testing workshop')

    const addButton = await screen.findByText('Add Todo')
    expect(addButton).toBeEnabled()
  })

  test('new todo will appearance, name and description input will be clear when click Add Todo button', async () => {
    render(<App />)

    const nameInput = await screen.findByTestId('name')
    const descriptionInput = await screen.findByTestId('description')
    await userEvent.type(nameInput, 'Prepare slide')
    await userEvent.type(descriptionInput, 'slider for javascript testing workshop')
    const addButton = await screen.findByText('Add Todo')
    await userEvent.click(addButton)
    const newTodo = await screen.findByText('Prepare slide')

    expect(nameInput).toHaveTextContent('')
    expect(descriptionInput).toHaveTextContent('')
    expect(newTodo).toBeInTheDocument()
  })

  it('should be disappear when user click delete button of a todo', async () => {
    render(<App />)

    const deleteButtons = await screen.findAllByText('Delete')
    await userEvent.click(deleteButtons[0])

    await waitFor(() => {
      const item0 = screen.queryByText('item0')
      expect(item0).toBeNull()
    })
  })
})
