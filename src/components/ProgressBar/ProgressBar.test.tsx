import { render } from '@testing-library/react'
import ProgressBar from './ProgressBar'

test('check if progress bar element renders', () => {
  
  const result = render(
    <ProgressBar/>
  )
  
  const progressBar = result.container.querySelector('div.indeterminate-progress-bar')
  
  expect(progressBar).toBeInTheDocument()
})
