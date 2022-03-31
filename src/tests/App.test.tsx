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

})
