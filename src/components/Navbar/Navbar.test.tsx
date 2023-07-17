import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Navbar'

test('check if navbar element renders', () => {
  
  const result = render(
    <BrowserRouter><Navbar/></BrowserRouter>
  )
  
  const navbar = result.container.querySelector('nav')
  
  expect(navbar).toBeInTheDocument()
})
