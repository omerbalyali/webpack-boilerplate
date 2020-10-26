import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders hello text', () => {
  render(<App />)
  const helloText = screen.getByText(/hello/i)
  expect(helloText).toBeInTheDocument()
})
