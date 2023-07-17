import { render } from '@testing-library/react'
import Collapsible, { closeCollapsible, openCollapsible } from './Collapsible'

test('checks if collapsible element with given attributes opens and closes', () => {
  const id = 'some-id'
  const className = 'some-class'
  const text = 'some-text'

  const result = render(
    <Collapsible id={id} className={className}>
      <span>{text}</span>
    </Collapsible>
  )

  const collapsible = result.container.querySelector(`#${id}`)

  expect(collapsible).toBeInTheDocument()
  expect(collapsible).toHaveTextContent(new RegExp(text))
  expect(collapsible).toHaveProperty('className', `collapsible ${className}`)

  closeCollapsible(id)
  expect(collapsible).toHaveStyle({maxHeight: ''})

  openCollapsible(id)
  expect(collapsible).toHaveStyle({maxHeight: String(collapsible?.scrollHeight) + 'px'})
})
