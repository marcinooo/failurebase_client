import React, { type ReactNode, type ReactElement } from 'react'
import './Modal.css'

interface ModalBodyProps {
  id?: string
  children: ReactNode | ReactElement
  className?: string
}

const ModalBody: React.FC<ModalBodyProps> = ({
  id,
  children,
  className
}) => (
  <div className={'modal-body ' + (className ?? '')} id={id}>
    {children}
  </div>
)

export default ModalBody
