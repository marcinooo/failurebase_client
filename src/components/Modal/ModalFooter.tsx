import React, { type ReactNode, type ReactElement } from 'react'

interface ModalFooterProps {
  id?: string
  children: ReactNode | ReactElement
  className?: string
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  id,
  children,
  className
}) => (
  <footer className={'is-right ' + (className ?? '')} id={id}>
    {children}
  </footer>
)

export default ModalFooter
