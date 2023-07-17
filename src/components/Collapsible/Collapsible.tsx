import React, { type ReactNode, type ReactElement } from 'react'
import './Collapsible.css'

interface CollapsibleProps {
  children: ReactNode | ReactElement
  id?: string
  className?: string
}

export const openCollapsible = (id: string): void => {
  const collapsible = document.getElementById(id)
  if (collapsible != null) {
    collapsible.style.maxHeight = String(collapsible.scrollHeight) + 'px'
  }
}

export const closeCollapsible = (id: string): void => {
  const collapsible = document.getElementById(id)
  if (collapsible != null) {
    collapsible.style.maxHeight = ''
  }
}

const Collapsible: React.FC<CollapsibleProps> = ({
  children,
  id,
  className
}) => (
  <div
    id={id}
    className={'collapsible ' + (className ?? '') }
  >
    {children}
  </div>
)

export default Collapsible
