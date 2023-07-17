import { render } from '@testing-library/react'
import Modal, { openModal, closeModal } from './Modal'
import ModalHeader from '../../components/Modal/ModalHeader'
import ModalBody from '../../components/Modal/ModalBody'
import ModalFooter from '../../components/Modal/ModalFooter'

test('checks if modal element renders', () => {
  const id = 'some-id'
  const className = 'some-class'
  const headerText = 'some-text'
  const bodyText = 'some-text'
  const footText = 'some-text'

  const result = render(
    <Modal id={id} className={className}>
      <ModalHeader>{headerText}</ModalHeader>
      <ModalBody>{bodyText}</ModalBody>
      <ModalFooter>{footText}</ModalFooter>
    </Modal>
  )

  const modal = result.container.querySelector(`#${id}`)

  expect(modal).toBeInTheDocument()

  const modalHeader = modal?.querySelector('header')
  expect(modalHeader).toBeInTheDocument()

  const modalBody = modal?.querySelector('.modal-body')
  expect(modalBody).toBeInTheDocument()

  const modalHFooter = modal?.querySelector('footer')
  expect(modalHFooter).toBeInTheDocument()
})
