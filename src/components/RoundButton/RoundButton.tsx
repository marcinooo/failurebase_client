import React, { type ReactNode, type ReactElement } from 'react'
import './RoundButton.css'

interface RoundButtonProps {
  children: ReactNode | ReactElement
  id?: string
  className?: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

const RoundButton: React.FC<RoundButtonProps> = ({
  children,
  id,
  className,
  onClick = (event) => {}
}) => (
  <button
    id={id}
    className={'rounded-button ' + (className ?? '')}
    onClick={(event) => { onClick(event) }}
  >
    {children}
  </button>
)

export default RoundButton
