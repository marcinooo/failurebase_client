import { render, fireEvent } from '@testing-library/react'
import ButtonBadge from './ButtonBadge'

test('check if button badge element with given attributes renders', () => {
  const id = 'some-id'
  const className = 'some-class'
  const text = 'some-text'
  let clicked = false;

  const result = render(
    <ButtonBadge
      id={id}
      className={className}
      text={text}
      onClick={ (e) => clicked = true }/>
  )

  const buttonBadge = result.container.querySelector(`#${id}`)

  expect(buttonBadge).toBeInTheDocument()
  expect(buttonBadge).toHaveTextContent(new RegExp(text))
  expect(buttonBadge).toHaveProperty('className', `button-badge ${className}`)

  if (buttonBadge !== null) {
    fireEvent.click(buttonBadge)
  } else {
    throw Error('Button badge does not exist')
  }

  expect(clicked).toBe(true)
})
