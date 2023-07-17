import React, { type ReactNode, type ReactElement } from 'react'
import './Modal.css'

interface ModalProps {
  id: string
  children: ReactNode | ReactElement
  className?: string
}

export const openModal = (id: string): void => {
  const modal = document.getElementById(id)
  if (modal != null) { modal.classList.add('show') }
}

export const closeModal = (id: string): void => {
  const modal = document.getElementById(id)
  if (modal != null) { modal.classList.remove('show') }
}

const Modal: React.FC<ModalProps> = ({
  id,
  children,
  className
}) => (
  <div className={'modal ' + (className ?? '')} id={id}>
    <div className="card modal-content">
      {children}
    </div>
  </div>
)

export default Modal
