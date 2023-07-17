import React, { type ReactNode, type ReactElement } from 'react'

interface ModalHeaderProps {
  id?: string
  children: ReactNode | ReactElement
  className?: string
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  id,
  children,
  className
}) => (
  <header className={className} id={id}>
    <h4>{children}</h4>
  </header>
)

export default ModalHeader
