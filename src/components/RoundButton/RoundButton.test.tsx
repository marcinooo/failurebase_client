import { render, fireEvent } from '@testing-library/react'
import RoundButton from './RoundButton'

test('check if roundbutton element renders', () => {
  const id = 'some-id'
  const className = 'some-class'
  const text = 'some-text'
  let clicked = false;
  
  const result = render(
    <RoundButton id={id} className={className} onClick={ (e) => clicked = true }>{text}</RoundButton>
  )
  
  const button = result.container.querySelector(`#${id}`)
  
  expect(button).toBeInTheDocument()
  expect(button).toHaveTextContent(new RegExp(text))
  expect(button).toHaveProperty('className', `rounded-button ${className}`)

  if (button !== null) {
    fireEvent.click(button)
  } else {
    throw Error('Button does not exist')
  }

  expect(clicked).toBe(true)
})

